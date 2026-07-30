const admin = require('firebase-admin');
const path = require('path');
const fs = require('fs');
const crypto = require('crypto');

let serviceAccount;

// Helper to test if a given string is a valid PEM private key
const isValidPrivateKey = (keyStr) => {
  if (!keyStr || typeof keyStr !== 'string') return false;
  try {
    crypto.createPrivateKey(keyStr);
    return true;
  } catch (e) {
    return false;
  }
};

// Smart private key sanitizer & repair helper
const getValidPrivateKey = (rawKey) => {
  if (!rawKey) return null;
  let str = String(rawKey).trim();

  // 1. Check if already valid
  if (isValidPrivateKey(str)) return str;

  // 2. Remove wrapping quotes if present
  if ((str.startsWith('"') && str.endsWith('"')) || (str.startsWith("'") && str.endsWith("'"))) {
    str = str.substring(1, str.length - 1).trim();
    if (isValidPrivateKey(str)) return str;
  }

  // 3. Unescape literal \n or \\n and carriage returns
  const unescaped = str.replace(/\\+n/g, '\n').replace(/\r/g, '');
  if (isValidPrivateKey(unescaped)) return unescaped;

  // 4. Try base64 decoding if no header is present
  if (!str.includes('-----BEGIN')) {
    try {
      const decoded = Buffer.from(str, 'base64').toString('utf8').trim();
      if (isValidPrivateKey(decoded)) return decoded;
      const decodedUnescaped = decoded.replace(/\\+n/g, '\n').replace(/\r/g, '');
      if (isValidPrivateKey(decodedUnescaped)) return decodedUnescaped;
    } catch (e) {}
  }

  // 5. Reconstruct standard PEM format from base64 characters
  const header = '-----BEGIN PRIVATE KEY-----';
  const footer = '-----END PRIVATE KEY-----';

  if (unescaped.includes(header) && unescaped.includes(footer)) {
    const startIndex = unescaped.indexOf(header) + header.length;
    const endIndex = unescaped.indexOf(footer);
    const base64Body = unescaped.substring(startIndex, endIndex).replace(/[^A-Za-z0-9+/=]/g, '');

    const chunks = [];
    for (let i = 0; i < base64Body.length; i += 64) {
      chunks.push(base64Body.substring(i, i + 64));
    }

    const rebuiltPem = `${header}\n${chunks.join('\n')}\n${footer}\n`;
    if (isValidPrivateKey(rebuiltPem)) return rebuiltPem;
  }

  return null;
};

// 1. Try loading from serviceAccountKey.json if present (local dev)
const serviceAccountPath = path.join(__dirname, 'serviceAccountKey.json');

if (fs.existsSync(serviceAccountPath)) {
  try {
    serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, 'utf8'));
  } catch (error) {
    console.error('Failed to parse serviceAccountKey.json:', error.message);
  }
}

// 2. Try loading from full service account JSON env var (base64 or raw JSON)
if (!serviceAccount && process.env.FIREBASE_SERVICE_ACCOUNT_BASE64) {
  try {
    const decodedJson = Buffer.from(process.env.FIREBASE_SERVICE_ACCOUNT_BASE64, 'base64').toString('utf8');
    serviceAccount = JSON.parse(decodedJson);
  } catch (error) {
    console.error('Failed to parse FIREBASE_SERVICE_ACCOUNT_BASE64:', error.message);
  }
}

if (!serviceAccount && process.env.FIREBASE_SERVICE_ACCOUNT) {
  try {
    serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
  } catch (error) {
    console.error('Failed to parse FIREBASE_SERVICE_ACCOUNT env var:', error.message);
  }
}

// 3. Fallback to individual FIREBASE_* env vars
if (!serviceAccount && (process.env.FIREBASE_PRIVATE_KEY || process.env.FIREBASE_PRIVATE_KEY_BASE64)) {
  const rawKey = process.env.FIREBASE_PRIVATE_KEY_BASE64 || process.env.FIREBASE_PRIVATE_KEY;
  serviceAccount = {
    type: "service_account",
    project_id: process.env.FIREBASE_PROJECT_ID || "skin-infinity",
    private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
    private_key: rawKey,
    client_email: process.env.FIREBASE_CLIENT_EMAIL,
    client_id: process.env.FIREBASE_CLIENT_ID,
    auth_uri: "https://accounts.google.com/o/oauth2/auth",
    token_uri: "https://oauth2.googleapis.com/token",
    auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
    client_x509_cert_url: process.env.FIREBASE_CLIENT_CERT_URL,
    universe_domain: "googleapis.com"
  };
}

// Strictly validate and repair private_key before attempting Firebase initialization
if (serviceAccount && serviceAccount.private_key) {
  const validPrivateKey = getValidPrivateKey(serviceAccount.private_key);

  if (validPrivateKey) {
    serviceAccount.private_key = validPrivateKey;
    try {
      if (!admin.apps.length) {
        admin.initializeApp({
          credential: admin.credential.cert(serviceAccount)
        });
        console.log('✅ Firebase Admin SDK initialized successfully for project:', serviceAccount.project_id);
      }
    } catch (error) {
      console.warn('⚠️ Firebase Admin SDK initialization failed:', error.message);
    }
  } else {
    console.warn('⚠️ Firebase Admin SDK: Invalid or missing private key format. Features requiring Firebase Admin are disabled.');
  }
} else {
  console.warn('⚠️ Firebase Admin SDK: Service account credentials not provided. Features requiring Firebase Admin are disabled.');
}

module.exports = admin;

const admin = require('firebase-admin');
const path = require('path');
const fs = require('fs');

let serviceAccount;

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

// Helper to sanitize & rebuild standard PEM private key
const cleanPrivateKey = (key) => {
  if (!key) return '';
  
  let cleaned = String(key).trim();
  
  // Handle base64 encoded private key string (e.g. FIREBASE_PRIVATE_KEY_BASE64 or base64 pasted into key)
  if (!cleaned.includes('-----BEGIN') && /^[A-Za-z0-9+/=\s]+$/.test(cleaned)) {
    try {
      const decoded = Buffer.from(cleaned, 'base64').toString('utf8');
      if (decoded.includes('-----BEGIN')) {
        cleaned = decoded.trim();
      }
    } catch (e) {
      // not base64 encoded PEM, continue
    }
  }

  // Remove wrapping quotes if any
  if ((cleaned.startsWith('"') && cleaned.endsWith('"')) || (cleaned.startsWith("'") && cleaned.endsWith("'"))) {
    cleaned = cleaned.substring(1, cleaned.length - 1);
  }

  // Replace escaped \n or \\n with actual newlines, and remove carriage returns
  cleaned = cleaned.replace(/\\+n/g, '\n').replace(/\r/g, '');

  const header = '-----BEGIN PRIVATE KEY-----';
  const footer = '-----END PRIVATE KEY-----';
  
  if (cleaned.includes(header) && cleaned.includes(footer)) {
    const startIndex = cleaned.indexOf(header) + header.length;
    const endIndex = cleaned.indexOf(footer);
    let base64Part = cleaned.substring(startIndex, endIndex);
    
    // Remove ALL non-base64 characters (including whitespace, stray slashes, quotes, control chars)
    base64Part = base64Part.replace(/[^A-Za-z0-9+/=]/g, '');
    
    const chunks = [];
    for (let i = 0; i < base64Part.length; i += 64) {
      chunks.push(base64Part.substring(i, i + 64));
    }
    
    return `${header}\n${chunks.join('\n')}\n${footer}\n`;
  }

  return cleaned;
};

// 3. Fallback to individual FIREBASE_* env vars
if (!serviceAccount && (process.env.FIREBASE_PRIVATE_KEY || process.env.FIREBASE_PRIVATE_KEY_BASE64)) {
  const privateKey = process.env.FIREBASE_PRIVATE_KEY_BASE64 || process.env.FIREBASE_PRIVATE_KEY;
  serviceAccount = {
    type: "service_account",
    project_id: process.env.FIREBASE_PROJECT_ID || "skin-infinity",
    private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
    private_key: cleanPrivateKey(privateKey),
    client_email: process.env.FIREBASE_CLIENT_EMAIL,
    client_id: process.env.FIREBASE_CLIENT_ID,
    auth_uri: "https://accounts.google.com/o/oauth2/auth",
    token_uri: "https://oauth2.googleapis.com/token",
    auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
    client_x509_cert_url: process.env.FIREBASE_CLIENT_CERT_URL,
    universe_domain: "googleapis.com"
  };
} else if (serviceAccount && serviceAccount.private_key) {
  // If serviceAccount loaded from file or JSON env var, ensure private_key is cleaned
  serviceAccount.private_key = cleanPrivateKey(serviceAccount.private_key);
}

if (serviceAccount && serviceAccount.private_key) {
  try {
    if (!admin.apps.length) {
      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
      });
      console.log('✅ Firebase Admin SDK initialized successfully for project:', serviceAccount.project_id);
    }
  } catch (error) {
    console.error('❌ Failed to initialize Firebase Admin SDK:', error.message);
    console.error('👉 Please verify your FIREBASE_PRIVATE_KEY environment variable in Render.');
  }
} else {
  console.warn('⚠️ Firebase service account credentials not found or incomplete. Firebase Admin features disabled.');
}

module.exports = admin;

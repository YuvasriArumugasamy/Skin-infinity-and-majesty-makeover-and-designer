const admin = require('firebase-admin');
const path = require('path');
const fs = require('fs');

let serviceAccount;

const serviceAccountPath = path.join(__dirname, 'serviceAccountKey.json');

if (fs.existsSync(serviceAccountPath)) {
  try {
    serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, 'utf8'));
  } catch (error) {
    console.error('Failed to parse serviceAccountKey.json:', error.message);
  }
}

const cleanPrivateKey = (key) => {
  if (!key) return '';
  
  let cleaned = key.trim();
  
  // 1. Remove wrapping quotes if any
  if (cleaned.startsWith('"') && cleaned.endsWith('"')) {
    cleaned = cleaned.substring(1, cleaned.length - 1);
  }
  if (cleaned.startsWith("'") && cleaned.endsWith("'")) {
    cleaned = cleaned.substring(1, cleaned.length - 1);
  }

  // 2. Replace escaped \n or \\n with actual newlines, and remove carriage returns
  cleaned = cleaned.replace(/\\n/g, '\n').replace(/\\n/g, '\n');
  cleaned = cleaned.replace(/\r/g, '');

  const header = '-----BEGIN PRIVATE KEY-----';
  const footer = '-----END PRIVATE KEY-----';
  
  // 3. Reconstruct ASN.1 structure by always chunking the base64 data to 64-char lines
  if (cleaned.includes(header) && cleaned.includes(footer)) {
    const startIndex = cleaned.indexOf(header) + header.length;
    const endIndex = cleaned.indexOf(footer);
    let base64Part = cleaned.substring(startIndex, endIndex).trim();
    
    // Remove ALL whitespace, tabs, and newlines from the base64 part
    base64Part = base64Part.replace(/\s+/g, '');
    
    const chunks = [];
    for (let i = 0; i < base64Part.length; i += 64) {
      chunks.push(base64Part.substring(i, i + 64));
    }
    
    return `${header}\n${chunks.join('\n')}\n${footer}`;
  }

  return cleaned;
};

if (!serviceAccount && process.env.FIREBASE_PRIVATE_KEY) {
  serviceAccount = {
    type: "service_account",
    project_id: process.env.FIREBASE_PROJECT_ID || "skin-infinity",
    private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
    private_key: cleanPrivateKey(process.env.FIREBASE_PRIVATE_KEY),
    client_email: process.env.FIREBASE_CLIENT_EMAIL,
    client_id: process.env.FIREBASE_CLIENT_ID,
    auth_uri: "https://accounts.google.com/o/oauth2/auth",
    token_uri: "https://oauth2.googleapis.com/token",
    auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
    client_x509_cert_url: process.env.FIREBASE_CLIENT_CERT_URL,
    universe_domain: "googleapis.com"
  };
}

if (serviceAccount) {
  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount)
    });
    console.log('✅ Firebase Admin SDK initialized successfully for project:', serviceAccount.project_id);
  }
} else {
  console.warn('⚠️ Firebase service account credentials not found. Firebase Admin features disabled.');
}

module.exports = admin;

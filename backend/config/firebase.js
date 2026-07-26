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
  
  // 1. Remove wrapping quotes if any
  let cleaned = key.trim();
  if (cleaned.startsWith('"') && cleaned.endsWith('"')) {
    cleaned = cleaned.substring(1, cleaned.length - 1);
  }
  if (cleaned.startsWith("'") && cleaned.endsWith("'")) {
    cleaned = cleaned.substring(1, cleaned.length - 1);
  }

  // 2. Replace escaped \n or \\n with actual newlines
  cleaned = cleaned.replace(/\\n/g, '\n').replace(/\\n/g, '\n');

  // 3. Reconstruct ASN.1 structure if Render stripped newlines or joined with spaces
  if (!cleaned.includes('\n')) {
    const header = '-----BEGIN PRIVATE KEY-----';
    const footer = '-----END PRIVATE KEY-----';
    if (cleaned.startsWith(header) && cleaned.endsWith(footer)) {
      let base64Part = cleaned.substring(header.length, cleaned.length - footer.length).trim();
      base64Part = base64Part.replace(/\s+/g, '');
      const chunks = [];
      for (let i = 0; i < base64Part.length; i += 64) {
        chunks.push(base64Part.substring(i, i + 64));
      }
      cleaned = `${header}\n${chunks.join('\n')}\n${footer}`;
    }
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

const axios = require('axios');

let BLOB_ID = '1332666666666666666';
const BLOB_BASE = 'https://jsonblob.com/api/jsonBlob';

const defaultMsgs = [];

async function getCloudMsgs() {
  try {
    const res = await axios.get(`${BLOB_BASE}/${BLOB_ID}`, { timeout: 4000 });
    if (Array.isArray(res.data)) return res.data;
  } catch (e) {
    try {
      const createRes = await axios.post(BLOB_BASE, defaultMsgs, {
        headers: { 'Content-Type': 'application/json' },
        timeout: 4000
      });
      if (createRes.headers && createRes.headers.location) {
        const parts = createRes.headers.location.split('/');
        BLOB_ID = parts[parts.length - 1];
        return defaultMsgs;
      }
    } catch (_) {}
  }
  return defaultMsgs;
}

async function saveCloudMsgs(list) {
  try {
    await axios.put(`${BLOB_BASE}/${BLOB_ID}`, list, {
      headers: { 'Content-Type': 'application/json' },
      timeout: 4000
    });
    return true;
  } catch (e) {
    try {
      const createRes = await axios.post(BLOB_BASE, list, {
        headers: { 'Content-Type': 'application/json' },
        timeout: 4000
      });
      if (createRes.headers && createRes.headers.location) {
        const parts = createRes.headers.location.split('/');
        BLOB_ID = parts[parts.length - 1];
        return true;
      }
    } catch (_) {}
  }
  return false;
}

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'GET') {
    const data = await getCloudMsgs();
    return res.status(200).json({ success: true, count: data.length, data });
  }

  if (req.method === 'POST') {
    const { fullName, phone, email, subject, message } = req.body || {};
    if (!fullName || !phone || !message) {
      return res.status(400).json({ success: false, message: 'Full name, phone and message are required' });
    }

    const created = {
      _id: 'c-' + Date.now() + '-' + Math.floor(Math.random() * 1000),
      fullName: String(fullName).trim(),
      phone: String(phone).trim(),
      email: email ? String(email).trim() : '',
      subject: subject ? String(subject).trim() : 'General Inquiry',
      message: String(message).trim(),
      readStatus: false,
      createdAt: new Date().toISOString()
    };

    const currentList = await getCloudMsgs();
    const updatedList = [created, ...currentList];
    await saveCloudMsgs(updatedList);

    return res.status(201).json({ success: true, message: 'Message sent successfully!', data: created });
  }

  return res.status(405).json({ success: false, message: 'Method Not Allowed' });
};

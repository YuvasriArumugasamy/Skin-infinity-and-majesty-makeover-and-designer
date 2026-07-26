const https = require('https');
const http = require('http');

let memoryCache = null;

const JSONBLOB_URL = 'https://jsonblob.com/api/jsonBlob/1264879201948571025';
const KEYVALUE_URL = 'https://keyvalue.im/skininfinity_msgs_store_2026';

const defaultMsgs = [];

function httpGet(urlStr) {
  return new Promise((resolve) => {
    try {
      const urlObj = new URL(urlStr);
      const client = urlObj.protocol === 'https:' ? https : http;
      const req = client.get(urlStr, (res) => {
        let data = '';
        res.on('data', (chunk) => { data += chunk; });
        res.on('end', () => {
          resolve({ ok: res.statusCode >= 200 && res.statusCode < 300, status: res.statusCode, data });
        });
      });
      req.on('error', () => resolve({ ok: false, status: 500, data: '' }));
      req.setTimeout(4000, () => { req.destroy(); resolve({ ok: false, status: 408, data: '' }); });
    } catch (e) {
      resolve({ ok: false, status: 500, data: '' });
    }
  });
}

function httpPost(urlStr, bodyData, method = 'POST', headers = {}) {
  return new Promise((resolve) => {
    try {
      const urlObj = new URL(urlStr);
      const client = urlObj.protocol === 'https:' ? https : http;
      const payload = typeof bodyData === 'string' ? bodyData : JSON.stringify(bodyData);

      const reqOptions = {
        hostname: urlObj.hostname,
        port: urlObj.port || (urlObj.protocol === 'https:' ? 443 : 80),
        path: urlObj.pathname + urlObj.search,
        method: method,
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': Buffer.byteLength(payload),
          ...headers
        }
      };

      const req = client.request(reqOptions, (res) => {
        let data = '';
        res.on('data', (chunk) => { data += chunk; });
        res.on('end', () => {
          resolve({ ok: res.statusCode >= 200 && res.statusCode < 300, status: res.statusCode, data });
        });
      });

      req.on('error', () => resolve({ ok: false, status: 500, data: '' }));
      req.setTimeout(4000, () => { req.destroy(); resolve({ ok: false, status: 408, data: '' }); });
      req.write(payload);
      req.end();
    } catch (e) {
      resolve({ ok: false, status: 500, data: '' });
    }
  });
}

async function getMsgs() {
  try {
    const res = await httpGet(KEYVALUE_URL);
    if (res.ok && res.data && res.data.trim().startsWith('[')) {
      const data = JSON.parse(res.data);
      if (Array.isArray(data)) {
        memoryCache = data;
        return data;
      }
    }
  } catch (_) {}

  try {
    const res = await httpGet(JSONBLOB_URL);
    if (res.ok && res.data && res.data.trim().startsWith('[')) {
      const data = JSON.parse(res.data);
      if (Array.isArray(data)) {
        memoryCache = data;
        return data;
      }
    }
  } catch (_) {}

  if (Array.isArray(memoryCache)) return memoryCache;
  return defaultMsgs;
}

async function saveMsgs(list) {
  memoryCache = list;
  let saved = false;
  const payload = JSON.stringify(list);

  try {
    const res = await httpPost(KEYVALUE_URL, list, 'POST', { 'Content-Type': 'text/plain' });
    if (res.ok) saved = true;
  } catch (_) {}

  try {
    let res = await httpPost(JSONBLOB_URL, list, 'PUT', { 'Content-Type': 'application/json' });
    if (!res.ok && res.status === 404) {
      res = await httpPost('https://jsonblob.com/api/jsonBlob', list, 'POST', { 'Content-Type': 'application/json' });
    }
    if (res.ok) saved = true;
  } catch (_) {}

  return saved;
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
    const data = await getMsgs();
    return res.status(200).json({ success: true, count: data.length, data });
  }

  if (req.method === 'POST') {
    const body = req.body || {};
    const { fullName, phone, email, subject, message } = body;
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

    const currentList = await getMsgs();
    const updatedList = [created, ...currentList];
    await saveMsgs(updatedList);

    return res.status(201).json({ success: true, message: 'Message sent successfully!', data: created });
  }

  return res.status(405).json({ success: false, message: 'Method Not Allowed' });
};

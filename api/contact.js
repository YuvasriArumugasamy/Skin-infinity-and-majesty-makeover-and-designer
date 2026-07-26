let memoryCache = null;

const JSONBLOB_URL = 'https://jsonblob.com/api/jsonBlob/1264879201948571025';
const KEYVALUE_URL = 'https://keyvalue.im/skininfinity_msgs_store_2026';

const defaultMsgs = [];

async function fetchCloud(url, options = {}) {
  try {
    const res = await fetch(url, options);
    if (res.ok) {
      const text = await res.text();
      try {
        const data = JSON.parse(text);
        if (Array.isArray(data)) return data;
      } catch (_) {}
    }
  } catch (_) {}
  return null;
}

async function getMsgs() {
  const data1 = await fetchCloud(KEYVALUE_URL);
  if (data1) { memoryCache = data1; return data1; }

  const data2 = await fetchCloud(JSONBLOB_URL, { headers: { 'Accept': 'application/json' } });
  if (data2) { memoryCache = data2; return data2; }

  if (Array.isArray(memoryCache)) return memoryCache;
  return defaultMsgs;
}

async function saveMsgs(list) {
  memoryCache = list;
  const payload = JSON.stringify(list);
  let saved = false;

  try {
    const res = await fetch(KEYVALUE_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain' },
      body: payload
    });
    if (res.ok) saved = true;
  } catch (_) {}

  try {
    let res = await fetch(JSONBLOB_URL, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: payload
    });
    if (res.status === 404) {
      res = await fetch('https://jsonblob.com/api/jsonBlob', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: payload
      });
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

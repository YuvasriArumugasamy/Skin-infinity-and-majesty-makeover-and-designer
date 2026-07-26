let memoryCache = null;

const KV_URL_1 = 'https://kvdb.io/skininfinity_majesty_v4_store/contact_messages';
const KV_URL_2 = 'https://api.npoint.io/skininfinity_contact_backup';

const defaultMsgs = [];

async function fetchWithAutoProvision(url, options = {}) {
  try {
    let res = await fetch(url, options);
    if (res.status === 404 && options.method === 'POST' && url.includes('kvdb.io')) {
      try {
        await fetch('https://kvdb.io/', { method: 'POST' });
        res = await fetch(url, options);
      } catch (_) {}
    }
    return res;
  } catch (e) {
    return null;
  }
}

async function getMsgs() {
  const res1 = await fetchWithAutoProvision(KV_URL_1);
  if (res1 && res1.ok) {
    try {
      const data = await res1.json();
      if (Array.isArray(data)) {
        memoryCache = data;
        return data;
      }
    } catch (_) {}
  }

  const res2 = await fetchWithAutoProvision(KV_URL_2);
  if (res2 && res2.ok) {
    try {
      const data = await res2.json();
      if (Array.isArray(data)) {
        memoryCache = data;
        return data;
      }
    } catch (_) {}
  }

  if (Array.isArray(memoryCache)) return memoryCache;
  return defaultMsgs;
}

async function saveMsgs(list) {
  memoryCache = list;
  let saved = false;

  const payload = JSON.stringify(list);

  try {
    const r1 = await fetchWithAutoProvision(KV_URL_1, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain' },
      body: payload
    });
    if (r1 && r1.ok) saved = true;
  } catch (_) {}

  try {
    const r2 = await fetchWithAutoProvision(KV_URL_2, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: payload
    });
    if (r2 && r2.ok) saved = true;
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


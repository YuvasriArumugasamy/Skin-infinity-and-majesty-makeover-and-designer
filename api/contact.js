const KV_STORE_URL = 'https://kvdb.io/skininfinity2026majesty/contact_messages';

const defaultMsgs = [];

async function getMsgs() {
  try {
    const res = await fetch(KV_STORE_URL);
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data)) return data;
    }
  } catch (e) {
    try {
      await fetch(KV_STORE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain' },
        body: JSON.stringify(defaultMsgs)
      });
    } catch (_) {}
  }
  return defaultMsgs;
}

async function saveMsgs(list) {
  try {
    const res = await fetch(KV_STORE_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain' },
      body: JSON.stringify(list)
    });
    return res.ok;
  } catch (e) {
    return false;
  }
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

const axios = require('axios');

const FIRESTORE_URL = 'https://firestore.googleapis.com/v1/projects/skin-infinity/databases/(default)/documents/contact_messages';

let inMemoryMsgs = [];

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'GET') {
    try {
      const fsRes = await axios.get(FIRESTORE_URL, { timeout: 4000 });
      const docs = fsRes.data?.documents || [];
      const cloudMsgs = docs.map(doc => {
        const fields = doc.fields || {};
        return {
          _id: fields.docId?.stringValue || doc.name.split('/').pop(),
          fullName: fields.fullName?.stringValue || 'Sender',
          phone: fields.phone?.stringValue || '',
          email: fields.email?.stringValue || '',
          subject: fields.subject?.stringValue || 'General Inquiry',
          message: fields.message?.stringValue || '',
          readStatus: fields.readStatus?.booleanValue || false,
          createdAt: fields.createdAt?.stringValue || new Date().toISOString()
        };
      });

      const combined = [...cloudMsgs, ...inMemoryMsgs];
      const unique = Array.from(new Map(combined.map(item => [String(item._id), item])).values());
      return res.status(200).json({ success: true, count: unique.length, data: unique });
    } catch (e) {
      return res.status(200).json({ success: true, count: inMemoryMsgs.length, data: inMemoryMsgs });
    }
  }

  if (req.method === 'POST') {
    const { fullName, phone, email, subject, message } = req.body || {};
    if (!fullName || !phone || !message) {
      return res.status(400).json({ success: false, message: 'Full name, phone and message are required' });
    }

    const docId = 'c_' + Date.now();
    const created = {
      _id: docId,
      fullName: String(fullName).trim(),
      phone: String(phone).trim(),
      email: email ? String(email).trim() : '',
      subject: subject ? String(subject).trim() : 'General Inquiry',
      message: String(message).trim(),
      readStatus: false,
      createdAt: new Date().toISOString()
    };

    inMemoryMsgs.unshift(created);

    try {
      const payload = {
        fields: {
          docId: { stringValue: docId },
          fullName: { stringValue: created.fullName },
          phone: { stringValue: created.phone },
          email: { stringValue: created.email },
          subject: { stringValue: created.subject },
          message: { stringValue: created.message },
          readStatus: { booleanValue: false },
          createdAt: { stringValue: created.createdAt }
        }
      };
      await axios.post(`${FIRESTORE_URL}?documentId=${docId}`, payload, { timeout: 4000 });
    } catch (err) {}

    return res.status(201).json({ success: true, message: 'Message sent successfully!', data: created });
  }

  return res.status(405).json({ success: false, message: 'Method Not Allowed' });
};

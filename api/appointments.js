const axios = require('axios');

const FIRESTORE_URL = 'https://firestore.googleapis.com/v1/projects/skin-infinity/databases/(default)/documents/appointments';

// In-memory fallback for instant Vercel serverless response
let inMemoryStore = [
  {
    _id: 'sample-1',
    customerName: 'yuvasri',
    phone: '9876543210',
    service: 'Skin Lightening Chemical Peeling',
    category: 'Skin Care',
    date: '2026-07-31',
    time: '10:00 AM',
    status: 'Pending',
    createdAt: new Date().toISOString()
  }
];

module.exports = async (req, res) => {
  // CORS Headers
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // GET /api/appointments
  if (req.method === 'GET') {
    try {
      const fsRes = await axios.get(FIRESTORE_URL, { timeout: 4000 });
      const docs = fsRes.data?.documents || [];
      const cloudData = docs.map(doc => {
        const fields = doc.fields || {};
        return {
          _id: fields.docId?.stringValue || doc.name.split('/').pop(),
          customerName: fields.customerName?.stringValue || 'Client',
          phone: fields.phone?.stringValue || '',
          email: fields.email?.stringValue || '',
          category: fields.category?.stringValue || 'Beauty Care',
          service: fields.service?.stringValue || 'General Treatment',
          date: fields.date?.stringValue || new Date().toISOString().split('T')[0],
          time: fields.time?.stringValue || '10:00 AM',
          notes: fields.notes?.stringValue || '',
          status: fields.status?.stringValue || 'Pending',
          createdAt: fields.createdAt?.stringValue || new Date().toISOString()
        };
      });

      const combined = [...cloudData, ...inMemoryStore];
      const unique = Array.from(new Map(combined.map(item => [String(item._id), item])).values());
      return res.status(200).json({ success: true, count: unique.length, data: unique });
    } catch (e) {
      return res.status(200).json({ success: true, count: inMemoryStore.length, data: inMemoryStore });
    }
  }

  // POST /api/appointments
  if (req.method === 'POST') {
    const { customerName, phone, email, category, service, date, time, notes } = req.body || {};
    if (!customerName || !phone) {
      return res.status(400).json({ success: false, message: 'Customer name and phone are required' });
    }

    const docId = 'apt_' + Date.now();
    const created = {
      _id: docId,
      customerName: String(customerName).trim(),
      phone: String(phone).trim(),
      email: email ? String(email).trim() : '',
      category: category || 'Beauty Care',
      service: service || 'General Treatment',
      date: date || new Date().toISOString().split('T')[0],
      time: time || '10:00 AM',
      notes: notes ? String(notes).trim() : '',
      status: 'Pending',
      createdAt: new Date().toISOString()
    };

    inMemoryStore.unshift(created);

    // Save to Firestore Cloud in background
    try {
      const payload = {
        fields: {
          docId: { stringValue: docId },
          customerName: { stringValue: created.customerName },
          phone: { stringValue: created.phone },
          email: { stringValue: created.email },
          category: { stringValue: created.category },
          service: { stringValue: created.service },
          date: { stringValue: created.date },
          time: { stringValue: created.time },
          notes: { stringValue: created.notes },
          status: { stringValue: created.status },
          createdAt: { stringValue: created.createdAt }
        }
      };
      await axios.post(`${FIRESTORE_URL}?documentId=${docId}`, payload, { timeout: 4000 });
    } catch (err) {
      console.warn('Firestore cloud save notice:', err.message);
    }

    return res.status(201).json({ success: true, message: 'Appointment booked successfully!', data: created });
  }

  return res.status(405).json({ success: false, message: 'Method Not Allowed' });
};

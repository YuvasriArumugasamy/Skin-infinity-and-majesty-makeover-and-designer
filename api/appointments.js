const axios = require('axios');

// Shared Cloud Bin ID for Skin Infinity & Majesty studio
let BLOB_ID = '1332555555555555555';
const BLOB_BASE = 'https://jsonblob.com/api/jsonBlob';

// Initial sample data if cloud is empty
const defaultAppointments = [
  {
    _id: 'apt-default-1',
    customerName: 'yuvasri',
    phone: '9876543210',
    email: 'yuvasri@skininfinity.com',
    category: 'Skin Care',
    service: 'Skin Lightening Chemical Peeling',
    date: '2026-07-31',
    time: '10:00 AM',
    notes: 'Sample booking',
    status: 'Pending',
    createdAt: new Date().toISOString()
  }
];

/**
 * Helper to fetch persistent appointments array from Cloud Storage
 */
async function getCloudAppointments() {
  try {
    const res = await axios.get(`${BLOB_BASE}/${BLOB_ID}`, { timeout: 4000 });
    if (Array.isArray(res.data) && res.data.length > 0) {
      return res.data;
    }
  } catch (e) {
    // If Blob ID 404s or is missing, auto-create a new Cloud Bin via POST
    try {
      const createRes = await axios.post(BLOB_BASE, defaultAppointments, {
        headers: { 'Content-Type': 'application/json' },
        timeout: 4000
      });
      if (createRes.headers && createRes.headers.location) {
        const parts = createRes.headers.location.split('/');
        BLOB_ID = parts[parts.length - 1];
        return defaultAppointments;
      }
    } catch (_) {}
  }
  return defaultAppointments;
}

/**
 * Helper to save persistent appointments array to Cloud Storage
 */
async function saveCloudAppointments(list) {
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
  // CORS Headers for Vercel Serverless
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // GET /api/appointments
  if (req.method === 'GET') {
    const data = await getCloudAppointments();
    return res.status(200).json({ success: true, count: data.length, data });
  }

  // POST /api/appointments
  if (req.method === 'POST') {
    const { customerName, phone, email, category, service, date, time, notes } = req.body || {};
    if (!customerName || !phone) {
      return res.status(400).json({ success: false, message: 'Customer name and phone are required' });
    }

    const created = {
      _id: 'apt-' + Date.now() + '-' + Math.floor(Math.random() * 1000),
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

    const currentList = await getCloudAppointments();
    const updatedList = [created, ...currentList.filter(item => item && (item.phone !== created.phone || item.date !== created.date))];

    await saveCloudAppointments(updatedList);

    return res.status(201).json({ success: true, message: 'Appointment booked successfully!', data: created });
  }

  // PATCH /api/appointments/:id/status
  if (req.method === 'PATCH' || req.method === 'PUT') {
    const { id, status } = req.body || {};
    const currentList = await getCloudAppointments();
    const updatedList = currentList.map(item => item._id === id ? { ...item, status: status || item.status } : item);
    await saveCloudAppointments(updatedList);
    return res.status(200).json({ success: true, message: 'Status updated', data: updatedList });
  }

  // DELETE /api/appointments/:id
  if (req.method === 'DELETE') {
    const { id } = req.query || req.body || {};
    const currentList = await getCloudAppointments();
    const updatedList = currentList.filter(item => item._id !== id);
    await saveCloudAppointments(updatedList);
    return res.status(200).json({ success: true, message: 'Appointment deleted' });
  }

  return res.status(405).json({ success: false, message: 'Method Not Allowed' });
};

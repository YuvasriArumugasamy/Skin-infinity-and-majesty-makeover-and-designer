const KV_STORE_URL = 'https://kvdb.io/skininfinity2026majesty/appointments';

const defaultAppointments = [
  {
    _id: 'apt-sample-1',
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

async function getAppointments() {
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
        body: JSON.stringify(defaultAppointments)
      });
    } catch (_) {}
  }
  return defaultAppointments;
}

async function saveAppointments(list) {
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
    const data = await getAppointments();
    return res.status(200).json({ success: true, count: data.length, data });
  }

  // POST /api/appointments
  if (req.method === 'POST') {
    const body = req.body || {};
    const { customerName, phone, email, category, service, date, time, notes } = body;
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

    const currentList = await getAppointments();
    const updatedList = [created, ...currentList.filter(item => item && (item.phone !== created.phone || item.date !== created.date))];

    await saveAppointments(updatedList);

    return res.status(201).json({ success: true, message: 'Appointment booked successfully!', data: created });
  }

  // PATCH /api/appointments
  if (req.method === 'PATCH' || req.method === 'PUT') {
    const { id, status } = req.body || {};
    const currentList = await getAppointments();
    const updatedList = currentList.map(item => item._id === id ? { ...item, status: status || item.status } : item);
    await saveAppointments(updatedList);
    return res.status(200).json({ success: true, message: 'Status updated', data: updatedList });
  }

  // DELETE /api/appointments
  if (req.method === 'DELETE') {
    const { id } = req.query || req.body || {};
    const currentList = await getAppointments();
    const updatedList = currentList.filter(item => item._id !== id);
    await saveAppointments(updatedList);
    return res.status(200).json({ success: true, message: 'Appointment deleted' });
  }

  return res.status(405).json({ success: false, message: 'Method Not Allowed' });
};

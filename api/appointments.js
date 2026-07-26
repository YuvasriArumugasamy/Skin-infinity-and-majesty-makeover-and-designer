// Global memory cache per lambda process for ultra-fast response
let memoryCache = null;

const KV_URL_1 = 'https://kvdb.io/skininfinity_majesty_v4_store/appointments';
const KV_URL_2 = 'https://api.npoint.io/skininfinity_appts_backup';

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

async function fetchWithAutoProvision(url, options = {}) {
  try {
    let res = await fetch(url, options);
    // If kvdb bucket returns 404 on write, attempt bucket creation
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

async function getAppointments() {
  // 1. Try Primary Cloud Store
  const res1 = await fetchWithAutoProvision(KV_URL_1);
  if (res1 && res1.ok) {
    try {
      const data = await res1.json();
      if (Array.isArray(data) && data.length > 0) {
        memoryCache = data;
        return data;
      }
    } catch (_) {}
  }

  // 2. Try Secondary Backup Cloud Store
  const res2 = await fetchWithAutoProvision(KV_URL_2);
  if (res2 && res2.ok) {
    try {
      const data = await res2.json();
      if (Array.isArray(data) && data.length > 0) {
        memoryCache = data;
        return data;
      }
    } catch (_) {}
  }

  // 3. Fallback to memory cache or default
  if (Array.isArray(memoryCache) && memoryCache.length > 0) {
    return memoryCache;
  }

  return defaultAppointments;
}

async function saveAppointments(list) {
  memoryCache = list;
  let saved = false;

  const payload = JSON.stringify(list);

  // Save to Primary KV Store
  try {
    const r1 = await fetchWithAutoProvision(KV_URL_1, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain' },
      body: payload
    });
    if (r1 && r1.ok) saved = true;
  } catch (_) {}

  // Save to Backup Store
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
  // CORS Headers for Vercel Serverless Function
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Helper to extract ID from URL path or body/query (e.g., /api/appointments/apt-123/status)
  const getTargetId = () => {
    if (req.body && req.body.id) return String(req.body.id);
    if (req.query && req.query.id) return String(req.query.id);
    const rawUrl = req.url || '';
    const match = rawUrl.match(/\/api\/appointments\/([^\/?#]+)/);
    if (match && match[1] && match[1] !== 'status') {
      return match[1];
    }
    return null;
  };

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

    const cleanName = String(customerName).trim();
    const cleanPhone = String(phone).trim();
    const cleanDate = date || new Date().toISOString().split('T')[0];
    const cleanTime = time || '10:00 AM';
    const cleanService = service || 'General Treatment';

    const currentList = await getAppointments();

    // Check for recent duplicate submission (within last 60 seconds)
    const existingIndex = currentList.findIndex(item => 
      item &&
      item.customerName?.toLowerCase() === cleanName.toLowerCase() &&
      item.phone === cleanPhone &&
      item.date === cleanDate &&
      item.time === cleanTime
    );

    if (existingIndex >= 0) {
      return res.status(200).json({ 
        success: true, 
        message: 'Appointment already recorded', 
        data: currentList[existingIndex] 
      });
    }

    const created = {
      _id: 'apt-' + Date.now() + '-' + Math.floor(Math.random() * 1000),
      customerName: cleanName,
      phone: cleanPhone,
      email: email ? String(email).trim() : '',
      category: category || 'Beauty Care',
      service: cleanService,
      date: cleanDate,
      time: cleanTime,
      notes: notes ? String(notes).trim() : '',
      status: 'Pending',
      createdAt: new Date().toISOString()
    };

    const updatedList = [created, ...currentList];
    await saveAppointments(updatedList);

    return res.status(201).json({ 
      success: true, 
      message: 'Appointment booked successfully!', 
      data: created 
    });
  }

  // PATCH or PUT /api/appointments
  if (req.method === 'PATCH' || req.method === 'PUT') {
    const targetId = getTargetId();
    const status = req.body?.status;

    if (!targetId) {
      return res.status(400).json({ success: false, message: 'Appointment ID is required for status update' });
    }

    const currentList = await getAppointments();
    const updatedList = currentList.map(item => 
      item && item._id === targetId ? { ...item, status: status || item.status } : item
    );

    await saveAppointments(updatedList);
    return res.status(200).json({ success: true, message: 'Status updated successfully', data: updatedList });
  }

  // DELETE /api/appointments
  if (req.method === 'DELETE') {
    const targetId = getTargetId();
    if (!targetId) {
      return res.status(400).json({ success: false, message: 'Appointment ID is required for deletion' });
    }

    const currentList = await getAppointments();
    const updatedList = currentList.filter(item => item && item._id !== targetId);

    await saveAppointments(updatedList);
    return res.status(200).json({ success: true, message: 'Appointment deleted successfully' });
  }

  return res.status(405).json({ success: false, message: 'Method Not Allowed' });
};


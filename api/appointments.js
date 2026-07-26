const https = require('https');
const http = require('http');

let memoryCache = null;

const JSONBLOB_URL = 'https://jsonblob.com/api/jsonBlob/1264879201948571024';
const KEYVALUE_URL = 'https://keyvalue.im/skininfinity_appts_store_2026';

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

async function getAppointments() {
  // 1. Try KeyValue store
  try {
    const res = await httpGet(KEYVALUE_URL);
    if (res.ok && res.data && res.data.trim().startsWith('[')) {
      const data = JSON.parse(res.data);
      if (Array.isArray(data) && data.length > 0) {
        memoryCache = data;
        return data;
      }
    }
  } catch (_) {}

  // 2. Try JSONBlob store
  try {
    const res = await httpGet(JSONBLOB_URL);
    if (res.ok && res.data && res.data.trim().startsWith('[')) {
      const data = JSON.parse(res.data);
      if (Array.isArray(data) && data.length > 0) {
        memoryCache = data;
        return data;
      }
    }
  } catch (_) {}

  if (Array.isArray(memoryCache) && memoryCache.length > 0) {
    return memoryCache;
  }

  return defaultAppointments;
}

async function saveAppointments(list) {
  memoryCache = list;
  let saved = false;

  // 1. Save to KeyValue store
  try {
    const res = await httpPost(KEYVALUE_URL, list, 'POST', { 'Content-Type': 'text/plain' });
    if (res.ok) saved = true;
  } catch (_) {}

  // 2. Save to JSONBlob store
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

  if (req.method === 'GET') {
    const data = await getAppointments();
    return res.status(200).json({ success: true, count: data.length, data });
  }

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

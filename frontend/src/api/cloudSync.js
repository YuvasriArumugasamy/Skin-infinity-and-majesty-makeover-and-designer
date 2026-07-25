import axios from 'axios';

const KV_STORE_URL = 'https://kvdb.io/skininfinity2026majesty/appointments';

/**
 * Save an appointment to shared permanent Cloud Store across all devices & browsers
 */
export const saveAppointmentToCloud = async (aptData) => {
  const newApt = {
    _id: 'cloud-' + Date.now() + '-' + Math.floor(Math.random() * 1000),
    customerName: String(aptData.customerName || 'Client').trim(),
    phone: String(aptData.phone || '').trim(),
    email: String(aptData.email || '').trim(),
    category: String(aptData.category || 'Beauty Care'),
    service: String(aptData.service || 'General Treatment'),
    date: String(aptData.date || new Date().toISOString().split('T')[0]),
    time: String(aptData.time || '10:00 AM'),
    notes: String(aptData.notes || '').trim(),
    status: 'Pending',
    createdAt: new Date().toISOString()
  };

  // 1. Save locally in current browser localStorage immediately
  try {
    const existing = JSON.parse(localStorage.getItem('appointments') || '[]');
    const isDuplicate = existing.some(item => item && item.customerName === newApt.customerName && item.phone === newApt.phone && item.date === newApt.date);
    if (!isDuplicate) {
      localStorage.setItem('appointments', JSON.stringify([newApt, ...existing]));
    }
  } catch (_) {}

  // 2. Save to Permanent Cloud Key
  try {
    let currentList = [];
    try {
      const res = await axios.get(KV_STORE_URL, { timeout: 3500 });
      if (res.data && Array.isArray(res.data)) {
        currentList = res.data;
      } else if (typeof res.data === 'string') {
        const parsed = JSON.parse(res.data);
        if (Array.isArray(parsed)) currentList = parsed;
      }
    } catch (_) {}

    const updatedList = [
      newApt,
      ...currentList.filter(item => item && (item.phone !== newApt.phone || item.date !== newApt.date))
    ];

    await axios.post(KV_STORE_URL, JSON.stringify(updatedList), {
      headers: { 'Content-Type': 'text/plain' },
      timeout: 4000
    });
    return true;
  } catch (error) {
    console.warn('Cloud Sync notice:', error?.message);
    return false;
  }
};

/**
 * Fetch all appointments from permanent Cloud Store across all devices
 */
export const fetchAppointmentsFromCloud = async () => {
  try {
    const res = await axios.get(KV_STORE_URL, { timeout: 4000 });
    if (res.data && Array.isArray(res.data)) {
      return res.data;
    }
    if (typeof res.data === 'string') {
      const parsed = JSON.parse(res.data);
      if (Array.isArray(parsed)) return parsed;
    }
  } catch (error) {
    console.warn('Cloud Sync fetch notice:', error?.message);
  }
  return [];
};

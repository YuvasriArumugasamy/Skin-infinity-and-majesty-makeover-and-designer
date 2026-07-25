import axios from 'axios';

// Primary Cloud Bin URL
let cloudBinUrl = 'https://jsonblob.com/api/jsonBlob/1332456789012345678';

/**
 * Save an appointment to shared Cloud Store across all devices & browsers
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

  // Save locally in current browser localStorage first
  try {
    const existing = JSON.parse(localStorage.getItem('appointments') || '[]');
    const isDuplicate = existing.some(item => item && item.customerName === newApt.customerName && item.phone === newApt.phone && item.date === newApt.date);
    if (!isDuplicate) {
      localStorage.setItem('appointments', JSON.stringify([newApt, ...existing]));
    }
  } catch (_) {}

  // Post to Cloud Bin for cross-device sync
  try {
    let currentList = [];
    try {
      const getRes = await axios.get(cloudBinUrl, { timeout: 3500 });
      if (Array.isArray(getRes.data)) {
        currentList = getRes.data;
      }
    } catch (_) {}

    const updatedList = [
      newApt,
      ...currentList.filter(item => item && (item.phone !== newApt.phone || item.date !== newApt.date))
    ];

    try {
      await axios.put(cloudBinUrl, updatedList, {
        headers: { 'Content-Type': 'application/json' },
        timeout: 4000
      });
      return true;
    } catch (putErr) {
      // If PUT fails, create a new Cloud Bin via POST
      const createRes = await axios.post('https://jsonblob.com/api/jsonBlob', updatedList, {
        headers: { 'Content-Type': 'application/json' },
        timeout: 4000
      });
      if (createRes.headers && createRes.headers.location) {
        cloudBinUrl = createRes.headers.location.replace('http:', 'https:');
      }
      return true;
    }
  } catch (error) {
    console.warn('Cloud Sync notice:', error?.message);
    return false;
  }
};

/**
 * Fetch all appointments from shared Cloud Store across all devices
 */
export const fetchAppointmentsFromCloud = async () => {
  try {
    const res = await axios.get(cloudBinUrl, { timeout: 4000 });
    if (Array.isArray(res.data)) {
      return res.data;
    }
  } catch (error) {
    console.warn('Cloud Sync fetch notice:', error?.message);
  }
  return [];
};

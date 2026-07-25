/**
 * Save an appointment to shared permanent Cloud Store across all devices & browsers
 */
export const saveAppointmentToCloud = async (aptData) => {
  const newApt = {
    customerName: String(aptData.customerName || 'Client').trim(),
    phone: String(aptData.phone || '').trim(),
    email: String(aptData.email || '').trim(),
    category: String(aptData.category || 'Beauty Care'),
    service: String(aptData.service || 'General Treatment'),
    date: String(aptData.date || new Date().toISOString().split('T')[0]),
    time: String(aptData.time || '10:00 AM'),
    notes: String(aptData.notes || '').trim()
  };

  // 1. Save locally in current browser localStorage immediately
  try {
    const existing = JSON.parse(localStorage.getItem('appointments') || '[]');
    const tempApt = { _id: 'local-' + Date.now(), ...newApt, status: 'Pending', createdAt: new Date().toISOString() };
    const isDuplicate = existing.some(item => item && item.customerName === newApt.customerName && item.phone === newApt.phone && item.date === newApt.date);
    if (!isDuplicate) {
      localStorage.setItem('appointments', JSON.stringify([tempApt, ...existing]));
    }
  } catch (_) {}

  // 2. Post to same-domain Vercel Serverless Function /api/appointments (Zero CORS Issue)
  try {
    const res = await fetch('/api/appointments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newApt)
    });
    if (res.ok) {
      const json = await res.json();
      return json?.data;
    }
  } catch (error) {
    console.warn('Cloud Sync save notice:', error?.message);
  }
  return null;
};

/**
 * Fetch all appointments from Vercel Serverless /api/appointments
 */
export const fetchAppointmentsFromCloud = async () => {
  try {
    const res = await fetch('/api/appointments');
    if (res.ok) {
      const json = await res.json();
      if (json?.data && Array.isArray(json.data)) {
        return json.data;
      }
    }
  } catch (error) {
    console.warn('Cloud Sync fetch notice:', error?.message);
  }

  // LocalStorage Fallback
  try {
    return JSON.parse(localStorage.getItem('appointments') || '[]');
  } catch (_) {
    return [];
  }
};

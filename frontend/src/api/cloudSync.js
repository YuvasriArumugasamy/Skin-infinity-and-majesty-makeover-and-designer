import api from './axios';

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

  // Post to backend database via centralized API client
  try {
    const res = await api.post('/api/appointments', newApt);
    if (res.data?.success && res.data?.data) {
      return res.data.data;
    }
  } catch (error) {
    console.warn('Cloud Sync save notice:', error?.message);
  }
  return null;
};

/**
 * Fetch all appointments from backend database via centralized API client
 */
export const fetchAppointmentsFromCloud = async () => {
  try {
    const res = await api.get('/api/appointments');
    if (res.data?.success && Array.isArray(res.data?.data)) {
      return res.data.data;
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

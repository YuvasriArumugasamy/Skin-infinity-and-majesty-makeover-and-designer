import axios from 'axios';

// Cloud Sync Store using Firebase Firestore REST API (Project: skin-infinity)
const FIREBASE_REST_URL = 'https://firestore.googleapis.com/v1/projects/skin-infinity/databases/(default)/documents/appointments';

/**
 * Save an appointment to Cloud Store (works across all devices & browsers)
 */
export const saveAppointmentToCloud = async (aptData) => {
  try {
    const docId = 'apt_' + Date.now();
    const payload = {
      fields: {
        docId: { stringValue: docId },
        customerName: { stringValue: String(aptData.customerName || '') },
        phone: { stringValue: String(aptData.phone || '') },
        email: { stringValue: String(aptData.email || '') },
        category: { stringValue: String(aptData.category || 'Beauty Care') },
        service: { stringValue: String(aptData.service || '') },
        date: { stringValue: String(aptData.date || '') },
        time: { stringValue: String(aptData.time || '10:00 AM') },
        notes: { stringValue: String(aptData.notes || '') },
        status: { stringValue: String(aptData.status || 'Pending') },
        createdAt: { stringValue: new Date().toISOString() }
      }
    };

    await axios.post(`${FIREBASE_REST_URL}?documentId=${docId}`, payload);
    return true;
  } catch (error) {
    console.warn('Cloud Sync save notice:', error?.message);
    return false;
  }
};

/**
 * Fetch all appointments from Cloud Store across all devices
 */
export const fetchAppointmentsFromCloud = async () => {
  try {
    const res = await axios.get(FIREBASE_REST_URL);
    const documents = res.data?.documents || [];
    
    return documents.map(doc => {
      const fields = doc.fields || {};
      return {
        _id: fields.docId?.stringValue || doc.name.split('/').pop(),
        customerName: fields.customerName?.stringValue || 'Client',
        phone: fields.phone?.stringValue || '',
        email: fields.email?.stringValue || '',
        category: fields.category?.stringValue || 'Beauty Care',
        service: fields.service?.stringValue || 'General Service',
        date: fields.date?.stringValue || new Date().toISOString().split('T')[0],
        time: fields.time?.stringValue || '10:00 AM',
        notes: fields.notes?.stringValue || '',
        status: fields.status?.stringValue || 'Pending',
        createdAt: fields.createdAt?.stringValue || new Date().toISOString()
      };
    });
  } catch (error) {
    console.warn('Cloud Sync fetch notice:', error?.message);
    return [];
  }
};

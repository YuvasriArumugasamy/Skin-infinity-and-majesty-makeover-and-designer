const mongoose = require('mongoose');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://skininfinitymajesty_db_user:skin123@cluster0.ja74j9f.mongodb.net/skin_infinity_db?appName=Cluster0';

let cachedDb = null;

async function connectToDatabase() {
  if (cachedDb && mongoose.connection.readyState === 1) {
    return cachedDb;
  }
  cachedDb = await mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  return cachedDb;
}

const appointmentSchema = new mongoose.Schema({
  customerName: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, default: '' },
  gender: { type: String, enum: ['Female', 'Male', 'Other'], default: 'Female' },
  age: { type: Number },
  category: { type: String, required: true },
  service: { type: String, required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
  notes: { type: String },
  status: { type: String, enum: ['Pending', 'Confirmed', 'Completed', 'Cancelled'], default: 'Pending' }
}, { timestamps: true });

const Appointment = mongoose.models.Appointment || mongoose.model('Appointment', appointmentSchema);

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    await connectToDatabase();
  } catch (error) {
    console.error('MongoDB connection error in Vercel function:', error);
    return res.status(500).json({ success: false, message: 'Database connection failed' });
  }

  const getTargetId = () => {
    if (req.body && req.body.id) return String(req.body.id);
    if (req.query && req.query.id) return String(req.query.id);
    const rawUrl = req.url || '';
    const match = rawUrl.match(/\/api\/appointments\/([^\/?#]+)/);
    if (match && match[1] && match[1] !== 'status') return match[1];
    return null;
  };

  if (req.method === 'GET') {
    try {
      const data = await Appointment.find().sort({ createdAt: -1 });
      return res.status(200).json({ success: true, count: data.length, data });
    } catch (err) {
      return res.status(500).json({ success: false, message: err.message });
    }
  }

  if (req.method === 'POST') {
    const body = req.body || {};
    const { customerName, phone, email, gender, age, category, service, date, time, notes } = body;
    if (!customerName || !phone) {
      return res.status(400).json({ success: false, message: 'Customer name and phone are required' });
    }

    const cleanName = String(customerName).trim();
    const cleanPhone = String(phone).trim();
    const cleanDate = date || new Date().toISOString().split('T')[0];
    const cleanTime = time || '10:00 AM';
    const cleanService = service || 'General Treatment';

    try {
      const existing = await Appointment.findOne({
        customerName: { $regex: new RegExp('^' + cleanName + '$', 'i') },
        phone: cleanPhone,
        date: cleanDate,
        time: cleanTime
      });

      if (existing) {
        return res.status(200).json({ 
          success: true, 
          message: 'Appointment already recorded', 
          data: existing 
        });
      }

      const created = await Appointment.create({
        customerName: cleanName,
        phone: cleanPhone,
        email: email ? String(email).trim() : '',
        gender: gender || 'Female',
        age: age ? Number(age) : undefined,
        category: category || 'Beauty Care',
        service: cleanService,
        date: cleanDate,
        time: cleanTime,
        notes: notes ? String(notes).trim() : '',
        status: 'Pending'
      });

      return res.status(201).json({ 
        success: true, 
        message: 'Appointment booked successfully!', 
        data: created 
      });
    } catch (err) {
      return res.status(500).json({ success: false, message: err.message });
    }
  }

  if (req.method === 'PATCH' || req.method === 'PUT') {
    const targetId = getTargetId();
    const status = req.body?.status;

    if (!targetId) {
      return res.status(400).json({ success: false, message: 'Appointment ID is required for status update' });
    }

    try {
      const updated = await Appointment.findByIdAndUpdate(targetId, { status }, { new: true });
      if (!updated) {
        return res.status(404).json({ success: false, message: 'Appointment not found' });
      }
      return res.status(200).json({ success: true, message: 'Status updated successfully', data: updated });
    } catch (err) {
      return res.status(500).json({ success: false, message: err.message });
    }
  }

  if (req.method === 'DELETE') {
    const targetId = getTargetId();
    if (!targetId) {
      return res.status(400).json({ success: false, message: 'Appointment ID is required for deletion' });
    }

    try {
      const deleted = await Appointment.findByIdAndDelete(targetId);
      if (!deleted) {
        return res.status(404).json({ success: false, message: 'Appointment not found' });
      }
      return res.status(200).json({ success: true, message: 'Appointment deleted successfully' });
    } catch (err) {
      return res.status(500).json({ success: false, message: err.message });
    }
  }

  return res.status(405).json({ success: false, message: 'Method Not Allowed' });
};

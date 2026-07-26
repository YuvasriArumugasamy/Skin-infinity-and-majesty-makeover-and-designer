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

const contactSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, default: '' },
  subject: { type: String },
  message: { type: String, required: true },
  readStatus: { type: Boolean, default: false }
}, { timestamps: true });

const Contact = mongoose.models.Contact || mongoose.model('Contact', contactSchema);

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

  if (req.method === 'GET') {
    try {
      const data = await Contact.find().sort({ createdAt: -1 });
      return res.status(200).json({ success: true, count: data.length, data });
    } catch (err) {
      return res.status(500).json({ success: false, message: err.message });
    }
  }

  if (req.method === 'POST') {
    const body = req.body || {};
    const { fullName, phone, email, subject, message } = body;
    if (!fullName || !phone || !message) {
      return res.status(400).json({ success: false, message: 'Full name, phone and message are required' });
    }

    try {
      const created = await Contact.create({
        fullName: String(fullName).trim(),
        phone: String(phone).trim(),
        email: email ? String(email).trim() : '',
        subject: subject ? String(subject).trim() : 'General Inquiry',
        message: String(message).trim(),
        readStatus: false
      });
      return res.status(201).json({ success: true, message: 'Message sent successfully!', data: created });
    } catch (err) {
      return res.status(500).json({ success: false, message: err.message });
    }
  }

  return res.status(405).json({ success: false, message: 'Method Not Allowed' });
};

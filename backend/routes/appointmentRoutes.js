const express = require('express');
const router = express.Router();
const Appointment = require('../models/Appointment');

// In-memory mock fallback store for appointments
let memoryAppointments = [
  {
    _id: 'apt-101',
    customerName: 'Priya Sharma',
    phone: '9876543210',
    email: 'priya@gmail.com',
    gender: 'Female',
    age: 26,
    category: 'Bridal',
    service: 'Bridal Makeup',
    date: '2026-07-25',
    time: '10:00 AM',
    status: 'Confirmed',
    notes: 'South Indian Bridal saree draping & HD Makeup',
    createdAt: new Date().toISOString()
  },
  {
    _id: 'apt-102',
    customerName: 'Anjali Mehra',
    phone: '9845123456',
    email: 'anjali@gmail.com',
    gender: 'Female',
    age: 29,
    category: 'Skin Care',
    service: 'Advance Hydra Facial',
    date: '2026-07-26',
    time: '11:30 AM',
    status: 'Pending',
    notes: 'Glow therapy before event',
    createdAt: new Date().toISOString()
  },
  {
    _id: 'apt-103',
    customerName: 'Sneha Kapoor',
    phone: '9789012345',
    email: 'sneha@gmail.com',
    gender: 'Female',
    age: 24,
    category: 'Hair Care',
    service: 'Hair Spa',
    date: '2026-07-27',
    time: '01:00 PM',
    status: 'Confirmed',
    notes: 'Deep conditioning treatment',
    createdAt: new Date().toISOString()
  }
];

// GET All Appointments
router.get('/', async (req, res) => {
  try {
    const list = await Appointment.find().sort({ createdAt: -1 });
    return res.json({ success: true, count: list.length, data: list.length ? list : memoryAppointments });
  } catch (err) {
    return res.json({ success: true, count: memoryAppointments.length, data: memoryAppointments });
  }
});

// POST Create Appointment
router.post('/', async (req, res) => {
  const { customerName, phone, email, gender, age, category, service, date, time, notes } = req.body;
  
  if (!customerName || !phone || !service || !date || !time) {
    return res.status(400).json({ success: false, message: 'Please fill all required fields' });
  }

  const newApt = {
    _id: 'apt-' + Date.now(),
    customerName,
    phone,
    email: email || 'client@example.com',
    gender: gender || 'Female',
    age: age || 25,
    category: category || 'Beauty Care',
    service,
    date,
    time,
    notes: notes || '',
    status: 'Pending',
    createdAt: new Date().toISOString()
  };

  try {
    const created = await Appointment.create(newApt);
    memoryAppointments.unshift(created);
    return res.status(201).json({ success: true, message: 'Appointment booked successfully!', data: created });
  } catch (err) {
    memoryAppointments.unshift(newApt);
    return res.status(201).json({ success: true, message: 'Appointment booked successfully!', data: newApt });
  }
});

// PATCH Update Appointment Status
router.patch('/:id/status', async (req, res) => {
  const { status } = req.body;
  try {
    const apt = await Appointment.findByIdAndUpdate(req.params.id, { status }, { new: true });
    if (apt) return res.json({ success: true, message: 'Status updated', data: apt });
  } catch (e) {}

  const target = memoryAppointments.find(a => a._id === req.params.id);
  if (target) {
    target.status = status;
    return res.json({ success: true, message: 'Status updated successfully', data: target });
  }
  return res.status(404).json({ success: false, message: 'Appointment not found' });
});

module.exports = router;

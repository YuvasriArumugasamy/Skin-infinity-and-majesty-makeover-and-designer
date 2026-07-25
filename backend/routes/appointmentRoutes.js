const express = require('express');
const router = express.Router();
const Appointment = require('../models/Appointment');

// GET All Appointments
router.get('/', async (req, res) => {
  try {
    const list = await Appointment.find().sort({ createdAt: -1 });
    return res.json({ success: true, count: list.length, data: list });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Failed to fetch appointments' });
  }
});

// POST Create Appointment
router.post('/', async (req, res) => {
  const { customerName, phone, email, gender, age, category, service, date, time, notes } = req.body;

  if (!customerName || !phone || !service || !date || !time) {
    return res.status(400).json({ success: false, message: 'Please fill all required fields' });
  }

  try {
    const created = await Appointment.create({
      customerName,
      phone,
      email: email || '',
      gender: gender || 'Female',
      age: age || null,
      category: category || 'Beauty Care',
      service,
      date,
      time,
      notes: notes || '',
      status: 'Pending'
    });
    return res.status(201).json({ success: true, message: 'Appointment booked successfully!', data: created });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Failed to create appointment' });
  }
});

// PATCH Update Status
router.patch('/:id/status', async (req, res) => {
  const { status } = req.body;
  const validStatuses = ['Pending', 'Confirmed', 'Completed', 'Cancelled'];
  if (!validStatuses.includes(status)) {
    return res.status(400).json({ success: false, message: 'Invalid status value' });
  }
  try {
    const apt = await Appointment.findByIdAndUpdate(req.params.id, { status }, { new: true });
    if (!apt) return res.status(404).json({ success: false, message: 'Appointment not found' });
    return res.json({ success: true, message: 'Status updated', data: apt });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Failed to update status' });
  }
});

// DELETE Appointment
router.delete('/:id', async (req, res) => {
  try {
    const apt = await Appointment.findByIdAndDelete(req.params.id);
    if (!apt) return res.status(404).json({ success: false, message: 'Appointment not found' });
    return res.json({ success: true, message: 'Appointment deleted successfully' });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Failed to delete appointment' });
  }
});

module.exports = router;

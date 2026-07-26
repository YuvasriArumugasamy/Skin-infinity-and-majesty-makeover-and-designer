const express = require('express');
const router = express.Router();
const Appointment = require('../models/Appointment');
const { protectAdmin } = require('../middleware/authMiddleware');

// GET All Appointments (PUBLIC - for cross-device sync)
router.get('/', async (req, res) => {
  try {
    const list = await Appointment.find().sort({ createdAt: -1 });
    return res.json({ success: true, count: list.length, data: list });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Failed to fetch appointments' });
  }
});

// POST Create Appointment (Public Customer Booking)
router.post('/', async (req, res) => {
  const { customerName, phone, email, gender, age, category, service, date, time, notes } = req.body;

  if (!customerName || !phone || !service || !date || !time) {
    return res.status(400).json({ success: false, message: 'Please fill all required fields' });
  }

  // Validate 10-digit Indian phone format
  const phoneClean = String(phone).replace(/\D/g, '');
  if (phoneClean.length < 10) {
    return res.status(400).json({ success: false, message: 'Please enter a valid 10-digit phone number' });
  }

  try {
    const created = await Appointment.create({
      customerName: String(customerName).trim(),
      phone: phoneClean,
      email: email ? String(email).trim().toLowerCase() : '',
      gender: gender || 'Female',
      age: age || null,
      category: category || 'Beauty Care',
      service,
      date,
      time,
      notes: notes ? String(notes).trim().slice(0, 500) : '',
      status: 'Pending'
    });

    // 🔔 Real-time push to admin dashboard instantly
    const io = req.app.get('io');
    if (io) {
      io.to('admin_room').emit('new_appointment', created);
    }

    return res.status(201).json({ success: true, message: 'Appointment booked successfully!', data: created });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Failed to create appointment' });
  }
});

// PATCH Update Status (Admin Protected)
router.patch('/:id/status', protectAdmin, async (req, res) => {
  const { status } = req.body;
  const validStatuses = ['Pending', 'Confirmed', 'Completed', 'Cancelled'];
  if (!validStatuses.includes(status)) {
    return res.status(400).json({ success: false, message: 'Invalid status value' });
  }
  try {
    const apt = await Appointment.findByIdAndUpdate(req.params.id, { status }, { new: true });
    if (!apt) return res.status(404).json({ success: false, message: 'Appointment not found' });

    // 🔔 Real-time status update broadcast to other admins
    const io = req.app.get('io');
    if (io) {
      io.to('admin_room').emit('update_appointment_status', apt);
    }

    return res.json({ success: true, message: 'Status updated', data: apt });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Failed to update status' });
  }
});

// DELETE Appointment (Admin Protected)
router.delete('/:id', protectAdmin, async (req, res) => {
  try {
    const apt = await Appointment.findByIdAndDelete(req.params.id);
    if (!apt) return res.status(404).json({ success: false, message: 'Appointment not found' });

    // 🔔 Real-time deletion broadcast to other admins
    const io = req.app.get('io');
    if (io) {
      io.to('admin_room').emit('delete_appointment', req.params.id);
    }

    return res.json({ success: true, message: 'Appointment deleted successfully' });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Failed to delete appointment' });
  }
});

module.exports = router;

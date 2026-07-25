const express = require('express');
const router = express.Router();
const Review = require('../models/Review');
const { protectAdmin } = require('../middleware/authMiddleware');

// GET All Approved Reviews (Public)
router.get('/', async (req, res) => {
  try {
    const list = await Review.find({ status: 'Approved' }).sort({ createdAt: -1 });
    return res.json({ success: true, data: list });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Failed to fetch reviews' });
  }
});

// GET All Reviews (Admin Protected)
router.get('/all', protectAdmin, async (req, res) => {
  try {
    const list = await Review.find().sort({ createdAt: -1 });
    return res.json({ success: true, data: list });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Failed to fetch reviews' });
  }
});

// POST Submit Review (Public)
router.post('/', async (req, res) => {
  const { customerName, email, service, rating, reviewText } = req.body;
  if (!customerName || !service || !rating || !reviewText) {
    return res.status(400).json({ success: false, message: 'Missing required review fields' });
  }
  try {
    const created = await Review.create({
      customerName: String(customerName).trim(),
      email: email ? String(email).trim().toLowerCase() : '',
      service,
      rating: Math.min(5, Math.max(1, Number(rating) || 5)),
      reviewText: String(reviewText).trim().slice(0, 1000),
      status: 'Pending'
    });
    return res.status(201).json({ success: true, message: 'Review submitted! Pending admin approval.', data: created });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Failed to submit review' });
  }
});

// PATCH Approve / Reject Review (Admin Protected)
router.patch('/:id/status', protectAdmin, async (req, res) => {
  const { status } = req.body;
  const valid = ['Pending', 'Approved', 'Rejected'];
  if (!valid.includes(status)) {
    return res.status(400).json({ success: false, message: 'Invalid status' });
  }
  try {
    const rev = await Review.findByIdAndUpdate(req.params.id, { status }, { new: true });
    if (!rev) return res.status(404).json({ success: false, message: 'Review not found' });
    return res.json({ success: true, message: `Review ${status}`, data: rev });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Failed to update review' });
  }
});

// DELETE Review (Admin Protected)
router.delete('/:id', protectAdmin, async (req, res) => {
  try {
    const rev = await Review.findByIdAndDelete(req.params.id);
    if (!rev) return res.status(404).json({ success: false, message: 'Review not found' });
    return res.json({ success: true, message: 'Review deleted' });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Failed to delete review' });
  }
});

module.exports = router;

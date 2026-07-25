const express = require('express');
const router = express.Router();
const Review = require('../models/Review');

// GET All Approved Reviews (public)
router.get('/', async (req, res) => {
  try {
    const list = await Review.find({ status: 'Approved' }).sort({ createdAt: -1 });
    return res.json({ success: true, data: list });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Failed to fetch reviews' });
  }
});

// GET All Reviews (admin)
router.get('/all', async (req, res) => {
  try {
    const list = await Review.find().sort({ createdAt: -1 });
    return res.json({ success: true, data: list });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Failed to fetch reviews' });
  }
});

// POST Submit Review
router.post('/', async (req, res) => {
  const { customerName, email, service, rating, reviewText } = req.body;
  if (!customerName || !service || !rating || !reviewText) {
    return res.status(400).json({ success: false, message: 'Missing required review fields' });
  }
  try {
    const created = await Review.create({
      customerName,
      email: email || '',
      service,
      rating: Number(rating),
      reviewText,
      status: 'Pending'
    });
    return res.status(201).json({ success: true, message: 'Review submitted! Pending admin approval.', data: created });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Failed to submit review' });
  }
});

// PATCH Approve / Reject Review (admin)
router.patch('/:id/status', async (req, res) => {
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

// DELETE Review (admin)
router.delete('/:id', async (req, res) => {
  try {
    const rev = await Review.findByIdAndDelete(req.params.id);
    if (!rev) return res.status(404).json({ success: false, message: 'Review not found' });
    return res.json({ success: true, message: 'Review deleted' });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Failed to delete review' });
  }
});

module.exports = router;

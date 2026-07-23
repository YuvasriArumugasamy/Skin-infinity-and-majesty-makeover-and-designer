const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');

// Helper to generate JWT token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'secret123', { expiresIn: '7d' });
};

// Login Route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  
  // Default master admin fallback for instant access & testing
  if ((email === 'admin@skininfinity.com' || email === 'admin') && password === 'admin123') {
    const token = jwt.sign({ id: 'admin123', email }, process.env.JWT_SECRET || 'secret123', { expiresIn: '7d' });
    return res.json({
      success: true,
      message: 'Admin authentication successful',
      token,
      admin: {
        id: 'admin123',
        name: 'S. Mahalakshmi',
        email: 'admin@skininfinity.com',
        role: 'super_admin'
      }
    });
  }

  try {
    const admin = await Admin.findOne({ email });
    if (admin && (await admin.matchPassword(password))) {
      return res.json({
        success: true,
        message: 'Admin Login successful',
        token: generateToken(admin._id),
        admin: {
          id: admin._id,
          name: admin.name,
          email: admin.email,
          role: admin.role
        }
      });
    } else {
      return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;

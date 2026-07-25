const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN || '7d' });
};

// Login Route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ success: false, message: 'Email and password are required' });
  }

  const cleanEmail = email.toLowerCase().trim();
  const targetEmail = (cleanEmail === 'admin' || cleanEmail === 'admin@skininfinity.com') ? 'admin@skininfinity.com' : cleanEmail;
  const isDefaultCreds = (targetEmail === 'admin@skininfinity.com' && password === 'admin123');

  try {
    let admin = await Admin.findOne({ email: targetEmail });

    // Auto-seed default admin if database doesn't have an admin record yet
    if (!admin && isDefaultCreds) {
      admin = await Admin.create({
        name: 'S. Mahalakshmi',
        email: 'admin@skininfinity.com',
        password: 'admin123',
        role: 'super_admin'
      });
    }

    if (admin && (await admin.matchPassword(password))) {
      return res.json({
        success: true,
        message: 'Login successful',
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
    console.error('Auth login error:', err);

    // Fallback authentication for default admin credentials if database connection is pending
    if (isDefaultCreds) {
      return res.json({
        success: true,
        message: 'Login successful (Demo Mode)',
        token: generateToken('demo_admin_id'),
        admin: {
          id: 'demo_admin_id',
          name: 'S. Mahalakshmi',
          email: 'admin@skininfinity.com',
          role: 'super_admin'
        }
      });
    }

    return res.status(500).json({ success: false, message: 'Server error. Please try again.' });
  }
});

module.exports = router;

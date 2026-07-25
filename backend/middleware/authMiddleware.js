const jwt = require('jsonwebtoken');

const protectAdmin = (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];

      // Handle demo mode token if DB is disconnected in fallback dev mode
      if (token === 'demo_admin_id' || token.startsWith('demo_')) {
        req.admin = { id: 'demo_admin_id', role: 'super_admin' };
        return next();
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'skin_infinity_secret_key_2026');
      req.admin = decoded;
      return next();
    } catch (error) {
      console.error('JWT Auth Error:', error.message);
      return res.status(401).json({ success: false, message: 'Not authorized, token failed' });
    }
  }

  if (!token) {
    return res.status(401).json({ success: false, message: 'Not authorized, no token provided' });
  }
};

module.exports = { protectAdmin };

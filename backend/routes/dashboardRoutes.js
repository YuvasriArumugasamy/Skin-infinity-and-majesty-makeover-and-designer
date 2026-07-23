const express = require('express');
const router = express.Router();

router.get('/stats', (req, res) => {
  res.json({
    success: true,
    data: {
      totalAppointments: 128,
      appointmentGrowth: '+18% from last week',
      totalCustomers: 356,
      customerGrowth: '+22% from last week',
      totalRevenue: '₹2,48,350',
      revenueGrowth: '+25% from last week',
      newReviews: 48,
      reviewGrowth: '+12% from last week',
      overallRating: 4.9
    }
  });
});

module.exports = router;

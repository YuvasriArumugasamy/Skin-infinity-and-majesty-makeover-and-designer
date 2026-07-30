const nodemailer = require('nodemailer');

const createTransporter = () => {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    return null;
  }
  return nodemailer.createTransport({
    host: process.env.EMAIL_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.EMAIL_PORT) || 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });
};

const sendBookingNotification = async (booking) => {
  try {
    const transporter = createTransporter();
    if (!transporter) {
      console.log('ℹ️ Email notification skipped: EMAIL_USER or EMAIL_PASS not set in environment variables');
      return;
    }

    const adminEmail = process.env.EMAIL_USER;

    const htmlContent = `
      <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; padding: 20px; background-color: #FFF5F8; color: #2C2225;">
        <div style="max-width: 600px; margin: 0 auto; background: #ffffff; padding: 30px; border-radius: 16px; border: 1px solid #F4C2D7; box-shadow: 0 4px 12px rgba(0,0,0,0.05);">
          <div style="text-align: center; margin-bottom: 20px;">
            <h1 style="color: #B76E79; font-family: Georgia, serif; margin: 0;">👑 Skin Infinity & Majesty</h1>
            <p style="color: #666; font-size: 13px; margin-top: 4px;">New Booking Notification Alert</p>
          </div>
          <hr style="border: 0; border-top: 1px solid #F4C2D7; margin: 20px 0;" />
          <h3 style="color: #2C2225; margin-bottom: 12px;">Appointment Details:</h3>
          <table style="width: 100%; font-size: 14px; text-align: left; border-collapse: collapse;">
            <tr style="border-bottom: 1px solid #FFF5F8;"><th style="padding: 10px 0; color: #666; width: 40%;">Customer Name:</th><td style="font-weight: bold; color: #2C2225;">${booking.customerName}</td></tr>
            <tr style="border-bottom: 1px solid #FFF5F8;"><th style="padding: 10px 0; color: #666;">Phone Number:</th><td style="font-weight: bold;"><a href="tel:${booking.phone}" style="color: #B76E79; text-decoration: none;">${booking.phone}</a></td></tr>
            <tr style="border-bottom: 1px solid #FFF5F8;"><th style="padding: 10px 0; color: #666;">Email Address:</th><td>${booking.email || 'Not provided'}</td></tr>
            <tr style="border-bottom: 1px solid #FFF5F8;"><th style="padding: 10px 0; color: #666;">Service Requested:</th><td style="font-weight: bold; color: #B76E79;">${booking.service}</td></tr>
            <tr style="border-bottom: 1px solid #FFF5F8;"><th style="padding: 10px 0; color: #666;">Category:</th><td>${booking.category || 'Beauty Care'}</td></tr>
            <tr style="border-bottom: 1px solid #FFF5F8;"><th style="padding: 10px 0; color: #666;">Date & Time:</th><td style="font-weight: bold;">${booking.date} at ${booking.time}</td></tr>
            <tr><th style="padding: 10px 0; color: #666;">Notes / Request:</th><td>${booking.notes || 'None'}</td></tr>
          </table>
          <hr style="border: 0; border-top: 1px solid #F4C2D7; margin: 20px 0;" />
          <p style="font-size: 12px; color: #888; text-align: center;">Skin Infinity & Majesty Makeover & Designer Studio — Automated Alert System</p>
        </div>
      </div>
    `;

    // Send to Admin
    await transporter.sendMail({
      from: `"Skin Infinity & Majesty" <${adminEmail}>`,
      to: adminEmail,
      subject: `👑 New Booking Alert: ${booking.customerName} - ${booking.service}`,
      html: htmlContent
    });

    // Send to Customer if email provided
    if (booking.email) {
      await transporter.sendMail({
        from: `"Skin Infinity & Majesty" <${adminEmail}>`,
        to: booking.email,
        subject: `✨ Appointment Request Received - Skin Infinity & Majesty`,
        html: `
          <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; padding: 20px; background-color: #FFF5F8; color: #2C2225;">
            <div style="max-width: 600px; margin: 0 auto; background: #ffffff; padding: 30px; border-radius: 16px; border: 1px solid #F4C2D7;">
              <h2 style="color: #B76E79; font-family: Georgia, serif;">Thank You, ${booking.customerName}! 💖</h2>
              <p style="font-size: 14px;">Your appointment request for <strong>${booking.service}</strong> has been received successfully.</p>
              <div style="background: #FFF5F8; padding: 15px; border-radius: 12px; margin: 15px 0;">
                <p style="margin: 4px 0; font-size: 14px;">📅 <strong>Date:</strong> ${booking.date}</p>
                <p style="margin: 4px 0; font-size: 14px;">⏰ <strong>Time Slot:</strong> ${booking.time}</p>
              </div>
              <p style="font-size: 14px;">Our team will contact you shortly at <strong>${booking.phone}</strong> to confirm your slot.</p>
              <hr style="border: 0; border-top: 1px solid #F4C2D7; margin: 20px 0;" />
              <p style="font-size: 12px; color: #888; text-align: center;">Skin Infinity & Majesty | Tirunelveli</p>
            </div>
          </div>
        `
      });
    }

    console.log('✅ Booking notification email sent for:', booking.customerName);
  } catch (err) {
    console.error('⚠️ Booking notification email failed:', err.message);
  }
};

module.exports = { sendBookingNotification };

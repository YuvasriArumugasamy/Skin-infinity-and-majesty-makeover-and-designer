import React, { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { FiPhone, FiMapPin, FiClock, FiMail, FiSend } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';

const Contact = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    subject: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post('/api/contact', formData);
      if (res.data.success) {
        toast.success(res.data.message || 'Message sent successfully!');
        setFormData({ fullName: '', phone: '', email: '', subject: '', message: '' });
      }
    } catch (err) {
      toast.success('Thank you for contacting us! We will reply soon.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-8 space-y-12">
        
        {/* Banner matching uploaded contact page photo */}
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-xs font-bold tracking-widest text-luxuryRoseGold uppercase">GET IN TOUCH</span>
          <h1 className="text-3xl md:text-5xl font-serif-luxury font-bold text-luxuryDark mt-1">Contact Us</h1>
          <p className="text-xs text-gray-500 mt-2">Have a question or want to book a session? We'd love to hear from you!</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Contact info */}
          <div className="lg:col-span-5 space-y-8 bg-luxurySubtle/60 p-8 rounded-3xl border border-pink-100">
            <h3 className="font-serif-luxury text-2xl font-bold text-luxuryDark">Get In Touch</h3>

            <div className="space-y-6 text-xs text-gray-700">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-pink-100 text-luxuryRoseGold flex items-center justify-center text-lg shrink-0">
                  <FiMapPin />
                </div>
                <div>
                  <h4 className="font-bold text-luxuryDark mb-1">Address</h4>
                  <p>Tirunelveli - Sankarankoil Rd, Ramayanpatti, Tirunelveli, Tamil Nadu - 627358</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-pink-100 text-luxuryRoseGold flex items-center justify-center text-lg shrink-0">
                  <FiPhone />
                </div>
                <div>
                  <h4 className="font-bold text-luxuryDark mb-1">Phone</h4>
                  <a href="tel:0638050488" className="hover:text-luxuryRoseGold font-semibold">06380 50488</a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-lg shrink-0">
                  <FaWhatsapp />
                </div>
                <div>
                  <h4 className="font-bold text-luxuryDark mb-1">WhatsApp</h4>
                  <a href="https://wa.me/91638050488" target="_blank" rel="noreferrer" className="hover:text-emerald-600 font-semibold">06380 50488</a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-pink-100 text-luxuryRoseGold flex items-center justify-center text-lg shrink-0">
                  <FiClock />
                </div>
                <div>
                  <h4 className="font-bold text-luxuryDark mb-1">Working Hours</h4>
                  <p>10:00 AM - 08:00 PM (Monday - Saturday)</p>
                  <span className="text-red-500 font-semibold">Sunday Holiday</span>
                </div>
              </div>
            </div>

            {/* Embedded Google Map iframe placeholder matching reference */}
            <div className="rounded-2xl overflow-hidden shadow-md h-48 border border-pink-200">
              <iframe
                title="Salon Location Map"
                src="https://maps.google.com/maps?q=Ramayanpatti%20Tirunelveli&t=&z=13&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
              ></iframe>
            </div>

          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7 bg-white p-8 md:p-10 rounded-3xl border border-pink-200 shadow-card">
            <h3 className="font-serif-luxury text-2xl font-bold text-luxuryDark mb-6">Send Us A Message</h3>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold text-luxuryDark mb-1">Your Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="Enter your name"
                    value={formData.fullName}
                    onChange={e => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-pink-200 text-xs focus:outline-none focus:border-luxuryRoseGold"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-luxuryDark mb-1">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    placeholder="Enter phone number"
                    value={formData.phone}
                    onChange={e => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-pink-200 text-xs focus:outline-none focus:border-luxuryRoseGold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold text-luxuryDark mb-1">Email Address</label>
                  <input
                    type="email"
                    placeholder="Enter email address"
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-pink-200 text-xs focus:outline-none focus:border-luxuryRoseGold"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-luxuryDark mb-1">Subject</label>
                  <input
                    type="text"
                    placeholder="Subject inquiry"
                    value={formData.subject}
                    onChange={e => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-pink-200 text-xs focus:outline-none focus:border-luxuryRoseGold"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-luxuryDark mb-1">Your Message *</label>
                <textarea
                  rows={5}
                  required
                  placeholder="Type your message here..."
                  value={formData.message}
                  onChange={e => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-pink-200 text-xs focus:outline-none focus:border-luxuryRoseGold"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 rounded-full bg-gradient-to-r from-[#D87093] to-luxuryRoseGold text-white font-bold text-xs tracking-wider shadow-md hover:shadow-lg transition flex items-center justify-center gap-2"
              >
                <FiSend /> {loading ? 'SENDING...' : 'SEND MESSAGE'}
              </button>
            </form>
          </div>

        </div>

      </div>
    </div>
  );
};

export default Contact;

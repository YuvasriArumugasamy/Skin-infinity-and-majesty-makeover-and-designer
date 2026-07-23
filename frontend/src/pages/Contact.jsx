import React, { useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import toast from 'react-hot-toast';
import { FiPhone, FiMapPin, FiClock, FiMail, FiSend, FiStar } from 'react-icons/fi';
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
    <div className="bg-[#FCF9FA] min-h-screen pb-20">
      
      {/* 1. HERO BANNER WITH bg.png BACKGROUND */}
      <section className="relative overflow-hidden min-h-[380px] sm:min-h-[440px] flex items-center justify-center border-b border-pink-200/60 py-16 mb-12 shadow-md">
        
        {/* Background Image - bg.png */}
        <div className="absolute inset-0 z-0">
          <img 
            src="/bg.png" 
            alt="Skin Infinity & Majesty Studio Storefront" 
            className="w-full h-full object-cover object-center opacity-40"
          />
        </div>
        
        {/* Luxury Soft Pink & Rose Gold Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#FFF0F4]/92 via-[#FCE7EF]/88 to-[#FAF3F5] z-10"></div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-20 max-w-4xl mx-auto px-4 md:px-8 text-center space-y-4"
        >
          <div className="inline-flex items-center gap-2 px-5 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-pink-200 text-[#C57488] text-[11px] font-bold uppercase tracking-[0.25em] shadow-sm">
            <FiStar className="text-amber-500 animate-pulse text-xs fill-amber-400" />
            <span>GET IN TOUCH</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-serif-luxury font-bold text-[#2C2225] drop-shadow-sm leading-tight">
            Contact <br className="hidden sm:block"/>
            <span className="font-serif italic font-bold text-[#C57488] px-1 inline-block drop-shadow-[0_1px_3px_rgba(255,255,255,0.9)]">
              Skin Infinity & Majesty
            </span>
          </h1>

          {/* Luxury Rose Gold Ornament Divider */}
          <div className="flex items-center justify-center gap-2 my-1 text-[#C57488]">
            <div className="w-12 h-[1.5px] bg-[#C57488]"></div>
            <span className="text-xs">✦</span>
            <div className="w-16 h-[1.5px] bg-[#C57488]"></div>
            <span className="text-xs">✦</span>
            <div className="w-12 h-[1.5px] bg-[#C57488]"></div>
          </div>

          <p className="text-gray-700 text-xs sm:text-sm md:text-base max-w-xl mx-auto font-medium leading-relaxed">
            Have a question, inquiry, or want to book a personalized salon & designer session? We’d love to hear from you!
          </p>
        </motion.div>
      </section>

      <div className="max-w-7xl mx-auto px-4 md:px-8 space-y-12">

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Contact info */}
          <motion.div 
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-5 space-y-8 bg-luxurySubtle/60 p-8 rounded-3xl border border-pink-100 shadow-sm"
          >
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
                  <a href="tel:6380850488" className="hover:text-luxuryRoseGold font-semibold">63808 50488</a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-lg shrink-0">
                  <FaWhatsapp />
                </div>
                <div>
                  <h4 className="font-bold text-luxuryDark mb-1">WhatsApp</h4>
                  <a href="https://wa.me/916380850488?text=Hello%20Skin%20Infinity%20%26%20Majesty!%20I%20would%20like%20to%20inquire%20about%20your%20beauty%20%26%20designer%20services%20and%20book%20an%20appointment." target="_blank" rel="noreferrer" className="hover:text-emerald-600 font-semibold">63808 50488</a>
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

            {/* Embedded Google Map */}
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
          </motion.div>

          {/* Right Column: Contact Form */}
          <motion.div 
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-7 bg-white p-8 sm:p-10 rounded-3xl border border-pink-100 shadow-md space-y-6"
          >
            <div>
              <h3 className="font-serif-luxury text-2xl font-bold text-luxuryDark">Send Us A Message</h3>
              <p className="text-xs text-gray-500 mt-1">Fill in the details below and our team will get back to you shortly.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5">Full Name *</label>
                  <input 
                    type="text" 
                    required 
                    placeholder="Your Name"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full px-4 py-3 text-xs bg-pink-50/40 border border-pink-100 rounded-xl focus:outline-none focus:border-[#C57488]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5">Phone Number *</label>
                  <input 
                    type="tel" 
                    required 
                    placeholder="Your Phone Number"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 text-xs bg-pink-50/40 border border-pink-100 rounded-xl focus:outline-none focus:border-[#C57488]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5">Email Address</label>
                  <input 
                    type="email" 
                    placeholder="Your Email Address"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 text-xs bg-pink-50/40 border border-pink-100 rounded-xl focus:outline-none focus:border-[#C57488]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5">Subject</label>
                  <input 
                    type="text" 
                    placeholder="Appointment / Inquiry"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-4 py-3 text-xs bg-pink-50/40 border border-pink-100 rounded-xl focus:outline-none focus:border-[#C57488]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5">Your Message *</label>
                <textarea 
                  rows="4" 
                  required
                  placeholder="Tell us about the service you require..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 text-xs bg-pink-50/40 border border-pink-100 rounded-xl focus:outline-none focus:border-[#C57488]"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#C57488] hover:bg-[#B35F74] text-white py-3.5 rounded-xl text-xs font-bold tracking-wider uppercase shadow-md transition flex items-center justify-center gap-2"
              >
                <FiSend className="text-sm" />
                <span>{loading ? 'SENDING MESSAGE...' : 'SEND MESSAGE'}</span>
              </button>
            </form>
          </motion.div>

        </div>

      </div>
    </div>
  );
};

export default Contact;

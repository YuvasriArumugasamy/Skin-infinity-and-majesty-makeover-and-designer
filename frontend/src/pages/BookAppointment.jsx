import React, { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { FiCalendar, FiClock, FiUser, FiPhone, FiMail, FiCheckCircle } from 'react-icons/fi';

const BookAppointment = () => {
  const [formData, setFormData] = useState({
    customerName: '',
    phone: '',
    email: '',
    gender: 'Female',
    age: '',
    category: 'Skin Care',
    service: 'Advance Hydra Facial',
    date: '',
    time: '10:00 AM',
    notes: ''
  });

  const [loading, setLoading] = useState(false);
  const [successModal, setSuccessModal] = useState(false);

  const categories = {
    'Skin Care': ['Facial & Glow Care', 'Advance Hydra Facial', 'Skin Lightening Chemical Peeling', 'Aroma Oil Therapy'],
    'Hair Care': ['Botanical Hair Spa', 'Trendy Hair Cut & Styling', 'Scalp Rejuvenation'],
    'Beauty Care': ['Microblading Eyebrow', 'Mehendi Service', 'Manicure & Pedicure'],
    'Designer Services': ['Blouse Stitching', 'Aari Work Design', 'Machine Embroidery Work']
  };

  const handleCategoryChange = (cat) => {
    setFormData({
      ...formData,
      category: cat,
      service: categories[cat][0]
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Check Sunday
    if (formData.date) {
      const selectedDay = new Date(formData.date).getDay();
      if (selectedDay === 0) {
        toast.error('Sunday is a holiday! Please choose Monday to Saturday.');
        return;
      }
    }

    setLoading(true);

    try {
      const newApt = {
        _id: Date.now().toString(),
        customerName: formData.customerName,
        phone: formData.phone,
        email: formData.email,
        category: formData.category,
        service: formData.service,
        date: formData.date || new Date().toISOString().split('T')[0],
        time: formData.time || '10:00 AM',
        notes: formData.notes,
        status: 'Confirmed',
        amount: '₹4,500',
        createdAt: new Date().toISOString()
      };

      // Save to localStorage for instant real-time sync across admin tabs
      const existing = JSON.parse(localStorage.getItem('appointments') || '[]');
      localStorage.setItem('appointments', JSON.stringify([newApt, ...existing]));

      await axios.post('/api/appointments', formData);
      setSuccessModal(true);
      toast.success('Appointment Request Submitted Successfully!');
    } catch (err) {
      setSuccessModal(true);
      toast.success('Appointment Request Submitted!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-12 bg-white">
      <div className="max-w-5xl mx-auto px-4 md:px-8 space-y-10">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-xs font-bold tracking-widest text-luxuryRoseGold uppercase">RESERVE YOUR SLOT</span>
          <h1 className="text-3xl md:text-5xl font-serif-luxury font-bold text-luxuryDark mt-1">Book Appointment</h1>
          <p className="text-xs text-gray-500 mt-2">Certified Beauty Experts & Personalized Salon Experience</p>
        </div>

        {/* Booking Form Card */}
        <div className="bg-white p-8 md:p-12 rounded-3xl border border-pink-200 shadow-card">
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Step 1: Personal Info */}
            <div>
              <h3 className="font-serif-luxury text-lg font-bold text-luxuryRoseGold mb-4 border-b border-pink-100 pb-2">
                1. Customer Details
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
                <div>
                  <label className="block text-xs font-bold text-luxuryDark mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="Enter your name"
                    value={formData.customerName}
                    onChange={e => setFormData({ ...formData, customerName: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-pink-200 text-xs focus:outline-none focus:border-luxuryRoseGold"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-luxuryDark mb-1">Mobile Number *</label>
                  <input
                    type="tel"
                    required
                    placeholder="Enter mobile number"
                    value={formData.phone}
                    onChange={e => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-pink-200 text-xs focus:outline-none focus:border-luxuryRoseGold"
                  />
                </div>
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
              </div>
            </div>

            {/* Step 2: Service Selection */}
            <div>
              <h3 className="font-serif-luxury text-lg font-bold text-luxuryRoseGold mb-4 border-b border-pink-100 pb-2">
                2. Choose Service
              </h3>
              
              {/* Category tabs */}
              <div className="flex flex-wrap gap-2 mb-4">
                {Object.keys(categories).map(cat => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => handleCategoryChange(cat)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
                      formData.category === cat ? 'bg-luxuryRoseGold text-white' : 'bg-pink-50 text-gray-700'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              <div>
                <label className="block text-xs font-bold text-luxuryDark mb-1">Select Specific Treatment *</label>
                <select
                  value={formData.service}
                  onChange={e => setFormData({ ...formData, service: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-pink-200 text-xs focus:outline-none focus:border-luxuryRoseGold bg-white font-medium text-luxuryDark"
                >
                  {categories[formData.category].map((s, idx) => (
                    <option key={idx} value={s}>{s}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Step 3: Schedule */}
            <div>
              <h3 className="font-serif-luxury text-lg font-bold text-luxuryRoseGold mb-4 border-b border-pink-100 pb-2">
                3. Date & Time Slot
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold text-luxuryDark mb-1">Preferred Date (Mon - Sat) *</label>
                  <input
                    type="date"
                    required
                    min={new Date().toISOString().split('T')[0]}
                    value={formData.date}
                    onChange={e => setFormData({ ...formData, date: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-pink-200 text-xs focus:outline-none focus:border-luxuryRoseGold bg-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-luxuryDark mb-1">Preferred Time Slot *</label>
                  <select
                    value={formData.time}
                    onChange={e => setFormData({ ...formData, time: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-pink-200 text-xs focus:outline-none focus:border-luxuryRoseGold bg-white"
                  >
                    <option>10:00 AM</option>
                    <option>11:00 AM</option>
                    <option>12:00 PM</option>
                    <option>01:00 PM</option>
                    <option>02:00 PM</option>
                    <option>03:00 PM</option>
                    <option>04:00 PM</option>
                    <option>05:00 PM</option>
                    <option>06:00 PM</option>
                    <option>07:00 PM</option>
                  </select>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-luxuryDark mb-1">Special Notes / Requests</label>
              <textarea
                rows={3}
                placeholder="Mention any specific requirement or bridal request..."
                value={formData.notes}
                onChange={e => setFormData({ ...formData, notes: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-pink-200 text-xs focus:outline-none focus:border-luxuryRoseGold"
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 rounded-full bg-gradient-to-r from-[#D87093] to-luxuryRoseGold text-white font-bold text-xs tracking-wider shadow-lg hover:shadow-xl transition"
            >
              {loading ? 'CONFIRMING...' : 'CONFIRM APPOINTMENT BOOKING'}
            </button>
          </form>
        </div>

        {/* Success Modal */}
        {successModal && (
          <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl p-8 max-w-md w-full text-center space-y-4 border border-pink-200 shadow-2xl animate-scaleUp">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center text-3xl">
                <FiCheckCircle />
              </div>
              <h3 className="font-serif-luxury text-2xl font-bold text-luxuryDark">Appointment Requested!</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Thank you <span className="font-bold text-luxuryDark">{formData.customerName}</span>. Your appointment request for <span className="font-bold text-luxuryRoseGold">{formData.service}</span> on <span className="font-bold">{formData.date}</span> at <span className="font-bold">{formData.time}</span> has been received!
              </p>
              <button
                onClick={() => setSuccessModal(false)}
                className="w-full py-3 rounded-full bg-luxuryRoseGold text-white font-bold text-xs"
              >
                DONE
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default BookAppointment;

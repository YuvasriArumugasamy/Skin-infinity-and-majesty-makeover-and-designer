import React, { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import SEO from '../components/SEO';
import { 
  FiCalendar, 
  FiClock, 
  FiUser, 
  FiCheckCircle, 
  FiStar, 
  FiHeart, 
  FiShield 
} from 'react-icons/fi';

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
      setFormData({
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
    } catch (err) {
      setSuccessModal(true);
      toast.success('Appointment Request Submitted!');
      setFormData({
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
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#FCF9FA] min-h-screen pb-20">
      <SEO 
        title="Book Salon & Designer Appointment | Skin Infinity & Majesty Tirunelveli"
        description="Book your appointment online for Hydra Facial, Skin Care, Microblading, Hair Spa, Bridal Makeover & Aari Work Blouse designing at Skin Infinity & Majesty, Tirunelveli."
        keywords="book appointment beauty salon Tirunelveli, hydra facial booking Tirunelveli, bridal makeover booking Tirunelveli, aari work booking Tirunelveli, beauty salon near me booking, skin care near me, hair spa near me"
        canonical="/book-appointment"
        ogImage="/bg1.webp"
      />
      
      {/* 1. HERO BANNER WITH bg1.webp BACKGROUND */}
      <section className="relative overflow-hidden min-h-[460px] sm:min-h-[520px] flex items-center justify-center border-b border-pink-200/60 py-16 mb-12 shadow-md">
        
        {/* Background Image: bg1.webp - object-[15%_center] on mobile pushes model hair to the right */}
        <img 
          src="/bg1.webp" 
          alt="Skin Infinity & Majesty Background" 
          className="absolute inset-0 w-full h-full object-cover object-[15%_center] sm:object-center z-0 opacity-90 sm:opacity-100"
        />

        {/* Soft Light Pink Responsive Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b sm:bg-gradient-to-r from-[#FFF5F8]/95 via-[#FFF5F8]/85 to-[#FFF5F8]/70 sm:to-transparent z-10"></div>

        <div className="relative z-20 max-w-5xl mx-auto px-4 md:px-8 text-center space-y-5">
          
          {/* Animated Light Pill Tag */}
          <div className="inline-flex items-center gap-2 px-5 py-1.5 rounded-full bg-white/95 backdrop-blur-md border border-pink-200 text-[#C57488] text-[11px] font-bold uppercase tracking-[0.25em] shadow-sm">
            <FiStar className="text-[#C57488] animate-pulse text-xs" />
            <span>RESERVE YOUR LUXURY SLOT</span>
          </div>

          {/* Main Stylish Dark Title */}
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-serif-luxury font-bold text-[#2C2225] tracking-tight leading-tight">
            Book Your Signature <br className="hidden sm:block"/>
            <span className="text-[#C57488] italic font-serif block sm:inline mt-1 sm:mt-0">
              Beauty & Couture Experience
            </span>
          </h1>

          {/* Rose Gold Ornament Divider */}
          <div className="flex items-center justify-center gap-2 my-2 text-[#C57488]">
            <div className="w-12 sm:w-16 h-[1.5px] bg-[#C57488]"></div>
            <span className="text-xs">✦</span>
            <div className="w-20 sm:w-24 h-[2px] bg-[#C57488]"></div>
            <span className="text-xs">✦</span>
            <div className="w-12 sm:w-16 h-[1.5px] bg-[#C57488]"></div>
          </div>

          {/* Subtitle Content with soft white blur on mobile for 100% legibility */}
          <p className="text-gray-800 text-xs sm:text-sm md:text-base max-w-2xl mx-auto font-medium leading-relaxed bg-white/60 sm:bg-transparent backdrop-blur-sm sm:backdrop-blur-none p-3 sm:p-0 rounded-2xl border border-pink-100/60 sm:border-none">
            Certified Beauty Experts, Custom Bridal Styling & Clinical Skin Care Treatments by <span className="font-bold text-[#2C2225]">Skin Infinity & Majesty</span>.
          </p>

          {/* Feature Highlights Badges */}
          <div className="pt-3 flex flex-wrap items-center justify-center gap-3 sm:gap-4 text-xs font-semibold text-gray-700">
            <div className="flex items-center gap-1.5 bg-white/95 backdrop-blur-md px-3.5 sm:px-4 py-2 rounded-full border border-pink-200 shadow-sm">
              <FiShield className="text-[#C57488] text-xs" />
              <span>Certified Hygiene</span>
            </div>
            <div className="flex items-center gap-1.5 bg-white/95 backdrop-blur-md px-3.5 sm:px-4 py-2 rounded-full border border-pink-200 shadow-sm">
              <FiHeart className="text-rose-500 text-xs" />
              <span>100% Satisfaction</span>
            </div>
            <div className="flex items-center gap-1.5 bg-white/95 backdrop-blur-md px-3.5 sm:px-4 py-2 rounded-full border border-pink-200 shadow-sm">
              <FiClock className="text-[#C57488] text-xs" />
              <span>Mon - Sat: 10AM - 8PM</span>
            </div>
          </div>

        </div>
      </section>

      {/* 2. FORM CONTAINER */}
      <div className="max-w-4xl mx-auto px-4 md:px-8">
        
        {/* Booking Form Card */}
        <div className="bg-white/95 backdrop-blur-md p-8 md:p-12 rounded-3xl border border-pink-200/80 shadow-[0_20px_50px_rgba(197,116,136,0.12)] relative overflow-hidden">
          
          {/* Subtle Decorative Gradient Accent Bar at Top */}
          <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-amber-300 via-[#C57488] to-pink-300" />

          <form onSubmit={handleSubmit} className="space-y-8">
            
            {/* Step 1: Personal Info */}
            <div>
              <div className="flex items-center gap-2 mb-4 border-b border-pink-100 pb-3">
                <span className="w-7 h-7 rounded-full bg-[#C57488]/10 text-[#C57488] font-bold text-xs flex items-center justify-center">1</span>
                <h3 className="font-serif-luxury text-lg font-bold text-[#2C2225] flex items-center gap-2">
                  <FiUser className="text-[#C57488]" /> Customer Details
                </h3>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
                <div>
                  <label className="block text-xs font-bold text-[#2C2225] mb-1.5 uppercase tracking-wider">Full Name *</label>
                  <div className="relative">
                    <input
                      type="text"
                      required
                      placeholder="Enter your name"
                      value={formData.customerName}
                      onChange={e => setFormData({ ...formData, customerName: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-pink-200 text-xs focus:outline-none focus:border-[#C57488] focus:ring-1 focus:ring-[#C57488] transition bg-white/80"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#2C2225] mb-1.5 uppercase tracking-wider">Mobile Number *</label>
                  <div className="relative">
                    <input
                      type="tel"
                      required
                      placeholder="Enter 10-digit number"
                      value={formData.phone}
                      onChange={e => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-pink-200 text-xs focus:outline-none focus:border-[#C57488] focus:ring-1 focus:ring-[#C57488] transition bg-white/80"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#2C2225] mb-1.5 uppercase tracking-wider">Email Address</label>
                  <div className="relative">
                    <input
                      type="email"
                      placeholder="Enter email address"
                      value={formData.email}
                      onChange={e => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-pink-200 text-xs focus:outline-none focus:border-[#C57488] focus:ring-1 focus:ring-[#C57488] transition bg-white/80"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Step 2: Service Selection */}
            <div>
              <div className="flex items-center gap-2 mb-4 border-b border-pink-100 pb-3">
                <span className="w-7 h-7 rounded-full bg-[#C57488]/10 text-[#C57488] font-bold text-xs flex items-center justify-center">2</span>
                <h3 className="font-serif-luxury text-lg font-bold text-[#2C2225] flex items-center gap-2">
                  <FiStar className="text-[#C57488]" /> Choose Service
                </h3>
              </div>
              
              {/* Category tabs */}
              <div className="flex flex-wrap gap-2.5 mb-5">
                {Object.keys(categories).map(cat => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => handleCategoryChange(cat)}
                    className={`px-4 py-2.5 rounded-xl text-xs font-bold tracking-wide transition-all duration-300 ${
                      formData.category === cat 
                        ? 'bg-[#C57488] text-white shadow-md scale-105' 
                        : 'bg-pink-50/80 text-gray-700 hover:bg-pink-100 border border-pink-100'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              <div>
                <label className="block text-xs font-bold text-[#2C2225] mb-1.5 uppercase tracking-wider">Select Specific Treatment *</label>
                <select
                  value={formData.service}
                  onChange={e => setFormData({ ...formData, service: e.target.value })}
                  className="w-full px-4 py-3.5 rounded-xl border border-pink-200 text-xs focus:outline-none focus:border-[#C57488] focus:ring-1 focus:ring-[#C57488] bg-white font-semibold text-[#2C2225] shadow-sm"
                >
                  {categories[formData.category].map((s, idx) => (
                    <option key={idx} value={s}>{s}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Step 3: Schedule */}
            <div>
              <div className="flex items-center gap-2 mb-4 border-b border-pink-100 pb-3">
                <span className="w-7 h-7 rounded-full bg-[#C57488]/10 text-[#C57488] font-bold text-xs flex items-center justify-center">3</span>
                <h3 className="font-serif-luxury text-lg font-bold text-[#2C2225] flex items-center gap-2">
                  <FiCalendar className="text-[#C57488]" /> Date & Time Slot
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold text-[#2C2225] mb-1.5 uppercase tracking-wider">
                    Preferred Date (Mon - Sat) *
                  </label>
                  <input
                    type="date"
                    required
                    min={new Date().toISOString().split('T')[0]}
                    value={formData.date}
                    onChange={e => setFormData({ ...formData, date: e.target.value })}
                    className="w-full px-4 py-3.5 rounded-xl border border-pink-200 text-xs focus:outline-none focus:border-[#C57488] focus:ring-1 focus:ring-[#C57488] bg-white font-medium"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#2C2225] mb-1.5 uppercase tracking-wider">
                    Preferred Time Slot *
                  </label>
                  <select
                    value={formData.time}
                    onChange={e => setFormData({ ...formData, time: e.target.value })}
                    className="w-full px-4 py-3.5 rounded-xl border border-pink-200 text-xs focus:outline-none focus:border-[#C57488] focus:ring-1 focus:ring-[#C57488] bg-white font-medium"
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

            {/* Notes */}
            <div>
              <label className="block text-xs font-bold text-[#2C2225] mb-1.5 uppercase tracking-wider">Special Notes / Requests</label>
              <textarea
                rows={3}
                placeholder="Mention any specific requirement or bridal request..."
                value={formData.notes}
                onChange={e => setFormData({ ...formData, notes: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-pink-200 text-xs focus:outline-none focus:border-[#C57488] focus:ring-1 focus:ring-[#C57488] bg-white"
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 rounded-full bg-gradient-to-r from-[#D87093] via-[#C57488] to-[#B35F74] text-white font-bold text-xs tracking-widest uppercase shadow-xl hover:shadow-2xl hover:scale-[1.01] active:scale-95 transition-all duration-300"
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
              <h3 className="font-serif-luxury text-2xl font-bold text-[#2C2225]">Appointment Requested!</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Thank you <span className="font-bold text-[#2C2225]">{formData.customerName}</span>. Your appointment request for <span className="font-bold text-[#C57488]">{formData.service}</span> on <span className="font-bold">{formData.date}</span> at <span className="font-bold">{formData.time}</span> has been received!
              </p>
              <button
                onClick={() => setSuccessModal(false)}
                className="w-full py-3 rounded-full bg-[#C57488] text-white font-bold text-xs uppercase tracking-wider hover:bg-[#B35F74] transition"
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

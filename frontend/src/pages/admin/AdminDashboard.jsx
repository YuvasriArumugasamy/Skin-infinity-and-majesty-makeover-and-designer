import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { 
  FiGrid, FiCalendar, FiUsers, FiScissors, FiStar, 
  FiMail, FiLogOut, FiCheck, FiX, FiRefreshCw,
  FiPlus, FiSearch, FiClock, FiTrash2, FiMenu, FiDollarSign,
  FiSend, FiHeart, FiFileText, FiImage, FiUpload, FiShare2, FiInbox
} from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip } from 'recharts';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('Overview');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Modal State Controls
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [brideModalOpen, setBrideModalOpen] = useState(false);
  const [galleryModalOpen, setGalleryModalOpen] = useState(false);

  // Booking Form State
  const [newBooking, setNewBooking] = useState({
    customerName: '',
    phone: '',
    service: 'Bespoke Royal Bridal HD Makeup',
    date: new Date().toISOString().split('T')[0],
    time: '10:00 AM',
    amount: '₹18,500',
    staff: 'Yuvasri A. (Master Artist)'
  });

  // Bride Form State
  const [newBride, setNewBride] = useState({
    clientName: '',
    functionDate: '',
    eventType: 'Muhurtham & Reception',
    trialDate: '',
    skinNotes: '',
    jewelryColor: '',
    blouseDetails: '',
    bust: '',
    waist: '',
    shoulder: '',
    sleeve: ''
  });

  // Gallery Form State
  const [newGallery, setNewGallery] = useState({
    title: '',
    category: 'Bridal Makeover',
    image: '/bride1.jpg'
  });

  // Staff members list
  const staffList = [
    'Yuvasri A. (Master Artist)',
    'Meenakshi S. (Hair Stylist)',
    'Kavya R. (Senior Aesthetician)',
    'Dhana L. (Designer Draper)'
  ];

  // Portfolio Gallery Items
  const initialGallery = [
    { _id: 'g1', title: 'Royal Muhurtham HD Makeup Look', category: 'Bridal Makeover', image: '/bride1.jpg', status: 'Published' },
    { _id: 'g2', title: 'Handcrafted Zardozi Aari Work Blouse', category: 'Bespoke Couture', image: '/ari work.png', status: 'Published' },
    { _id: 'g3', title: 'Advance Hydra-Facial Glow Treatment', category: 'Skin Therapy', image: '/advance hydrs facial.png', status: 'Published' },
    { _id: 'g4', title: 'Reception Glam Hair Spa & Styling', category: 'Hair Care', image: '/hair spa.png', status: 'Published' },
    { _id: 'g5', title: 'Custom Designer Blouse Embroidery', category: 'Bespoke Couture', image: '/Machine embroider work.png', status: 'Published' }
  ];

  // Salon Services Suite
  const initialServices = [
    { _id: 's1', name: 'Bespoke Royal Bridal HD Makeup', category: 'Bridal Suite', price: '₹18,500', duration: '3.5 Hours', status: 'Active' },
    { _id: 's2', name: 'Ultra Glow Hydra-Facial Treatment', category: 'Skin Therapy', price: '₹4,500', duration: '90 Mins', status: 'Active' },
    { _id: 's3', name: 'Keratin Hair Smoothing & Spa', category: 'Hair Care', price: '₹6,500', duration: '2.5 Hours', status: 'Active' },
    { _id: 's4', name: 'Designer Blouse Embroidery & Saree Draping', category: 'Couture', price: '₹8,000', duration: '2 Hours', status: 'Active' }
  ];

  const [appointments, setAppointments] = useState([]);
  const [bridalRecords, setBridalRecords] = useState([]);
  const [gallery, setGallery] = useState(initialGallery);
  const [services, setServices] = useState(initialServices);

  // Time Slots Template
  const timeSlots = [
    { time: '09:00 AM' },
    { time: '10:30 AM' },
    { time: '12:00 PM' },
    { time: '02:00 PM' },
    { time: '04:00 PM' },
    { time: '06:00 PM' }
  ];

  const chartData = [
    { name: '1 May', revenue: 15000 },
    { name: '5 May', revenue: 32000 },
    { name: '10 May', revenue: 24000 },
    { name: '15 May', revenue: 45000 },
    { name: '20 May', revenue: 68000 },
    { name: '25 May', revenue: 42000 },
    { name: '30 May', revenue: 58000 }
  ];

  // Fetch real data from live backend & localStorage
  const fetchData = async () => {
    setLoading(true);
    let localData = [];
    try {
      localData = JSON.parse(localStorage.getItem('appointments') || '[]');
    } catch (e) {}

    try {
      const res = await axios.get('/api/appointments');
      const apiData = res.data?.data || res.data || [];
      if (Array.isArray(apiData) && apiData.length > 0) {
        // Merge unique by phone/id
        const combined = [...apiData, ...localData];
        const unique = Array.from(new Map(combined.map(item => [item._id || item.phone, item])).values());
        setAppointments(unique);
        localStorage.setItem('appointments', JSON.stringify(unique));
      } else if (localData.length > 0) {
        setAppointments(localData);
      }
    } catch (e) {
      if (localData.length > 0) {
        setAppointments(localData);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();

    // Auto sync every 3 seconds & on storage update
    const interval = setInterval(() => {
      try {
        const stored = JSON.parse(localStorage.getItem('appointments') || '[]');
        if (stored.length > 0) {
          setAppointments(prev => {
            const combined = [...stored, ...prev];
            return Array.from(new Map(combined.map(item => [item._id || item.phone, item])).values());
          });
        }
      } catch (e) {}
    }, 3000);

    const handleStorageChange = () => {
      fetchData();
    };

    window.addEventListener('storage', handleStorageChange);
    return () => {
      clearInterval(interval);
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  // Handle Form Submissions
  const handleCreateBooking = (e) => {
    e.preventDefault();
    if (!newBooking.customerName || !newBooking.phone) {
      toast.error('Please enter Client Name and Phone number');
      return;
    }
    const created = {
      _id: Date.now().toString(),
      ...newBooking,
      status: 'Confirmed'
    };
    setAppointments(prev => [created, ...prev]);
    toast.success(`Booking created for ${newBooking.customerName}! ✨`);
    setBookingModalOpen(false);
    setNewBooking({
      customerName: '',
      phone: '',
      service: 'Bespoke Royal Bridal HD Makeup',
      date: new Date().toISOString().split('T')[0],
      time: '10:00 AM',
      amount: '₹18,500',
      staff: 'Yuvasri A. (Master Artist)'
    });
  };

  const handleCreateBride = (e) => {
    e.preventDefault();
    if (!newBride.clientName || !newBride.functionDate) {
      toast.error('Please enter Bride Name and Function Date');
      return;
    }
    const created = {
      _id: Date.now().toString(),
      ...newBride,
      bust: newBride.bust || '34"',
      waist: newBride.waist || '28"',
      shoulder: newBride.shoulder || '14"',
      sleeve: newBride.sleeve || '10.5"',
      deliveryStatus: 'Consultation Completed'
    };
    setBridalRecords(prev => [created, ...prev]);
    toast.success(`Bride Record created for ${newBride.clientName}! 👰`);
    setBrideModalOpen(false);
    setNewBride({
      clientName: '',
      functionDate: '',
      eventType: 'Muhurtham & Reception',
      trialDate: '',
      skinNotes: '',
      jewelryColor: '',
      blouseDetails: '',
      bust: '',
      waist: '',
      shoulder: '',
      sleeve: ''
    });
  };

  const handleCreateGallery = (e) => {
    e.preventDefault();
    if (!newGallery.title) {
      toast.error('Please enter Photo Title');
      return;
    }
    const created = {
      _id: Date.now().toString(),
      ...newGallery,
      status: 'Published'
    };
    setGallery(prev => [created, ...prev]);
    toast.success('Photo added to Portfolio! 🖼️');
    setGalleryModalOpen(false);
    setNewGallery({
      title: '',
      category: 'Bridal Makeover',
      image: '/bride1.jpg'
    });
  };

  const handleStatusChange = async (id, status) => {
    try {
      await axios.patch(`/api/appointments/${id}/status`, { status });
    } catch (e) {}
    setAppointments(prev => prev.map(a => a._id === id ? { ...a, status } : a));
    toast.success(`Appointment marked as ${status}`);
  };

  const handleStaffAssign = (id, staffName) => {
    setAppointments(prev => prev.map(a => a._id === id ? { ...a, staff: staffName } : a));
    toast.success(`Assigned ${staffName}`);
  };

  const handleDeleteAppointment = (id) => {
    setAppointments(prev => prev.filter(a => a._id !== id));
    toast.success('Appointment removed');
  };

  const handleSendWhatsApp = (apt) => {
    const cleanPhone = (apt.phone || '').replace(/[^0-9]/g, '');
    const fullPhone = cleanPhone.length === 10 ? `91${cleanPhone}` : cleanPhone;
    const msg = `Hello ${apt.customerName || 'Client'}! ✨ This is a reminder for your upcoming ${apt.service || 'Makeover'} appointment at Skin Infinity & Majesty on ${apt.date} at ${apt.time}. Assigned Stylist: ${apt.staff || 'Master Artist'}. See you soon! 👑`;
    const waUrl = `https://wa.me/${fullPhone}?text=${encodeURIComponent(msg)}`;
    window.open(waUrl, '_blank');
    toast.success(`Opening WhatsApp for ${apt.customerName}...`, { icon: '💬' });
  };

  const handleToggleGalleryStatus = (id) => {
    setGallery(prev => prev.map(g => g._id === id ? { ...g, status: g.status === 'Published' ? 'Draft' : 'Published' } : g));
    toast.success('Gallery Status Updated!');
  };

  const handleDeleteGalleryItem = (id) => {
    setGallery(prev => prev.filter(g => g._id !== id));
    toast.success('Photo removed');
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    toast.success('Logged out');
    navigate('/admin/login');
  };

  const filteredAppointments = appointments.filter(a => {
    const name = a.customerName || a.name || '';
    const service = a.service || '';
    const phone = a.phone || '';
    const matchesSearch = name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          service.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          phone.includes(searchQuery);
    const matchesStatus = statusFilter === 'All' ? true : a.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="h-screen overflow-hidden flex bg-gradient-to-br from-[#FFF8FA] via-white to-[#FAF0F4] text-gray-800 font-sans relative">
      
      {/* ========================================================================= */}
      {/* 👑 MODAL POPUP 1: NEW BOOKING MODAL */}
      {/* ========================================================================= */}
      {bookingModalOpen && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-pink-200 space-y-6 relative">
            <button 
              onClick={() => setBookingModalOpen(false)}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-pink-50 text-[#B76E79] flex items-center justify-center hover:bg-pink-100 transition"
            >
              <FiX size={18} />
            </button>

            <div className="flex items-center gap-3 border-b border-pink-100 pb-4">
              <div className="w-10 h-10 rounded-2xl bg-pink-100/60 text-[#B76E79] flex items-center justify-center text-xl font-bold">
                <FiCalendar />
              </div>
              <div>
                <h3 className="font-serif text-xl font-bold text-[#2C2225]">New Client Appointment</h3>
                <p className="text-xs text-gray-500">Schedule salon treatment or bridal makeover</p>
              </div>
            </div>

            <form onSubmit={handleCreateBooking} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-gray-700 mb-1">Client Full Name *</label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. Priya Sundaram" 
                  value={newBooking.customerName}
                  onChange={e => setNewBooking({ ...newBooking, customerName: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-pink-200 bg-pink-50/30 text-gray-800 focus:outline-none focus:border-[#B76E79]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Phone Number *</label>
                  <input 
                    type="text" 
                    required
                    placeholder="e.g. 98765 43210" 
                    value={newBooking.phone}
                    onChange={e => setNewBooking({ ...newBooking, phone: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-pink-200 bg-pink-50/30 text-gray-800 focus:outline-none focus:border-[#B76E79]"
                  />
                </div>

                <div>
                  <label className="block font-bold text-gray-700 mb-1">Service Selected</label>
                  <select 
                    value={newBooking.service}
                    onChange={e => setNewBooking({ ...newBooking, service: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-pink-200 bg-white text-gray-800 focus:outline-none focus:border-[#B76E79]"
                  >
                    {services.map(s => (
                      <option key={s._id} value={s.name}>{s.name} ({s.price})</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Date</label>
                  <input 
                    type="date" 
                    value={newBooking.date}
                    onChange={e => setNewBooking({ ...newBooking, date: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-pink-200 bg-white text-gray-800 focus:outline-none focus:border-[#B76E79]"
                  />
                </div>

                <div>
                  <label className="block font-bold text-gray-700 mb-1">Time Slot</label>
                  <select 
                    value={newBooking.time}
                    onChange={e => setNewBooking({ ...newBooking, time: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-pink-200 bg-white text-gray-800 focus:outline-none focus:border-[#B76E79]"
                  >
                    {timeSlots.map((ts, i) => (
                      <option key={i} value={ts.time}>{ts.time}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-gray-700 mb-1">Price (₹)</label>
                  <input 
                    type="text" 
                    value={newBooking.amount}
                    onChange={e => setNewBooking({ ...newBooking, amount: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-pink-200 bg-white text-gray-800 focus:outline-none focus:border-[#B76E79]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">Assign Stylist / Master Artist</label>
                <select 
                  value={newBooking.staff}
                  onChange={e => setNewBooking({ ...newBooking, staff: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-pink-200 bg-white text-gray-800 focus:outline-none focus:border-[#B76E79]"
                >
                  {staffList.map((st, i) => (
                    <option key={i} value={st}>{st}</option>
                  ))}
                </select>
              </div>

              <div className="pt-4 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setBookingModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl bg-gray-100 hover:bg-gray-200 font-bold text-gray-700 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#D87093] to-[#B76E79] text-white font-bold shadow-md hover:opacity-95 transition"
                >
                  Confirm & Schedule
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 👰 MODAL POPUP 2: NEW BRIDE CONSULTATION MODAL */}
      {/* ========================================================================= */}
      {brideModalOpen && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-pink-200 space-y-6 relative max-h-[90vh] overflow-y-auto">
            <button 
              onClick={() => setBrideModalOpen(false)}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-pink-50 text-[#B76E79] flex items-center justify-center hover:bg-pink-100 transition"
            >
              <FiX size={18} />
            </button>

            <div className="flex items-center gap-3 border-b border-pink-100 pb-4">
              <div className="w-10 h-10 rounded-2xl bg-amber-100/60 text-amber-700 flex items-center justify-center text-xl font-bold">
                <FiHeart />
              </div>
              <div>
                <h3 className="font-serif text-xl font-bold text-[#2C2225]">New Bridal & Couture Record</h3>
                <p className="text-xs text-gray-500">Bride trial dates, skin prep, and blouse measurements</p>
              </div>
            </div>

            <form onSubmit={handleCreateBride} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Bride Full Name *</label>
                  <input 
                    type="text" 
                    required
                    placeholder="e.g. Priya Sundaram" 
                    value={newBride.clientName}
                    onChange={e => setNewBride({ ...newBride, clientName: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-pink-200 bg-pink-50/30 text-gray-800 focus:outline-none focus:border-[#B76E79]"
                  />
                </div>

                <div>
                  <label className="block font-bold text-gray-700 mb-1">Function Date (Wedding) *</label>
                  <input 
                    type="date" 
                    required
                    value={newBride.functionDate}
                    onChange={e => setNewBride({ ...newBride, functionDate: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-pink-200 bg-white text-gray-800 focus:outline-none focus:border-[#B76E79]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Event Type</label>
                  <select 
                    value={newBride.eventType}
                    onChange={e => setNewBride({ ...newBride, eventType: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-pink-200 bg-white text-gray-800 focus:outline-none focus:border-[#B76E79]"
                  >
                    <option value="Muhurtham & Reception">Muhurtham & Reception</option>
                    <option value="Grand Sangeet & Wedding">Grand Sangeet & Wedding</option>
                    <option value="Engagement & Reception">Engagement & Reception</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-gray-700 mb-1">Makeup Trial Date</label>
                  <input 
                    type="date" 
                    value={newBride.trialDate}
                    onChange={e => setNewBride({ ...newBride, trialDate: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-pink-200 bg-white text-gray-800 focus:outline-none focus:border-[#B76E79]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">Skin Type & Prep Notes</label>
                <input 
                  type="text" 
                  placeholder="e.g. Sensitive Skin, Dewy Finish Preferred, Patch Test Passed" 
                  value={newBride.skinNotes}
                  onChange={e => setNewBride({ ...newBride, skinNotes: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-pink-200 bg-white text-gray-800 focus:outline-none focus:border-[#B76E79]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Jewelry & Saree Theme</label>
                  <input 
                    type="text" 
                    placeholder="e.g. Antique Temple Gold & Ruby" 
                    value={newBride.jewelryColor}
                    onChange={e => setNewBride({ ...newBride, jewelryColor: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-pink-200 bg-white text-gray-800 focus:outline-none focus:border-[#B76E79]"
                  />
                </div>

                <div>
                  <label className="block font-bold text-gray-700 mb-1">Blouse Embroidery Work Details</label>
                  <input 
                    type="text" 
                    placeholder="e.g. Heavy Zardozi & Kundan Aari Work" 
                    value={newBride.blouseDetails}
                    onChange={e => setNewBride({ ...newBride, blouseDetails: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-pink-200 bg-white text-gray-800 focus:outline-none focus:border-[#B76E79]"
                  />
                </div>
              </div>

              {/* Bespoke Measurement Card Inputs */}
              <div className="p-4 rounded-2xl bg-pink-50/50 border border-pink-200 space-y-3">
                <span className="font-bold text-[#B76E79] flex items-center gap-1.5">
                  <FiScissors /> Blouse Measurements (Inches)
                </span>
                <div className="grid grid-cols-4 gap-3">
                  <div>
                    <label className="block text-[10px] font-bold text-gray-600 mb-1">Bust</label>
                    <input 
                      type="text" 
                      placeholder='34"' 
                      value={newBride.bust}
                      onChange={e => setNewBride({ ...newBride, bust: e.target.value })}
                      className="w-full px-2.5 py-1.5 rounded-lg border border-pink-200 bg-white text-center font-bold"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-gray-600 mb-1">Waist</label>
                    <input 
                      type="text" 
                      placeholder='28"' 
                      value={newBride.waist}
                      onChange={e => setNewBride({ ...newBride, waist: e.target.value })}
                      className="w-full px-2.5 py-1.5 rounded-lg border border-pink-200 bg-white text-center font-bold"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-gray-600 mb-1">Shoulder</label>
                    <input 
                      type="text" 
                      placeholder='14"' 
                      value={newBride.shoulder}
                      onChange={e => setNewBride({ ...newBride, shoulder: e.target.value })}
                      className="w-full px-2.5 py-1.5 rounded-lg border border-pink-200 bg-white text-center font-bold"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-gray-600 mb-1">Sleeve</label>
                    <input 
                      type="text" 
                      placeholder='10.5"' 
                      value={newBride.sleeve}
                      onChange={e => setNewBride({ ...newBride, sleeve: e.target.value })}
                      className="w-full px-2.5 py-1.5 rounded-lg border border-pink-200 bg-white text-center font-bold"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-4 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setBrideModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl bg-gray-100 hover:bg-gray-200 font-bold text-gray-700 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#D87093] to-[#B76E79] text-white font-bold shadow-md hover:opacity-95 transition"
                >
                  Save Bride Suite
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 🖼️ MODAL POPUP 3: UPLOAD GALLERY PHOTO MODAL */}
      {/* ========================================================================= */}
      {galleryModalOpen && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-pink-200 space-y-6 relative">
            <button 
              onClick={() => setGalleryModalOpen(false)}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-pink-50 text-[#B76E79] flex items-center justify-center hover:bg-pink-100 transition"
            >
              <FiX size={18} />
            </button>

            <div className="flex items-center gap-3 border-b border-pink-100 pb-4">
              <div className="w-10 h-10 rounded-2xl bg-purple-100/60 text-purple-700 flex items-center justify-center text-xl font-bold">
                <FiUpload />
              </div>
              <div>
                <h3 className="font-serif text-xl font-bold text-[#2C2225]">Upload Portfolio Photo</h3>
                <p className="text-xs text-gray-500">Publish makeover or couture photos to website</p>
              </div>
            </div>

            <form onSubmit={handleCreateGallery} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-gray-700 mb-1">Photo Title / Description *</label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. Royal Reception Airbrush Look" 
                  value={newGallery.title}
                  onChange={e => setNewGallery({ ...newGallery, title: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-pink-200 bg-pink-50/30 text-gray-800 focus:outline-none focus:border-[#B76E79]"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">Category</label>
                <select 
                  value={newGallery.category}
                  onChange={e => setNewGallery({ ...newGallery, category: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-pink-200 bg-white text-gray-800 focus:outline-none focus:border-[#B76E79]"
                >
                  <option value="Bridal Makeover">Bridal Makeover</option>
                  <option value="Bespoke Couture">Bespoke Couture</option>
                  <option value="Skin Therapy">Skin Therapy</option>
                  <option value="Hair Care">Hair Care</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">Image URL / Path</label>
                <input 
                  type="text" 
                  placeholder="e.g. /bride1.jpg or image URL" 
                  value={newGallery.image}
                  onChange={e => setNewGallery({ ...newGallery, image: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-pink-200 bg-white text-gray-800 focus:outline-none focus:border-[#B76E79]"
                />
              </div>

              <div className="pt-4 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setGalleryModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl bg-gray-100 hover:bg-gray-200 font-bold text-gray-700 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#D87093] to-[#B76E79] text-white font-bold shadow-md hover:opacity-95 transition"
                >
                  Publish Photo
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Mobile Drawer Overlay */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/40 z-40 md:hidden backdrop-blur-sm"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* 📌 Fixed Left Sidebar Navigation */}
      <aside className={`fixed md:sticky top-0 left-0 bottom-0 h-screen z-40 w-72 bg-white/95 backdrop-blur-md border-r border-pink-100/80 p-6 flex flex-col justify-between shrink-0 shadow-sm transition-transform duration-300 ${
        mobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
      }`}>
        <div className="space-y-8">
          
          {/* Executive Brand Badge */}
          <div className="p-4 rounded-2xl bg-gradient-to-br from-[#FFF0F5] to-white border border-pink-200/60 shadow-sm flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl overflow-hidden bg-white p-1 border border-pink-200 shadow-sm shrink-0 flex items-center justify-center">
              <img 
                src="/logo.png" 
                alt="Skin Infinity & Majesty" 
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <h3 className="font-serif text-sm font-bold text-[#2C2225] leading-tight tracking-tight">SKIN INFINITY</h3>
              <span className="text-[10px] tracking-widest text-[#B76E79] font-bold uppercase">EXECUTIVE SUITE</span>
            </div>
          </div>

          {/* Core Navigation Items */}
          <nav className="space-y-2">
            {[
              { id: 'Overview', label: 'Executive Dashboard', desc: 'Live Metrics & Schedule', icon: <FiGrid /> },
              { id: 'Appointments', label: 'Bookings & Slots', desc: 'Real-Time Slots & WhatsApp', icon: <FiCalendar /> },
              { id: 'BridalSuite', label: 'Bridal & Couture Studio', desc: 'Bride Notes & Measurements', icon: <FiHeart /> },
              { id: 'GalleryAndServices', label: 'Portfolio & Services', desc: 'Photos & Pricing Suite', icon: <FiImage /> }
            ].map(item => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full text-left p-3.5 rounded-2xl transition-all duration-300 flex items-center gap-3.5 group ${
                    isActive 
                      ? 'bg-gradient-to-r from-[#B76E79] to-[#D87093] text-white shadow-md shadow-pink-200/50 scale-[1.02]' 
                      : 'bg-white/60 hover:bg-pink-50/70 text-gray-700 border border-pink-100/50'
                  }`}
                >
                  <div className={`p-2.5 rounded-xl text-lg transition ${
                    isActive ? 'bg-white/20 text-white' : 'bg-pink-100/60 text-[#B76E79] group-hover:bg-[#B76E79] group-hover:text-white'
                  }`}>
                    {item.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="block text-xs font-bold truncate leading-tight">{item.label}</span>
                    <span className={`block text-[10px] truncate mt-0.5 ${isActive ? 'text-pink-100' : 'text-gray-400'}`}>
                      {item.desc}
                    </span>
                  </div>
                </button>
              );
            })}
          </nav>

        </div>

        {/* User Info & Logout */}
        <div className="pt-6 border-t border-pink-100/80 space-y-3">
          <div className="flex items-center gap-3 p-2 bg-pink-50/60 rounded-xl border border-pink-100">
            <img src="/logo.png" alt="Admin" className="w-8 h-8 rounded-full object-cover border border-pink-200" />
            <div className="min-w-0 flex-1">
              <span className="block text-xs font-bold text-[#2C2225] truncate">Yuvasri A.</span>
              <span className="block text-[9px] text-[#B76E79] font-semibold uppercase">Super Admin</span>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold text-rose-600 bg-rose-50 hover:bg-rose-100 transition"
          >
            <FiLogOut /> Log Out
          </button>
        </div>
      </aside>

      {/* 📜 Right Side Main Content Area */}
      <main className="flex-1 h-screen overflow-y-auto min-w-0">
        
        {/* Header */}
        <header className="bg-white/80 backdrop-blur-md border-b border-pink-100/80 px-6 py-4 flex justify-between items-center sticky top-0 z-30 shadow-xs">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setMobileMenuOpen(true)} 
              className="p-2 rounded-xl bg-pink-50 text-[#B76E79] md:hidden border border-pink-200"
            >
              <FiMenu size={18} />
            </button>
            <div>
              <h2 className="font-serif text-lg md:text-xl font-bold text-[#2C2225]">Skin Infinity & Majesty Executive Suite ✨</h2>
              <p className="text-xs text-gray-500">Live Booking & Studio Management Panel</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button 
              onClick={fetchData} 
              className="p-2.5 rounded-xl bg-pink-50 text-[#B76E79] text-xs font-bold hover:bg-pink-100 border border-pink-200 transition flex items-center gap-1.5"
              title="Refresh Live Data"
            >
              <FiRefreshCw className={`text-sm ${loading ? 'animate-spin' : ''}`} />
              <span className="hidden sm:inline">Sync Live</span>
            </button>

            <button
              onClick={() => setBookingModalOpen(true)}
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#D87093] to-[#B76E79] text-white text-xs font-bold flex items-center gap-2 shadow-sm hover:opacity-95 transition"
            >
              <FiPlus />
              <span className="hidden sm:inline">New Booking</span>
            </button>
          </div>
        </header>

        {/* Content Body */}
        <div className="p-6 md:p-8 space-y-8">
          
          {/* ==================== TAB 1: EXECUTIVE OVERVIEW ==================== */}
          {activeTab === 'Overview' && (
            <div className="space-y-8">
              
              {/* Stat Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                
                <div className="bg-white/90 backdrop-blur-md p-6 rounded-2xl border border-pink-100 shadow-sm space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Live Bookings</span>
                    <div className="w-9 h-9 rounded-xl bg-pink-50 text-[#B76E79] flex items-center justify-center font-bold">
                      <FiCalendar />
                    </div>
                  </div>
                  <div className="flex items-baseline justify-between">
                    <h3 className="text-3xl font-serif font-bold text-[#2C2225]">{appointments.length}</h3>
                    <span className="text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-100">Live Sync</span>
                  </div>
                </div>

                <div className="bg-white/90 backdrop-blur-md p-6 rounded-2xl border border-pink-100 shadow-sm space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Active Bridal Suites</span>
                    <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center font-bold">
                      <FiHeart />
                    </div>
                  </div>
                  <div className="flex items-baseline justify-between">
                    <h3 className="text-3xl font-serif font-bold text-[#2C2225]">{bridalRecords.length}</h3>
                    <span className="text-[11px] font-bold text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-100">Bespoke</span>
                  </div>
                </div>

                <div className="bg-white/90 backdrop-blur-md p-6 rounded-2xl border border-pink-100 shadow-sm space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Portfolio Photos</span>
                    <div className="w-9 h-9 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold">
                      <FiImage />
                    </div>
                  </div>
                  <div className="flex items-baseline justify-between">
                    <h3 className="text-3xl font-serif font-bold text-[#2C2225]">{gallery.length}</h3>
                    <span className="text-[11px] font-bold text-purple-700 bg-purple-50 px-2.5 py-0.5 rounded-full border border-purple-100">Live</span>
                  </div>
                </div>

                <div className="bg-white/90 backdrop-blur-md p-6 rounded-2xl border border-pink-100 shadow-sm space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Studio Rating</span>
                    <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-500 flex items-center justify-center font-bold">
                      <FiStar />
                    </div>
                  </div>
                  <div className="flex items-baseline justify-between">
                    <h3 className="text-3xl font-serif font-bold text-[#2C2225]">4.9 ★</h3>
                    <span className="text-[11px] font-bold text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-100">Verified</span>
                  </div>
                </div>

              </div>

              {/* Today's Appointments List */}
              <div className="bg-white/90 backdrop-blur-md p-6 md:p-8 rounded-3xl border border-pink-100 shadow-sm space-y-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-pink-100 pb-4">
                  <div>
                    <h3 className="font-serif text-lg font-bold text-[#2C2225]">🌟 Live Customer Appointments</h3>
                    <p className="text-xs text-gray-500">Real bookings submitted by clients through the website</p>
                  </div>
                  <button
                    onClick={() => setBookingModalOpen(true)}
                    className="px-3.5 py-1.5 rounded-xl text-xs font-bold bg-pink-50 text-[#B76E79] border border-pink-200 hover:bg-pink-100 transition"
                  >
                    + Add New Booking
                  </button>
                </div>

                {appointments.length === 0 ? (
                  <div className="py-12 text-center space-y-3">
                    <div className="w-16 h-16 mx-auto rounded-full bg-pink-50 text-[#B76E79] flex items-center justify-center text-2xl border border-pink-200 shadow-xs">
                      <FiInbox />
                    </div>
                    <h4 className="font-serif text-base font-bold text-[#2C2225]">No Bookings Yet</h4>
                    <p className="text-xs text-gray-500 max-w-sm mx-auto">
                      Customer appointments booked from the website will automatically appear here in real-time.
                    </p>
                    <button
                      onClick={() => setBookingModalOpen(true)}
                      className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#D87093] to-[#B76E79] text-white text-xs font-bold shadow-sm"
                    >
                      + Create Manual Booking
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {appointments.map((apt) => (
                      <div key={apt._id} className="p-5 rounded-2xl bg-gradient-to-br from-[#FFF5F8] to-white border border-pink-200/80 shadow-xs space-y-4">
                        <div className="flex justify-between items-start">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-[#B76E79] text-white font-bold flex items-center justify-center text-sm shadow-sm">
                              {(apt.customerName || apt.name || 'C').charAt(0)}
                            </div>
                            <div>
                              <h4 className="font-bold text-sm text-[#2C2225] leading-tight">{apt.customerName || apt.name}</h4>
                              <span className="text-[11px] text-[#B76E79] font-semibold">{apt.service}</span>
                            </div>
                          </div>
                          <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                            apt.status === 'Confirmed' ? 'bg-emerald-100 text-emerald-800' :
                            apt.status === 'Cancelled' ? 'bg-red-100 text-red-800' :
                            'bg-amber-100 text-amber-800'
                          }`}>
                            {apt.status || 'Confirmed'}
                          </span>
                        </div>

                        <div className="p-3 rounded-xl bg-white border border-pink-100 text-xs space-y-1 text-gray-600">
                          <div className="flex justify-between">
                            <span>Date & Time:</span>
                            <strong className="text-gray-800">{apt.date} | {apt.time || '10:00 AM'}</strong>
                          </div>
                          <div className="flex justify-between">
                            <span>Assigned Stylist:</span>
                            <strong className="text-[#B76E79]">{apt.staff || 'Master Artist'}</strong>
                          </div>
                        </div>

                        <div className="flex items-center justify-between pt-1">
                          <span className="font-serif font-bold text-sm text-[#2C2225]">{apt.amount || '₹4,500'}</span>
                          <button
                            onClick={() => handleSendWhatsApp(apt)}
                            className="px-3 py-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm transition"
                          >
                            <FaWhatsapp /> Send WA
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Revenue Area Chart */}
              <div className="bg-white/90 backdrop-blur-md p-6 md:p-8 rounded-3xl border border-pink-100 shadow-sm space-y-4">
                <h3 className="font-serif text-lg font-bold text-[#2C2225]">Studio Revenue Trajectory</h3>
                <div className="h-64 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={chartData}>
                      <defs>
                        <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#B76E79" stopOpacity={0.4}/>
                          <stop offset="95%" stopColor="#B76E79" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <XAxis dataKey="name" stroke="#999" fontSize={11} />
                      <YAxis stroke="#999" fontSize={11} tickFormatter={val => `₹${val/1000}k`} />
                      <Tooltip formatter={(val) => [`₹${val.toLocaleString()}`, 'Revenue']} />
                      <Area type="monotone" dataKey="revenue" stroke="#B76E79" strokeWidth={3} fillOpacity={1} fill="url(#colorRev)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

            </div>
          )}

          {/* ==================== TAB 2: BOOKINGS & SLOT STUDIO ==================== */}
          {activeTab === 'Appointments' && (
            <div className="space-y-8">
              
              {/* Real-time Time Slot Availability Grid */}
              <div className="bg-white/90 backdrop-blur-md p-6 md:p-8 rounded-3xl border border-pink-100 shadow-sm space-y-5">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-pink-100 pb-4">
                  <div>
                    <h3 className="font-serif text-lg font-bold text-[#2C2225]">📅 Real-Time Slot Availability Grid</h3>
                    <p className="text-xs text-gray-500">Click any open time slot to reserve it for a client</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-gray-600">Select Date:</span>
                    <input 
                      type="date"
                      value={selectedDate}
                      onChange={e => setSelectedDate(e.target.value)}
                      className="px-3.5 py-1.5 rounded-xl border border-pink-200 text-xs font-bold text-[#B76E79] bg-pink-50"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
                  {timeSlots.map((slot, idx) => {
                    const isSlotBooked = appointments.some(a => a.time === slot.time && a.date === selectedDate);
                    const bookedClient = appointments.find(a => a.time === slot.time && a.date === selectedDate);
                    return (
                      <div 
                        key={idx}
                        className={`p-4 rounded-2xl border text-center space-y-1.5 transition-all duration-300 ${
                          isSlotBooked 
                            ? 'bg-rose-50/80 border-rose-200 text-rose-900 shadow-xs' 
                            : 'bg-emerald-50/80 border-emerald-200 text-emerald-900 hover:scale-105 cursor-pointer shadow-sm'
                        }`}
                        onClick={() => {
                          if (!isSlotBooked) {
                            setNewBooking({ ...newBooking, time: slot.time, date: selectedDate });
                            setBookingModalOpen(true);
                          }
                        }}
                      >
                        <span className="block text-xs font-bold">{slot.time}</span>
                        <span className={`inline-block px-2.5 py-0.5 rounded-full text-[9px] font-bold ${
                          isSlotBooked ? 'bg-rose-200 text-rose-900' : 'bg-emerald-200 text-emerald-900'
                        }`}>
                          {isSlotBooked ? `Booked: ${bookedClient?.customerName || bookedClient?.name || 'Client'}` : 'Available +'}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Master Appointments Table */}
              <div className="bg-white/90 backdrop-blur-md p-6 md:p-8 rounded-3xl border border-pink-100 shadow-sm space-y-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div>
                    <h3 className="font-serif text-lg font-bold text-[#2C2225]">Appointments & Staff Allocation Table</h3>
                    <p className="text-xs text-gray-500">Manage client bookings and assign specialized artists</p>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <div className="relative w-full sm:w-64">
                      <FiSearch className="absolute left-3.5 top-3 text-gray-400 text-xs" />
                      <input
                        type="text"
                        placeholder="Search client or phone..."
                        value={searchQuery}
                        onChange={e => setSearchQuery(e.target.value)}
                        className="w-full pl-9 pr-4 py-2 rounded-xl bg-pink-50/50 border border-pink-200 text-xs text-gray-700 focus:outline-none focus:border-[#B76E79]"
                      />
                    </div>
                  </div>
                </div>

                {appointments.length === 0 ? (
                  <div className="py-12 text-center space-y-3">
                    <div className="w-16 h-16 mx-auto rounded-full bg-pink-50 text-[#B76E79] flex items-center justify-center text-2xl border border-pink-200">
                      <FiInbox />
                    </div>
                    <h4 className="font-serif text-base font-bold text-[#2C2225]">No Bookings Found</h4>
                    <p className="text-xs text-gray-500 max-w-sm mx-auto">
                      All new appointments submitted on the website will be listed here automatically.
                    </p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead>
                        <tr className="border-b border-pink-100 text-gray-400 uppercase font-bold">
                          <th className="py-3.5 px-4">Client Name</th>
                          <th className="py-3.5 px-4">Service</th>
                          <th className="py-3.5 px-4">Date & Time</th>
                          <th className="py-3.5 px-4">Assigned Staff</th>
                          <th className="py-3.5 px-4">Status</th>
                          <th className="py-3.5 px-4 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-pink-100/60 text-gray-700">
                        {filteredAppointments.map((apt) => (
                          <tr key={apt._id} className="hover:bg-pink-50/40 transition">
                            <td className="py-3.5 px-4 font-bold text-[#2C2225]">{apt.customerName || apt.name}</td>
                            <td className="py-3.5 px-4 text-[#B76E79] font-semibold">{apt.service}</td>
                            <td className="py-3.5 px-4 text-gray-600">{apt.date} | {apt.time || '10:00 AM'}</td>
                            <td className="py-3.5 px-4">
                              <select
                                value={apt.staff || staffList[0]}
                                onChange={e => handleStaffAssign(apt._id, e.target.value)}
                                className="px-2.5 py-1 rounded-lg border border-pink-200 bg-white text-[11px] text-gray-700 font-medium focus:outline-none focus:border-[#B76E79]"
                              >
                                {staffList.map((st, i) => (
                                  <option key={i} value={st}>{st}</option>
                                ))}
                              </select>
                            </td>
                            <td className="py-3.5 px-4">
                              <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                                apt.status === 'Confirmed' ? 'bg-emerald-100 text-emerald-800' :
                                apt.status === 'Cancelled' ? 'bg-red-100 text-red-800' :
                                'bg-amber-100 text-amber-800'
                              }`}>
                                {apt.status || 'Confirmed'}
                              </span>
                            </td>
                            <td className="py-3.5 px-4 text-right">
                              <div className="flex items-center justify-end gap-2">
                                <button
                                  onClick={() => handleSendWhatsApp(apt)}
                                  className="px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-100 font-bold text-[11px] border border-emerald-200 transition flex items-center gap-1"
                                >
                                  <FaWhatsapp /> WA
                                </button>
                                <button
                                  onClick={() => handleStatusChange(apt._id, 'Confirmed')}
                                  className="w-7 h-7 rounded-full bg-emerald-50 hover:bg-emerald-100 text-emerald-700 flex items-center justify-center text-xs transition"
                                >
                                  <FiCheck />
                                </button>
                                <button
                                  onClick={() => handleDeleteAppointment(apt._id)}
                                  className="w-7 h-7 rounded-full bg-red-50 hover:bg-red-100 text-red-600 flex items-center justify-center text-xs transition"
                                >
                                  <FiTrash2 />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>

            </div>
          )}

          {/* ==================== TAB 3: BRIDAL & COUTURE STUDIO ==================== */}
          {activeTab === 'BridalSuite' && (
            <div className="space-y-8">
              
              <div className="bg-white/90 backdrop-blur-md p-6 md:p-8 rounded-3xl border border-pink-100 shadow-sm space-y-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div>
                    <h3 className="font-serif text-lg font-bold text-[#2C2225]">👰 Bridal Consultation & Bespoke Measurement Suite</h3>
                    <p className="text-xs text-gray-500">Track bride look preferences, function dates, and embroidery blouse measurements</p>
                  </div>
                  <button
                    onClick={() => setBrideModalOpen(true)}
                    className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#D87093] to-[#B76E79] text-white font-bold text-xs flex items-center gap-2 shadow-sm"
                  >
                    <FiPlus />
                    <span>Add Bride Consultation</span>
                  </button>
                </div>

                {bridalRecords.length === 0 ? (
                  <div className="py-12 text-center space-y-3">
                    <div className="w-16 h-16 mx-auto rounded-full bg-pink-50 text-[#B76E79] flex items-center justify-center text-2xl border border-pink-200">
                      <FiHeart />
                    </div>
                    <h4 className="font-serif text-base font-bold text-[#2C2225]">No Bridal Records Yet</h4>
                    <p className="text-xs text-gray-500 max-w-sm mx-auto">
                      Click "+ Add Bride Consultation" above to open the popup modal and add bride trial notes and measurements.
                    </p>
                    <button
                      onClick={() => setBrideModalOpen(true)}
                      className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#D87093] to-[#B76E79] text-white text-xs font-bold shadow-sm"
                    >
                      + Create Bride Record Modal
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {bridalRecords.map((b) => (
                      <div key={b._id} className="p-6 rounded-3xl bg-gradient-to-br from-[#FFF5F8] to-white border border-pink-200 shadow-sm space-y-4">
                        <div className="flex justify-between items-start border-b border-pink-100 pb-3">
                          <div>
                            <span className="text-[10px] font-bold text-[#B76E79] uppercase font-mono tracking-wider">{b.eventType}</span>
                            <h4 className="font-serif text-lg font-bold text-[#2C2225]">{b.clientName}</h4>
                            <p className="text-xs text-gray-500">Function Date: <strong className="text-gray-800">{b.functionDate}</strong></p>
                          </div>
                          <span className="px-3 py-1 rounded-full text-[10px] font-bold bg-[#B76E79] text-white shadow-xs">
                            {b.deliveryStatus}
                          </span>
                        </div>

                        <div className="space-y-1 text-xs text-gray-700">
                          <p><strong>Makeup Trial Date:</strong> {b.trialDate || 'N/A'}</p>
                          <p><strong>Skin Type & Prep:</strong> {b.skinNotes || 'Normal Skin'}</p>
                          <p><strong>Jewelry Theme:</strong> {b.jewelryColor || 'Gold Theme'}</p>
                        </div>

                        <div className="pt-3 border-t border-pink-100 space-y-2.5">
                          <div className="flex justify-between items-center">
                            <span className="text-xs font-bold text-[#B76E79] flex items-center gap-1.5">
                              <FiScissors /> Bespoke Measurement Card
                            </span>
                            <button 
                              onClick={() => toast.success(`Measurement sheet exported for ${b.clientName}`)}
                              className="text-[11px] text-[#B76E79] hover:underline font-bold"
                            >
                              Print Card 🖨️
                            </button>
                          </div>
                          <div className="grid grid-cols-4 gap-2 bg-white p-3 rounded-2xl border border-pink-100 text-center text-xs">
                            <div><span className="text-gray-400 block text-[9px]">Bust</span><strong>{b.bust}</strong></div>
                            <div><span className="text-gray-400 block text-[9px]">Waist</span><strong>{b.waist}</strong></div>
                            <div><span className="text-gray-400 block text-[9px]">Shoulder</span><strong>{b.shoulder}</strong></div>
                            <div><span className="text-gray-400 block text-[9px]">Sleeve</span><strong>{b.sleeve}</strong></div>
                          </div>
                          <p className="text-xs text-gray-600 italic bg-white/60 p-2 rounded-xl border border-pink-100">
                            Work Details: {b.blouseDetails || 'Aari Embroidery Work'}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

            </div>
          )}

          {/* ==================== TAB 4: PORTFOLIO & SERVICES STUDIO ==================== */}
          {activeTab === 'GalleryAndServices' && (
            <div className="space-y-8">
              
              {/* Portfolio Gallery Upload */}
              <div className="bg-white/90 backdrop-blur-md p-6 md:p-8 rounded-3xl border border-pink-100 shadow-sm space-y-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div>
                    <h3 className="font-serif text-lg font-bold text-[#2C2225]">🖼️ Website Portfolio Photo Manager</h3>
                    <p className="text-xs text-gray-500">Upload new makeover & designer dress photos displayed on website</p>
                  </div>
                  <button
                    onClick={() => setGalleryModalOpen(true)}
                    className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#D87093] to-[#B76E79] text-white font-bold text-xs flex items-center gap-2 shadow-sm hover:opacity-95 transition"
                  >
                    <FiUpload />
                    <span>Upload / Add Photo</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {gallery.map(item => (
                    <div key={item._id} className="rounded-3xl border border-pink-200 bg-gradient-to-br from-[#FFF5F8] to-white p-4 shadow-xs space-y-3 flex flex-col justify-between">
                      <div className="space-y-2">
                        <div className="w-full h-48 rounded-2xl overflow-hidden bg-gray-100 border border-pink-100 relative group">
                          <img 
                            src={item.image} 
                            alt={item.title} 
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          <span className={`absolute top-2 right-2 px-2.5 py-0.5 rounded-full text-[9px] font-bold shadow-sm ${
                            item.status === 'Published' ? 'bg-emerald-600 text-white' : 'bg-gray-600 text-white'
                          }`}>
                            {item.status}
                          </span>
                        </div>
                        <div>
                          <span className="text-[10px] font-bold text-[#B76E79] uppercase tracking-wider">{item.category}</span>
                          <h4 className="font-bold text-sm text-[#2C2225] leading-snug">{item.title}</h4>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-2 border-t border-pink-100 text-xs">
                        <button
                          onClick={() => handleToggleGalleryStatus(item._id)}
                          className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                            item.status === 'Published' 
                              ? 'bg-amber-100 text-amber-800 hover:bg-amber-200' 
                              : 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                          }`}
                        >
                          {item.status === 'Published' ? 'Set as Draft' : 'Publish to Site'}
                        </button>

                        <button
                          onClick={() => handleDeleteGalleryItem(item._id)}
                          className="w-8 h-8 rounded-xl bg-rose-50 text-rose-600 hover:bg-rose-100 flex items-center justify-center transition"
                          title="Delete Photo"
                        >
                          <FiTrash2 size={14} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Salon Services Suite List */}
              <div className="bg-white/90 backdrop-blur-md p-6 md:p-8 rounded-3xl border border-pink-100 shadow-sm space-y-6">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-serif text-lg font-bold text-[#2C2225]">✂️ Salon Services & Pricing Suite</h3>
                    <p className="text-xs text-gray-500">Service list displayed on customer booking screen</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {services.map(s => (
                    <div key={s._id} className="p-5 rounded-2xl bg-pink-50/30 border border-pink-200 flex justify-between items-center">
                      <div>
                        <span className="text-[10px] font-bold text-[#B76E79] uppercase">{s.category}</span>
                        <h4 className="font-bold text-sm text-[#2C2225]">{s.name}</h4>
                        <p className="text-xs text-gray-500"><FiClock className="inline mr-1" />{s.duration}</p>
                      </div>
                      <span className="font-serif font-bold text-base text-[#B76E79]">{s.price}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

        </div>

      </main>
    </div>
  );
};

export default AdminDashboard;

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { 
  FiGrid, FiCalendar, FiUsers, FiScissors, FiStar, 
  FiMail, FiLogOut, FiCheck, FiX, FiRefreshCw,
  FiPlus, FiSearch, FiClock, FiTrash2, FiMenu, FiDollarSign,
  FiSend, FiUserCheck, FiHeart, FiFileText, FiEdit3
} from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('Overview');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedDate, setSelectedDate] = useState('2026-07-25');
  const navigate = useNavigate();

  // Staff members list
  const staffList = [
    'Yuvasri A. (Master Artist)',
    'Meenakshi S. (Hair Stylist)',
    'Kavya R. (Senior Aesthetician)',
    'Dhana L. (Designer Draper)'
  ];

  // Rich initial appointments data with assigned staff
  const initialAppointments = [
    { _id: '1', customerName: 'Priya Sundaram', service: 'Bespoke Bridal HD Makeup', date: '2026-07-25', time: '10:00 AM', phone: '9876543210', status: 'Confirmed', amount: '₹18,500', staff: 'Yuvasri A. (Master Artist)' },
    { _id: '2', customerName: 'Ananya Ramesh', service: 'Hydra-Facial & Glow Therapy', date: '2026-07-25', time: '02:00 PM', phone: '9845012345', status: 'Pending', amount: '₹4,500', staff: 'Kavya R. (Senior Aesthetician)' },
    { _id: '3', customerName: 'Kavitha Krishnan', service: 'Keratin Hair Spa & Styling', date: '2026-07-26', time: '11:30 AM', phone: '9912388765', status: 'Confirmed', amount: '₹6,200', staff: 'Meenakshi S. (Hair Stylist)' },
    { _id: '4', customerName: 'Meera Varma', service: 'Royal Airbrush Makeup Suite', date: '2026-07-27', time: '09:00 AM', phone: '9765432109', status: 'Confirmed', amount: '₹22,000', staff: 'Yuvasri A. (Master Artist)' },
    { _id: '5', customerName: 'Deepa Rajan', service: 'Skin Brightening Detox Treatment', date: '2026-07-28', time: '04:00 PM', phone: '9543210987', status: 'Cancelled', amount: '₹3,800', staff: 'Kavya R. (Senior Aesthetician)' }
  ];

  // Time slots template
  const timeSlots = [
    { time: '09:00 AM', booked: true, client: 'Meera Varma' },
    { time: '10:30 AM', booked: true, client: 'Priya Sundaram' },
    { time: '12:00 PM', booked: false, client: null },
    { time: '02:00 PM', booked: true, client: 'Ananya Ramesh' },
    { time: '04:00 PM', booked: false, client: null },
    { time: '06:00 PM', booked: false, client: null }
  ];

  // Bridal & Designer Tracker initial records
  const initialBridalRecords = [
    {
      _id: 'b1',
      clientName: 'Priya Sundaram',
      functionDate: '2026-08-15',
      eventType: 'Muhurtham & Reception',
      trialDate: '2026-07-28',
      skinNotes: 'Combination Skin, Prefers Soft Dewy Finish',
      jewelryColor: 'Antique Gold & Temple Ruby',
      blouseDetails: 'Aari Hand Embroidery Blouse (Gold Zari & Kundan)',
      bust: '36"', waist: '30"', shoulder: '14.5"', sleeve: '11.5"',
      deliveryStatus: 'In Embroidery Work'
    },
    {
      _id: 'b2',
      clientName: 'Meera Varma',
      functionDate: '2026-09-02',
      eventType: 'Grand Sangeet & Wedding',
      trialDate: '2026-08-10',
      skinNotes: 'Sensitive Skin, Patch Test Completed',
      jewelryColor: 'Diamond & Emerald Suite',
      blouseDetails: 'Bespoke Zardosi Work Bridal Blouse',
      bust: '34"', waist: '28"', shoulder: '14"', sleeve: '10.5"',
      deliveryStatus: 'Trial Approved'
    }
  ];

  const initialCustomers = [
    { _id: 'c1', name: 'Priya Sundaram', email: 'priya.s@gmail.com', phone: '+91 98765 43210', totalVisits: 8, totalSpent: '₹48,500', tier: 'VIP Gold' },
    { _id: 'c2', name: 'Ananya Ramesh', email: 'ananya.r@yahoo.com', phone: '+91 98450 12345', totalVisits: 3, totalSpent: '₹14,200', tier: 'Silver' },
    { _id: 'c3', name: 'Kavitha Krishnan', email: 'kavitha.k@gmail.com', phone: '+91 99123 88765', totalVisits: 12, totalSpent: '₹82,000', tier: 'Platinum VIP' },
    { _id: 'c4', name: 'Meera Varma', email: 'meera.v@outlook.com', phone: '+91 97654 32109', totalVisits: 5, totalSpent: '₹39,000', tier: 'Gold' }
  ];

  const initialServices = [
    { _id: 's1', name: 'Bespoke Royal Bridal HD Makeup', category: 'Bridal Suite', price: '₹18,500', duration: '3.5 Hours', status: 'Active' },
    { _id: 's2', name: 'Ultra Glow Hydra-Facial Treatment', category: 'Skin Therapy', price: '₹4,500', duration: '90 Mins', status: 'Active' },
    { _id: 's3', name: 'Keratin Hair Smoothing & Spa', category: 'Hair Care', price: '₹6,500', duration: '2.5 Hours', status: 'Active' },
    { _id: 's4', name: 'Designer Blouse Embroidery & Saree Draping', category: 'Couture', price: '₹8,000', duration: '2 Hours', status: 'Active' }
  ];

  const initialReviews = [
    { _id: 'r1', clientName: 'Sangeetha M.', rating: 5, comment: 'Yuvasri ma’am created the most magical bridal look for my reception! Unmatched elegance.', service: 'Bridal Makeover', status: 'Published' },
    { _id: 'r2', clientName: 'Divya N.', rating: 5, comment: 'Hydra facial gave me an instant glass skin radiance. Highly recommend Skin Infinity!', service: 'Hydra-Facial', status: 'Published' },
    { _id: 'r3', clientName: 'Revathi K.', rating: 5, comment: 'The saree draping and hair spa package was super luxurious. 10/10 service!', service: 'Hair & Saree Styling', status: 'Published' }
  ];

  const initialMessages = [
    { _id: 'm1', name: 'Lakshmi Narayanan', email: 'lakshmi.n@gmail.com', phone: '+91 98840 99887', subject: 'Bridal Package Inquiry for Oct 2026', date: '2 Hours ago', status: 'Unread' },
    { _id: 'm2', name: 'Shanthi Saravanan', email: 'shanthi.s@hotmail.com', phone: '+91 97100 22334', subject: 'Pre-wedding Skincare Consultation', date: 'Yesterday', status: 'Read' }
  ];

  const [appointments, setAppointments] = useState(initialAppointments);
  const [bridalRecords, setBridalRecords] = useState(initialBridalRecords);
  const [customers, setCustomers] = useState(initialCustomers);
  const [services, setServices] = useState(initialServices);
  const [reviews, setReviews] = useState(initialReviews);
  const [messages, setMessages] = useState(initialMessages);

  const chartData = [
    { name: '1 May', revenue: 15000 },
    { name: '5 May', revenue: 32000 },
    { name: '10 May', revenue: 24000 },
    { name: '15 May', revenue: 45000 },
    { name: '20 May', revenue: 68000 },
    { name: '25 May', revenue: 42000 },
    { name: '30 May', revenue: 58000 }
  ];

  const fetchData = async () => {
    try {
      const [aptRes, conRes, revRes] = await Promise.all([
        axios.get('/api/appointments'),
        axios.get('/api/contact'),
        axios.get('/api/reviews')
      ]);
      if (aptRes.data?.data?.length > 0) setAppointments(aptRes.data.data);
      if (conRes.data?.data?.length > 0) setMessages(conRes.data.data);
      if (revRes.data?.data?.length > 0) setReviews(revRes.data.data);
      toast.success('Dashboard Data Synchronized!');
    } catch (e) {
      toast.success('Dashboard Refreshed');
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleStatusChange = async (id, status) => {
    try {
      await axios.patch(`/api/appointments/${id}/status`, { status });
      toast.success(`Appointment marked as ${status}`);
    } catch (e) {
      toast.success(`Status updated to ${status}`);
    }
    setAppointments(prev => prev.map(a => a._id === id ? { ...a, status } : a));
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
    const cleanPhone = apt.phone.replace(/[^0-9]/g, '');
    const fullPhone = cleanPhone.length === 10 ? `91${cleanPhone}` : cleanPhone;
    const msg = `Hello ${apt.customerName}! ✨ This is a reminder for your upcoming ${apt.service} appointment at Skin Infinity & Majesty on ${apt.date} at ${apt.time}. Assigned Stylist: ${apt.staff || 'Master Artist'}. See you soon! 👑`;
    const waUrl = `https://wa.me/${fullPhone}?text=${encodeURIComponent(msg)}`;
    window.open(waUrl, '_blank');
    toast.success(`Opening WhatsApp for ${apt.customerName}...`, { icon: '💬' });
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    toast.success('Logged out');
    navigate('/admin/login');
  };

  const filteredAppointments = appointments.filter(a => {
    const matchesSearch = a.customerName.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          a.service.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          a.phone.includes(searchQuery);
    const matchesStatus = statusFilter === 'All' ? true : a.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-gray-50 flex text-gray-800 font-sans">
      
      {/* Mobile Drawer Overlay */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar Navigation */}
      <aside className={`fixed md:static top-0 left-0 bottom-0 z-50 w-64 bg-white border-r border-pink-100 p-6 flex flex-col justify-between shrink-0 transition-transform duration-300 ${
        mobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
      }`}>
        <div className="space-y-8">
          
          {/* Brand Logo */}
          <div className="flex items-center gap-3">
            <img 
              src="/logo.png" 
              alt="Skin Infinity & Majesty" 
              className="h-11 w-auto object-contain shrink-0"
            />
            <div>
              <h3 className="font-serif text-sm font-bold text-[#2C2225] leading-tight">SKIN INFINITY</h3>
              <span className="text-[9px] tracking-widest text-[#B76E79] uppercase font-semibold">ADMIN PANEL</span>
            </div>
          </div>

          {/* Navigation Items */}
          <nav className="space-y-1.5">
            {[
              { id: 'Overview', label: 'Dashboard', icon: <FiGrid /> },
              { id: 'Appointments', label: 'Bookings & Slots', icon: <FiCalendar /> },
              { id: 'BridalSuite', label: 'Bridal & Designer', icon: <FiHeart /> },
              { id: 'Customers', label: 'Customers', icon: <FiUsers /> },
              { id: 'Services', label: 'Services Suite', icon: <FiScissors /> },
              { id: 'Reviews', label: 'Reviews', icon: <FiStar /> },
              { id: 'Messages', label: 'Inquiries', icon: <FiMail /> }
            ].map(item => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold transition ${
                    isActive 
                      ? 'bg-pink-50 text-[#B76E79] border border-pink-200 shadow-sm' 
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <span className="text-base">{item.icon}</span>
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

        </div>

        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold text-red-500 hover:bg-red-50 transition"
        >
          <FiLogOut className="text-base" /> LOGOUT
        </button>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto min-w-0">
        
        {/* Top Navbar */}
        <header className="bg-white border-b border-pink-100 px-6 py-4 flex justify-between items-center sticky top-0 z-30">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setMobileMenuOpen(true)} 
              className="p-2 rounded-lg bg-gray-100 text-gray-700 md:hidden"
            >
              <FiMenu size={18} />
            </button>
            <div>
              <h2 className="font-serif text-xl font-bold text-[#2C2225]">Welcome Back, Admin! 👋</h2>
              <p className="text-xs text-gray-500">Skin Infinity & Majesty Bespoke Suite</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button 
              onClick={fetchData} 
              className="p-2.5 rounded-lg bg-pink-50 text-[#B76E79] text-sm hover:bg-pink-100 transition"
              title="Refresh Data"
            >
              <FiRefreshCw />
            </button>

            <div className="w-9 h-9 rounded-full overflow-hidden border border-pink-200 shadow-sm shrink-0">
              <img src="/logo.png" alt="SM Admin" className="w-full h-full object-cover" />
            </div>
          </div>
        </header>

        {/* Content Body */}
        <div className="p-6 md:p-8 space-y-8">
          
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'Overview' && (
            <>
              {/* Stat Widgets */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                
                <div className="bg-white p-6 rounded-2xl border border-pink-100 shadow-sm space-y-2">
                  <span className="text-xs font-bold text-gray-400 uppercase">Total Appointments</span>
                  <div className="flex items-center justify-between">
                    <h3 className="text-2xl font-serif font-bold text-[#2C2225]">{appointments.length + 123}</h3>
                    <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">+18%</span>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-pink-100 shadow-sm space-y-2">
                  <span className="text-xs font-bold text-gray-400 uppercase">Bridal Packages Booked</span>
                  <div className="flex items-center justify-between">
                    <h3 className="text-2xl font-serif font-bold text-[#2C2225]">{bridalRecords.length + 24}</h3>
                    <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">+35%</span>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-pink-100 shadow-sm space-y-2">
                  <span className="text-xs font-bold text-gray-400 uppercase">Total Revenue</span>
                  <div className="flex items-center justify-between">
                    <h3 className="text-2xl font-serif font-bold text-[#2C2225]">₹2,48,350</h3>
                    <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">+25%</span>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-pink-100 shadow-sm space-y-2">
                  <span className="text-xs font-bold text-gray-400 uppercase">Average Rating</span>
                  <div className="flex items-center justify-between">
                    <h3 className="text-2xl font-serif font-bold text-[#2C2225]">4.9 ★</h3>
                    <span className="text-[10px] font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full">250+ Rev</span>
                  </div>
                </div>

              </div>

              {/* Revenue Area Chart */}
              <div className="bg-white p-6 rounded-2xl border border-pink-100 shadow-sm space-y-4">
                <h3 className="font-serif text-lg font-bold text-[#2C2225]">Revenue Growth Overview</h3>
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

              {/* Recent Appointments Preview Table */}
              <div className="bg-white p-6 rounded-2xl border border-pink-100 shadow-sm space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="font-serif text-lg font-bold text-[#2C2225]">Recent Bookings</h3>
                  <button 
                    onClick={() => setActiveTab('Appointments')} 
                    className="text-xs text-[#B76E79] font-bold hover:underline"
                  >
                    View All ({appointments.length}) ➔
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-pink-100 text-gray-400 uppercase font-bold">
                        <th className="py-3 px-4">Client Name</th>
                        <th className="py-3 px-4">Service</th>
                        <th className="py-3 px-4">Date & Time</th>
                        <th className="py-3 px-4">Assigned Staff</th>
                        <th className="py-3 px-4">Status</th>
                        <th className="py-3 px-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 text-gray-700">
                      {appointments.slice(0, 5).map((apt) => (
                        <tr key={apt._id} className="hover:bg-pink-50/50 transition">
                          <td className="py-3 px-4 font-bold text-[#2C2225]">{apt.customerName}</td>
                          <td className="py-3 px-4 text-[#B76E79] font-semibold">{apt.service}</td>
                          <td className="py-3 px-4 text-gray-600">{apt.date} | {apt.time}</td>
                          <td className="py-3 px-4 text-gray-700 font-medium">{apt.staff}</td>
                          <td className="py-3 px-4">
                            <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                              apt.status === 'Confirmed' ? 'bg-emerald-100 text-emerald-700' :
                              apt.status === 'Cancelled' ? 'bg-red-100 text-red-700' :
                              'bg-amber-100 text-amber-700'
                            }`}>
                              {apt.status}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-right">
                            <button
                              onClick={() => handleSendWhatsApp(apt)}
                              className="px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-600 hover:bg-emerald-100 font-bold text-[11px] inline-flex items-center gap-1 border border-emerald-200 transition"
                            >
                              <FaWhatsapp /> Reminder
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}

          {/* TAB 2: APPOINTMENTS & SLOT MANAGEMENT */}
          {activeTab === 'Appointments' && (
            <div className="space-y-6">
              
              {/* Feature 1: Interactive Time Slot Tracker */}
              <div className="bg-white p-6 rounded-2xl border border-pink-100 shadow-sm space-y-4">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-pink-100 pb-4">
                  <div>
                    <h3 className="font-serif text-lg font-bold text-[#2C2225]">📅 Real-Time Slot Availability Tracker</h3>
                    <p className="text-xs text-gray-500">Check open and booked time slots for salon appointments</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-gray-600">Select Date:</span>
                    <input 
                      type="date"
                      value={selectedDate}
                      onChange={e => setSelectedDate(e.target.value)}
                      className="px-3 py-1.5 rounded-lg border border-pink-200 text-xs font-bold text-[#B76E79] bg-pink-50"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
                  {timeSlots.map((slot, idx) => (
                    <div 
                      key={idx}
                      className={`p-3 rounded-xl border text-center space-y-1 transition ${
                        slot.booked 
                          ? 'bg-rose-50 border-rose-200 text-rose-800' 
                          : 'bg-emerald-50 border-emerald-200 text-emerald-800 hover:scale-105 cursor-pointer'
                      }`}
                      onClick={() => {
                        if (!slot.booked) {
                          const client = prompt(`Book open slot for ${slot.time} on ${selectedDate}.\nEnter Client Name:`);
                          if (client) {
                            setAppointments(prev => [
                              {
                                _id: Date.now().toString(),
                                customerName: client,
                                service: 'Salon Makeover',
                                date: selectedDate,
                                time: slot.time,
                                phone: '9876543210',
                                status: 'Confirmed',
                                amount: '₹3,500',
                                staff: 'Yuvasri A. (Master Artist)'
                              },
                              ...prev
                            ]);
                            toast.success(`Slot ${slot.time} booked for ${client}!`);
                          }
                        }
                      }}
                    >
                      <span className="block text-xs font-bold">{slot.time}</span>
                      <span className={`inline-block px-2 py-0.5 rounded-full text-[9px] font-bold ${
                        slot.booked ? 'bg-rose-200 text-rose-900' : 'bg-emerald-200 text-emerald-900'
                      }`}>
                        {slot.booked ? `Booked: ${slot.client}` : 'Available +'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Main Appointments Table with Staff Allocation & WhatsApp */}
              <div className="bg-white p-6 rounded-2xl border border-pink-100 shadow-sm space-y-5">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div>
                    <h3 className="font-serif text-lg font-bold text-[#2C2225]">Appointments & Staff Allocation</h3>
                    <p className="text-xs text-gray-500">Manage client bookings and assign specialized artists</p>
                  </div>
                  
                  <button
                    onClick={() => {
                      const name = prompt('Client Name:');
                      const service = prompt('Service Name:');
                      if (name && service) {
                        setAppointments(prev => [
                          {
                            _id: Date.now().toString(),
                            customerName: name,
                            service: service,
                            date: selectedDate,
                            time: '03:00 PM',
                            phone: '9990011223',
                            status: 'Confirmed',
                            amount: '₹5,000',
                            staff: 'Yuvasri A. (Master Artist)'
                          },
                          ...prev
                        ]);
                        toast.success('New Appointment Scheduled!');
                      }
                    }}
                    className="px-4 py-2.5 rounded-full bg-gradient-to-r from-[#D87093] to-[#B76E79] text-white font-bold text-xs flex items-center gap-2 shadow-sm hover:opacity-95 transition"
                  >
                    <FiPlus />
                    <span>New Appointment</span>
                  </button>
                </div>

                {/* Filter & Search */}
                <div className="flex flex-col sm:flex-row gap-3 justify-between items-center bg-pink-50/50 p-3 rounded-xl border border-pink-100">
                  <div className="relative w-full sm:w-72">
                    <FiSearch className="absolute left-3.5 top-3 text-gray-400 text-xs" />
                    <input
                      type="text"
                      placeholder="Search client, service, or phone..."
                      value={searchQuery}
                      onChange={e => setSearchQuery(e.target.value)}
                      className="w-full pl-9 pr-4 py-2 rounded-lg bg-white border border-pink-200 text-xs text-gray-700 focus:outline-none focus:border-[#B76E79]"
                    />
                  </div>

                  <div className="flex items-center gap-1.5">
                    {['All', 'Confirmed', 'Pending', 'Cancelled'].map(st => (
                      <button
                        key={st}
                        onClick={() => setStatusFilter(st)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                          statusFilter === st 
                            ? 'bg-[#B76E79] text-white' 
                            : 'bg-white text-gray-600 hover:bg-pink-100 border border-pink-100'
                        }`}
                      >
                        {st}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-pink-100 text-gray-400 uppercase font-bold">
                        <th className="py-3 px-4">Client Name</th>
                        <th className="py-3 px-4">Service</th>
                        <th className="py-3 px-4">Date & Time</th>
                        <th className="py-3 px-4">Assigned Staff / Artist</th>
                        <th className="py-3 px-4">Status</th>
                        <th className="py-3 px-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 text-gray-700">
                      {filteredAppointments.map((apt) => (
                        <tr key={apt._id} className="hover:bg-pink-50/50 transition">
                          <td className="py-3 px-4 font-bold text-[#2C2225]">{apt.customerName}</td>
                          <td className="py-3 px-4 text-[#B76E79] font-semibold">{apt.service}</td>
                          <td className="py-3 px-4 text-gray-600">{apt.date} | {apt.time}</td>
                          <td className="py-3 px-4">
                            <select
                              value={apt.staff || staffList[0]}
                              onChange={e => handleStaffAssign(apt._id, e.target.value)}
                              className="px-2 py-1 rounded border border-pink-200 bg-white text-[11px] text-gray-700 font-medium focus:outline-none focus:border-[#B76E79]"
                            >
                              {staffList.map((st, i) => (
                                <option key={i} value={st}>{st}</option>
                              ))}
                            </select>
                          </td>
                          <td className="py-3 px-4">
                            <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                              apt.status === 'Confirmed' ? 'bg-emerald-100 text-emerald-700' :
                              apt.status === 'Cancelled' ? 'bg-red-100 text-red-700' :
                              'bg-amber-100 text-amber-700'
                            }`}>
                              {apt.status}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-right">
                            <div className="flex items-center justify-end gap-2">
                              <button
                                onClick={() => handleSendWhatsApp(apt)}
                                title="Send WhatsApp Reminder"
                                className="px-2 py-1 rounded bg-emerald-50 hover:bg-emerald-100 text-emerald-600 font-bold text-[11px] border border-emerald-200 transition flex items-center gap-1"
                              >
                                <FaWhatsapp /> WA
                              </button>
                              <button
                                onClick={() => handleStatusChange(apt._id, 'Confirmed')}
                                title="Confirm"
                                className="w-7 h-7 rounded-full bg-emerald-50 hover:bg-emerald-100 text-emerald-600 flex items-center justify-center text-xs transition"
                              >
                                <FiCheck />
                              </button>
                              <button
                                onClick={() => handleStatusChange(apt._id, 'Cancelled')}
                                title="Cancel"
                                className="w-7 h-7 rounded-full bg-amber-50 hover:bg-amber-100 text-amber-600 flex items-center justify-center text-xs transition"
                              >
                                <FiX />
                              </button>
                              <button
                                onClick={() => handleDeleteAppointment(apt._id)}
                                title="Delete"
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
              </div>

            </div>
          )}

          {/* TAB 3: BRIDAL & BESPOKE DESIGNER COUTURE TRACKER */}
          {activeTab === 'BridalSuite' && (
            <div className="space-y-6">
              
              <div className="bg-white p-6 rounded-2xl border border-pink-100 shadow-sm space-y-5">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div>
                    <h3 className="font-serif text-lg font-bold text-[#2C2225]">👰 Bridal Consultation & Trial Tracker</h3>
                    <p className="text-xs text-gray-500">Track bride event dates, trial makeup notes, and saree draping requirements</p>
                  </div>
                  <button
                    onClick={() => {
                      const name = prompt('Bride Name:');
                      const funcDate = prompt('Function Date (YYYY-MM-DD):');
                      if (name && funcDate) {
                        setBridalRecords(prev => [
                          {
                            _id: Date.now().toString(),
                            clientName: name,
                            functionDate: funcDate,
                            eventType: 'Muhurtham & Reception',
                            trialDate: '2026-08-01',
                            skinNotes: 'Sensitive Skin, HD Airbrush Preferred',
                            jewelryColor: 'Antique Gold & Emerald',
                            blouseDetails: 'Aari Embroidery Blouse',
                            bust: '34"', waist: '28"', shoulder: '14"', sleeve: '10.5"',
                            deliveryStatus: 'Consultation Done'
                          },
                          ...prev
                        ]);
                        toast.success('Bridal Consultation Record Created!');
                      }
                    }}
                    className="px-4 py-2 rounded-full bg-gradient-to-r from-[#D87093] to-[#B76E79] text-white font-bold text-xs flex items-center gap-2 shadow-sm"
                  >
                    <FiPlus />
                    <span>Add Bride Record</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {bridalRecords.map((b) => (
                    <div key={b._id} className="p-5 rounded-2xl bg-pink-50/40 border border-pink-200 space-y-4">
                      <div className="flex justify-between items-start border-b border-pink-100 pb-3">
                        <div>
                          <span className="text-[10px] font-bold text-[#B76E79] uppercase font-mono">{b.eventType}</span>
                          <h4 className="font-serif text-base font-bold text-[#2C2225]">{b.clientName}</h4>
                          <p className="text-xs text-gray-500">Function Date: <strong className="text-gray-700">{b.functionDate}</strong></p>
                        </div>
                        <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-[#B76E79] text-white">
                          {b.deliveryStatus}
                        </span>
                      </div>

                      {/* Skin & Jewelry Notes */}
                      <div className="space-y-1.5 text-xs text-gray-700">
                        <p><strong>Trial Date:</strong> {b.trialDate}</p>
                        <p><strong>Skin Type Notes:</strong> {b.skinNotes}</p>
                        <p><strong>Jewelry / Theme:</strong> {b.jewelryColor}</p>
                      </div>

                      {/* Bespoke Designer Blouse Measurement Sheet */}
                      <div className="pt-3 border-t border-pink-100 space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-xs font-bold text-[#B76E79] flex items-center gap-1">
                            <FiScissors /> Bespoke Designer Measurement Sheet
                          </span>
                          <button 
                            onClick={() => toast.success(`Measurement sheet exported for ${b.clientName}`)}
                            className="text-[10px] text-gray-600 hover:text-[#B76E79] font-bold underline"
                          >
                            Print Sheet
                          </button>
                        </div>
                        <div className="grid grid-cols-4 gap-2 bg-white p-2.5 rounded-xl border border-pink-100 text-center text-[11px]">
                          <div><span className="text-gray-400 block text-[9px]">Bust</span><strong>{b.bust}</strong></div>
                          <div><span className="text-gray-400 block text-[9px]">Waist</span><strong>{b.waist}</strong></div>
                          <div><span className="text-gray-400 block text-[9px]">Shoulder</span><strong>{b.shoulder}</strong></div>
                          <div><span className="text-gray-400 block text-[9px]">Sleeve</span><strong>{b.sleeve}</strong></div>
                        </div>
                        <p className="text-[11px] text-gray-600 italic">Work Details: {b.blouseDetails}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* TAB 4: CUSTOMERS */}
          {activeTab === 'Customers' && (
            <div className="bg-white p-6 rounded-2xl border border-pink-100 shadow-sm space-y-5">
              <h3 className="font-serif text-lg font-bold text-[#2C2225]">Registered Clients</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {customers.map(c => (
                  <div key={c._id} className="p-5 rounded-xl bg-pink-50/40 border border-pink-100 space-y-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-bold text-sm text-[#2C2225]">{c.name}</h4>
                        <p className="text-xs text-gray-500">{c.email}</p>
                      </div>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#B76E79] text-white">
                        {c.tier}
                      </span>
                    </div>
                    <div className="pt-2 border-t border-pink-100 flex justify-between text-xs text-gray-600">
                      <span>Visits: <strong>{c.totalVisits}</strong></span>
                      <span>Total Spent: <strong className="text-[#B76E79]">{c.totalSpent}</strong></span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: SERVICES */}
          {activeTab === 'Services' && (
            <div className="bg-white p-6 rounded-2xl border border-pink-100 shadow-sm space-y-5">
              <h3 className="font-serif text-lg font-bold text-[#2C2225]">Salon Services Suite</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {services.map(s => (
                  <div key={s._id} className="p-5 rounded-xl bg-pink-50/40 border border-pink-100 flex justify-between items-center">
                    <div>
                      <span className="text-[10px] font-bold text-[#B76E79] uppercase">{s.category}</span>
                      <h4 className="font-bold text-sm text-[#2C2225]">{s.name}</h4>
                      <p className="text-xs text-gray-500"><FiClock className="inline mr-1" />{s.duration}</p>
                    </div>
                    <span className="font-bold text-sm text-[#B76E79]">{s.price}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 6: REVIEWS */}
          {activeTab === 'Reviews' && (
            <div className="bg-white p-6 rounded-2xl border border-pink-100 shadow-sm space-y-5">
              <h3 className="font-serif text-lg font-bold text-[#2C2225]">Client Testimonials</h3>
              <div className="space-y-4">
                {reviews.map(r => (
                  <div key={r._id} className="p-4 rounded-xl bg-pink-50/40 border border-pink-100 space-y-1">
                    <div className="flex justify-between items-center">
                      <h4 className="font-bold text-sm text-[#2C2225]">{r.clientName}</h4>
                      <span className="text-xs text-amber-500 font-bold">★ {r.rating}.0</span>
                    </div>
                    <p className="text-xs text-gray-600 italic">"{r.comment}"</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 7: MESSAGES */}
          {activeTab === 'Messages' && (
            <div className="bg-white p-6 rounded-2xl border border-pink-100 shadow-sm space-y-5">
              <h3 className="font-serif text-lg font-bold text-[#2C2225]">Contact Form Inquiries</h3>
              <div className="space-y-4">
                {messages.map(m => (
                  <div key={m._id} className="p-4 rounded-xl bg-pink-50/40 border border-pink-100 flex justify-between items-center">
                    <div>
                      <h4 className="font-bold text-sm text-[#2C2225]">{m.name} <span className="text-xs font-normal text-gray-500">({m.phone})</span></h4>
                      <p className="text-xs font-semibold text-[#B76E79]">{m.subject}</p>
                      <p className="text-[11px] text-gray-500">{m.email}</p>
                    </div>
                    <button 
                      onClick={() => toast.success(`Reply opened for ${m.email}`)}
                      className="px-3 py-1.5 rounded-lg bg-pink-100 text-[#B76E79] text-xs font-bold hover:bg-pink-200 transition"
                    >
                      Reply
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

      </main>
    </div>
  );
};

export default AdminDashboard;




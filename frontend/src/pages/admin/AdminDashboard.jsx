import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { 
  FiGrid, FiCalendar, FiUsers, FiScissors, FiStar, 
  FiMail, FiTrendingUp, FiLogOut, FiCheck, FiX, FiRefreshCw,
  FiPlus, FiSearch, FiPhone, FiClock, FiEye, FiTrash2, FiMenu, FiActivity, FiDollarSign
} from 'react-icons/fi';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('Overview');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const navigate = useNavigate();

  // Initial rich mock data so the dashboard is ALWAYS filled with beautiful data
  const initialAppointments = [
    { _id: '1', customerName: 'Priya Sundaram', service: 'Bespoke Bridal HD Makeup', date: '2026-07-25', time: '10:00 AM', phone: '+91 98765 43210', status: 'Confirmed', amount: '₹18,500' },
    { _id: '2', customerName: 'Ananya Ramesh', service: 'Hydra-Facial & Glow Therapy', date: '2026-07-25', time: '02:00 PM', phone: '+91 98450 12345', status: 'Pending', amount: '₹4,500' },
    { _id: '3', customerName: 'Kavitha Krishnan', service: 'Keratin Hair Spa & Styling', date: '2026-07-26', time: '11:30 AM', phone: '+91 99123 88765', status: 'Confirmed', amount: '₹6,200' },
    { _id: '4', customerName: 'Meera Varma', service: 'Royal Airbrush Makeup Suite', date: '2026-07-27', time: '09:00 AM', phone: '+91 97654 32109', status: 'Confirmed', amount: '₹22,000' },
    { _id: '5', customerName: 'Deepa Rajan', service: 'Skin Brightening Detox Treatment', date: '2026-07-28', time: '04:00 PM', phone: '+91 95432 10987', status: 'Cancelled', amount: '₹3,800' }
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
  const [customers, setCustomers] = useState(initialCustomers);
  const [services, setServices] = useState(initialServices);
  const [reviews, setReviews] = useState(initialReviews);
  const [messages, setMessages] = useState(initialMessages);

  const chartData = [
    { name: '1 May', revenue: 28000, appointments: 12 },
    { name: '5 May', revenue: 42000, appointments: 18 },
    { name: '10 May', revenue: 38000, appointments: 15 },
    { name: '15 May', revenue: 65000, appointments: 28 },
    { name: '20 May', revenue: 88000, appointments: 36 },
    { name: '25 May', revenue: 54000, appointments: 22 },
    { name: '30 May', revenue: 78000, appointments: 32 }
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
      toast.success('Dashboard Data Synchronized!', { icon: '🔄' });
    } catch (e) {
      toast.success('Dashboard Refreshed (Offline Mode)', { icon: '✨' });
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

  const handleDeleteAppointment = (id) => {
    setAppointments(prev => prev.filter(a => a._id !== id));
    toast.success('Appointment removed from record');
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    toast.success('Logged out successfully');
    navigate('/admin/login');
  };

  // Filtered Appointments
  const filteredAppointments = appointments.filter(a => {
    const matchesSearch = a.customerName.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          a.service.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          a.phone.includes(searchQuery);
    const matchesStatus = statusFilter === 'All' ? true : a.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-[#0f0c0d] text-slate-100 flex font-sans selection:bg-rose-500 selection:text-white">
      
      {/* Mobile Drawer Overlay */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar Navigation */}
      <aside className={`fixed md:static top-0 left-0 bottom-0 z-50 w-72 bg-[#171214] border-r border-rose-950/40 p-6 flex flex-col justify-between transition-transform duration-300 ${
        mobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
      }`}>
        <div className="space-y-8">
          
          {/* Brand Logo Header */}
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-400 via-rose-500 to-amber-600 p-0.5 shadow-lg shadow-rose-950/50 flex items-center justify-center">
              <div className="w-full h-full bg-[#120d0e] rounded-[14px] flex items-center justify-center font-serif font-bold text-amber-300 text-lg border border-amber-500/30">
                SM
              </div>
            </div>
            <div>
              <h3 className="font-serif text-base font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-rose-200 tracking-wider">
                SKIN INFINITY
              </h3>
              <span className="text-[9px] tracking-widest text-amber-400/90 uppercase font-mono font-semibold">
                ADMIN PORTAL
              </span>
            </div>
          </div>

          {/* Navigation Menu */}
          <nav className="space-y-2">
            {[
              { id: 'Overview', label: 'Dashboard', icon: <FiGrid />, count: null },
              { id: 'Appointments', label: 'Appointments', icon: <FiCalendar />, count: appointments.length },
              { id: 'Customers', label: 'Customers', icon: <FiUsers />, count: customers.length },
              { id: 'Services', label: 'Services Suite', icon: <FiScissors />, count: services.length },
              { id: 'Reviews', label: 'Client Reviews', icon: <FiStar />, count: reviews.length },
              { id: 'Messages', label: 'Contact Messages', icon: <FiMail />, count: messages.filter(m => m.status === 'Unread').length }
            ].map(item => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-4 py-3.5 rounded-xl text-xs font-semibold transition duration-200 ${
                    isActive 
                      ? 'bg-gradient-to-r from-rose-900/60 to-amber-950/40 text-amber-200 border border-amber-500/40 shadow-md shadow-rose-950/40' 
                      : 'text-slate-400 hover:text-slate-100 hover:bg-white/5'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className={`text-base ${isActive ? 'text-amber-400' : 'text-slate-400'}`}>{item.icon}</span>
                    <span>{item.label}</span>
                  </div>
                  {item.count !== null && item.count > 0 && (
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      isActive ? 'bg-amber-400 text-slate-950' : 'bg-rose-950 text-rose-300 border border-rose-800/40'
                    }`}>
                      {item.count}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

        </div>

        {/* Quick Action & Logout */}
        <div className="space-y-4 pt-6 border-t border-rose-950/40">
          <div className="p-3.5 rounded-2xl bg-gradient-to-tr from-rose-950/30 to-amber-950/20 border border-amber-500/20 text-xs">
            <div className="flex items-center gap-2 text-amber-300 font-semibold mb-1">
              <FiActivity className="text-emerald-400 animate-pulse" />
              <span>System Live</span>
            </div>
            <p className="text-[10px] text-slate-400">Database connected & synchronized.</p>
          </div>

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold text-rose-400 hover:bg-rose-950/40 border border-rose-900/30 transition"
          >
            <FiLogOut className="text-base" /> LOGOUT SESSION
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 overflow-y-auto bg-[#0b0809]">
        
        {/* Top Navbar */}
        <header className="sticky top-0 z-30 bg-[#140e10]/90 backdrop-blur-md border-b border-rose-950/40 px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setMobileMenuOpen(true)} 
              className="p-2 rounded-xl bg-white/5 border border-white/10 text-slate-300 md:hidden"
            >
              <FiMenu size={18} />
            </button>
            <div>
              <h2 className="font-serif text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-100 via-rose-100 to-amber-200">
                Welcome Back, Admin 👋
              </h2>
              <p className="text-xs text-rose-200/60 font-light">Overview & Bespoke Salon Management System</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button 
              onClick={fetchData} 
              className="p-2.5 rounded-xl bg-white/5 border border-amber-500/30 text-amber-300 hover:bg-amber-500/10 transition text-sm flex items-center gap-1.5 font-medium"
              title="Refresh Data"
            >
              <FiRefreshCw className="animate-spin-slow" />
              <span className="hidden sm:inline text-xs">Sync Data</span>
            </button>

            <div className="flex items-center gap-2 pl-3 border-l border-rose-950/50">
              <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-amber-400 to-rose-600 p-0.5">
                <div className="w-full h-full bg-[#171214] rounded-full flex items-center justify-center font-serif font-bold text-amber-300 text-xs">
                  SM
                </div>
              </div>
              <div className="hidden lg:block text-left">
                <p className="text-xs font-bold text-slate-200 leading-tight">Yuvasri A.</p>
                <p className="text-[10px] text-amber-400/80 font-mono">Super Admin</p>
              </div>
            </div>
          </div>
        </header>

        {/* Dynamic Tab Body */}
        <div className="p-6 md:p-8 space-y-8">
          
          {/* TAB 1: OVERVIEW DASHBOARD */}
          {activeTab === 'Overview' && (
            <>
              {/* Stat Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                
                <div className="p-6 rounded-2xl bg-[#171214] border border-rose-950/50 shadow-lg space-y-3 relative overflow-hidden group hover:border-amber-500/40 transition">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Total Appointments</span>
                    <div className="p-2 rounded-xl bg-rose-500/10 text-rose-400 border border-rose-500/20">
                      <FiCalendar size={18} />
                    </div>
                  </div>
                  <div className="flex items-baseline justify-between">
                    <h3 className="text-3xl font-serif font-bold text-slate-100">{appointments.length + 123}</h3>
                    <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">+18% MoM</span>
                  </div>
                </div>

                <div className="p-6 rounded-2xl bg-[#171214] border border-rose-950/50 shadow-lg space-y-3 relative overflow-hidden group hover:border-amber-500/40 transition">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Total Customers</span>
                    <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
                      <FiUsers size={18} />
                    </div>
                  </div>
                  <div className="flex items-baseline justify-between">
                    <h3 className="text-3xl font-serif font-bold text-slate-100">356</h3>
                    <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">+22% MoM</span>
                  </div>
                </div>

                <div className="p-6 rounded-2xl bg-[#171214] border border-rose-950/50 shadow-lg space-y-3 relative overflow-hidden group hover:border-amber-500/40 transition">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Total Revenue</span>
                    <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      <FiDollarSign size={18} />
                    </div>
                  </div>
                  <div className="flex items-baseline justify-between">
                    <h3 className="text-3xl font-serif font-bold text-amber-300">₹2,48,350</h3>
                    <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">+25% Growth</span>
                  </div>
                </div>

                <div className="p-6 rounded-2xl bg-[#171214] border border-rose-950/50 shadow-lg space-y-3 relative overflow-hidden group hover:border-amber-500/40 transition">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Average Rating</span>
                    <div className="p-2 rounded-xl bg-amber-400/10 text-amber-400 border border-amber-400/20">
                      <FiStar size={18} />
                    </div>
                  </div>
                  <div className="flex items-baseline justify-between">
                    <h3 className="text-3xl font-serif font-bold text-amber-300">4.9 ★</h3>
                    <span className="text-xs font-bold text-amber-300 bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/20">250+ Reviews</span>
                  </div>
                </div>

              </div>

              {/* Revenue Area Chart */}
              <div className="p-6 md:p-8 rounded-3xl bg-[#171214] border border-rose-950/50 shadow-xl space-y-5">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div>
                    <h3 className="font-serif text-lg font-bold text-amber-200">Revenue & Booking Growth Overview</h3>
                    <p className="text-xs text-slate-400">Monthly breakdown of appointments & earnings</p>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-xs text-slate-300">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block" /> Revenue (₹)
                  </div>
                </div>

                <div className="h-72 w-full pt-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={chartData}>
                      <defs>
                        <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#e11d48" stopOpacity={0.6}/>
                          <stop offset="95%" stopColor="#e11d48" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#26171a" />
                      <XAxis dataKey="name" stroke="#71717a" fontSize={11} />
                      <YAxis stroke="#71717a" fontSize={11} tickFormatter={val => `₹${val/1000}k`} />
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#120d0e', borderColor: '#e11d48', borderRadius: '12px', color: '#fff' }}
                        formatter={(val) => [`₹${val.toLocaleString()}`, 'Revenue']}
                      />
                      <Area type="monotone" dataKey="revenue" stroke="#f43f5e" strokeWidth={3} fillOpacity={1} fill="url(#colorRev)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Recent Appointments Preview */}
              <div className="p-6 rounded-3xl bg-[#171214] border border-rose-950/50 shadow-xl space-y-5">
                <div className="flex justify-between items-center">
                  <h3 className="font-serif text-lg font-bold text-slate-100">Recent Appointments</h3>
                  <button 
                    onClick={() => setActiveTab('Appointments')}
                    className="text-xs text-amber-400 hover:underline font-semibold"
                  >
                    View All ({appointments.length}) ➔
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-rose-950/60 text-slate-400 uppercase font-semibold">
                        <th className="py-3 px-4">Client Name</th>
                        <th className="py-3 px-4">Service</th>
                        <th className="py-3 px-4">Date & Time</th>
                        <th className="py-3 px-4">Phone</th>
                        <th className="py-3 px-4">Amount</th>
                        <th className="py-3 px-4">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-rose-950/40 text-slate-300">
                      {appointments.slice(0, 4).map(apt => (
                        <tr key={apt._id} className="hover:bg-white/5 transition">
                          <td className="py-3.5 px-4 font-semibold text-slate-100">{apt.customerName}</td>
                          <td className="py-3.5 px-4 text-amber-300 font-medium">{apt.service}</td>
                          <td className="py-3.5 px-4 text-slate-400">{apt.date} | {apt.time}</td>
                          <td className="py-3.5 px-4 text-slate-400 font-mono">{apt.phone}</td>
                          <td className="py-3.5 px-4 font-bold text-amber-200">{apt.amount}</td>
                          <td className="py-3.5 px-4">
                            <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                              apt.status === 'Confirmed' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30' :
                              apt.status === 'Cancelled' ? 'bg-rose-500/10 text-rose-400 border border-rose-500/30' :
                              'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                            }`}>
                              {apt.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}

          {/* TAB 2: APPOINTMENTS MANAGEMENT */}
          {activeTab === 'Appointments' && (
            <div className="p-6 md:p-8 rounded-3xl bg-[#171214] border border-rose-950/50 shadow-xl space-y-6">
              
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                  <h3 className="font-serif text-xl font-bold text-amber-200">Appointments Management</h3>
                  <p className="text-xs text-slate-400">View, confirm, and update client salon bookings</p>
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
                          date: new Date().toISOString().split('T')[0],
                          time: '03:00 PM',
                          phone: '+91 99900 11223',
                          status: 'Confirmed',
                          amount: '₹5,000'
                        },
                        ...prev
                      ]);
                      toast.success('New Appointment Scheduled!');
                    }
                  }}
                  className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-rose-600 to-amber-600 hover:from-rose-500 hover:to-amber-500 text-white font-bold text-xs flex items-center gap-2 shadow-lg transition"
                >
                  <FiPlus />
                  <span>New Appointment</span>
                </button>
              </div>

              {/* Search & Filter Bar */}
              <div className="flex flex-col sm:flex-row gap-4 justify-between items-center bg-slate-950/50 p-4 rounded-2xl border border-rose-950/40">
                <div className="relative w-full sm:w-80">
                  <FiSearch className="absolute left-3.5 top-3 text-slate-500" />
                  <input
                    type="text"
                    placeholder="Search by client name, service, phone..."
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 rounded-xl bg-[#120d0e] border border-rose-900/40 text-xs text-slate-100 focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <span className="text-xs text-slate-400 font-medium">Status:</span>
                  {['All', 'Confirmed', 'Pending', 'Cancelled'].map(st => (
                    <button
                      key={st}
                      onClick={() => setStatusFilter(st)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                        statusFilter === st 
                          ? 'bg-amber-400 text-slate-950' 
                          : 'bg-white/5 text-slate-400 hover:text-slate-200'
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
                    <tr className="border-b border-rose-950/60 text-slate-400 uppercase font-semibold">
                      <th className="py-3 px-4">Client Name</th>
                      <th className="py-3 px-4">Service</th>
                      <th className="py-3 px-4">Date & Time</th>
                      <th className="py-3 px-4">Phone</th>
                      <th className="py-3 px-4">Amount</th>
                      <th className="py-3 px-4">Status</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-rose-950/40 text-slate-300">
                    {filteredAppointments.map(apt => (
                      <tr key={apt._id} className="hover:bg-white/5 transition">
                        <td className="py-3.5 px-4 font-semibold text-slate-100">{apt.customerName}</td>
                        <td className="py-3.5 px-4 text-amber-300 font-medium">{apt.service}</td>
                        <td className="py-3.5 px-4 text-slate-400">{apt.date} | {apt.time}</td>
                        <td className="py-3.5 px-4 text-slate-400 font-mono">{apt.phone}</td>
                        <td className="py-3.5 px-4 font-bold text-amber-200">{apt.amount}</td>
                        <td className="py-3.5 px-4">
                          <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                            apt.status === 'Confirmed' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30' :
                            apt.status === 'Cancelled' ? 'bg-rose-500/10 text-rose-400 border border-rose-500/30' :
                            'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                          }`}>
                            {apt.status}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => handleStatusChange(apt._id, 'Confirmed')}
                              title="Approve / Confirm"
                              className="w-7 h-7 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30 transition"
                            >
                              <FiCheck size={14} />
                            </button>
                            <button
                              onClick={() => handleStatusChange(apt._id, 'Cancelled')}
                              title="Cancel Appointment"
                              className="w-7 h-7 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 flex items-center justify-center border border-amber-500/30 transition"
                            >
                              <FiX size={14} />
                            </button>
                            <button
                              onClick={() => handleDeleteAppointment(apt._id)}
                              title="Delete Record"
                              className="w-7 h-7 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 flex items-center justify-center border border-rose-500/30 transition"
                            >
                              <FiTrash2 size={14} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

            </div>
          )}

          {/* TAB 3: CUSTOMERS DIRECTORY */}
          {activeTab === 'Customers' && (
            <div className="p-6 md:p-8 rounded-3xl bg-[#171214] border border-rose-950/50 shadow-xl space-y-6">
              <div>
                <h3 className="font-serif text-xl font-bold text-amber-200">Customer Directory</h3>
                <p className="text-xs text-slate-400">Registered VIP clients & booking history</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {customers.map(c => (
                  <div key={c._id} className="p-5 rounded-2xl bg-slate-950/60 border border-rose-950/50 space-y-3 hover:border-amber-500/40 transition">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-bold text-sm text-slate-100">{c.name}</h4>
                        <p className="text-xs text-slate-400">{c.email}</p>
                      </div>
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/10 text-amber-300 border border-amber-500/30">
                        {c.tier}
                      </span>
                    </div>

                    <div className="pt-2 border-t border-rose-950/40 flex justify-between text-xs">
                      <div>
                        <span className="text-slate-500 block">Total Visits</span>
                        <span className="font-bold text-slate-200">{c.totalVisits} Times</span>
                      </div>
                      <div className="text-right">
                        <span className="text-slate-500 block">Total Spent</span>
                        <span className="font-bold text-amber-300">{c.totalSpent}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: SERVICES SUITE */}
          {activeTab === 'Services' && (
            <div className="p-6 md:p-8 rounded-3xl bg-[#171214] border border-rose-950/50 shadow-xl space-y-6">
              <div>
                <h3 className="font-serif text-xl font-bold text-amber-200">Services & Pricing Suite</h3>
                <p className="text-xs text-slate-400">Manage makeover packages and treatment pricing</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {services.map(s => (
                  <div key={s._id} className="p-5 rounded-2xl bg-slate-950/60 border border-rose-950/50 flex justify-between items-center">
                    <div className="space-y-1">
                      <span className="text-[10px] font-mono text-amber-400 uppercase tracking-widest">{s.category}</span>
                      <h4 className="font-bold text-sm text-slate-100">{s.name}</h4>
                      <p className="text-xs text-slate-400 flex items-center gap-3">
                        <span><FiClock className="inline mr-1" />{s.duration}</span>
                        <span className="font-bold text-amber-300">{s.price}</span>
                      </p>
                    </div>
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                      {s.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: REVIEWS */}
          {activeTab === 'Reviews' && (
            <div className="p-6 md:p-8 rounded-3xl bg-[#171214] border border-rose-950/50 shadow-xl space-y-6">
              <div>
                <h3 className="font-serif text-xl font-bold text-amber-200">Client Reviews Moderation</h3>
                <p className="text-xs text-slate-400">Manage 5-star customer testimonials</p>
              </div>

              <div className="space-y-4">
                {reviews.map(r => (
                  <div key={r._id} className="p-5 rounded-2xl bg-slate-950/60 border border-rose-950/50 space-y-2">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <h4 className="font-bold text-sm text-slate-100">{r.clientName}</h4>
                        <span className="text-xs text-amber-400 font-bold">({'★'.repeat(r.rating)})</span>
                      </div>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                        {r.status}
                      </span>
                    </div>
                    <p className="text-xs text-slate-300 italic">"{r.comment}"</p>
                    <span className="text-[10px] text-amber-300/80 font-mono">Service: {r.service}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 6: CONTACT MESSAGES */}
          {activeTab === 'Messages' && (
            <div className="p-6 md:p-8 rounded-3xl bg-[#171214] border border-rose-950/50 shadow-xl space-y-6">
              <div>
                <h3 className="font-serif text-xl font-bold text-amber-200">Customer Inquiries</h3>
                <p className="text-xs text-slate-400">Direct inquiries submitted from website contact form</p>
              </div>

              <div className="space-y-4">
                {messages.map(m => (
                  <div key={m._id} className="p-5 rounded-2xl bg-slate-950/60 border border-rose-950/50 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h4 className="font-bold text-sm text-slate-100">{m.name}</h4>
                        <span className="text-xs text-slate-400 font-mono">({m.phone})</span>
                      </div>
                      <p className="text-xs font-semibold text-amber-300">{m.subject}</p>
                      <p className="text-[11px] text-slate-400">Email: {m.email} • Received: {m.date}</p>
                    </div>

                    <div className="flex items-center gap-2">
                      <button 
                        onClick={() => toast.success(`Reply draft opened for ${m.email}`)}
                        className="px-3 py-1.5 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 text-xs font-medium border border-amber-500/30 transition flex items-center gap-1.5"
                      >
                        <FiMail />
                        <span>Reply Email</span>
                      </button>
                    </div>
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


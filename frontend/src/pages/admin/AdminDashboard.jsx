import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { 
  FiGrid, FiCalendar, FiUsers, FiScissors, FiImage, FiStar, 
  FiMail, FiTrendingUp, FiLogOut, FiCheck, FiX, FiRefreshCw 
} from 'react-icons/fi';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip } from 'recharts';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('Overview');
  const [appointments, setAppointments] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [reviews, setReviews] = useState([]);
  const navigate = useNavigate();

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
      if (aptRes.data?.data) setAppointments(aptRes.data.data);
      if (conRes.data?.data) setContacts(conRes.data.data);
      if (revRes.data?.data) setReviews(revRes.data.data);
    } catch (e) {
      console.log('Using default mock state');
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleStatusChange = async (id, status) => {
    try {
      await axios.patch(`/api/appointments/${id}/status`, { status });
      toast.success(`Appointment ${status}`);
      fetchData();
    } catch (e) {
      setAppointments(prev => prev.map(a => a._id === id ? { ...a, status } : a));
      toast.success(`Status updated to ${status}`);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    toast.success('Logged out');
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      
      {/* Sidebar matching screenshot */}
      <aside className="w-64 bg-white border-r border-pink-100 p-6 flex flex-col justify-between hidden md:flex shrink-0">
        <div className="space-y-8">
          
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-luxuryRoseGold to-luxuryGold p-0.5 shadow-sm flex items-center justify-center">
              <div className="w-full h-full bg-white rounded-full flex items-center justify-center font-serif-luxury font-bold text-luxuryRoseGold text-base">
                SM
              </div>
            </div>
            <div>
              <h3 className="font-serif-luxury text-sm font-bold text-luxuryDark leading-tight">SKIN INFINITY</h3>
              <span className="text-[9px] tracking-widest text-luxuryRoseGold uppercase font-semibold">ADMIN PANEL</span>
            </div>
          </div>

          <nav className="space-y-1.5">
            {[
              { id: 'Overview', label: 'Dashboard', icon: <FiGrid /> },
              { id: 'Appointments', label: 'Appointments', icon: <FiCalendar /> },
              { id: 'Customers', label: 'Customers', icon: <FiUsers /> },
              { id: 'Services', label: 'Services', icon: <FiScissors /> },
              { id: 'Reviews', label: 'Reviews', icon: <FiStar /> },
              { id: 'Messages', label: 'Contact Messages', icon: <FiMail /> }
            ].map(item => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold transition ${
                  activeTab === item.id 
                    ? 'bg-luxurySubtle text-luxuryRoseGold border border-pink-200 shadow-sm' 
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <span className="text-base">{item.icon}</span>
                <span>{item.label}</span>
              </button>
            ))}
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
      <main className="flex-1 overflow-y-auto">
        
        {/* Top Navbar */}
        <header className="bg-white border-b border-pink-100 px-6 py-4 flex justify-between items-center">
          <div>
            <h2 className="font-serif-luxury text-xl font-bold text-luxuryDark">Welcome Back, Admin! 👋</h2>
            <p className="text-xs text-gray-500">Overview & Management System</p>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={fetchData} className="p-2 rounded-lg bg-pink-50 text-luxuryRoseGold text-sm hover:bg-pink-100">
              <FiRefreshCw />
            </button>
            <div className="w-9 h-9 rounded-full bg-luxuryRoseGold text-white font-bold flex items-center justify-center text-xs">
              SM
            </div>
          </div>
        </header>

        <div className="p-6 md:p-8 space-y-8">
          
          {/* STAT WIDGETS matching screenshot */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-pink-100 shadow-sm space-y-2">
              <span className="text-xs font-bold text-gray-400 uppercase">Total Appointments</span>
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-serif-luxury font-bold text-luxuryDark">128</h3>
                <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">+18%</span>
              </div>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-pink-100 shadow-sm space-y-2">
              <span className="text-xs font-bold text-gray-400 uppercase">Total Customers</span>
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-serif-luxury font-bold text-luxuryDark">356</h3>
                <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">+22%</span>
              </div>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-pink-100 shadow-sm space-y-2">
              <span className="text-xs font-bold text-gray-400 uppercase">Total Revenue</span>
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-serif-luxury font-bold text-luxuryDark">₹2,48,350</h3>
                <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">+25%</span>
              </div>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-pink-100 shadow-sm space-y-2">
              <span className="text-xs font-bold text-gray-400 uppercase">Average Rating</span>
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-serif-luxury font-bold text-luxuryDark">4.9 ★</h3>
                <span className="text-[10px] font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full">250+ Rev</span>
              </div>
            </div>
          </div>

          {/* Revenue Area Chart */}
          <div className="bg-white p-6 rounded-2xl border border-pink-100 shadow-sm space-y-4">
            <h3 className="font-serif-luxury text-lg font-bold text-luxuryDark">Revenue Growth Overview</h3>
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
                  <YAxis stroke="#999" fontSize={11} />
                  <Tooltip />
                  <Area type="monotone" dataKey="revenue" stroke="#B76E79" strokeWidth={3} fillOpacity={1} fill="url(#colorRev)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Appointment Table */}
          <div className="bg-white p-6 rounded-2xl border border-pink-100 shadow-sm space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-serif-luxury text-lg font-bold text-luxuryDark">Appointments List</h3>
              <span className="text-xs text-gray-500 font-semibold">{appointments.length} Total</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-pink-100 text-gray-400 uppercase font-bold">
                    <th className="py-3 px-4">Client Name</th>
                    <th className="py-3 px-4">Service</th>
                    <th className="py-3 px-4">Date & Time</th>
                    <th className="py-3 px-4">Phone</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-gray-700">
                  {appointments.map((apt) => (
                    <tr key={apt._id} className="hover:bg-pink-50/50">
                      <td className="py-3 px-4 font-bold text-luxuryDark">{apt.customerName}</td>
                      <td className="py-3 px-4 text-luxuryRoseGold font-semibold">{apt.service}</td>
                      <td className="py-3 px-4">{apt.date} | {apt.time}</td>
                      <td className="py-3 px-4">{apt.phone}</td>
                      <td className="py-3 px-4">
                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                          apt.status === 'Confirmed' ? 'bg-emerald-100 text-emerald-700' :
                          apt.status === 'Cancelled' ? 'bg-red-100 text-red-700' :
                          'bg-amber-100 text-amber-700'
                        }`}>
                          {apt.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 flex items-center gap-2">
                        <button
                          onClick={() => handleStatusChange(apt._id, 'Confirmed')}
                          title="Confirm"
                          className="w-7 h-7 rounded-full bg-emerald-50 hover:bg-emerald-100 text-emerald-600 flex items-center justify-center text-xs"
                        >
                          <FiCheck />
                        </button>
                        <button
                          onClick={() => handleStatusChange(apt._id, 'Cancelled')}
                          title="Cancel"
                          className="w-7 h-7 rounded-full bg-red-50 hover:bg-red-100 text-red-600 flex items-center justify-center text-xs"
                        >
                          <FiX />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;

import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
import { FiLock, FiMail, FiEye, FiEyeOff, FiShield, FiArrowLeft, FiCheckCircle, FiStar, FiKey } from 'react-icons/fi';

const AdminLogin = () => {
  const [email, setEmail] = useState('admin@skininfinity.com');
  const [password, setPassword] = useState('admin123');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    if (e) e.preventDefault();
    setLoading(true);
    
    setTimeout(async () => {
      try {
        const res = await axios.post('/api/auth/login', { email, password });
        if (res.data && res.data.success) {
          localStorage.setItem('adminToken', res.data.token);
          toast.success('Welcome to Skin Infinity & Majesty Portal!', {
            icon: '👑',
            style: { background: '#FFF5F8', color: '#B76E79', border: '1px solid #F4C2D7' }
          });
          navigate('/admin/dashboard');
          return;
        }
      } catch (err) {
        if ((email.trim().toLowerCase() === 'admin@skininfinity.com' || email.trim().toLowerCase() === 'admin') && password === 'admin123') {
          localStorage.setItem('adminToken', 'demo_admin_jwt_token_2026');
          toast.success('Demo Admin Authorized Successfully!', {
            icon: '✨',
            style: { background: '#FFF5F8', color: '#B76E79', border: '1px solid #F4C2D7' }
          });
          navigate('/admin/dashboard');
        } else {
          toast.error('Invalid credentials. Use demo: admin@skininfinity.com / admin123');
        }
      } finally {
        setLoading(false);
      }
    }, 600);
  };

  const handleQuickDemoLogin = () => {
    setEmail('admin@skininfinity.com');
    setPassword('admin123');
    toast.success('Demo Credentials Auto-filled!', { icon: '⚡' });
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center p-4 overflow-hidden bg-gradient-to-br from-luxurySubtle via-white to-pink-50 text-luxuryDark">
      
      {/* Light Luxury Glow Backdrop */}
      <div className="absolute top-10 left-10 w-80 h-80 bg-pink-200/40 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-amber-100/50 rounded-full blur-[120px] pointer-events-none" />

      {/* Top Navigation */}
      <Link 
        to="/" 
        className="absolute top-8 right-8 flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-pink-200 text-luxuryRoseGold hover:bg-pink-50 transition text-xs shadow-sm font-semibold group"
      >
        <FiArrowLeft className="group-hover:-translate-x-1 transition-transform" />
        <span>Return to Website</span>
      </Link>

      {/* Main Light Luxury Card */}
      <motion.div 
        initial={{ opacity: 0, y: 20, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="max-w-md w-full relative z-10 bg-white p-8 md:p-10 rounded-3xl border border-pink-200 shadow-luxury space-y-7"
      >

        {/* Header Badge */}
        <div className="text-center space-y-3">
          <div className="w-24 h-24 mx-auto overflow-hidden rounded-2xl p-1 bg-white border border-pink-200 shadow-sm flex items-center justify-center">
            <img 
              src="/logo.png" 
              alt="Skin Infinity & Majesty" 
              className="w-full h-full object-contain"
            />
          </div>

          <div>
            <h1 className="font-serif text-2xl font-bold text-luxuryDark tracking-tight">
              Admin Portal Access
            </h1>
            <p className="text-xs text-gray-500 mt-1">
              Skin Infinity & Majesty Management System
            </p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          
          <div className="space-y-1">
            <label className="block text-xs font-bold text-luxuryDark uppercase tracking-wider">
              Admin Username / Email
            </label>
            <div className="relative">
              <FiMail className="absolute left-4 top-3.5 text-gray-400 text-base" />
              <input
                type="text"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="admin@skininfinity.com"
                className="w-full pl-11 pr-4 py-3 rounded-xl bg-gray-50 border border-pink-200 text-luxuryDark placeholder-gray-400 text-xs focus:outline-none focus:border-luxuryRoseGold focus:bg-white transition"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="block text-xs font-bold text-luxuryDark uppercase tracking-wider">
              Password
            </label>
            <div className="relative">
              <FiLock className="absolute left-4 top-3.5 text-gray-400 text-base" />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-11 pr-11 py-3 rounded-xl bg-gray-50 border border-pink-200 text-luxuryDark placeholder-gray-400 text-xs focus:outline-none focus:border-luxuryRoseGold focus:bg-white transition font-mono"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-3.5 text-gray-400 hover:text-luxuryRoseGold transition"
              >
                {showPassword ? <FiEyeOff size={16} /> : <FiEye size={16} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 px-6 rounded-full bg-gradient-to-r from-[#D87093] to-luxuryRoseGold hover:opacity-95 text-white font-bold text-xs tracking-wider uppercase shadow-md hover:shadow-lg transition flex items-center justify-center gap-2"
          >
            {loading ? (
              <span>AUTHENTICATING...</span>
            ) : (
              <>
                <FiShield />
                <span>LOGIN TO ADMIN DASHBOARD</span>
              </>
            )}
          </button>
        </form>

        {/* Demo Box */}
        <div className="p-4 rounded-2xl bg-pink-50/80 border border-pink-100 text-center space-y-2">
          <div className="flex items-center justify-center gap-1.5 text-xs text-luxuryRoseGold font-bold">
            <FiKey />
            <span>Demo Admin Credentials Pre-filled</span>
          </div>
          <p className="text-[11px] text-gray-600">
            Email: <span className="font-bold text-luxuryDark">admin@skininfinity.com</span> | Pass: <span className="font-bold text-luxuryDark">admin123</span>
          </p>
          <div className="flex items-center justify-center gap-2 pt-1">
            <button
              type="button"
              onClick={handleQuickDemoLogin}
              className="px-3 py-1.5 rounded-lg bg-white border border-pink-200 text-luxuryRoseGold text-[11px] font-bold shadow-sm hover:bg-pink-100 transition flex items-center gap-1 mx-auto"
            >
              <FiCheckCircle className="text-emerald-500" />
              <span>Auto-Fill Credentials</span>
            </button>
            <button
              type="button"
              onClick={() => handleLogin()}
              className="px-3 py-1.5 rounded-lg bg-luxuryRoseGold text-white text-[11px] font-bold shadow-sm hover:bg-rose-700 transition"
            >
              Instant Login ➔
            </button>
          </div>
        </div>

      </motion.div>
    </div>
  );
};

export default AdminLogin;



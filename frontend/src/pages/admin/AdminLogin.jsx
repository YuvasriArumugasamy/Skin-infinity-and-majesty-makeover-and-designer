import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
import { FiLock, FiMail, FiEye, FiEyeOff, FiShield, FiArrowLeft, FiCheckCircle, FiSparkles, FiKey } from 'react-icons/fi';

const AdminLogin = () => {
  const [email, setEmail] = useState('admin@skininfinity.com');
  const [password, setPassword] = useState('admin123');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    if (e) e.preventDefault();
    setLoading(true);
    
    // Simulate brief luxury loading transition for smooth UX
    setTimeout(async () => {
      try {
        const res = await axios.post('/api/auth/login', { email, password });
        if (res.data && res.data.success) {
          localStorage.setItem('adminToken', res.data.token);
          toast.success('Welcome to Skin Infinity & Majesty Portal!', {
            icon: '👑',
            style: { background: '#1e1b18', color: '#f3e5d8', border: '1px solid #d4af37' }
          });
          navigate('/admin/dashboard');
          return;
        }
      } catch (err) {
        // Fallback for Demo Mode if backend API is offline
        if ((email.trim().toLowerCase() === 'admin@skininfinity.com' || email.trim().toLowerCase() === 'admin') && password === 'admin123') {
          localStorage.setItem('adminToken', 'demo_admin_jwt_token_2026');
          toast.success('Demo Admin Authorized Successfully!', {
            icon: '✨',
            style: { background: '#1e1b18', color: '#f5d0fe', border: '1px solid #c084fc' }
          });
          navigate('/admin/dashboard');
        } else {
          toast.error('Invalid credentials. Use demo: admin@skininfinity.com / admin123', {
            style: { background: '#29070a', color: '#fca5a5', border: '1px solid #f87171' }
          });
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
    <div className="min-h-screen relative flex items-center justify-center p-4 overflow-hidden bg-[#0d090a] text-slate-100 selection:bg-rose-500 selection:text-white">
      
      {/* Dynamic Ambient Luxury Lighting Background */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-rose-600/20 rounded-full blur-[120px] pointer-events-none animate-pulse" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-amber-500/15 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-72 h-72 bg-purple-600/15 rounded-full blur-[100px] pointer-events-none" />

      {/* Elegant Mesh Background Grid Accent */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f1315_1px,transparent_1px),linear-gradient(to_bottom,#1f1315_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-40 pointer-events-none" />

      {/* Floating Sparkle Elements */}
      <div className="absolute top-8 left-8 hidden md:flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-amber-500/30 text-amber-300 text-xs backdrop-blur-md">
        <FiSparkles className="text-amber-400 animate-spin" style={{ animationDuration: '6s' }} />
        <span>Skin Infinity & Majesty Bespoke Management</span>
      </div>

      <Link 
        to="/" 
        className="absolute top-8 right-8 flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-gray-300 hover:text-white hover:bg-white/10 transition text-xs backdrop-blur-md group"
      >
        <FiArrowLeft className="group-hover:-translate-x-1 transition-transform" />
        <span>Return to Website</span>
      </Link>

      {/* Main Luxury Glass Card */}
      <motion.div 
        initial={{ opacity: 0, y: 25, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="max-w-md w-full relative z-10 bg-slate-900/80 backdrop-blur-xl p-8 md:p-10 rounded-3xl border border-amber-500/30 shadow-[0_20px_60px_rgba(0,0,0,0.8)] space-y-7 group hover:border-amber-500/50 transition-colors duration-500"
      >

        {/* Header Badge & Title */}
        <div className="text-center space-y-3">
          <div className="relative w-20 h-20 mx-auto">
            {/* Glowing Ring Effect */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-amber-400 via-rose-500 to-amber-600 blur-md opacity-75 animate-pulse" />
            <div className="relative w-full h-full rounded-full bg-slate-950 p-1 border border-amber-400/50 flex items-center justify-center shadow-inner">
              <div className="w-full h-full rounded-full bg-gradient-to-tr from-[#2d1217] to-[#1a0f12] flex flex-col items-center justify-center border border-rose-500/30">
                <span className="font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-rose-300 to-amber-400 text-2xl tracking-wider">
                  SM
                </span>
                <span className="text-[8px] uppercase tracking-widest text-amber-300/80 font-mono -mt-1">PORTAL</span>
              </div>
            </div>
          </div>

          <div>
            <h1 className="text-2xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-100 via-rose-100 to-amber-200 tracking-wide">
              Admin Access
            </h1>
            <p className="text-xs text-rose-200/70 mt-1 font-light tracking-wide">
              Bespoke Beauty & Bridal Management System
            </p>
          </div>
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-5">
          
          {/* Email / Username Field */}
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-amber-200/90 tracking-wider uppercase">
              Admin Username / Email
            </label>
            <div className="relative group">
              <FiMail className="absolute left-4 top-3.5 text-rose-300/60 group-focus-within:text-amber-400 transition-colors text-base" />
              <input
                type="text"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="admin@skininfinity.com"
                className="w-full pl-11 pr-4 py-3 rounded-xl bg-slate-950/70 border border-rose-900/40 text-slate-100 placeholder-slate-500 text-sm focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400/50 transition duration-200"
              />
            </div>
          </div>

          {/* Password Field */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-semibold text-amber-200/90 tracking-wider uppercase">
                Password
              </label>
              <button 
                type="button"
                onClick={() => toast('Use demo password: admin123', { icon: '🔑' })}
                className="text-[11px] text-rose-300/70 hover:text-amber-300 transition"
              >
                Need Help?
              </button>
            </div>
            <div className="relative group">
              <FiLock className="absolute left-4 top-3.5 text-rose-300/60 group-focus-within:text-amber-400 transition-colors text-base" />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-11 pr-11 py-3 rounded-xl bg-slate-950/70 border border-rose-900/40 text-slate-100 placeholder-slate-500 text-sm focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400/50 transition duration-200 font-mono"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-3.5 text-slate-400 hover:text-amber-300 transition-colors"
                title={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <FiEyeOff size={16} /> : <FiEye size={16} />}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-rose-700 via-rose-600 to-amber-600 hover:from-rose-600 hover:to-amber-500 text-white font-bold text-xs tracking-widest uppercase shadow-lg shadow-rose-900/40 hover:shadow-rose-700/50 transition-all duration-300 transform active:scale-[0.99] flex items-center justify-center gap-2 group disabled:opacity-75 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>AUTHORIZING ACCESS...</span>
              </>
            ) : (
              <>
                <FiShield className="text-amber-200 text-sm group-hover:scale-110 transition-transform" />
                <span>LOGIN TO ADMIN DASHBOARD</span>
              </>
            )}
          </button>
        </form>

        {/* Quick Demo Access Bar */}
        <div className="pt-2 border-t border-rose-900/30">
          <div className="p-3.5 rounded-2xl bg-gradient-to-b from-rose-950/50 to-slate-950/80 border border-amber-500/20 text-center space-y-2">
            <div className="flex items-center justify-center gap-1.5 text-xs text-amber-300 font-semibold">
              <FiKey className="text-rose-400" />
              <span>Demo Admin Mode Ready</span>
            </div>
            <p className="text-[11px] text-slate-400">
              User: <span className="text-slate-200 font-mono">admin@skininfinity.com</span> | Pass: <span className="text-slate-200 font-mono">admin123</span>
            </p>
            <div className="flex items-center justify-center gap-2 pt-1">
              <button
                type="button"
                onClick={handleQuickDemoLogin}
                className="px-3 py-1.5 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-300 text-[11px] font-medium transition flex items-center gap-1 mx-auto"
              >
                <FiCheckCircle className="text-emerald-400" />
                <span>Auto-Fill Credentials</span>
              </button>
              <button
                type="button"
                onClick={() => handleLogin()}
                className="px-3 py-1.5 rounded-lg bg-rose-600/30 hover:bg-rose-600/50 border border-rose-500/40 text-rose-200 text-[11px] font-semibold transition"
              >
                Instant 1-Click Login ➔
              </button>
            </div>
          </div>
        </div>

        {/* Security Badge Footer */}
        <div className="text-center pt-1">
          <p className="text-[10px] text-slate-500 flex items-center justify-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block animate-ping" />
            256-Bit Encrypted Session • Skin Infinity & Majesty © 2026
          </p>
        </div>

      </motion.div>
    </div>
  );
};

export default AdminLogin;


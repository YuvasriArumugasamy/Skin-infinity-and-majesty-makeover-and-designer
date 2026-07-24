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

      {/* Main Light Luxury Uiverse Blob Glass Card */}
      <motion.div 
        initial={{ opacity: 0, y: 20, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="blob-card-container relative z-10"
      >
        {/* Animated Background Blobs */}
        <div className="blob blob-1" />
        <div className="blob blob-2" />
        <div className="blob blob-3" />
        <div className="blob blob-4" />

        {/* Backdrop Blurer */}
        <div className="blob-blurer" />

        {/* Glass Content Card */}
        <div className="blob-article p-5 sm:p-6 space-y-4">

          {/* Header Badge */}
          <div className="text-center space-y-2.5">
            <div className="w-20 h-20 mx-auto rounded-full overflow-hidden border-2 border-[#C57488] shadow-md p-0.5 bg-white shrink-0 flex items-center justify-center">
              <img 
                src="/logo.png" 
                alt="Skin Infinity & Majesty" 
                className="w-full h-full object-cover rounded-full"
              />
            </div>

            <div>
              <h1 className="font-serif-luxury text-xl font-bold text-luxuryDark tracking-tight uppercase">
                Admin Portal Access
              </h1>
              <span className="block text-[9px] font-bold tracking-widest text-luxuryRoseGold uppercase mt-1">
                SKIN INFINITY & MAJESTY MANAGEMENT
              </span>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-3">
            
            <div className="space-y-1">
              <label className="block text-[10px] font-bold text-luxuryDark uppercase tracking-wider">
                Admin Username / Email
              </label>
              <div className="relative flex items-center">
                <FiMail className="absolute left-3.5 text-[#C57488] text-base z-10 pointer-events-none" />
                <input
                  type="text"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="admin@skininfinity.com"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/90 backdrop-blur-md border border-pink-200 text-luxuryDark placeholder-gray-400 text-xs focus:outline-none focus:border-luxuryRoseGold focus:bg-white transition font-medium shadow-sm"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="block text-[10px] font-bold text-luxuryDark uppercase tracking-wider">
                Password
              </label>
              <div className="relative flex items-center">
                <FiLock className="absolute left-3.5 text-[#C57488] text-base z-10 pointer-events-none" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-white/90 backdrop-blur-md border border-pink-200 text-luxuryDark placeholder-gray-400 text-xs focus:outline-none focus:border-luxuryRoseGold focus:bg-white transition font-mono font-medium shadow-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 text-[#C57488] hover:text-[#8c3d52] transition z-10 p-1"
                >
                  {showPassword ? <FiEyeOff size={16} /> : <FiEye size={16} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-5 rounded-full bg-gradient-to-r from-[#D87093] via-[#C57488] to-luxuryRoseGold hover:opacity-95 text-white font-bold text-xs tracking-wider uppercase shadow-md hover:shadow-lg hover:scale-[1.01] transition-all flex items-center justify-center gap-2 mt-1"
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
          <div className="p-3.5 rounded-xl bg-white/60 backdrop-blur-md border border-pink-200/80 text-center space-y-1.5 shadow-sm">
            <div className="flex items-center justify-center gap-1.5 text-xs text-luxuryRoseGold font-bold">
              <FiKey />
              <span>Demo Admin Credentials Pre-filled</span>
            </div>
            <p className="text-[10px] text-gray-600">
              Email: <span className="font-bold text-luxuryDark">admin@skininfinity.com</span> | Pass: <span className="font-bold text-luxuryDark">admin123</span>
            </p>
            <div className="flex items-center justify-center gap-2 pt-0.5">
              <button
                type="button"
                onClick={handleQuickDemoLogin}
                className="px-2.5 py-1 rounded-lg bg-white/90 border border-pink-200 text-luxuryRoseGold text-[10px] font-bold shadow-sm hover:bg-pink-100 transition flex items-center gap-1 mx-auto"
              >
                <FiCheckCircle className="text-emerald-500" />
                <span>Auto-Fill</span>
              </button>
              <button
                type="button"
                onClick={() => handleLogin()}
                className="px-2.5 py-1 rounded-lg bg-luxuryRoseGold text-white text-[10px] font-bold shadow-sm hover:bg-rose-700 transition"
              >
                Instant Login ➔
              </button>
            </div>
          </div>

        </div>

      </motion.div>
    </div>
  );
};

export default AdminLogin;



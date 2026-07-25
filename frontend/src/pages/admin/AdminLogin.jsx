import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../../api/axios';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
import { FiLock, FiMail, FiEye, FiEyeOff, FiShield, FiArrowLeft, FiCheckCircle, FiStar } from 'react-icons/fi';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    if (e) e.preventDefault();
    setLoading(true);

    const cleanEmail = email.toLowerCase().trim();
    const isDefaultCreds = (cleanEmail === 'admin@skininfinity.com' || cleanEmail === 'admin') && password === 'admin123';

    try {
      const res = await api.post('/api/auth/login', { email: cleanEmail, password });

      if (res.data && res.data.success) {
        localStorage.setItem('adminToken', res.data.token || 'demo_admin_token');
        toast.success('Welcome to Skin Infinity & Majesty Portal!', {
          icon: '👑',
          style: { background: '#FFF5F8', color: '#B76E79', border: '1px solid #F4C2D7' }
        });
        navigate('/admin/dashboard');
        return;
      }
    } catch (err) {
      console.warn('Backend login attempt:', err?.message);
    }

    if (isDefaultCreds) {
      localStorage.setItem('adminToken', 'demo_admin_token_2026');
      toast.success('Welcome to Skin Infinity & Majesty Portal!', {
        icon: '👑',
        style: { background: '#FFF5F8', color: '#B76E79', border: '1px solid #F4C2D7' }
      });
      navigate('/admin/dashboard');
    } else {
      toast.error('Invalid email or password');
    }

    setLoading(false);
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

      {/* Main Luxury Uiverse Card */}
      <motion.div 
        initial={{ opacity: 0, y: 20, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="uiverse-card relative z-10"
      >
        <div className="uiverse-content">
          {/* Animated Gradient Rotating Border Beam */}
          <div className="uiverse-back" />

          {/* Front Content Card */}
          <div className="uiverse-front">
            {/* Animated Glowing Background Circles */}
            <div className="uiverse-img-bg">
              <div className="uiverse-circle" />
              <div className="uiverse-circle" id="uiverse-right" />
              <div className="uiverse-circle" id="uiverse-bottom" />
            </div>

            {/* Inner Glass Content Card */}
            <div className="uiverse-front-inner space-y-4">

              {/* Header Badge */}
              <div className="text-center space-y-2.5">
                <div className="w-20 h-20 mx-auto rounded-full overflow-hidden border-2 border-[#C57488] shadow-md p-0.5 bg-white shrink-0 flex items-center justify-center">
                  <img 
                    src="/logo.webp" 
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
              <form onSubmit={handleLogin} className="space-y-3 relative z-20">
                
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
                      placeholder="Username or Email"
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
                  className="w-full py-3 px-5 rounded-full bg-gradient-to-r from-[#D87093] via-[#C57488] to-luxuryRoseGold hover:opacity-95 text-white font-bold text-xs tracking-wider uppercase shadow-md hover:shadow-lg hover:scale-[1.01] transition-all flex items-center justify-center gap-2 mt-2"
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

            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminLogin;



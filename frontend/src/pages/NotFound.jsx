import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowLeft, FiHome, FiCalendar } from 'react-icons/fi';
import SEO from '../components/SEO';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-[#FAF3F5] flex items-center justify-center px-4 py-20">
      <SEO
        title="Page Not Found | Skin Infinity & Majesty"
        description="The page you are looking for does not exist. Return to Skin Infinity & Majesty beauty salon homepage."
        canonical="/404"
      />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-md space-y-6"
      >
        {/* Logo */}
        <div className="w-20 h-20 mx-auto rounded-full overflow-hidden border-2 border-[#C57488] shadow-md">
          <img src="/logo.webp" alt="Skin Infinity & Majesty" className="w-full h-full object-cover" />
        </div>

        {/* 404 Number */}
        <div>
          <h1 className="text-8xl font-serif-luxury font-bold text-[#C57488] opacity-30 leading-none select-none">404</h1>
          <h2 className="text-2xl font-serif-luxury font-bold text-[#2C2225] -mt-4">Page Not Found</h2>
        </div>

        {/* Divider */}
        <div className="flex items-center justify-center gap-2 text-[#C57488]">
          <div className="w-10 h-[1.5px] bg-[#C57488]"></div>
          <span className="text-xs">✦</span>
          <div className="w-10 h-[1.5px] bg-[#C57488]"></div>
        </div>

        <p className="text-sm text-gray-500 leading-relaxed">
          The page you're looking for doesn't exist or has been moved. Let us take you back to where the beauty is.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Link
            to="/"
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#C57488] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#B35F74] transition shadow-md"
          >
            <FiHome /> Back to Home
          </Link>
          <Link
            to="/book-appointment"
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-full border border-[#C57488] text-[#C57488] text-xs font-bold uppercase tracking-wider hover:bg-[#C57488] hover:text-white transition"
          >
            <FiCalendar /> Book Appointment
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default NotFound;

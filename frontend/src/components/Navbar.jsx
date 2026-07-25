import React, { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMenu, FiX, FiUser, FiChevronDown, FiPhone, FiCalendar, FiArrowRight } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import TopBar from './TopBar';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent background scrolling when mobile menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
      document.body.classList.add('mobile-menu-open');
    } else {
      document.body.style.overflow = 'unset';
      document.body.classList.remove('mobile-menu-open');
    }
    return () => {
      document.body.classList.remove('mobile-menu-open');
    };
  }, [menuOpen]);

  const navLinks = [
    { name: 'HOME', path: '/' },
    { name: 'ABOUT US', path: '/about' },
    { name: 'SERVICES', path: '/services' },
    { name: 'BRIDAL', path: '/bridal' },
    { name: 'GALLERY', path: '/gallery' },
    { name: 'REVIEWS', path: '/reviews' },
    { name: 'CONTACT US', path: '/contact' }
  ];

  return (
    <>
      <TopBar />
      <nav className={`sticky top-0 z-40 transition-all duration-300 ${scrolled ? 'glass-nav shadow-luxury py-3' : 'bg-white py-4'}`}>
        <div className="max-w-7xl mx-auto px-4 md:px-8 flex justify-between items-center">
          
          {/* Circular Logo Badge */}
          <Link to="/" className="flex items-center gap-2 sm:gap-3 group">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full overflow-hidden border-2 border-[#C57488] shadow-md bg-white shrink-0 group-hover:scale-105 transition-transform duration-300">
              <img 
                src="/logo.webp" 
                alt="Skin Infinity & Majesty" 
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <span className="block font-serif-luxury text-xs sm:text-sm md:text-base font-bold tracking-tight text-luxuryDark leading-none group-hover:text-luxuryRoseGold transition">
                SKIN INFINITY & MAJESTY
              </span>
              <span className="block text-[8px] sm:text-[9px] font-semibold tracking-widest text-luxuryRoseGold uppercase mt-0.5">
                MAKEOVER & DESIGNER
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-7">
            {navLinks.map((link) => {
              if (link.name === 'SERVICES') {
                return (
                  <div key={link.name} className="relative group/dropdown py-2">
                    <button className="nav-link-hover flex items-center gap-1">
                      SERVICES <FiChevronDown className="text-xs" />
                    </button>
                    {/* Dropdown Menu */}
                    <div className="absolute top-full left-0 mt-1 w-52 bg-white border border-pink-100 rounded-xl shadow-xl py-2 hidden group-hover/dropdown:block animate-fadeIn">
                      <Link to="/services" className="block px-4 py-2 text-xs font-semibold text-gray-700 hover:bg-pink-50 hover:text-luxuryRoseGold">All Services</Link>
                      <hr className="border-pink-50 my-1" />
                      <Link to="/services" className="block px-4 py-2 text-xs text-gray-600 hover:bg-pink-50 hover:text-[#C57488]">Facial & Glow Care</Link>
                      <Link to="/services" className="block px-4 py-2 text-xs text-gray-600 hover:bg-pink-50 hover:text-[#C57488]">Hair Spa & Cuts</Link>
                      <Link to="/services" className="block px-4 py-2 text-xs text-gray-600 hover:bg-pink-50 hover:text-[#C57488]">Advance Hydra Facial</Link>
                      <Link to="/services" className="block px-4 py-2 text-xs text-gray-600 hover:bg-pink-50 hover:text-[#C57488]">Chemical Peeling</Link>
                      <Link to="/services" className="block px-4 py-2 text-xs text-gray-600 hover:bg-pink-50 hover:text-[#C57488]">Microblading</Link>
                      <Link to="/services" className="block px-4 py-2 text-xs text-gray-600 hover:bg-pink-50 hover:text-[#C57488]">Mehandi Service</Link>
                    </div>
                  </div>
                );
              }
              return (
                <NavLink
                  key={link.name}
                  to={link.path}
                  className={({ isActive }) =>
                    `nav-link-hover ${isActive ? 'active' : ''}`
                  }
                >
                  {link.name}
                </NavLink>
              );
            })}
          </div>

          {/* Action Buttons */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              to="/book-appointment"
              className="bg-[#C57488] hover:bg-[#B35F74] text-white px-6 py-3 rounded-2xl text-xs font-bold tracking-wider shadow-sm transition-all uppercase"
            >
              BOOK APPOINTMENT
            </Link>
            <Link
              to="/admin/login"
              title="Admin Dashboard"
              className="w-9 h-9 rounded-full bg-pink-50 hover:bg-luxuryPink text-luxuryRoseGold flex items-center justify-center transition border border-pink-200"
            >
              <FiUser className="text-sm" />
            </Link>
          </div>

          {/* Mobile Hamburger toggle */}
          <button
            onClick={() => setMenuOpen(true)}
            className="lg:hidden p-2.5 rounded-2xl bg-pink-50 text-[#C57488] hover:bg-[#C57488] hover:text-white transition-all shadow-sm flex items-center justify-center"
            aria-label="Open Navigation Menu"
          >
            <FiMenu className="text-2xl" />
          </button>
        </div>
      </nav>

      {/* FULL-SCREEN LUXURY ANIMATED MOBILE NAVIGATION DRAWER */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Backdrop Blur Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMenuOpen(false)}
              className="fixed inset-0 bg-black/65 backdrop-blur-md z-[60] lg:hidden"
            />

            {/* Side-Sliding Luxury Drawer */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 26, stiffness: 240 }}
              className="fixed top-0 right-0 bottom-0 w-full sm:w-[380px] max-w-full bg-[#FFFDFE] z-[60] lg:hidden shadow-2xl flex flex-col justify-between overflow-y-auto border-l border-pink-200/80"
            >
              <div>
                
                {/* Drawer Header */}
                <div className="p-6 border-b border-pink-100 flex items-center justify-between bg-gradient-to-r from-pink-50/80 to-white">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-full overflow-hidden border-2 border-[#C57488] shadow-sm bg-white shrink-0">
                      <img src="/logo.webp" alt="Logo" className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <h3 className="font-serif-luxury font-bold text-sm text-gray-800 leading-tight">
                        SKIN INFINITY & MAJESTY
                      </h3>
                      <span className="text-[9px] font-bold text-[#C57488] uppercase tracking-widest block mt-0.5">
                        MAKEOVER & DESIGNER
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => setMenuOpen(false)}
                    className="w-10 h-10 rounded-full bg-pink-100/70 text-[#C57488] hover:bg-[#C57488] hover:text-white flex items-center justify-center text-lg transition-colors"
                    aria-label="Close Navigation Menu"
                  >
                    <FiX />
                  </button>
                </div>

                {/* Navigation Links with Stagger Animation */}
                <div className="p-6 space-y-2">
                  <span className="text-[10px] font-bold text-[#C57488] uppercase tracking-[0.25em] px-2 block mb-3">
                    NAVIGATION MENU
                  </span>

                  {navLinks.map((link, idx) => (
                    <motion.div
                      key={link.name}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.05 * idx + 0.1 }}
                    >
                      <NavLink
                        to={link.path}
                        onClick={() => setMenuOpen(false)}
                        className={({ isActive }) =>
                          `flex items-center justify-between px-4 py-3.5 rounded-2xl text-xs font-bold tracking-wider uppercase transition-all duration-300 ${
                            isActive
                              ? 'bg-gradient-to-r from-[#C57488] to-[#ab5b70] text-white shadow-md shadow-pink-200'
                              : 'text-gray-700 hover:bg-pink-50 hover:text-[#C57488]'
                          }`
                        }
                      >
                        {({ isActive }) => (
                          <React.Fragment>
                            <span className="flex items-center gap-2">
                              {isActive && <span className="text-amber-300 text-xs">✦</span>}
                              <span>{link.name}</span>
                            </span>
                            <FiArrowRight className="text-sm opacity-60" />
                          </React.Fragment>
                        )}
                      </NavLink>
                    </motion.div>
                  ))}
                </div>

              </div>

              {/* Drawer Footer Actions */}
              <div className="p-6 border-t border-pink-100 bg-pink-50/40 space-y-4">
                
                {/* Book Appointment CTA */}
                <Link
                  to="/book-appointment"
                  onClick={() => setMenuOpen(false)}
                  className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-[#C57488] to-[#ab5b70] text-white text-xs font-bold uppercase tracking-wider text-center block shadow-md hover:shadow-lg transition flex items-center justify-center gap-2"
                >
                  <FiCalendar className="text-sm" />
                  <span>BOOK APPOINTMENT</span>
                </Link>

                {/* Quick Call & WhatsApp Buttons inside drawer */}
                <div className="grid grid-cols-2 gap-3 pt-1">
                  <a
                    href="tel:6380850488"
                    className="flex items-center justify-center gap-2 bg-white py-2.5 px-3 rounded-xl border border-pink-200 text-xs font-bold text-gray-700 hover:text-[#C57488] shadow-sm transition"
                  >
                    <FiPhone className="text-[#C57488]" />
                    <span>Call Us</span>
                  </a>
                  <a
                    href="https://wa.me/916380850488?text=Hello%20Skin%20Infinity%20%26%20Majesty!%20I%20would%20like%20to%20inquire%20about%20your%20beauty%20%26%20designer%20services%20and%20book%20an%20appointment."
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-center gap-2 bg-emerald-500 text-white py-2.5 px-3 rounded-xl text-xs font-bold shadow-sm hover:bg-emerald-600 transition"
                  >
                    <FaWhatsapp className="text-sm" />
                    <span>WhatsApp</span>
                  </a>
                </div>

                {/* Admin Portal Link */}
                <div className="pt-2 text-center border-t border-[#C57488]/10">
                  <Link
                    to="/admin/login"
                    onClick={() => setMenuOpen(false)}
                    className="text-[11px] font-semibold text-gray-500 hover:text-[#C57488] transition inline-flex items-center gap-1.5"
                  >
                    <FiUser className="text-xs" /> Admin Portal Login
                  </Link>
                </div>

              </div>

            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;

import React, { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { FiMenu, FiX, FiCalendar, FiUser, FiChevronDown } from 'react-icons/fi';
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
      <nav className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? 'glass-nav shadow-luxury py-3' : 'bg-white py-4'}`}>
        <div className="max-w-7xl mx-auto px-4 md:px-8 flex justify-between items-center">
          
          {/* Circular Logo Badge */}
          <Link to="/" className="flex items-center gap-2 sm:gap-3 group">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full overflow-hidden border-2 border-[#C57488] shadow-md bg-white shrink-0 group-hover:scale-105 transition-transform duration-300">
              <img 
                src="/logo.png" 
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
                    <button className="text-xs tracking-wider font-bold text-gray-700 hover:text-luxuryRoseGold transition-all flex items-center gap-1">
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
                    `text-xs tracking-wider font-bold transition-all relative py-1 ${
                      isActive
                        ? 'text-luxuryRoseGold border-b-2 border-luxuryRoseGold'
                        : 'text-gray-700 hover:text-luxuryRoseGold'
                    }`
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
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden text-2xl text-luxuryDark p-2 focus:outline-none"
          >
            {menuOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        {menuOpen && (
          <div className="lg:hidden bg-white border-t border-pink-100/80 px-6 py-6 space-y-3.5 shadow-2xl animate-fadeIn">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  `block text-xs font-bold tracking-wider uppercase transition-colors ${
                    isActive ? 'text-[#C57488]' : 'text-[#4A5568] hover:text-[#C57488]'
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
            
            <div className="pt-4 mt-2 border-t border-pink-100/80 flex flex-col gap-3">
              <Link
                to="/book-appointment"
                onClick={() => setMenuOpen(false)}
                className="w-full text-center bg-[#C57488] hover:bg-[#B35F74] text-white py-3.5 rounded-full text-xs font-bold tracking-wider uppercase shadow-md transition-all"
              >
                BOOK APPOINTMENT
              </Link>
              
              <Link
                to="/admin/login"
                onClick={() => setMenuOpen(false)}
                className="text-[11px] font-semibold text-gray-400 hover:text-[#C57488] text-center pt-1 transition flex items-center justify-center gap-1.5"
              >
                <FiUser className="text-xs" /> Admin Portal Login
              </Link>
            </div>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;

import React from 'react';
import { Link } from 'react-router-dom';
import { FiPhone, FiMapPin, FiClock, FiInstagram, FiFacebook, FiHeart, FiArrowUp } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#FFF4F7] text-gray-700 pt-14 pb-6 border-t border-pink-200">
      <div className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
        
        {/* Col 1: Brand Logo & Socials */}
        <div className="space-y-4">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full overflow-hidden border-2 border-[#C57488] shadow-md p-0.5 bg-white shrink-0 group-hover:scale-105 transition-transform duration-300">
              <img 
                src="/logo.png" 
                alt="Skin Infinity & Majesty" 
                className="w-full h-full object-cover rounded-full"
              />
            </div>
            <div>
              <span className="block font-serif-luxury text-base font-bold tracking-tight text-luxuryDark leading-none">
                SKIN INFINITY & MAJESTY
              </span>
              <span className="block text-[9px] font-semibold tracking-widest text-luxuryRoseGold uppercase mt-1">
                MAKEOVER & DESIGNER
              </span>
            </div>
          </Link>
          <p className="text-gray-600 text-xs leading-relaxed">
            Enhancing beauty with care, passion and professionalism.
          </p>
          <div className="flex items-center gap-2.5 pt-1">
            <a href="https://facebook.com" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full bg-white border border-pink-200 text-luxuryRoseGold hover:bg-luxuryRoseGold hover:text-white flex items-center justify-center transition shadow-sm">
              <FiFacebook className="text-sm" />
            </a>
            <a href="https://instagram.com/s.mahalakshmi74" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full bg-white border border-pink-200 text-luxuryRoseGold hover:bg-luxuryRoseGold hover:text-white flex items-center justify-center transition shadow-sm">
              <FiInstagram className="text-sm" />
            </a>
            <a href="https://wa.me/916380850488?text=Hello%20Skin%20Infinity%20%26%20Majesty!%20I%20would%20like%20to%20inquire%20about%20your%20beauty%20%26%20designer%20services%20and%20book%20an%20appointment." target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full bg-white border border-pink-200 text-emerald-600 hover:bg-emerald-600 hover:text-white flex items-center justify-center transition shadow-sm">
              <FaWhatsapp className="text-sm" />
            </a>
          </div>
        </div>

        {/* Col 2: Quick Links */}
        <div>
          <h4 className="font-serif-luxury text-sm font-bold text-luxuryDark mb-3 uppercase tracking-wider">
            QUICK LINKS
          </h4>
          <ul className="space-y-2 text-xs text-gray-600">
            <li><Link to="/" className="hover:text-luxuryRoseGold transition">Home</Link></li>
            <li><Link to="/about" className="hover:text-luxuryRoseGold transition">About Us</Link></li>
            <li><Link to="/services" className="hover:text-luxuryRoseGold transition">Services</Link></li>
            <li><Link to="/bridal" className="hover:text-luxuryRoseGold transition">Bridal</Link></li>
            <li><Link to="/gallery" className="hover:text-luxuryRoseGold transition">Gallery</Link></li>
            <li><Link to="/reviews" className="hover:text-luxuryRoseGold transition">Reviews</Link></li>
            <li><Link to="/contact" className="hover:text-luxuryRoseGold transition">Contact Us</Link></li>
          </ul>
        </div>

        {/* Col 3: Our Services */}
        <div>
          <h4 className="font-serif-luxury text-sm font-bold text-luxuryDark mb-3 uppercase tracking-wider">
            OUR SERVICES
          </h4>
          <ul className="space-y-1.5 text-xs text-gray-600">
            <li>Facial</li>
            <li>Hair Spa</li>
            <li>Aroma Oil Therapy</li>
            <li>Manicure & Pedicure</li>
            <li>Skin Lightening Chemical Peeling</li>
            <li>Microblading</li>
            <li>All Types of Hair Cuts</li>
            <li>Mehandi Service</li>
            <li>Blouse Stitching</li>
            <li>Aari Work</li>
            <li>Machine Embroidery Work</li>
          </ul>
        </div>

        {/* Col 4: Contact Info */}
        <div>
          <h4 className="font-serif-luxury text-sm font-bold text-luxuryDark mb-3 uppercase tracking-wider">
            CONTACT INFO
          </h4>
          <ul className="space-y-3 text-xs text-gray-600">
            <li className="flex items-start gap-2">
              <FiMapPin className="text-luxuryRoseGold shrink-0 mt-0.5 text-sm" />
              <a 
                href="https://maps.google.com/?q=Ramayanpatti,+Tirunelveli,+Tamil+Nadu+627358" 
                target="_blank" 
                rel="noreferrer" 
                className="hover:text-luxuryRoseGold transition underline decoration-pink-200"
              >
                Tirunelveli - Sankarankoil Rd, Ramayanpatti, Tirunelveli, Tamil Nadu 627358
              </a>
            </li>
            <li className="flex items-center gap-2">
              <FiPhone className="text-luxuryRoseGold text-sm shrink-0" />
              <a href="tel:6380850488" className="hover:text-luxuryRoseGold transition font-semibold">
                63808 50488
              </a>
            </li>
            <li className="flex items-start gap-2">
              <FiClock className="text-luxuryRoseGold text-sm shrink-0 mt-0.5" />
              <span>10:00 AM - 08:00 PM<br />(Sunday Holiday)</span>
            </li>
          </ul>
        </div>

        {/* Col 5: We Are Here Map Frame */}
        <div>
          <h4 className="font-serif-luxury text-sm font-bold text-luxuryDark mb-3 uppercase tracking-wider">
            WE ARE HERE
          </h4>
          <a 
            href="https://maps.google.com/?q=Ramayanpatti,+Tirunelveli,+Tamil+Nadu+627358" 
            target="_blank" 
            rel="noreferrer" 
            className="block rounded-xl overflow-hidden border border-pink-200 shadow-sm group relative"
          >
            <div className="h-28 w-full bg-slate-100 relative flex items-center justify-center overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=400" 
                alt="Map Location" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80"
              />
              <div className="absolute inset-0 bg-pink-900/10 backdrop-blur-[1px] flex items-center justify-center">
                <div className="w-8 h-8 rounded-full bg-rose-600 text-white flex items-center justify-center shadow-lg animate-bounce">
                  <FiMapPin className="text-base" />
                </div>
              </div>
            </div>
          </a>
        </div>

      </div>

      {/* Copyright Bar */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 mt-10 pt-4 border-t border-pink-200/80 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-gray-500">
        <p>© 2026 Skin Infinity & Majesty Makeover & Designer. All Rights Reserved.</p>
        <p className="flex items-center gap-1">
          Designed with <FiHeart className="text-rose-500 fill-rose-500 text-xs" /> by -Yuvasri Arumugasamy
        </p>
      </div>
    </footer>
  );
};

export default Footer;

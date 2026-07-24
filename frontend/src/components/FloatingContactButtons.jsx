import React from 'react';
import { FiPhone, FiMapPin } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';

const FloatingContactButtons = () => {
  return (
    <div className="fixed right-0 top-1/2 -translate-y-1/2 z-30 flex flex-col gap-3">
      <a 
        href="tel:6380850488" 
        className="bg-white/95 backdrop-blur border border-pink-200 text-luxuryRoseGold hover:bg-luxuryRoseGold hover:text-white px-3 py-2.5 rounded-l-2xl shadow-lg flex items-center gap-2 text-xs font-semibold transition-all group"
        title="Call Us"
      >
        <FiPhone className="text-base group-hover:scale-110 transition" />
        <span className="hidden sm:inline">Call Us</span>
      </a>
      <a 
        href="https://wa.me/916380850488?text=Hello%20Skin%20Infinity%20%26%20Majesty!%20I%20would%20like%20to%20inquire%20about%20your%20beauty%20%26%20designer%20services%20and%20book%20an%20appointment." 
        target="_blank" 
        rel="noreferrer"
        className="bg-emerald-500/95 text-white hover:bg-emerald-600 px-3 py-2.5 rounded-l-2xl shadow-lg flex items-center gap-2 text-xs font-semibold transition-all group"
        title="WhatsApp"
      >
        <FaWhatsapp className="text-base group-hover:scale-110 transition" />
        <span className="hidden sm:inline">WhatsApp</span>
      </a>
      <a 
        href="https://maps.google.com/?q=Ramayanpatti,+Tirunelveli,+Tamil+Nadu+627358" 
        target="_blank" 
        rel="noreferrer"
        className="bg-white/95 backdrop-blur border border-pink-200 text-rose-600 hover:bg-rose-600 hover:text-white px-3 py-2.5 rounded-l-2xl shadow-lg flex items-center gap-2 text-xs font-semibold transition-all group"
        title="Location"
      >
        <FiMapPin className="text-base group-hover:scale-110 transition" />
        <span className="hidden sm:inline">Location</span>
      </a>
    </div>
  );
};

export default FloatingContactButtons;

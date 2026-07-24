import React from 'react';
import { FiPhone, FiMapPin } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';

const FloatingContactButtons = () => {
  return (
    <div className="fixed right-4 bottom-6 z-50 flex flex-col gap-2.5 items-end">
      <a 
        href="tel:6380850488" 
        className="bg-white/95 backdrop-blur-md border border-pink-200 text-[#C57488] hover:bg-[#C57488] hover:text-white px-3.5 py-2.5 rounded-full shadow-xl flex items-center gap-2 text-xs font-bold transition-all group"
        title="Call Us"
      >
        <FiPhone className="text-base group-hover:scale-110 transition" />
        <span className="hidden sm:inline">Call Us</span>
      </a>
      <a 
        href="https://wa.me/916380850488?text=Hello%20Skin%20Infinity%20%26%20Majesty!%20I%20would%20like%20to%20inquire%20about%20your%20beauty%20%26%20designer%20services%20and%20book%20an%20appointment." 
        target="_blank" 
        rel="noreferrer"
        className="bg-emerald-500 text-white hover:bg-emerald-600 px-3.5 py-2.5 rounded-full shadow-xl flex items-center gap-2 text-xs font-bold transition-all group"
        title="WhatsApp"
      >
        <FaWhatsapp className="text-base group-hover:scale-110 transition" />
        <span className="hidden sm:inline">WhatsApp</span>
      </a>
      <a 
        href="https://maps.google.com/?q=Ramayanpatti,+Tirunelveli,+Tamil+Nadu+627358" 
        target="_blank" 
        rel="noreferrer"
        className="bg-white/95 backdrop-blur-md border border-pink-200 text-rose-600 hover:bg-rose-600 hover:text-white px-3.5 py-2.5 rounded-full shadow-xl flex items-center gap-2 text-xs font-bold transition-all group"
        title="Location"
      >
        <FiMapPin className="text-base group-hover:scale-110 transition" />
        <span className="hidden sm:inline">Location</span>
      </a>
    </div>
  );
};

export default FloatingContactButtons;

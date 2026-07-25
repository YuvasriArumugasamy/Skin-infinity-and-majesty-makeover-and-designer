import React from 'react';
import { FiPhone, FiMapPin } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';

const FloatingContactButtons = () => {
  return (
    <div
      className="fixed right-3 sm:right-4 top-1/2 -translate-y-1/2 z-30 flex flex-col gap-3 items-center [.mobile-menu-open_&]:hidden"
      role="complementary"
      aria-label="Quick contact buttons"
    >
      <a
        href="tel:6380850488"
        className="w-11 h-11 sm:w-12 sm:h-12 bg-white/95 backdrop-blur-md border border-pink-200 text-[#C57488] hover:bg-[#C57488] hover:text-white rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110 group"
        aria-label="Call Skin Infinity & Majesty: 63808 50488"
        title="Call Us"
      >
        <FiPhone className="text-base sm:text-lg group-hover:scale-110 transition" aria-hidden="true" />
      </a>
      <a
        href="https://wa.me/916380850488?text=Hello%20Skin%20Infinity%20%26%20Majesty!%20I%20would%20like%20to%20inquire%20about%20your%20beauty%20%26%20designer%20services%20and%20book%20an%20appointment."
        target="_blank"
        rel="noreferrer"
        className="w-11 h-11 sm:w-12 sm:h-12 bg-emerald-500 text-white hover:bg-emerald-600 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110 group"
        aria-label="Chat on WhatsApp with Skin Infinity & Majesty"
        title="WhatsApp"
      >
        <FaWhatsapp className="text-lg sm:text-xl group-hover:scale-110 transition" aria-hidden="true" />
      </a>
      <a
        href="https://maps.google.com/?q=Ramayanpatti,+Tirunelveli,+Tamil+Nadu+627358"
        target="_blank"
        rel="noreferrer"
        className="w-11 h-11 sm:w-12 sm:h-12 bg-white/95 backdrop-blur-md border border-pink-200 text-rose-600 hover:bg-rose-600 hover:text-white rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110 group"
        aria-label="View Skin Infinity & Majesty location on Google Maps"
        title="Location"
      >
        <FiMapPin className="text-base sm:text-lg group-hover:scale-110 transition" aria-hidden="true" />
      </a>
    </div>
  );
};

export default FloatingContactButtons;

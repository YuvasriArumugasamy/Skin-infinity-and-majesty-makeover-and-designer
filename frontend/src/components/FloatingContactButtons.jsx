import React from 'react';
import { FiPhone, FiMapPin, FiInstagram } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';

const FloatingContactButtons = () => {
  return (
    <div className="fixed right-3 bottom-6 z-40 flex flex-col gap-2.5 bg-white/80 backdrop-blur-md p-2 rounded-full border border-pink-200/80 shadow-xl">
      <a 
        href="tel:6380850488" 
        className="socialContainer containerCall w-11 h-11"
        title="Call Us"
      >
        <FiPhone className="socialIconSvg text-base" />
      </a>
      <a 
        href="https://instagram.com/s.mahalakshmi74" 
        target="_blank" 
        rel="noreferrer"
        className="socialContainer containerInsta w-11 h-11"
        title="Instagram"
      >
        <FiInstagram className="socialIconSvg text-base" />
      </a>
      <a 
        href="https://wa.me/916380850488?text=Hello%20Skin%20Infinity%20%26%20Majesty!%20I%20would%20like%20to%20inquire%20about%20your%20beauty%20%26%20designer%20services%20and%20book%20an%20appointment." 
        target="_blank" 
        rel="noreferrer"
        className="socialContainer containerWa w-11 h-11"
        title="WhatsApp"
      >
        <FaWhatsapp className="socialIconSvg text-base" />
      </a>
      <a 
        href="https://maps.google.com/?q=Ramayanpatti,+Tirunelveli,+Tamil+Nadu+627358" 
        target="_blank" 
        rel="noreferrer"
        className="socialContainer containerLoc w-11 h-11"
        title="Location"
      >
        <FiMapPin className="socialIconSvg text-base" />
      </a>
    </div>
  );
};

export default FloatingContactButtons;

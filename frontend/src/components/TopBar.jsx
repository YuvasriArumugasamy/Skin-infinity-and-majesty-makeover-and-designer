import React, { useState, useEffect } from 'react';
import { FiPhone, FiClock, FiMapPin, FiInstagram, FiFacebook } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';

const TopBar = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      icon: <FiMapPin className="text-[#C57488] text-sm shrink-0" />,
      text: "Tirunelveli - Sankarankoil Rd, Ramayanpatti, Tirunelveli, Tamil Nadu 627358"
    },
    {
      icon: <FiClock className="text-[#C57488] text-sm shrink-0" />,
      text: "10:00 AM - 08:00 PM (Sunday Holiday)"
    },
    {
      icon: <FiPhone className="text-[#C57488] text-sm shrink-0" />,
      text: "063808 50488",
      link: "tel:06380850488"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % (slides.length + 1));
    }, 3500);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <div className="bg-[#FFF0F4] text-gray-700 text-xs py-2.5 px-4 md:px-12 transition-all">
      <div className="max-w-7xl mx-auto">
        
        {/* Desktop View (lg and up): Full Row */}
        <div className="hidden lg:flex justify-between items-center gap-6">
          <div className="flex items-center gap-1.5 shrink-0">
            <FiMapPin className="text-[#C57488] text-sm shrink-0" />
            <span className="font-medium text-xs">
              Tirunelveli - Sankarankoil Rd, Ramayanpatti, Tirunelveli, Tamil Nadu 627358
            </span>
          </div>

          <div className="flex items-center gap-6 shrink-0">
            <div className="flex items-center gap-1.5">
              <FiClock className="text-[#C57488] text-sm shrink-0" />
              <span className="font-medium text-xs">
                10:00 AM - 08:00 PM (Sunday Holiday)
              </span>
            </div>

            <div className="flex items-center gap-1.5">
              <FiPhone className="text-[#C57488] text-sm shrink-0" />
              <a href="tel:06380850488" className="font-medium text-xs hover:text-[#C57488] transition">
                063808 50488
              </a>
            </div>

            <div className="flex items-center gap-4 border-l border-pink-200 pl-4">
              <a 
                href="https://instagram.com/s.mahalakshmi74" 
                target="_blank" 
                rel="noreferrer" 
                className="text-gray-600 hover:text-[#C57488] transition text-sm"
              >
                <FiInstagram />
              </a>
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noreferrer" 
                className="text-gray-600 hover:text-[#C57488] transition text-sm"
              >
                <FiFacebook />
              </a>
              <a 
                href="https://wa.me/916380850488" 
                target="_blank" 
                rel="noreferrer" 
                className="text-gray-600 hover:text-emerald-500 transition text-sm"
              >
                <FaWhatsapp />
              </a>
            </div>
          </div>
        </div>

        {/* Mobile View (under lg): Clean Auto-Rotating Slider */}
        <div className="flex lg:hidden items-center justify-center min-h-[2.5rem] py-1 overflow-hidden relative">
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`absolute inset-x-0 top-0 bottom-0 flex items-center justify-center gap-2 px-2 transition-all duration-700 transform ${
                currentSlide === index 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-4 pointer-events-none'
              }`}
            >
              {slide.icon}
              {slide.link ? (
                <a href={slide.link} className="font-medium text-[10px] sm:text-[11px] hover:text-[#C57488] transition text-center whitespace-normal leading-tight">
                  {slide.text}
                </a>
              ) : (
                <span className="font-medium text-[10px] sm:text-[11px] text-center whitespace-normal leading-tight">
                  {slide.text}
                </span>
              )}
            </div>
          ))}

          {/* Slide 4: Social Icons */}
          <div
            className={`absolute inset-x-0 top-0 bottom-0 flex items-center justify-center gap-6 transition-all duration-700 transform ${
              currentSlide === slides.length 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-4 pointer-events-none'
            }`}
          >
            <a 
              href="https://instagram.com/s.mahalakshmi74" 
              target="_blank" 
              rel="noreferrer" 
              className="text-gray-600 hover:text-[#C57488] transition text-base"
            >
              <FiInstagram />
            </a>
            <a 
              href="https://facebook.com" 
              target="_blank" 
              rel="noreferrer" 
              className="text-gray-600 hover:text-[#C57488] transition text-base"
            >
              <FiFacebook />
            </a>
            <a 
              href="https://wa.me/916380850488" 
              target="_blank" 
              rel="noreferrer" 
              className="text-gray-600 hover:text-emerald-500 transition text-base"
            >
              <FaWhatsapp />
            </a>
          </div>
        </div>

      </div>
    </div>
  );
};

export default TopBar;

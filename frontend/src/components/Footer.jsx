import React from 'react';
import { Link } from 'react-router-dom';
import { FiPhone, FiMapPin, FiClock, FiInstagram, FiHeart } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';

const Footer = () => {

  return (
    <footer className="relative bg-[#FFF4F7] text-gray-700 pt-14 pb-6 border-t border-pink-200">
      <div className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
        
        {/* Col 1: Brand Logo & Socials */}
        <div className="space-y-4">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full overflow-hidden border-2 border-[#C57488] shadow-md p-0.5 bg-white shrink-0 group-hover:scale-105 transition-transform duration-300">
              <img 
                src="/logo.webp" 
                alt="Skin Infinity & Majesty Beauty Salon & Designer Studio Logo Tirunelveli" 
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
            Best Beauty Salon, Hydra Facial Skin Care & Designer Aari Work Studio in Tirunelveli - Ramayanpatti by S. Mahalakshmi.
          </p>
          <div className="flex items-center gap-3 pt-2">
            <a 
              href="tel:6380850488" 
              className="socialContainer containerCall"
              title="Call Us"
            >
              <FiPhone className="socialIconSvg text-base" />
            </a>
            <a 
              href="https://instagram.com/s.mahalakshmi74" 
              target="_blank" 
              rel="noreferrer" 
              className="socialContainer containerInsta"
              title="Instagram"
            >
              <FiInstagram className="socialIconSvg text-base" />
            </a>
            <a 
              href="https://wa.me/916380850488?text=Hello%20Skin%20Infinity%20%26%20Majesty!%20I%20would%20like%20to%20inquire%20about%20your%20beauty%20%26%20designer%20services%20and%20book%20an%20appointment." 
              target="_blank" 
              rel="noreferrer" 
              className="socialContainer containerWa"
              title="WhatsApp"
            >
              <FaWhatsapp className="socialIconSvg text-base" />
            </a>
            <a 
              href="https://maps.google.com/?q=Ramayanpatti,+Tirunelveli,+Tamil+Nadu+627358" 
              target="_blank" 
              rel="noreferrer" 
              className="socialContainer containerLoc"
              title="Location"
            >
              <FiMapPin className="socialIconSvg text-base" />
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
          <div className="rounded-xl overflow-hidden border border-pink-200 shadow-sm h-32 relative">
            <iframe
              title="Skin Infinity & Majesty Location Map"
              src="https://maps.google.com/maps?q=Ramayanpatti%20Tirunelveli&t=&z=14&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              className="w-full h-full"
            ></iframe>
          </div>
          <a
            href="https://maps.google.com/?q=Ramayanpatti,+Tirunelveli,+Tamil+Nadu+627358"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 text-[11px] font-bold text-[#C57488] hover:text-[#B35F74] transition mt-2.5 uppercase tracking-wider"
          >
            <FiMapPin className="text-xs" /> Open Google Maps
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

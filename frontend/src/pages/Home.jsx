import React, { useState } from 'react';
import api from '../api/axios';
import { saveAppointmentToCloud } from '../api/cloudSync';

import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import { 
  FiPhone, FiCalendar, FiArrowRight, FiCheck, FiStar, 
  FiAward, FiHeart, FiShield, FiChevronLeft, FiChevronRight, FiMapPin, FiSliders 
} from 'react-icons/fi';
import { FaWhatsapp, FaLeaf } from 'react-icons/fa';
import { toast } from 'react-hot-toast';

const Home = () => {
  // Appointment Form state
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    service: '',
    date: '',
    time: ''
  });

  // Client Reviews state
  const reviews = [
    {
      name: 'Priya M.',
      quote: 'Excellent service! The staff is so professional and friendly. I loved my facial and hair spa experience.',
      rating: 5
    },
    {
      name: 'Anitha R.',
      quote: 'The bridal makeover for my wedding was stunning! S. Mahalakshmi ma’am gave me the exact look I dreamed of.',
      rating: 5
    },
    {
      name: 'Kavitha S.',
      quote: 'Best hydra facial in Tirunelveli! My skin feels refreshed, glowing, and completely rejuvenated.',
      rating: 5
    }
  ];
  const [currentReview, setCurrentReview] = useState(0);

  const handleNextReview = () => {
    setCurrentReview((prev) => (prev + 1) % reviews.length);
  };

  const handlePrevReview = () => {
    setCurrentReview((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const phoneClean = (formData.phone || '').replace(/\D/g, '');
    if (phoneClean.length < 10) {
      toast.error('Please enter a valid 10-digit mobile number!');
      return;
    }

    if (!formData.name) {
      toast.error('Please enter your name!');
      return;
    }

    // Save to localStorage for instant live sync across Admin Dashboard
    // Submit to Backend API (clean payload, no client-generated _id)
    const aptPayload = {
      customerName: formData.name,
      phone: phoneClean,
      email: '',
      category: 'Quick Booking',
      service: formData.service || 'General Beauty Care',
      date: formData.date || new Date().toISOString().split('T')[0],
      time: formData.time || '10:00 AM',
      notes: 'Submitted via Homepage Quick Booking'
    };

    try {
      const res = await api.post('/api/appointments', aptPayload);

      if (res.data?.data) {
        try {
          const existing = JSON.parse(localStorage.getItem('appointments') || '[]');
          localStorage.setItem('appointments', JSON.stringify([res.data.data, ...existing]));
        } catch (_) {}
      }
    } catch (_) {
      // If the server request fails, keep the booking locally for fallback
      try {
        const temp = { _id: 'temp-' + Date.now(), ...aptPayload, status: 'Pending', createdAt: new Date().toISOString() };
        const existing = JSON.parse(localStorage.getItem('appointments') || '[]');
        localStorage.setItem('appointments', JSON.stringify([temp, ...existing]));
      } catch (_) {}
    }

    // Save to Cloud Storage across all devices (non-blocking)
    saveAppointmentToCloud(aptPayload).catch(e => console.warn('Cloud sync background notice:', e));



    toast.success('Thank you! Your appointment request has been received.');
    setFormData({ name: '', phone: '', service: '', date: '', time: '' });
  };

  return (
    <div className="relative overflow-hidden bg-white text-gray-800">
      <SEO 
        title="Skin Infinity & Majesty | Best Beauty Salon, Skin Care & Designer Studio in Tirunelveli"
        description="Skin Infinity & Majesty by S. Mahalakshmi in Ramayanpatti, Tirunelveli. Premium Hydra Facial, Skin Care, Hair Spa, Microblading, Bridal HD Makeover & Designer Aari Work Studio."
        keywords="beauty salon Tirunelveli, skin care clinic Tirunelveli, hydra facial Tirunelveli, advance hydra facial Tirunelveli, microblading Tirunelveli, bridal makeover Tirunelveli, bridal HD makeup Tirunelveli, hair spa Tirunelveli, manicure pedicure Tirunelveli, aari work Tirunelveli, blouse stitching Tirunelveli, mehandi Tirunelveli, skin lightening chemical peeling Tirunelveli, beauty salon Ramayanpatti, S Mahalakshmi salon Tirunelveli, skin infinity majesty, beauty salon near me, bridal makeup near me, skin care near me, hair spa near me, facial near me"
        canonical="/"
        ogImage="/shop.webp"
        schema={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": ["BeautySalon", "HairSalon", "LocalBusiness"],
              "@id": "https://skininfinityandmajesty.com/#organization",
              "name": "Skin Infinity & Majesty Makeover and Designer Studio",
              "alternateName": "Skin Infinity & Majesty Tirunelveli",
              "url": "https://skininfinityandmajesty.com/",
              "logo": "https://skininfinityandmajesty.com/logo.webp",
              "image": "https://skininfinityandmajesty.com/shop.webp",
              "telephone": "+916380850488",
              "priceRange": "₹₹",
              "founder": {
                "@type": "Person",
                "name": "S. Mahalakshmi"
              },
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Tirunelveli - Sankarankoil Rd, Ramayanpatti",
                "addressLocality": "Tirunelveli",
                "addressRegion": "Tamil Nadu",
                "postalCode": "627358",
                "addressCountry": "IN"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": 8.7366,
                "longitude": 77.6978
              },
              "openingHoursSpecification": [
                {
                  "@type": "OpeningHoursSpecification",
                  "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
                  "opens": "10:00",
                  "closes": "20:00"
                }
              ],
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "5.0",
                "reviewCount": "128"
              }
            }
          ]
        }}
      />

      {/* 1. HERO SECTION WITH bg5.webp BACKGROUND */}
      <section 
        className="relative min-h-[85vh] lg:min-h-[90vh] bg-cover bg-no-repeat bg-[92%_top] sm:bg-[85%_center] lg:bg-center flex items-start sm:items-center pt-6 pb-12 sm:py-12 lg:py-20"
        style={{ backgroundImage: `url('/bg5.webp')` }}
      >
        {/* Soft, light gradient overlay - ensures text readability on left while keeping girl's face on right 100% sharp */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/90 via-pink-50/50 to-transparent sm:bg-gradient-to-r sm:from-white/80 sm:via-pink-50/40 sm:to-transparent"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 w-full">
          <div className="max-w-xl lg:max-w-2xl space-y-4 sm:space-y-5 text-center sm:text-left mx-auto sm:mx-0 flex flex-col items-center sm:items-start">
            
            {/* Animated Pill Tag */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="inline-flex items-center justify-center gap-2 px-4 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-pink-200/80 text-[#C57488] text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.2em] shadow-sm mx-auto sm:mx-0"
            >
              <FiStar className="text-amber-500 animate-pulse text-xs fill-amber-400" />
              <span>PROFESSIONAL BEAUTY & DESIGNER CARE</span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1 
              initial={{ opacity: 0, y: 45 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.3 }}
              className="text-3xl sm:text-5xl lg:text-6xl font-display-luxury font-bold text-[#2C2225] leading-tight tracking-tight text-center sm:text-left"
            >
              Enhance Your <span className="font-serif italic font-bold text-[#C57488] px-1 inline-block drop-shadow-[0_1px_3px_rgba(255,255,255,0.9)]">Beauty,</span><br />
              Reveal Your <span className="font-serif italic font-bold text-[#C57488] px-1 inline-block drop-shadow-[0_1px_3px_rgba(255,255,255,0.9)]">Confidence</span>
            </motion.h1>

            {/* Gold Divider */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.45 }}
              className="flex items-center justify-center sm:justify-start gap-2 my-1 text-amber-400"
            >
              <div className="w-10 h-[1.5px] bg-gradient-to-r from-amber-400 to-transparent"></div>
              <span className="text-xs">✦</span>
              <div className="w-14 h-[1.5px] bg-amber-400"></div>
              <span className="text-xs">✦</span>
              <div className="w-10 h-[1.5px] bg-gradient-to-l from-amber-400 to-transparent"></div>
            </motion.div>

            {/* Description Subtitle */}
            <motion.p 
              initial={{ opacity: 0, y: 35 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.55 }}
              className="text-gray-700 text-xs sm:text-sm md:text-base leading-relaxed max-w-lg font-medium text-center sm:text-left mx-auto sm:mx-0"
            >
              Experience world-class clinical skin care, HD bridal makeovers, and handcrafted Aari designer creations by certified experts in Tirunelveli.
            </motion.p>

            {/* Action Buttons */}
            <motion.div 
              initial={{ opacity: 0, y: 35 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.65 }}
              className="flex flex-wrap items-center justify-center sm:justify-start gap-3 pt-1"
            >
              <Link
                to="/book-appointment"
                className="bg-gradient-to-r from-[#C57488] to-[#ab5b70] hover:from-[#ab5b70] hover:to-[#8c3d52] text-white px-7 py-3 rounded-2xl text-xs font-bold tracking-wider shadow-md shadow-pink-200/80 hover:shadow-lg hover:scale-105 transition-all flex items-center gap-2 uppercase"
              >
                <FiCalendar className="text-sm" /> BOOK APPOINTMENT
              </Link>
              <Link
                to="/services"
                className="bg-white/90 backdrop-blur-md border border-[#C57488]/40 text-[#C57488] hover:bg-[#C57488] hover:text-white px-7 py-3 rounded-2xl text-xs font-bold tracking-wider transition-all flex items-center gap-2 uppercase shadow-sm"
              >
                EXPLORE SERVICES <FiArrowRight />
              </Link>
            </motion.div>

            {/* 4 Feature Badges at bottom of hero */}
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.75 }}
              className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 sm:gap-4 mt-12 sm:mt-20 pt-10 sm:pt-14 border-t border-pink-200/60 w-full"
            >
              {[
                { title: 'Certified Experts', desc: 'Beauty Specialist', icon: FiAward },
                { title: 'Premium Products', desc: 'Dermat-Approved', icon: FaLeaf },
                { title: 'Advanced Tech', desc: 'Latest Equipment', icon: FiSliders },
                { title: 'Hygienic & Safe', desc: 'Sanitized Studio', icon: FiShield }
              ].map((item, idx) => {
                const IconComponent = item.icon;
                return (
                  <motion.div 
                    key={idx} 
                    whileHover={{ scale: 1.05, y: -4 }}
                    className="bg-white/75 backdrop-blur-md p-3.5 sm:p-4 rounded-2xl border border-white/80 shadow-md flex items-center gap-3 group hover:shadow-xl hover:bg-white/95 transition-all duration-300"
                  >
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-pink-50 to-pink-100/90 text-[#C57488] border border-pink-200/60 flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:rotate-6 transition-all shadow-xs">
                      <IconComponent className="text-base" />
                    </div>
                    <div>
                      <h4 className="text-[11px] sm:text-xs font-bold text-gray-800 leading-tight">{item.title}</h4>
                      <p className="text-[9px] sm:text-[10px] text-gray-500 mt-0.5 font-medium">{item.desc}</p>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>

          </div>
        </div>
      </section>

      {/* 2. ABOUT US SECTION WITH shop3.webp & shop4.webp */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left: Overlapping Photo Collage with Animated Rotating Borders Directly Hugging Images */}
          <div className="lg:col-span-6 relative flex justify-center">
            <div className="relative w-full max-w-md">
              
              {/* Soft Ambient Luxury Glow behind the frames */}
              <div className="absolute -inset-4 bg-gradient-to-tr from-[#C57488]/30 via-amber-200/40 to-pink-200/40 rounded-[52px] rounded-tl-[112px] blur-2xl opacity-75"></div>

              {/* Main Photo (shop3.webp): Animated Rotating Conic Gradient Border Hugging Image Directly */}
              <div className="relative z-10 p-[4px] sm:p-[5px] rounded-[40px] rounded-tl-[100px] overflow-hidden shadow-[0_22px_50px_rgba(44,34,37,0.22)] group hover:shadow-[0_30px_60px_rgba(197,116,136,0.35)] transition-all duration-500">
                {/* Continuous 360-degree Rotating Conic Gradient Layer */}
                <div className="absolute -inset-[100%] bg-[conic-gradient(from_0deg,#F5D77F,#C57488,#E8A5BD,#F5D77F,#ab5b70,#F5D77F)] animate-spin-border"></div>

                {/* Direct Image Container with zero white padding */}
                <div className="relative z-10 w-full h-full rounded-[36px] rounded-tl-[96px] overflow-hidden">
                  <img 
                    src="/shop3.webp" 
                    alt="Skin Infinity Salon Interior" 
                    loading="lazy"
                    decoding="async"
                    className="w-full h-[380px] sm:h-[420px] object-cover group-hover:scale-[1.03] transition-transform duration-700"
                  />
                </div>
              </div>

              {/* Secondary Overlapping Photo (maha1.webp): Positioned lower with zero white ring border */}
              <div className="absolute -bottom-12 sm:-bottom-14 right-0 sm:-right-6 z-20 w-[58%] sm:w-3/5 p-[3.5px] sm:p-[4px] rounded-[30px] overflow-hidden shadow-[0_20px_45px_rgba(0,0,0,0.35)] group/sub hover:shadow-[0_25px_50px_rgba(197,116,136,0.5)] transition-all duration-500">
                {/* Continuous Rotating Conic Gradient Layer (Reverse direction) */}
                <div className="absolute -inset-[100%] bg-[conic-gradient(from_0deg,#C57488,#F5D77F,#E8A5BD,#C57488,#F5D77F,#C57488)] animate-spin-border-reverse"></div>

                {/* Direct Image Container with zero white padding */}
                <div className="relative z-10 w-full h-full rounded-[26px] overflow-hidden">
                  <img 
                    src="/maha1.webp" 
                    alt="S. Mahalakshmi Bridal Makeover" 
                    loading="lazy"
                    decoding="async"
                    className="w-full h-[180px] sm:h-[250px] object-cover object-top group-hover/sub:scale-[1.04] transition-transform duration-700"
                  />
                </div>
              </div>

              {/* Floating Badge: 10+ Years Experience */}
              <div className="absolute top-6 left-0 sm:-left-8 z-30 bg-gradient-to-r from-[#C57488] via-[#ab5b70] to-[#8c3d52] text-white px-4 py-3 sm:px-5 sm:py-4 rounded-2xl shadow-[0_10px_25px_rgba(197,116,136,0.4)] flex flex-col items-center justify-center text-center backdrop-blur-md border border-white/30">
                <span className="font-serif-luxury font-bold text-xl sm:text-3xl leading-none drop-shadow">10+</span>
                <span className="text-[9px] sm:text-[10px] font-medium tracking-wide uppercase mt-1 drop-shadow-sm">Years of<br />Experience</span>
              </div>

            </div>
          </div>

          {/* Right: Content & Counters */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <span className="text-[11px] font-bold tracking-[0.2em] text-[#C57488] uppercase">
                WELCOME TO
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif-luxury font-bold text-[#2C2225] mt-1">
                Skin Infinity & Majesty<br />Makeover & Designer
              </h2>
              
              {/* Decorative Ornamental Divider */}
              <div className="flex items-center gap-2 my-3 text-[#C57488]">
                <div className="w-12 h-0.5 bg-[#C57488]"></div>
                <span className="text-xs">◆</span>
                <div className="w-12 h-0.5 bg-[#C57488]"></div>
              </div>
            </div>

            <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
              At Skin Infinity & Majesty, we believe beauty is in the details. We offer a wide range of advanced beauty treatments and designer services to bring out the best in you.
            </p>

            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-gray-700 font-medium">
              {[
                'Professional & Certified Experts.',
                'Premium Quality Products.',
                'Advanced Technology.',
                'Personalized Beauty Solutions.'
              ].map((point, idx) => (
                <li key={idx} className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-pink-100 text-[#C57488] flex items-center justify-center shrink-0">
                    <FiCheck className="text-xs font-bold" />
                  </span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>

            <div>
              <Link
                to="/about"
                className="inline-flex items-center gap-2 bg-[#C57488] text-white px-7 py-3 rounded-full text-xs font-bold tracking-wider shadow-md hover:bg-[#B35F74] transition uppercase"
              >
                READ MORE ABOUT US <FiArrowRight />
              </Link>
            </div>

            {/* 4 Counter Cards Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-pink-100">
              {[
                { num: '1000+', label: 'Happy Clients' },
                { num: '50+', label: 'Beauty Services' },
                { num: '10+', label: 'Years Experience' },
                { num: '5★', label: 'Google Rating' }
              ].map((stat, i) => (
                <div key={i} className="p-3.5 rounded-xl bg-pink-50/50 border border-pink-100 text-center">
                  <h3 className="text-2xl font-serif-luxury font-bold text-[#C57488]">{stat.num}</h3>
                  <p className="text-[11px] font-semibold text-gray-600 mt-0.5">{stat.label}</p>
                </div>
              ))}
            </div>

          </div>

        </div>
      </section>

      {/* 3. EXPLORE OUR PREMIUM SERVICES SECTION */}
      <section className="py-20 bg-[#FAF3F5]">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          
          <div className="text-center max-w-xl mx-auto mb-14">
            <span className="text-[11px] font-bold tracking-[0.2em] text-[#C57488] uppercase">
              OUR SERVICES
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif-luxury font-bold text-[#2C2225] mt-1">
              Explore Our Premium Services
            </h2>
            <div className="flex items-center justify-center gap-2 my-3 text-[#C57488]">
              <div className="w-12 h-0.5 bg-[#C57488]"></div>
              <span className="text-xs">◆</span>
              <div className="w-12 h-0.5 bg-[#C57488]"></div>
            </div>
          </div>

          {/* 8 Circular/Arched Cards Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8">
            {[
              {
                title: 'Facial',
                subtitle: 'Glow & Shine',
                img: '/facial.webp'
              },
              {
                title: 'Hair Spa',
                subtitle: 'Nourish & Strengthen',
                img: '/hair spa.webp'
              },
              {
                title: 'Aroma Oil Therapy',
                subtitle: 'Relax & Rejuvenate',
                img: '/Aroma Oil Therapy.webp'
              },
              {
                title: 'Manicure & Pedicure',
                subtitle: 'Perfect Care',
                img: '/manicure & pedicure.webp'
              },
              {
                title: 'Skin Lightening Chemical Peeling',
                subtitle: 'Even & Bright Skin',
                img: '/skin lightening chemical peeling.webp'
              },
              {
                title: 'Microblading',
                subtitle: 'Perfect Your Brows',
                img: '/microblading.webp'
              },
              {
                title: 'All Types of Hair Cuts',
                subtitle: 'Style Your Hair',
                img: '/ChatGPT Image Jul 22, 2026, 11_17_44 AM.webp'
              },
              {
                title: 'Mehandi Service',
                subtitle: 'Art on Your Hands',
                img: '/Mehandi2.webp'
              }
            ].map((srv, idx) => (
              <motion.div 
                key={idx}
                whileHover={{ y: -6 }}
                className="bg-white rounded-3xl p-4 border border-pink-100 shadow-sm hover:shadow-xl transition-all text-center flex flex-col items-center group"
              >
                {/* Round Arched Image container */}
                <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-full overflow-hidden border-4 border-pink-100 p-1 group-hover:border-[#C57488] transition duration-500 mb-4 shadow-md">
                  <img 
                    src={srv.img} 
                    alt={srv.title} 
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover rounded-full group-hover:scale-110 transition duration-500"
                  />
                </div>
                <h3 className="font-serif-luxury text-sm sm:text-base font-bold text-[#2C2225] group-hover:text-[#C57488] transition">
                  {srv.title}
                </h3>
                <p className="text-[11px] text-gray-500 mt-1 font-medium">
                  {srv.subtitle}
                </p>
                <div className="flex items-center justify-center gap-1 mt-3 text-[#C57488]">
                  <span className="w-4 h-0.5 bg-pink-200 group-hover:bg-[#C57488] transition"></span>
                  <span className="text-[10px]">◆</span>
                  <span className="w-4 h-0.5 bg-pink-200 group-hover:bg-[#C57488] transition"></span>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              to="/services"
              className="inline-flex items-center gap-2 border-2 border-[#C57488] text-[#C57488] hover:bg-[#C57488] hover:text-white px-8 py-3 rounded-full text-xs font-bold tracking-wider transition uppercase"
            >
              VIEW ALL SERVICES <FiArrowRight />
            </Link>
          </div>

        </div>
      </section>

      {/* 4. WHY CHOOSE US? SECTION */}
      <section className="py-16 bg-[#C57488] text-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Header */}
            <div className="lg:col-span-4 space-y-2">
              <span className="text-[11px] font-bold tracking-[0.2em] text-pink-200 uppercase">
                WHY CHOOSE US?
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif-luxury font-bold leading-tight">
                Because You<br />Deserve the Best
              </h2>
              <div className="flex items-center gap-2 my-2 text-pink-200">
                <div className="w-12 h-0.5 bg-pink-200"></div>
                <span className="text-xs">◆</span>
                <div className="w-12 h-0.5 bg-pink-200"></div>
              </div>
            </div>

            {/* Right 5 Icon Badges */}
            <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 text-center">
              {[
                { title: 'Certified Experts', desc: 'Trained & experienced beauticians.', icon: FiAward },
                { title: 'Premium Products', desc: 'We use only high quality products.', icon: FaLeaf },
                { title: 'Advanced Equipment', desc: 'Latest technology for best results.', icon: FiSliders },
                { title: 'Hygienic & Safe', desc: 'Clean, sanitized & secure environment.', icon: FiShield },
                { title: 'Customer Satisfaction', desc: 'Our top priority is you!', icon: FiHeart }
              ].map((box, i) => {
                const IconComp = box.icon;
                return (
                  <div key={i} className="space-y-2 flex flex-col items-center">
                    <div className="w-14 h-14 rounded-full bg-white/10 backdrop-blur border border-white/30 flex items-center justify-center text-white text-2xl shadow-inner mb-1">
                      <IconComp />
                    </div>
                    <h3 className="font-serif-luxury text-xs font-bold leading-snug">{box.title}</h3>
                    <p className="text-[10px] text-pink-100 leading-tight">{box.desc}</p>
                  </div>
                );
              })}
            </div>

          </div>

        </div>
      </section>

      {/* 5. BEFORE & AFTER SECTION ("Real Results, Real Confidence") */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12">
            <div>
              <span className="text-[11px] font-bold tracking-[0.2em] text-[#C57488] uppercase">
                BEFORE & AFTER
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif-luxury font-bold text-[#2C2225] mt-1">
                Real Results, Real Confidence
              </h2>
              <div className="flex items-center gap-2 my-2 text-[#C57488]">
                <div className="w-12 h-0.5 bg-[#C57488]"></div>
                <span className="text-xs">◆</span>
                <div className="w-12 h-0.5 bg-[#C57488]"></div>
              </div>
            </div>

            <Link
              to="/gallery"
              className="bg-[#C57488] text-white px-7 py-3 rounded-full text-xs font-bold tracking-wider shadow hover:bg-[#B35F74] transition uppercase"
            >
              VIEW GALLERY
            </Link>
          </div>

          {/* Grid of Before/After Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: 'Hair Styling & Care',
                img: '/hair.webp'
              },
              {
                title: 'Hair Layer Cut & Styling',
                img: '/hair1.webp'
              },
              {
                title: 'Hair Transformation & Spa',
                img: '/hair2.webp'
              },
              {
                title: 'Facial Care',
                img: '/facial1.webp'
              },
              {
                title: 'Glowing Facial',
                img: '/facial2.webp'
              },
              {
                title: 'Bridal Makeover',
                img: '/marriage.webp'
              },
              {
                title: 'Bridal Styling',
                img: '/marriage1.webp'
              },
              {
                title: 'Bridal Transformation',
                img: '/marriage2.webp'
              },
              {
                title: 'Bridal Elegance',
                img: '/marriage3.webp'
              },
              {
                title: 'Bridal Beauty',
                img: '/marriage4.webp'
              },
              {
                title: 'Bridal Glow',
                img: '/marriage5.webp'
              }
            ].map((item, idx) => (
              <div key={idx} className="bg-pink-50/50 rounded-2xl overflow-hidden border border-pink-100 shadow-sm group">
                <div className="relative h-72 sm:h-80 md:h-[340px] overflow-hidden">
                  <img 
                    src={item.img} 
                    alt={item.title} 
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition duration-500"
                  />
                </div>
                <div className="p-4 text-center">
                  <h4 className="font-serif-luxury text-sm font-bold text-[#2C2225]">
                    {item.title}
                  </h4>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 6. CLIENT REVIEWS & BOOK APPOINTMENT DUAL SECTION */}
      <section className="py-20 bg-[#FAF3F5]">
        <div className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left: Testimonial Carousel */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <span className="text-[11px] font-bold tracking-[0.2em] text-[#C57488] uppercase">
                CLIENT REVIEWS
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif-luxury font-bold text-[#2C2225] mt-1">
                What Our Clients Say
              </h2>
              <div className="flex items-center gap-2 my-3 text-[#C57488]">
                <div className="w-12 h-0.5 bg-[#C57488]"></div>
                <span className="text-xs">◆</span>
                <div className="w-12 h-0.5 bg-[#C57488]"></div>
              </div>
            </div>

            <div className="relative bg-white p-8 rounded-3xl border border-pink-100 shadow-sm space-y-4">
              <span className="text-6xl text-pink-200 font-serif leading-none block select-none">
                “
              </span>
              <p className="text-gray-700 text-xs sm:text-sm leading-relaxed italic -mt-6">
                "{reviews[currentReview].quote}"
              </p>
              
              <div className="flex items-center gap-1 text-amber-400">
                {[...Array(reviews[currentReview].rating)].map((_, i) => (
                  <FiStar key={i} className="fill-amber-400 text-sm" />
                ))}
              </div>

              <h4 className="font-bold text-xs text-[#2C2225]">
                — {reviews[currentReview].name}
              </h4>

              <div className="flex items-center justify-between pt-4 border-t border-pink-100">
                <div className="flex items-center gap-2">
                  <button 
                    onClick={handlePrevReview}
                    className="w-8 h-8 rounded-full bg-pink-50 border border-pink-200 text-[#C57488] flex items-center justify-center hover:bg-[#C57488] hover:text-white transition"
                  >
                    <FiChevronLeft />
                  </button>
                  <button 
                    onClick={handleNextReview}
                    className="w-8 h-8 rounded-full bg-pink-50 border border-pink-200 text-[#C57488] flex items-center justify-center hover:bg-[#C57488] hover:text-white transition"
                  >
                    <FiChevronRight />
                  </button>
                </div>

                <Link
                  to="/reviews"
                  className="border border-[#C57488] text-[#C57488] hover:bg-[#C57488] hover:text-white px-5 py-2 rounded-full text-[11px] font-bold tracking-wider transition uppercase"
                >
                  VIEW ALL REVIEWS
                </Link>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-[#C57488]">
              {/* Background Bridal Image Wrapper */}
              <div className="relative">
                <img 
                  src="/bg3.webp" 
                  alt="Bridal Appointment Background" 
                  loading="lazy"
                  decoding="async"
                  className="w-full h-[280px] lg:h-[540px] object-cover object-right"
                />
                {/* Mobile-only Content Overlay on the pink gradient side */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#C57488]/90 via-[#C57488]/55 to-transparent p-6 sm:p-8 flex flex-col justify-center lg:hidden">
                  <span className="text-[9px] font-bold tracking-[0.25em] text-pink-200 uppercase mb-1.5 drop-shadow-sm">
                    BOOK YOUR APPOINTMENT
                  </span>
                  <h3 className="text-xl sm:text-2xl font-serif-luxury font-bold text-white leading-tight max-w-[65%] drop-shadow-md">
                    Your <span className="text-pink-100 italic font-serif-luxury font-medium">Beauty</span>, <br className="sm:hidden" /> Our <span className="text-pink-100 italic font-serif-luxury font-medium">Priority</span>
                  </h3>
                  <div className="w-12 h-[2px] bg-pink-300/50 mt-3.5 rounded-full"></div>
                </div>
              </div>
              <div className="relative lg:absolute lg:inset-0 bg-[#C57488] lg:bg-transparent lg:bg-gradient-to-r lg:from-[#C57488]/95 lg:via-[#C57488]/80 lg:to-transparent p-6 sm:p-10 flex flex-col justify-center lg:max-w-lg">
                
                <span className="hidden lg:block text-[10px] font-bold tracking-[0.2em] text-pink-200 uppercase">
                  BOOK YOUR APPOINTMENT
                </span>
                <h3 className="hidden lg:block text-2xl sm:text-3xl font-serif-luxury font-bold text-white mt-1 mb-6">
                  Your Beauty, Our Priority
                </h3>

                <form onSubmit={handleFormSubmit} className="space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input
                      type="text"
                      placeholder="Your Name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-lg text-xs bg-white text-gray-800 placeholder-gray-400 focus:outline-none shadow-sm"
                    />
                    <input
                      type="tel"
                      placeholder="Your Phone Number"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-lg text-xs bg-white text-gray-800 placeholder-gray-400 focus:outline-none shadow-sm"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <select
                      value={formData.service}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-lg text-xs bg-white text-gray-800 focus:outline-none shadow-sm"
                    >
                      <option value="">Select Service</option>
                      <option value="Facial">Facial & Glow Care</option>
                      <option value="Hair Spa">Hair Spa & Cuts</option>
                      <option value="Hydra Facial">Advance Hydra Facial</option>
                      <option value="Bridal">Bridal Makeover</option>
                      <option value="Microblading">Microblading</option>
                      <option value="Chemical Peeling">Chemical Peeling</option>
                      <option value="Mehandi">Mehandi Art</option>
                    </select>

                    <input
                      type="date"
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-lg text-xs bg-white text-gray-800 focus:outline-none shadow-sm"
                    />
                  </div>

                  <select
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-lg text-xs bg-white text-gray-800 focus:outline-none shadow-sm"
                  >
                    <option value="">Select Time Slot</option>
                    <option value="10:00 AM">10:00 AM - 12:00 PM</option>
                    <option value="12:00 PM">12:00 PM - 02:00 PM</option>
                    <option value="02:00 PM">02:00 PM - 04:00 PM</option>
                    <option value="04:00 PM">04:00 PM - 06:00 PM</option>
                    <option value="06:00 PM">06:00 PM - 08:00 PM</option>
                  </select>

                  <button
                    type="submit"
                    className="w-full bg-[#2C2225] hover:bg-black text-white py-3 rounded-lg text-xs font-bold tracking-wider shadow-lg transition flex items-center justify-center gap-2 uppercase mt-2"
                  >
                    BOOK APPOINTMENT NOW <FiArrowRight />
                  </button>
                </form>

              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 7. INSTAGRAM FEED SECTION */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
            <div>
              <span className="text-[11px] font-bold tracking-[0.2em] text-[#C57488] uppercase">
                FOLLOW US ON INSTAGRAM
              </span>
              <p className="text-xs font-semibold text-gray-600">@s.mahalakshmi74</p>
            </div>
            <a
              href="https://instagram.com/s.mahalakshmi74"
              target="_blank"
              rel="noreferrer"
              className="border border-[#C57488] text-[#C57488] hover:bg-[#C57488] hover:text-white px-6 py-2.5 rounded-full text-xs font-bold tracking-wider transition uppercase"
            >
              FOLLOW US
            </a>
          </div>

          {/* Row of 7 Photos */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
            {[
              '/shop1.webp',
              '/shop2.webp',
              '/bride1.webp',
              '/bride2.webp',
              '/ari work.webp',
              '/Machine embroider work.webp',
              '/shop.webp'
            ].map((img, idx) => (
              <a
                key={idx}
                href="https://instagram.com/s.mahalakshmi74"
                target="_blank"
                rel="noreferrer"
                className="block h-32 rounded-xl overflow-hidden border border-pink-100 group relative"
              >
                <img
                  src={img}
                  alt={`Instagram feed ${idx + 1}`}
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                />
                <div className="absolute inset-0 bg-[#C57488]/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center text-white">
                  <FiArrowRight className="text-xl" />
                </div>
              </a>
            ))}
          </div>

        </div>
      </section>

    </div>
  );
};

export default Home;

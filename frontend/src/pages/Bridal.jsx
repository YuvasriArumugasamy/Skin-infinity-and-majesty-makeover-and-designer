import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import { FiCheck, FiCalendar, FiAward, FiHeart, FiStar, FiUsers, FiClock, FiShield } from 'react-icons/fi';

const Bridal = () => {
  const packages = [
    {
      title: 'ENGAGEMENT MAKEUP',
      img: '/bride2.webp',
      features: [
        'HD Makeup',
        'Hairstyling',
        'False Lashes',
        'Jewellery Draping',
        'Draping (Saree / Lehenga)'
      ]
    },
    {
      title: 'BRIDAL MAKEUP',
      img: '/bride1.webp',
      popular: true,
      features: [
        'HD/Airbrush Makeup',
        'Hairstyling with Accessories',
        'False Lashes',
        'Jewellery Draping',
        'Draping (Saree / Lehenga)',
        'Hair Setting'
      ]
    },
    {
      title: 'RECEPTION MAKEUP',
      img: '/ChatGPT Image Jul 24, 2026, 09_03_32 PM.webp',
      features: [
        'HD Makeup',
        'Hairstyling',
        'False Lashes',
        'Jewellery Draping',
        'Draping (Saree / Gown)'
      ]
    },
    {
      title: 'PRE-BRIDAL CARE',
      img: '/ChatGPT Image Jul 24, 2026, 09_01_31 PM.webp',
      features: [
        'Facial',
        'Hair Spa',
        'Manicure & Pedicure',
        'Body Polishing',
        'Threading & Waxing'
      ]
    }
  ];

  return (
    <div className="bg-white">
      <SEO 
        title="Bridal Makeover, HD Makeup & Designer Aari Work Studio Tirunelveli | Skin Infinity & Majesty"
        description="Transform into a royal bride with S. Mahalakshmi. Luxury Bridal HD & Airbrush Makeup, Engagement Looks, Pre-Bridal Packages, and Custom Designer Aari Work Blouses in Tirunelveli."
        keywords="bridal makeover Tirunelveli, bridal HD makeup Ramayanpatti, airbrush makeup Tirunelveli, best bridal artist Tirunelveli, designer Aari blouse Tirunelveli, reception makeup, pre-bridal packages Tirunelveli"
        canonical="/bridal"
        ogImage="/bride1.webp"
        schema={{
          "@context": "https://schema.org",
          "@type": "Service",
          "name": "Luxury Bridal Makeover & Designer Studio",
          "provider": {
            "@type": "BeautySalon",
            "name": "Skin Infinity & Majesty Makeover and Designer Studio",
            "telephone": "+916380850488",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "Tirunelveli - Sankarankoil Rd, Ramayanpatti",
              "addressLocality": "Tirunelveli",
              "postalCode": "627358",
              "addressCountry": "IN"
            }
          },
          "serviceType": "Bridal Makeup & Designer Styling",
          "areaServed": "Tirunelveli, Tamil Nadu"
        }}
      />
      {/* 1. HERO BANNER SECTION WITH VIDEO BACKGROUND */}
      <section className="relative overflow-hidden min-h-[460px] sm:min-h-[520px] flex items-center justify-center border-b border-pink-100 py-16">
        {/* Background Video */}
        <video 
          autoPlay 
          loop 
          muted 
          playsInline 
          preload="metadata"
          className="absolute inset-0 w-full h-full object-cover z-0"
        >
          <source src="/ithu_than_crt_face_please_crt.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-[#1e1317]/65 z-10"></div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-20 max-w-7xl mx-auto px-4 md:px-8 text-center space-y-4"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/15 backdrop-blur-md border border-white/25 text-pink-200 text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.25em] shadow-lg">
            <FiStar className="text-amber-300 animate-pulse text-xs fill-amber-300" />
            <span>BRIDAL & MAKEOVER STUDIO</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display-luxury font-bold text-white leading-tight drop-shadow-lg tracking-tight">
            Bridal <span className="font-script text-5xl sm:text-6xl lg:text-7xl font-normal text-[#F5D77F] drop-shadow-[0_2px_10px_rgba(0,0,0,0.6)] px-1 inline-block transform -rotate-1">Services</span>
          </h1>

          <div className="flex items-center justify-center gap-2 my-2 text-amber-300">
            <div className="w-10 h-[1.5px] bg-gradient-to-r from-amber-300 to-transparent"></div>
            <span className="text-xs">✦</span>
            <div className="w-14 h-[1.5px] bg-amber-300"></div>
            <span className="text-xs">✦</span>
            <div className="w-10 h-[1.5px] bg-gradient-to-l from-amber-300 to-transparent"></div>
          </div>

          <p className="text-pink-100 text-xs sm:text-sm md:text-base max-w-xl mx-auto drop-shadow-md font-medium leading-relaxed">
            Exquisite HD Bridal Makeovers & Custom Designer Couture by Mrs. S. Mahalakshmi
          </p>

          <div className="pt-2">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-xs text-pink-200 font-semibold tracking-wider shadow-md">
              <Link to="/" className="hover:text-amber-300 transition">HOME</Link>
              <span className="text-amber-400">/</span>
              <span className="text-white font-bold">BRIDAL</span>
            </div>
          </div>
        </motion.div>
      </section>

      {/* 2. BRIDAL PACKAGES GRID SECTION */}
      <motion.section 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.7 }}
        className="py-20 bg-[#FAF3F5]"
      >
        <div className="max-w-7xl mx-auto px-4 md:px-8 space-y-12">
          
          <div className="text-center max-w-xl mx-auto">
            <span className="text-[11px] font-bold tracking-[0.2em] text-[#C57488] uppercase">EXCLUSIVE PACKAGES</span>
            <h2 className="text-3xl sm:text-4xl font-serif-luxury font-bold text-[#2C2225] mt-1">
              Bridal & Pre-Bridal Packages
            </h2>
            <div className="flex items-center justify-center gap-2 my-2 text-[#C57488]">
              <div className="w-12 h-0.5 bg-[#C57488]"></div>
              <span className="text-xs">◆</span>
              <div className="w-12 h-0.5 bg-[#C57488]"></div>
            </div>
          </div>

          {/* 4 Packages Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {packages.map((pkg, idx) => (
              <motion.div 
                key={idx} 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                whileHover={{ y: -6 }}
                className={`relative bg-white rounded-2xl overflow-hidden border ${
                  pkg.popular ? 'border-2 border-[#C57488] shadow-md' : 'border-pink-100/60 shadow-sm'
                } flex flex-col justify-between group hover:shadow-xl transition duration-300`}
              >
                {pkg.popular && (
                  <span className="absolute top-3 right-3 bg-[#C57488] text-white text-[9px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider z-10 shadow-sm">
                    MOST POPULAR
                  </span>
                )}

                <div className="h-52 sm:h-56 overflow-hidden relative">
                  <img src={pkg.img} alt={pkg.title} className="w-full h-full object-cover object-top group-hover:scale-105 transition duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent"></div>
                </div>

                <div className="p-6 pt-3 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h3 className="font-serif-luxury text-sm font-bold text-gray-800 text-center uppercase tracking-wide border-b border-pink-100 pb-2 mb-3">
                      {pkg.title}
                    </h3>

                    <ul className="space-y-2 text-xs text-gray-600 font-medium">
                      {pkg.features.map((feat, fIdx) => (
                        <li key={fIdx} className="flex items-center gap-2">
                          <span className="w-4 h-4 rounded-full bg-[#C57488]/10 text-[#C57488] flex items-center justify-center shrink-0">
                            <FiCheck className="text-[10px] font-bold" />
                          </span>
                          <span className="leading-tight">{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Link
                    to="/book-appointment"
                    className={`w-full text-center py-2.5 rounded-xl text-[11px] font-bold tracking-wider transition uppercase ${
                      pkg.popular 
                        ? 'bg-[#C57488] hover:bg-[#B35F74] text-white shadow-sm' 
                        : 'border border-pink-200 text-[#C57488] hover:bg-[#C57488] hover:text-white'
                    }`}
                  >
                    BOOK NOW
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </motion.section>

      {/* 3. SPLIT BOTTOM GRID SECTION */}
      <motion.section 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.7 }}
        className="py-16 bg-white border-t border-pink-100/50"
      >
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Left: Why Choose Us */}
            <div className="lg:col-span-4 space-y-6">
              <div>
                <span className="text-[11px] font-bold tracking-[0.2em] text-[#C57488] uppercase">WHY CHOOSE US FOR</span>
                <h3 className="text-2xl font-serif-luxury font-bold text-[#C57488] mt-1 leading-snug">
                  YOUR SPECIAL DAY?
                </h3>
                <div className="w-12 h-0.5 bg-[#C57488] mt-2"></div>
              </div>

              <div className="flex flex-col gap-4">
                {[
                  { title: 'Certified Cosmetologist & Expert', desc: 'Over 10+ years of professional bridal makeover experience.', icon: FiAward },
                  { title: 'Premium Products Only', desc: 'High-end dermatologically approved makeup brands for long-lasting glow.', icon: FiShield },
                  { title: 'Tailored Bridal Packages', desc: 'Customized packages designed specifically for your outfit & theme.', icon: FiHeart }
                ].map((item, i) => (
                  <motion.div 
                    key={i} 
                    whileHover={{ scale: 1.02 }}
                    className="p-4 rounded-xl bg-pink-50/40 border border-pink-100/60 flex items-start gap-3.5"
                  >
                    <div className="w-9 h-9 rounded-full bg-white text-[#C57488] border border-pink-100 flex items-center justify-center shrink-0 shadow-sm">
                      <item.icon className="text-base" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-gray-800">{item.title}</h4>
                      <p className="text-[11px] text-gray-500 mt-0.5 leading-snug">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Right: Book Consultation CTA Card */}
            <div className="lg:col-span-8 bg-gradient-to-br from-[#C57488] to-[#9e4a5e] text-white p-8 sm:p-10 rounded-3xl shadow-xl flex flex-col justify-between space-y-6 relative overflow-hidden">
              <div className="relative z-10 space-y-3">
                <span className="text-[11px] font-bold tracking-[0.25em] text-pink-200 uppercase">FREE CONSULTATION</span>
                <h3 className="text-2xl sm:text-3xl font-serif-luxury font-bold leading-snug">
                  Book Your Trial & Bridal Consultation Today
                </h3>
                <p className="text-xs sm:text-sm text-pink-100 max-w-lg leading-relaxed">
                  Let us create the perfect look for your wedding day. Schedule a private consultation with Mrs. S. Mahalakshmi and discuss your trial makeover, saree draping, and hairstyle preferences.
                </p>
              </div>

              <div className="relative z-10 pt-2 flex flex-wrap items-center gap-4">
                <Link
                  to="/book-appointment"
                  className="bg-white text-[#C57488] hover:bg-pink-50 px-8 py-3.5 rounded-full text-xs font-bold tracking-wider uppercase shadow-md transition"
                >
                  BOOK APPOINTMENT NOW
                </Link>
                <a
                  href="tel:6380850488"
                  className="border border-white/40 text-white hover:bg-white/10 px-6 py-3.5 rounded-full text-xs font-bold tracking-wider uppercase transition"
                >
                  CALL US: 63808 50488
                </a>
              </div>
            </div>

          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default Bridal;

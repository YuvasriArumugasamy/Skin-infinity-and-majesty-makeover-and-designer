import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiCheck, FiAward, FiHeart, FiStar, FiUsers, FiScissors } from 'react-icons/fi';

const Services = () => {
  const sections = [
    {
      title: 'SKIN CARE',
      cards: [
        {
          title: 'Facial',
          desc: 'Deep cleansing and nourishment for glowing, healthy skin.',
          img: '/facial.png',
          icon: FiHeart
        },
        {
          title: 'Advance Hydra Facial',
          desc: 'Advanced technology for deep hydration and skin rejuvenation.',
          img: '/advance hydrs facial.png',
          icon: FiAward
        },
        {
          title: 'Skin Lightening Chemical Peeling',
          desc: 'Reduce pigmentation and blemishes for a brighter, even-toned skin.',
          img: '/skin lightening chemical peeling.png',
          icon: FiAward
        },
        {
          title: 'Aroma Oil Therapy',
          desc: 'Relax your mind and body with essential oil therapy.',
          img: '/ChatGPT Image Jul 22, 2026, 11_17_31 AM.png',
          icon: FiHeart
        }
      ]
    },
    {
      title: 'HAIR CARE',
      cards: [
        {
          title: 'Hair Spa',
          desc: 'Nourish and strengthen your hair with deep conditioning.',
          img: '/hair spa.png',
          icon: FiScissors
        },
        {
          title: 'All Types of Hair Cuts',
          desc: 'Trendy and stylish hair cuts for women, men & kids.',
          img: '/ChatGPT Image Jul 22, 2026, 11_17_44 AM.png',
          icon: FiScissors
        }
      ]
    },
    {
      title: 'BODY & NAIL CARE',
      cards: [
        {
          title: 'Manicure & Pedicure',
          desc: 'Pamper your hands and feet with our relaxing manicure & pedicure.',
          img: '/manicure & pedicure.png',
          icon: FiHeart
        },
        {
          title: 'Microblading',
          desc: 'Semi-permanent eyebrow embroidery for natural, fuller brows.',
          img: '/microblading.png',
          icon: FiStar
        }
      ]
    }
  ];

  const designerCards = [
    {
      title: 'Mehandi Service',
      desc: 'Exquisite bridal & festive mehendi designs by professional artists.',
      img: '/ChatGPT Image Jul 22, 2026, 11_28_36 AM.png',
      icon: FiHeart
    },
    {
      title: 'Blouse Stitching & Aari Work',
      desc: 'Custom designer blouse stitching with intricate handcrafted Aari embroidery.',
      img: '/ari work.png',
      icon: FiAward
    },
    {
      title: 'Machine Embroidery Work',
      desc: 'Precision computer embroidery designs for blouses, sarees & lehengas.',
      img: '/Machine embroider work.png',
      icon: FiStar
    }
  ];

  return (
    <div className="bg-white">
      {/* 1. HERO BANNER SECTION WITH bg1.png BACKGROUND */}
      <section className="relative overflow-hidden min-h-[380px] sm:min-h-[440px] flex items-center justify-center border-b border-pink-200/60 py-16 mb-8 shadow-sm">
        {/* Background Image - bg2.png */}
        <div className="absolute inset-0 z-0 opacity-60">
          <img 
            src="/bg2.png" 
            alt="Services Banner Background" 
            className="w-full h-full object-cover object-center"
          />
        </div>
        
        {/* Luxury Soft Pink & Rose Gold Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-white/90 via-pink-50/70 to-white/60 z-10"></div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-20 max-w-4xl mx-auto px-4 md:px-8 text-center space-y-4"
        >
          <div className="inline-flex items-center gap-2 px-5 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-pink-200 text-[#C57488] text-[11px] font-bold uppercase tracking-[0.25em] shadow-sm">
            <FiStar className="text-amber-500 animate-pulse text-xs fill-amber-400" />
            <span>OUR EXPERT OFFERINGS</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-serif-luxury font-bold text-[#2C2225] drop-shadow-sm leading-tight">
            Our <span className="font-serif italic font-bold text-[#C57488] px-1 inline-block drop-shadow-[0_1px_3px_rgba(255,255,255,0.9)]">Services</span>
          </h1>

          {/* Luxury Rose Gold Ornament Divider */}
          <div className="flex items-center justify-center gap-2 my-1 text-[#C57488]">
            <div className="w-12 h-[1.5px] bg-[#C57488]"></div>
            <span className="text-xs">✦</span>
            <div className="w-16 h-[1.5px] bg-[#C57488]"></div>
            <span className="text-xs">✦</span>
            <div className="w-12 h-[1.5px] bg-[#C57488]"></div>
          </div>

          <p className="text-gray-700 text-xs sm:text-sm md:text-base max-w-xl mx-auto font-medium leading-relaxed">
            Experience premium clinical skin treatments, hair care, and designer services by certified experts.
          </p>

          <div className="pt-2">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-pink-200 text-xs text-gray-700 font-semibold tracking-wider shadow-sm">
              <Link to="/" className="hover:text-[#C57488] transition">HOME</Link>
              <span className="text-[#C57488]">/</span>
              <span className="text-[#C57488] font-bold">SERVICES</span>
            </div>
          </div>
        </motion.div>
      </section>

      {/* 2. SERVICES BY CATEGORY */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 md:px-8 space-y-20">
          
          {sections.map((sec, idx) => (
            <motion.div 
              key={idx} 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.7 }}
              className="space-y-8"
            >
              {/* Category Title */}
              <div className="flex flex-col items-center">
                <h2 className="text-lg font-bold text-[#C57488] tracking-widest uppercase flex items-center gap-3">
                  {sec.title}
                </h2>
                <div className="flex items-center gap-2 mt-1 text-[#C57488]/70">
                  <div className="w-8 h-[1px] bg-[#C57488]/40"></div>
                  <span className="text-[8px]">◆</span>
                  <div className="w-8 h-[1px] bg-[#C57488]/40"></div>
                </div>
              </div>

              {/* Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
                {sec.cards.map((card, cIdx) => (
                  <motion.div 
                    key={cIdx} 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: cIdx * 0.08 }}
                    whileHover={{ y: -6 }}
                    className="bg-[#FFF8FA] rounded-2xl overflow-hidden border border-pink-100/50 shadow-sm flex flex-col justify-between group hover:shadow-lg transition duration-300"
                  >
                    <div className="relative h-48 sm:h-52 overflow-hidden">
                      <img 
                        src={card.img} 
                        alt={card.title} 
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-500" 
                      />
                      {/* Floating Circle Icon */}
                      <div className="absolute -bottom-5 left-5 w-10 h-10 rounded-full bg-white border border-pink-100 flex items-center justify-center text-[#C57488] shadow-md z-10">
                        <card.icon className="text-base" />
                      </div>
                    </div>

                    <div className="p-6 pt-8 flex-1 flex flex-col justify-between space-y-4">
                      <div>
                        <h3 className="font-serif-luxury text-base font-bold text-gray-800 leading-snug">{card.title}</h3>
                        <p className="text-[11px] text-gray-500 mt-2 leading-relaxed">{card.desc}</p>
                      </div>
                      <div className="pt-2 border-t border-pink-50 flex justify-center">
                        <Link
                          to="/book-appointment"
                          className="w-full text-center border border-pink-200 text-[#C57488] hover:bg-[#C57488] hover:text-white py-2 rounded-xl text-[11px] font-bold tracking-wider transition uppercase"
                        >
                          BOOK NOW
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}

          {/* DESIGNER SERVICES CATEGORY WITH WHY CHOOSE US SIDEBAR */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.7 }}
            className="space-y-8"
          >
            {/* Category Title */}
            <div className="flex flex-col items-center">
              <h2 className="text-lg font-bold text-[#C57488] tracking-widest uppercase flex items-center gap-3">
                DESIGNER SERVICES
              </h2>
              <div className="flex items-center gap-2 mt-1 text-[#C57488]/70">
                <div className="w-8 h-[1px] bg-[#C57488]/40"></div>
                <span className="text-[8px]">◆</span>
                <div className="w-8 h-[1px] bg-[#C57488]/40"></div>
              </div>
            </div>

            {/* Split layout: Left cards, Right Sidebar */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Designer cards: 9 columns */}
              <div className="lg:col-span-9 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {designerCards.map((card, cIdx) => (
                  <motion.div 
                    key={cIdx} 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: cIdx * 0.08 }}
                    whileHover={{ y: -6 }}
                    className="bg-[#FFF8FA] rounded-2xl overflow-hidden border border-pink-100/50 shadow-sm flex flex-col justify-between group hover:shadow-lg transition duration-300"
                  >
                    <div className="relative h-48 sm:h-52 overflow-hidden">
                      <img 
                        src={card.img} 
                        alt={card.title} 
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-500" 
                      />
                      {/* Floating Circle Icon */}
                      <div className="absolute -bottom-5 left-5 w-10 h-10 rounded-full bg-white border border-pink-100 flex items-center justify-center text-[#C57488] shadow-md z-10">
                        <card.icon className="text-base" />
                      </div>
                    </div>

                    <div className="p-6 pt-8 flex-1 flex flex-col justify-between space-y-4">
                      <div>
                        <h3 className="font-serif-luxury text-base font-bold text-gray-800 leading-snug">{card.title}</h3>
                        <p className="text-[11px] text-gray-500 mt-2 leading-relaxed">{card.desc}</p>
                      </div>
                      <div className="pt-2 border-t border-pink-50 flex justify-center">
                        <Link
                          to="/book-appointment"
                          className="w-full text-center border border-pink-200 text-[#C57488] hover:bg-[#C57488] hover:text-white py-2 rounded-xl text-[11px] font-bold tracking-wider transition uppercase"
                        >
                          BOOK NOW
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Why Choose Us Sidebar: 3 columns */}
              <div className="lg:col-span-3">
                <div className="bg-pink-50/30 p-6 rounded-2xl border border-pink-100/80 flex flex-col justify-between shadow-sm">
                  <div>
                    <h3 className="font-serif-luxury text-base font-bold text-gray-800 text-center mb-4 pb-2 border-b border-pink-100">
                      Why Choose Us?
                    </h3>
                    
                    <ul className="space-y-3.5 text-xs text-gray-700 font-medium">
                      {[
                        'Professional & Certified Experts',
                        'Premium Quality Products',
                        'Advanced Technology',
                        'Hygienic & Safe Environment',
                        'Personalized Care',
                        'Customer Satisfaction'
                      ].map((item, i) => (
                        <li key={i} className="flex items-center gap-2.5">
                          <span className="w-4 h-4 rounded-full bg-[#C57488] text-white flex items-center justify-center shrink-0">
                            <FiCheck className="text-[10px] font-bold" />
                          </span>
                          <span className="leading-tight text-gray-600">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-8 pt-4 border-t border-pink-100">
                    <Link
                      to="/book-appointment"
                      className="block w-full text-center bg-[#C57488] hover:bg-[#B35F74] text-white py-3 rounded-xl text-xs font-bold tracking-wider uppercase shadow-md transition"
                    >
                      BOOK APPOINTMENT
                    </Link>
                  </div>
                </div>
              </div>

            </div>
          </motion.div>

        </div>
      </section>
    </div>
  );
};

export default Services;

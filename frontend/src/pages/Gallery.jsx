import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiStar, FiCheckCircle, FiAward, FiHeart, FiMaximize2, FiX, FiFilter } from 'react-icons/fi';

const Gallery = () => {
  const [filter, setFilter] = useState('All');
  const [selectedItem, setSelectedItem] = useState(null);

  const images = [
    { id: 1, title: 'Luxury Bridal Makeover', cat: 'Bridal', url: '/bride1.jpg', desc: 'Flawless HD Bridal Makeup & Signature Hair Styling' },
    { id: 2, title: 'Royal South Indian Bride', cat: 'Bridal', url: '/bride2.jpg', desc: 'Traditional Bridal Look with Antique Jewelry Match' },
    { id: 3, title: 'Advance Hydra Facial', cat: 'Skin Care', url: '/advance hydrs facial.png', desc: 'Deep Pore Cleansing, Exfoliation & Glow Hydration' },
    { id: 4, title: 'Skin Lightening & Chemical Peel', cat: 'Skin Care', url: '/skin lightening chemical peeling.png', desc: 'Dermat-Approved Pigmentation Care & Tone Renewal' },
    { id: 5, title: 'Radiant Skin Rejuvenation', cat: 'Skin Care', url: '/facial.png', desc: 'Signature Herbal & Glow Facial Therapy' },
    { id: 6, title: 'Botanical Hair Spa Therapy', cat: 'Hair Care', url: '/hair spa.png', desc: 'Deep Conditioning, Anti-Dandruff & Scalp Repair' },
    { id: 7, title: 'Handcrafted Aari Work Blouse', cat: 'Designer Services', url: '/ari work.png', desc: 'Intricate Zardosi, Beadwork & Peacock Motif Embroidery' },
    { id: 8, title: 'Precision Machine Embroidery', cat: 'Designer Services', url: '/Machine embroider work.png', desc: 'Custom Bridal & Designer Partywear Embroidery' },
    { id: 9, title: 'Microblading & Brow Design', cat: 'Beauty Care', url: '/microblading.png', desc: 'Semi-Permanent Eyebrow Shaping & Micro-Feathering' },
    { id: 10, title: 'Luxury Manicure & Pedicure', cat: 'Beauty Care', url: '/manicure & pedicure.png', desc: 'Relaxing Hand & Foot Spa with Cuticle Care' },
    { id: 11, title: 'Skin Infinity Studio Ambiance', cat: 'Salon Interior', url: '/shop1.png', desc: 'Modern, Private & Hygienic Facial & Spa Rooms' },
    { id: 12, title: 'Majesty Designer Boutique Lounge', cat: 'Salon Interior', url: '/shop3.png', desc: 'Bespoke Designer Fitting & Bridal Consultation Lounge' }
  ];

  const categories = ['All', 'Bridal', 'Skin Care', 'Hair Care', 'Beauty Care', 'Designer Services', 'Salon Interior'];

  const filtered = filter === 'All' ? images : images.filter(img => img.cat === filter);

  return (
    <div className="bg-[#FCF9FA] min-h-screen pb-20">
      
      {/* 1. HERO BANNER WITH VIDEO BACKGROUND & LUXURY CONTENT */}
      <section className="relative overflow-hidden min-h-[440px] sm:min-h-[500px] flex items-center justify-center border-b border-pink-200/60 py-16 mb-12 shadow-md">
        
        {/* Background Video */}
        <video 
          autoPlay 
          loop 
          muted 
          playsInline 
          className="absolute inset-0 w-full h-full object-cover z-0"
        >
          <source src="/ithu_yellam_vachi_oru_super_ah.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        
        {/* Rich Gradient Dark Overlay for contrast & luxury warmth */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#25171b]/80 via-[#2c1d22]/70 to-[#1e1317]/85 z-10"></div>

        <div className="relative z-20 max-w-5xl mx-auto px-4 md:px-8 text-center space-y-5">
          
          {/* Animated Glassmorphism Pill Tag */}
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-pink-200/40 text-pink-100 text-[11px] font-bold uppercase tracking-[0.25em] shadow-lg"
          >
            <FiStar className="text-amber-300 animate-pulse text-xs" />
            <span>PORTFOLIO & ROYAL SHOWCASE</span>
          </motion.div>

          {/* Main Stylish Title */}
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-3xl sm:text-5xl md:text-6xl font-serif-luxury font-bold text-white drop-shadow-xl tracking-tight leading-tight"
          >
            Where Beauty Becomes <br className="hidden sm:block"/>
            <span className="bg-gradient-to-r from-amber-200 via-rose-200 to-pink-200 bg-clip-text text-transparent italic font-serif">
              A Masterpiece
            </span>
          </motion.h1>

          {/* Luxury Gold Ornament Divider */}
          <div className="flex items-center justify-center gap-2 my-2 text-amber-300/90">
            <div className="w-12 sm:w-16 h-[1px] bg-gradient-to-r from-transparent to-amber-300"></div>
            <span className="text-xs">✦</span>
            <div className="w-20 sm:w-24 h-[1.5px] bg-amber-300"></div>
            <span className="text-xs">✦</span>
            <div className="w-12 sm:w-16 h-[1px] bg-gradient-to-l from-transparent to-amber-300"></div>
          </div>

          {/* Subtitle Content */}
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35 }}
            className="text-pink-100/90 text-xs sm:text-sm md:text-base max-w-2xl mx-auto font-light leading-relaxed drop-shadow"
          >
            Immerse yourself in real client transformations, radiant bridal makeovers, clinical skin care results, and bespoke hand-embroidery by <span className="font-semibold text-white">Skin Infinity & Majesty</span>.
          </motion.p>

          {/* Feature Highlights Badges */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="pt-3 flex flex-wrap justify-center items-center gap-3 sm:gap-6 text-[11px] font-semibold text-pink-100/90"
          >
            <span className="flex items-center gap-1.5 bg-black/40 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/15 shadow-sm">
              <FiCheckCircle className="text-amber-300 text-xs" /> 1000+ Happy Brides & Clients
            </span>
            <span className="flex items-center gap-1.5 bg-black/40 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/15 shadow-sm">
              <FiAward className="text-amber-300 text-xs" /> Certified Expert Care
            </span>
            <span className="flex items-center gap-1.5 bg-black/40 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/15 shadow-sm">
              <FiHeart className="text-amber-300 text-xs" /> 100% Satisfaction
            </span>
          </motion.div>

        </div>
      </section>

      {/* 2. GALLERY CONTAINER */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 space-y-10">

        {/* Stylish Category Filter Tabs */}
        <div className="flex flex-wrap justify-center items-center gap-2.5 sm:gap-3 bg-white p-3 rounded-2xl border border-pink-100 shadow-sm max-w-4xl mx-auto">
          <div className="hidden sm:flex items-center gap-1.5 text-xs font-bold text-[#C57488] pr-2 border-r border-pink-100">
            <FiFilter className="text-sm" /> FILTER:
          </div>
          {categories.map((cat) => {
            const count = cat === 'All' ? images.length : images.filter(i => i.cat === cat).length;
            const isActive = filter === cat;
            return (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`relative px-4 py-2 rounded-xl text-xs font-bold transition-all duration-300 flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-gradient-to-r from-[#C57488] to-[#ab5b70] text-white shadow-md shadow-pink-200/50 scale-[1.03]'
                    : 'bg-pink-50/50 text-gray-700 hover:bg-pink-100/60 hover:text-[#C57488]'
                }`}
              >
                <span>{cat}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-semibold ${
                  isActive ? 'bg-white/20 text-white' : 'bg-pink-100 text-[#C57488]'
                }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Gallery Image Grid with Animation */}
        <motion.div 
          layout
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
        >
          <AnimatePresence>
            {filtered.map((item) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                key={item.id}
                onClick={() => setSelectedItem(item)}
                className="group relative rounded-3xl overflow-hidden bg-white shadow-md hover:shadow-2xl transition-all duration-500 cursor-pointer border border-pink-100/80 flex flex-col h-[340px]"
              >
                {/* Image Container */}
                <div className="relative w-full h-[240px] overflow-hidden bg-pink-50/30">
                  <img 
                    src={item.url} 
                    alt={item.title} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out" 
                  />
                  
                  {/* Floating Category Badge */}
                  <span className="absolute top-3 left-3 bg-black/50 backdrop-blur-md text-amber-200 text-[10px] font-bold px-3 py-1 rounded-full border border-white/20 shadow-sm uppercase tracking-wider">
                    {item.cat}
                  </span>

                  {/* Hover Overlay with Expand Icon */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md text-white border border-white/40 flex items-center justify-center text-lg transform scale-75 group-hover:scale-100 transition-transform duration-300">
                      <FiMaximize2 />
                    </div>
                  </div>
                </div>

                {/* Card Content Details */}
                <div className="p-4 flex flex-col justify-between flex-grow bg-white">
                  <div>
                    <h3 className="font-serif-luxury font-bold text-sm text-gray-800 group-hover:text-[#C57488] transition-colors line-clamp-1">
                      {item.title}
                    </h3>
                    <p className="text-[11px] text-gray-500 mt-1 line-clamp-2 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                  <div className="pt-2 flex items-center justify-between border-t border-pink-50 text-[10px] font-bold text-[#C57488]">
                    <span>VIEW DETAILS</span>
                    <span>→</span>
                  </div>
                </div>

              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* 3. LIGHTBOX PREVIEW MODAL */}
        <AnimatePresence>
          {selectedItem && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedItem(null)}
              className="fixed inset-0 bg-black/85 backdrop-blur-md z-50 flex items-center justify-center p-4 sm:p-6"
            >
              <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-white max-w-4xl w-full rounded-3xl overflow-hidden shadow-2xl border border-pink-200 grid grid-cols-1 md:grid-cols-12 max-h-[90vh]"
              >
                {/* Left: Image */}
                <div className="md:col-span-7 bg-black flex items-center justify-center p-2 relative min-h-[300px] md:min-h-[450px]">
                  <img 
                    src={selectedItem.url} 
                    alt={selectedItem.title} 
                    className="max-h-[70vh] md:max-h-[80vh] w-full object-contain" 
                  />
                  <span className="absolute top-4 left-4 bg-black/60 text-amber-300 text-xs font-bold px-3 py-1 rounded-full border border-amber-300/30">
                    {selectedItem.cat}
                  </span>
                </div>

                {/* Right: Details & Action */}
                <div className="md:col-span-5 p-6 sm:p-8 flex flex-col justify-between bg-white relative">
                  
                  {/* Close button */}
                  <button
                    onClick={() => setSelectedItem(null)}
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 bg-pink-50 hover:bg-pink-100 p-2 rounded-full transition"
                  >
                    <FiX className="text-xl" />
                  </button>

                  <div className="space-y-4 pt-2">
                    <span className="text-[10px] font-bold tracking-widest text-[#C57488] uppercase bg-pink-50 px-2.5 py-1 rounded-md border border-pink-100">
                      SKIN INFINITY & MAJESTY
                    </span>
                    
                    <h2 className="text-2xl font-serif-luxury font-bold text-gray-800">
                      {selectedItem.title}
                    </h2>

                    <p className="text-xs sm:text-sm text-gray-600 leading-relaxed border-t border-b border-pink-100 py-3">
                      {selectedItem.desc}
                    </p>

                    <div className="space-y-2 text-xs text-gray-700">
                      <div className="flex items-center gap-2 text-[#C57488] font-semibold">
                        <FiCheckCircle /> <span>Professional Care by S. Mahalakshmi</span>
                      </div>
                      <div className="flex items-center gap-2 text-[#C57488] font-semibold">
                        <FiCheckCircle /> <span>100% Customized to Client Needs</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-6 space-y-3">
                    <Link
                      to="/contact"
                      onClick={() => setSelectedItem(null)}
                      className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-[#C57488] to-[#ab5b70] text-white text-xs font-bold uppercase tracking-wider text-center block shadow-md hover:shadow-lg hover:scale-[1.02] transition duration-300"
                    >
                      Book Appointment For This Service
                    </Link>
                    <button
                      onClick={() => setSelectedItem(null)}
                      className="w-full py-2 text-xs font-semibold text-gray-500 hover:text-gray-800 transition text-center"
                    >
                      Close Preview
                    </button>
                  </div>

                </div>

              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
};

export default Gallery;

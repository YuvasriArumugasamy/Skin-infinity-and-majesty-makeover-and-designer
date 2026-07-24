import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiAward, FiHeart, FiCheck, FiStar, FiUsers } from 'react-icons/fi';

const About = () => {
  return (
    <div>
      {/* 1. HERO BANNER WITH VIDEO BACKGROUND */}
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
          <source src="/nalla_d_video_ahh_panni_kudu.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        
        {/* Cinematic dark overlay for text readability */}
        <div className="absolute inset-0 bg-[#1e1317]/65 z-10"></div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-20 max-w-7xl mx-auto px-4 md:px-8 text-center space-y-4"
        >
          {/* Glassmorphism Sparkle Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/15 backdrop-blur-md border border-white/25 text-pink-200 text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.25em] shadow-lg">
            <FiStar className="text-amber-300 animate-pulse text-xs fill-amber-300" />
            <span>MEET OUR LUXURY STUDIO</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-display-luxury font-bold text-white leading-tight drop-shadow-lg tracking-tight">
            About <span className="font-script text-4xl sm:text-6xl lg:text-7xl font-normal text-[#F5D77F] drop-shadow-[0_2px_10px_rgba(0,0,0,0.6)] px-1 inline-block transform -rotate-1">Skin Infinity</span> & <span className="font-script text-4xl sm:text-6xl lg:text-7xl font-normal text-[#F5D77F] drop-shadow-[0_2px_10px_rgba(0,0,0,0.6)] px-1 inline-block transform -rotate-1">Majesty</span>
          </h1>

          {/* Gold Divider */}
          <div className="flex items-center justify-center gap-2 my-2 text-amber-300">
            <div className="w-10 h-[1.5px] bg-gradient-to-r from-amber-300 to-transparent"></div>
            <span className="text-xs">✦</span>
            <div className="w-14 h-[1.5px] bg-amber-300"></div>
            <span className="text-xs">✦</span>
            <div className="w-10 h-[1.5px] bg-gradient-to-l from-amber-300 to-transparent"></div>
          </div>

          {/* Subtitle */}
          <p className="text-pink-100 text-xs sm:text-sm md:text-base max-w-xl mx-auto drop-shadow-md font-medium leading-relaxed">
            Where Beauty Meets Elegance & Professional Care in Tirunelveli
          </p>

          {/* Glassmorphic Breadcrumb */}
          <div className="pt-2">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-xs text-pink-200 font-semibold tracking-wider shadow-md">
              <Link to="/" className="hover:text-amber-300 transition">HOME</Link>
              <span className="text-amber-400">/</span>
              <span className="text-white font-bold">ABOUT US</span>
            </div>
          </div>
        </motion.div>
      </section>

      {/* 2. MEET OUR FOUNDER SECTION */}
      <motion.section 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.7 }}
        className="py-20 bg-white relative overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left: Founder Photo with Overlapping Flower */}
            <motion.div 
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="lg:col-span-4 relative flex justify-center lg:justify-start"
            >
              {/* Overlapping Flower Image */}
              <img 
                src="/flower.png" 
                alt="Flower Decor" 
                className="absolute -left-12 sm:-left-16 top-1/2 -translate-y-1/2 w-36 sm:w-44 z-0 pointer-events-none mix-blend-multiply"
              />
              
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-pink-200/80 z-10 max-w-[280px] sm:max-w-xs bg-white">
                <img
                  src="/maha1.png"
                  alt="S. Mahalakshmi Founder"
                  className="w-full h-[360px] sm:h-[420px] object-cover object-center"
                />
              </div>
            </motion.div>

            {/* Center: Founder Story */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="lg:col-span-5 space-y-4 text-center lg:text-left"
            >
              <div>
                <span className="text-[11px] font-bold text-[#C57488] uppercase tracking-[0.2em]">MEET OUR FOUNDER</span>
                <h2 className="text-3xl sm:text-4xl font-serif-luxury font-bold text-[#C57488] mt-1">
                  S. Mahalakshmi
                </h2>
                <p className="text-[13px] text-gray-700 font-semibold tracking-wide mt-1">
                  Cosmetologist | Aesthetic | Aromatherapist
                </p>
                
                {/* Gold Divider */}
                <div className="flex items-center justify-center lg:justify-start gap-1 my-3 text-amber-500">
                  <div className="w-10 h-[1.5px] bg-amber-400"></div>
                  <span className="text-[10px]">✿</span>
                  <div className="w-10 h-[1.5px] bg-amber-400"></div>
                </div>
              </div>

              <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                With a passion for beauty and a commitment to excellence, Mrs. Mahalakshmi established Skin Infinity & Majesty to provide world-class beauty treatments and designer services under one roof. Her expertise and personalized approach ensure that every client leaves with confidence and satisfaction.
              </p>

              {/* Signature */}
              <p className="font-serif italic text-2xl text-[#C57488] pt-2 lg:pl-4">
                S. Mahalakshmi
              </p>
            </motion.div>

            {/* Right: Key highlights list */}
            <motion.div 
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="lg:col-span-3"
            >
              <div className="bg-pink-50/40 p-6 rounded-2xl border border-pink-100/80 flex flex-col gap-6">
                {[
                  { title: 'Certified & Experienced', subtitle: 'Beauty Expert', icon: FiAward },
                  { title: '10+ Years of', subtitle: 'Experience', icon: FiStar },
                  { title: '1000+ Happy', subtitle: 'Clients', icon: FiHeart },
                  { title: 'Passion, Perfection', subtitle: '& Personal Care', icon: FiUsers }
                ].map((item, i) => (
                  <motion.div 
                    key={i}
                    whileHover={{ scale: 1.04 }}
                    className="flex items-center gap-4"
                  >
                    <div className="w-10 h-10 rounded-full bg-white text-[#C57488] border border-pink-100 flex items-center justify-center shadow-sm shrink-0">
                      <item.icon className="text-lg" />
                    </div>
                    <div>
                      <h4 className="text-[11px] font-bold text-gray-800 leading-tight">{item.title}</h4>
                      <p className="text-[10px] text-gray-500 mt-0.5">{item.subtitle}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

          </div>
        </div>
      </motion.section>

      {/* 3. WHY CHOOSE US SECTION */}
      <motion.section 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.7 }}
        className="py-16 bg-[#FAF3F5] border-t border-b border-pink-100/50"
      >
        <div className="max-w-7xl mx-auto px-4 md:px-8 text-center">
          <span className="text-[11px] font-bold tracking-[0.2em] text-[#C57488] uppercase">WHY CHOOSE US?</span>
          <div className="flex items-center justify-center gap-1 my-2 text-[#C57488]">
            <div className="w-12 h-0.5 bg-[#C57488]"></div>
            <span className="text-xs">◆</span>
            <div className="w-12 h-0.5 bg-[#C57488]"></div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mt-10">
            {[
              { title: 'Professional Experts', desc: 'Trained & certified beauticians', icon: FiUsers },
              { title: 'Premium Products', desc: 'We use only high quality products', icon: FiAward },
              { title: 'Advanced Equipment', desc: 'Latest technology for best results', icon: FiAward },
              { title: 'Hygienic & Safe', desc: 'Clean, sanitized & secure environment', icon: FiCheck },
              { title: 'Personalized Care', desc: 'Tailored solutions for every client', icon: FiHeart },
              { title: 'Customer Satisfaction', desc: 'Your satisfaction is our priority', icon: FiStar }
            ].map((feature, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                whileHover={{ y: -5 }}
                className="bg-white p-5 rounded-2xl border border-pink-100/40 shadow-sm flex flex-col items-center text-center group hover:shadow-md transition duration-300"
              >
                <div className="w-10 h-10 rounded-full bg-pink-50 text-[#C57488] flex items-center justify-center mb-3 group-hover:scale-110 transition duration-300">
                  <feature.icon className="text-lg" />
                </div>
                <h4 className="font-serif-luxury text-xs font-bold text-gray-800 uppercase tracking-wide">
                  {feature.title}
                </h4>
                <p className="text-[10px] text-gray-500 mt-1.5 leading-snug">
                  {feature.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* 4. VISION & MISSION */}
      <motion.section 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.7 }}
        className="py-16 bg-[#FAF3F5]/30 border-b border-pink-100/50"
      >
        <div className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div 
            whileHover={{ y: -4 }}
            className="bg-white p-8 rounded-2xl border border-pink-100 shadow-sm space-y-3"
          >
            <h3 className="font-serif-luxury text-xl font-bold text-[#C57488]">OUR MISSION</h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              To provide affordable, high-quality, and personalized beauty and designer solutions using the latest technologies and premium products, enhancing our clients' natural beauty and self-confidence.
            </p>
          </motion.div>

          <motion.div 
            whileHover={{ y: -4 }}
            className="bg-white p-8 rounded-2xl border border-pink-100 shadow-sm space-y-3"
          >
            <h3 className="font-serif-luxury text-xl font-bold text-[#C57488]">OUR VISION</h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              To be Tirunelveli's most trusted and leading luxury makeover salon and designer studio, known for innovation, hygiene, customer satisfaction, and artistic perfection.
            </p>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
};

export default About;

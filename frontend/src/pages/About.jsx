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
          className="absolute inset-0 w-full h-full object-cover z-0"
        >
          <source src="/nalla_d_video_ahh_panni_kudu.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        
        {/* Cinematic dark overlay for text readability */}
        <div className="absolute inset-0 bg-[#2c2225]/55 z-10"></div>

        <div className="relative z-20 max-w-7xl mx-auto px-4 md:px-8 text-center space-y-4">
          <span className="text-xs font-bold tracking-widest text-pink-200 uppercase drop-shadow-sm">MEET OUR STUDIO</span>
          <h1 className="text-4xl md:text-5xl font-serif-luxury font-bold text-white drop-shadow-md">
            About Skin Infinity & Majesty
          </h1>
          <p className="text-pink-100 text-sm max-w-xl mx-auto drop-shadow-sm font-medium">
            Where Beauty Meets Elegance & Professional Care in Tirunelveli
          </p>
          <div className="text-xs text-pink-200 font-semibold tracking-wider">
            <Link to="/" className="hover:text-white transition">HOME</Link> / <span className="text-white">ABOUT US</span>
          </div>
        </div>
      </section>

      {/* 2. MEET OUR FOUNDER SECTION */}
      <section className="py-20 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left: Founder Photo with Overlapping Flower */}
            <div className="lg:col-span-4 relative flex justify-center lg:justify-start">
              {/* Overlapping Flower Image (Placed behind the photo container) */}
              <img 
                src="/flower.png" 
                alt="Flower Decor" 
                className="absolute -left-10 sm:-left-14 top-1/2 -translate-y-1/2 w-32 sm:w-40 z-0 pointer-events-none mix-blend-multiply"
              />
              
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-pink-200/80 z-10 max-w-[280px] sm:max-w-xs bg-white">
                <img
                  src="/ChatGPT Image Jul 22, 2026, 09_48_47 PM.png"
                  alt="S. Mahalakshmi Founder"
                  className="w-full h-[360px] sm:h-[420px] object-cover"
                />
              </div>
            </div>

            {/* Center: Founder Story */}
            <div className="lg:col-span-5 space-y-4 text-center lg:text-left">
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
            </div>

            {/* Right: Key highlights list */}
            <div className="lg:col-span-3">
              <div className="bg-pink-50/40 p-6 rounded-2xl border border-pink-100/80 flex flex-col gap-6">
                {[
                  { title: 'Certified & Experienced', subtitle: 'Beauty Expert', icon: FiAward },
                  { title: '10+ Years of', subtitle: 'Experience', icon: FiStar },
                  { title: '1000+ Happy', subtitle: 'Clients', icon: FiHeart },
                  { title: 'Passion, Perfection', subtitle: '& Personal Care', icon: FiUsers }
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-white text-[#C57488] border border-pink-100 flex items-center justify-center shadow-sm shrink-0">
                      <item.icon className="text-lg" />
                    </div>
                    <div>
                      <h4 className="text-[11px] font-bold text-gray-800 leading-tight">{item.title}</h4>
                      <p className="text-[10px] text-gray-500 mt-0.5">{item.subtitle}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. WHY CHOOSE US SECTION */}
      <section className="py-16 bg-[#FAF3F5] border-t border-b border-pink-100/50">
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
              <div key={i} className="bg-white p-5 rounded-2xl border border-pink-100/40 shadow-sm flex flex-col items-center text-center group hover:shadow-md transition duration-300">
                <div className="w-10 h-10 rounded-full bg-pink-50 text-[#C57488] flex items-center justify-center mb-3 group-hover:scale-110 transition duration-300">
                  <feature.icon className="text-lg" />
                </div>
                <h4 className="font-serif-luxury text-xs font-bold text-gray-800 uppercase tracking-wide">
                  {feature.title}
                </h4>
                <p className="text-[10px] text-gray-500 mt-1.5 leading-snug">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. VISION & MISSION */}
      <section className="py-16 bg-[#FAF3F5]/30 border-b border-pink-100/50">
        <div className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-8 rounded-2xl border border-pink-100 shadow-sm space-y-3">
            <h3 className="font-serif-luxury text-xl font-bold text-[#C57488]">OUR MISSION</h3>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
              To provide exceptional beauty treatments and designer services with innovation, care, and integrity while making every client feel beautiful and confident.
            </p>
          </div>
          <div className="bg-white p-8 rounded-2xl border border-pink-100 shadow-sm space-y-3">
            <h3 className="font-serif-luxury text-xl font-bold text-[#C57488]">OUR VISION</h3>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
              To be the most trusted luxury beauty destination in South Tamil Nadu, known for excellence, creativity, and 100% customer satisfaction in the beauty and designer studio industry.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;

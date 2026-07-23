import React from 'react';
import { Link } from 'react-router-dom';
import { FiCheck, FiCalendar, FiPlay, FiAward, FiHeart, FiStar, FiUsers, FiClock, FiShield } from 'react-icons/fi';

const Bridal = () => {
  const packages = [
    {
      title: 'ENGAGEMENT MAKEUP',
      img: '/bride2.jpg',
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
      img: '/bride1.jpg',
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
      img: '/bride2.jpg',
      features: [
        'HD Makeup',
        'Hairstyling',
        'False Lashes',
        'Jewellery Draping',
        'Draping (Saree / Gown)'
      ]
    },
    {
      title: 'COMPLETE BRIDAL PACKAGE',
      img: '/bride1.jpg',
      popular: true,
      features: [
        'Engagement Makeup',
        'Bridal Makeup',
        'Reception Makeup',
        'Hairstyling (3 Looks)',
        'Saree / Lehenga Draping',
        'Jewellery Draping',
        'Touch-up Makeup'
      ]
    }
  ];

  const transformations = [
    { before: '/shop1.png', after: '/bride1.jpg' },
    { before: '/shop2.png', after: '/bride2.jpg' },
    { before: '/shop3.png', after: '/bride1.jpg' },
    { before: '/shop4.png', after: '/bride2.jpg' }
  ];

  return (
    <div className="bg-white min-h-screen">
      
      {/* 1. HERO BANNER WITH bg1.png */}
      <section className="relative overflow-hidden min-h-[360px] sm:min-h-[460px] flex items-center justify-center border-b border-pink-100">
        <img 
          src="/bg1.png" 
          alt="Bridal Hero Background" 
          className="absolute inset-0 w-full h-full object-cover object-right sm:object-center z-0"
        />
        {/* Soft white-pink overlay for perfect readability on mobile & desktop */}
        <div className="absolute inset-0 bg-white/45 sm:bg-gradient-to-r sm:from-white/80 sm:via-white/50 sm:to-transparent z-10"></div>

        <div className="relative z-20 max-w-7xl mx-auto px-4 md:px-8 w-full">
          <div className="max-w-md sm:max-w-xl space-y-4 text-center sm:text-left">
            <h1 className="text-4xl md:text-5xl font-serif-luxury font-bold text-gray-900 leading-tight text-glow">
              Bridal <span className="text-[#C57488] italic font-serif-luxury font-medium">Beauty</span><br />
              That Makes You Shine
            </h1>
            
            {/* Gold Divider */}
            <div className="flex items-center justify-center sm:justify-start gap-1.5 text-amber-500 my-1">
              <div className="w-10 h-[1.5px] bg-amber-400"></div>
              <span className="text-[10px]">✿</span>
              <div className="w-10 h-[1.5px] bg-amber-400"></div>
            </div>

            <p className="text-gray-800 text-xs sm:text-sm leading-relaxed max-w-md text-glow font-semibold">
              Your special day deserves the perfect look. Our bridal makeup and styling services ensure you look radiant, elegant & unforgettable.
            </p>

            <Link
              to="/book-appointment"
              className="inline-flex items-center gap-2 bg-[#C57488] hover:bg-[#B35F74] text-white px-6 py-3.5 rounded-xl text-xs font-bold tracking-wider shadow transition uppercase mt-2"
            >
              <FiCalendar /> BOOK BRIDAL APPOINTMENT
            </Link>
          </div>
        </div>
      </section>

      {/* 2. BRIDAL PACKAGES */}
      <section className="py-16 bg-[#FFFDFE]">
        <div className="max-w-7xl mx-auto px-4 md:px-8 space-y-12">
          
          <div className="text-center">
            <h2 className="text-2xl sm:text-3xl font-serif-luxury font-bold text-[#C57488] tracking-wide">
              OUR BRIDAL PACKAGES
            </h2>
            <div className="flex items-center justify-center gap-2 mt-2 text-[#C57488]/70">
              <div className="w-12 h-0.5 bg-[#C57488]/30"></div>
              <span className="text-[10px]">◆</span>
              <div className="w-12 h-0.5 bg-[#C57488]/30"></div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {packages.map((pkg, idx) => (
              <div 
                key={idx} 
                className={`relative bg-[#FFF8FA] rounded-2xl overflow-hidden border ${
                  pkg.popular ? 'border-2 border-[#C57488] shadow-md' : 'border-pink-100/60 shadow-sm'
                } flex flex-col justify-between group hover:shadow-md transition duration-300`}
              >
                {pkg.popular && (
                  <span className="absolute top-3 right-3 bg-[#C57488] text-white text-[9px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider z-10 shadow-sm">
                    MOST POPULAR
                  </span>
                )}

                <div className="h-44 sm:h-48 overflow-hidden relative">
                  <img src={pkg.img} alt={pkg.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#FFF8FA] via-transparent to-transparent"></div>
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
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 3. SPLIT BOTTOM GRID SECTION */}
      <section className="py-16 bg-white border-t border-pink-100/50">
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
                  { title: 'Professional & Certified Bridal Experts', icon: FiAward },
                  { title: 'Premium Quality Products', icon: FiHeart },
                  { title: 'Personalized Look for Every Bride', icon: FiUsers },
                  { title: 'Advanced Techniques & Latest Trends', icon: FiStar },
                  { title: 'Hygienic & Safe Environment', icon: FiShield },
                  { title: 'Timely Service & Complete Satisfaction', icon: FiClock }
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3.5">
                    <div className="w-8 h-8 rounded-full bg-pink-50 text-[#C57488] flex items-center justify-center shrink-0">
                      <item.icon className="text-sm" />
                    </div>
                    <span className="text-xs text-gray-700 font-semibold leading-tight">{item.title}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Center: Transformation Video/Image */}
            <div className="lg:col-span-4 space-y-4">
              <div className="relative rounded-3xl overflow-hidden shadow-xl border-4 border-white group">
                <img 
                  src="/bride1.jpg" 
                  alt="Bridal Makeover Transformation" 
                  className="w-full h-[320px] object-cover group-hover:scale-102 transition duration-500"
                />
                {/* Play Button Overlay */}
                <div className="absolute inset-0 bg-[#2C2225]/30 flex flex-col items-center justify-center text-white p-6 text-center">
                  <div className="w-14 h-14 rounded-full bg-[#C57488]/90 text-white flex items-center justify-center shadow-2xl mb-4 group-hover:scale-110 transition duration-300 cursor-pointer">
                    <FiPlay className="text-xl fill-white ml-1" />
                  </div>
                  <h4 className="font-serif-luxury text-sm font-bold uppercase tracking-widest bg-[#C57488] px-4 py-1.5 rounded-full shadow-md mt-2">
                    BRIDAL MAKEUP TRANSFORMATION
                  </h4>
                </div>
              </div>
            </div>

            {/* Right: Transformations before/after */}
            <div className="lg:col-span-4 space-y-5">
              <div>
                <h3 className="text-lg font-serif-luxury font-bold text-[#C57488] uppercase tracking-wide flex items-center gap-2">
                  BRIDAL TRANSFORMATIONS
                </h3>
                <div className="w-12 h-0.5 bg-[#C57488] mt-1.5"></div>
              </div>

              {/* Before/After pairs grid */}
              <div className="grid grid-cols-2 gap-4">
                {transformations.map((pair, i) => (
                  <div key={i} className="relative rounded-2xl overflow-hidden border border-pink-100 shadow-sm flex flex-col">
                    <div className="grid grid-cols-2 h-20">
                      <div className="relative overflow-hidden border-r border-white">
                        <img src={pair.before} alt="Before" className="w-full h-full object-cover" />
                        <span className="absolute bottom-1 left-1 bg-black/60 text-white text-[8px] font-bold px-1.5 py-0.5 rounded uppercase">BEFORE</span>
                      </div>
                      <div className="relative overflow-hidden">
                        <img src={pair.after} alt="After" className="w-full h-full object-cover" />
                        <span className="absolute bottom-1 left-1 bg-[#C57488]/90 text-white text-[8px] font-bold px-1.5 py-0.5 rounded uppercase">AFTER</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-2 text-center">
                <Link
                  to="/gallery"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C57488] hover:text-[#B35F74] transition uppercase tracking-wider"
                >
                  VIEW MORE GALLERY <span>&gt;</span>
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 4. BOTTOM BANNER */}
      <section className="bg-[#C57488] text-white py-10">
        <div className="max-w-7xl mx-auto px-4 md:px-8 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
          <div className="flex items-center gap-4 flex-col sm:flex-row">
            <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center shrink-0 border border-white/20">
              <FiCheck className="text-xl text-white" />
            </div>
            <div>
              <h3 className="font-serif-luxury text-lg font-bold text-white leading-snug">
                Book Your Bridal Appointment Today!
              </h3>
              <p className="text-xs text-pink-100 mt-0.5">
                Let us make your special day even more beautiful.
              </p>
            </div>
          </div>

          <Link
            to="/book-appointment"
            className="bg-white text-[#C57488] hover:bg-pink-50 px-7 py-3.5 rounded-xl text-xs font-bold tracking-wider shadow transition uppercase shrink-0"
          >
            BOOK APPOINTMENT NOW
          </Link>
        </div>
      </section>

    </div>
  );
};

export default Bridal;

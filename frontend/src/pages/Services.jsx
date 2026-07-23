import React from 'react';
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
      title: 'BEAUTY CARE',
      cards: [
        {
          title: 'Manicure & Pedicure',
          desc: 'Perfect care for your hands and feet.',
          img: '/manicure & pedicure.png',
          icon: FiStar
        },
        {
          title: 'Mehendi Service',
          desc: 'Beautiful mehendi designs for every occasion.',
          img: '/ChatGPT Image Jul 22, 2026, 11_28_36 AM.png',
          icon: FiHeart
        },
        {
          title: 'Microblading',
          desc: 'Perfect eyebrows that enhance your natural beauty.',
          img: '/microblading.png',
          icon: FiStar
        }
      ]
    }
  ];

  const designerCards = [
    {
      title: 'Blouse Straight',
      desc: 'Professional blouse stitching with perfect finish.',
      img: '/ari work.png',
      icon: FiScissors
    },
    {
      title: 'Aari Work',
      desc: 'Exquisite aari work for traditional elegance.',
      img: '/ari work.png',
      icon: FiAward
    },
    {
      title: 'Machine Embroidery Work',
      desc: 'High-quality machine embroidery for all your needs.',
      img: '/Machine embroider work.png',
      icon: FiAward
    }
  ];

  return (
    <div className="bg-white min-h-screen">
      
      {/* 1. HERO BANNER WITH bg2.png */}
      <section className="relative overflow-hidden h-[300px] sm:h-[380px] flex items-center justify-center border-b border-pink-100">
        <img 
          src="/bg2.png" 
          alt="Services Hero Background" 
          className="absolute inset-0 w-full h-full object-cover object-center z-0"
        />
        {/* Soft pink overlay for better text contrast if needed */}
        <div className="absolute inset-0 bg-[#FFF5F7]/30 z-10"></div>

        <div className="relative z-20 max-w-4xl mx-auto px-4 text-center space-y-3">
          <h1 className="text-4xl sm:text-5xl font-serif-luxury font-bold text-[#2C2225] tracking-wide">
            OUR <span className="text-[#C57488]">SERVICES</span>
          </h1>
          
          {/* Gold Divider */}
          <div className="flex items-center justify-center gap-1.5 text-amber-500 my-1">
            <div className="w-10 h-[1.5px] bg-amber-400"></div>
            <span className="text-[10px]">✿</span>
            <div className="w-10 h-[1.5px] bg-amber-400"></div>
          </div>

          <p className="text-gray-700 font-serif italic text-base sm:text-lg">
            Beauty. Care. Perfection.
          </p>
          <p className="text-gray-600 text-xs sm:text-sm max-w-xl mx-auto leading-relaxed">
            We offer a wide range of premium beauty treatments and designer services to bring out the best in you.
          </p>
        </div>
      </section>

      {/* 2. SERVICES CATEGORIES LIST */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 md:px-8 space-y-16">
          
          {sections.map((sec, sIdx) => (
            <div key={sIdx} className="space-y-8">
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
                  <div key={cIdx} className="bg-[#FFF8FA] rounded-2xl overflow-hidden border border-pink-100/50 shadow-sm flex flex-col justify-between group hover:shadow-md transition duration-300">
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
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* DESIGNER SERVICES CATEGORY WITH WHY CHOOSE US SIDEBAR */}
          <div className="space-y-8">
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
                  <div key={cIdx} className="bg-[#FFF8FA] rounded-2xl overflow-hidden border border-pink-100/50 shadow-sm flex flex-col justify-between group hover:shadow-md transition duration-300">
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
                  </div>
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

                  <Link 
                    to="/book-appointment"
                    className="w-full bg-[#C57488] hover:bg-[#B35F74] text-white py-3 rounded-xl text-center text-xs font-bold tracking-wider shadow-sm transition uppercase mt-6 flex items-center justify-center gap-1.5"
                  >
                    BOOK APPOINTMENT
                  </Link>
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* 3. BOTTOM BANNER */}
      <section className="bg-[#FAF3F5] border-t border-pink-100 py-10">
        <div className="max-w-7xl mx-auto px-4 md:px-8 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
          <div className="flex items-center gap-4 flex-col sm:flex-row">
            <div className="w-12 h-12 rounded-2xl bg-pink-100 text-[#C57488] flex items-center justify-center shrink-0">
              <FiCheck className="text-xl" />
            </div>
            <div>
              <h3 className="font-serif-luxury text-lg font-bold text-gray-800 leading-snug">
                Book Your Appointment Today!
              </h3>
              <p className="text-[11px] text-gray-500 mt-0.5">
                Pamper yourself with our premium beauty & designer services.
              </p>
            </div>
          </div>

          <Link
            to="/book-appointment"
            className="bg-[#C57488] hover:bg-[#B35F74] text-white px-7 py-3.5 rounded-xl text-xs font-bold tracking-wider shadow-sm transition uppercase shrink-0"
          >
            BOOK APPOINTMENT NOW
          </Link>
        </div>
      </section>

    </div>
  );
};

export default Services;

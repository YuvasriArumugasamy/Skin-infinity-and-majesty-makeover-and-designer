import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  FiPhone, FiCalendar, FiArrowRight, FiCheck, FiStar, 
  FiAward, FiHeart, FiShield, FiSliders, FiChevronLeft, FiChevronRight, FiMapPin 
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

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) {
      toast.error('Please enter your name and phone number!');
      return;
    }
    toast.success('Thank you! Your appointment request has been received.');
    setFormData({ name: '', phone: '', service: '', date: '', time: '' });
  };

  return (
    <div className="relative overflow-hidden bg-white text-gray-800">

      {/* FLOATING STICKY CONTACT SIDEBAR ON RIGHT EDGE */}
      <div className="fixed right-0 top-1/2 -translate-y-1/2 z-40 flex flex-col gap-2 shadow-2xl">
        <a 
          href="tel:0638050488" 
          className="bg-white/90 backdrop-blur border border-pink-200 text-luxuryRoseGold hover:bg-luxuryRoseGold hover:text-white px-3 py-2.5 rounded-l-2xl shadow-lg flex items-center gap-2 text-xs font-semibold transition-all group"
        >
          <FiPhone className="text-base group-hover:scale-110 transition" />
          <span className="hidden sm:inline">Call Us</span>
        </a>
        <a 
          href="https://wa.me/91638050488" 
          target="_blank" 
          rel="noreferrer"
          className="bg-emerald-500/95 text-white hover:bg-emerald-600 px-3 py-2.5 rounded-l-2xl shadow-lg flex items-center gap-2 text-xs font-semibold transition-all group"
        >
          <FaWhatsapp className="text-base group-hover:scale-110 transition" />
          <span className="hidden sm:inline">WhatsApp</span>
        </a>
        <a 
          href="https://maps.google.com/?q=Ramayanpatti,+Tirunelveli,+Tamil+Nadu+627358" 
          target="_blank" 
          rel="noreferrer"
          className="bg-white/90 backdrop-blur border border-pink-200 text-rose-600 hover:bg-rose-600 hover:text-white px-3 py-2.5 rounded-l-2xl shadow-lg flex items-center gap-2 text-xs font-semibold transition-all group"
        >
          <FiMapPin className="text-base group-hover:scale-110 transition" />
          <span className="hidden sm:inline">Location</span>
        </a>
      </div>

      {/* 1. HERO SECTION WITH bg5.png BACKGROUND */}
      <section 
        className="relative min-h-[85vh] lg:min-h-[90vh] bg-cover bg-no-repeat bg-right lg:bg-center flex items-center py-12 lg:py-20"
        style={{ backgroundImage: `url('/bg5.png')` }}
      >
        {/* Soft gradient overlay for text readability on mobile */}
        <div className="absolute inset-0 bg-gradient-to-r from-pink-50/90 via-pink-50/70 to-transparent lg:via-transparent"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 w-full">
          <div className="max-w-xl lg:max-w-2xl space-y-6">
            
            <span className="inline-block text-[11px] font-bold tracking-[0.25em] text-[#C57488] uppercase">
              PROFESSIONAL BEAUTY CARE
            </span>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif-luxury font-bold text-[#2C2225] leading-tight">
              Enhance Your <span className="font-serif italic font-normal text-[#C57488]">Beauty,</span><br />
              Reveal Your <span className="font-serif italic font-normal text-[#C57488]">Confidence</span>
            </h1>

            <p className="text-gray-700 text-sm sm:text-base leading-relaxed max-w-lg">
              Experience premium beauty treatments and designer services by certified experts with the best technology.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                to="/book-appointment"
                className="bg-[#C57488] hover:bg-[#B35F74] text-white px-8 py-3.5 rounded-full text-xs font-bold tracking-wider shadow-lg hover:shadow-xl hover:scale-105 transition-all flex items-center gap-2 uppercase"
              >
                <FiCalendar className="text-sm" /> BOOK APPOINTMENT
              </Link>
              <Link
                to="/services"
                className="bg-white/90 backdrop-blur border border-[#C57488] text-[#C57488] hover:bg-[#C57488] hover:text-white px-8 py-3.5 rounded-full text-xs font-bold tracking-wider transition-all flex items-center gap-2 uppercase"
              >
                EXPLORE SERVICES <FiArrowRight />
              </Link>
            </div>

            {/* 4 Feature Badges at bottom of hero */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-8 border-t border-pink-200/80">
              {[
                { title: 'Certified Experts', icon: FiAward },
                { title: 'Premium Products', icon: FaLeaf },
                { title: 'Advanced Equipment', icon: FiSliders },
                { title: 'Hygienic & Safe', icon: FiShield }
              ].map((item, idx) => {
                const IconComponent = item.icon;
                return (
                  <div key={idx} className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-white/90 border border-pink-200 text-[#C57488] flex items-center justify-center shrink-0 shadow-sm">
                      <IconComponent className="text-base" />
                    </div>
                    <span className="text-xs font-bold text-[#2C2225] leading-tight">
                      {item.title}
                    </span>
                  </div>
                );
              })}
            </div>

          </div>
        </div>
      </section>

      {/* 2. ABOUT US SECTION WITH shop3.png & shop4.png */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left: Overlapping Photo Collage */}
          <div className="lg:col-span-6 relative flex justify-center">
            <div className="relative w-full max-w-md">
              {/* Main Arched Photo: shop3.png */}
              <div className="relative z-10 rounded-[40px] rounded-tl-[100px] overflow-hidden border-8 border-white shadow-2xl bg-pink-100">
                <img 
                  src="/shop3.png" 
                  alt="Skin Infinity Salon Interior" 
                  className="w-full h-[380px] sm:h-[420px] object-cover"
                />
              </div>

              {/* Secondary Overlapping Arched Photo: shop4.png */}
              <div className="absolute -bottom-8 right-0 sm:-right-8 z-20 w-[55%] sm:w-3/5 rounded-[30px] overflow-hidden border-4 sm:border-6 border-white shadow-2xl bg-pink-50">
                <img 
                  src="/shop4.png" 
                  alt="Beauty Technology Machine" 
                  className="w-full h-[180px] sm:h-[250px] object-cover"
                />
              </div>

              {/* Floating Badge: 10+ Years Experience */}
              <div className="absolute top-6 left-0 sm:-left-8 z-30 bg-[#C57488] text-white px-4 py-3 sm:px-5 sm:py-4 rounded-2xl shadow-xl flex flex-col items-center justify-center text-center">
                <span className="font-serif-luxury font-bold text-xl sm:text-3xl leading-none">10+</span>
                <span className="text-[9px] sm:text-[10px] font-medium tracking-wide uppercase mt-1">Years of<br />Experience</span>
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
                img: '/facial.png'
              },
              {
                title: 'Hair Spa',
                subtitle: 'Nourish & Strengthen',
                img: '/hair spa.png'
              },
              {
                title: 'Aroma Oil Therapy',
                subtitle: 'Relax & Rejuvenate',
                img: '/ChatGPT Image Jul 22, 2026, 11_17_31 AM.png'
              },
              {
                title: 'Manicure & Pedicure',
                subtitle: 'Perfect Care',
                img: '/manicure & pedicure.png'
              },
              {
                title: 'Skin Lightening Chemical Peeling',
                subtitle: 'Even & Bright Skin',
                img: '/skin lightening chemical peeling.png'
              },
              {
                title: 'Microblading',
                subtitle: 'Perfect Your Brows',
                img: '/microblading.png'
              },
              {
                title: 'All Types of Hair Cuts',
                subtitle: 'Style Your Hair',
                img: '/ChatGPT Image Jul 22, 2026, 11_17_44 AM.png'
              },
              {
                title: 'Mehandi Service',
                subtitle: 'Art on Your Hands',
                img: '/ChatGPT Image Jul 22, 2026, 11_28_36 AM.png'
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
                title: 'Facial Treatment',
                img: '/advance hydrs facial.png'
              },
              {
                title: 'Hair Spa',
                img: '/hair spa.png'
              },
              {
                title: 'Hair Cut & Style',
                img: '/ChatGPT Image Jul 22, 2026, 11_17_44 AM.png'
              },
              {
                title: 'Mehandi Design',
                img: '/ChatGPT Image Jul 22, 2026, 11_28_36 AM.png'
              }
            ].map((item, idx) => (
              <div key={idx} className="bg-pink-50/50 rounded-2xl overflow-hidden border border-pink-100 shadow-sm group">
                <div className="relative h-60 overflow-hidden">
                  <img 
                    src={item.img} 
                    alt={item.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end justify-center p-4">
                    <div className="w-9 h-9 rounded-full bg-white/90 text-[#2C2225] flex items-center justify-center font-bold text-xs shadow-lg">
                      VS
                    </div>
                  </div>
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
                  src="/bg3.png" 
                  alt="Bridal Appointment Background" 
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
              '/shop1.png',
              '/shop2.png',
              '/bride1.jpg',
              '/bride2.jpg',
              '/ari work.png',
              '/Machine embroider work.png',
              '/shop.png'
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

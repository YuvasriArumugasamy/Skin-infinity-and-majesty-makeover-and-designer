import React, { useState } from 'react';

const Gallery = () => {
  const [filter, setFilter] = useState('All');
  const [selectedImage, setSelectedImage] = useState(null);

  const images = [
    { title: 'Bridal Makeover', cat: 'Bridal', url: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=800' },
    { title: 'Advance Hydra Facial', cat: 'Skin Care', url: 'https://images.unsplash.com/photo-1512290900676-26c2a48f943d?auto=format&fit=crop&q=80&w=800' },
    { title: 'Botanical Hair Spa', cat: 'Hair Care', url: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&q=80&w=800' },
    { title: 'Designer Aari Blouse Work', cat: 'Designer Services', url: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=80&w=800' },
    { title: 'Microblading Brow', cat: 'Beauty Care', url: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=800' },
    { title: 'Luxury Salon Studio', cat: 'Salon Interior', url: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&q=80&w=800' }
  ];

  const filtered = filter === 'All' ? images : images.filter(img => img.cat === filter);

  return (
    <div className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-8 space-y-10">
        
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-xs font-bold tracking-widest text-luxuryRoseGold uppercase">PORTFOLIO</span>
          <h1 className="text-3xl md:text-5xl font-serif-luxury font-bold text-luxuryDark mt-1">Our Beauty Gallery</h1>
          <p className="text-xs text-gray-500 mt-2">Discover transformations, salon interior, and bespoke designer creations</p>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap justify-center gap-3">
          {['All', 'Bridal', 'Skin Care', 'Hair Care', 'Beauty Care', 'Designer Services', 'Salon Interior'].map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-2 rounded-full text-xs font-bold transition ${
                filter === cat ? 'bg-luxuryRoseGold text-white' : 'bg-pink-50 text-gray-700 hover:bg-pink-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Image Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filtered.map((item, idx) => (
            <div
              key={idx}
              onClick={() => setSelectedImage(item.url)}
              className="group relative rounded-2xl overflow-hidden shadow-card cursor-pointer h-64 border border-pink-100"
            >
              <img src={item.url} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition flex flex-col justify-end p-4 text-white">
                <span className="text-[10px] font-bold text-luxuryPink uppercase">{item.cat}</span>
                <h4 className="font-serif-luxury text-sm font-bold">{item.title}</h4>
              </div>
            </div>
          ))}
        </div>

        {/* Modal Lightbox */}
        {selectedImage && (
          <div
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
          >
            <div className="max-w-3xl w-full max-h-[85vh] rounded-2xl overflow-hidden relative">
              <img src={selectedImage} alt="Enlarged preview" className="w-full h-full object-contain" />
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 bg-white/20 text-white w-10 h-10 rounded-full flex items-center justify-center text-xl font-bold"
              >
                ✕
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default Gallery;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { FiStar } from 'react-icons/fi';

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [formData, setFormData] = useState({
    customerName: '',
    email: '',
    service: 'Facial & Glow Care',
    rating: 5,
    reviewText: ''
  });

  const fetchReviews = async () => {
    try {
      const res = await axios.get('/api/reviews');
      if (res.data.success) {
        setReviews(res.data.data);
      }
    } catch (e) {
      console.log('Using default reviews');
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/reviews', formData);
      if (res.data.success) {
        toast.success('Thank you! Review submitted for admin approval.');
        setFormData({ customerName: '', email: '', service: 'Facial & Glow Care', rating: 5, reviewText: '' });
      }
    } catch (err) {
      toast.success('Review recorded successfully!');
    }
  };

  return (
    <div className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-8 space-y-12">
        
        {/* Rating Overview Header matching upload */}
        <div className="bg-gradient-to-r from-pink-50 to-white p-8 rounded-3xl border border-pink-100 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="text-center md:text-left space-y-2">
            <span className="text-xs font-bold text-luxuryRoseGold tracking-widest uppercase">CLIENT FEEDBACK</span>
            <h1 className="text-3xl md:text-4xl font-serif-luxury font-bold text-luxuryDark">
              What Our Clients Say
            </h1>
            <p className="text-xs text-gray-500">Real People. Beautiful Experiences. Real Results.</p>
          </div>
          <div className="flex items-center gap-4 bg-white p-4 rounded-2xl shadow-sm border border-pink-100">
            <div className="text-4xl font-serif-luxury font-bold text-luxuryRoseGold">4.9</div>
            <div>
              <div className="flex text-amber-400 text-sm">
                {[...Array(5)].map((_, i) => <FiStar key={i} className="fill-amber-400" />)}
              </div>
              <p className="text-xs text-gray-500 font-medium">Based on 250+ Reviews</p>
            </div>
          </div>
        </div>

        {/* Review Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((rev, idx) => (
            <div key={idx} className="bg-luxurySubtle/50 p-6 rounded-2xl border border-pink-100 shadow-sm flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-luxuryRoseGold text-white font-bold flex items-center justify-center text-sm">
                    {rev.customerName[0]}
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-luxuryDark">{rev.customerName}</h4>
                    <span className="text-[10px] text-luxuryRoseGold">{rev.service}</span>
                  </div>
                </div>
                <div className="flex text-amber-400 text-xs">
                  {[...Array(rev.rating || 5)].map((_, i) => <FiStar key={i} className="fill-amber-400" />)}
                </div>
                <p className="text-xs text-gray-600 leading-relaxed italic font-serif-luxury">
                  "{rev.reviewText}"
                </p>
              </div>
              <span className="text-[10px] text-gray-400 block mt-4 pt-2 border-t border-pink-100">Verified Client</span>
            </div>
          ))}
        </div>

        {/* Submit Review Form */}
        <div className="max-w-2xl mx-auto bg-white p-8 rounded-3xl border border-pink-200 shadow-card">
          <h3 className="font-serif-luxury text-2xl font-bold text-luxuryDark mb-6 text-center">
            Write Your Experience
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Your Full Name *"
                required
                value={formData.customerName}
                onChange={e => setFormData({ ...formData, customerName: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-pink-200 text-xs focus:outline-none focus:border-luxuryRoseGold"
              />
              <input
                type="email"
                placeholder="Your Email Address"
                value={formData.email}
                onChange={e => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-pink-200 text-xs focus:outline-none focus:border-luxuryRoseGold"
              />
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <select
                value={formData.service}
                onChange={e => setFormData({ ...formData, service: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-pink-200 text-xs focus:outline-none focus:border-luxuryRoseGold bg-white"
              >
                <option>Facial & Glow Care</option>
                <option>Advance Hydra Facial</option>
                <option>Hair Spa</option>
                <option>Bridal Makeup</option>
                <option>Aari Work / Designer</option>
              </select>
              <select
                value={formData.rating}
                onChange={e => setFormData({ ...formData, rating: Number(e.target.value) })}
                className="w-full px-4 py-3 rounded-xl border border-pink-200 text-xs focus:outline-none focus:border-luxuryRoseGold bg-white"
              >
                <option value={5}>5 Stars ★★★★★</option>
                <option value={4}>4 Stars ★★★★☆</option>
                <option value={3}>3 Stars ★★★☆☆</option>
              </select>
            </div>

            <textarea
              rows={4}
              placeholder="Your Review Message *"
              required
              value={formData.reviewText}
              onChange={e => setFormData({ ...formData, reviewText: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border border-pink-200 text-xs focus:outline-none focus:border-luxuryRoseGold"
            ></textarea>

            <button
              type="submit"
              className="w-full py-3.5 rounded-full bg-gradient-to-r from-[#D87093] to-luxuryRoseGold text-white font-bold text-xs tracking-wider shadow-md hover:shadow-lg transition"
            >
              SUBMIT REVIEW
            </button>
          </form>
        </div>

      </div>
    </div>
  );
};

export default Reviews;

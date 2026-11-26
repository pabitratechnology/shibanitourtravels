import React, { useState, useEffect } from 'react';
import { Testimonial } from '../types';
import { Sparkles, Star, Quote, Heart, ArrowRight, User, CheckCircle, ChevronRight, Home } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function TestimonialsPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Submit Review state
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const fetchReviews = () => {
    fetch('/api/testimonials')
      .then((res) => res.json())
      .then((data) => {
        setTestimonials(data);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !comment) {
      alert('Please fill out your name and experience feedback comment.');
      return;
    }

    setSubmitting(true);
    fetch('/api/testimonials', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, location: location || 'Guest Traveler', rating, comment, avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=150' })
    })
      .then((res) => res.json())
      .then((data) => {
        setSubmitting(false);
        setSuccess(true);
        setName('');
        setLocation('');
        setComment('');
        setRating(5);
        fetchReviews(); // refresh
        setTimeout(() => setSuccess(false), 4000);
      })
      .catch((err) => {
        console.error('Failed to post testimonial:', err);
        setSubmitting(false);
      });
  };

  return (
    <div className="bg-[#FAFDFB] min-h-screen text-slate-800 font-sans">
      
      {/* ══ FULL SCREEN ADVANCED BRAND HERO SHOWCASE ══ */}
      <div className="relative min-h-[50vh] flex flex-col justify-between pt-[104px] pb-12 overflow-hidden text-white bg-gradient-to-r from-[#00381B] via-[#004D26] to-[#00381B]">
        <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
          <img
            src="/banners/chilika_lake.png"
            alt="Client Testimonials"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-[3px]"
          style={{ background: 'linear-gradient(to right, transparent, #006837 30%, #D32F2F 50%, #006837 70%, transparent)' }} />

        {/* Top Breadcrumb Navigation */}
        <div className="max-w-7xl mx-auto w-full relative z-10 px-4 sm:px-6 lg:px-8 pt-2 pb-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs font-semibold text-green-100 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/15 shadow-sm">
              <button onClick={() => window.location.href = '/'} className="flex items-center gap-1.5 hover:text-white transition-colors">
                <Home className="w-3.5 h-3.5 text-green-300" /> Home
              </button>
              <ChevronRight className="w-3.5 h-3.5 text-white/40" />
              <span className="text-amber-300 font-bold">Client Reviews</span>
            </div>

            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest text-green-200 bg-white/10 backdrop-blur-md border border-white/20 shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
              4.9★ Rated Agency
            </div>
          </div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center my-auto px-4">
          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight mb-4 drop-shadow-md"
          >
            Real Reviews &{' '}
            <span className="text-amber-300 italic font-serif">
              Passenger Stories
            </span>
          </motion.h1>
          <p className="text-green-100/90 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed font-medium">
            Read authentic experiences from 5,000+ business leaders, wedding families, and vacationers who explore Odisha with our luxury fleet.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

        {/* Dynamic Grid Split */}
        <div className="grid lg:grid-cols-12 gap-12 items-start">
          
          {/* Testimonial List Grid (Left) */}
          <div className="lg:col-span-7 space-y-6">
            {loading ? (
              [1, 2, 3].map((n) => (
                <div key={n} className="bg-[#2a1b17]/40 h-44 rounded-2xl animate-pulse" />
              ))
            ) : testimonials.length === 0 ? (
              <p className="text-stone-400 text-sm">No reviews posted yet.</p>
            ) : (
              testimonials.map((test) => (
                <div
                  key={test.id}
                  className="bg-[#2b1b17]/80 border border-yellow-500/10 p-6 rounded-2xl relative shadow-lg hover:border-yellow-500/20 hover:bg-[#2b1b17]/95 transition-all duration-300"
                >
                  <Quote className="absolute right-6 top-6 w-10 h-10 text-yellow-500/10" />
                  
                  {/* Rating Stars */}
                  <div className="flex gap-1 mb-3">
                    {Array.from({ length: test.rating }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                    ))}
                  </div>

                  {/* Feedback */}
                  <p className="text-xs sm:text-sm text-stone-300 italic leading-relaxed mb-4">
                    "{test.comment}"
                  </p>

                  {/* Profile info */}
                  <div className="flex items-center gap-3 border-t border-yellow-500/5 pt-4">
                    <img
                      src={test.avatar}
                      alt={test.name}
                      className="w-10 h-10 rounded-full border border-yellow-500/20 object-cover"
                    />
                    <div className="text-left">
                      <h4 className="text-xs font-bold text-[#fcfaf2]">{test.name}</h4>
                      <p className="text-[10px] text-stone-400">{test.location} • {test.date}</p>
                    </div>
                  </div>

                </div>
              ))
            )}
          </div>

          {/* Testimonial Form (Right) */}
          <div className="lg:col-span-5 bg-[#251713]/80 border border-yellow-500/10 rounded-2xl p-6 sm:p-8 shadow-2xl relative">
            <h3 className="text-lg font-bold text-white mb-6 pb-3 border-b border-yellow-500/10">
              Share Your Journey Feedback
            </h3>

            <AnimatePresence>
              {success ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="p-6 bg-emerald-950/40 border border-emerald-500/25 rounded-xl text-center space-y-2"
                >
                  <CheckCircle className="w-10 h-10 text-emerald-400 mx-auto" />
                  <h4 className="text-sm font-bold text-white">Review Posted Successfully!</h4>
                  <p className="text-xs text-stone-400">
                    Thank you for your valuable feedback. It helps us maintain the finest standard of hospitality across Odisha.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmitReview} className="space-y-4 text-left">
                  <div>
                    <label className="block text-xs font-semibold text-stone-400 mb-1.5">Your Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Dr. Alok Senapati"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-[#1e120f] border border-yellow-500/10 rounded-xl px-4 py-3 text-xs focus:border-yellow-500 outline-none text-[#fcfaf2]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-400 mb-1.5">Location / Designation</label>
                    <input
                      type="text"
                      placeholder="e.g. Corporate Client, Bhubaneswar"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      className="w-full bg-[#1e120f] border border-yellow-500/10 rounded-xl px-4 py-3 text-xs focus:border-yellow-500 outline-none text-[#fcfaf2]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-400 mb-1.5">Rating Rating</label>
                    <div className="flex gap-2">
                      {[1, 2, 3, 4, 5].map((stars) => (
                        <button
                          key={stars}
                          type="button"
                          onClick={() => setRating(stars)}
                          className="p-1 hover:scale-110 transition-transform"
                        >
                          <Star
                            className={`w-6 h-6 ${
                              stars <= rating ? 'fill-yellow-500 text-yellow-500' : 'text-stone-600'
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-400 mb-1.5">Your Feedback Story *</label>
                    <textarea
                      required
                      placeholder="Tell us about the vehicle quality, driver punctuality, cleanliness, etc..."
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      className="w-full h-24 bg-[#1e120f] border border-yellow-500/10 rounded-xl px-4 py-2.5 text-xs focus:border-yellow-500 outline-none resize-none text-stone-300"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full py-3.5 bg-gradient-to-r from-yellow-500 via-amber-500 to-amber-600 text-stone-950 font-black text-xs tracking-widest uppercase rounded-xl transition-all shadow-lg hover:scale-[1.02] disabled:opacity-50 flex items-center justify-center gap-1.5"
                  >
                    {submitting ? 'Submitting to database...' : 'Publish My Review'}
                  </button>
                </form>
              )}
            </AnimatePresence>
          </div>

        </div>

      </div>
    </div>
  );
}

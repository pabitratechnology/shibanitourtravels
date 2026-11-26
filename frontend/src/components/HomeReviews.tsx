import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Star, ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';

interface HomeReviewsProps {
  onViewAllReviews: () => void;
  onPlanTrip?: () => void;
}

const TESTIMONIALS = [
  {
    name: 'Priyanka Das',
    role: 'Bhubaneswar',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=160&auto=format&fit=crop&q=80',
    comment:
      'Excellent service! Our Puri trip was truly memorable with Shibani Travels. Professional team and comfortable journey. Highly recommended!',
    rating: 5,
  },
  {
    name: 'Rajesh Pattnaik',
    role: 'Cuttack',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=160&auto=format&fit=crop&q=80',
    comment:
      'Booked their Toyota Innova Crysta for our family pilgrimage across Puri and Konark. Punctual chauffeur, clean car, and very honest pricing.',
    rating: 5,
  },
  {
    name: 'Sunita Mishra',
    role: 'Rourkela',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=160&auto=format&fit=crop&q=80',
    comment:
      'The 17-seater Force Urbania coach was in showroom condition. Our group of 14 traveled to Chilika and Daringbadi without any fatigue.',
    rating: 5,
  },
];

export default function HomeReviews({ onViewAllReviews, onPlanTrip }: HomeReviewsProps) {
  const [currentIdx, setCurrentIdx] = useState(0);

  const prev = () => setCurrentIdx(i => (i - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  const next = () => setCurrentIdx(i => (i + 1) % TESTIMONIALS.length);

  const t = TESTIMONIALS[currentIdx];

  return (
    <section className="py-16 sm:py-20 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        
        {/* Section Header: —— What Our Customers Say —— */}
        <div className="flex items-center justify-center gap-3 mb-10 text-center">
          <div className="w-10 sm:w-16 h-0.5 bg-[#006837]" />
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight">
            <span className="text-[#006837]">What Our</span>{' '}
            <span className="text-[#D32F2F]">Customers Say</span>
          </h2>
          <div className="w-10 sm:w-16 h-0.5 bg-[#006837]" />
        </div>

        {/* 2-Column Layout (Matching Mockup) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* LEFT: Testimonial Card with Carousel Controls */}
          <div className="lg:col-span-6 relative bg-[#FAFCFA] rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-md flex flex-col justify-between">
            
            {/* Carousel navigation buttons */}
            <button
              onClick={prev}
              className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white text-slate-700 shadow-md hover:bg-slate-50 flex items-center justify-center cursor-pointer z-10"
              aria-label="Previous review"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={next}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white text-slate-700 shadow-md hover:bg-slate-50 flex items-center justify-center cursor-pointer z-10"
              aria-label="Next review"
            >
              <ChevronRight className="w-4 h-4" />
            </button>

            <AnimatePresence mode="wait">
              <motion.div
                key={currentIdx}
                initial={{ opacity: 0, x: 15 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -15 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col sm:flex-row items-center sm:items-start gap-5 px-6"
              >
                {/* Circular Traveler Avatar */}
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden shrink-0 border-3 border-[#006837] shadow-lg">
                  <img
                    src={t.avatar}
                    alt={t.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Review Text + Rating */}
                <div className="flex-1 text-center sm:text-left">
                  <p className="text-xs sm:text-sm text-slate-700 font-medium italic leading-relaxed mb-4">
                    "{t.comment}"
                  </p>

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-t border-slate-200/80 pt-3">
                    <div>
                      <h4 className="text-sm font-black text-slate-900">
                        {t.name}
                      </h4>
                      <span className="text-[11px] text-slate-500 font-medium">
                        {t.role}
                      </span>
                    </div>

                    {/* 5 Yellow Stars */}
                    <div className="flex items-center gap-1 justify-center sm:justify-end">
                      {[...Array(t.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-[#EAB308] text-[#EAB308]" />
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Dots */}
            <div className="flex justify-center gap-1.5 mt-5">
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentIdx(i)}
                  className={`h-1.5 rounded-full transition-all cursor-pointer ${
                    i === currentIdx ? 'w-6 bg-[#006837]' : 'w-2 bg-slate-300'
                  }`}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>
          </div>

          {/* RIGHT: "Plan Your Next Trip Today!" Banner */}
          <div className="lg:col-span-6 relative rounded-3xl overflow-hidden shadow-xl flex items-center min-h-[200px]">
            {/* Background Image: Jagannath Temple & Blue Sky */}
            <img
              src="/banners/jagannath_temple.png"
              alt="Plan Your Next Trip"
              className="absolute inset-0 w-full h-full object-cover"
            />
            
            {/* Gradient Overlay */}
            <div
              className="absolute inset-0"
              style={{
                background: 'linear-gradient(90deg, rgba(2, 48, 71, 0.9) 0%, rgba(3, 105, 161, 0.75) 50%, rgba(2, 48, 71, 0.85) 100%)',
              }}
            />

            {/* Small Airplane in Sky */}
            <div className="absolute top-4 right-8 text-white/40 pointer-events-none">
              <svg className="w-10 h-10" viewBox="0 0 24 24" fill="currentColor">
                <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" />
              </svg>
            </div>

            {/* Banner Content */}
            <div className="relative z-10 p-6 sm:p-10 flex flex-col sm:flex-row items-center justify-between gap-6 w-full text-center sm:text-left">
              <div>
                <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight leading-tight">
                  Plan Your Next Trip Today!
                </h3>
                <p className="text-xs sm:text-sm text-sky-100 font-medium mt-1">
                  Custom itineraries, luxury vehicles, and 24/7 dedicated support.
                </p>
              </div>

              {/* Yellow "Contact Us ->" Button (Matches Mockup) */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                onClick={onPlanTrip || onViewAllReviews}
                className="px-6 py-3 rounded-full text-xs sm:text-sm font-black text-slate-900 uppercase tracking-wider flex items-center gap-2 shadow-xl hover:shadow-2xl transition-all shrink-0 cursor-pointer"
                style={{
                  background: '#EAB308',
                }}
              >
                <span>Contact Us</span>
                <ArrowRight className="w-4 h-4 stroke-[2.5]" />
              </motion.button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

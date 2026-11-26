import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Calendar, MapPin, Check, ArrowRight, Star, Clock,
  Users, Hotel, Car, Utensils, Compass, MessageSquare, Sparkles, Eye
} from 'lucide-react';
import { ODISHA_TOUR_PACKAGES, TOUR_CATEGORIES, TourPackage } from '../data/odishaTourPackages.js';
import TourDetailModal from './TourDetailModal.js';

interface HomeTourPackagesProps {
  onBookPackage: (packageName?: string) => void;
  onViewAllTours?: () => void;
}

export default function HomeTourPackages({ onBookPackage, onViewAllTours }: HomeTourPackagesProps) {
  const [activeCategory, setActiveCategory] = useState<string>('All Packages (32)');
  const [selectedTourModal, setSelectedTourModal] = useState<TourPackage | null>(null);

  const filtered = activeCategory === 'All Packages (32)'
    ? ODISHA_TOUR_PACKAGES.slice(0, 12)
    : ODISHA_TOUR_PACKAGES.filter(p => p.category === activeCategory);

  return (
    <section className="py-20 sm:py-24 bg-white relative overflow-hidden" id="tours">
      
      {/* Background Ambience */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-green-50/50 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-10">
          <div className="flex items-center justify-center gap-3 mb-2">
            <div className="w-10 sm:w-16 h-0.5 bg-[#006837]" />
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight">
              <span className="text-[#006837]">Odisha</span>{' '}
              <span className="text-[#E25822]">Tour Packages</span>
            </h2>
            <div className="w-10 sm:w-16 h-0.5 bg-[#006837]" />
          </div>
          <p className="text-sm sm:text-base font-semibold text-slate-600 max-w-2xl mx-auto">
            Explore 30+ custom-crafted holiday itineraries with handpicked hotels, luxury private transport, expert local guides, and 100% transparent pricing.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center justify-center gap-2 overflow-x-auto pb-4 mb-10 scrollbar-none flex-nowrap sm:flex-wrap">
          {TOUR_CATEGORIES.map(cat => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'bg-[#006837] text-white shadow-md scale-105'
                    : 'bg-white text-slate-700 hover:bg-green-50 border border-slate-200'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Packages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-12">
          <AnimatePresence mode="popLayout">
            {filtered.map(pkg => (
              <motion.div
                key={pkg.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col justify-between group"
              >
                {/* Image Banner with Badges */}
                <div className="relative h-56 sm:h-60 overflow-hidden">
                  <img
                    src={pkg.img}
                    alt={pkg.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />

                  {/* Top Badges */}
                  <div className="absolute top-3 inset-x-3 flex items-center justify-between">
                    <span className="text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full bg-white/95 text-[#006837] shadow-sm">
                      {pkg.badge}
                    </span>
                    <span className="text-[10px] font-bold text-white bg-black/50 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/20 flex items-center gap-1">
                      <Clock className="w-3 h-3 text-amber-300" />
                      {pkg.duration}
                    </span>
                  </div>

                  {/* Bottom Route on Image */}
                  <div className="absolute bottom-3 inset-x-3 text-white">
                    <div className="flex items-center gap-1 text-[11px] font-semibold text-amber-200 mb-0.5">
                      <MapPin className="w-3.5 h-3.5 text-amber-300 shrink-0" />
                      <span className="truncate">{pkg.route}</span>
                    </div>
                  </div>
                </div>

                {/* Package Content */}
                <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Title & Rating */}
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h3
                        onClick={() => setSelectedTourModal(pkg)}
                        className="text-base sm:text-lg font-black text-slate-900 group-hover:text-[#006837] transition-colors leading-snug cursor-pointer"
                      >
                        {pkg.title}
                      </h3>
                    </div>

                    <div className="flex items-center gap-1.5 mb-4 text-xs font-bold text-slate-600">
                      <div className="flex items-center text-amber-500">
                        <Star className="w-3.5 h-3.5 fill-current" />
                        <span className="ml-1 text-slate-800">{pkg.rating}</span>
                      </div>
                      <span className="text-slate-400">({pkg.reviews} verified reviews)</span>
                    </div>

                    {/* Inclusions List */}
                    <div className="space-y-1.5 mb-5 border-t border-slate-100 pt-3">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                        Key Inclusions:
                      </span>
                      {pkg.inclusions.slice(0, 4).map((inc, i) => (
                        <div key={i} className="flex items-center gap-2 text-xs text-slate-600">
                          <Check className="w-3.5 h-3.5 text-[#006837] shrink-0 stroke-[2.5]" />
                          <span className="truncate">{inc}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Price & Booking Actions */}
                  <div className="border-t border-slate-100 pt-4 mt-auto">
                    <div className="flex items-baseline justify-between mb-3">
                      <div>
                        <span className="text-[10px] text-slate-400 font-semibold block">Starts from</span>
                        <span className="text-2xl font-black text-[#006837]">
                          ₹{pkg.price.toLocaleString('en-IN')}
                        </span>
                        <span className="text-[10px] text-slate-500 font-medium ml-1">/ person</span>
                      </div>
                      <span className="text-[11px] font-bold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full">
                        Customizable
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => setSelectedTourModal(pkg)}
                        className="py-2.5 px-3 rounded-xl text-xs font-bold text-slate-700 bg-white hover:bg-slate-100 border border-slate-200 hover:border-green-300 transition-colors flex items-center justify-center gap-1 cursor-pointer"
                      >
                        <Eye className="w-3.5 h-3.5 text-[#006837]" />
                        <span>View Details</span>
                      </button>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => onBookPackage(pkg.title)}
                        className="py-2.5 px-3 rounded-xl text-xs font-bold text-white shadow-md transition-all flex items-center justify-center gap-1 cursor-pointer"
                        style={{
                          background: 'linear-gradient(135deg, #006837 0%, #008746 100%)',
                        }}
                      >
                        <span>Book Now</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </motion.button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* View All 30+ Packages CTA Strip */}
        <div className="text-center mb-12">
          <button
            onClick={onViewAllTours}
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl bg-[#006837] hover:bg-[#004D26] text-white text-sm font-black uppercase tracking-wider shadow-xl hover:shadow-2xl hover:scale-105 transition-all cursor-pointer"
          >
            <span>Explore All 32+ Odisha Tour Packages &amp; Itineraries</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Custom Tour Consultation Banner */}
        <div
          className="rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6"
          style={{
            background: 'linear-gradient(135deg, #004D26 0%, #006837 70%, #013A1D 100%)',
          }}
        >
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-green-200 text-xs font-bold uppercase tracking-wider mb-2">
              <Compass className="w-3.5 h-3.5" /> 100% Tailored Itineraries
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-white">
              Want a Customized Tour Package for Your Family or Group?
            </h3>
            <p className="text-xs sm:text-sm text-green-100/80 mt-1 max-w-xl font-medium">
              Tell us your travel dates, preferred vehicle (Sedan, Innova Crysta, Force Urbania), and budget. Our tour planners will build your custom itinerary in 15 minutes!
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <a
              href="tel:+919861117168"
              className="py-3 px-6 rounded-full text-xs sm:text-sm font-bold text-[#006837] bg-white hover:bg-green-50 transition-colors shadow-lg flex items-center gap-2"
            >
              <span>Call Specialist: +91 98611 17168</span>
            </a>
          </div>
        </div>

      </div>

      {/* ══ Tour Detail Modal ══ */}
      <TourDetailModal
        packageData={selectedTourModal}
        isOpen={Boolean(selectedTourModal)}
        onClose={() => setSelectedTourModal(null)}
        onBookNow={(pkg) => {
          setSelectedTourModal(null);
          onBookPackage(pkg.title);
        }}
      />
    </section>
  );
}

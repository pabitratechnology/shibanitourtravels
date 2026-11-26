import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import {
  Calendar, MapPin, Check, ArrowRight, Star, Clock,
  Search, SlidersHorizontal, ShieldCheck, Heart, Sparkles,
  Phone, MessageSquare, ChevronRight, Compass, RefreshCw, Eye
} from 'lucide-react';
import PageHero from './PageHero.js';
import { ODISHA_TOUR_PACKAGES, TOUR_CATEGORIES, TourPackage } from '../data/odishaTourPackages.js';
import AiEstimator from './AiEstimator.js';
import TourDetailModal from './TourDetailModal.js';

interface ToursPageProps {
  onBookPackage?: (packageName?: string, vehicle?: string, from?: string, to?: string) => void;
}

export default function ToursPage({ onBookPackage }: ToursPageProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const urlCategory = searchParams.get('category');
  const urlQuery = searchParams.get('q');
  const urlPackageId = searchParams.get('package') || searchParams.get('tour');

  const [selectedCategory, setSelectedCategory] = useState<string>(
    urlCategory && TOUR_CATEGORIES.includes(urlCategory as any) ? urlCategory : 'All Packages (32)'
  );
  const [searchQuery, setSearchQuery] = useState(urlQuery || '');
  const [durationFilter, setDurationFilter] = useState<'all' | 'short' | 'medium' | 'long'>('all');
  const [sortBy, setSortBy] = useState<'popular' | 'price-asc' | 'price-desc'>('popular');
  const [selectedTourModal, setSelectedTourModal] = useState<TourPackage | null>(null);

  useEffect(() => {
    const cat = searchParams.get('category');
    const q = searchParams.get('q');
    const pkgId = searchParams.get('package') || searchParams.get('tour');

    if (cat && TOUR_CATEGORIES.includes(cat as any)) {
      setSelectedCategory(cat);
    }
    if (q !== null && q !== undefined) {
      setSearchQuery(q);
    }
    if (pkgId) {
      const match = ODISHA_TOUR_PACKAGES.find((p) => p.id === pkgId || p.id === `pkg-${pkgId}`);
      if (match) {
        setSelectedTourModal(match);
      }
    }
  }, [searchParams]);

  const filteredPackages = useMemo(() => {
    return ODISHA_TOUR_PACKAGES.filter((pkg) => {
      // Category filter
      if (selectedCategory !== 'All Packages (32)' && pkg.category !== selectedCategory) {
        return false;
      }
      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matches =
          pkg.title.toLowerCase().includes(q) ||
          pkg.route.toLowerCase().includes(q) ||
          pkg.category.toLowerCase().includes(q) ||
          pkg.tag.toLowerCase().includes(q) ||
          pkg.highlights.some((h) => h.toLowerCase().includes(q));
        if (!matches) return false;
      }
      // Duration filter
      if (durationFilter === 'short' && pkg.days > 2) return false;
      if (durationFilter === 'medium' && (pkg.days < 3 || pkg.days > 4)) return false;
      if (durationFilter === 'long' && pkg.days < 5) return false;

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      return b.rating - a.rating; // default: popular / top-rated
    });
  }, [selectedCategory, searchQuery, durationFilter, sortBy]);

  const handleBook = (pkg: TourPackage) => {
    if (onBookPackage) {
      onBookPackage(pkg.title, 'Innova Crysta / AC Sedan', 'Bhubaneswar', pkg.route);
    }
  };

  return (
    <div className="bg-[#FAF8F5] min-h-screen text-slate-800">
      
      {/* ═══ ADVANCED PAGE HERO ═══ */}
      <PageHero
        title="30+ Curated Odisha Tour Packages & Itineraries"
        subtitle="Explore divine Puri Jagannath Dham, UNESCO Konark Sun Temple, Chilika dolphins, Daringbadi hill station, and deep tribal heritage."
        tag="Verified Odisha Destination DMC"
        backgroundImage="/banners/hero_konark_panoramic.jpg"
        stats={[
          { value: '32+', label: 'Curated Tours' },
          { value: '100%', label: 'Customizable' },
          { value: '4.9★', label: 'Average Rating' },
          { value: '24/7', label: 'Tour Coordinator' },
        ]}
      />

      {/* ═══ SEARCH & FILTER CONTROLS BAR ═══ */}
      <div className="sticky top-[100px] sm:top-[108px] z-30 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-3.5 space-y-3">
          
          {/* Row 1: Search Input + Duration + Sort */}
          <div className="flex flex-col sm:flex-row items-center gap-3 justify-between">
            {/* Search Box */}
            <div className="relative w-full sm:w-96">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by temple, beach, hill station, city..."
                className="w-full pl-9 pr-4 py-2 rounded-xl text-xs sm:text-sm font-bold border border-slate-200 bg-slate-50 focus:bg-white focus:border-[#006837] focus:outline-none transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400 hover:text-slate-600"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Duration & Sort Controls */}
            <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto">
              {/* Duration filter */}
              <div className="flex items-center p-1 bg-slate-100 rounded-xl text-xs font-bold text-slate-700">
                <button
                  onClick={() => setDurationFilter('all')}
                  className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                    durationFilter === 'all' ? 'bg-[#006837] text-white shadow-xs' : 'hover:text-[#006837]'
                  }`}
                >
                  All Days
                </button>
                <button
                  onClick={() => setDurationFilter('short')}
                  className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                    durationFilter === 'short' ? 'bg-[#006837] text-white shadow-xs' : 'hover:text-[#006837]'
                  }`}
                >
                  1-2 Days
                </button>
                <button
                  onClick={() => setDurationFilter('medium')}
                  className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                    durationFilter === 'medium' ? 'bg-[#006837] text-white shadow-xs' : 'hover:text-[#006837]'
                  }`}
                >
                  3-4 Days
                </button>
                <button
                  onClick={() => setDurationFilter('long')}
                  className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                    durationFilter === 'long' ? 'bg-[#006837] text-white shadow-xs' : 'hover:text-[#006837]'
                  }`}
                >
                  5+ Days
                </button>
              </div>

              {/* Sort by dropdown */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="py-2 px-3 rounded-xl border border-slate-200 bg-slate-50 text-xs font-bold text-slate-700 focus:outline-none cursor-pointer"
              >
                <option value="popular">★ Top Rated</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
            </div>
          </div>

          {/* Row 2: Category Filter Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-none pb-1">
            {TOUR_CATEGORIES.map((cat) => {
              const isSel = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-1.5 rounded-xl text-xs font-black whitespace-nowrap transition-all cursor-pointer ${
                    isSel
                      ? 'bg-[#006837] text-white shadow-xs ring-2 ring-[#006837]/30'
                      : 'bg-white text-slate-600 hover:bg-slate-100 hover:text-[#006837] border border-slate-200'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

        </div>
      </div>

      {/* ═══ PACKAGES GRID SECTION ═══ */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-10 sm:py-14">
        
        {/* Results Counter */}
        <div className="flex items-center justify-between mb-8 pb-3 border-b border-slate-200/80">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900">
              Showing <span className="text-[#006837]">{filteredPackages.length}</span> Tour Packages
            </h2>
            <p className="text-xs text-slate-500 font-medium mt-0.5">
              All packages include verified AC transport, hotel stays, guided sightseeing, and zero hidden toll charges.
            </p>
          </div>
          <span className="text-xs font-bold text-amber-700 bg-amber-50 px-3 py-1 rounded-full border border-amber-200 hidden sm:inline-block">
            ★ All Packages 100% Customizable
          </span>
        </div>

        {/* 30+ Packages Cards Grid */}
        {filteredPackages.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-slate-200">
            <Compass className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h3 className="text-lg font-black text-slate-800">No matching packages found</h3>
            <p className="text-xs text-slate-500 mt-1">Try searching for a different destination or reset the filters.</p>
            <button
              onClick={() => {
                setSelectedCategory('All Packages (32)');
                setSearchQuery('');
                setDurationFilter('all');
              }}
              className="mt-4 px-4 py-2 rounded-xl bg-[#006837] text-white text-xs font-bold"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredPackages.map((pkg) => (
              <div
                key={pkg.id}
                className="bg-white rounded-3xl overflow-hidden border border-slate-200/80 shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between group"
              >
                <div>
                  {/* Image Container with Badges */}
                  <div className="relative h-48 w-full bg-slate-100 overflow-hidden">
                    <img
                      src={pkg.img}
                      alt={pkg.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />
                    
                    {/* Top Badges */}
                    <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                      <span className="px-2.5 py-1 rounded-full bg-white/90 text-[#006837] text-[10px] font-black uppercase tracking-wider backdrop-blur-md shadow-md">
                        {pkg.badge}
                      </span>
                      <span className="px-2 py-0.5 rounded-full bg-amber-400 text-slate-950 text-[10px] font-black uppercase shadow-md flex items-center gap-1">
                        <Star className="w-3 h-3 fill-current" />
                        <span>{pkg.rating}</span>
                      </span>
                    </div>

                    {/* Bottom Duration & Tag */}
                    <div className="absolute bottom-3 left-3 right-3 text-white">
                      <div className="flex items-center justify-between text-[11px] font-bold">
                        <span className="flex items-center gap-1 text-amber-300">
                          <Clock className="w-3.5 h-3.5" />
                          <span>{pkg.duration}</span>
                        </span>
                        <span className="text-white/80">{pkg.tag}</span>
                      </div>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-5">
                    <h3
                      onClick={() => setSelectedTourModal(pkg)}
                      className="text-base font-black text-slate-900 leading-snug mb-2 group-hover:text-[#006837] transition-colors cursor-pointer"
                    >
                      {pkg.title}
                    </h3>

                    {/* Route */}
                    <p className="text-xs text-slate-500 font-medium mb-3 flex items-start gap-1">
                      <MapPin className="w-3.5 h-3.5 text-[#006837] shrink-0 mt-0.5" />
                      <span className="leading-tight line-clamp-2">{pkg.route}</span>
                    </p>

                    {/* Highlights */}
                    <div className="space-y-1.5 mb-4">
                      {pkg.highlights.slice(0, 3).map((h, i) => (
                        <div key={i} className="flex items-center gap-1.5 text-xs text-slate-600 font-medium">
                          <Check className="w-3.5 h-3.5 text-[#006837] shrink-0" />
                          <span className="truncate">{h}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Card Footer: Starting Price & Dual Action Buttons */}
                <div className="p-5 pt-0 border-t border-slate-100 mt-2 bg-slate-50/50">
                  <div className="flex items-baseline justify-between pt-3 mb-3">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-slate-400 block">
                        Starting Per Person
                      </span>
                      <span className="text-2xl font-black text-[#006837]">
                        ₹{pkg.price.toLocaleString('en-IN')}
                      </span>
                    </div>
                    <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      Hotel + Cab Incl.
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => setSelectedTourModal(pkg)}
                      className="py-2.5 px-3 rounded-xl text-xs font-bold text-slate-700 bg-white hover:bg-slate-100 border border-slate-200 transition-colors flex items-center justify-center gap-1 cursor-pointer hover:border-green-300"
                    >
                      <Eye className="w-3.5 h-3.5 text-[#006837]" />
                      <span>View Details</span>
                    </button>

                    <button
                      onClick={() => handleBook(pkg)}
                      className="py-2.5 px-3 rounded-xl text-xs font-black uppercase tracking-wider text-white bg-[#006837] hover:bg-[#004D26] shadow-md transition-all flex items-center justify-center gap-1 cursor-pointer"
                    >
                      <span>Book Now</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

              </div>
            ))}
          </div>
        )}

      </div>

      {/* ═══ TOUR DETAIL MODAL ═══ */}
      <TourDetailModal
        packageData={selectedTourModal}
        isOpen={Boolean(selectedTourModal)}
        onClose={() => setSelectedTourModal(null)}
        onBookNow={(pkg, vehicle) => {
          setSelectedTourModal(null);
          if (onBookPackage) {
            onBookPackage(pkg.title, vehicle || 'Innova Crysta', 'Bhubaneswar', pkg.route);
          }
        }}
      />

      {/* ═══ BOTTOM SECTION: AI CUSTOM TOUR ESTIMATOR ═══ */}
      <div className="bg-white py-16 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 text-center mb-10">
          <span className="text-xs font-black uppercase tracking-widest text-[#006837] bg-emerald-50 border border-emerald-200 px-3.5 py-1 rounded-full mb-3 inline-block">
            Custom Itinerary Planner
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mb-2">
            Want a Custom Route or Tailored Dates?
          </h2>
          <p className="text-sm text-slate-600 max-w-xl mx-auto font-medium">
            Use our AI route estimator or call our Odisha travel desk to personalize your hotels, fleet, and sacred halts.
          </p>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <AiEstimator />
        </div>
      </div>

    </div>
  );
}

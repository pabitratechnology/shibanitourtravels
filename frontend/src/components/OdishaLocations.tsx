import React, { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  MapPin, ChevronLeft, ChevronRight, ArrowRight,
  Clock, Compass, Calendar
} from 'lucide-react';

interface OdishaLocationsProps {
  onPlanTrip: (destination?: string) => void;
}

const CATEGORIES = [
  'All Destinations',
  'Spiritual',
  'Heritage',
  'Wildlife & Lakes',
  'Hill Stations',
];

const DESTINATIONS = [
  {
    name: 'Puri',
    label: 'Puri',
    category: 'Spiritual',
    tag: 'Spiritual Capital',
    distance: '60 km from BBSR',
    duration: '1.5 hrs drive',
    desc: 'Golden Beach, Swargadwar & Sacred 12th Century Jagannath Temple.',
    img: '/banners/jagannath_temple.png',
  },
  {
    name: 'Konark',
    label: 'Konark',
    category: 'Heritage',
    tag: 'UNESCO World Heritage',
    distance: '65 km from BBSR',
    duration: '1.5 hrs drive',
    desc: '700-year-old architectural marvel carved as a celestial chariot.',
    img: '/banners/konark_temple.png',
  },
  {
    name: 'Bhubaneswar',
    label: 'Bhubaneswar',
    category: 'Spiritual',
    tag: 'Ekamra Kshetra',
    distance: 'Starting Point',
    duration: 'City tour',
    desc: 'Lingaraj, Mukteshwar, Udayagiri caves & smart city connectivity.',
    img: '/banners/bhubaneswar_city.png',
  },
  {
    name: 'Chilika',
    label: 'Chilika',
    category: 'Wildlife & Lakes',
    tag: "Asia's Largest Lagoon",
    distance: '100 km from BBSR',
    duration: '2.5 hrs drive',
    desc: 'Playful Irrawaddy dolphins, migratory birds & serene island boat cruises.',
    img: '/banners/chilika_lake.png',
  },
  {
    name: 'Similipal',
    label: 'Similipal',
    category: 'Wildlife & Lakes',
    tag: 'Biosphere Reserve',
    distance: '260 km from BBSR',
    duration: '5.5 hrs drive',
    desc: 'Joranda & Barehipani waterfalls, dense sal forests and wildlife safaris.',
    img: '/images/bhitarkanika.png',
  },
  {
    name: 'Daringbadi',
    label: 'Daringbadi',
    category: 'Hill Stations',
    tag: 'Kashmir of Odisha',
    distance: '280 km from BBSR',
    duration: '6.5 hrs drive',
    desc: 'Pine valleys, cool misty mountain breezes, coffee plantations and waterfalls.',
    img: '/images/daringbadi.png',
  },
];

export default function OdishaLocations({ onPlanTrip }: OdishaLocationsProps) {
  const [activeCategory, setActiveCategory] = useState('All Destinations');
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollAmount = clientWidth * 0.75;
      scrollRef.current.scrollTo({
        left: direction === 'left' ? scrollLeft - scrollAmount : scrollLeft + scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  const filtered = activeCategory === 'All Destinations'
    ? DESTINATIONS
    : DESTINATIONS.filter(d => d.category === activeCategory);

  return (
    <section className="py-16 sm:py-20 bg-[#F8FAF9] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        
        {/* Section Header: —— Popular Destinations —— with Navigation Arrows */}
        <div className="relative flex items-center justify-between mb-8">
          
          {/* Left Arrow Button */}
          <button
            onClick={() => scroll('left')}
            className="w-10 h-10 rounded-full bg-[#006837] text-white flex items-center justify-center shadow-md hover:scale-105 active:scale-95 transition-all cursor-pointer z-10 shrink-0"
            aria-label="Previous Destinations"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Center Heading */}
          <div className="text-center mx-auto">
            <div className="flex items-center justify-center gap-3">
              <div className="w-8 sm:w-16 h-0.5 bg-[#006837]" />
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-center">
                <span className="text-[#006837]">Popular</span>{' '}
                <span className="text-[#D32F2F]">Destinations</span>
              </h2>
              <div className="w-8 sm:w-16 h-0.5 bg-[#006837]" />
            </div>
            <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1">
              Explore the sacred, scenic, and historical wonders of Odisha with private chauffeurs
            </p>
          </div>

          {/* Right Arrow Button */}
          <button
            onClick={() => scroll('right')}
            className="w-10 h-10 rounded-full bg-[#006837] text-white flex items-center justify-center shadow-md hover:scale-105 active:scale-95 transition-all cursor-pointer z-10 shrink-0"
            aria-label="Next Destinations"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex items-center justify-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none flex-nowrap sm:flex-wrap">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                activeCategory === cat
                  ? 'bg-[#006837] text-white shadow-sm'
                  : 'bg-white text-slate-600 hover:bg-green-50 border border-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Horizontal Destinations Carousel */}
        <div
          ref={scrollRef}
          className="flex gap-4 sm:gap-5 overflow-x-auto pb-4 scrollbar-none snap-x snap-mandatory"
          style={{ scrollBehavior: 'smooth' }}
        >
          {filtered.map((dest, idx) => (
            <motion.div
              key={idx}
              whileHover={{ scale: 1.03, y: -4 }}
              onClick={() => onPlanTrip(dest.name)}
              className="relative shrink-0 w-[240px] sm:w-[260px] lg:w-[210px] xl:w-[220px] h-[300px] sm:h-[320px] rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 cursor-pointer group snap-start flex flex-col justify-between"
            >
              {/* Destination Image */}
              <img
                src={dest.img}
                alt={dest.name}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/10" />

              {/* Top Tag & Distance */}
              <div className="relative z-10 p-3.5 flex items-center justify-between">
                <span className="text-[10px] font-black uppercase tracking-wider text-white bg-black/50 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/20">
                  {dest.distance}
                </span>
                <span className="text-[10px] font-bold text-amber-300 bg-amber-900/60 backdrop-blur-md px-2 py-0.5 rounded-full border border-amber-400/30">
                  {dest.duration}
                </span>
              </div>

              {/* Bottom Content: Name, Highlights & Pill Label (Matches Mockup) */}
              <div className="relative z-10 p-4 text-center">
                <p className="text-[11px] text-slate-200 line-clamp-2 mb-3 leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-medium">
                  {dest.desc}
                </p>

                {/* Pill Label with MapPin (Matches Mockup) */}
                <div className="flex items-center justify-center">
                  <div className="bg-black/80 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/25 flex items-center gap-1.5 text-white shadow-lg group-hover:bg-[#006837] group-hover:border-green-400 transition-colors">
                    <MapPin className="w-3.5 h-3.5 text-[#86EFAC]" />
                    <span className="text-xs font-bold tracking-wide">
                      {dest.label}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}

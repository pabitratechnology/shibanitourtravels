import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Compass, MapPin, Car, Crown, Sparkles, ArrowRight,
  ShieldCheck, Star, Users, CheckCircle2, RefreshCw, Zap
} from 'lucide-react';
import TiltCard from './TiltCard.js';

interface OrbitItem {
  id: string;
  name: string;
  title: string;
  subtitle: string;
  category: string;
  image: string;
  desc: string;
  distance: string;
  capacity: string;
  rating: string;
  highlights: string[];
  color: string;
  glow: string;
}

const ORBIT_ITEMS: OrbitItem[] = [
  {
    id: 'puri',
    name: 'Puri Jagannath',
    title: 'Divine Puri Jagannath Darshan',
    subtitle: 'Sacred Pilgrimage & Heritage',
    category: 'Spiritual Tour',
    image: '/banners/jagannath_temple.png',
    desc: 'VIP guided pilgrimage to Sri Jagannath Temple, Golden Beach Puri, and Sakshigopal with express Highway chauffeurs.',
    distance: '60 km from BBSR',
    capacity: '1 - 26 Passengers',
    rating: '4.9 ★ (1,240 Reviews)',
    highlights: ['VIP Temple Entry Assist', 'AC Luxury Fleet', 'Complimentary Refreshments'],
    color: '#E25822',
    glow: 'rgba(226, 88, 34, 0.5)',
  },
  {
    id: 'konark',
    name: 'Konark Sun Temple',
    title: 'Majestic Konark Sun Temple',
    subtitle: '700-Year Architectural Wonder',
    category: 'UNESCO Heritage',
    image: '/banners/konark_temple.png',
    desc: 'Explore the Chariot of the Sun God with certified heritage guides, Chandrabhaga Beach sunset drive & seafood halts.',
    distance: '65 km from BBSR',
    capacity: '1 - 40 Passengers',
    rating: '5.0 ★ (980 Reviews)',
    highlights: ['Expert Heritage Guide', 'Scenic Marine Drive', 'Flexi Return Schedule'],
    color: '#C4956A',
    glow: 'rgba(196, 149, 106, 0.5)',
  },
  {
    id: 'chilika',
    name: 'Chilika Lagoon',
    title: 'Serene Chilika Dolphin Bay',
    subtitle: 'Satapada Lagoon & Bird Sanctuary',
    category: 'Eco-Tourism',
    image: '/banners/chilika_lake.png',
    desc: 'Luxury boat tie-ups, Irrawaddy dolphin watching at Satapada, and sea mouth excursions in total luxury & comfort.',
    distance: '100 km from BBSR',
    capacity: '1 - 20 Passengers',
    rating: '4.8 ★ (850 Reviews)',
    highlights: ['Exclusive Boat Reservation', 'Fresh Seafood Halts', 'GPS Highway Escort'],
    color: '#52B788',
    glow: 'rgba(82, 183, 136, 0.5)',
  },
  {
    id: 'wedding',
    name: 'VVIP Weddings',
    title: 'VVIP Royal Wedding Cars',
    subtitle: 'Mercedes, Audi, BMW & Jaguar',
    category: 'VVIP Royal Fleet',
    image: '/banners/wedding_car.png',
    desc: 'Make your wedding arrival unforgettable. Custom floral decor, uniformed VVIP chauffeurs & red-carpet luxury.',
    distance: 'Statewide Service',
    capacity: 'VVIP Couples & Guests',
    rating: '5.0 ★ (640 Weddings)',
    highlights: ['Ribbon & Flower Decor', 'Uniformed Chauffeur', 'Zero Delay Guarantee'],
    color: '#E8C97A',
    glow: 'rgba(232, 201, 122, 0.5)',
  },
  {
    id: 'fleet',
    name: 'Luxury Coaches',
    title: 'Premium Corporate Coaches',
    subtitle: 'Force Urbania & Volvo Group Fleet',
    category: 'Group & MICE Travel',
    image: '/banners/travel_fleet.png',
    desc: 'State-of-the-art Force Urbania 13/17 seaters with recliners, pushback seats, individual AC vents & high-speed Wi-Fi.',
    distance: 'Pan-Odisha & Interstate',
    capacity: '13 - 52 Passengers',
    rating: '4.9 ★ (1,100 Group Trips)',
    highlights: ['Pushback Leather Seats', 'Individual Charging Ports', 'Luggage Compartment'],
    color: '#2D6A4F',
    glow: 'rgba(45, 106, 79, 0.5)',
  },
];

interface Circular3DOrbitShowcaseProps {
  onBookNow?: (pickup?: string, drop?: string) => void;
}

export default function Circular3DOrbitShowcase({ onBookNow }: Circular3DOrbitShowcaseProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [autoRotate, setAutoRotate] = useState(true);
  const activeItem = ORBIT_ITEMS[selectedIndex];

  // Auto orbit cycle
  useEffect(() => {
    if (!autoRotate) return;
    const timer = setInterval(() => {
      setSelectedIndex((prev) => (prev + 1) % ORBIT_ITEMS.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [autoRotate]);

  return (
    <section className="py-28 relative overflow-hidden bg-[#030F1E] text-white">
      {/* ══ 3D BACKGROUND ENVIRONMENT ══ */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Dynamic Glowing Ambient Light */}
        <div
          className="absolute -top-32 left-1/2 -translate-x-1/2 w-[900px] h-[900px] rounded-full opacity-25"
          style={{
            background: `radial-gradient(circle, ${activeItem.glow} 0%, transparent 70%)`,
            filter: 'blur(130px)',
            transition: 'all 1s ease',
          }}
        />

        {/* Outer 3D Orbital Grid lines */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px] rounded-full border border-white/10 opacity-50 animate-spin-slow pointer-events-none"
          style={{ animationDuration: '40s' }}
        />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[950px] h-[950px] rounded-full border border-dashed border-white/15 opacity-40 animate-spin-slow pointer-events-none"
          style={{ animationDirection: 'reverse', animationDuration: '30s' }}
        />
        
        {/* Crisp grid pattern */}
        <div
          className="absolute inset-0 opacity-15"
          style={{
            backgroundImage: 'radial-gradient(rgba(255,255,255,0.25) 1px, transparent 1px)',
            backgroundSize: '36px 36px',
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        
        {/* ══ SECTION HEADER WITH HIGH CONTRAST TEXT ══ */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full border border-amber-400/40 bg-amber-400/10 backdrop-blur-md text-[#E8C97A] text-[10px] font-black uppercase tracking-widest mb-4 shadow-xl"
          >
            <Sparkles className="w-4 h-4 text-amber-400 animate-pulse" />
            3D Interactive Experience Orbit
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight mb-4 text-white drop-shadow-2xl"
          >
            <span className="text-white drop-shadow-md">Explore Odisha In A </span>
            <span
              className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFD700] via-[#E8C97A] to-[#52B788] drop-shadow-lg"
            >
              3D Interactive Orbit
            </span>
          </motion.h2>

          <p className="text-slate-200 text-sm sm:text-base leading-relaxed font-medium max-w-2xl mx-auto drop-shadow-md">
            Click any illuminated circular thumbnail orb along the 3D orbit to view signature VVIP destinations, live images, and vehicle specifications.
          </p>
        </div>

        {/* ══ MAIN 3D ORBITAL INTERACTION GRID ══ */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* LEFT / CENTER: 3D CIRCULAR ORBIT WHEEL WITH IMAGE NODES (5 cols) */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center relative min-h-[480px]">
            
            {/* Concentric Glowing 3D Circles Container */}
            <div
              className="relative w-[360px] sm:w-[440px] h-[360px] sm:h-[440px] rounded-full flex items-center justify-center"
              onMouseEnter={() => setAutoRotate(false)}
              onMouseLeave={() => setAutoRotate(true)}
            >
              {/* Outer Glowing Ring */}
              <div
                className="absolute inset-0 rounded-full border-2 transition-all duration-700 pointer-events-none"
                style={{
                  boxShadow: `0 0 60px ${activeItem.glow}`,
                  borderColor: `${activeItem.color}60`,
                }}
              />

              {/* Middle Dashed Orbital Ring with Slow Rotation */}
              <div
                className="absolute inset-8 rounded-full border-2 border-dashed border-white/25 animate-spin-slow pointer-events-none"
                style={{ animationDuration: '28s' }}
              />

              {/* Inner Pulsing Ring */}
              <div
                className="absolute inset-20 rounded-full border border-white/20 animate-pulse pointer-events-none"
              />

              {/* ══ CENTRAL CORE PICTURE SPHERE / LENS ══ */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeItem.id}
                  initial={{ scale: 0.85, opacity: 0, rotate: -10 }}
                  animate={{ scale: 1, opacity: 1, rotate: 0 }}
                  exit={{ scale: 0.85, opacity: 0, rotate: 10 }}
                  transition={{ duration: 0.45 }}
                  className="w-36 sm:w-44 h-36 sm:h-44 rounded-full p-1 z-20 flex items-center justify-center shadow-2xl relative cursor-pointer overflow-hidden group"
                  style={{
                    border: `3px solid ${activeItem.color}`,
                    boxShadow: `0 0 50px ${activeItem.glow}`,
                  }}
                  whileHover={{ scale: 1.08 }}
                  onClick={() => setAutoRotate(!autoRotate)}
                >
                  {/* Active Selected Image in Lens */}
                  <img
                    src={activeItem.image}
                    alt={activeItem.title}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/20" />

                  {/* Dynamic Ring Light overlay */}
                  <div
                    className="absolute inset-0 rounded-full pointer-events-none border border-white/30"
                    style={{
                      boxShadow: `inset 0 0 30px ${activeItem.color}80`,
                    }}
                  />

                  {/* Text Badge in Core Sphere */}
                  <div className="relative z-10 text-center p-3 flex flex-col items-center justify-center">
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center mb-1 text-white shadow-lg backdrop-blur-md"
                      style={{ background: activeItem.color }}
                    >
                      <Compass className="w-4 h-4 animate-spin-slow" />
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-wider text-white truncate max-w-[120px] drop-shadow-md">
                      {activeItem.name}
                    </span>
                    <span className="text-[9px] text-amber-300 font-extrabold uppercase mt-0.5 tracking-widest">
                      {activeItem.category}
                    </span>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* ══ CIRCULAR THUMBNAIL NODES ALONG THE ORBIT (5 items) ══ */}
              {ORBIT_ITEMS.map((item, index) => {
                const total = ORBIT_ITEMS.length;
                const angleDeg = (index / total) * 360 - 90; // Start top
                const angleRad = (angleDeg * Math.PI) / 180;
                // Orbit radius ~ 170px
                const radius = 170;
                const x = Math.cos(angleRad) * radius;
                const y = Math.sin(angleRad) * radius;

                const isSelected = index === selectedIndex;

                return (
                  <motion.div
                    key={item.id}
                    onClick={() => {
                      setSelectedIndex(index);
                      setAutoRotate(false);
                    }}
                    animate={{
                      x,
                      y,
                      scale: isSelected ? 1.3 : 1,
                    }}
                    transition={{ type: 'spring', stiffness: 280, damping: 22 }}
                    className="absolute z-30 cursor-pointer group flex flex-col items-center"
                  >
                    {/* Glowing outer pulse ring for active node */}
                    {isSelected && (
                      <div
                        className="absolute inset-0 rounded-full animate-ping pointer-events-none opacity-60"
                        style={{ background: item.color, margin: '-4px' }}
                      />
                    )}

                    {/* Small Circular Orb with Image & Neon Ring Lighting */}
                    <div
                      className="w-16 h-16 sm:w-20 sm:h-20 rounded-full relative p-0.5 overflow-hidden transition-all duration-300 shadow-2xl"
                      style={{
                        background: isSelected
                          ? `linear-gradient(135deg, ${item.color}, #030F1E)`
                          : 'rgba(10, 30, 50, 0.9)',
                        border: `2.5px solid ${isSelected ? item.color : 'rgba(255,255,255,0.4)'}`,
                        boxShadow: isSelected
                          ? `0 0 35px ${item.glow}, 0 0 15px ${item.color}`
                          : '0 8px 25px rgba(0,0,0,0.6)',
                      }}
                    >
                      {/* Image inside circle orb */}
                      <img
                        src={item.image}
                        alt={item.title}
                        className={`w-full h-full object-cover rounded-full transition-transform duration-500 group-hover:scale-115 ${
                          isSelected ? 'brightness-110 contrast-105' : 'brightness-85 opacity-90'
                        }`}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

                      {/* Small orb index tag */}
                      <div
                        className="absolute top-1 right-1 w-4.5 h-4.5 rounded-full flex items-center justify-center text-[9px] font-black text-white shadow-lg"
                        style={{ background: item.color }}
                      >
                        {index + 1}
                      </div>
                    </div>

                    {/* Location Name Label Badge below the circle orb */}
                    <div className="mt-1.5 px-2.5 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider text-white bg-black/80 backdrop-blur-md border border-white/20 shadow-lg text-center max-w-[110px] truncate">
                      {item.name}
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Orbit Controls & Status */}
            <div className="mt-10 flex items-center gap-4">
              <button
                onClick={() => setAutoRotate(!autoRotate)}
                className="flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-black uppercase tracking-wider border border-white/20 bg-white/10 hover:bg-white/20 transition-all text-white shadow-lg cursor-pointer"
              >
                <RefreshCw className={`w-4 h-4 ${autoRotate ? 'animate-spin-slow text-[#52B788]' : 'text-slate-400'}`} />
                {autoRotate ? 'Orbit Active' : 'Orbit Paused'}
              </button>
              <div className="text-xs font-mono text-slate-300 font-bold bg-white/5 px-3 py-1.5 rounded-full border border-white/10">
                {selectedIndex + 1} / {ORBIT_ITEMS.length} VVIP Experiences
              </div>
            </div>
          </div>

          {/* RIGHT: 3D PERSPECTIVE GLASS DISPLAY PANEL (7 cols) */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeItem.id}
                initial={{ opacity: 0, x: 30, rotateY: 10 }}
                animate={{ opacity: 1, x: 0, rotateY: 0 }}
                exit={{ opacity: 0, x: -30, rotateY: -10 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              >
                <TiltCard
                  maxTilt={10}
                  scaleOnHover={1.01}
                  glowColor={activeItem.glow}
                  className="rounded-3xl border"
                  style={{
                    background: 'linear-gradient(135deg, rgba(15, 30, 50, 0.96) 0%, rgba(5, 15, 30, 0.96) 100%)',
                    borderColor: `${activeItem.color}60`,
                    boxShadow: `0 30px 60px -15px rgba(0,0,0,0.7), 0 0 35px ${activeItem.glow}`,
                  }}
                >
                  <div className="p-7 sm:p-9 relative">
                    
                    {/* Header Row */}
                    <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
                      <div className="flex items-center gap-2.5">
                        <span
                          className="px-3.5 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider text-white shadow-md"
                          style={{
                            background: `linear-gradient(135deg, ${activeItem.color}, #030F1E)`,
                            border: `1px solid ${activeItem.color}`,
                          }}
                        >
                          {activeItem.category}
                        </span>
                        <span className="text-xs font-bold text-slate-300 flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5" style={{ color: activeItem.color }} />
                          {activeItem.distance}
                        </span>
                      </div>
                      
                      <div className="flex items-center gap-1 text-xs font-black text-amber-400 bg-white/10 px-3 py-1.5 rounded-full border border-white/20 shadow">
                        <Star className="w-3.5 h-3.5 fill-amber-400" />
                        {activeItem.rating}
                      </div>
                    </div>

                    {/* Main Title & Image Split */}
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center mb-6">
                      
                      {/* Left info */}
                      <div className="md:col-span-7">
                        <h3 className="text-2xl sm:text-3xl font-black text-white mb-2 leading-tight drop-shadow-md">
                          {activeItem.title}
                        </h3>
                        <div
                          className="text-xs font-extrabold uppercase tracking-wider mb-4"
                          style={{ color: activeItem.color }}
                        >
                          {activeItem.subtitle}
                        </div>
                        <p className="text-xs sm:text-sm text-slate-200 leading-relaxed mb-6 font-medium">
                          {activeItem.desc}
                        </p>

                        {/* Feature Badges */}
                        <div className="space-y-2 mb-6">
                          {activeItem.highlights.map((h) => (
                            <div key={h} className="flex items-center gap-2 text-xs text-slate-100 font-semibold">
                              <CheckCircle2 className="w-4 h-4 shrink-0" style={{ color: activeItem.color }} />
                              {h}
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Right Image Banner Preview */}
                      <div className="md:col-span-5 relative group rounded-2xl overflow-hidden border border-white/20 h-60 shadow-2xl">
                        <img
                          src={activeItem.image}
                          alt={activeItem.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                        <div className="absolute bottom-3 left-3 right-3 text-center">
                          <span className="text-[10px] font-black uppercase tracking-widest text-white bg-black/70 backdrop-blur-md px-3 py-1 rounded-full border border-white/20 shadow-md">
                            3D Interactive Preview
                          </span>
                        </div>
                      </div>

                    </div>

                    {/* Footer Stats & Booking Bar */}
                    <div className="pt-6 border-t border-white/15 flex flex-col sm:flex-row items-center justify-between gap-4">
                      
                      <div className="flex items-center gap-4 text-xs text-slate-200 font-medium">
                        <div className="flex items-center gap-1.5">
                          <Users className="w-4 h-4 text-slate-400" />
                          <span>{activeItem.capacity}</span>
                        </div>
                        <div className="w-1.5 h-1.5 rounded-full bg-white/40" />
                        <div className="flex items-center gap-1.5">
                          <ShieldCheck className="w-4 h-4 text-[#52B788]" />
                          <span>100% Guaranteed Fleet</span>
                        </div>
                      </div>

                      <button
                        onClick={() => onBookNow?.('Bhubaneswar', activeItem.title)}
                        className="w-full sm:w-auto px-7 py-3.5 rounded-xl text-xs font-black uppercase tracking-wider text-white shadow-2xl flex items-center justify-center gap-2 hover:scale-105 transition-all cursor-pointer"
                        style={{
                          background: `linear-gradient(135deg, ${activeItem.color}, #052B54)`,
                          boxShadow: `0 8px 25px ${activeItem.glow}`,
                        }}
                      >
                        Reserve {activeItem.category} <ArrowRight className="w-4 h-4" />
                      </button>

                    </div>

                  </div>

                </TiltCard>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>

        {/* ══ BOTTOM 3D CIRCULAR STAT METERS ══ */}
        <div className="mt-20 grid grid-cols-1 sm:grid-cols-3 gap-6">
          {[
            {
              title: '99.8% On-Time Precision',
              desc: 'Live GPS Fleet Tracking with real-time ETA monitoring',
              val: '99.8%',
              icon: <Zap className="w-5 h-5 text-[#E25822]" />,
              color: '#E25822',
            },
            {
              title: '5,000+ Verified Journeys',
              desc: 'Puri temple visits, weddings & corporate events completed',
              val: '5,000+',
              icon: <Crown className="w-5 h-5 text-[#E8C97A]" />,
              color: '#E8C97A',
            },
            {
              title: '100% Sanitized & Insured',
              desc: 'All-inclusive VVIP luxury fleet with certified drivers',
              val: '100%',
              icon: <ShieldCheck className="w-5 h-5 text-[#52B788]" />,
              color: '#52B788',
            },
          ].map((stat, i) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <TiltCard
                maxTilt={12}
                scaleOnHover={1.03}
                glowColor={`${stat.color}30`}
                className="p-6 rounded-2xl border"
                style={{
                  background: 'rgba(10, 25, 45, 0.7)',
                  borderColor: 'rgba(255, 255, 255, 0.15)',
                  backdropFilter: 'blur(16px)',
                }}
              >
                <div className="flex items-center gap-4">
                  {/* Circular Dial gauge */}
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center shrink-0 relative"
                    style={{
                      background: `radial-gradient(circle, ${stat.color}25 0%, transparent 70%)`,
                      border: `2px solid ${stat.color}80`,
                      boxShadow: `0 0 20px ${stat.color}40`,
                    }}
                  >
                    {stat.icon}
                  </div>
                  <div>
                    <div className="text-xl font-black text-white">{stat.val}</div>
                    <div className="text-xs font-bold text-slate-100 mt-0.5">{stat.title}</div>
                    <div className="text-[11px] text-slate-300 mt-1 leading-snug font-medium">{stat.desc}</div>
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}

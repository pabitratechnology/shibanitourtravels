import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ShieldCheck, Wifi, Compass, Sparkles, Navigation,
  Award, Zap, CheckCircle2, Crown, Volume2, AirVent, Armchair
} from 'lucide-react';
import TiltCard from './TiltCard.js';

interface ComfortFeature {
  id: string;
  title: string;
  category: string;
  iconName: string;
  desc: string;
  stats: { label: string; value: string }[];
  image: string;
  accent: string;
  glow: string;
}

const COMFORT_FEATURES: ComfortFeature[] = [
  {
    id: 'seats',
    title: 'VVIP Royal Pushback Leather Recliners',
    category: 'First-Class Ergonomics',
    iconName: 'Armchair',
    desc: 'Custom anatomical Italian leather seating with 140° recline, extended leg support & individual armrests designed for long interstate journeys.',
    stats: [
      { label: 'Recline Angle', value: '140° Max' },
      { label: 'Upholstery', value: 'Perforated Leather' },
      { label: 'Comfort Score', value: '5.0 / 5.0' },
    ],
    image: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=800&q=80',
    accent: '#C4956A',
    glow: 'rgba(196, 149, 106, 0.35)',
  },
  {
    id: 'climate',
    title: 'Tri-Zone Climate Control & Air Ionizer',
    category: 'Cabin Environment',
    iconName: 'AirVent',
    desc: 'Individual AC vents per passenger seat with true HEPA PM2.5 filtration and automatic humidity regulation throughout Odisha\'s warm summers.',
    stats: [
      { label: 'Air Purity', value: 'HEPA Filtered' },
      { label: 'Cooling Time', value: '< 2 Mins' },
      { label: 'Vents', value: 'Dedicated Per Row' },
    ],
    image: 'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=800&q=80',
    accent: '#52B788',
    glow: 'rgba(82, 183, 136, 0.35)',
  },
  {
    id: 'gps',
    title: '24/7 Satellite GPS & Highway Safety Escort',
    category: 'Security & Tracking',
    iconName: 'Navigation',
    desc: 'Every vehicle is integrated into our centralized Bhubaneswar Control Room with real-time speed monitoring, panic button & SOS dispatch.',
    stats: [
      { label: 'Track Refresh', value: 'Every 5 Secs' },
      { label: 'Control Room', value: '24/7 Active' },
      { label: 'Permits', value: 'Pan-India All-State' },
    ],
    image: 'https://images.unsplash.com/photo-1508974239320-0a029497e820?auto=format&fit=crop&w=800&q=80',
    accent: '#E25822',
    glow: 'rgba(226, 88, 34, 0.35)',
  },
  {
    id: 'wifi',
    title: 'High-Speed Wi-Fi & Multi-Device Charging',
    category: 'Onboard Tech Suite',
    iconName: 'Wifi',
    desc: 'Seamless 5G connectivity for laptops & phones with individual USB-C fast charging ports beside every passenger seat.',
    stats: [
      { label: 'Network', value: '5G High Speed' },
      { label: 'Charging', value: 'Dual Ports / Seat' },
      { label: 'Audio', value: 'Surround Sound' },
    ],
    image: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=800&q=80',
    accent: '#3B82F6',
    glow: 'rgba(59, 130, 246, 0.35)',
  },
];

export default function Fleet3DComfortSphere() {
  const [activeTab, setActiveTab] = useState(0);
  const current = COMFORT_FEATURES[activeTab];

  return (
    <section className="py-24 relative overflow-hidden bg-[#FAF8F5]">
      {/* Dynamic 3D ambient radial ring */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute -bottom-24 -right-24 w-[700px] h-[700px] rounded-full opacity-20"
          style={{
            background: `radial-gradient(circle, ${current.glow} 0%, transparent 70%)`,
            filter: 'blur(100px)',
            transition: 'all 0.8s ease',
          }}
        />
        {/* Decorative circular ring stroke */}
        <div className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full border border-slate-200/60 pointer-events-none" />
        <div className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full border border-dashed border-slate-200/40 pointer-events-none animate-spin-slow" />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#2D6A4F]/20 bg-[#2D6A4F]/10 text-[#2D6A4F] text-[10px] font-black uppercase tracking-widest mb-3">
              <Crown className="w-3.5 h-3.5" />
              3D Comfort & Tech Architecture
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
              Engineered For{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1A3C28] via-[#2D6A4F] to-[#C4956A]">
                Unrivaled VVIP Luxury
              </span>
            </h2>
          </div>
          <p className="text-slate-600 text-xs sm:text-sm max-w-md leading-relaxed">
            Every vehicle in our fleet is custom-spec'd with first-class amenities to ensure smooth, restful, and safe travel across Odisha.
          </p>
        </div>

        {/* ══ INTERACTIVE CIRCULAR TAB SELECTORS ══ */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-12">
          {COMFORT_FEATURES.map((feat, idx) => {
            const isActive = idx === activeTab;
            return (
              <button
                key={feat.id}
                onClick={() => setActiveTab(idx)}
                className="relative group p-4 sm:p-5 rounded-2xl border text-left transition-all duration-300 cursor-pointer overflow-hidden"
                style={{
                  background: isActive
                    ? 'linear-gradient(135deg, #1A3C28 0%, #2D6A4F 100%)'
                    : '#FFFFFF',
                  borderColor: isActive ? '#2D6A4F' : '#E2E8F0',
                  boxShadow: isActive
                    ? '0 12px 30px -8px rgba(26, 60, 40, 0.3)'
                    : '0 2px 10px rgba(0,0,0,0.03)',
                }}
              >
                {/* Active Circular Glow Pill */}
                {isActive && (
                  <div
                    className="absolute -right-6 -bottom-6 w-24 h-24 rounded-full pointer-events-none opacity-40"
                    style={{ background: feat.accent, filter: 'blur(20px)' }}
                  />
                )}

                <div className="relative z-10 flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-transform group-hover:scale-110"
                    style={{
                      background: isActive ? 'rgba(255,255,255,0.15)' : 'rgba(45, 106, 79, 0.08)',
                      color: isActive ? '#FFFFFF' : '#2D6A4F',
                    }}
                  >
                    {idx === 0 && <Armchair className="w-5 h-5" />}
                    {idx === 1 && <AirVent className="w-5 h-5" />}
                    {idx === 2 && <Navigation className="w-5 h-5" />}
                    {idx === 3 && <Wifi className="w-5 h-5" />}
                  </div>
                  <div>
                    <span className="text-[9px] font-black uppercase tracking-wider block" style={{ color: isActive ? '#C4956A' : '#718096' }}>
                      Feature 0{idx + 1}
                    </span>
                    <span className="text-xs font-black truncate block" style={{ color: isActive ? '#FFFFFF' : '#1A202C' }}>
                      {feat.category}
                    </span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* ══ DISPLAY STAGE WITH 3D CARD TILT ══ */}
        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
          >
            <TiltCard
              maxTilt={8}
              scaleOnHover={1.01}
              glowColor={current.glow}
              className="rounded-3xl border overflow-hidden"
              style={{
                background: '#FFFFFF',
                borderColor: 'rgba(45, 106, 79, 0.15)',
                boxShadow: '0 20px 50px -15px rgba(26, 60, 40, 0.12)',
              }}
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 p-8 lg:p-12 items-center">
                
                {/* Left Text & Spec Counters (7 cols) */}
                <div className="lg:col-span-7">
                  <div className="flex items-center gap-2 mb-3">
                    <span
                      className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider"
                      style={{
                        background: 'rgba(45, 106, 79, 0.08)',
                        color: '#2D6A4F',
                        border: '1px solid rgba(45, 106, 79, 0.2)',
                      }}
                    >
                      {current.category}
                    </span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-black text-slate-900 mb-4 leading-snug">
                    {current.title}
                  </h3>

                  <p className="text-sm text-slate-600 leading-relaxed mb-8">
                    {current.desc}
                  </p>

                  {/* 3D Circular Counter Widgets */}
                  <div className="grid grid-cols-3 gap-4 border-t border-slate-100 pt-6">
                    {current.stats.map((st) => (
                      <div key={st.label} className="p-3.5 rounded-2xl bg-[#FAF8F5] border border-slate-200/80 text-center">
                        <div className="text-base sm:text-lg font-black text-[#1A3C28]">{st.value}</div>
                        <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mt-0.5">{st.label}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right Feature Showcase Banner (5 cols) */}
                <div className="lg:col-span-5 relative">
                  <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-slate-200 group h-72 sm:h-80">
                    <img
                      src={current.image}
                      alt={current.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />
                    
                    {/* Floating badge */}
                    <div className="absolute bottom-4 left-4 right-4 p-3.5 rounded-xl bg-white/90 backdrop-blur-md border border-white/60 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <ShieldCheck className="w-4 h-4 text-[#2D6A4F]" />
                        <span className="text-[11px] font-bold text-slate-800">Shibani Standard Verified</span>
                      </div>
                      <span className="text-[10px] font-black uppercase text-[#C4956A]">VVIP Grade</span>
                    </div>
                  </div>
                </div>

              </div>
            </TiltCard>
          </motion.div>
        </AnimatePresence>

      </div>
    </section>
  );
}

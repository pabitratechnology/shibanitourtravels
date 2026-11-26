import React from 'react';
import { motion } from 'motion/react';
import {
  Handshake, Star, ShieldCheck, Headphones, Smile,
  ArrowRight
} from 'lucide-react';

const BADGES = [
  {
    title: 'Trusted Travel Partner',
    icon: <Handshake className="w-7 h-7 text-[#059669]" />,
    bg: '#D1FAE5',
    border: '#A7F3D0',
  },
  {
    title: 'Affordable Pricing',
    icon: <Star className="w-7 h-7 text-[#CA8A04]" />,
    bg: '#FEF3C7',
    border: '#FDE68A',
  },
  {
    title: 'Safety First',
    icon: <ShieldCheck className="w-7 h-7 text-[#16A34A]" />,
    bg: '#DCFCE7',
    border: '#BBF7D0',
  },
  {
    title: '24x7 Support',
    icon: <Headphones className="w-7 h-7 text-[#D97706]" />,
    bg: '#FFEDD5',
    border: '#FED7AA',
  },
  {
    title: 'Happy Customers',
    icon: <Smile className="w-7 h-7 text-[#EAB308]" />,
    bg: '#FEF9C3',
    border: '#FEF08A',
  },
];

export default function WhyChooseUs() {
  return (
    <section className="py-16 sm:py-20 bg-[#FBFDFB] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight">
            <span className="text-[#006837]">Why Choose</span>{' '}
            <span className="text-[#D32F2F]">Shibani Travels?</span>
          </h2>
        </div>

        {/* Content Layout: 5 Feature Badges (Left/Center) + Quote Card (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* 5 Feature Badges in Rounded Card Chips */}
          <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {BADGES.map((b, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -6, scale: 1.04 }}
                className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col items-center text-center cursor-default group"
              >
                {/* Circular Icon Ring */}
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center mb-3 transition-transform duration-300 group-hover:scale-110"
                  style={{
                    background: b.bg,
                    border: `2px solid ${b.border}`,
                  }}
                >
                  {b.icon}
                </div>

                {/* Badge Title */}
                <h3 className="text-xs font-black text-slate-800 leading-tight group-hover:text-[#006837] transition-colors">
                  {b.title}
                </h3>
              </motion.div>
            ))}
          </div>

          {/* Right: "Your Journey... Our Priority" Card */}
          <div className="lg:col-span-4">
            <div
              className="relative rounded-3xl overflow-hidden p-6 sm:p-8 flex flex-col justify-end min-h-[220px] sm:min-h-[240px] shadow-xl group cursor-pointer"
              style={{
                background: 'linear-gradient(135deg, #FEF3C7 0%, #FDE68A 30%, #D1FAE5 100%)',
              }}
            >
              {/* Mountain & Traveler Silhouette Art */}
              <div className="absolute right-4 bottom-0 w-36 h-36 opacity-80 pointer-events-none transition-transform duration-500 group-hover:scale-105">
                <svg viewBox="0 0 100 100" fill="none" className="w-full h-full text-slate-900">
                  {/* Mountain peak */}
                  <path d="M40 90 L65 50 L90 90 Z" fill="#1E293B" />
                  <path d="M10 90 L45 35 L70 90 Z" fill="#334155" />
                  {/* Hiker silhouette on summit */}
                  <circle cx="45" cy="28" r="3.5" fill="#0F172A" />
                  <path d="M45 32 L45 42 L40 50 M45 42 L49 50 M41 36 L49 36" stroke="#0F172A" strokeWidth="2" strokeLinecap="round" />
                  <path d="M48 33 L52 38" stroke="#0F172A" strokeWidth="2.5" />
                  {/* Flying bird */}
                  <path d="M20 25 Q24 22 28 25 Q32 22 36 25" stroke="#475569" strokeWidth="1.5" fill="none" />
                </svg>
              </div>

              {/* Text Quote */}
              <div className="relative z-10 max-w-[210px]">
                <span className="font-serif-heading italic text-xl sm:text-2xl font-bold text-slate-900 block leading-tight">
                  “Your Journey...
                </span>
                <span className="font-serif-heading italic text-xl sm:text-2xl font-bold text-[#D32F2F] block leading-tight mt-1">
                  Our Priority”
                </span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

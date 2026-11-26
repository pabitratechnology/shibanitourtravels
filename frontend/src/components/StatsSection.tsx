import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { TrendingUp, Car, Users, MapPin, Award, Clock } from 'lucide-react';
import TiltCard from './TiltCard.js';

const STATS = [
  { val: 28,  suffix: '+', label: 'Years in Business',       icon: <Award className="w-6 h-6" />,      color: '#C4956A', bg: 'rgba(196, 149, 106, 0.15)' },
  { val: 80,  suffix: '+', label: 'Premium Vehicles',       icon: <Car className="w-6 h-6" />,        color: '#E8C97A', bg: 'rgba(232, 201, 122, 0.15)' },
  { val: 5000, suffix: '+', label: 'Happy Clients',         icon: <Users className="w-6 h-6" />,      color: '#52B788', bg: 'rgba(82, 183, 136, 0.15)' },
  { val: 30,  suffix: '',  label: 'Districts Covered',      icon: <MapPin className="w-6 h-6" />,     color: '#E25822', bg: 'rgba(226, 88, 34, 0.15)' },
  { val: 24,  suffix: '/7', label: 'Support Desk',          icon: <Clock className="w-6 h-6" />,      color: '#C4956A', bg: 'rgba(196, 149, 106, 0.15)' },
  { val: 4.9, suffix: '★', label: 'Google Rating',         icon: <TrendingUp className="w-6 h-6" />, color: '#E8C97A', bg: 'rgba(232, 201, 122, 0.15)' },
];

function CountUp({ target, suffix, duration = 2000 }: { target: number; suffix: string; duration?: number }) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStarted(true); },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    const isDecimal = target % 1 !== 0;
    const steps = 60;
    const step = target / steps;
    let current = 0;
    const interval = setInterval(() => {
      current = Math.min(current + step, target);
      setCount(isDecimal ? parseFloat(current.toFixed(1)) : Math.round(current));
      if (current >= target) clearInterval(interval);
    }, duration / steps);
    return () => clearInterval(interval);
  }, [started, target, duration]);

  return <span ref={ref}>{count}{suffix}</span>;
}

export default function StatsSection() {
  return (
    <section className="py-28 relative overflow-hidden bg-[#051624]">
      {/* 3D Circular Orbit Lines & Ambient Glows */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute top-1/4 left-10 w-[600px] h-[600px] rounded-full opacity-20 animate-pulse"
          style={{ background: 'radial-gradient(circle, #2D6A4F 0%, transparent 70%)', filter: 'blur(100px)' }}
        />
        <div
          className="absolute bottom-1/4 right-10 w-[600px] h-[600px] rounded-full opacity-20 animate-pulse"
          style={{ background: 'radial-gradient(circle, #8B5E3C 0%, transparent 70%)', filter: 'blur(120px)' }}
        />
        {/* Concentric spinning orbital dashed circles */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full border border-dashed border-white/10 animate-spin-slow pointer-events-none" />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-[#C4956A]/30 bg-[#C4956A]/10 text-[#C4956A] text-[10px] font-black uppercase tracking-widest mb-4 shadow-sm backdrop-blur-md">
            ✦ 3D Performance Metrics
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight mb-4 leading-tight">
            Odisha's Largest & Most <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E8C97A] via-[#C4956A] to-[#52B788]">
              Trusted Travel Fleet
            </span>
          </h2>
          <p className="text-slate-300 text-sm max-w-xl mx-auto leading-relaxed">
            Built on reliability, driven by professionals. From premium wedding cars to luxury group coaches, we set the benchmark for travel in Odisha.
          </p>
        </div>

        {/* Stats Grid with 3D Tilt & Glowing Circular Icon Halos */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
          {STATS.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
            >
              <TiltCard
                maxTilt={14}
                scaleOnHover={1.04}
                glowColor={`${s.color}35`}
                className="p-6 rounded-3xl border text-center h-full transition-all duration-300"
                style={{
                  background: 'rgba(10, 25, 45, 0.7)',
                  backdropFilter: 'blur(20px)',
                  borderColor: 'rgba(255, 255, 255, 0.1)',
                  boxShadow: '0 10px 35px 0 rgba(0, 0, 0, 0.3)',
                }}
              >
                <div className="relative z-10 flex flex-col justify-between h-full items-center">
                  {/* Glowing Circular Icon Halo */}
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center mb-5 relative transition-all duration-300 shadow-xl border"
                    style={{
                      background: s.bg,
                      color: s.color,
                      borderColor: `${s.color}50`,
                      boxShadow: `0 0 25px ${s.color}30`,
                    }}
                  >
                    <div
                      className="absolute inset-0 rounded-full border border-dashed border-current opacity-40 animate-spin-slow pointer-events-none"
                      style={{ animationDuration: '18s' }}
                    />
                    {s.icon}
                  </div>

                  {/* Count Up Number */}
                  <div
                    className="text-3xl sm:text-4xl font-black tracking-tight mb-2"
                    style={{ color: s.color }}
                  >
                    <CountUp target={s.val} suffix={s.suffix} />
                  </div>

                  {/* Label */}
                  <div className="text-[10px] font-black text-slate-300 uppercase tracking-widest leading-relaxed">
                    {s.label}
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

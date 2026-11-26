import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Award, Shield, Users, CheckCircle2, Star, MapPin,
  Zap, Globe, Clock, Heart, TrendingUp, Phone, ArrowRight,
  Sparkles, Compass, Eye, ShieldAlert, Car, HelpCircle, ChevronDown, Check, ChevronRight, Home
} from 'lucide-react';

const STATS = [
  { val: '28+', label: 'Years in Business', icon: Award, desc: 'Serving Odisha since 1998' },
  { val: '80+', label: 'Premium Vehicles', icon: Zap, desc: 'GPS-tracked luxury fleet' },
  { val: '50,000+', label: 'Happy Journeys', icon: Heart, desc: 'Families & corporates served' },
  { val: '4.9★', label: 'Google Rating', icon: Star, desc: 'Odisha\'s top-rated operator' },
];

const PILLARS = [
  {
    icon: Compass,
    title: 'Our Mission',
    subtitle: 'Redefining Road Travel',
    desc: 'To deliver unparalleled road travel experiences across Odisha by combining luxurious comfort, absolute transparency, and state-of-the-art vehicle safety protocols.',
    accent: '#006837',
  },
  {
    icon: Eye,
    title: 'Our Vision',
    subtitle: 'Setting New Benchmarks',
    desc: 'To establish Shibani Travels as the undisputed gold standard for luxury passenger transport in East India, constantly pioneering premium vehicle launches and carbon-efficient operations.',
    accent: '#D32F2F',
  },
  {
    icon: ShieldAlert,
    title: 'Our Safety Code',
    subtitle: 'No Compromise Operations',
    desc: 'Ensuring zero accident tolerances through defensive driving training, routine checks, continuous GPS speed monitoring, and certified workshop inspections.',
    accent: '#006837',
  },
];

const VALUES = [
  { icon: Shield, title: 'Safety First', color: '#006837', desc: 'Every vehicle is GPS-tracked, fire-extinguisher equipped, and inspected before every trip.' },
  { icon: Users, title: 'Expert Chauffeurs', color: '#D32F2F', desc: 'Background-checked, defensive-driving certified, and locally knowledgeable multi-lingual drivers.' },
  { icon: CheckCircle2, title: 'Zero Hidden Costs', color: '#006837', desc: 'Flat transparent fares. No helper allowances, toll tricks, or surprise fuel surcharges. Ever.' },
  { icon: Globe, title: 'Pan-Odisha Network', color: '#D32F2F', desc: 'We cover every major city, temple, and coastal destination across Odisha and beyond.' },
  { icon: Clock, title: '24/7 Availability', color: '#006837', desc: 'Round-the-clock dispatch, real-time support, and last-minute bookings handled with care.' },
  { icon: TrendingUp, title: 'Luxury Standards', color: '#D32F2F', desc: 'Pristine vehicle operations with captain seats, ambient lighting, and fresh cabin sanitization.' },
];

const MILESTONES = [
  { year: '1998', title: 'Shibani Travels Founded', desc: 'Started with premium passenger transit in Bhubaneswar, servicing corporate clients and newlyweds.' },
  { year: '2012', title: 'Fleet Expansion', desc: 'Grew to 20 vehicles including Tempo Travellers for group travel and pilgrimage tours.' },
  { year: '2015', title: 'Corporate Wing Launch', desc: 'Signed MoUs with major IT parks and PSU enterprises for employee shuttle services.' },
  { year: '2019', title: 'Odisha Pilgrimage Circuit', desc: 'Launched curated luxury tours for Puri, Konark, Chilika, and Similipal destinations.' },
  { year: '2023', title: 'Force Urbania Pioneer', desc: 'First operator in Odisha to introduce the super-luxury Force Urbania for premium groups.' },
  { year: '2026', title: '80+ Fleet Milestone', desc: "Odisha's largest GPS-tracked, government-recognized luxury transport fleet — still growing." },
];

const FAQS = [
  {
    q: 'How does Shibani Travels ensure the safety of female and family travellers?',
    a: 'We implement 24/7 real-time GPS tracking on every trip, monitored by our dispatch operations room. Additionally, all drivers undergo strict criminal record verification, and emergency SOS buttons are configured for immediate backup response.',
  },
  {
    q: 'Are there any hidden costs like driver beta, helper allowance, or fuel hikes?',
    a: 'Absolutely not. We pride ourselves on offering fully transparent quotes. The price agreed upon at the time of booking includes driver allowances, toll taxes, and fuel. Zero surprise surcharges.',
  },
  {
    q: 'What is your refund policy if my travel plans change?',
    a: 'We offer free cancellation up to 24 hours before your scheduled pickup. Any advance deposit paid will be refunded directly to your original payment method with zero cancellation fees.',
  },
  {
    q: 'Can we book vehicles for luxury wedding ceremonies in Bhubaneswar and Puri?',
    a: 'Yes, we specialize in high-end wedding transit coordination. We offer luxury sedans (like Mercedes S-Class) and matching VIP Fortuner convoys, decorated beautifully with premium floral arrangements upon request.',
  },
];

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 22 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-40px' },
  transition: { duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] as any },
});

export default function AboutPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="bg-[#FAFDFB] text-slate-800 font-sans overflow-hidden">
      
      {/* ═══ ADVANCED PAGE HERO (Consistent with Brand Green) ═══ */}
      <div className="relative pt-[110px] pb-16 px-6 bg-gradient-to-r from-[#00381B] via-[#004D26] to-[#00381B] text-white overflow-hidden text-center">
        {/* Scenic Background image overlay */}
        <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
          <img
            src="/banners/konark_temple.png"
            alt="About Shibani Travels"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="max-w-5xl mx-auto relative z-10">
          {/* Breadcrumb */}
          <div className="flex items-center justify-center gap-2 text-xs font-semibold text-green-100 bg-white/10 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/20 w-max mx-auto mb-5 shadow-sm">
            <button onClick={() => window.location.href = '/'} className="flex items-center gap-1 hover:text-white">
              <Home className="w-3.5 h-3.5" /> Home
            </button>
            <ChevronRight className="w-3 h-3 text-white/50" />
            <span className="text-amber-300 font-bold">About Us</span>
          </div>

          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-[10px] font-black uppercase tracking-widest text-[#86EFAC] bg-white/10 border border-white/20 mb-4">
            <Sparkles className="w-3.5 h-3.5" /> Over 28 Years in Business
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight mb-4">
            About <span className="text-green-300">Shibani</span> <span className="text-red-400">Travels</span>
          </h1>

          <p className="text-green-100/90 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed font-medium mb-8">
            Odisha's foremost travel management company &amp; luxury fleet provider for more than 28 years (since 1998). Connecting pilgrims, corporate leaders, and vacationers to the sacred soul of Odisha.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-xs font-bold">
            {['28+ Years in Business', '80+ Premium Vehicles', '50,000+ Happy Guests', 'Govt. Recognized DMC'].map((b, idx) => (
              <span key={idx} className="bg-white/15 px-3 py-1.5 rounded-full border border-white/20 text-white flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-amber-300 stroke-[3]" />
                {b}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ═══ STATS GRID (Clean White Cards) ═══ */}
      <div className="bg-white py-12 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 grid grid-cols-2 lg:grid-cols-4 gap-6">
          {STATS.map(({ val, label, icon: Icon, desc }, i) => (
            <motion.div key={i} {...fade(i * 0.06)} className="bg-[#F8FAF9] p-5 rounded-2xl border border-slate-100 flex items-center gap-4 group">
              <div className="w-12 h-12 rounded-xl bg-green-100 text-[#006837] flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                <Icon className="w-6 h-6" />
              </div>
              <div className="text-left">
                <p className="text-2xl sm:text-3xl font-black text-[#006837] leading-none">{val}</p>
                <p className="text-xs font-bold text-slate-800 mt-1">{label}</p>
                <p className="text-[10px] text-slate-500 font-medium">{desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ═══ MISSION, VISION & SAFETY CODE ═══ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-20 relative z-10 text-center">
        <div className="mb-14">
          <div className="flex items-center justify-center gap-3 mb-2">
            <div className="w-8 sm:w-12 h-0.5 bg-[#006837]" />
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight">
              <span className="text-[#006837]">Our Core</span>{' '}
              <span className="text-[#D32F2F]">Pillars</span>
            </h2>
            <div className="w-8 sm:w-12 h-0.5 bg-[#006837]" />
          </div>
          <p className="text-xs sm:text-sm font-semibold text-slate-500 max-w-lg mx-auto">
            The foundation of trust, safety, and reliability behind every Shibani Travels journey
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 sm:gap-8">
          {PILLARS.map(({ icon: Icon, title, subtitle, desc, accent }, idx) => (
            <motion.div
              key={idx}
              {...fade(idx * 0.08)}
              className="bg-white rounded-3xl p-8 border border-slate-100 shadow-md hover:shadow-xl transition-all duration-300 text-left group"
            >
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform"
                style={{ background: `${accent}15`, color: accent }}
              >
                <Icon className="w-7 h-7" />
              </div>
              <h3 className="text-lg font-black text-slate-900 mb-1">{title}</h3>
              <p className="text-xs font-bold uppercase tracking-wider mb-3" style={{ color: accent }}>{subtitle}</p>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">{desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ═══ STORY DETAIL & HERITAGE ═══ */}
      <section className="bg-white py-20 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            
            {/* Text block */}
            <motion.div {...fade(0)} className="text-left">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-50 text-[#006837] text-xs font-bold uppercase tracking-wider mb-3">
                <Sparkles className="w-3.5 h-3.5" /> Behind The Brand
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 mb-5 leading-tight">
                Elevating Road Travel Standards in <span className="text-[#006837]">Odisha</span>
              </h2>
              <p className="text-slate-600 leading-relaxed text-sm mb-4 font-medium">
                Founded on the belief that travel is more than just reaching a destination, <strong>Shibani Travels</strong> has evolved from a three-sedan enterprise into one of the largest corporate and tourist logistics providers in Eastern India.
              </p>
              <p className="text-slate-600 leading-relaxed text-sm mb-6 font-medium">
                Whether arranging VIP pilgrimage transport to Puri Jagannath Temple, coordinating corporate MICE logistics, or managing luxury wedding convoys, our core motto remains unbroken: complete punctuality, transparent fixed billing, and zero-compromise safety.
              </p>

              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-100">
                <div>
                  <h4 className="text-xl font-black text-[#006837]">100%</h4>
                  <span className="text-xs text-slate-500 font-bold">Guaranteed Departures</span>
                </div>
                <div>
                  <h4 className="text-xl font-black text-[#D32F2F]">0</h4>
                  <span className="text-xs text-slate-500 font-bold">Hidden Surcharges</span>
                </div>
              </div>
            </motion.div>

            {/* Visual Montage */}
            <motion.div {...fade(0.15)} className="relative">
              <div className="rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
                <img
                  src="/banners/travel_fleet.png"
                  alt="Shibani Travels Fleet"
                  className="w-full h-80 sm:h-96 object-cover"
                />
              </div>

              {/* Overlapping Card */}
              <div className="absolute -bottom-6 -left-6 bg-[#004D26] text-white p-5 rounded-2xl shadow-xl flex items-center gap-3.5 border-2 border-green-400/40">
                <Car className="w-8 h-8 text-amber-300 shrink-0" />
                <div className="text-left">
                  <span className="text-lg font-black block leading-none">80+ Cabs & Buses</span>
                  <span className="text-[10px] text-green-200 font-medium">Pristine AC Fleet In Service</span>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ═══ 6 CORE VALUES ═══ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-20 text-center">
        <div className="mb-14">
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight mb-2">
            Why Travelers <span className="text-[#006837]">Trust Us</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 font-medium">
            Certified protocols delivering safety, comfort, and peace of mind on every kilometer
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {VALUES.map((val, idx) => (
            <div key={idx} className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-md transition-all text-left flex items-start gap-4">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                style={{ background: `${val.color}15`, color: val.color }}
              >
                <val.icon className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-sm font-black text-slate-900 mb-1">{val.title}</h4>
                <p className="text-xs text-slate-500 leading-relaxed font-medium">{val.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ TIMELINE MILESTONES ═══ */}
      <section className="bg-[#F2F8F4] py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight mb-12">
            Our Journey <span className="text-[#006837]">(1998 — 2026)</span>
          </h2>

          <div className="space-y-4">
            {MILESTONES.map((m, idx) => (
              <div key={idx} className="bg-white rounded-2xl p-5 shadow-xs border border-slate-100 flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-4">
                <span className="px-3.5 py-1 rounded-full bg-green-100 text-[#006837] text-xs font-black shrink-0">
                  {m.year}
                </span>
                <div>
                  <h4 className="text-sm font-black text-slate-900">{m.title}</h4>
                  <p className="text-xs text-slate-500 font-medium mt-0.5">{m.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}

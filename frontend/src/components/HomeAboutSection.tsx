import React from 'react';
import { motion } from 'motion/react';
import {
  ShieldCheck, Award, Users, Car, Clock, CheckCircle2,
  ArrowRight, PhoneCall, HeartHandshake, Compass
} from 'lucide-react';

interface HomeAboutSectionProps {
  onLearnMore?: () => void;
  onBookNow?: () => void;
}

const STATS = [
  { val: '28+', label: 'Years in Business', sub: 'Serving Odisha Since 1998' },
  { val: '80+', label: 'Luxury Fleet', sub: 'Innova, Urbania, Mercedes & Buses' },
  { val: '50,000+', label: 'Happy Passengers', sub: 'Families, VIPs & Corporates' },
  { val: '4.9★', label: 'Google Rating', sub: 'Odisha\'s Top-Rated Operator' },
];

export default function HomeAboutSection({ onLearnMore, onBookNow }: HomeAboutSectionProps) {
  return (
    <section className="py-20 sm:py-24 bg-white relative overflow-hidden">
      
      {/* Ambient background decoration */}
      <div className="absolute top-1/2 -left-20 w-80 h-80 rounded-full bg-green-100/40 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        
        {/* Main Grid: Left Story + Right Visual Montage */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center mb-16">
          
          {/* Left: Brand Story & Values (6 cols) */}
          <div className="lg:col-span-6 text-left">
            
            {/* Tag: — About Shibani Travels — (Matches Mockup) */}
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-0.5 bg-[#006837]" />
              <span className="text-xs font-bold uppercase tracking-wider text-[#006837]">About Shibani Travels</span>
              <div className="w-8 h-0.5 bg-[#006837]" />
            </div>

            {/* Headline & 28+ Years in Business Gold Badge */}
            <div className="flex items-center justify-between flex-wrap gap-4 mb-5">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-[1.12]">
                Your <span className="text-[#006837]">Trusted</span> Travel Partner
              </h2>
              <div className="inline-flex items-center gap-2.5 bg-gradient-to-r from-amber-50 to-amber-100/80 border border-amber-300/80 rounded-2xl px-3.5 py-2 shadow-xs">
                <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-amber-600 to-amber-400 text-white font-black text-xs flex items-center justify-center shadow-xs">
                  28+
                </div>
                <div className="text-left">
                  <span className="text-xs font-black text-slate-900 block leading-tight">28+ Years</span>
                  <span className="text-[9.5px] text-amber-800 font-bold uppercase tracking-wider">In Business</span>
                </div>
              </div>
            </div>

            {/* Paragraphs */}
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-medium mb-4">
              Headquartered in Bhubaneswar, <strong>Shibani Travels</strong> was founded with a singular mission: to deliver safe, transparent, and royal road travel experiences across Odisha and pan-India.
            </p>

            <p className="text-sm text-slate-600 leading-relaxed font-medium mb-6">
              Whether you are embarking on a sacred pilgrimage to Puri Jagannath Temple, hosting a regal wedding with our decorated Mercedes convoy, or organizing corporate transit in our high-roof Force Urbanias, our team ensures 100% on-time arrivals, pristine air-conditioned cabins, and verified courteous chauffeurs.
            </p>

            {/* Core Commitments Checklist */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
              {[
                '100% Fixed Transparent Fares (No Hidden Costs)',
                'Live GPS-Tracked & Regularly Sanitized Fleet',
                'Police-Verified & Multilingual Chauffeurs',
                '24/7 Dedicated Dispatch & On-Road Support Desk',
              ].map((item, idx) => (
                <div key={idx} className="flex items-start gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-green-100 text-[#006837] flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-xs font-bold text-slate-800 leading-snug">
                    {item}
                  </span>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4">
              <button
                onClick={onLearnMore}
                className="px-6 py-3 rounded-full text-xs sm:text-sm font-bold text-white bg-[#006837] hover:bg-[#008746] shadow-md transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>Read Full Story</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href="tel:+919861117168"
                className="px-5 py-3 rounded-full text-xs sm:text-sm font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors flex items-center gap-2"
              >
                <PhoneCall className="w-4 h-4 text-[#006837]" />
                <span>+91 9861117168</span>
              </a>
            </div>

          </div>

          {/* Right: Visual Image Collage with Overlapping Badges (6 cols) */}
          <div className="lg:col-span-6 relative">
            <div className="relative mx-auto max-w-md sm:max-w-lg">
              
              {/* Primary Image: Fleet / Konark Backdrop */}
              <div className="rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
                <img
                  src="/banners/konark_temple.png"
                  alt="Konark Heritage & Shibani Travels"
                  className="w-full h-80 sm:h-96 object-cover"
                />
              </div>

              {/* Overlapping Secondary Image: Real Innova Crysta / Vehicle */}
              <div className="absolute -bottom-8 -left-6 sm:-left-10 w-48 sm:w-64 rounded-2xl overflow-hidden shadow-2xl border-4 border-white bg-white p-2">
                <img
                  src="/images/innova_crysta.png"
                  alt="Innova Crysta Luxury"
                  className="w-full h-auto object-contain"
                />
                <span className="block text-center text-[10px] font-black uppercase text-[#006837] mt-1">
                  80+ Vehicles In Service
                </span>
              </div>

              {/* Overlapping Floating Badge: 28+ Years */}
              <div className="absolute -top-6 -right-4 sm:-right-8 bg-[#004D26] text-white p-4 rounded-2xl shadow-xl flex items-center gap-3 border-2 border-green-300/40">
                <Award className="w-8 h-8 text-amber-400" />
                <div>
                  <span className="text-xl font-black block leading-none">28+ Years</span>
                  <span className="text-[10px] text-green-200 font-medium">In Business • Since 1998</span>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* ══ 4 KEY STAT COUNTERS ══ */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 pt-10 border-t border-slate-100">
          {STATS.map((s, idx) => (
            <div
              key={idx}
              className="bg-[#FAFCFA] rounded-2xl p-5 border border-slate-100 text-center shadow-xs hover:shadow-md transition-shadow"
            >
              <div className="text-3xl sm:text-4xl font-black text-[#006837] tracking-tight mb-1">
                {s.val}
              </div>
              <div className="text-xs sm:text-sm font-bold text-slate-800">
                {s.label}
              </div>
              <div className="text-[10px] text-slate-500 font-medium mt-0.5">
                {s.sub}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}


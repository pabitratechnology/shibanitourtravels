import React from 'react';
import {
  ShieldCheck, Clock, Award, PhoneCall, Sparkles,
  CheckCircle2, AlertCircle, RefreshCw, HeartHandshake, Shield
} from 'lucide-react';

interface SafetyTrustGuaranteeProps {
  onPlanTrip?: () => void;
}

export default function SafetyTrustGuarantee({ onPlanTrip }: SafetyTrustGuaranteeProps) {
  const GUARANTEES = [
    {
      icon: <Clock className="w-6 h-6 text-[#006837]" />,
      badge: 'Zero Delay',
      title: '100% On-Time Guarantee',
      desc: 'Your chauffeur arrives at your pickup location 15 minutes before the scheduled time. If we are late, receive a flat ₹500 travel credit.',
    },
    {
      icon: <Award className="w-6 h-6 text-amber-600" />,
      badge: 'Transparent',
      title: 'Zero Hidden Charges',
      desc: 'Tolls, state taxes, driver allowance, and fuel are calculated upfront. Never pay an unexpected rupee on the highway.',
    },
    {
      icon: <PhoneCall className="w-6 h-6 text-[#006837]" />,
      badge: '24/7 Security',
      title: 'Live GPS & Family SOS Link',
      desc: 'Every vehicle is tracked via real-time GPS. We share a live tracking link with you and your family for total peace of mind.',
    },
    {
      icon: <Sparkles className="w-6 h-6 text-amber-600" />,
      badge: 'Pristine Clean',
      title: 'Daily Deep Sanitization',
      desc: 'Triple-point vehicle inspection, odor-free air conditioned cabins, clean seat upholstery, and fresh bottled mineral water.',
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-[#006837]" />,
      badge: 'Vetted Experts',
      title: 'Police-Verified Chauffeurs',
      desc: 'Uniformed, courteous, strictly police-verified drivers with a minimum 8+ years of highway experience across Odisha.',
    },
    {
      icon: <RefreshCw className="w-6 h-6 text-amber-600" />,
      badge: 'Flexible',
      title: 'Instant Free Cancellation',
      desc: 'Plans change? Cancel your booking up to 2 hours before scheduled pickup with zero cancellation penalty and instant refund.',
    },
  ];

  return (
    <section className="py-16 sm:py-20 bg-white relative overflow-hidden border-b border-slate-100">
      
      {/* Decorative Brand Background */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest text-[#006837] bg-emerald-50 border border-emerald-200 mb-3 shadow-xs">
            <Shield className="w-3.5 h-3.5 text-[#006837]" />
            The Shibani Travel Promise
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-black text-slate-900 tracking-tight leading-tight mb-4">
            6-Pillar Supreme Safety &amp;{' '}
            <span className="bg-gradient-to-r from-[#006837] to-[#004D26] bg-clip-text text-transparent">
              Zero-Hassle Assurance
            </span>
          </h2>

          <p className="text-sm sm:text-base text-slate-600 font-medium leading-relaxed">
            Over 28+ years in business and 50,000+ journeys across Odisha, Shibani Travels has built a reputation on uncompromising reliability, passenger safety, and transparent hospitality.
          </p>
        </div>

        {/* 6 Guarantee Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {GUARANTEES.map((item, idx) => (
            <div
              key={idx}
              className="bg-[#FAF8F5] rounded-3xl p-6 sm:p-7 border border-slate-200/80 hover:border-[#006837] transition-all duration-300 hover:shadow-xl hover:-translate-y-1 relative group"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-2xl bg-white border border-slate-200/80 shadow-xs flex items-center justify-center group-hover:scale-110 transition-transform">
                  {item.icon}
                </div>
                <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full bg-white border border-slate-200 text-slate-700 shadow-xs">
                  {item.badge}
                </span>
              </div>

              <h3 className="text-lg font-black text-slate-900 mb-2 leading-snug">
                {item.title}
              </h3>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Action Callout */}
        <div className="mt-12 bg-gradient-to-r from-[#004D26] via-[#006837] to-[#1B4332] rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4 text-center sm:text-left">
            <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center shrink-0">
              <HeartHandshake className="w-7 h-7 text-amber-300" />
            </div>
            <div>
              <h4 className="text-lg sm:text-xl font-black">
                Have a customized route or corporate requirement?
              </h4>
              <p className="text-xs sm:text-sm text-emerald-100 font-medium">
                Call our 24/7 Odisha helpline directly at <strong className="text-amber-300 font-mono">+91 9861117168</strong>
              </p>
            </div>
          </div>

          <button
            onClick={onPlanTrip}
            className="shrink-0 px-6 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs sm:text-sm uppercase tracking-wider shadow-lg hover:shadow-xl transition-all cursor-pointer"
          >
            Plan Your Journey
          </button>
        </div>

      </div>
    </section>
  );
}

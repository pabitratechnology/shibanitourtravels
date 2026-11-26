import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Car, Compass, FileCheck, MapPin, Sparkles, ChevronRight, Check } from 'lucide-react';

export default function BookingProcess() {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      icon: <Car className="w-6 h-6" />,
      title: 'Select Perfect Ride',
      subtitle: 'From 80+ pristine cars & coaches',
      desc: 'Browse our highly maintained fleet from budget hatchbacks to premium sedans, high-performance SUVs, and 26-seater executive luxury coaches.',
      details: ['Detailed specifications & transparent pricing', 'Real photographs of actual travel fleet', 'Filter by seat capacity or class']
    },
    {
      icon: <Compass className="w-6 h-6" />,
      title: 'Plan Custom Route',
      subtitle: 'Organized tourist itineraries',
      desc: 'Use our regional expertise to organize complex multi-day tours, temple visits, and get instant pricing estimations.',
      details: ['Optimal pathfinding and road mapping', 'Fair-Fare local pricing transparency', 'Avoid tourist congestion zones']
    },
    {
      icon: <FileCheck className="w-6 h-6" />,
      title: 'Instant Secure Booking',
      subtitle: 'Secure digital confirmation',
      desc: 'Confirm details via simple digital booking form or instant WhatsApp concierge desk. Pay secure token deposits with zero hidden costs.',
      details: ['GST-compliant transparent invoices', 'Instant SMS & WhatsApp confirmation', 'Flexible and client-friendly cancellation']
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: 'Enjoy Premium Journey',
      subtitle: 'Trained professional chauffeurs',
      desc: 'Our uniformed chauffeur arrives 15 minutes early in a freshly sanitized, GPS-enabled vehicle with full climate control active.',
      details: ['On-time pickup guarantee', 'Real-time safety tracking support', 'Pristine, fresh air cabin atmosphere']
    }
  ];

  return (
    <section className="py-24 bg-[#F5F7FA] border-t border-slate-200/60 relative overflow-hidden">
      
      {/* Decorative background glows */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -bottom-20 left-1/3 w-[500px] h-[500px] rounded-full opacity-[0.03] mix-blend-multiply" 
          style={{ background: 'radial-gradient(circle, #E25822 0%, transparent 70%)', filter: 'blur(80px)' }} />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10 text-left">
        
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 gap-6">
          <div>
            <div className="section-tag mb-4">
              <Sparkles className="w-3.5 h-3.5 mr-1 inline" /> Booking Journey
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-none">
              How It <span className="font-serif-luxury italic font-light text-[#052B54] lowercase">seamlessly</span> <span className="text-grad-brand">Works</span>
            </h2>
            <p className="text-slate-500 mt-3 text-sm max-w-lg leading-relaxed font-medium">
              We have refined the car rental experience down to a pristine four-step professional workflow.
            </p>
          </div>

          {/* Quick Step Indicators */}
          <div className="flex gap-1.5 bg-slate-200/60 p-1.5 rounded-2xl border border-slate-300/40 backdrop-blur-md self-start lg:self-auto">
            {steps.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveStep(idx)}
                className={`px-4 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                  idx === activeStep
                    ? 'bg-[#052B54] text-white shadow-md scale-102'
                    : 'text-slate-500 hover:text-slate-900 hover:bg-white/50'
                }`}
              >
                Step {idx + 1}
              </button>
            ))}
          </div>
        </div>

        {/* Display Grid */}
        <div className="grid lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column: Interactive Cards list */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-4">
            {steps.map((st, idx) => (
              <div
                key={idx}
                onClick={() => setActiveStep(idx)}
                className={`p-5 rounded-2xl border transition-all duration-300 cursor-pointer flex gap-4 items-center ${
                  idx === activeStep
                    ? 'bg-white border-[#E25822] shadow-md scale-[1.01]'
                    : 'bg-white/60 border-slate-200/60 hover:border-slate-300 hover:bg-white'
                }`}
                style={{
                  boxShadow: idx === activeStep ? '0 12px 24px -10px rgba(226, 88, 34, 0.12)' : 'none'
                }}
              >
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 border transition-transform duration-300"
                  style={{
                    background: idx === activeStep ? 'rgba(226, 88, 34, 0.06)' : 'rgba(5, 43, 84, 0.04)',
                    borderColor: idx === activeStep ? 'rgba(226, 88, 34, 0.15)' : 'rgba(5, 43, 84, 0.08)',
                    color: idx === activeStep ? '#E25822' : '#052B54',
                    transform: idx === activeStep ? 'scale(1.05)' : 'none'
                  }}
                >
                  {st.icon}
                </div>
                <div>
                  <h4 className={`text-[13px] font-extrabold tracking-wide uppercase ${
                    idx === activeStep ? 'text-[#052B54]' : 'text-slate-800'
                  }`}>
                    {idx + 1}. {st.title.replace(/^\d\.\s/, '')}
                  </h4>
                  <p className="text-[11px] text-slate-400 mt-0.5 font-medium">{st.subtitle}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Right Column: High detail content showcase */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStep}
                initial={{ opacity: 0, x: 15 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -15 }}
                transition={{ duration: 0.3 }}
                className="bg-white border border-slate-200/80 rounded-3xl p-8 shadow-sm relative overflow-hidden h-full flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-1.5 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] mb-5">
                    <span>SHIBANI PROTOCOL</span>
                    <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
                    <span className="text-[#E25822]">STEP {activeStep + 1} OF 4</span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-black text-slate-900 uppercase tracking-tight mb-4">
                    {steps[activeStep].title.replace(/^\d\.\s/, '')}
                  </h3>

                  <p className="text-slate-500 text-xs sm:text-[13.5px] leading-relaxed mb-6 font-medium">
                    {steps[activeStep].desc}
                  </p>

                  <div className="space-y-3.5 pt-6 border-t border-slate-100">
                    <h5 className="text-[10px] font-black text-[#052B54] uppercase tracking-wider mb-2">Key Service Standards:</h5>
                    {steps[activeStep].details.map((detail, idx) => (
                      <div key={idx} className="flex items-center gap-3.5 text-slate-600 text-xs font-medium">
                        <div className="w-5 h-5 rounded-full bg-orange-50 border border-orange-100 flex items-center justify-center text-[#E25822] shrink-0">
                          <Check className="w-3 h-3" />
                        </div>
                        <span>{detail}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Step progress bar indicator */}
                <div className="mt-8 pt-5 border-t border-slate-100 flex gap-2">
                  {steps.map((_, idx) => (
                    <div
                      key={idx}
                      className={`h-1 rounded-full flex-1 transition-all duration-300 ${
                        idx <= activeStep ? 'bg-[#E25822]' : 'bg-slate-200'
                      }`}
                    />
                  ))}
                </div>

              </motion.div>
            </AnimatePresence>
          </div>

        </div>

      </div>
    </section>
  );
}

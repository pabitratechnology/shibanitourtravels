import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, HelpCircle, PhoneCall, MessageSquare } from 'lucide-react';

const FAQS = [
  {
    q: 'How do I book a cab or tour package with Shibani Travels?',
    a: 'You can book instantly online through our search bar, call our 24/7 reservation desk at +91 91234 56789, or message us on WhatsApp. Once you share your travel date, route, and vehicle choice, we confirm your booking with an instant SMS/WhatsApp invoice within 5 minutes.',
  },
  {
    q: 'Are toll taxes, parking fees, and driver allowances included in the fare?',
    a: 'Yes! All our tour packages and flat outstation rates are 100% transparent and inclusive of fuel, highway toll taxes, state road permits, parking fees, and driver daily allowances. There are zero surprise surcharges at the end of your trip.',
  },
  {
    q: 'Can we customize our Odisha tour itinerary according to our flight or train timings?',
    a: 'Absolutely! As a dedicated Odisha Destination Management Company (DMC), we specialize in 100% tailored itineraries. Whether you need an early morning pickup from Bhubaneswar Airport (BBI) or an evening departure after Puri Jagannath Darshan, we arrange the schedule around you.',
  },
  {
    q: 'Do you provide airport pickup with name placards at Bhubaneswar Airport?',
    a: 'Yes, our chauffeur will be waiting at the arrival terminal gate with a personalized name placard to receive you, assist with your luggage, and escort you to your air-conditioned vehicle.',
  },
  {
    q: 'What is the cancellation and refund policy?',
    a: 'We offer free cancellation up to 24 hours prior to scheduled departure. Any advance deposit paid will be refunded directly to your original payment method with zero cancellation fees.',
  },
  {
    q: 'What types of vehicles are available for large families and corporate groups?',
    a: 'We operate Odisha’s largest luxury fleet of 80+ vehicles, including 7-seater Toyota Innova Crysta & Hycross, 13/17/26-seater Force Urbanias, 12 to 26-seater Tempo Travellers, and 31 to 53-seater AC Volvo & BharatBenz luxury buses.',
  },
];

export default function HomeFaqSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const toggle = (i: number) => {
    setOpenIdx(openIdx === i ? null : i);
  };

  return (
    <section className="py-20 sm:py-24 bg-white relative overflow-hidden" id="faq">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-50 text-[#006837] text-xs font-bold uppercase tracking-wider mb-2">
            <HelpCircle className="w-3.5 h-3.5" /> Got Questions?
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Frequently Asked <span className="text-[#006837]">Questions</span>
          </h2>
          <p className="text-sm font-semibold text-slate-500 mt-1">
            Everything you need to know about booking, vehicles, and traveling across Odisha with Shibani Travels
          </p>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-3">
          {FAQS.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className="bg-[#FAFCFA] rounded-2xl border border-slate-200/80 overflow-hidden shadow-xs transition-colors"
              >
                <button
                  onClick={() => toggle(idx)}
                  className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 cursor-pointer"
                >
                  <span className="text-sm sm:text-base font-bold text-slate-800 leading-snug">
                    {faq.q}
                  </span>
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-transform duration-300 ${
                      isOpen ? 'bg-[#006837] text-white rotate-180' : 'bg-slate-200 text-slate-600'
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="px-5 sm:px-6 pb-5 pt-0 text-xs sm:text-sm text-slate-600 leading-relaxed font-medium border-t border-slate-100"
                    >
                      <p className="pt-3">{faq.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Need More Assistance Box */}
        <div className="mt-10 p-6 rounded-2xl bg-slate-50 border border-slate-200 text-center flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-left">
            <h4 className="text-sm font-black text-slate-800">Have a custom question or special VIP requirement?</h4>
            <p className="text-xs text-slate-500 font-medium mt-0.5">Our Bhubaneswar travel specialists are online 24/7 to help you.</p>
          </div>
          <div className="flex items-center gap-3">
            <a
              href="https://wa.me/919123456789"
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2.5 rounded-xl bg-[#25D366] text-white text-xs font-bold shadow-md hover:bg-[#20ba59] transition-all flex items-center gap-1.5"
            >
              <MessageSquare className="w-3.5 h-3.5" /> WhatsApp Us
            </a>
            <a
              href="tel:+919123456789"
              className="px-4 py-2.5 rounded-xl bg-[#006837] text-white text-xs font-bold shadow-md hover:bg-[#008746] transition-all flex items-center gap-1.5"
            >
              <PhoneCall className="w-3.5 h-3.5" /> Call Now
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}


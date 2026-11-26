import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, MessageSquare, Phone, Sparkles, MapPin, Calendar, Users, CheckCircle2 } from 'lucide-react';

interface CtaBannerProps {
  onBook: () => void;
}

const STAT_CARDS = [
  { val: '5 Min', label: 'Avg Booking Time', desc: 'Ride confirmed in minutes', icon: '⚡', color: '#C4956A' },
  { val: '₹0',   label: 'Cancellation Fee', desc: 'Free up to 24 hrs before', icon: '✅', color: '#52B788' },
  { val: '100%', label: 'Price Transparent', desc: 'Zero hidden charges ever',  icon: '💎', color: '#C4956A' },
  { val: '24/7', label: 'Support Available', desc: 'WhatsApp or call anytime',  icon: '🛡️', color: '#52B788' },
];

const FEATURES = [
  { icon: <MapPin className="w-3.5 h-3.5" />,    text: 'Any Odisha Destination' },
  { icon: <Calendar className="w-3.5 h-3.5" />,  text: 'Advance & Last-Minute' },
  { icon: <Users className="w-3.5 h-3.5" />,     text: 'Groups Up to 45 Pax' },
  { icon: <Sparkles className="w-3.5 h-3.5" />,  text: 'VVIP Wedding Fleet' },
];

export default function CtaBanner({ onBook }: CtaBannerProps) {
  return (
    <section className="py-24 relative overflow-hidden">

      {/* ── Sophisticated dark background — NOT green ── */}
      <div className="absolute inset-0" style={{
        background: 'linear-gradient(135deg, #0D0D0D 0%, #141414 50%, #1A1A1A 100%)'
      }} />

      {/* Subtle warm glow top-right */}
      <div className="absolute top-0 right-0 w-[700px] h-[500px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 85% 10%, rgba(196,149,106,0.12) 0%, transparent 60%)', filter: 'blur(60px)' }} />
      {/* Subtle forest glow bottom-left */}
      <div className="absolute bottom-0 left-0 w-[600px] h-[400px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 15% 90%, rgba(45,106,79,0.10) 0%, transparent 60%)', filter: 'blur(60px)' }} />

      {/* Fine grain texture */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{ backgroundImage: 'radial-gradient(rgba(255,255,255,0.7) 1px, transparent 1px)', backgroundSize: '24px 24px' }} />

      {/* Top decorative border line */}
      <div className="absolute top-0 left-0 right-0 h-[1px]"
        style={{ background: 'linear-gradient(to right, transparent, rgba(196,149,106,0.5) 40%, rgba(45,106,79,0.5) 60%, transparent)' }} />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* ── LEFT: Heading + Features + CTA ── */}
          <motion.div
            initial={{ opacity: 0, x: -28 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Tag badge — caramel on dark: perfectly visible */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest mb-6"
              style={{
                background: 'rgba(196,149,106,0.12)',
                border: '1px solid rgba(196,149,106,0.35)',
                color: '#C4956A',
              }}>
              <Sparkles className="w-3.5 h-3.5" />
              Book In Under 5 Minutes
            </div>

            {/* Headline */}
            <h2 className="text-white mb-5"
              style={{ fontSize: 'clamp(30px, 4.5vw, 52px)', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.1 }}>
              Your Next Journey
              <br />
              <span className="font-display-italic font-light"
                style={{ color: 'rgba(255,255,255,0.38)', fontSize: '0.88em' }}>
                begins with
              </span>{' '}
              <span style={{
                background: 'linear-gradient(135deg, #C4956A 0%, #E8C97A 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>
                One Call
              </span>
            </h2>

            <p className="text-white/50 text-[14px] leading-relaxed mb-8 max-w-md" style={{ fontFamily: 'DM Sans' }}>
              Instant quotes for any trip — outstation, airport transfer, wedding, or full Odisha tour.
              Transparent pricing, zero hidden charges.
            </p>

            {/* Feature checklist */}
            <div className="grid grid-cols-2 gap-3 mb-10">
              {FEATURES.map(item => (
                <div key={item.text} className="flex items-center gap-2.5 text-[12.5px] text-white/65 font-medium">
                  <div className="w-7 h-7 rounded-xl flex items-center justify-center shrink-0 text-[#C4956A]"
                    style={{ background: 'rgba(196,149,106,0.1)', border: '1px solid rgba(196,149,106,0.2)' }}>
                    {item.icon}
                  </div>
                  {item.text}
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-3">
              <button onClick={onBook}
                className="flex items-center gap-2.5 px-6 py-3.5 rounded-2xl text-[12px] font-black uppercase tracking-wide text-white cursor-pointer transition-all hover:scale-[1.03] hover:shadow-xl"
                style={{
                  background: 'linear-gradient(135deg, #2D6A4F 0%, #1A3C28 100%)',
                  boxShadow: '0 8px 24px rgba(45,106,79,0.35)',
                }}>
                <Sparkles className="w-4 h-4" /> Get Free Quote <ArrowRight className="w-4 h-4" />
              </button>

              <a href="tel:+919437100001"
                className="flex items-center gap-2.5 px-5 py-3.5 rounded-2xl text-[12px] font-bold uppercase tracking-wide text-white/85 transition-all hover:text-white cursor-pointer"
                style={{
                  background: 'rgba(255,255,255,0.06)',
                  border: '1px solid rgba(255,255,255,0.14)',
                  backdropFilter: 'blur(12px)',
                }}>
                <Phone className="w-4 h-4 text-[#C4956A]" /> Call Now
              </a>

              <a href="https://wa.me/919437100001" target="_blank" rel="noreferrer"
                className="flex items-center gap-2.5 px-5 py-3.5 rounded-2xl text-[12px] font-bold uppercase tracking-wide text-white/85 transition-all hover:text-white cursor-pointer"
                style={{
                  background: 'rgba(255,255,255,0.06)',
                  border: '1px solid rgba(255,255,255,0.14)',
                  backdropFilter: 'blur(12px)',
                }}>
                <MessageSquare className="w-4 h-4 text-emerald-400" /> WhatsApp
              </a>
            </div>

            {/* Social proof micro-line */}
            <div className="flex items-center gap-2 mt-6 text-white/30 text-[11px]">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500/70" />
              5,000+ happy clients · 4.9★ rated · GST invoice on every booking
            </div>
          </motion.div>

          {/* ── RIGHT: 2×2 Stat Cards ── */}
          <motion.div
            initial={{ opacity: 0, x: 28 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
            className="grid grid-cols-2 gap-4"
          >
            {STAT_CARDS.map((card, i) => (
              <motion.div
                key={card.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 + i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                className="rounded-2xl p-6 text-left group cursor-default relative overflow-hidden"
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  backdropFilter: 'blur(16px)',
                  transition: 'all 0.3s ease',
                }}
                whileHover={{
                  background: 'rgba(255,255,255,0.07)',
                  borderColor: `${card.color}40`,
                  y: -4,
                  boxShadow: `0 16px 40px -8px ${card.color}25`,
                }}
              >
                {/* Subtle corner glow */}
                <div className="absolute top-0 right-0 w-20 h-20 rounded-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: `radial-gradient(circle, ${card.color}18 0%, transparent 70%)`, filter: 'blur(20px)' }} />

                <div className="text-2xl mb-4">{card.icon}</div>
                <div className="font-black text-white mb-0.5"
                  style={{ fontSize: 'clamp(22px,3vw,30px)', letterSpacing: '-0.04em' }}>
                  {card.val}
                </div>
                <div className="text-[10px] font-black uppercase tracking-widest mb-1.5"
                  style={{ color: card.color }}>
                  {card.label}
                </div>
                <div className="text-[11px] text-white/40 leading-relaxed">{card.desc}</div>
              </motion.div>
            ))}

            {/* Bottom spanning trust bar */}
            <div className="col-span-2 rounded-2xl p-4 flex items-center justify-between gap-4"
              style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.07)',
              }}>
              {[
                { icon: '🔒', label: 'Police Verified Drivers' },
                { icon: '📍', label: 'GPS All Vehicles' },
                { icon: '🧾', label: 'GST Compliant' },
              ].map(b => (
                <div key={b.label} className="flex items-center gap-2 text-white/40 text-[11px] font-medium">
                  <span>{b.icon}</span> {b.label}
                </div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>

      {/* Bottom decorative line */}
      <div className="absolute bottom-0 left-0 right-0 h-[1px]"
        style={{ background: 'linear-gradient(to right, transparent, rgba(45,106,79,0.4) 40%, rgba(196,149,106,0.4) 60%, transparent)' }} />
    </section>
  );
}

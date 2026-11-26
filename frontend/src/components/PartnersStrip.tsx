import React from 'react';
import { motion } from 'motion/react';

// Partner/award logos represented as styled text blocks (since no external logo assets)
const PARTNERS = [
  { name: 'Odisha Tourism', sub: 'Official Partner', color: '#052B54' },
  { name: 'IRCTC Travel', sub: 'Affiliated Operator', color: '#E25822' },
  { name: 'MakeMyTrip', sub: 'Listed Partner', color: '#052B54' },
  { name: 'Thomas Cook', sub: 'Travel Network', color: '#E25822' },
  { name: 'Ease My Trip', sub: 'Vehicle Operator', color: '#052B54' },
  { name: 'ISO 9001', sub: 'Quality Certified', color: '#E25822' },
  { name: 'IATA Member', sub: 'Global Standard', color: '#052B54' },
  { name: 'TripAdvisor', sub: 'Certificate of Excellence', color: '#E25822' },
];

const AWARDS = [
  { emoji: '🏆', title: 'Best Fleet Operator', year: '2024', org: 'Odisha Travel Awards' },
  { emoji: '⭐', title: '4.9★ Google Rating', year: '2023–24', org: '1,800+ Verified Reviews' },
  { emoji: '🛡️', title: 'ISO 9001 Certified', year: 'Since 2018', org: 'Quality Management' },
  { emoji: '🌟', title: 'Excellence in Service', year: '2023', org: 'Eastern India Transport' },
];

export default function PartnersStrip() {
  return (
    <section className="py-16 bg-white border-t border-b" style={{ borderColor: '#E5E7EB' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">

        {/* Awards row */}
        <div className="text-center mb-10">
          <div className="section-tag mx-auto mb-4">Recognition & Trust</div>
          <h3 className="text-2xl font-black text-slate-900">
            Awards & <span className="text-grad-brand">Certifications</span>
          </h3>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-14">
          {AWARDS.map((a, i) => (
            <motion.div key={a.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="flex flex-col items-center text-center p-5 rounded-2xl border hover:shadow-md transition-all"
              style={{ borderColor: '#E5E7EB', background: '#FAFAF7' }}>
              <div className="text-3xl mb-2">{a.emoji}</div>
              <div className="text-[13px] font-black text-slate-900 mb-0.5">{a.title}</div>
              <div className="text-[10px] font-bold text-[#E25822]">{a.year}</div>
              <div className="text-[9px] text-slate-400 mt-0.5">{a.org}</div>
            </motion.div>
          ))}
        </div>

        {/* Partners scrolling strip */}
        <div className="border-t pt-10" style={{ borderColor: '#E5E7EB' }}>
          <p className="text-center text-[9px] font-black text-slate-400 uppercase tracking-[0.25em] mb-6">
            Trusted By & Associated With
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {PARTNERS.map((p, i) => (
              <motion.div key={p.name}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="flex flex-col items-center px-5 py-3 rounded-xl border bg-white hover:shadow-sm transition-all"
                style={{ borderColor: '#E5E7EB' }}>
                <div className="text-[12px] font-black" style={{ color: p.color }}>{p.name}</div>
                <div className="text-[9px] text-slate-400 mt-0.5">{p.sub}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

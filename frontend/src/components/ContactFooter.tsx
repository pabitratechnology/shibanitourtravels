import React, { useState } from 'react';
import { Compass, Phone, MessageSquare, Mail, MapPin, Clock, Send, ShieldCheck, Heart, ArrowUp } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function ContactFooter() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('General Enquiry');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) {
      alert('Please fill in your name, email, and message.');
      return;
    }
    setSubmitting(true);
    fetch('/api/enquiries', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, phone, subject, message })
    })
      .then(res => res.json())
      .then(() => {
        setSubmitting(false);
        setSubmitted(true);
        setName(''); setEmail(''); setPhone(''); setMessage('');
        setTimeout(() => setSubmitted(false), 6000);
      })
      .catch(() => { setSubmitting(false); alert('Failed. Please call us directly.'); });
  };

  return (
    <div className="bg-[#f8fafc] text-slate-700">

      {/* ─── Contact Section ─── */}
      <div className="py-20 border-t relative overflow-hidden" style={{ borderColor: '#e2e8f0' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
          <div className="grid lg:grid-cols-12 gap-12 items-stretch">

            {/* ─── Left Info Column ─── */}
            <div className="lg:col-span-5 flex flex-col justify-between text-left space-y-8">
              <div>
                <div className="section-tag mb-4">Direct Helpline</div>
                <h3 className="text-3xl font-black text-slate-900 mt-4 leading-tight">
                  Connect With <br />
                  <span className="text-grad-brand">Shibani Travel Desk</span>
                </h3>
                <p className="text-sm mt-3 leading-relaxed text-slate-500">
                  Have questions about customized multi-day itineraries, outstation bookings, or corporate contracts? Get in touch immediately.
                </p>
              </div>

              <div className="space-y-5">
                {[
                  {
                    icon: <MapPin className="w-5 h-5" />,
                    title: 'Office Headquarters',
                    content: 'Plot No: 125, Near Lingaraj Temple Road,\nGautam Nagar, Bhubaneswar, Odisha 751014'
                  },
                  {
                    icon: <Phone className="w-5 h-5" />,
                    title: 'Helpline & Booking',
                    content: '+91 94371 00001 / +91 94371 00002'
                  },
                  {
                    icon: <Mail className="w-5 h-5" />,
                    title: 'E-Mail Assistance',
                    content: 'support@shibanitravels.com'
                  },
                  {
                    icon: <Clock className="w-5 h-5" />,
                    title: 'Operational Hours',
                    content: '24 hours a day, 7 days a week'
                  }
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                      style={{ background: 'rgba(26,86,219,0.08)', border: '1px solid rgba(26,86,219,0.15)', color: '#1a56db' }}
                    >
                      {item.icon}
                    </div>
                    <div>
                      <h5 className="text-xs font-bold text-slate-900 uppercase tracking-wider">{item.title}</h5>
                      <p className="text-xs leading-relaxed mt-0.5 whitespace-pre-line text-slate-500">{item.content}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* HQ Live Indicator */}
              <div
                className="h-32 rounded-2xl overflow-hidden relative p-5 flex flex-col justify-end"
                style={{ background: '#ffffff', border: '1px solid #e2e8f0', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}
              >
                <div
                  className="absolute inset-0 opacity-[0.03]"
                  style={{
                    backgroundImage: 'radial-gradient(circle, #0f172a 1px, transparent 1px)',
                    backgroundSize: '20px 20px'
                  }}
                />
                <div className="relative z-20 flex items-center gap-2">
                  <span className="ping-dot" />
                  <span className="text-[10px] font-bold tracking-widest text-slate-800 uppercase">Bhubaneswar HQ — Live Status</span>
                </div>
                <p className="text-[11px] text-slate-500 mt-1 relative z-20">Operators are online right now to confirm booking requests instantly.</p>
              </div>
            </div>

            {/* ─── Form Column ─── */}
            <div
              className="lg:col-span-7 rounded-3xl p-6 sm:p-10 shadow-lg relative text-left"
              style={{ background: '#ffffff', border: '1px solid #e2e8f0' }}
            >
              <div className="absolute top-0 inset-x-0 h-[3px] rounded-t-3xl" style={{ background: 'linear-gradient(90deg, #1a56db, #3b82f6, #f97316)' }} />

              <div className="mb-6">
                <span className="text-[10px] font-bold uppercase tracking-widest text-blue-600">Send a Message</span>
                <h4 className="text-xl font-black text-slate-950 mt-1">Leave Us an Enquiry</h4>
              </div>

              <AnimatePresence>
                {submitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="p-8 rounded-2xl text-center space-y-3"
                    style={{ background: 'rgba(16,185,129,0.05)', border: '1px solid rgba(16,185,129,0.2)' }}
                  >
                    <ShieldCheck className="w-12 h-12 mx-auto text-emerald-500" />
                    <h5 className="text-sm font-bold text-slate-900">Enquiry Logged Successfully</h5>
                    <p className="text-xs leading-relaxed text-slate-600">
                      Thank you for contacting Shibani Tour & Travels. A travel coordinator will call you within 30 minutes.
                    </p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] font-bold uppercase tracking-widest mb-1.5 text-slate-500">Full Name *</label>
                        <input type="text" required value={name} onChange={e => setName(e.target.value)} className="input-field" placeholder="Your full name" />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold uppercase tracking-widest mb-1.5 text-slate-500">E-Mail *</label>
                        <input type="email" required value={email} onChange={e => setEmail(e.target.value)} className="input-field" placeholder="your@email.com" />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] font-bold uppercase tracking-widest mb-1.5 text-slate-500">Mobile (Optional)</label>
                        <input type="tel" value={phone} onChange={e => setPhone(e.target.value)} className="input-field" placeholder="+91 XXXXX XXXXX" />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold uppercase tracking-widest mb-1.5 text-slate-500">Subject *</label>
                        <select value={subject} onChange={e => setSubject(e.target.value)} className="input-field">
                          <option value="General Enquiry">General Inquiry</option>
                          <option value="Corporate Transportation">Corporate Transportation</option>
                          <option value="Wedding Special Vehicles">Wedding Car Booking</option>
                          <option value="Custom Odyssey Tour">Custom Odisha Package</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-widest mb-1.5 text-slate-500">Your Message *</label>
                      <textarea
                        required
                        value={message}
                        onChange={e => setMessage(e.target.value)}
                        className="input-field resize-none h-32"
                        placeholder="Tell us your travel requirements, dates, passenger count..."
                      />
                    </div>

                    <button type="submit" disabled={submitting} className="btn-primary w-full py-4 text-xs tracking-widest flex items-center justify-center gap-2">
                      {submitting ? 'Transmitting...' : 'Send Enquiry'}
                      <Send className="w-3.5 h-3.5" />
                    </button>
                  </form>
                )}
              </AnimatePresence>
            </div>

          </div>
        </div>
      </div>

      {/* ─── Main Footer ─── */}
      <footer className="py-16 bg-slate-900 text-slate-400 border-t" style={{ borderColor: '#1e293b' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 text-left">

            {/* Brand */}
            <div className="space-y-4">
              <div className="flex items-center gap-2.5">
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center"
                  style={{ background: 'linear-gradient(135deg,#1a56db,#3b82f6)', boxShadow: '0 0 14px rgba(26,86,219,0.3)' }}
                >
                  <Compass className="w-5 h-5 text-white animate-spin-slow" />
                </div>
                <span className="text-lg font-black text-white tracking-wider uppercase">SHIBANI</span>
              </div>
              <p className="text-xs leading-relaxed text-slate-400">
                Bhubaneswar's largest luxury transport provider. Serving government delegates, corporate houses, families, and global tourists for more than 28 years (since 1998).
              </p>
              <div className="flex gap-2 flex-wrap">
                <span className="chip chip-blue">GST Registered</span>
                <span className="chip chip-green">ISO 9001:2015</span>
              </div>
            </div>

            {/* Services */}
            <div>
              <h5 className="text-xs font-black text-white uppercase tracking-wider mb-4 flex items-center gap-2">
                <span className="w-0.5 h-4 rounded bg-blue-500" />
                Services Catalog
              </h5>
              <ul className="space-y-2.5 text-xs text-slate-400">
                {['Premium Car Rental', 'Force Urbania Booking', 'Wedding Luxury Chauffeur', 'Corporate Bus Contracts', 'Odisha Golden Triangle Tours'].map((s, i) => (
                  <li key={i} className="hover:text-blue-400 transition-colors cursor-pointer flex items-center gap-2">
                    <span className="text-blue-500">›</span> {s}
                  </li>
                ))}
              </ul>
            </div>

            {/* Destinations */}
            <div>
              <h5 className="text-xs font-black text-white uppercase tracking-wider mb-4 flex items-center gap-2">
                <span className="w-0.5 h-4 rounded bg-orange-500" />
                Odisha Highlights
              </h5>
              <ul className="space-y-2.5 text-xs text-slate-400">
                {['Jagannath Temple, Puri', 'Konark Sun Temple (UNESCO)', 'Lingaraj Temple, Bhubaneswar', 'Satapada Lagoon, Chilika', 'Bhitarkanika Mangrove'].map((s, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <span className="text-orange-500">›</span> {s}
                  </li>
                ))}
              </ul>
            </div>

            {/* Trust + Back to top */}
            <div className="space-y-4">
              <h5 className="text-xs font-black text-white uppercase tracking-wider flex items-center gap-2">
                <span className="w-0.5 h-4 rounded bg-emerald-500" />
                Client Safety
              </h5>
              <p className="text-xs leading-relaxed text-slate-400">
                All vehicles feature active GPS tracking. Multi-lingual professional drivers with defensive training certificates and police verification.
              </p>
              <div
                className="p-4 rounded-xl flex justify-between items-center bg-slate-800 border"
                style={{ borderColor: '#334155' }}
              >
                <div>
                  <p className="text-xl font-black text-white">4.9 ★</p>
                  <p className="text-[9px] mt-0.5 text-slate-400">Google Rating · 3k+ reviews</p>
                </div>
                <button
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  className="p-2.5 rounded-xl transition-all bg-slate-700 hover:bg-slate-650 text-white"
                  title="Back to top"
                >
                  <ArrowUp className="w-4 h-4" />
                </button>
              </div>
            </div>

          </div>

          {/* Bottom bar */}
          <div className="mt-12 pt-8 border-t text-center flex flex-col sm:flex-row justify-between items-center text-xs gap-3" style={{ borderColor: '#1e293b', color: '#64748b' }}>
            <p>© 2026 Shibani Tour & Travels. All rights reserved. Headquarters: Bhubaneswar, Odisha, India.</p>
            <p className="flex items-center gap-1.5">
              <span>Developed and Maintained by</span>
              <a
                href="https://pabitratechnology.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-amber-400 hover:text-amber-300 font-bold underline transition-colors"
              >
                Pabitra Technology
              </a>
            </p>
          </div>
        </div>
      </footer>

    </div>
  );
}

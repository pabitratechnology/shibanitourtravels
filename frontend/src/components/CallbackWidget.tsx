import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Phone, X, User, Clock, MessageSquare, CheckCircle2, ChevronRight,
  Star, Sparkles, Copy, Check
} from 'lucide-react';

const TIME_SLOTS = [
  'As Soon As Possible',
  'Within 30 Minutes',
  '10:00 AM – 12:00 PM',
  '12:00 PM – 2:00 PM',
  '2:00 PM – 4:00 PM',
  '4:00 PM – 6:00 PM',
  'Evening (6 PM+)',
];

export default function CallbackWidget() {
  const [open, setOpen] = useState(false);
  const [offerOpen, setOfferOpen] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [timeSlot, setTimeSlot] = useState('As Soon As Possible');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleCopyCode = () => {
    navigator.clipboard.writeText('SHIBANI500');
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2500);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) return;
    setLoading(true);
    setErrorMsg('');
    try {
      const res = await fetch('/api/callback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, phone, timeSlot }),
      });
      if (res.ok) {
        setSubmitted(true);
        setName('');
        setPhone('');
        setTimeSlot('As Soon As Possible');
        setTimeout(() => {
          setSubmitted(false);
          setOpen(false);
        }, 4000);
      } else {
        const errData = await res.json().catch(() => ({}));
        setErrorMsg(errData.error || 'Failed to submit callback request. Please try again.');
      }
    } catch (_) {
      setErrorMsg('Network error. Please check your internet connection.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* ═════════════════════════════════════════════════════════════════
          FIXED RIGHT EDGE FLOATING ACTION TABS (IMPOSSIBLE TO OVERLAP)
          Stacked inside a single flex-col container with explicit gap
          ═════════════════════════════════════════════════════════════════ */}
      <div className="fixed right-0 top-1/2 -translate-y-1/2 z-40 flex flex-col items-end gap-3 select-none pointer-events-auto">
        
        {/* Tab 1: GET ₹500 OFF (Brand Gold / Amber Gradient) */}
        <button
          onClick={() => {
            setOfferOpen(true);
            setOpen(false);
          }}
          className="group relative flex items-center gap-2 py-3 sm:py-3.5 px-2 sm:px-2.5 rounded-l-2xl bg-gradient-to-b from-[#E25822] via-[#D97706] to-[#B45309] text-white shadow-2xl hover:pr-3.5 sm:hover:pr-4 hover:-translate-x-1 active:scale-95 transition-all duration-200 cursor-pointer border-t border-b border-l border-amber-300/50"
          style={{
            writingMode: 'vertical-rl',
            textOrientation: 'mixed',
            boxShadow: '-4px 6px 22px rgba(226, 88, 34, 0.45)',
          }}
          aria-label="Claim ₹500 Off Voucher"
        >
          <div className="rotate-90 flex items-center justify-center mb-1">
            <Sparkles className="w-3.5 h-3.5 text-amber-200 animate-pulse" />
          </div>
          <span className="text-[10px] sm:text-[11.5px] font-black uppercase tracking-wider whitespace-nowrap">
            GET ₹500 OFF*
          </span>
        </button>

        {/* Tab 2: CALLBACK REQUEST (Brand Royal Forest Green) */}
        <button
          onClick={() => {
            setOpen(v => !v);
            setOfferOpen(false);
            setSubmitted(false);
            setErrorMsg('');
          }}
          className="group relative flex items-center gap-2 py-3.5 sm:py-4 px-2 sm:px-2.5 rounded-l-2xl bg-gradient-to-b from-[#006837] via-[#00552b] to-[#004D26] text-white shadow-2xl hover:pr-3.5 sm:hover:pr-4 hover:-translate-x-1 active:scale-95 transition-all duration-200 cursor-pointer border-t border-b border-l border-emerald-400/40"
          style={{
            writingMode: 'vertical-rl',
            textOrientation: 'mixed',
            boxShadow: '-4px 6px 22px rgba(0, 104, 55, 0.45)',
          }}
          aria-label="Request Instant Callback"
        >
          <div className="rotate-90 flex items-center justify-center mb-1">
            <Phone className="w-3.5 h-3.5 text-emerald-300" />
          </div>
          <span className="text-[10px] sm:text-[11.5px] font-black uppercase tracking-wider whitespace-nowrap">
            CALLBACK REQUEST
          </span>
        </button>
      </div>

      {/* ── Dark Blurred Backdrop Overlay ── */}
      <AnimatePresence>
        {(open || offerOpen) && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-xs z-[998]"
            onClick={() => {
              setOpen(false);
              setOfferOpen(false);
            }}
          />
        )}
      </AnimatePresence>

      {/* ── DISCOUNT OFFER MODAL (SHIBANI500) ── */}
      <AnimatePresence>
        {offerOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: '-45%' }}
            animate={{ opacity: 1, scale: 1, y: '-50%' }}
            exit={{ opacity: 0, scale: 0.95, y: '-45%' }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-x-4 top-1/2 w-[calc(100%-32px)] sm:w-[380px] max-w-[400px] mx-auto sm:left-auto sm:right-12 z-[999] text-left"
          >
            <div
              className="rounded-3xl overflow-hidden bg-white border border-amber-200/80 shadow-2xl"
              style={{ boxShadow: '0 25px 60px rgba(0, 0, 0, 0.35)' }}
            >
              {/* Header */}
              <div
                className="relative px-6 pt-7 pb-6 overflow-hidden text-white"
                style={{ background: 'linear-gradient(135deg, #E25822 0%, #D97706 60%, #006837 100%)' }}
              >
                <button
                  onClick={() => setOfferOpen(false)}
                  className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center cursor-pointer transition-colors hover:bg-white/20 text-white/80 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>

                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-white/20 text-amber-200 border border-white/30 backdrop-blur-md">
                    Exclusive Voucher
                  </span>
                </div>

                <h3 className="text-2xl font-black leading-tight">
                  Flat ₹500 OFF
                </h3>
                <p className="text-white/80 text-xs mt-1 font-medium">
                  On Outstation Taxi Rentals &amp; Odisha Tour Packages
                </p>
              </div>

              {/* Body */}
              <div className="p-6">
                <div className="bg-amber-50/70 border-2 border-dashed border-amber-300 rounded-2xl p-4 text-center mb-5">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500 block mb-1">
                    Use Coupon Code At Booking
                  </span>
                  <div className="text-2xl font-black font-mono tracking-widest text-[#006837] mb-2">
                    SHIBANI500
                  </div>
                  <button
                    onClick={handleCopyCode}
                    className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-white border border-amber-200 shadow-xs text-xs font-bold text-amber-800 hover:bg-amber-100 transition-colors cursor-pointer"
                  >
                    {copiedCode ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-emerald-700">Code Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Promo Code</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="space-y-2 mb-6 text-xs text-slate-600 font-medium">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#006837] shrink-0" />
                    <span>Valid for Puri, Konark, Chilika &amp; all Odisha routes</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#006837] shrink-0" />
                    <span>Applicable on Sedan, Innova Crysta &amp; Urbania</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#006837] shrink-0" />
                    <span>Instant deduction on bookings over ₹2,000</span>
                  </div>
                </div>

                <a
                  href="tel:+919861117168"
                  className="w-full py-3 px-4 rounded-xl text-xs font-black uppercase tracking-wider text-white bg-[#006837] hover:bg-[#004D26] shadow-lg flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Call &amp; Claim: +91 9861117168</span>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── RESPONSIVE CALLBACK DIALOG PANEL ── */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: '-45%' }}
            animate={{ opacity: 1, scale: 1, y: '-50%' }}
            exit={{ opacity: 0, scale: 0.95, y: '-45%' }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-x-4 top-1/2 w-[calc(100%-32px)] sm:w-[340px] max-w-[360px] mx-auto sm:left-auto sm:right-12 z-[999] text-left"
          >
            <div
              className="rounded-3xl overflow-hidden bg-white border border-[#006837]/20 shadow-2xl"
              style={{ boxShadow: '0 25px 60px rgba(0, 0, 0, 0.35)' }}
            >
              {/* Header */}
              <div
                className="relative px-6 pt-6 pb-5 overflow-hidden text-white"
                style={{ background: 'linear-gradient(135deg, #004D26 0%, #006837 100%)' }}
              >
                <button
                  onClick={() => setOpen(false)}
                  className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center cursor-pointer transition-colors hover:bg-white/20 text-white/80 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>

                <div className="relative z-10 flex items-start gap-3">
                  <div
                    className="w-11 h-11 rounded-2xl flex items-center justify-center shrink-0"
                    style={{ background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.25)' }}
                  >
                    <Phone className="w-5 h-5 text-amber-300" />
                  </div>
                  <div>
                    <h3 className="text-white font-extrabold text-[16px] leading-tight">Request a Callback</h3>
                    <p className="text-white/80 text-[11px] mt-1 font-medium">
                      Our Odisha team will call you back shortly
                    </p>
                    <div className="flex items-center gap-1 mt-1.5">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star key={s} className="w-2.5 h-2.5 text-amber-300" fill="currentColor" />
                      ))}
                      <span className="text-white/70 text-[9px] font-bold ml-1">4.9★ Rated Service</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Form Content */}
              <div className="p-6">
                <AnimatePresence mode="wait">
                  {submitted ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-center py-6"
                    >
                      <div className="w-14 h-14 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center mx-auto mb-3 text-[#006837]">
                        <CheckCircle2 className="w-7 h-7" />
                      </div>
                      <h4 className="text-base font-black text-slate-900 mb-1">Request Received!</h4>
                      <p className="text-xs text-slate-500 font-medium">
                        Our travel coordinator is dialing your number shortly.
                      </p>
                    </motion.div>
                  ) : (
                    <motion.form onSubmit={handleSubmit} className="space-y-4">
                      {errorMsg && (
                        <div className="p-2.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-semibold">
                          {errorMsg}
                        </div>
                      )}

                      <div>
                        <label className="block text-[10.5px] font-bold text-slate-700 uppercase tracking-wide mb-1">
                          Your Full Name
                        </label>
                        <div className="relative">
                          <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                          <input
                            type="text"
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="e.g. Rajesh Mohapatra"
                            className="w-full pl-9 pr-3 py-2.5 rounded-xl text-xs font-bold text-slate-800 border border-slate-200 bg-slate-50 focus:bg-white focus:border-[#006837] focus:outline-none transition-all"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[10.5px] font-bold text-slate-700 uppercase tracking-wide mb-1">
                          Phone / WhatsApp Number
                        </label>
                        <div className="relative">
                          <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                          <input
                            type="tel"
                            required
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            placeholder="+91 98611 17168"
                            className="w-full pl-9 pr-3 py-2.5 rounded-xl text-xs font-bold text-slate-800 border border-slate-200 bg-slate-50 focus:bg-white focus:border-[#006837] focus:outline-none transition-all"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[10.5px] font-bold text-slate-700 uppercase tracking-wide mb-1">
                          Preferred Call Time
                        </label>
                        <div className="relative">
                          <Clock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                          <select
                            value={timeSlot}
                            onChange={(e) => setTimeSlot(e.target.value)}
                            className="w-full pl-9 pr-3 py-2.5 rounded-xl text-xs font-bold text-slate-800 border border-slate-200 bg-slate-50 focus:bg-white focus:border-[#006837] focus:outline-none transition-all cursor-pointer"
                          >
                            {TIME_SLOTS.map((t) => (
                              <option key={t} value={t}>
                                {t}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-2.5 px-4 rounded-xl text-xs font-black uppercase tracking-wider text-white bg-[#006837] hover:bg-[#004D26] shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-60"
                      >
                        {loading ? 'Transmitting...' : 'Call Me Back'}
                        <ChevronRight className="w-4 h-4" />
                      </button>

                      <a
                        href={`https://wa.me/919861117168?text=Hi Shibani Travels, I'd like to request a callback for ${timeSlot}`}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-xs font-bold text-[#128C7E] bg-emerald-50/70 border border-emerald-200 hover:bg-emerald-100/70 transition-all cursor-pointer"
                      >
                        <MessageSquare className="w-4 h-4" />
                        Chat Directly on WhatsApp
                      </a>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

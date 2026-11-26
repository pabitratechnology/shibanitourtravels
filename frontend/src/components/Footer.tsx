import React, { useState } from 'react';
import {
  Phone, Mail, MapPin, Send, MessageSquare,
  Car, PhoneCall, Check, ShieldCheck,
  Star, Award, Compass, Sparkles, ArrowRight, ArrowUp,
  Clock, ChevronRight
} from 'lucide-react';
import ShibaniLogo from './ShibaniLogo.js';

interface FooterProps {
  setActiveTab?: (tab: string) => void;
}

export default function Footer({ setActiveTab }: FooterProps) {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const navigate = (id: string) => {
    setActiveTab?.(id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="relative bg-[#002712] text-white overflow-hidden font-sans border-t border-emerald-950">
      
      {/* ── BACKGROUND AMBIENT GLOW & PATTERNS ── */}
      <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-[#E25822] via-[#FFB703] to-[#006837]" />
      <div className="absolute -top-40 right-0 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* ── 1. PRE-FOOTER VIP HELPLINE & STANDBY BANNER ── */}
      <div className="border-b border-white/10 bg-gradient-to-r from-[#00381B] via-[#004724] to-[#00381B] py-8 sm:py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 flex flex-col lg:flex-row items-center justify-between gap-6 text-left">
          
          <div className="space-y-1.5 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="flex h-2.5 w-2.5 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
              </span>
              <span className="text-[11px] font-black uppercase tracking-wider text-amber-300">
                24/7 Dedicated Travel Concierge &amp; Fleet Dispatch
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-black text-white tracking-tight">
              Planning a Road Trip or Tour in Odisha?
            </h3>
            <p className="text-xs sm:text-sm text-green-100/80 font-medium">
              Talk directly to our destination specialists. Custom itineraries, premium cabs &amp; instant confirmations in 15 minutes.
            </p>
          </div>

          <div className="flex items-center gap-3 flex-wrap sm:flex-nowrap shrink-0">
            {/* Direct Call Button */}
            <a
              href="tel:+919861117168"
              className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-gradient-to-r from-[#006837] to-[#008746] hover:from-[#008746] hover:to-[#00A859] text-white font-bold text-xs sm:text-sm shadow-lg hover:shadow-xl transition-all cursor-pointer border border-emerald-400/30 whitespace-nowrap active:scale-95"
            >
              <PhoneCall className="w-4 h-4 text-amber-300 animate-pulse" />
              <span>Call: +91 98611 17168</span>
            </a>

            {/* Direct WhatsApp Chat */}
            <a
              href="https://wa.me/919861117168"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-[#25D366] hover:bg-[#20BA5A] text-white font-bold text-xs sm:text-sm shadow-lg hover:shadow-xl transition-all cursor-pointer whitespace-nowrap active:scale-95"
            >
              <MessageSquare className="w-4 h-4 fill-current" />
              <span>Chat on WhatsApp</span>
            </a>
          </div>

        </div>
      </div>

      {/* ── 2. KEY TRUST & ACCREDITATION BADGES ── */}
      <div className="border-b border-white/10 bg-[#002D15] py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-left">
            
            <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/5">
              <div className="w-10 h-10 rounded-xl bg-amber-400/10 border border-amber-400/20 flex items-center justify-center text-amber-300 shrink-0">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <h5 className="text-xs font-black text-white">28+ Years in Business</h5>
                <p className="text-[10.5px] text-green-100/70 font-medium">Serving Odisha Since 1998</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/5">
              <div className="w-10 h-10 rounded-xl bg-emerald-400/10 border border-emerald-400/20 flex items-center justify-center text-emerald-300 shrink-0">
                <Car className="w-5 h-5" />
              </div>
              <div>
                <h5 className="text-xs font-black text-white">80+ Premium Fleet</h5>
                <p className="text-[10.5px] text-green-100/70 font-medium">GPS Tracked &amp; Sanitized</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/5">
              <div className="w-10 h-10 rounded-xl bg-orange-400/10 border border-orange-400/20 flex items-center justify-center text-[#FF9800] shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h5 className="text-xs font-black text-white">Zero Advance Booking</h5>
                <p className="text-[10.5px] text-green-100/70 font-medium">Pay Driver After Trip</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/5">
              <div className="w-10 h-10 rounded-xl bg-yellow-400/10 border border-yellow-400/20 flex items-center justify-center text-yellow-300 shrink-0">
                <Star className="w-5 h-5 fill-current" />
              </div>
              <div>
                <h5 className="text-xs font-black text-white">4.9/5 Google Rating</h5>
                <p className="text-[10.5px] text-green-100/70 font-medium">2,500+ Verified Reviews</p>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* ── 3. MAIN 5-COLUMN NAVIGATION & INFORMATION ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-12 lg:py-16 relative z-10 text-left">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-8 pb-12 border-b border-white/10">
          
          {/* Col 1: Brand & Contact Coordinates (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <button onClick={() => navigate('home')} className="cursor-pointer text-left block">
              <ShibaniLogo variant="light" size="lg" />
            </button>

            <p className="text-xs text-green-100/80 leading-relaxed font-medium">
              Dedicated to Mahaprabhu Shri Jagannath’s divine blessings. Odisha’s foremost government-registered cab rental, tour operator, and luxury transport service providing dependable travel experiences across Odisha and Eastern India for more than 28 years (since 1998).
            </p>

            <div className="space-y-2.5 pt-2 text-xs text-green-100 font-medium">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-amber-300 shrink-0 mt-0.5" />
                <span>Plot No. 124, Saheed Nagar / Master Canteen Square, Bhubaneswar, Odisha 751007</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-amber-300 shrink-0" />
                <a href="tel:+919861117168" className="hover:text-amber-300 transition-colors font-bold">
                  +91 98611 17168 / +91 94370 17168
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-amber-300 shrink-0" />
                <a href="mailto:info@shibanitravels.com" className="hover:text-amber-300 transition-colors">
                  info@shibanitravels.com
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-amber-300 shrink-0" />
                <span>24 Hours Dispatch &amp; Customer Support</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="pt-2">
              <span className="text-[11px] font-black uppercase tracking-wider text-green-300/80 block mb-2.5">
                Connect With Us
              </span>
              <div className="flex items-center gap-2.5">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Facebook"
                  className="w-8 h-8 rounded-xl bg-white/10 hover:bg-[#1877F2] text-white flex items-center justify-center transition-all hover:scale-110 shadow-xs"
                >
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="YouTube"
                  className="w-8 h-8 rounded-xl bg-white/10 hover:bg-[#FF0000] text-white flex items-center justify-center transition-all hover:scale-110 shadow-xs"
                >
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Instagram"
                  className="w-8 h-8 rounded-xl bg-white/10 hover:bg-gradient-to-tr hover:from-[#F58529] hover:via-[#DD2A7B] hover:to-[#8134AF] text-white flex items-center justify-center transition-all hover:scale-110 shadow-xs"
                >
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
                <a
                  href="https://wa.me/919861117168"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="WhatsApp"
                  className="w-8 h-8 rounded-xl bg-white/10 hover:bg-[#25D366] text-white flex items-center justify-center transition-all hover:scale-110 shadow-xs"
                >
                  <MessageSquare className="w-3.5 h-3.5 fill-current" />
                </a>
              </div>
            </div>
          </div>

          {/* Col 2: Popular Tour Packages (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-black text-amber-300 tracking-wider uppercase flex items-center gap-1.5 pb-1 border-b border-white/10">
              <Compass className="w-3.5 h-3.5 text-amber-300" />
              <span>Odisha Tour Packages (30+)</span>
            </h4>
            <ul className="space-y-2 text-xs text-green-100 font-medium">
              {[
                { name: 'Puri - Konark - Bhubaneswar (3D/2N)', id: 'pkg-golden-triangle-3d2n' },
                { name: 'Divine Puri Jagannath VIP Darshan', id: 'pkg-puri-vip' },
                { name: 'Chilika Lake & Satapada Dolphin Safari', id: 'pkg-chilika-dolphin' },
                { name: 'Daringbadi (Kashmir of Odisha) Hill Tour', id: 'pkg-daringbadi-retreat' },
                { name: 'Similipal Tiger Reserve & Waterfall Safari', id: 'pkg-similipal-wildlife' },
                { name: 'Bhitarkanika Mangrove Sanctuary Tour', id: 'pkg-bhitarkanika-safari' },
                { name: 'Ghatgaon Maa Tarini & Keonjhar Hills', id: 'pkg-keonjhar-waterfalls' },
                { name: 'Gopalpur on Sea & Taratarini Temple', id: 'pkg-gopalpur-coastal' },
              ].map((p, idx) => (
                <li key={idx}>
                  <button
                    onClick={() => navigate(`tour/${p.id}`)}
                    className="hover:text-amber-300 transition-colors flex items-center gap-1.5 cursor-pointer text-left group"
                  >
                    <ChevronRight className="w-3 h-3 text-green-400 group-hover:translate-x-0.5 transition-transform shrink-0" />
                    <span className="truncate">{p.name}</span>
                  </button>
                </li>
              ))}
              <li className="pt-1">
                <button
                  onClick={() => navigate('tours')}
                  className="text-[11px] font-bold text-amber-300 hover:text-white flex items-center gap-1 cursor-pointer"
                >
                  <span>Explore All 32+ Tour Packages</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: 80+ Luxury Fleet Categories (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-black text-amber-300 tracking-wider uppercase flex items-center gap-1.5 pb-1 border-b border-white/10">
              <Car className="w-3.5 h-3.5 text-amber-300" />
              <span>Our Fleet (80+)</span>
            </h4>
            <ul className="space-y-2 text-xs text-green-100 font-medium">
              {[
                { name: 'Maruti Swift Dzire', sub: '₹12/km • 4 Seats' },
                { name: 'Toyota Etios Liva', sub: '₹12/km • 4 Seats' },
                { name: 'Honda City i-VTEC', sub: '₹15/km • 4 Seats' },
                { name: 'Toyota Innova Crysta', sub: '₹18/km • 7 Seats' },
                { name: 'Toyota Innova Hycross', sub: '₹20/km • 7 Seats' },
                { name: 'Toyota Fortuner 4x4', sub: '₹24/km • 7 Seats' },
                { name: 'Force Urbania Luxury', sub: '₹28/km • 17 Seats' },
                { name: 'Tempo Traveller Elite', sub: '₹22/km • 12-26 Seats' },
              ].map((f, idx) => (
                <li key={idx}>
                  <button
                    onClick={() => navigate('fleet')}
                    className="hover:text-amber-300 transition-colors flex flex-col text-left cursor-pointer group"
                  >
                    <span className="font-bold text-white group-hover:text-amber-300 transition-colors">
                      {f.name}
                    </span>
                    <span className="text-[10px] text-green-300/80">
                      {f.sub}
                    </span>
                  </button>
                </li>
              ))}
              <li className="pt-1">
                <button
                  onClick={() => navigate('fleet')}
                  className="text-[11px] font-bold text-amber-300 hover:text-white flex items-center gap-1 cursor-pointer"
                >
                  <span>View All 80+ Vehicles</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Quick Links & Services (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <div>
              <h4 className="text-xs font-black text-amber-300 tracking-wider uppercase flex items-center gap-1.5 pb-1 border-b border-white/10 mb-3">
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>Specialized Travel Services</span>
              </h4>
              <ul className="space-y-1.5 text-xs text-green-100 font-medium">
                {[
                  { label: 'BBI Airport Transfer (Bhubaneswar)', id: 'services' },
                  { label: 'Outstation One-Way & Round Trips', id: 'services' },
                  { label: 'Bhubaneswar Sightseeing (8H/80K)', id: 'services' },
                  { label: 'Grand VVIP Wedding Car Convoys', id: 'services' },
                  { label: 'Corporate Delegations & Seminars', id: 'services' },
                  { label: 'Wildlife & Eco-Tourism Expeditions', id: 'services' },
                ].map((s, idx) => (
                  <li key={idx}>
                    <button
                      onClick={() => navigate(s.id)}
                      className="hover:text-amber-300 transition-colors flex items-center gap-1.5 cursor-pointer text-left"
                    >
                      <ChevronRight className="w-3 h-3 text-green-400 shrink-0" />
                      <span>{s.label}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Newsletter & Discount */}
            <div className="pt-2 bg-white/5 p-3.5 rounded-2xl border border-white/10">
              <h5 className="text-xs font-black text-white flex items-center gap-1.5 mb-1">
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>Get ₹500 OFF Your Trip</span>
              </h5>
              <p className="text-[10.5px] text-green-100/70 mb-2">
                Subscribe for seasonal discounts &amp; curated temple festival dates.
              </p>
              <form onSubmit={handleSubscribe} className="relative flex items-center">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter email..."
                  required
                  className="w-full bg-white/10 border border-white/20 text-white placeholder-green-200/50 text-xs py-2 pl-3 pr-9 rounded-xl focus:bg-white/20 focus:outline-none"
                />
                <button
                  type="submit"
                  aria-label="Subscribe"
                  className="absolute right-1 w-7 h-7 rounded-lg bg-[#006837] hover:bg-[#008746] text-white flex items-center justify-center transition-colors cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
              {subscribed && (
                <div className="flex items-center gap-1 text-[11px] text-amber-300 font-bold mt-1.5">
                  <Check className="w-3.5 h-3.5" />
                  <span>Promo code SHIBANI500 applied!</span>
                </div>
              )}
            </div>

            {/* Accepted Payments Strip */}
            <div className="pt-1">
              <span className="text-[10px] font-bold text-green-200/60 uppercase block mb-1.5">
                Accepted Payment Options:
              </span>
              <div className="flex items-center gap-2 text-[10.5px] font-bold text-green-100/90 flex-wrap">
                <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10">UPI / QR</span>
                <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10">GPay &amp; PhonePe</span>
                <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10">Credit/Debit Cards</span>
                <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10">Cash to Chauffeur</span>
              </div>
            </div>

          </div>

        </div>

        {/* ── 4. POPULAR ODISHA CAB ROUTES & CIRCUITS TAG CLOUD ── */}
        <div className="py-6 border-b border-white/10 text-left">
          <div className="flex items-center gap-2 mb-2.5">
            <Compass className="w-3.5 h-3.5 text-amber-300 shrink-0" />
            <h5 className="text-[11px] font-black uppercase tracking-wider text-green-200/80">
              Popular Odisha Cab Routes &amp; Destinations:
            </h5>
          </div>
          <div className="flex items-center gap-1.5 flex-wrap text-[10.5px] text-green-100/70">
            {[
              'Bhubaneswar to Puri Cab',
              'Bhubaneswar to Konark Taxi',
              'Cuttack to Puri Jagannath Temple',
              'BBI Airport to Swargadwar Puri',
              'Bhubaneswar to Chilika Lake Satapada',
              'Bhubaneswar to Daringbadi Hills',
              'Bhubaneswar to Similipal Safari',
              'Bhubaneswar to Ghatgaon Maa Tarini',
              'Bhubaneswar to Gopalpur on Sea',
              'Bhubaneswar to Bhitarkanika Crocodile Sanctuary',
              'Bhubaneswar to Angul / Talcher',
              'Bhubaneswar to Rourkela / Sambalpur',
              'Bhubaneswar to Chandipur on Sea',
              'Puri to Konark Marine Drive Cab',
            ].map((route, rIdx) => (
              <span key={rIdx} className="hover:text-amber-300 transition-colors cursor-pointer">
                {route} {rIdx < 13 && '•'}
              </span>
            ))}
          </div>
        </div>

        {/* ── 5. BOTTOM COPYRIGHT & LEGAL STRIP ── */}
        <div className="pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-green-100/70 font-medium">
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-center sm:text-left">
            <p>© 2026 Shibani Travels. All Rights Reserved.</p>
            <span className="hidden sm:inline text-white/20">|</span>
            <div className="flex items-center gap-3 text-[11px]">
              <button onClick={() => navigate('about')} className="hover:text-amber-300 transition-colors cursor-pointer">
                About Us
              </button>
              <span>•</span>
              <button onClick={() => navigate('services')} className="hover:text-amber-300 transition-colors cursor-pointer">
                Terms of Service
              </button>
              <span>•</span>
              <button onClick={() => navigate('contact')} className="hover:text-amber-300 transition-colors cursor-pointer">
                Privacy Policy
              </button>
              <span>•</span>
              <button onClick={() => navigate('contact')} className="hover:text-amber-300 transition-colors cursor-pointer">
                Support
              </button>
            </div>
          </div>

          <div className="flex items-center gap-4 flex-wrap justify-center sm:justify-end">
            <span className="text-[11px] text-green-100/90 font-medium">
              Developed and Maintained by{' '}
              <a
                href="https://pabitratechnology.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-amber-300 hover:text-amber-200 font-bold underline transition-colors"
              >
                Pabitra Technology
              </a>
            </span>

            {/* Back To Top Button */}
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-[11px] font-bold transition-all cursor-pointer shadow-xs active:scale-95"
              aria-label="Back to Top"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5 text-amber-300" />
            </button>
          </div>
        </div>

      </div>

    </footer>
  );
}

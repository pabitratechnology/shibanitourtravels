import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import {
  MapPin, Calendar, Clock, Star, Check, ShieldCheck,
  Phone, MessageSquare, ArrowRight, ArrowLeft, Car, Hotel, Users,
  Sparkles, AlertCircle, Share2, Printer, ChevronRight, CheckCircle2,
  Compass, HelpCircle, X
} from 'lucide-react';
import { ODISHA_TOUR_PACKAGES, TourPackage } from '../data/odishaTourPackages.js';

interface TourDetailPageProps {
  onBookPackage: (packageName?: string, vehicle?: string, from?: string, to?: string) => void;
}

export default function TourDetailPage({ onBookPackage }: TourDetailPageProps) {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [selectedVehicle, setSelectedVehicle] = useState('Toyota Innova Crysta');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [id]);

  const pkg =
    ODISHA_TOUR_PACKAGES.find(
      (p) =>
        p.id === id ||
        p.id === `pkg-${id}` ||
        (id && p.id.replace('pkg-', '').toLowerCase() === id.replace('pkg-', '').toLowerCase()) ||
        (id && p.title.toLowerCase().includes(id.toLowerCase()))
    ) || ODISHA_TOUR_PACKAGES[0];

  if (!pkg) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center p-6 bg-[#FAF8F5]">
        <Compass className="w-16 h-16 text-slate-300 mb-4 animate-spin" />
        <h2 className="text-2xl font-black text-slate-800 mb-2">Tour Package Not Found</h2>
        <p className="text-sm text-slate-500 max-w-md mb-6">
          The requested tour package could not be located. Explore our catalog of 32+ authentic Odisha itineraries.
        </p>
        <button
          onClick={() => navigate('/tours')}
          className="px-6 py-3 rounded-xl bg-[#006837] text-white font-bold text-sm shadow-md hover:bg-[#004D26] transition-colors"
        >
          View All 32+ Tour Packages
        </button>
      </div>
    );
  }

  const routeStops = pkg.route.split('➔').map((s) => s.trim());
  const daysCount = Math.max(pkg.days, 1);

  // Generate day-by-day itinerary
  const itinerary = pkg.itinerary && pkg.itinerary.length > 0 ? pkg.itinerary : Array.from({ length: daysCount }, (_, i) => {
    const day = i + 1;
    if (day === 1) {
      return {
        day: 1,
        title: `Day 1: Arrival, Warm Welcome & ${routeStops[1] || routeStops[0] || 'Local'} Sightseeing`,
        desc: `Arrival at Bhubaneswar or Puri airport/station. Meet & greet by our verified AC chauffeur. Check-in to your partner hotel. Visit ${routeStops.slice(0, 2).join(' & ')} followed by evening temple aarti / scenic beach sunset.`,
        places: routeStops.slice(0, 2),
      };
    } else if (day === daysCount) {
      return {
        day,
        title: `Day ${day}: Morning Darshan / Sunrise & Return Drop`,
        desc: `Enjoy early morning peaceful darshan or sunrise. Buffet breakfast at the hotel. Free time for souvenir & Pattachitra / Sambalpuri shopping. Comfortable chauffeur transfer back to Airport or Railway Station.`,
        places: [routeStops[routeStops.length - 1] || 'Bhubaneswar Return Drop'],
      };
    } else {
      const stopIndex = Math.min(day, routeStops.length - 1);
      const stop = routeStops[stopIndex] || 'Excursion';
      return {
        day,
        title: `Day ${day}: Full Day Scenic Tour: ${stop}`,
        desc: `After breakfast, scenic road trip exploring ${stop}. Experience guided visits, local heritage, viewpoints and photography stops with dedicated chauffeur on standby.`,
        places: [stop],
      };
    }
  });

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const whatsappText = encodeURIComponent(
    `Hello Shibani Travels! I am interested in booking: "${pkg.title}" (${pkg.duration}) starting at ₹${pkg.price.toLocaleString('en-IN')}/person. Please assist me with dates and itinerary customisation.`
  );

  return (
    <div className="bg-[#FAF8F5] min-h-screen text-slate-800 pb-24 pt-24 sm:pt-28 font-sans">
      
      {/* ══ BREADCRUMB & BACK NAVIGATION ══ */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 mb-4">
        <div className="flex items-center justify-between">
          <button
            onClick={() => navigate('/tours')}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#006837] hover:underline cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to All 30+ Packages</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>{copied ? 'Link Copied!' : 'Share'}</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        
        {/* ══ HERO CARD ══ */}
        <div className="relative rounded-3xl overflow-hidden shadow-xl bg-slate-950 text-white mb-8 min-h-[380px] sm:min-h-[440px] flex flex-col justify-end p-6 sm:p-10">
          <img
            src={pkg.img}
            alt={pkg.title}
            className="absolute inset-0 w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent" />

          {/* Top Badges */}
          <div className="absolute top-6 left-6 right-6 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-white text-[#006837] shadow-md">
                {pkg.badge}
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-bold text-white bg-black/50 backdrop-blur-md border border-white/20">
                {pkg.category}
              </span>
            </div>
            <span className="px-3 py-1 rounded-full bg-amber-400 text-slate-950 text-xs font-black flex items-center gap-1 shadow-md">
              <Star className="w-3.5 h-3.5 fill-current" />
              <span>{pkg.rating} ({pkg.reviews} reviews)</span>
            </span>
          </div>

          {/* Bottom Hero Info */}
          <div className="relative z-10 max-w-3xl">
            <div className="flex items-center gap-2 text-xs font-bold text-amber-300 mb-2">
              <Clock className="w-4 h-4" />
              <span>{pkg.duration}</span>
              <span>•</span>
              <span>{pkg.tag}</span>
            </div>

            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white leading-tight mb-3">
              {pkg.title}
            </h1>

            <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-300 mb-4">
              <MapPin className="w-4 h-4 text-amber-400 shrink-0" />
              <span>{pkg.route}</span>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <span className="text-2xl sm:text-3xl font-black text-white">
                ₹{pkg.price.toLocaleString('en-IN')}{' '}
                <span className="text-xs sm:text-sm text-slate-300 font-normal">/ person</span>
              </span>
              <span className="text-xs font-bold text-emerald-300 bg-emerald-950/60 px-3 py-1 rounded-full border border-emerald-500/40">
                Private AC Cab + 3★/4★ Hotel Included
              </span>
            </div>
          </div>
        </div>

        {/* ══ MAIN 2-COLUMN CONTENT ══ */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* LEFT 2 COLUMNS: ITINERARY & DETAILS */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Highlights */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs">
              <h3 className="text-lg font-black text-slate-900 mb-4 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-600" />
                <span>Tour Highlights & Inclusions</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {pkg.highlights.map((h, i) => (
                  <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 font-medium">
                    <CheckCircle2 className="w-4 h-4 text-[#006837] shrink-0 mt-0.5" />
                    <span>{h}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Day-by-Day Itinerary */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg sm:text-xl font-black text-slate-900">
                    Day-Wise Detailed Itinerary
                  </h3>
                  <p className="text-xs text-slate-500 font-medium mt-0.5">
                    Planned for relaxed exploration with zero rushed schedules
                  </p>
                </div>
                <span className="text-xs font-bold text-[#006837] bg-green-50 px-3 py-1 rounded-full border border-green-200">
                  {pkg.days} Days Total
                </span>
              </div>

              <div className="space-y-6 relative before:absolute before:inset-0 before:left-4 before:w-0.5 before:bg-slate-200">
                {itinerary.map((item: any) => (
                  <div key={item.day} className="relative pl-11">
                    <div className="absolute left-0 top-0.5 w-8 h-8 rounded-full bg-[#006837] text-white text-xs font-black flex items-center justify-center shadow-md">
                      D{item.day}
                    </div>

                    <div className="bg-slate-50/80 p-5 rounded-2xl border border-slate-200/80">
                      <h4 className="text-sm sm:text-base font-black text-slate-900 mb-2">
                        {item.title}
                      </h4>
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                        {item.desc}
                      </p>
                      {item.places && (
                        <div className="flex flex-wrap items-center gap-1.5 mt-3 pt-3 border-t border-slate-200/60">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                            Key Halts:
                          </span>
                          {item.places.map((p: string, idx: number) => (
                            <span
                              key={idx}
                              className="text-[11px] font-semibold bg-white text-slate-700 px-2.5 py-0.5 rounded border border-slate-200 shadow-2xs"
                            >
                              {p}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Inclusions & Exclusions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-emerald-50/60 rounded-3xl p-6 border border-emerald-200">
                <h4 className="text-sm font-black text-[#006837] mb-3 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Inclusions</span>
                </h4>
                <ul className="space-y-2 text-xs font-medium text-slate-700">
                  {pkg.inclusions.map((inc, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-[#006837] shrink-0 stroke-[2.5]" />
                      <span>{inc}</span>
                    </li>
                  ))}
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-[#006837] shrink-0 stroke-[2.5]" />
                    <span>All Highway Tolls, State Taxes, Fuel & Driver Bata</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-[#006837] shrink-0 stroke-[2.5]" />
                    <span>24/7 Dedicated Trip Coordinator on WhatsApp</span>
                  </li>
                </ul>
              </div>

              <div className="bg-rose-50/50 rounded-3xl p-6 border border-rose-200/80">
                <h4 className="text-sm font-black text-rose-700 mb-3 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4" />
                  <span>Exclusions</span>
                </h4>
                <ul className="space-y-2 text-xs font-medium text-slate-600">
                  {[
                    'Lunch & Dinner meals (can be pre-arranged)',
                    'Monument entrance fees & camera tickets',
                    'Personal expenses (laundry, beverages, room service)',
                    'Train or flight tickets to starting city',
                    'Special VIP Puja donations at inner sanctorum',
                  ].map((exc, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <X className="w-4 h-4 text-rose-500 shrink-0" />
                      <span>{exc}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

          </div>

          {/* RIGHT 1 COLUMN: BOOKING & VEHICLE CARD */}
          <div className="space-y-6">
            
            {/* Booking Card */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xl sticky top-28">
              <span className="text-[10px] uppercase font-bold text-slate-400 block mb-0.5">
                Starting Per Person
              </span>
              <div className="flex items-baseline gap-2 mb-4">
                <span className="text-3xl sm:text-4xl font-black text-[#006837]">
                  ₹{pkg.price.toLocaleString('en-IN')}
                </span>
                <span className="text-xs text-slate-500 font-semibold">/ person (All-Inclusive)</span>
              </div>

              {/* Vehicle Options */}
              <div className="space-y-2 mb-5">
                <label className="text-xs font-bold text-slate-700 block">
                  Select Travel Vehicle:
                </label>
                {[
                  { name: 'Swift Dzire / Etios', type: 'AC Sedan (1-4 Pax)' },
                  { name: 'Toyota Innova Crysta', type: 'Premium SUV (4-7 Pax)' },
                  { name: 'Force Urbania / Tempo', type: 'Luxury Minibus (8-17 Pax)' },
                ].map((v) => (
                  <button
                    key={v.name}
                    onClick={() => setSelectedVehicle(v.name)}
                    className={`w-full text-left p-2.5 rounded-xl border text-xs transition-all cursor-pointer flex items-center justify-between ${
                      selectedVehicle === v.name
                        ? 'border-[#006837] bg-green-50/60 font-bold text-[#006837]'
                        : 'border-slate-200 hover:border-slate-300 text-slate-700'
                    }`}
                  >
                    <div>
                      <span className="block font-bold">{v.name}</span>
                      <span className="text-[10px] text-slate-500 font-normal">{v.type}</span>
                    </div>
                    {selectedVehicle === v.name && <Check className="w-4 h-4 text-[#006837] stroke-[3]" />}
                  </button>
                ))}
              </div>

              {/* Instant Book Button */}
              <button
                onClick={() => onBookPackage(pkg.title, selectedVehicle, 'Bhubaneswar', pkg.route)}
                className="w-full py-3.5 px-4 rounded-xl text-xs sm:text-sm font-black uppercase tracking-wider text-white bg-gradient-to-r from-[#006837] to-[#008746] hover:from-[#004D26] hover:to-[#006837] shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer mb-3"
              >
                <span>Book This Tour Package</span>
                <ArrowRight className="w-4 h-4 stroke-[2.5]" />
              </button>

              {/* WhatsApp Enquiry */}
              <a
                href={`https://wa.me/919861117168?text=${whatsappText}`}
                target="_blank"
                rel="noreferrer"
                className="w-full py-3 px-4 rounded-xl text-xs font-bold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 transition-colors flex items-center justify-center gap-2 mb-2"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Chat on WhatsApp (Instant Reply)</span>
              </a>

              {/* Phone Helpline */}
              <a
                href="tel:+919861117168"
                className="w-full py-2.5 px-4 rounded-xl text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors flex items-center justify-center gap-2"
              >
                <Phone className="w-3.5 h-3.5 text-[#006837]" />
                <span>Call Specialist: +91 98611 17168</span>
              </a>

              {/* Trust Badges */}
              <div className="mt-5 pt-4 border-t border-slate-100 space-y-2 text-[11px] text-slate-500 font-medium">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#006837]" />
                  <span>100% Verified Commercial Vehicles & Chauffeurs</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#006837]" />
                  <span>Free cancellation up to 48h before journey</span>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X, MapPin, Calendar, Clock, Star, Check, ShieldCheck,
  Phone, MessageSquare, ArrowRight, Car, Hotel, Users,
  Sparkles, AlertCircle, Share2, Printer, ChevronRight, CheckCircle2,
  Compass, HelpCircle, Maximize2, Minimize2, Utensils, Award, ExternalLink
} from 'lucide-react';
import { TourPackage } from '../data/odishaTourPackages.js';

interface TourDetailModalProps {
  packageData: TourPackage | null;
  isOpen: boolean;
  onClose: () => void;
  onBookNow: (pkg: TourPackage, vehicle?: string) => void;
}

// Generate rich, day-wise itineraries dynamically when not custom-defined
function generateDefaultItinerary(pkg: TourPackage) {
  if (pkg.itinerary && pkg.itinerary.length > 0) {
    return pkg.itinerary;
  }

  const routeStops = pkg.route.split('➔').map((s) => s.trim());
  const daysCount = Math.max(pkg.days, 1);
  const items = [];

  for (let d = 1; d <= daysCount; d++) {
    if (d === 1) {
      items.push({
        day: 1,
        title: `Day 1: Arrival, Warm Welcome & ${routeStops[1] || routeStops[0] || 'Local'} Sightseeing`,
        desc: `Morning arrival at Bhubaneswar / Puri airport or railway station. Meet and greet by our verified AC chauffeur holding your name placard. Smooth transfer to your pre-booked deluxe hotel. After freshening up, embark on your first sightseeing drive to ${routeStops.slice(0, 2).join(' & ')}. Enjoy evening temple aarti / scenic sunset walk followed by authentic Odia delicacies.`,
        places: routeStops.slice(0, 2),
      });
    } else if (d === daysCount) {
      items.push({
        day: d,
        title: `Day ${d}: Final Morning Exploration & Return Airport / Station Drop`,
        desc: `Wake up early for sacred morning darshan or beach sunrise. Enjoy a leisurely buffet breakfast at the hotel. Free time for local handicraft & handloom shopping (Pipili applique, Pattachitra or Sambalpuri sarees). Post lunch, comfortable private chauffeur drive back to Bhubaneswar Airport / Railway Station with unforgettable memories.`,
        places: [routeStops[routeStops.length - 1] || 'Bhubaneswar Departure'],
      });
    } else {
      const stopIndex = Math.min(d, routeStops.length - 1);
      const currentStop = routeStops[stopIndex] || 'Heritage Sightseeing';
      items.push({
        day: d,
        title: `Day ${d}: Full Day Excursion: ${currentStop} & Cultural Exploration`,
        desc: `After delicious morning breakfast, proceed on a scenic road trip covering ${currentStop}. Guided visits to iconic monuments, sacred shrines, and scenic viewpoints with dedicated VIP assistance. Ample time for photography and local interaction. Return to hotel for overnight stay.`,
        places: [currentStop],
      });
    }
  }

  return items;
}

export default function TourDetailModal({
  packageData,
  isOpen,
  onClose,
  onBookNow,
}: TourDetailModalProps) {
  const [activeTab, setActiveTab] = useState<'itinerary' | 'inclusions' | 'fleet' | 'guidelines'>('itinerary');
  const [selectedVehicle, setSelectedVehicle] = useState('Toyota Innova Crysta');
  const [copied, setCopied] = useState(false);

  // Keyboard escape listener to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !packageData) return null;

  const itinerary = generateDefaultItinerary(packageData);
  const routeStops = packageData.route.split('➔').map((s) => s.trim());

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const whatsappText = encodeURIComponent(
    `Hello Shibani Travels! I am interested in booking the tour package: "${packageData.title}" (${packageData.duration}) starting at ₹${packageData.price.toLocaleString('en-IN')}/person. Selected vehicle: ${selectedVehicle}. Please share full details and booking procedure.`
  );

  const vehicleOptions = [
    {
      name: 'Maruti Suzuki Dzire',
      type: 'Sedan (4 Seater)',
      rateMultiplier: 0.9,
      badge: 'Best Value',
      img: '/images/swift_dzire_wide.png',
      desc: 'Ideal for couples or small families of up to 3-4 passengers with medium luggage.'
    },
    {
      name: 'Toyota Innova Crysta',
      type: 'Executive MUV (7 Seater)',
      rateMultiplier: 1.0,
      badge: 'Most Popular',
      img: '/images/innova_crysta_wide.png',
      desc: 'Ultimate luxury with captain recliner seats, roof AC blowers, and large boot space.'
    },
    {
      name: 'Toyota Fortuner 4x4',
      type: 'Luxury SUV (7 Seater)',
      rateMultiplier: 1.35,
      badge: 'VIP Off-Road',
      img: '/images/fortuner_wide.png',
      desc: 'High-stance 4x4 power, leather interior, perfect for Daringbadi hill ghats.'
    },
    {
      name: 'Force Urbania Luxury',
      type: 'VIP Van (17 Seater)',
      rateMultiplier: 1.6,
      badge: 'Premium Group',
      img: '/images/force_urbania_wide.png',
      desc: 'Monocoque body, panoramic picture windows, individual AC vents, plush recliner seats.'
    },
    {
      name: 'Force Tempo Traveller',
      type: 'Touring Van (17-26 Seater)',
      rateMultiplier: 1.45,
      badge: 'Group Yatra',
      img: '/images/tempo_traveller_wide.png',
      desc: 'High ceiling stand-up cabin, 2x1 luxury recliners, roof carrier, and PA audio.'
    }
  ];

  const currentVehicleObj = vehicleOptions.find(v => v.name === selectedVehicle) || vehicleOptions[1];
  const calculatedPrice = Math.round(packageData.price * currentVehicleObj.rateMultiplier);

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] w-screen h-screen bg-slate-950/90 backdrop-blur-md overflow-hidden flex flex-col font-sans">
        
        {/* ══════════════════════════════════════════════════════════════
            STICKY FULL-SCREEN TOP NAVIGATION HEADER
        ══════════════════════════════════════════════════════════════ */}
        <header className="h-16 sm:h-18 bg-white/95 border-b border-slate-200 px-4 sm:px-8 flex items-center justify-between shrink-0 shadow-sm z-30 backdrop-blur-md">
          {/* Left: Branding & Package Summary */}
          <div className="flex items-center gap-3 sm:gap-4 overflow-hidden">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#006837] text-white flex items-center justify-center font-black text-sm shrink-0 shadow-md">
              ST
            </div>
            <div className="overflow-hidden">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-100 text-[#006837]">
                  {packageData.badge}
                </span>
                <span className="text-xs text-slate-500 font-semibold hidden md:inline">
                  {packageData.category}
                </span>
              </div>
              <h1 className="text-sm sm:text-base md:text-lg font-black text-slate-900 truncate">
                {packageData.title}
              </h1>
            </div>
          </div>

          {/* Right: Quick Actions & Close */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Price Preview */}
            <div className="hidden lg:flex flex-col items-end pr-3 border-r border-slate-200">
              <span className="text-[10px] uppercase font-bold text-slate-400">Starting From</span>
              <span className="text-lg font-black text-[#006837]">
                ₹{calculatedPrice.toLocaleString('en-IN')}{' '}
                <span className="text-xs font-semibold text-slate-500">/ person</span>
              </span>
            </div>

            {/* Share Button */}
            <button
              onClick={handleShare}
              className="p-2 sm:px-3 sm:py-2 rounded-xl text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors flex items-center gap-1.5 cursor-pointer"
              title="Copy Tour Link"
            >
              <Share2 className="w-4 h-4 text-slate-600" />
              <span className="hidden sm:inline">{copied ? 'Link Copied!' : 'Share'}</span>
            </button>

            {/* Phone Helpline */}
            <a
              href="tel:+919861117168"
              className="p-2 sm:px-3 sm:py-2 rounded-xl text-xs font-bold text-[#006837] bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 transition-colors flex items-center gap-1.5 cursor-pointer"
              title="Direct Helpline"
            >
              <Phone className="w-4 h-4" />
              <span className="hidden sm:inline font-black">+91 98611 17168</span>
            </a>

            {/* Book Now Button */}
            <button
              onClick={() => {
                onClose();
                onBookNow(packageData, selectedVehicle);
              }}
              className="py-2 px-3 sm:px-5 rounded-xl text-xs sm:text-sm font-black uppercase tracking-wider text-white bg-gradient-to-r from-[#006837] to-[#008746] hover:from-[#004D26] hover:to-[#006837] shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <span>Book Tour</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            {/* Close Modal (Full Screen Exit) */}
            <button
              onClick={onClose}
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-slate-100 hover:bg-red-50 hover:text-red-600 text-slate-700 flex items-center justify-center transition-colors cursor-pointer border border-slate-200"
              title="Close Full Screen (Esc)"
            >
              <X className="w-5 h-5 stroke-[2.5]" />
            </button>
          </div>
        </header>

        {/* ══════════════════════════════════════════════════════════════
            SCROLLABLE FULL-SCREEN BODY CONTAINER
        ══════════════════════════════════════════════════════════════ */}
        <div className="flex-1 overflow-y-auto bg-slate-50">
          
          {/* ── 1. FULL-WIDTH PANORAMIC HERO BANNER ── */}
          <div className="relative h-72 sm:h-96 md:h-[420px] w-full bg-slate-950 overflow-hidden">
            <img
              src={packageData.img}
              alt={packageData.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950/80 via-transparent to-slate-950/40" />

            {/* Hero Overlay Content */}
            <div className="absolute inset-x-0 bottom-0 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 pb-8 sm:pb-12 text-white z-10">
              <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs font-bold text-amber-300 mb-3">
                <span className="flex items-center gap-1.5 bg-amber-500/20 backdrop-blur-md px-3 py-1 rounded-full border border-amber-400/30">
                  <Clock className="w-4 h-4" />
                  {packageData.duration}
                </span>
                <span className="flex items-center gap-1 bg-white/10 backdrop-blur-md px-3 py-1 rounded-full border border-white/20">
                  <Star className="w-4 h-4 fill-current text-amber-400" />
                  {packageData.rating} ({packageData.reviews} Verified Reviews)
                </span>
                <span className="bg-emerald-600/90 backdrop-blur-md px-3 py-1 rounded-full border border-white/20 text-white font-black">
                  {packageData.tag}
                </span>
              </div>

              <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white leading-tight max-w-4xl tracking-tight mb-3">
                {packageData.title}
              </h1>

              {/* Complete Circuit Route progression */}
              <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-200 overflow-x-auto pb-1 scrollbar-none flex-nowrap">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0" />
                <span className="font-bold text-amber-400">Tour Circuit:</span>
                {routeStops.map((stop, idx) => (
                  <React.Fragment key={idx}>
                    <span className="px-2.5 py-0.5 rounded-md bg-white/15 backdrop-blur-md border border-white/20 font-semibold whitespace-nowrap">
                      {stop}
                    </span>
                    {idx < routeStops.length - 1 && (
                      <span className="text-amber-400 font-black">➔</span>
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>

          {/* ── 2. TRUST & METRICS STRIP ── */}
          <div className="bg-white border-b border-slate-200 shadow-sm sticky top-0 z-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-3 flex items-center justify-between overflow-x-auto gap-4 text-xs font-medium">
              <div className="flex items-center gap-2.5 shrink-0">
                <div className="w-8 h-8 rounded-lg bg-emerald-100 text-[#006837] flex items-center justify-center font-bold">
                  <Car className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block font-semibold uppercase">Private Cab</span>
                  <span className="font-bold text-slate-800">Chauffeur Driven AC Cab</span>
                </div>
              </div>

              <div className="flex items-center gap-2.5 shrink-0">
                <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center font-bold">
                  <Hotel className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block font-semibold uppercase">Accommodation</span>
                  <span className="font-bold text-slate-800">3★ / 4★ Verified Stays</span>
                </div>
              </div>

              <div className="flex items-center gap-2.5 shrink-0">
                <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
                  <Utensils className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block font-semibold uppercase">Meals</span>
                  <span className="font-bold text-slate-800">Complimentary Breakfast</span>
                </div>
              </div>

              <div className="flex items-center gap-2.5 shrink-0">
                <div className="w-8 h-8 rounded-lg bg-purple-100 text-purple-700 flex items-center justify-center font-bold">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block font-semibold uppercase">No Hidden Costs</span>
                  <span className="font-bold text-slate-800">All Tolls & Permits Included</span>
                </div>
              </div>
            </div>
          </div>

          {/* ── 3. MAIN FULL-SCREEN CONTENT GRID (2 COLUMNS) ── */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-8 sm:py-12">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 sm:gap-10">
              
              {/* ═══ LEFT 2 COLUMNS: TABS & JOURNEY DETAILS ═══ */}
              <div className="lg:col-span-2 space-y-8">
                
                {/* Tab Controls Bar */}
                <div className="flex items-center gap-2 border-b border-slate-200 pb-2 overflow-x-auto scrollbar-none">
                  {[
                    { id: 'itinerary', label: `Day-Wise Itinerary (${packageData.days} Days)` },
                    { id: 'inclusions', label: 'Inclusions & Exclusions' },
                    { id: 'fleet', label: 'Choose Fleet Model' },
                    { id: 'guidelines', label: 'Important Travel Guidelines' },
                  ].map((tab) => {
                    const isCur = activeTab === tab.id;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id as any)}
                        className={`px-4 py-2.5 text-xs sm:text-sm font-bold rounded-xl transition-all whitespace-nowrap cursor-pointer ${
                          isCur
                            ? 'bg-[#006837] text-white shadow-md'
                            : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                        }`}
                      >
                        {tab.label}
                      </button>
                    );
                  })}
                </div>

                {/* ── TAB 1: ITINERARY TIMELINE ── */}
                {activeTab === 'itinerary' && (
                  <div className="space-y-6">
                    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm">
                      <div className="flex items-center justify-between mb-6">
                        <div>
                          <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                            Detailed Day-Wise Itinerary
                          </h2>
                          <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1">
                            Carefully paced travel designed for zero fatigue, smooth road travel, and maximum sightseeing enjoyment.
                          </p>
                        </div>
                        <span className="text-xs font-black px-3 py-1 rounded-full bg-emerald-50 text-[#006837] border border-emerald-200 shrink-0">
                          {packageData.days} Days • {packageData.days - 1} Nights
                        </span>
                      </div>

                      {/* Day by Day Cards */}
                      <div className="space-y-6 relative before:absolute before:top-4 before:bottom-4 before:left-5 before:w-0.5 before:bg-emerald-200">
                        {itinerary.map((item, idx) => (
                          <div key={idx} className="relative pl-12">
                            {/* Number Pin */}
                            <div className="absolute left-0 top-0 w-10 h-10 rounded-full bg-white border-2 border-[#006837] text-[#006837] font-black text-sm flex items-center justify-center shadow-md z-10">
                              D{item.day}
                            </div>

                            <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200/80 hover:border-emerald-300 transition-colors">
                              <h3 className="text-base font-black text-slate-900 mb-2">
                                {item.title}
                              </h3>
                              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium mb-3">
                                {item.desc}
                              </p>

                              {/* Highlighted stops */}
                              {item.places && item.places.length > 0 && (
                                <div className="flex items-center gap-1.5 flex-wrap pt-2 border-t border-slate-200">
                                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mr-1">
                                    Covering:
                                  </span>
                                  {item.places.map((p, pIdx) => (
                                    <span
                                      key={pIdx}
                                      className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-white text-slate-700 border border-slate-200 flex items-center gap-1"
                                    >
                                      <CheckCircle2 className="w-3 h-3 text-[#006837]" />
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
                  </div>
                )}

                {/* ── TAB 2: INCLUSIONS & EXCLUSIONS ── */}
                {activeTab === 'inclusions' && (
                  <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
                    <div>
                      <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                        What's Included & Excluded
                      </h2>
                      <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1">
                        100% transparent pricing with zero surprise charges during the journey.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* INCLUSIONS */}
                      <div className="bg-emerald-50/60 rounded-2xl p-5 border border-emerald-200">
                        <div className="flex items-center gap-2 mb-4 text-[#006837] font-black text-base">
                          <CheckCircle2 className="w-5 h-5" />
                          <span>Package Inclusions</span>
                        </div>
                        <ul className="space-y-3 text-xs sm:text-sm text-slate-700 font-medium">
                          {[
                            'Dedicated Private AC Vehicle throughout the entire itinerary',
                            'All interstate road taxes, toll plaza taxes, and parking fees',
                            'Police-verified, experienced local chauffeur with night allowances',
                            'Deluxe accommodation in 3★ / 4★ sanitized hotels / resorts',
                            'Daily complimentary breakfast at hotel buffet',
                            'Airport / Railway Station pickup and drop off transfers',
                            'Chilika Lake & Konark local temple sightseeing assistance',
                            '24x7 On-road emergency dispatch helpline support',
                          ].map((inc, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <Check className="w-4 h-4 text-[#006837] shrink-0 mt-0.5 stroke-[3]" />
                              <span>{inc}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* EXCLUSIONS */}
                      <div className="bg-rose-50/60 rounded-2xl p-5 border border-rose-200">
                        <div className="flex items-center gap-2 mb-4 text-rose-700 font-black text-base">
                          <AlertCircle className="w-5 h-5" />
                          <span>Package Exclusions</span>
                        </div>
                        <ul className="space-y-3 text-xs sm:text-sm text-slate-700 font-medium">
                          {[
                            'Airfare or train tickets to and from Bhubaneswar',
                            'Monument entry tickets, camera permits, and personal boating charges',
                            'Lunch, dinner, and personal room service / mini-bar items',
                            'Special puja tickets, panda charges, or temple offering fees',
                            'Personal expenses such as laundry, phone calls, or tips',
                            'Any expenses caused by unforeseen natural roadblocks or strikes',
                          ].map((exc, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <X className="w-4 h-4 text-rose-600 shrink-0 mt-0.5 stroke-[3]" />
                              <span>{exc}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                )}

                {/* ── TAB 3: FLEET CHOICES ── */}
                {activeTab === 'fleet' && (
                  <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
                    <div>
                      <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                        Select Your Preferred Fleet
                      </h2>
                      <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1">
                        Choose the right vehicle matching your group size and comfort preference.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {vehicleOptions.map((v) => {
                        const isSelected = selectedVehicle === v.name;
                        const vPrice = Math.round(packageData.price * v.rateMultiplier);

                        return (
                          <div
                            key={v.name}
                            onClick={() => setSelectedVehicle(v.name)}
                            className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between ${
                              isSelected
                                ? 'border-[#006837] bg-emerald-50/40 shadow-md ring-2 ring-[#006837]/20'
                                : 'border-slate-200 bg-white hover:border-slate-300'
                            }`}
                          >
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                                {v.type}
                              </span>
                              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                                isSelected ? 'bg-[#006837] text-white' : 'bg-slate-100 text-slate-600'
                              }`}>
                                {v.badge}
                              </span>
                            </div>

                            <div className="h-32 w-full my-2 rounded-xl overflow-hidden bg-slate-100 border border-slate-200">
                              <img src={v.img} alt={v.name} className="w-full h-full object-cover" />
                            </div>

                            <h3 className="text-base font-black text-slate-900 mb-1">{v.name}</h3>
                            <p className="text-xs text-slate-500 mb-3">{v.desc}</p>

                            <div className="pt-2 border-t border-slate-200 flex items-center justify-between">
                              <div>
                                <span className="text-[10px] uppercase font-bold text-slate-400 block">Package Price</span>
                                <span className="text-base font-black text-[#006837]">
                                  ₹{vPrice.toLocaleString('en-IN')}{' '}
                                  <span className="text-[10px] font-semibold text-slate-500">/ person</span>
                                </span>
                              </div>
                              <button
                                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                                  isSelected
                                    ? 'bg-[#006837] text-white'
                                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                                }`}
                              >
                                {isSelected ? '✓ Selected' : 'Select'}
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* ── TAB 4: GUIDELINES & ODISHA TIPS ── */}
                {activeTab === 'guidelines' && (
                  <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
                    <div>
                      <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                        Essential Odisha Travel Guidelines
                      </h2>
                      <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1">
                        Important temple etiquette, dressing guidelines, and safety practices for visitors.
                      </p>
                    </div>

                    {[
                      {
                        q: 'Dress Code for Puri Shri Jagannath Temple & Lingaraj Temple',
                        a: 'Traditional Indian clothing is strictly recommended (Dhoti/Kurta for men; Saree or Salwar Kameez for women). Non-Hindus are not permitted inside the inner sanctum of Lord Jagannath Temple, but can view the majestic architecture from Raghunandan Library rooftop.'
                      },
                      {
                        q: 'Restricted Items Inside Heritage Shrines',
                        a: 'Mobile phones, smartwatches, leather belts, wallets, cameras, and shoe wear are strictly barred inside the main temple premises. Safe deposit cloakrooms are available at Lion Gate (Singhadwara).'
                      },
                      {
                        q: 'Chilika Lake Dolphin Boating Timings & Safety',
                        a: 'The best time to spot Irrawaddy dolphins at Satapada is early morning (7:00 AM – 10:30 AM). Life jackets are mandatory on all motorized boats. Our chauffeurs take you directly to the official OTDC ticket counter to avoid private middleman fees.'
                      },
                      {
                        q: 'Can We Modify or Extend the Circuit During the Trip?',
                        a: 'Yes, 100%! All Shibani Travels packages are flexible. You can request extra halts (like Alarnath temple, Pipili applique village, or Raghurajpur heritage crafts) with transparent per-km billing.'
                      }
                    ].map((item, idx) => (
                      <div key={idx} className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
                        <h4 className="text-sm font-bold text-slate-900 mb-1 flex items-start gap-2">
                          <HelpCircle className="w-4 h-4 text-[#006837] shrink-0 mt-0.5" />
                          <span>{item.q}</span>
                        </h4>
                        <p className="text-xs sm:text-sm text-slate-600 pl-6 leading-relaxed font-medium">
                          {item.a}
                        </p>
                      </div>
                    ))}
                  </div>
                )}

              </div>

              {/* ═══ RIGHT COLUMN: STICKY BOOKING CARD & PRICING SUMMARY ═══ */}
              <div className="space-y-6">
                <div className="bg-white rounded-3xl p-6 border-2 border-[#006837]/30 shadow-xl sticky top-20">
                  <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                    <div>
                      <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block">
                        Calculated Package Price
                      </span>
                      <div className="flex items-baseline gap-1 mt-0.5">
                        <span className="text-3xl font-black text-[#006837]">
                          ₹{calculatedPrice.toLocaleString('en-IN')}
                        </span>
                        <span className="text-xs font-semibold text-slate-500">/ person</span>
                      </div>
                    </div>
                    <span className="text-[10px] font-black px-2.5 py-1 rounded-full bg-emerald-100 text-[#006837]">
                      All-Inclusive
                    </span>
                  </div>

                  {/* Summary items */}
                  <div className="py-4 space-y-2.5 border-b border-slate-100 text-xs font-medium text-slate-600">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">Duration:</span>
                      <span className="font-bold text-slate-800">{packageData.duration}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">Selected Vehicle:</span>
                      <span className="font-bold text-[#006837]">{selectedVehicle}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">Hotel Category:</span>
                      <span className="font-bold text-slate-800">3★ / 4★ Heritage Stay</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">Pickup & Drop:</span>
                      <span className="font-bold text-slate-800">Bhubaneswar / Puri</span>
                    </div>
                  </div>

                  {/* Trust guarantees */}
                  <div className="py-3 space-y-1.5 text-[11px] text-slate-500 font-semibold">
                    <div className="flex items-center gap-1.5 text-emerald-700">
                      <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
                      <span>100% Guaranteed Departure</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-emerald-700">
                      <Check className="w-3.5 h-3.5 shrink-0" />
                      <span>Zero Hidden Toll or Fuel Charges</span>
                    </div>
                  </div>

                  {/* Primary CTA Button */}
                  <button
                    onClick={() => {
                      onClose();
                      onBookNow(packageData, selectedVehicle);
                    }}
                    className="w-full mt-2 py-3.5 px-6 rounded-2xl text-sm font-black uppercase tracking-wider text-white bg-gradient-to-r from-[#006837] to-[#008746] hover:from-[#004D26] hover:to-[#006837] shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Proceed to Book</span>
                    <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                  </button>

                  {/* WhatsApp Direct */}
                  <a
                    href={`https://wa.me/919861117168?text=${whatsappText}`}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full mt-2.5 py-3 px-4 rounded-2xl text-xs font-bold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 transition-colors flex items-center justify-center gap-2"
                  >
                    <MessageSquare className="w-4 h-4 text-emerald-600" />
                    <span>Chat with Tour Expert on WhatsApp</span>
                  </a>

                  {/* Direct Call */}
                  <a
                    href="tel:+919861117168"
                    className="w-full mt-2 py-2.5 px-4 rounded-xl text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors flex items-center justify-center gap-1.5 text-center"
                  >
                    <Phone className="w-3.5 h-3.5 text-[#006837]" />
                    <span>24/7 Helpline: <strong>+91 98611 17168</strong></span>
                  </a>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </AnimatePresence>
  );
}

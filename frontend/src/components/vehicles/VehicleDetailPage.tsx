import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import {
  Users, Briefcase, Gauge, ShieldCheck, CheckCircle2, Star,
  Phone, MessageSquare, ArrowLeft, Fuel, Wifi, Music, Zap,
  MapPin, Clock, ChevronRight, Award, BadgeCheck, Sparkles,
  RefreshCw, Calendar, Car, Check
} from 'lucide-react';
import { Vehicle } from '../../types';

interface VehicleDetailPageProps {
  onBook: (vehicle: Vehicle) => void;
  onBack: () => void;
}

const ODISHA_ROUTES = [
  { from: 'Bhubaneswar', to: 'Puri (Jagannath Temple)', km: 65, hrs: '1.5' },
  { from: 'Bhubaneswar', to: 'Konark Sun Temple', km: 80, hrs: '2.0' },
  { from: 'Bhubaneswar', to: 'Chilika Lake (Satapada)', km: 110, hrs: '2.5' },
  { from: 'Bhubaneswar', to: 'Cuttack Silver City', km: 30, hrs: '0.75' },
  { from: 'Bhubaneswar', to: 'Gopalpur on Sea', km: 170, hrs: '4.0' },
  { from: 'Bhubaneswar', to: 'Daringbadi (Kashmir of Odisha)', km: 230, hrs: '5.5' },
];

const SPEC_ICONS: Record<string, React.ReactNode> = {
  ac: <Fuel className="w-4 h-4" />,
  musicSystem: <Music className="w-4 h-4" />,
  chargingPort: <Zap className="w-4 h-4" />,
  pushbackSeats: <RefreshCw className="w-4 h-4" />,
  airbags: <ShieldCheck className="w-4 h-4" />,
  gps: <Wifi className="w-4 h-4" />,
};

const SPEC_LABELS: Record<string, string> = {
  ac: 'Air Conditioning',
  musicSystem: 'Premium Audio',
  chargingPort: 'USB Charging',
  pushbackSeats: 'Pushback Seats',
  airbags: 'Airbag Safety',
  gps: 'Live GPS Tracking',
};

export default function VehicleDetailPage({ onBook, onBack }: VehicleDetailPageProps) {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [vehicle, setVehicle] = useState<Vehicle | null>(null);
  const [related, setRelated] = useState<Vehicle[]>([]);
  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [reviewForm, setReviewForm] = useState({ name: '', rating: 5, comment: '' });
  const [reviewSubmitting, setReviewSubmitting] = useState(false);
  const [reviewSuccess, setReviewSuccess] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'specs' | 'routes'>('overview');
  const [activeImage, setActiveImage] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setActiveImage(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    Promise.all([
      fetch(`/api/vehicles/${id}`).then((r) => (r.ok ? r.json() : null)),
      fetch('/api/vehicles').then((r) => (r.ok ? r.json() : [])),
      fetch('/api/reviews').then((r) => (r.ok ? r.json() : [])),
    ])
      .then(([v, all, revs]) => {
        const vehicleList = Array.isArray(all) ? all : [];
        let resolvedVehicle = v && !v.error && v.id ? v : null;

        // If not directly found by id, try fallback search from vehicleList
        if (!resolvedVehicle && vehicleList.length > 0) {
          resolvedVehicle =
            vehicleList.find((x: any) => x.id === id || x.id.includes(id || '') || (id && id.includes(x.id))) ||
            vehicleList[0];
        }

        setVehicle(resolvedVehicle);
        if (resolvedVehicle && vehicleList.length > 0) {
          setRelated(vehicleList.filter((x: any) => x.id !== resolvedVehicle.id && x.category === resolvedVehicle.category).slice(0, 3));
        } else {
          setRelated([]);
        }
        if (Array.isArray(revs)) {
          setReviews(revs.filter((r: any) => r.vehicleId === id || r.vehicleId === resolvedVehicle?.id));
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewForm.name || !reviewForm.comment) return;
    setReviewSubmitting(true);
    try {
      await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          vehicleId: id,
          customerName: reviewForm.name,
          rating: reviewForm.rating,
          comment: reviewForm.comment,
        }),
      });
      setReviewSuccess(true);
      setReviewForm({ name: '', rating: 5, comment: '' });
      const revs = await fetch('/api/reviews').then((r) => r.json());
      setReviews((revs as any[]).filter((r) => r.vehicleId === id));
    } catch (_) {}
    setReviewSubmitting(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FAF8F5] pt-24">
        <div className="text-center p-8 bg-white rounded-3xl shadow-xl border border-slate-200">
          <div className="w-16 h-16 border-4 border-[#006837] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-slate-800 text-sm font-bold uppercase tracking-widest">Loading Vehicle Details...</p>
        </div>
      </div>
    );
  }

  if (!vehicle) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 px-4 bg-[#FAF8F5] pt-24">
        <div className="p-8 bg-white rounded-3xl shadow-xl border border-slate-200 text-center max-w-md">
          <Car className="w-16 h-16 text-slate-300 mx-auto mb-3" />
          <h2 className="text-slate-900 text-2xl font-black mb-2">Vehicle Not Found</h2>
          <p className="text-slate-600 text-sm mb-6">The vehicle you requested could not be loaded or may have been updated.</p>
          <button
            onClick={onBack}
            className="px-6 py-3 bg-[#006837] text-white font-bold rounded-xl text-sm shadow-md hover:bg-[#00522c] transition-colors cursor-pointer"
          >
            Back to All Vehicles
          </button>
        </div>
      </div>
    );
  }

  const avgRating = reviews.length > 0 ? (reviews.reduce((a, r) => a + r.rating, 0) / reviews.length).toFixed(1) : '5.0';

  return (
    <div className="min-h-screen text-slate-800 bg-[#FAF8F5] pt-[124px] sm:pt-[132px]">
      
      {/* ══ HEADER HERO SHOWCASE (Clean Light Warm Theme) ══ */}
      <div className="relative overflow-hidden border-b border-slate-200/80 bg-gradient-to-b from-emerald-50/60 via-amber-50/30 to-[#FAF8F5]">
        
        {/* Soft Background Accent Circles */}
        <div className="absolute top-0 right-10 w-96 h-96 rounded-full bg-emerald-200/25 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-80 h-80 rounded-full bg-amber-200/30 blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-8 relative z-10">
          
          {/* Top Row: Breadcrumbs & Back Button */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-3">
              <button
                onClick={onBack}
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider bg-white border border-slate-300 text-slate-800 hover:bg-[#006837] hover:text-white hover:border-[#006837] transition-all cursor-pointer shadow-sm"
              >
                <ArrowLeft className="w-4 h-4" /> Back to Fleet
              </button>
              <span className="w-px h-5 bg-slate-300 hidden sm:block" />
              
              <div className="hidden sm:flex items-center gap-2 text-xs font-semibold text-slate-600">
                <button onClick={() => navigate('/home')} className="hover:text-[#006837] transition-colors">
                  Home
                </button>
                <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                <button onClick={onBack} className="hover:text-[#006837] transition-colors">
                  Our Fleet
                </button>
                <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                <span className="text-[#006837] font-bold">{vehicle.name}</span>
              </div>
            </div>

            {/* Category Pill */}
            <div className="px-3.5 py-1.5 rounded-xl text-xs font-black uppercase tracking-wider bg-emerald-100/80 border border-emerald-300 text-[#006837] shadow-xs flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#006837]" />
              <span>{vehicle.category}</span>
            </div>
          </div>

          {/* Center Showcase: Title, Image, and Main Highlights */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center py-4">
            
            {/* Left: Vehicle Title, Rating, Description */}
            <div className="lg:col-span-6 space-y-4">
              <div className="flex items-center gap-2.5 flex-wrap">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider border shadow-xs ${
                    vehicle.availability === 'Available'
                      ? 'bg-emerald-50 border-emerald-300 text-[#006837]'
                      : 'bg-amber-50 border-amber-300 text-amber-800'
                  }`}
                >
                  ● {vehicle.availability}
                </span>

                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-300 text-amber-900 shadow-xs">
                  <Star className="w-3.5 h-3.5 text-amber-500 fill-current" />
                  <span className="text-xs font-black">{avgRating}</span>
                  <span className="text-slate-500 text-[11px] font-medium">({reviews.length} reviews)</span>
                </div>
              </div>

              <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
                {vehicle.name}
              </h1>

              <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-medium">
                {(vehicle as any).description ||
                  `Experience ultimate comfort with our flagship ${vehicle.name}. Clean, GPS tracked, air-conditioned cabin, and professional uniformed Chauffeur service across Odisha.`}
              </p>

              {/* Price Callout Card */}
              <div className="p-4 sm:p-5 rounded-2xl bg-white border-2 border-emerald-600/25 shadow-md flex items-baseline justify-between max-w-md">
                <div>
                  <span className="text-[10.5px] uppercase tracking-wider font-black text-slate-500 block mb-0.5">
                    STARTING OUTSTATION FARE
                  </span>
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl sm:text-4xl font-black text-[#006837]">
                      ₹{vehicle.pricePerKm}
                    </span>
                    <span className="text-slate-600 text-sm font-bold">/km</span>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-[10.5px] uppercase tracking-wider font-black text-slate-500 block mb-0.5">
                    FULL DAY RENTAL
                  </span>
                  <span className="text-2xl sm:text-3xl font-black text-slate-900">
                    ₹{(vehicle?.pricePerDay ?? 0).toLocaleString('en-IN')}
                  </span>
                </div>
              </div>
            </div>

            {/* Right: Full Vehicle Photo Showcase & Real Fleet Gallery */}
            <div className="lg:col-span-6 flex flex-col items-center justify-center">
              <div className="relative w-full max-w-lg h-72 sm:h-80 md:h-[340px] rounded-3xl overflow-hidden shadow-xl border border-slate-200/80 bg-white flex items-center justify-center">
                <img
                  src={activeImage || vehicle.image}
                  alt={vehicle.name}
                  className="w-full h-full object-cover transition-transform hover:scale-105 duration-500"
                  referrerPolicy="no-referrer"
                />

                {vehicle.isRealFleet && (
                  <div className="absolute top-3 left-3 bg-[#006837] text-white px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-wider shadow-lg flex items-center gap-1.5 border border-white/20">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-300" />
                    <span>Real Fleet Photo</span>
                    {vehicle.plateNumber && (
                      <span className="bg-white/20 px-1.5 py-0.5 rounded text-[10px] font-mono">
                        {vehicle.plateNumber}
                      </span>
                    )}
                  </div>
                )}
              </div>

              {/* Gallery Thumbnails */}
              {vehicle.gallery && vehicle.gallery.length > 1 && (
                <div className="flex items-center gap-2 mt-3 overflow-x-auto max-w-full pb-1 px-1">
                  {vehicle.gallery.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImage(img)}
                      className={`w-14 h-12 rounded-xl overflow-hidden border-2 transition-all shrink-0 cursor-pointer ${
                        (activeImage || vehicle.image) === img
                          ? 'border-[#006837] ring-2 ring-emerald-300 scale-105'
                          : 'border-slate-200 opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt={`${vehicle.name} ${idx + 1}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

          </div>

          {/* Bottom 4 Key Specs Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mt-6">
            {[
              { icon: <Users className="w-5 h-5 text-[#006837]" />, val: `${vehicle.capacity} Passengers`, sub: 'Seating Capacity' },
              { icon: <Briefcase className="w-5 h-5 text-[#006837]" />, val: `${vehicle.luggage} Bags`, sub: 'Luggage Storage' },
              { icon: <Gauge className="w-5 h-5 text-[#006837]" />, val: vehicle.mileage || '16 km/l', sub: 'Fuel Efficiency' },
              { icon: <ShieldCheck className="w-5 h-5 text-[#006837]" />, val: vehicle.specifications?.airbags ? 'High Safety' : 'Standard', sub: 'Airbags & GPS' },
            ].map((spec, idx) => (
              <div
                key={idx}
                className="flex items-center gap-3.5 p-3.5 sm:p-4 rounded-2xl bg-white border border-slate-200 shadow-sm"
              >
                <div className="w-11 h-11 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center shrink-0">
                  {spec.icon}
                </div>
                <div>
                  <div className="text-slate-900 font-black text-xs sm:text-sm">{spec.val}</div>
                  <div className="text-slate-500 text-[10px] uppercase tracking-wider font-bold mt-0.5">{spec.sub}</div>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>

      {/* ══ MAIN BODY DETAILS & BOOKING SIDEBAR ══ */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          {/* LEFT 2 COLS: TABS & DETAILS */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Tabs Header */}
            <div className="flex gap-2 p-1.5 rounded-2xl bg-slate-200/70 border border-slate-200">
              {(['overview', 'specs', 'routes'] as const).map((tab) => {
                const isActive = activeTab === tab;
                const labels = {
                  overview: 'Overview & Features',
                  specs: 'Technical Specs',
                  routes: 'Popular Odisha Routes',
                };
                return (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`flex-1 py-3 rounded-xl text-xs sm:text-sm font-black uppercase tracking-wider transition-all cursor-pointer ${
                      isActive
                        ? 'bg-[#006837] text-white shadow-md'
                        : 'text-slate-700 hover:text-[#006837] hover:bg-white/60'
                    }`}
                  >
                    {labels[tab]}
                  </button>
                );
              })}
            </div>

            {/* Tab Contents */}
            <AnimatePresence mode="wait">
              
              {/* TAB 1: OVERVIEW */}
              {activeTab === 'overview' && (
                <motion.div
                  key="overview"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="space-y-6"
                >
                  <div className="rounded-3xl p-6 sm:p-7 bg-white border border-slate-200 shadow-sm space-y-4">
                    <h3 className="text-sm font-black uppercase tracking-widest text-[#006837] flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-[#FF7A00]" /> Vehicle Features & Comfort
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      {vehicle.features.map((feature, i) => (
                        <div key={i} className="flex items-center gap-2.5 text-sm font-bold text-slate-800">
                          <CheckCircle2 className="w-4 h-4 text-[#006837] shrink-0" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                    <p className="text-slate-600 text-sm leading-relaxed pt-4 border-t border-slate-100 font-medium">
                      The {vehicle.name} is meticulously maintained under ISO-9001 quality guidelines. Ideal for Odisha temple circuits, airport transfers, VIP corporate delegations, and family vacations. Driven by verified chauffeurs with live GPS tracking and 100% transparent pricing.
                    </p>
                  </div>

                  {/* Trust Badges Strip */}
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { icon: <BadgeCheck className="w-5 h-5 text-[#006837]" />, label: 'Verified Chauffeur', sub: 'Police Checked' },
                      { icon: <Award className="w-5 h-5 text-[#FF7A00]" />, label: '28+ Years Trust', sub: 'Since 1998' },
                      { icon: <Clock className="w-5 h-5 text-[#0284C7]" />, label: '24/7 Helpline', sub: '+91 9861117168' },
                    ].map((badge) => (
                      <div key={badge.label} className="rounded-2xl p-4 text-center bg-white border border-slate-200 shadow-sm">
                        <div className="flex justify-center mb-1.5">{badge.icon}</div>
                        <div className="text-slate-900 text-xs sm:text-sm font-black">{badge.label}</div>
                        <div className="text-slate-500 text-[10px] font-bold mt-0.5">{badge.sub}</div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* TAB 2: TECHNICAL SPECS */}
              {activeTab === 'specs' && (
                <motion.div
                  key="specs"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                >
                  <div className="rounded-3xl p-6 sm:p-7 bg-white border border-slate-200 shadow-sm space-y-3">
                    <h3 className="text-sm font-black uppercase tracking-widest text-[#006837] mb-4">
                      Technical & Safety Specifications
                    </h3>
                    {Object.entries(vehicle.specifications || {}).map(([key, val]) => (
                      <div key={key} className="flex items-center justify-between py-3.5 border-b border-slate-100 last:border-0">
                        <div className="flex items-center gap-3 text-slate-800">
                          <span className="text-[#006837]">{SPEC_ICONS[key] || <Check className="w-4 h-4" />}</span>
                          <span className="text-sm font-bold">{SPEC_LABELS[key] || key}</span>
                        </div>
                        <span
                          className={`text-xs font-black px-3 py-1 rounded-full ${
                            val
                              ? 'bg-emerald-100 text-[#006837] border border-emerald-300'
                              : 'bg-slate-100 text-slate-500 border border-slate-200'
                          }`}
                        >
                          {val ? '✓ Included' : '✗ Not Available'}
                        </span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* TAB 3: POPULAR ROUTES */}
              {activeTab === 'routes' && (
                <motion.div
                  key="routes"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                >
                  <div className="rounded-3xl p-6 sm:p-7 bg-white border border-slate-200 shadow-sm space-y-3">
                    <h3 className="text-sm font-black uppercase tracking-widest text-[#006837] mb-4 flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-[#D32F2F]" /> Popular Odisha Route Fares
                    </h3>
                    {ODISHA_ROUTES.map((route, i) => {
                      const cost = Math.max(vehicle.pricePerDay, vehicle.pricePerKm * route.km * 2);
                      return (
                        <div
                          key={i}
                          className="flex items-center justify-between py-3.5 border-b border-slate-100 last:border-0 gap-4"
                        >
                          <div>
                            <p className="text-sm sm:text-base font-bold text-slate-900">
                              {route.from} → {route.to}
                            </p>
                            <p className="text-xs text-slate-500 mt-0.5 font-medium">
                              ⏱ Est. {route.hrs} hrs · {route.km * 2} km round trip
                            </p>
                          </div>
                          <div className="text-right shrink-0">
                            <p className="text-[#006837] font-black text-base sm:text-lg">
                              ₹{cost.toLocaleString('en-IN')}
                            </p>
                            <p className="text-slate-400 text-[10px] font-bold">estimated total</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </motion.div>
              )}

            </AnimatePresence>

            {/* CUSTOMER REVIEWS SECTION */}
            <div className="rounded-3xl p-6 sm:p-7 bg-white border border-slate-200 shadow-sm">
              <h3 className="text-sm font-black uppercase tracking-widest text-slate-900 flex items-center gap-2 mb-4">
                <Star className="w-4 h-4 text-amber-500 fill-current" /> Customer Verified Reviews
                <span className="text-slate-400 text-xs font-normal">({reviews.length})</span>
              </h3>

              {reviews.length === 0 ? (
                <p className="text-slate-500 text-sm text-center py-4 font-medium">
                  No reviews yet for this vehicle. Be the first to share your experience!
                </p>
              ) : (
                <div className="space-y-4 mb-6">
                  {reviews.slice(0, 4).map((rev, i) => (
                    <div key={i} className="border-b border-slate-100 pb-4 last:border-0">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-bold text-slate-900">{rev.customerName}</span>
                        <div className="flex gap-0.5">
                          {[1, 2, 3, 4, 5].map((s) => (
                            <Star
                              key={s}
                              className={`w-3.5 h-3.5 ${
                                s <= rev.rating ? 'text-amber-400 fill-current' : 'text-slate-200'
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">{rev.comment}</p>
                      <p className="text-slate-400 text-[10px] mt-1 font-mono">{rev.date}</p>
                    </div>
                  ))}
                </div>
              )}

              {/* Review Form */}
              {reviewSuccess ? (
                <div className="text-center py-3 text-[#006837] bg-green-50 rounded-xl text-sm font-bold border border-green-200">
                  ✓ Review submitted! Thank you for choosing Shibani Travels.
                </div>
              ) : (
                <form onSubmit={handleReviewSubmit} className="space-y-3 pt-4 border-t border-slate-100">
                  <p className="text-xs font-black text-slate-700 uppercase tracking-wider">Leave a Review</p>
                  <input
                    type="text"
                    placeholder="Your Full Name"
                    value={reviewForm.name}
                    onChange={(e) => setReviewForm((p) => ({ ...p, name: e.target.value }))}
                    required
                    className="w-full px-4 py-2.5 rounded-xl text-sm text-slate-900 border border-slate-300 bg-slate-50 focus:bg-white focus:outline-none focus:border-[#006837]"
                  />
                  <div className="flex items-center gap-2">
                    <span className="text-slate-600 text-xs font-bold">Rating:</span>
                    {[1, 2, 3, 4, 5].map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => setReviewForm((p) => ({ ...p, rating: s }))}
                      >
                        <Star
                          className={`w-5 h-5 cursor-pointer transition-colors ${
                            s <= reviewForm.rating ? 'text-amber-400 fill-current' : 'text-slate-300'
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                  <textarea
                    placeholder="Share your travel experience..."
                    value={reviewForm.comment}
                    onChange={(e) => setReviewForm((p) => ({ ...p, comment: e.target.value }))}
                    required
                    rows={3}
                    className="w-full px-4 py-2.5 rounded-xl text-sm text-slate-900 border border-slate-300 bg-slate-50 focus:bg-white focus:outline-none focus:border-[#006837] resize-none"
                  />
                  <button
                    type="submit"
                    disabled={reviewSubmitting}
                    className="w-full py-3 rounded-xl text-xs sm:text-sm font-black uppercase tracking-wider text-white bg-[#006837] hover:bg-[#00522c] transition-all cursor-pointer shadow-md"
                  >
                    {reviewSubmitting ? 'Submitting...' : 'Submit Review'}
                  </button>
                </form>
              )}
            </div>

            {/* Similar Vehicles Carousel */}
            {related.length > 0 && (
              <div>
                <h3 className="text-sm font-black uppercase tracking-widest text-slate-900 mb-4">
                  Similar Vehicles in this Category
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {related.map((v) => (
                    <div
                      key={v.id}
                      onClick={() => navigate(`/vehicle/${v.id}`)}
                      className="rounded-2xl overflow-hidden border border-slate-200 bg-white cursor-pointer hover:border-[#006837] hover:shadow-lg transition-all group p-3"
                    >
                      <div className="h-28 overflow-hidden rounded-xl bg-slate-50 flex items-center justify-center p-2 mb-2">
                        <img
                          src={v.image}
                          alt={v.name}
                          className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <div>
                        <p className="text-slate-900 text-xs font-bold line-clamp-1">{v.name}</p>
                        <p className="text-[#006837] text-xs font-black mt-0.5">₹{v.pricePerKm}/km</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

          {/* RIGHT 1 COL: STICKY BOOKING PANEL */}
          <div className="space-y-4 lg:sticky lg:top-24">
            
            <div className="rounded-3xl p-6 sm:p-7 bg-white border-2 border-emerald-600/30 shadow-xl relative overflow-hidden">
              <span className="text-[10px] font-black text-[#006837] bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full uppercase tracking-wider">
                Official Booking Card
              </span>

              <h2 className="text-2xl font-black text-slate-900 mt-3">{vehicle.name}</h2>
              <p className="text-slate-500 text-xs font-bold mt-1">
                {vehicle.category} · {vehicle.capacity} Passengers
              </p>

              <div className="my-5 space-y-3 border-y border-slate-100 py-4 text-xs font-semibold">
                <div className="flex justify-between items-center">
                  <span className="text-slate-600">Outstation rate / km</span>
                  <span className="text-[#006837] font-black text-sm">₹{vehicle.pricePerKm}/km</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-600">Full day flat rate</span>
                  <span className="text-slate-900 font-black text-base">₹{(vehicle?.pricePerDay ?? 0).toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-600">Chauffeur allowance</span>
                  <span className="text-[#006837] font-black bg-emerald-50 px-2 py-0.5 rounded-md">Included</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-600">Tolls &amp; Parking</span>
                  <span className="text-slate-700 font-bold">At Actuals / Direct</span>
                </div>
              </div>

              <div className="space-y-3">
                <button
                  onClick={() => onBook(vehicle)}
                  className="w-full py-4 rounded-2xl font-black text-xs sm:text-sm uppercase tracking-wider text-white shadow-lg hover:shadow-xl hover:scale-[1.01] transition-all cursor-pointer flex items-center justify-center gap-2"
                  style={{ background: 'linear-gradient(135deg, #006837 0%, #008746 100%)' }}
                >
                  <Phone className="w-4 h-4" />
                  <span>Book Now — Instant Confirm</span>
                </button>

                <a
                  href={`https://wa.me/919861117168?text=${encodeURIComponent(
                    `Hi Shibani Travels! I want to book: ${vehicle.name} (${vehicle.category}). Please share availability and best quote.`
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-3.5 rounded-2xl font-black text-xs sm:text-sm uppercase tracking-wider text-white flex items-center justify-center gap-2 hover:scale-[1.01] transition-all shadow-md bg-[#25D366] hover:bg-[#20BA5A]"
                >
                  <MessageSquare className="w-4 h-4 fill-current" />
                  <span>WhatsApp: +91 9861117168</span>
                </a>
              </div>

              <p className="text-center text-slate-400 text-[10.5px] font-semibold mt-4">
                ✓ Verified GPS Fleet · ✓ Free Cancellation · ✓ 24/7 Support
              </p>
            </div>

            {/* Quick Guarantees */}
            <div className="grid grid-cols-2 gap-3">
              {[
                { icon: <Calendar className="w-4 h-4 text-[#006837]" />, label: 'Fast Booking', sub: 'Confirm in 5 mins' },
                { icon: <MapPin className="w-4 h-4 text-[#D32F2F]" />, label: 'All 30 Districts', sub: 'Odisha & Beyond' },
                { icon: <Star className="w-4 h-4 text-amber-500" />, label: `${avgRating}★ Rated`, sub: `${reviews.length}+ Reviews` },
                { icon: <ChevronRight className="w-4 h-4 text-[#0284C7]" />, label: vehicle.availability, sub: 'Status Today' },
              ].map((pill) => (
                <div key={pill.label} className="rounded-2xl p-3.5 bg-white border border-slate-200 shadow-sm">
                  {pill.icon}
                  <p className="text-slate-900 text-xs font-bold mt-1.5">{pill.label}</p>
                  <p className="text-slate-500 text-[10px] font-medium">{pill.sub}</p>
                </div>
              ))}
            </div>

          </div>

        </div>
      </div>

    </div>
  );
}

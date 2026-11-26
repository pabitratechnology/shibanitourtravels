import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Vehicle } from '../types';
import { Shield, Sparkles, Users, Briefcase, Gauge, Star, CheckCircle2, SlidersHorizontal, Heart, RefreshCw, X, Plus, Check, MessageSquare, ChevronRight, Home } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import PageHero from './PageHero.js';

interface VehiclePageProps {
  onBookVehicle: (vehicle: Vehicle) => void;
  onSelectVehicle?: (vehicleId: string) => void;
}

export default function VehiclePage({ onBookVehicle, onSelectVehicle }: VehiclePageProps) {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedType, setSelectedType] = useState<string>('All');
  const [searchParams] = useSearchParams();
  const urlCategory = searchParams.get('category');
  const [selectedCategory, setSelectedCategory] = useState<string>(urlCategory || 'All');
  const [searchQuery, setSearchQuery] = useState('');
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [compareList, setCompareList] = useState<Vehicle[]>([]);
  const [showCompareModal, setShowCompareModal] = useState(false);

  useEffect(() => {
    if (urlCategory) {
      setSelectedCategory(urlCategory);
    }
  }, [urlCategory]);

  useEffect(() => {
    fetch('/api/vehicles')
      .then((res) => res.json())
      .then((data) => {
        setVehicles(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching vehicles:', err);
        setLoading(false);
      });
  }, []);

  const getVehicleType = (vehicle: Vehicle): 'Luxury' | 'SUV' | 'Budget' => {
    const cat = vehicle.category.toLowerCase();
    const price = vehicle.pricePerDay;
    
    if (cat.includes('luxury') || cat.includes('wedding') || price >= 6000) {
      return 'Luxury';
    }
    if (cat.includes('suv') || cat.includes('crysta') || cat.includes('hycross') || vehicle.name.toLowerCase().includes('fortuner')) {
      return 'SUV';
    }
    return 'Budget';
  };

  const categories = [
    'All',
    '✨ AI 3D Showcase (7)',
    '📸 Real Fleet Photos (27)',
    'Sedan',
    'SUV',
    'Innova Crysta',
    'Force Urbania',
    'Tempo Traveller',
    'Luxury Cars',
    'Luxury Bus',
  ];

  const filteredVehicles = vehicles
    .filter((v) => {
      const isReal = v.isRealFleet || v.image?.includes('/vehicles/real/');
      const matchesType = selectedType === 'All' || getVehicleType(v) === selectedType;
      const matchesCategory =
        selectedCategory === 'All'
          ? true
          : selectedCategory === '✨ AI 3D Showcase (7)'
          ? !isReal
          : selectedCategory.includes('Real Fleet Photos')
          ? isReal
          : v.category === selectedCategory;
      const matchesSearch =
        v.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        v.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        v.features.some((f) => f.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (v.plateNumber && v.plateNumber.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesType && matchesCategory && matchesSearch;
    });

  const toggleWishlist = (id: string) => {
    if (wishlist.includes(id)) {
      setWishlist(wishlist.filter((wId) => wId !== id));
    } else {
      setWishlist([...wishlist, id]);
    }
  };

  const handleCompare = (vehicle: Vehicle) => {
    if (compareList.find((v) => v.id === vehicle.id)) {
      setCompareList(compareList.filter((v) => v.id !== vehicle.id));
    } else {
      if (compareList.length >= 3) {
        alert('You can compare a maximum of 3 vehicles.');
        return;
      }
      setCompareList([...compareList, vehicle]);
    }
  };

  const handleSwapVehicle = (index: number, newVehicleId: string) => {
    const newVehicle = vehicles.find((v) => v.id === newVehicleId);
    if (!newVehicle) return;
    const newList = [...compareList];
    newList[index] = newVehicle;
    setCompareList(newList);
  };

  const handleAddVehicleDirectly = (newVehicleId: string) => {
    const newVehicle = vehicles.find((v) => v.id === newVehicleId);
    if (!newVehicle) return;
    if (compareList.length >= 3) return;
    setCompareList([...compareList, newVehicle]);
  };

  const handleRemoveFromCompare = (id: string) => {
    setCompareList(compareList.filter((v) => v.id !== id));
  };

  return (
    <div className="bg-[#FAF8F5] min-h-screen text-slate-800">
      
      {/* ══ FULL SCREEN ADVANCED 3D FLEET HERO SHOWCASE ══ */}
      <div className="relative min-h-[75vh] lg:min-h-[80vh] flex flex-col justify-between pt-[124px] sm:pt-[132px] pb-10 overflow-hidden text-white bg-[#004D26]">
        
        {/* Cinematic Background Layer */}
        <div className="absolute inset-0 z-0">
          <img
            src="/banners/hero_travel_fleet_panoramic.jpg"
            alt="Shibani Travels Premium Fleet"
            className="w-full h-full object-cover"
            style={{ filter: 'brightness(0.75) saturate(1.1)' }}
          />
          <div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(135deg, rgba(0, 77, 38, 0.88) 0%, rgba(0, 104, 55, 0.72) 55%, rgba(180, 50, 15, 0.75) 100%)',
            }}
          />
          {/* Soft 3D radial light halos */}
          <div
            className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[550px] rounded-full pointer-events-none opacity-60"
            style={{
              background: 'radial-gradient(circle, rgba(45,106,79,0.4) 0%, rgba(226,88,34,0.15) 50%, transparent 70%)',
              filter: 'blur(100px)',
            }}
          />
          {/* Pattern grid matrix overlay */}
          <div
            className="absolute inset-0 opacity-15 pointer-events-none"
            style={{
              backgroundImage: 'radial-gradient(rgba(255,255,255,0.3) 1px, transparent 1px)',
              backgroundSize: '36px 36px',
            }}
          />
          {/* Bottom saffron gradient line */}
          <div
            className="absolute bottom-0 left-0 right-0 h-[3px]"
            style={{
              background: 'linear-gradient(to right, transparent, #E25822 30%, #E8C97A 50%, #E25822 70%, transparent)',
            }}
          />
        </div>

        {/* Content Container */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10 w-full flex-1 flex flex-col justify-center py-6">
          
          {/* Top Row: Breadcrumb & Tag */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            {/* Breadcrumb Trail */}
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-300 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/15 shadow-lg">
              <button onClick={() => window.location.href = '/'} className="flex items-center gap-1.5 hover:text-amber-400 transition-colors">
                <Home className="w-3.5 h-3.5 text-[#52B788]" /> Home
              </button>
              <ChevronRight className="w-3.5 h-3.5 text-white/40" />
              <span className="text-amber-400 font-bold">Our Premium Fleet</span>
            </div>

            {/* Trust Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest text-[#E8C97A] bg-amber-400/10 backdrop-blur-md border border-amber-400/30 shadow-lg">
              <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
              Odisha's Largest 80+ GPS Fleet
            </div>
          </div>

          {/* Center Hero Heading & Headline */}
          <div className="text-center max-w-4xl mx-auto my-auto">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight mb-4 drop-shadow-xl"
            >
              Odisha's Most Versatile &{' '}
              <span className="bg-gradient-to-r from-white via-amber-200 to-amber-400 bg-clip-text text-transparent italic">
                Premium Fleet
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed mb-8 font-medium"
            >
              Explore 80+ GPS-tracked executive sedans, VVIP SUVs, Force Urbania luxury vans, and pneumatic air-suspension coaches tailored for weddings, corporate summits, and regional pilgrimages.
            </motion.p>

            {/* 5 Circular 3D Category Nodes */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 max-w-4xl mx-auto mb-8">
              {[
                { label: 'Hatchback & Sedan', icon: '🚗', cat: 'Sedan' },
                { label: 'SUVs & Crysta', icon: '🚙', cat: 'SUV' },
                { label: 'Force Urbania', icon: '🚐', cat: 'Force Urbania' },
                { label: 'VVIP Wedding', icon: '👑', cat: 'Luxury Cars' },
                { label: 'Luxury Coaches', icon: '🚌', cat: 'Luxury Bus' },
              ].map((node, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedCategory(node.cat === selectedCategory ? 'All' : node.cat)}
                  className={`p-3 rounded-2xl border transition-all duration-300 flex flex-col items-center justify-center gap-1.5 cursor-pointer backdrop-blur-md ${
                    selectedCategory === node.cat
                      ? 'bg-amber-400 text-slate-950 border-amber-300 shadow-[0_0_25px_rgba(245,158,11,0.5)] scale-105 font-bold'
                      : 'bg-white/10 text-white border-white/15 hover:bg-white/20 hover:scale-105'
                  }`}
                >
                  <span className="text-2xl">{node.icon}</span>
                  <span className="text-[11px] font-extrabold tracking-tight text-center leading-tight">{node.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Bottom Floating Search & Filter Bar */}
          <div className="mt-auto pt-4">
            <div className="p-4 rounded-3xl bg-black/50 border border-white/15 backdrop-blur-xl shadow-2xl flex flex-col md:flex-row items-center justify-between gap-4">
              
              {/* Real-Time Search Bar */}
              <div className="relative w-full md:max-w-md">
                <span className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                  <SlidersHorizontal className="w-4.5 h-4.5 text-amber-400" />
                </span>
                <input
                  type="text"
                  placeholder="Search Dzire, Innova, Fortuner, Urbania, Volvo..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 rounded-2xl bg-white/10 border border-white/15 text-white placeholder-slate-400 text-xs font-semibold focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-all"
                />
              </div>

              {/* Action Controls & Compare */}
              <div className="flex items-center gap-3 w-full md:w-auto justify-end">
                <button
                  onClick={() => setShowCompareModal(true)}
                  className="flex-1 md:flex-none px-5 py-3 rounded-2xl text-xs font-black uppercase tracking-wider text-slate-950 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer"
                >
                  <RefreshCw className={`w-4 h-4 ${compareList.length > 0 ? 'animate-spin' : ''}`} />
                  <span>
                    {compareList.length > 0 
                      ? `Compare (${compareList.length}/3)` 
                      : 'Compare Vehicles'}
                  </span>
                </button>

                {compareList.length > 0 && (
                  <button
                    onClick={() => setCompareList([])}
                    className="px-3.5 py-3 rounded-2xl text-xs font-bold bg-rose-500/20 border border-rose-500/40 text-rose-300 hover:bg-rose-500/30 transition-all"
                  >
                    Clear
                  </button>
                )}
              </div>

            </div>
          </div>

        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-16 relative z-10">

        {/* Filters and Controls */}
        <div className="mb-12 flex flex-col gap-6">
          
          {/* Search bar & Compare activator */}
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative w-full md:max-w-md">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <SlidersHorizontal className="w-4 h-4 text-slate-400" />
              </span>
              <input
                type="text"
                placeholder="Search by vehicle name, category, features..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="input-field pl-10 w-full"
              />
            </div>

            {/* Compare Bar Status */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowCompareModal(true)}
                className="btn-navy px-5 py-3 text-xs flex items-center gap-2"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${compareList.length > 0 ? 'animate-spin-slow' : ''}`} />
                <span>
                  {compareList.length > 0 
                    ? `Compare (${compareList.length}/3 Selected)` 
                    : 'Compare Fleet Side-by-Side'}
                </span>
              </button>
              {compareList.length > 0 && (
                <button
                  onClick={() => setCompareList([])}
                  className="text-red-500 hover:text-red-700 text-xs font-bold underline transition-colors"
                >
                  Clear Selection
                </button>
              )}
            </div>
          </div>

          {/* High-Level Vehicle Type Selector */}
          <div className="flex flex-col gap-2 pt-4 border-t border-slate-200">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest text-left md:text-center block">
              Filter by Fleet Tier
            </span>
            <div className="flex justify-start md:justify-center gap-2 p-1 bg-white border border-slate-200 rounded-xl w-full md:max-w-md mx-auto shadow-sm">
              {['All', 'Luxury', 'SUV', 'Budget'].map((type) => {
                const count = vehicles.filter(v => type === 'All' || getVehicleType(v) === type).length;
                return (
                  <button
                    key={type}
                    id={`filter-type-${type.toLowerCase()}`}
                    onClick={() => {
                      setSelectedType(type);
                      setSelectedCategory('All'); 
                    }}
                    className={`flex-1 py-2 rounded-lg text-xs font-black uppercase tracking-wider transition-all flex flex-col items-center justify-center gap-0.5 ${
                      selectedType === type
                        ? 'bg-[#f95a00] text-white'
                        : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50'
                    }`}
                  >
                    <span>{type}</span>
                    <span className={`text-[8px] font-bold ${selectedType === type ? 'text-white/80' : 'text-slate-400'}`}>
                      {count} Units
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Categories Pill Grid */}
          <div className="flex flex-wrap gap-2 overflow-x-auto pb-2 justify-start md:justify-center">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-lg text-xs font-bold tracking-wider whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? 'bg-[#0f2249] text-white shadow-sm'
                    : 'bg-white text-slate-600 border border-slate-200 hover:border-slate-350 hover:bg-slate-50'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Fleet Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-white border border-slate-200 rounded-xl h-[420px] animate-pulse shadow-sm" />
            ))}
          </div>
        ) : filteredVehicles.length === 0 ? (
          <div className="text-center py-20 bg-white border border-slate-200 rounded-xl shadow-sm">
            <p className="text-slate-400 text-sm">No premium vehicles found matching your selection.</p>
            <button
              onClick={() => { setSelectedType('All'); setSelectedCategory('All'); setSearchQuery(''); }}
              className="mt-4 text-xs font-bold text-[#f95a00] underline"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredVehicles.map((vehicle) => {
              const inWishlist = wishlist.includes(vehicle.id);
              const inCompare = compareList.some((v) => v.id === vehicle.id);
              return (
                <div
                  key={vehicle.id}
                  id={`vehicle-${vehicle.id}`}
                  className="group card overflow-hidden flex flex-col justify-between bg-white rounded-3xl border border-slate-100 shadow-md hover:shadow-2xl transition-all duration-300"
                >
                  {/* Card Image and badging — Shown 100% in full, never cropped */}
                  <div className="relative h-56 bg-gradient-to-b from-[#F8FAF9] to-slate-100/90 p-3 flex items-center justify-center overflow-hidden">
                    <img
                      src={vehicle.image}
                      alt={vehicle.name}
                      className={`max-h-full max-w-full w-auto h-auto transition-transform duration-500 group-hover:scale-105 select-none ${
                        vehicle.isRealFleet || vehicle.image?.includes('/vehicles/real/')
                          ? 'object-cover rounded-xl shadow-md max-h-[92%] w-full'
                          : 'object-contain drop-shadow-md'
                      }`}
                    />

                    {/* Category Label or Real Photo Badge */}
                    {vehicle.isRealFleet || vehicle.image?.includes('/vehicles/real/') ? (
                      <span className="absolute top-3 left-3 bg-emerald-600/95 text-white px-2.5 py-1 rounded-full text-[9px] font-black uppercase tracking-wider flex items-center gap-1 shadow-md border border-white/20 backdrop-blur-md z-10">
                        <span>📸 Real Fleet</span>
                        {vehicle.plateNumber && <span className="opacity-90">• {vehicle.plateNumber}</span>}
                      </span>
                    ) : (
                      <span className="absolute top-3 left-3 bg-[#004D26] text-white px-2.5 py-1 rounded text-[9px] font-bold uppercase tracking-wider">
                        {vehicle.category}
                      </span>
                    )}

                    {/* Status Badge */}
                    <span className={`absolute top-3 right-3 px-2 py-1 rounded text-[9px] font-black uppercase z-10 ${
                      vehicle.availability === 'Available' 
                        ? 'bg-[#006837] text-white shadow-sm'
                        : 'bg-slate-500 text-white shadow-sm'
                    }`}>
                      {vehicle.availability}
                    </span>

                    {/* Action Layer Over Image */}
                    <div className="absolute bottom-3 right-3 flex gap-2">
                      <button
                        onClick={() => toggleWishlist(vehicle.id)}
                        className={`p-2 rounded-lg backdrop-blur-md border transition-all ${
                          inWishlist 
                            ? 'bg-[#D32F2F] text-white border-[#D32F2F]' 
                            : 'bg-white/90 text-slate-600 border-slate-200 hover:bg-white'
                        }`}
                        title="Add to Favourites"
                      >
                        <Heart className={`w-4 h-4 ${inWishlist ? 'fill-current' : ''}`} />
                      </button>
                      <button
                        onClick={() => handleCompare(vehicle)}
                        className={`p-2 rounded-lg backdrop-blur-md border transition-all ${
                          inCompare
                            ? 'bg-[#006837] text-white border-[#006837]'
                            : 'bg-white/90 text-slate-600 border-slate-200 hover:bg-white'
                        }`}
                        title="Compare Specifications"
                      >
                        <RefreshCw className={`w-4 h-4 ${inCompare ? 'animate-spin-slow' : ''}`} />
                      </button>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 
                        onClick={() => onSelectVehicle && onSelectVehicle(vehicle.id)}
                        className={`text-lg font-black text-slate-900 tracking-wide mb-2 transition-colors ${onSelectVehicle ? 'cursor-pointer hover:text-[#f95a00]' : ''}`}
                      >
                        {vehicle.name}
                      </h3>

                      {/* Pricing Info */}
                      <div className="flex items-baseline gap-4 mb-4 pb-4 border-b border-slate-100">
                        <div>
                          <p className="text-[9px] uppercase tracking-wider font-bold text-slate-400">OUTSTATION FARE</p>
                          <p className="text-[17px] font-black text-slate-800">
                            ₹{vehicle.pricePerKm}<span className="text-xs font-normal text-slate-500"> / km</span>
                          </p>
                        </div>
                        <div className="border-l border-slate-100 pl-4">
                          <p className="text-[9px] uppercase tracking-wider font-bold text-slate-400">DAILY RENTAL</p>
                          <p className="text-[17px] font-black text-[#f95a00]">
                            ₹{vehicle.pricePerDay.toLocaleString()}<span className="text-xs font-normal text-slate-500"> / day</span>
                          </p>
                        </div>
                      </div>

                      {/* Specs Pill Box */}
                      <div className="grid grid-cols-3 gap-2 mb-4">
                        <div className="bg-slate-50 border border-slate-100 p-2 rounded-lg text-center">
                          <Users className="w-3.5 h-3.5 text-[#0f2249] mx-auto mb-1" />
                          <span className="text-[10px] font-bold text-slate-800">{vehicle.capacity} Seats</span>
                        </div>
                        <div className="bg-slate-50 border border-slate-100 p-2 rounded-lg text-center">
                          <Briefcase className="w-3.5 h-3.5 text-[#0f2249] mx-auto mb-1" />
                          <span className="text-[10px] font-bold text-slate-800">{vehicle.luggage} Bags</span>
                        </div>
                        <div className="bg-slate-50 border border-slate-100 p-2 rounded-lg text-center">
                          <Gauge className="w-3.5 h-3.5 text-[#0f2249] mx-auto mb-1" />
                          <span className="text-[10px] font-bold text-slate-800">{vehicle.mileage}</span>
                        </div>
                      </div>

                      {/* Bullet Specifications list */}
                      <div className="space-y-1.5 mb-6 text-left">
                        {vehicle.features.slice(0, 3).map((feat, idx) => (
                          <div key={idx} className="flex items-center gap-2 text-xs text-slate-650">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                            <span>{feat}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Actions Row */}
                    <div className="flex flex-col gap-2 mt-2">
                      <div className="flex gap-2">
                        {onSelectVehicle && (
                          <button
                            onClick={() => onSelectVehicle(vehicle.id)}
                            className="btn-ghost flex-1 py-3 text-[10px]"
                          >
                            Full Specs
                          </button>
                        )}
                        <button
                          onClick={() => onBookVehicle(vehicle)}
                          className="btn-primary flex-1 py-3 text-[10px]"
                        >
                          Book Now
                        </button>
                      </div>

                      <a
                        href={`https://wa.me/919437100001?text=${encodeURIComponent(`Namaskar Shibani Travels! I am interested in booking your premium vehicle: ${vehicle.name}. Please share availability and details.`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full py-2.5 bg-emerald-50 hover:bg-emerald-600 text-emerald-600 hover:text-white border border-emerald-200 text-[10px] font-bold tracking-widest uppercase rounded-lg transition-all flex items-center justify-center gap-1.5"
                      >
                        <MessageSquare className="w-3.5 h-3.5" />
                        <span>WhatsApp Desk</span>
                      </a>
                    </div>
                  </div>

                </div>
              );
            })}
          </div>
        )}

      </div>

      {/* Comparison Modal Popup */}
      <AnimatePresence>
        {showCompareModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
          >
            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              className="bg-white border border-slate-200 max-w-6xl w-full rounded-2xl overflow-hidden shadow-xl flex flex-col my-8"
            >
              {/* Modal Header */}
              <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50">
                <div className="text-left">
                  <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
                    <RefreshCw className="w-5 h-5 text-[#f95a00]" />
                    Premium Fleet Price & Spec Comparison
                  </h3>
                  <p className="text-slate-400 text-xs mt-0.5">Select up to 3 models to evaluate rates, seats, and luxury utilities side-by-side.</p>
                </div>
                <button
                  onClick={() => setShowCompareModal(false)}
                  className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-slate-700 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Comparison Grid */}
              <div className="p-6 overflow-y-auto max-h-[70vh]">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[0, 1, 2].map((index) => {
                    const v = compareList[index];
                    const hasMultiple = compareList.length >= 2;
                    const minDayRate = hasMultiple ? Math.min(...compareList.map((item) => item.pricePerDay)) : null;
                    const minKmRate = hasMultiple ? Math.min(...compareList.map((item) => item.pricePerKm)) : null;
                    const maxCapacity = hasMultiple ? Math.max(...compareList.map((item) => item.capacity)) : null;

                    if (v) {
                      return (
                        <div
                          key={v.id}
                          className="bg-white border border-slate-200 rounded-xl p-5 relative shadow-sm flex flex-col justify-between text-left"
                        >
                          {/* Image & Action Corner */}
                          <div className="relative h-40 rounded-lg overflow-hidden mb-4 bg-slate-100">
                            <img src={v.image} alt={v.name} className="w-full h-full object-cover" />
                            <button
                              onClick={() => handleRemoveFromCompare(v.id)}
                              className="absolute top-2 right-2 p-1.5 bg-white/90 hover:bg-red-500 hover:text-white text-slate-500 rounded-lg transition-colors border border-slate-200"
                              title="Remove from comparison"
                            >
                              <X className="w-3.5 h-3.5" />
                            </button>
                            <span className="absolute bottom-2 left-2 bg-[#0f2249] text-white px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider">
                              {v.category}
                            </span>
                          </div>

                          {/* Name & Quick Swap */}
                          <div className="mb-4">
                            <h4 className="text-base font-black text-slate-900 line-clamp-1">{v.name}</h4>
                            <div className="mt-2">
                              <label className="block text-[8px] font-bold tracking-widest text-slate-400 uppercase mb-0.5">Swap Selection</label>
                              <select
                                value={v.id}
                                onChange={(e) => handleSwapVehicle(index, e.target.value)}
                                className="input-field py-1.5 text-xs w-full"
                              >
                                <option value={v.id}>Swap with...</option>
                                {vehicles
                                  .filter((other) => !compareList.some((c) => c.id === other.id))
                                  .map((other) => (
                                    <option key={other.id} value={other.id}>
                                      {other.name} ({other.category})
                                    </option>
                                  ))}
                              </select>
                            </div>
                          </div>

                          {/* Core Price Breakdown */}
                          <div className="bg-slate-50 border border-slate-150 p-3.5 rounded-xl space-y-2 mb-4">
                            <div className="flex justify-between items-baseline">
                              <span className="text-[10px] uppercase font-bold text-slate-400">Daily Flat Rate</span>
                              <div className="text-right">
                                <span className="text-sm font-black text-[#f95a00]">₹{v.pricePerDay.toLocaleString()}</span>
                                {hasMultiple && v.pricePerDay === minDayRate && (
                                  <span className="block text-[8px] font-black uppercase text-emerald-600 mt-0.5">★ Best Value</span>
                                )}
                              </div>
                            </div>
                            <div className="border-t border-slate-200 my-1.5" />
                            <div className="flex justify-between items-baseline">
                              <span className="text-[10px] uppercase font-bold text-slate-400">Outstation per KM</span>
                              <div className="text-right">
                                <span className="text-xs font-bold text-slate-800 font-mono">₹{v.pricePerKm}/km</span>
                                {hasMultiple && v.pricePerKm === minKmRate && (
                                  <span className="block text-[8px] font-black uppercase text-emerald-600 mt-0.5">★ Best Rate</span>
                                )}
                              </div>
                            </div>
                          </div>

                          {/* Capacity specs */}
                          <div className="grid grid-cols-2 gap-2 mb-4 text-center">
                            <div className="bg-slate-50 border border-slate-150 p-2 rounded-lg">
                              <Users className="w-3.5 h-3.5 text-[#0f2249] mx-auto mb-1" />
                              <span className="block text-[11px] font-bold text-slate-800">{v.capacity} Seats</span>
                              {hasMultiple && v.capacity === maxCapacity && (
                                <span className="text-[8px] font-bold uppercase text-amber-600">Max Capacity</span>
                              )}
                            </div>
                            <div className="bg-slate-50 border border-slate-150 p-2 rounded-lg">
                              <Briefcase className="w-3.5 h-3.5 text-[#0f2249] mx-auto mb-1" />
                              <span className="block text-[11px] font-bold text-slate-800">{v.luggage} Bags</span>
                              <span className="text-[8px] text-slate-400 font-mono">Luggage</span>
                            </div>
                          </div>

                          {/* Features Suite */}
                          <div className="bg-slate-50 border border-slate-150 rounded-xl p-3.5 space-y-2 mb-4 text-xs text-slate-600">
                            <p className="text-[9px] uppercase tracking-widest font-bold text-[#0f2249] mb-1.5 border-b border-slate-200 pb-1">Luxury & Safety Suite</p>
                            
                            <div className="flex items-center justify-between text-[11px]">
                              <span className="text-slate-450">Air Conditioning</span>
                              <span className={v.specifications.ac ? 'text-emerald-600 font-bold' : 'text-slate-400'}>
                                {v.specifications.ac ? '✓ Standard AC' : '✗ No AC'}
                              </span>
                            </div>

                            <div className="flex items-center justify-between text-[11px]">
                              <span className="text-slate-450">Audio Entertainment</span>
                              <span className={v.specifications.musicSystem ? 'text-emerald-600 font-bold' : 'text-slate-400'}>
                                {v.specifications.musicSystem ? '✓ Premium Audio' : '✗ Basic'}
                              </span>
                            </div>

                            <div className="flex items-center justify-between text-[11px]">
                              <span className="text-slate-450">Charging USB Ports</span>
                              <span className={v.specifications.chargingPort ? 'text-emerald-600 font-bold' : 'text-slate-400'}>
                                {v.specifications.chargingPort ? '✓ Available' : '✗ No Ports'}
                              </span>
                            </div>

                            <div className="flex items-center justify-between text-[11px]">
                              <span className="text-slate-450">Pushback Seats</span>
                              <span className={v.specifications.pushbackSeats ? 'text-emerald-600 font-bold' : 'text-slate-400'}>
                                {v.specifications.pushbackSeats ? '✓ Recliners' : '✗ Fixed'}
                              </span>
                            </div>

                            <div className="flex items-center justify-between text-[11px]">
                              <span className="text-slate-450">Airbags Suite</span>
                              <span className={v.specifications.airbags ? 'text-emerald-600 font-bold' : 'text-slate-400'}>
                                {v.specifications.airbags ? '✓ Active' : '✗ Standard'}
                              </span>
                            </div>

                            <div className="flex items-center justify-between text-[11px]">
                              <span className="text-slate-450">Live GPS tracking</span>
                              <span className={v.specifications.gps ? 'text-emerald-600 font-bold' : 'text-slate-400'}>
                                {v.specifications.gps ? '✓ GPS Active' : '✗ No GPS'}
                              </span>
                            </div>

                            <div className="flex items-center justify-between text-[11px]">
                              <span className="text-slate-450">Fuel Efficiency</span>
                              <span className="text-slate-800 font-bold">{v.mileage}</span>
                            </div>
                          </div>

                          {/* Book CTA */}
                          <button
                            onClick={() => {
                              onBookVehicle(v);
                              setShowCompareModal(false);
                            }}
                            className="btn-primary w-full py-3 text-xs flex items-center justify-center gap-1.5"
                          >
                            <span>Reserve Now</span>
                          </button>
                        </div>
                      );
                    } else {
                      return (
                        <div
                          key={`empty-${index}`}
                          className="border-2 border-dashed border-slate-200 hover:border-slate-300 rounded-xl p-6 h-full flex flex-col items-center justify-center text-center transition-all min-h-[450px] bg-slate-50"
                        >
                          <div className="w-12 h-12 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center mb-4 text-[#f95a00]">
                            <Plus className="w-6 h-6" />
                          </div>
                          <h4 className="text-sm font-bold text-slate-800 mb-1">Add to Compare</h4>
                          <p className="text-[11px] text-slate-400 max-w-[180px] mb-4">Choose another premium vehicle to inspect rates side-by-side</p>
                          <select
                            onChange={(e) => {
                              if (e.target.value) {
                                handleAddVehicleDirectly(e.target.value);
                                e.target.value = ''; 
                              }
                            }}
                            className="input-field py-1.5 text-xs cursor-pointer w-auto"
                            defaultValue=""
                          >
                            <option value="" disabled>Select Vehicle...</option>
                            {vehicles
                              .filter((other) => !compareList.some((c) => c.id === other.id))
                              .map((other) => (
                                <option key={other.id} value={other.id}>
                                  {other.name} ({other.category})
                                </option>
                              ))}
                          </select>
                        </div>
                      );
                    }
                  })}
                </div>
              </div>

              {/* Modal Footer */}
              <div className="p-6 bg-slate-50 border-t border-slate-100 flex justify-between items-center">
                <p className="text-[10px] text-slate-400 font-mono">Bhubaneswar Fleet Division • ISO Safety Standard</p>
                <div className="flex gap-3">
                  <button
                    onClick={() => { setCompareList([]); }}
                    className="px-4 py-2 text-slate-400 hover:text-slate-700 text-xs hover:underline transition-all"
                  >
                    Reset Comparison
                  </button>
                  <button
                    onClick={() => setShowCompareModal(false)}
                    className="btn-navy px-6 py-2.5 text-xs uppercase"
                  >
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}

import React from 'react';
import { Users, Briefcase, Gauge, ShieldCheck, Heart, MapPin, Calendar, Compass, Sparkles, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';
import { Vehicle } from '../../types';

interface VehicleDetailProps {
  onBook: (vehicle: Vehicle) => void;
  onBack: () => void;
}

export default function MercedesSClassDetail({ onBook, onBack }: VehicleDetailProps) {
  const vehicleData: Vehicle = {
    id: 'v-1',
    name: 'Mercedes-Benz S-Class',
    category: 'Luxury Cars',
    image: 'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&q=80&w=800',
    pricePerKm: 75,
    pricePerDay: 25000,
    capacity: 4,
    luggage: 2,
    mileage: '12 km/l',
    specifications: {
      ac: true,
      musicSystem: true,
      chargingPort: true,
      pushbackSeats: true,
      airbags: true,
      gps: true
    },
    features: [
      "Panoramic Glass Sunroof",
      "High-fidelity Burmester 3D Sound System",
      "Ultra-plush Nappa Leather Massage Seats",
      "Dynamic Interior Ambient Light Settings",
      "Premium Uniformed Chauffeur Service Included"
    ],
    availability: 'Available'
  };

  const itineraries = [
    { route: 'Bhubaneswar Airport to Luxury Hotel (VIP Airport Transfer)', distance: '15 km total', estTime: '0.5 hrs', totalCost: '₹12,000' },
    { route: 'Sun Temple Konark Royal Groom Entrance Package', distance: '160 km total', estTime: '3.5 hrs', totalCost: '₹25,000/day' },
    { route: 'Bhubaneswar-Puri Heritage VVIP Delegated Sightseeing', distance: '130 km total', estTime: '2.5 hrs', totalCost: '₹25,000' },
    { route: 'Gopalpur Coastal VVIP Weekend Getaway', distance: '340 km total', estTime: '7 hrs', totalCost: '₹45,000' }
  ];

  return (
    <div className="bg-gradient-to-b from-[#140c0a] to-[#0f0a08] min-h-screen text-[#fcfaf2] py-8 px-4 sm:px-6 lg:px-8 text-left">
      <div className="max-w-6xl mx-auto">
        
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 text-[10px] font-bold text-stone-500 uppercase tracking-widest font-mono mb-6">
          <span className="cursor-pointer hover:text-yellow-500 transition-colors" onClick={onBack}>Home</span>
          <span>/</span>
          <span className="cursor-pointer hover:text-yellow-500 transition-colors" onClick={onBack}>Our Fleet</span>
          <span>/</span>
          <span className="text-[#c5a059]">{vehicleData.name}</span>
        </div>

        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          <div className="lg:col-span-7 space-y-6">
            <div className="relative rounded-2xl overflow-hidden border border-yellow-500/10 shadow-[0_15px_40px_rgba(0,0,0,0.6)]">
              <img 
                src={vehicleData.image} 
                alt={vehicleData.name} 
                className="w-full h-[380px] object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent" />
              <div className="absolute top-4 left-4 bg-stone-950/90 backdrop-blur-md border border-yellow-500/20 text-[10px] font-bold text-yellow-500 px-3 py-1 rounded uppercase tracking-wider">
                VVIP Sovereign Luxury Saloon
              </div>
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="bg-stone-900/50 p-4 rounded-xl border border-white/5 flex flex-col items-center justify-center text-center">
                <Users className="w-5 h-5 text-yellow-500 mb-2 animate-pulse" />
                <span className="text-[10px] text-stone-500 uppercase font-mono font-bold">Capacity</span>
                <span className="text-sm font-black text-white mt-1">{vehicleData.capacity} VVIPs</span>
              </div>
              <div className="bg-stone-900/50 p-4 rounded-xl border border-white/5 flex flex-col items-center justify-center text-center">
                <Briefcase className="w-5 h-5 text-yellow-500 mb-2" />
                <span className="text-[10px] text-stone-500 uppercase font-mono font-bold">Luggage Limit</span>
                <span className="text-sm font-black text-white mt-1">{vehicleData.luggage} Elite Bags</span>
              </div>
              <div className="bg-stone-900/50 p-4 rounded-xl border border-white/5 flex flex-col items-center justify-center text-center">
                <Gauge className="w-5 h-5 text-yellow-500 mb-2" />
                <span className="text-[10px] text-stone-500 uppercase font-mono font-bold">Acoustics Class</span>
                <span className="text-sm font-black text-white mt-1">Burmester 3D</span>
              </div>
              <div className="bg-stone-900/50 p-4 rounded-xl border border-white/5 flex flex-col items-center justify-center text-center">
                <ShieldCheck className="w-5 h-5 text-yellow-500 mb-2" />
                <span className="text-[10px] text-stone-500 uppercase font-mono font-bold">Safety Class</span>
                <span className="text-sm font-black text-white mt-1">Sovereign Active</span>
              </div>
            </div>

            {/* Overview */}
            <div className="bg-stone-900/30 p-6 rounded-xl border border-yellow-500/5 space-y-3">
              <h3 className="text-base font-black uppercase text-white tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-yellow-500" /> Peerless Luxury & VVIP Sovereign Comfort
              </h3>
              <p className="text-xs text-stone-400 leading-relaxed">
                The Mercedes-Benz S-Class has long stood as the definitive expression of ultimate luxury, state engineering, and exquisite craftsmanship. Favored worldwide by political heads of state, multi-national business CEOs, and luxury weddings, it surrounds passengers with premium active air suspension, plush active hot stone massage recliners draped in soft Nappa Leather, customizable active ambient lighting settings, and silent acoustic dampening. Driven only by our most highly decorated senior chauffeurs.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
                {vehicleData.features.map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs text-stone-300">
                    <CheckCircle2 className="w-3.5 h-3.5 text-yellow-500 shrink-0" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Panel */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-stone-950 p-6 rounded-2xl border border-yellow-500/20 shadow-[0_15px_40px_rgba(0,0,0,0.8)] relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-500/5 rounded-full blur-2xl pointer-events-none"></div>

              <span className="text-[8px] font-mono font-black text-yellow-500 bg-yellow-500/10 px-2.5 py-1 rounded uppercase tracking-wider">OFFICIAL RATE CARD</span>
              <h2 className="text-xl font-black text-white mt-2 uppercase">{vehicleData.name}</h2>
              <p className="text-xs text-stone-400 mt-1">Each lease is detailed under immaculate white-glove protocols.</p>

              <div className="my-6 border-y border-white/5 py-4 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-stone-400">VVIP Outstation Kilometer Rate</span>
                  <span className="text-sm font-mono font-bold text-yellow-500">₹{vehicleData.pricePerKm}/km</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-stone-400">Fixed Flat Day Lease Rate</span>
                  <span className="text-base font-mono font-black text-white">₹{vehicleData.pricePerDay}/day</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-stone-400">White-glove Chauffeur Fee</span>
                  <span className="text-xs font-bold text-stone-300 bg-stone-900 px-2 py-0.5 rounded">Included</span>
                </div>
              </div>

              <div className="space-y-3">
                <button
                  onClick={() => onBook(vehicleData)}
                  className="w-full py-3.5 bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-400 hover:to-amber-500 text-stone-950 font-black uppercase text-xs tracking-widest rounded-xl shadow-lg hover:scale-[1.01] transition-transform"
                >
                  Lease Mercedes S-Class
                </button>

                <a
                  href={`https://wa.me/919437100001?text=${encodeURIComponent(`Namaskar Shibani Travels! I am interested in booking your premium vehicle: ${vehicleData.name}. Please share availability and details.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-black uppercase text-xs tracking-widest rounded-xl shadow-lg hover:scale-[1.01] transition-all flex items-center justify-center gap-2 border border-emerald-500/20"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01c12.008.01c3.202.001 6.212 1.246 8.477 3.513 2.262 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.413 9.863-9.864.001-2.64-1.023-5.123-2.887-6.989C16.581 1.884 14.09 1.861 12.01 1.861c-5.435 0-9.86 4.414-9.864 9.865-.001 1.802.477 3.568 1.385 5.112L2.533 21.41l4.114-1.076zm12.334-5.865c-.328-.163-1.936-.957-2.264-1.077-.327-.12-.566-.18-.804.18-.238.359-.925 1.167-1.133 1.407-.208.24-.417.27-.745.105-.328-.163-1.386-.51-2.639-1.629-.974-.869-1.631-1.943-1.821-2.271-.19-.328-.02-.505.144-.668.148-.146.328-.382.492-.574.164-.191.218-.328.328-.546.11-.218.055-.41-.027-.573-.082-.164-.804-1.936-1.102-2.659-.29-.696-.583-.603-.804-.614-.208-.01-.447-.012-.686-.012-.239 0-.626.09-.953.447-.328.359-1.25 1.222-1.25 2.976 0 1.754 1.279 3.447 1.457 3.687.179.24 2.518 3.844 6.098 5.39 3.58 1.546 3.58 1.031 4.234.972.653-.06 2.083-.852 2.375-1.674.292-.823.292-1.53.205-1.674-.087-.146-.328-.27-.655-.433z"/>
                  </svg>
                  <span>Chat on WhatsApp</span>
                </a>
              </div>

              <p className="text-[10px] text-center text-stone-500 mt-3">✓ Senior chauffeur • Complimentary newspapers & wet wipes • VIP red carpet entry</p>
            </div>

            {/* Popular itineraries */}
            <div className="bg-stone-900/20 p-5 rounded-xl border border-white/5">
              <h4 className="text-xs font-black uppercase text-white tracking-widest mb-3">Popular Tour Estimates</h4>
              <div className="space-y-3.5">
                {itineraries.map((it, idx) => (
                  <div key={idx} className="border-b border-white/5 pb-2.5 last:border-none last:pb-0">
                    <div className="flex justify-between items-start gap-2">
                      <div>
                        <p className="text-[11px] font-black text-stone-200">{it.route}</p>
                        <p className="text-[9px] text-stone-500 font-mono mt-0.5">⏱ Est: {it.estTime} | Dist: {it.distance}</p>
                      </div>
                      <span className="text-xs font-mono font-bold text-yellow-500">{it.totalCost}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}

import React, { useState, useEffect } from 'react';
import { Users, Briefcase, Gauge, ShieldCheck, Sparkles, CheckCircle2 } from 'lucide-react';
import { Vehicle } from '../../types';

interface GenericVehicleDetailProps {
  vehicleId: string;
  onBook: (vehicle: Vehicle) => void;
  onBack: () => void;
}

export default function GenericVehicleDetail({ vehicleId, onBook, onBack }: GenericVehicleDetailProps) {
  const [vehicle, setVehicle] = useState<Vehicle | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/vehicles')
      .then((res) => res.json())
      .then((data: Vehicle[]) => {
        const found = data.find((v) => v.id === vehicleId);
        if (found) {
          setVehicle(found);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching vehicle details:', err);
        setLoading(false);
      });
  }, [vehicleId]);

  if (loading) {
    return (
      <div className="bg-gradient-to-b from-[#140c0a] to-[#0f0a08] min-h-screen text-[#fcfaf2] flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 border-4 border-yellow-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-stone-400 text-xs uppercase tracking-widest font-mono">Loading Vehicle Specifications...</p>
        </div>
      </div>
    );
  }

  if (!vehicle) {
    return (
      <div className="bg-gradient-to-b from-[#140c0a] to-[#0f0a08] min-h-screen text-[#fcfaf2] flex flex-col items-center justify-center p-8">
        <p className="text-stone-400 mb-4">Vehicle model details could not be loaded at this time.</p>
        <button onClick={onBack} className="px-5 py-2 bg-yellow-500 text-stone-950 text-xs font-bold rounded-xl">
          Return to Fleet
        </button>
      </div>
    );
  }

  // Generate dynamic popular routes rates based on vehicle pricing parameters
  const itineraries = [
    { route: 'Bhubaneswar to Puri Lord Jagannath Mandir (Round Trip)', distance: '130 km total', estTime: '2.5 hrs', totalCost: `₹${Math.max(vehicle.pricePerDay, vehicle.pricePerKm * 130)}` },
    { route: 'Bhubaneswar to Sun Temple Konark & Chandrabhaga', distance: '160 km total', estTime: '3.5 hrs', totalCost: `₹${Math.max(vehicle.pricePerDay, vehicle.pricePerKm * 160)}` },
    { route: 'Bhubaneswar to Chilika Lake Sanctuary (Satapada Cruise)', distance: '220 km total', estTime: '5 hrs', totalCost: `₹${Math.max(vehicle.pricePerDay, vehicle.pricePerKm * 220)}` },
    { route: 'Cuttack Silver City Tour & Netaji Memorial', distance: '100 km total', estTime: '2 hrs', totalCost: `₹${Math.max(vehicle.pricePerDay, vehicle.pricePerKm * 100)}` }
  ];

  return (
    <div className="bg-gradient-to-b from-[#140c0a] to-[#0f0a08] min-h-screen text-[#fcfaf2] py-8 px-4 sm:px-6 lg:px-8 text-left animate-fade-in">
      <div className="max-w-6xl mx-auto">
        
        {/* Breadcrumb navigation */}
        <div className="flex items-center gap-2 text-[10px] font-bold text-stone-500 uppercase tracking-widest font-mono mb-6">
          <span className="cursor-pointer hover:text-yellow-500 transition-colors" onClick={onBack}>Home</span>
          <span>/</span>
          <span className="cursor-pointer hover:text-yellow-500 transition-colors" onClick={onBack}>Our Fleet</span>
          <span>/</span>
          <span className="text-[#c5a059]">{vehicle.name}</span>
        </div>

        {/* Hero Section Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left: Photos & Quick Specifications */}
          <div className="lg:col-span-7 space-y-6">
            <div className="relative rounded-2xl overflow-hidden border border-yellow-500/10 shadow-[0_15px_40px_rgba(0,0,0,0.6)]">
              <img 
                src={vehicle.image} 
                alt={vehicle.name} 
                className="w-full h-[380px] object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent" />
              <div className="absolute top-4 left-4 bg-stone-950/90 backdrop-blur-md border border-yellow-500/20 text-[10px] font-bold text-yellow-500 px-3 py-1 rounded uppercase tracking-wider">
                {vehicle.category} Specifications
              </div>
            </div>

            {/* Grid of technical metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="bg-stone-900/50 p-4 rounded-xl border border-white/5 flex flex-col items-center justify-center text-center">
                <Users className="w-5 h-5 text-yellow-500 mb-2" />
                <span className="text-[10px] text-stone-500 uppercase font-mono font-bold">Capacity</span>
                <span className="text-sm font-black text-white mt-1">{vehicle.capacity} Guests</span>
              </div>
              <div className="bg-stone-900/50 p-4 rounded-xl border border-white/5 flex flex-col items-center justify-center text-center">
                <Briefcase className="w-5 h-5 text-yellow-500 mb-2" />
                <span className="text-[10px] text-stone-500 uppercase font-mono font-bold">Luggage Limit</span>
                <span className="text-sm font-black text-white mt-1">{vehicle.luggage} Bags</span>
              </div>
              <div className="bg-stone-900/50 p-4 rounded-xl border border-white/5 flex flex-col items-center justify-center text-center">
                <Gauge className="w-5 h-5 text-yellow-500 mb-2" />
                <span className="text-[10px] text-stone-500 uppercase font-mono font-bold">Mileage</span>
                <span className="text-sm font-black text-white mt-1">{vehicle.mileage || '14 km/l'}</span>
              </div>
              <div className="bg-stone-900/50 p-4 rounded-xl border border-white/5 flex flex-col items-center justify-center text-center">
                <ShieldCheck className="w-5 h-5 text-yellow-500 mb-2" />
                <span className="text-[10px] text-stone-500 uppercase font-mono font-bold">Safety Level</span>
                <span className="text-sm font-black text-white mt-1">{vehicle.specifications.airbags ? 'High Safety' : 'Standard'}</span>
              </div>
            </div>

            {/* Detailed description */}
            <div className="bg-stone-900/30 p-6 rounded-xl border border-yellow-500/5 space-y-3">
              <h3 className="text-base font-black uppercase text-white tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-yellow-500" /> Premium Features & Comfort
              </h3>
              <p className="text-xs text-stone-400 leading-relaxed">
                Our {vehicle.name} is meticulously detailed and maintained under ISO-9001 quality audit guidelines. Equipped with active air conditioning, pushback ergonomics, premium stereo audio layout, and high structural safety systems, it ensures absolute comfort and peace of mind on all Odisha sightseeing circuits.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
                {vehicle.features.map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs text-stone-300">
                    <CheckCircle2 className="w-3.5 h-3.5 text-yellow-500 shrink-0" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Pricing Table & Booking (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-stone-950 p-6 rounded-2xl border border-yellow-500/20 shadow-[0_15px_40px_rgba(0,0,0,0.8)] relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-500/5 rounded-full blur-2xl pointer-events-none"></div>

              <span className="text-[8px] font-mono font-black text-yellow-500 bg-yellow-500/10 px-2.5 py-1 rounded uppercase tracking-wider">OFFICIAL RATE CARD</span>
              <h2 className="text-xl font-black text-white mt-2 uppercase">{vehicle.name}</h2>
              <p className="text-xs text-stone-400 mt-1">Managed under our gold-tier regional safety standard operations.</p>

              <div className="my-6 border-y border-white/5 py-4 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-stone-400">Outstation Rate per KM</span>
                  <span className="text-sm font-mono font-bold text-yellow-500">₹{vehicle.pricePerKm}/km</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-stone-400">Fixed Flat Day Lease Rate</span>
                  <span className="text-base font-mono font-black text-white">₹{vehicle.pricePerDay}/day</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-stone-400">Professional Driver Fee</span>
                  <span className="text-xs font-bold text-stone-300 bg-stone-900 px-2 py-0.5 rounded">Included</span>
                </div>
              </div>

              {/* Action buttons */}
              <div className="space-y-3">
                <button
                  onClick={() => onBook(vehicle)}
                  className="w-full py-3.5 bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-400 hover:to-amber-500 text-stone-950 font-black uppercase text-xs tracking-widest rounded-xl shadow-lg hover:scale-[1.01] transition-transform"
                >
                  Book This {vehicle.category} Instantly
                </button>

                <a
                  href={`https://wa.me/919437100001?text=${encodeURIComponent(`Namaskar Shibani Travels! I am interested in booking your premium vehicle: ${vehicle.name}. Please share availability and details.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-black uppercase text-xs tracking-widest rounded-xl shadow-lg hover:scale-[1.01] transition-all flex items-center justify-center gap-2 border border-emerald-500/20"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.513 2.262 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.413 9.863-9.864.001-2.64-1.023-5.123-2.887-6.989C16.581 1.884 14.09 1.861 12.01 1.861c-5.435 0-9.86 4.414-9.864 9.865-.001 1.802.477 3.568 1.385 5.112L2.533 21.41l4.114-1.076zm12.334-5.865c-.328-.163-1.936-.957-2.264-1.077-.327-.12-.566-.18-.804.18-.238.359-.925 1.167-1.133 1.407-.208.24-.417.27-.745.105-.328-.163-1.386-.51-2.639-1.629-.974-.869-1.631-1.943-1.821-2.271-.19-.328-.02-.505.144-.668.148-.146.328-.382.492-.574.164-.191.218-.328.328-.546.11-.218.055-.41-.027-.573-.082-.164-.804-1.936-1.102-2.659-.29-.696-.583-.603-.804-.614-.208-.01-.447-.012-.686-.012-.239 0-.626.09-.953.447-.328.359-1.25 1.222-1.25 2.976 0 1.754 1.279 3.447 1.457 3.687.179.24 2.518 3.844 6.098 5.39 3.58 1.546 3.58 1.031 4.234.972.653-.06 2.083-.852 2.375-1.674.292-.823.292-1.53.205-1.674-.087-.146-.328-.27-.655-.433z"/>
                  </svg>
                  <span>Chat on WhatsApp</span>
                </a>
              </div>

              <p className="text-[10px] text-center text-stone-500 mt-3">✓ 24-hr Helpline • Zero hidden costs • Verified commercial pass</p>
            </div>

            {/* Popular Odisha tourist destinations pricing calculator */}
            <div className="bg-stone-900/20 p-5 rounded-xl border border-white/5">
              <h4 className="text-xs font-black uppercase text-white tracking-widest mb-3 font-mono">Popular Odisha Route Estimates</h4>
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

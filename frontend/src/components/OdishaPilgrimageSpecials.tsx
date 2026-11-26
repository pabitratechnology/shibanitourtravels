import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Sparkles, MapPin, CheckCircle2, Star, Clock, ShieldCheck,
  ChevronRight, Calendar, Car, ArrowRight, Heart
} from 'lucide-react';

interface PilgrimagePackage {
  id: string;
  name: string;
  badge: string;
  tagline: string;
  image: string;
  duration: string;
  distance: string;
  highlights: string[];
  sedanFare: number;
  crystaFare: number;
  urbaniaFare: number;
  popular?: boolean;
}

const PILGRIMAGE_PACKAGES: PilgrimagePackage[] = [
  {
    id: 'puri-jagannath-vip',
    name: 'Puri Jagannath Dham VIP Pilgrimage',
    badge: '🙏 Most Sacred & Popular',
    tagline: 'Lord Jagannath Darshan, Mahaprasad & Golden Beach',
    image: '/banners/lord_jagannath_puri.png',
    duration: 'Full Day (12 Hours)',
    distance: '65 km from Bhubaneswar',
    highlights: [
      'Bada Danda Chariot Path & Singhadwara Drop',
      'Anandabazar Mahaprasad Collection Guide',
      'Gundicha Temple & Narendra Sacred Tank',
      'Swargadwar & Golden Blue Flag Beach Visit',
      'AC Cab with Temple Parking Pass Included',
    ],
    sedanFare: 1800,
    crystaFare: 2600,
    urbaniaFare: 4800,
    popular: true,
  },
  {
    id: 'konark-sun-temple-odyssey',
    name: 'Konark Sun Temple & Marine Drive',
    badge: '🏛️ UNESCO World Heritage',
    tagline: '13th-Century Kalinga Marvel & Coastal Sunset',
    image: '/banners/hero_konark_panoramic.jpg',
    duration: '10 Hours',
    distance: '68 km from Bhubaneswar',
    highlights: [
      'Intricate 24 Stone Chariot Wheels Exploration',
      'Scenic Marine Drive Coastal Highway Cruise',
      'Chandrabhaga Beach & Sacred Sun Worship Spot',
      'Ramachandi Temple & River Estuary View',
      'Zero Hidden Costs • All Tolls Included',
    ],
    sedanFare: 1900,
    crystaFare: 2700,
    urbaniaFare: 5000,
  },
  {
    id: 'ekamra-kshetra-temple-trail',
    name: 'Ekamra Kshetra 500-Temple Circuit',
    badge: '🕉️ Ancient Kalinga Heritage',
    tagline: 'Old Town Bhubaneswar Sacred Shrines Trail',
    image: '/banners/hero_bhubaneswar_temples.jpg',
    duration: '8 Hours (City Tour)',
    distance: 'Within Bhubaneswar',
    highlights: [
      'Lingaraj Temple (11th Century Shaivite Wonder)',
      'Mukteswar Temple ("Gem of Odisha Architecture")',
      'Rajarani Temple with Intricate Sensuous Sculptures',
      'Bindusagar Sacred Lake & Bramheswar Mandir',
      'Khandagiri & Udayagiri Ancient Rock Caves',
    ],
    sedanFare: 1400,
    crystaFare: 2200,
    urbaniaFare: 4200,
  },
  {
    id: 'shaktipeeth-biraja-taratarini',
    name: 'Maa Biraja & Taratarini Shaktipeeth Circuit',
    badge: '🌺 Divine Shakti Blessings',
    tagline: 'Ancient Shakti Peethas & Auspicious Vehicle Puja',
    image: '/banners/hero_jagannath_temple_panoramic.jpg',
    duration: '14 Hours (Extended Tour)',
    distance: '120 km - 165 km',
    highlights: [
      'Maa Biraja Temple (Navigaya Jajpur Pilgrimage)',
      'Maa Taratarini Hill Shrine (Ropeway Access)',
      'Special Auspicious Vehicle Puja Arrangements',
      'Scenic Rushikulya River Valley Drive',
      'Senior Citizen & Family Comfort Guaranteed',
    ],
    sedanFare: 3600,
    crystaFare: 4800,
    urbaniaFare: 7800,
  },
];

interface OdishaPilgrimageSpecialsProps {
  onBookPilgrimage?: (packageName: string, vehicleType: string, fare: number) => void;
}

export default function OdishaPilgrimageSpecials({ onBookPilgrimage }: OdishaPilgrimageSpecialsProps) {
  const [selectedVehicle, setSelectedVehicle] = useState<'sedan' | 'crysta' | 'urbania'>('crysta');

  return (
    <section className="py-16 sm:py-20 bg-[#FAF8F5] relative overflow-hidden border-t border-b border-amber-900/10">
      
      {/* Subtle Background Halos */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-amber-400/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-emerald-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest text-[#006837] bg-emerald-50 border border-emerald-200/80 mb-3 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-amber-500 animate-pulse" />
            Dedicated to Mahaprabhu Shri Jagannath
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-black text-slate-900 tracking-tight leading-tight mb-4">
            Sacred Odisha Pilgrimages &amp;{' '}
            <span className="bg-gradient-to-r from-[#006837] to-[#004D26] bg-clip-text text-transparent">
              VIP Temple Darshan Cabs
            </span>
          </h2>

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-medium">
            Experience divine blessings with Odisha’s most trusted pilgrimage fleet. Dedicated temple chauffeurs, verified parking access, zero toll worries, and sanitized comfortable interiors for families and senior citizens.
          </p>

          {/* Vehicle Selector Tabs */}
          <div className="inline-flex items-center p-1.5 bg-white border border-slate-200 rounded-2xl shadow-sm mt-6">
            <button
              onClick={() => setSelectedVehicle('sedan')}
              className={`px-4 sm:px-5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                selectedVehicle === 'sedan'
                  ? 'bg-[#006837] text-white shadow-md'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              🚗 Swift Dzire (4 Seats)
            </button>
            <button
              onClick={() => setSelectedVehicle('crysta')}
              className={`px-4 sm:px-5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                selectedVehicle === 'crysta'
                  ? 'bg-[#006837] text-white shadow-md'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              🚙 Innova Crysta (7 Seats)
            </button>
            <button
              onClick={() => setSelectedVehicle('urbania')}
              className={`px-4 sm:px-5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                selectedVehicle === 'urbania'
                  ? 'bg-[#006837] text-white shadow-md'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              🚐 Force Urbania (17 Seats)
            </button>
          </div>
        </div>

        {/* 4 Packages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {PILGRIMAGE_PACKAGES.map((pkg) => {
            const fare =
              selectedVehicle === 'sedan'
                ? pkg.sedanFare
                : selectedVehicle === 'crysta'
                ? pkg.crystaFare
                : pkg.urbaniaFare;

            const vehicleLabel =
              selectedVehicle === 'sedan'
                ? 'Swift Dzire'
                : selectedVehicle === 'crysta'
                ? 'Innova Crysta'
                : 'Force Urbania';

            return (
              <div
                key={pkg.id}
                className={`bg-white rounded-3xl overflow-hidden border transition-all duration-300 hover:shadow-2xl hover:-translate-y-1.5 flex flex-col justify-between ${
                  pkg.popular ? 'border-[#006837] ring-2 ring-[#006837]/20 shadow-lg' : 'border-slate-200/80 shadow-md'
                }`}
              >
                <div>
                  {/* Image with Badge */}
                  <div className="relative h-48 w-full overflow-hidden bg-slate-100">
                    <img
                      src={pkg.image}
                      alt={pkg.name}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                    
                    <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-[10.5px] font-black uppercase tracking-wider bg-white/90 text-[#006837] backdrop-blur-md shadow-md">
                      {pkg.badge}
                    </span>

                    <div className="absolute bottom-3 left-3 right-3 text-white">
                      <div className="text-[11px] font-bold text-amber-300 flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        <span>{pkg.duration}</span>
                        <span className="text-white/60">•</span>
                        <span>{pkg.distance}</span>
                      </div>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-5">
                    <h3 className="text-lg font-black text-slate-900 leading-snug mb-1">
                      {pkg.name}
                    </h3>
                    <p className="text-xs text-amber-700 font-semibold mb-4">
                      {pkg.tagline}
                    </p>

                    {/* Highlights List */}
                    <div className="space-y-2 mb-5">
                      {pkg.highlights.map((h, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-xs text-slate-600 font-medium">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#006837] shrink-0 mt-0.5" />
                          <span className="leading-tight">{h}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Card Footer: Transparent Price & Book Button */}
                <div className="p-5 pt-0 border-t border-slate-100 mt-2 bg-slate-50/50">
                  <div className="flex items-baseline justify-between pt-3 mb-3">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-slate-400 block">
                        Fixed Fare ({vehicleLabel})
                      </span>
                      <span className="text-2xl font-black text-[#006837]">
                        ₹{fare.toLocaleString('en-IN')}
                      </span>
                    </div>
                    <span className="text-[10.5px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                      Tolls &amp; Fuel Incl.
                    </span>
                  </div>

                  <button
                    onClick={() => onBookPilgrimage && onBookPilgrimage(pkg.name, vehicleLabel, fare)}
                    className="w-full py-2.5 px-4 rounded-xl text-xs font-black uppercase tracking-wider text-white bg-[#006837] hover:bg-[#004D26] shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Book Darshan Cab</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

              </div>
            );
          })}
        </div>

        {/* Bottom Sacred Assurance Strip */}
        <div className="mt-12 bg-white rounded-2xl p-4 sm:p-6 border border-emerald-100 shadow-md flex flex-wrap items-center justify-around gap-4 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-[#006837]">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-black text-slate-900">Temple Route Specialists</h4>
              <p className="text-[11px] text-slate-500 font-medium">Chauffeurs know VIP gates, puja timings &amp; Mahaprasad counters</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-700">
              <Star className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-black text-slate-900">Senior-Friendly Care</h4>
              <p className="text-[11px] text-slate-500 font-medium">Low step-in height, smooth braking &amp; patient halts</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-[#006837]">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-black text-slate-900">Zero Toll or Parking Surcharges</h4>
              <p className="text-[11px] text-slate-500 font-medium">100% transparent quote with no on-road surprises</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

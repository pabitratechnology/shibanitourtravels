import React from 'react';
import { motion } from 'motion/react';
import {
  Car, Check, ArrowRight, ShieldCheck, MapPin,
  Clock, Sparkles, PhoneCall
} from 'lucide-react';

interface DayTourRatesProps {
  onBookRide: (from?: string, to?: string) => void;
}

const POPULAR_DAY_TRIPS = [
  {
    destination: 'Bhubaneswar ➔ Puri Day Tour',
    coverage: 'Jagannath Temple, Gundicha, Swargadwar Beach, Pipili Applique Village',
    duration: '8 - 10 Hours',
    distance: '150 km Round Trip',
    sedan: '₹1,800',
    ertiga: '₹2,400',
    innova: '₹3,200',
    urbania: '₹4,800',
  },
  {
    destination: 'Golden Triangle (Bhubaneswar ➔ Puri ➔ Konark)',
    coverage: 'Dhauli Stupa, Konark Sun Temple, Chandrabhaga Beach, Puri Temple, Golden Beach',
    duration: '10 - 12 Hours',
    distance: '200 km Round Trip',
    sedan: '₹2,400',
    ertiga: '₹3,000',
    innova: '₹3,800',
    urbania: '₹5,800',
  },
  {
    destination: 'Bhubaneswar ➔ Chilika Lake (Satapada)',
    coverage: 'Dolphin Sanctuary, Sea Mouth Island, Alarnath Temple Brahmagiri',
    duration: '10 - 12 Hours',
    distance: '240 km Round Trip',
    sedan: '₹2,800',
    ertiga: '₹3,500',
    innova: '₹4,400',
    urbania: '₹6,500',
  },
  {
    destination: 'Bhubaneswar City Temple & Heritage Tour',
    coverage: 'Lingaraj, Mukteshwar, Rajarani, Khandagiri & Udayagiri Caves, Tribal Museum',
    duration: '8 Hours / 80 km',
    distance: 'City Sightseeing',
    sedan: '₹1,400',
    ertiga: '₹1,900',
    innova: '₹2,500',
    urbania: '₹3,800',
  },
  {
    destination: 'Bhubaneswar ➔ Bhitarkanika Mangrove Sanctuary',
    coverage: 'Khola Gate, Mangrove Creeks, Crocodile Breeding Center, Dangamal',
    duration: 'Full Day / Overnight',
    distance: '320 km Round Trip',
    sedan: '₹3,800',
    ertiga: '₹4,600',
    innova: '₹5,800',
    urbania: '₹8,500',
  },
  {
    destination: 'Bhubaneswar (BBI) Airport ➔ Puri Hotel Transfer',
    coverage: 'Direct Terminal Pick-Up with Name Placard, Luggage Assistance',
    duration: '1.5 Hours',
    distance: '65 km Direct',
    sedan: '₹1,499',
    ertiga: '₹1,899',
    innova: '₹2,499',
    urbania: '₹3,800',
  },
];

export default function DayTourRates({ onBookRide }: DayTourRatesProps) {
  return (
    <section className="py-20 sm:py-24 bg-[#FAFDFB] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-2">
            <div className="w-10 sm:w-16 h-0.5 bg-[#006837]" />
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight">
              <span className="text-[#006837]">Odisha Day Tour</span>{' '}
              <span className="text-[#D32F2F]">Taxi Rates</span>
            </h2>
            <div className="w-10 sm:w-16 h-0.5 bg-[#006837]" />
          </div>
          <p className="text-sm sm:text-base font-semibold text-slate-600 max-w-xl mx-auto">
            Transparent all-inclusive rates for the most popular sightseeing circuits from Bhubaneswar. Fuel, toll taxes, parking & chauffeur included!
          </p>
        </div>

        {/* Rate Cards Table for Desktop & Responsive Cards for Mobile */}
        <div className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden mb-8">
          
          {/* Table Header (Desktop) */}
          <div className="hidden lg:grid grid-cols-12 bg-[#004D26] text-white p-4 font-black text-xs uppercase tracking-wider text-left">
            <div className="col-span-5">Popular Sightseeing Circuit</div>
            <div className="col-span-1 text-center">Sedan (4 Seater)</div>
            <div className="col-span-2 text-center">Ertiga (6 Seater)</div>
            <div className="col-span-2 text-center">Innova Crysta (7 Seater)</div>
            <div className="col-span-2 text-center">Action</div>
          </div>

          {/* Rows */}
          <div className="divide-y divide-slate-100">
            {POPULAR_DAY_TRIPS.map((trip, idx) => (
              <div
                key={idx}
                className="p-5 lg:p-4 grid grid-cols-1 lg:grid-cols-12 gap-3 lg:gap-0 items-center hover:bg-green-50/40 transition-colors"
              >
                {/* Destination & Coverage */}
                <div className="lg:col-span-5 text-left">
                  <div className="flex items-center gap-2 mb-1">
                    <MapPin className="w-4 h-4 text-[#006837] shrink-0" />
                    <h3 className="text-sm sm:text-base font-black text-slate-900">
                      {trip.destination}
                    </h3>
                  </div>
                  <p className="text-xs text-slate-500 font-medium pl-6 leading-relaxed mb-2 lg:mb-0">
                    {trip.coverage}
                  </p>
                  <div className="flex items-center gap-3 text-[11px] font-bold text-slate-400 pl-6">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-[#D32F2F]" />
                      {trip.duration}
                    </span>
                    <span>• {trip.distance}</span>
                  </div>
                </div>

                {/* Mobile Pricing Grid */}
                <div className="grid grid-cols-3 gap-2 lg:hidden my-2 bg-slate-50 p-2.5 rounded-xl text-center">
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold block">Sedan</span>
                    <span className="text-xs font-black text-[#006837]">{trip.sedan}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold block">Ertiga</span>
                    <span className="text-xs font-black text-[#006837]">{trip.ertiga}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold block">Innova</span>
                    <span className="text-xs font-black text-[#006837]">{trip.innova}</span>
                  </div>
                </div>

                {/* Desktop Pricing Columns */}
                <div className="hidden lg:block lg:col-span-1 text-center font-black text-sm text-[#006837]">
                  {trip.sedan}
                </div>
                <div className="hidden lg:block lg:col-span-2 text-center font-black text-sm text-[#006837]">
                  {trip.ertiga}
                </div>
                <div className="hidden lg:block lg:col-span-2 text-center font-black text-sm text-[#006837]">
                  {trip.innova}
                </div>

                {/* Book Button */}
                <div className="lg:col-span-2 flex items-center justify-end lg:justify-center">
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => onBookRide('Bhubaneswar', trip.destination.split('➔')[1]?.trim() || trip.destination)}
                    className="w-full sm:w-auto px-4 py-2 rounded-xl text-xs font-bold text-white bg-[#006837] hover:bg-[#008746] shadow-sm transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <span>Book Taxi</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </motion.button>
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* Inclusions Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-semibold text-slate-600 bg-white p-4 rounded-2xl border border-slate-100 shadow-xs">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-full bg-green-100 text-[#006837] flex items-center justify-center font-bold text-xs shrink-0">✓</div>
            <span>All Toll Taxes, Highway Charges & Parking Fees Included</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-full bg-green-100 text-[#006837] flex items-center justify-center font-bold text-xs shrink-0">✓</div>
            <span>Commercial License Driver Allowance & Fuel Included</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-full bg-green-100 text-[#006837] flex items-center justify-center font-bold text-xs shrink-0">✓</div>
            <span>No Hidden Surcharges or Night Pickup Extras</span>
          </div>
        </div>

      </div>
    </section>
  );
}


import React, { useState } from 'react';
import { motion } from 'motion/react';
import { MapPin, Navigation, Clock, Compass, Car, ArrowRight, Check } from 'lucide-react';

interface CircuitExplorerProps {
  onPlanCircuit: (circuitName?: string) => void;
}

const CIRCUITS = [
  {
    id: 'c-1',
    name: 'The Golden Triangle Heritage Circuit',
    tag: 'Spiritual & Architecture',
    km: '200 km Total',
    days: '3 - 4 Days',
    idealVehicle: 'Toyota Innova Crysta / Sedan',
    badge: 'Most Popular',
    stops: [
      { name: 'Bhubaneswar', desc: 'Temple City & Lingaraj Darshan' },
      { name: 'Dhauli & Pipili', desc: 'Peace Pagoda & Applique Village' },
      { name: 'Konark', desc: 'UNESCO Sun Temple Chariot' },
      { name: 'Puri', desc: 'Jagannath Dham & Golden Beach' },
    ],
    highlight: 'Experience Odisha’s 1,000-year-old stone temple architecture and divine blessings.',
  },
  {
    id: 'c-2',
    name: 'Wildlife & Eco-Wetlands Odyssey',
    tag: 'Ecotourism & Biosphere',
    km: '580 km Total',
    days: '5 - 6 Days',
    idealVehicle: 'Toyota Fortuner 4x4 / Force Urbania',
    badge: 'Nature Lovers',
    stops: [
      { name: 'Chilika Lake', desc: 'Satapada Dolphins & Sea Mouth' },
      { name: 'Bhitarkanika', desc: 'Mangrove Creeks & Crocodiles' },
      { name: 'Similipal', desc: 'Tiger Reserve & Waterfalls' },
    ],
    highlight: 'Asia’s largest brackish lagoon paired with national parks and rare wildlife safaris.',
  },
  {
    id: 'c-3',
    name: 'Kashmir of Odisha & Tribal Highlands',
    tag: 'Misty Hills & Culture',
    km: '680 km Total',
    days: '5 - 6 Days',
    idealVehicle: 'Force Urbania / Innova Crysta',
    badge: 'Offbeat Scenic',
    stops: [
      { name: 'Daringbadi', desc: 'Pine Valleys, Coffee & Frosty Hills' },
      { name: 'Rayagada', desc: 'Majighariani Temple & Valley Views' },
      { name: 'Koraput', desc: 'Weekly Tribal Haat & Duduma Falls' },
    ],
    highlight: 'Cool pine mountains, coffee gardens, and ancient indigenous cultural markets.',
  },
];

export default function CircuitExplorer({ onPlanCircuit }: CircuitExplorerProps) {
  const [activeCircuit, setActiveCircuit] = useState(CIRCUITS[0]);

  return (
    <section className="py-20 sm:py-24 bg-[#F5FAF6] relative overflow-hidden">
      
      {/* Background Graphic Grid */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(#006837 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-100 text-[#006837] text-xs font-bold uppercase tracking-wider mb-2">
            <Compass className="w-3.5 h-3.5" /> Odisha Route Guide
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-900">
            Odisha <span className="text-[#006837]">Travel Circuits</span> & Route Planner
          </h2>
          <p className="text-sm font-semibold text-slate-600 max-w-xl mx-auto mt-1">
            Pick a pre-charted regional travel circuit with optimized road connections, vehicle recommendations, and must-see landmarks.
          </p>
        </div>

        {/* 3 Circuit Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 mb-10">
          {CIRCUITS.map((circuit) => {
            const isSelected = activeCircuit.id === circuit.id;
            return (
              <div
                key={circuit.id}
                onClick={() => setActiveCircuit(circuit)}
                className={`bg-white rounded-3xl p-6 sm:p-7 border transition-all duration-300 flex flex-col justify-between cursor-pointer group shadow-sm hover:shadow-xl ${
                  isSelected ? 'border-[#006837] ring-2 ring-green-100 shadow-lg' : 'border-slate-100'
                }`}
              >
                <div>
                  {/* Top Badges */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full bg-green-50 text-[#006837] border border-green-200">
                      {circuit.badge}
                    </span>
                    <span className="text-xs font-bold text-slate-500">
                      {circuit.days}
                    </span>
                  </div>

                  {/* Circuit Name */}
                  <h3 className="text-lg font-black text-slate-900 group-hover:text-[#006837] transition-colors leading-snug mb-2">
                    {circuit.name}
                  </h3>

                  <p className="text-xs text-slate-600 font-medium leading-relaxed mb-5">
                    {circuit.highlight}
                  </p>

                  {/* Stops Timeline */}
                  <div className="space-y-2.5 mb-6 border-t border-slate-100 pt-4">
                    <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider block mb-1">
                      Route Stops ({circuit.km}):
                    </span>
                    {circuit.stops.map((stop, sIdx) => (
                      <div key={sIdx} className="flex items-start gap-2.5 text-xs text-slate-700">
                        <div className="w-5 h-5 rounded-full bg-green-100 text-[#006837] flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                          {sIdx + 1}
                        </div>
                        <div>
                          <strong className="text-slate-900 block font-bold leading-tight">
                            {stop.name}
                          </strong>
                          <span className="text-[11px] text-slate-500">
                            {stop.desc}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom Details */}
                <div className="border-t border-slate-100 pt-4 mt-auto">
                  <div className="flex items-center gap-2 text-xs font-semibold text-slate-600 mb-4 bg-[#F8FAF9] p-2.5 rounded-xl border border-slate-100">
                    <Car className="w-4 h-4 text-[#006837] shrink-0" />
                    <span>Recommended: <strong>{circuit.idealVehicle}</strong></span>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onPlanCircuit(circuit.name);
                    }}
                    className="w-full py-2.5 px-4 rounded-xl text-xs font-bold text-white bg-[#006837] hover:bg-[#008746] shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Plan This Circuit</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}


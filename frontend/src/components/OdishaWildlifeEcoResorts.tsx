import React from 'react';
import {
  Compass, MapPin, Waves, Trees, Sparkles,
  ArrowRight, ShieldCheck, Car, Check
} from 'lucide-react';

interface EcoDestination {
  id: string;
  name: string;
  title: string;
  distance: string;
  bestTime: string;
  image: string;
  badge: string;
  recommendedCar: string;
  highlights: string[];
  startingFare: number;
}

const ECO_DESTINATIONS: EcoDestination[] = [
  {
    id: 'chilika-dolphins',
    name: 'Chilika Lake & Satapada',
    title: 'Irrawaddy Dolphin Lagoon & Kalijai Island',
    distance: '105 km from Bhubaneswar (2.5 hrs)',
    bestTime: 'October to March (Migratory Birds)',
    image: '/banners/chilika_lake.png',
    badge: '🐬 Asia’s Largest Lagoon',
    recommendedCar: 'Swift Dzire / Innova Crysta',
    highlights: [
      'Cruising to witness rare Irrawaddy dolphins jumping',
      'Country boat ride to sacred Kalijai temple island',
      'Fresh Chilika crab & prawn culinary experience',
      'Sea mouth panoramic view at Satapada',
    ],
    startingFare: 2499,
  },
  {
    id: 'bhitarkanika-mangroves',
    name: 'Bhitarkanika National Park',
    title: 'Saltwater Crocodiles & Pristine Mangrove Safari',
    distance: '160 km from Bhubaneswar (3.5 hrs)',
    bestTime: 'November to February',
    image: '/banners/travel_fleet.png',
    badge: '🐊 Ramsar Wetland Site',
    recommendedCar: 'Innova Crysta / Force Urbania',
    highlights: [
      'India’s 2nd largest mangrove ecosystem boat safari',
      'Spotting 20-foot giant saltwater estuarine crocodiles',
      'Bagagahana bird sanctuary nesting over 20,000 birds',
      'Dangmal crocodile breeding research center visit',
    ],
    startingFare: 3800,
  },
  {
    id: 'similipal-tiger-reserve',
    name: 'Similipal Biosphere Reserve',
    title: 'Roaring Waterfalls & Dense Sal Forest Safari',
    distance: '270 km from Bhubaneswar (5.5 hrs)',
    bestTime: 'November to April',
    image: '/banners/bhubaneswar_city.png',
    badge: '🐅 UNESCO Tiger Reserve',
    recommendedCar: 'Toyota Fortuner 4x4 / Crysta',
    highlights: [
      'Spectacular Barehipani (399m) & Joranda waterfalls',
      'Dense untouched Sal forests & Royal Bengal Tigers',
      'Wild Asian elephant herds & medicinal plant biodiversity',
      'Chahala salt-lick wildlife observation tower',
    ],
    startingFare: 6500,
  },
  {
    id: 'daringbadi-hill-station',
    name: 'Daringbadi - Kashmir of Odisha',
    title: 'Misty Pine Hills, Coffee Plantations & Frost',
    distance: '250 km from Bhubaneswar (5.5 hrs)',
    bestTime: 'December to February (Sub-zero frost)',
    image: '/banners/konark_temple.png',
    badge: '🌲 3,000 Ft Hill Station',
    recommendedCar: 'Innova Crysta / Fortuner',
    highlights: [
      'Fragrant organic coffee plantations & black pepper farms',
      'Midubanda & Dasingbadi cascading forest waterfalls',
      'Lover’s Point & scenic Hill View pine park vistas',
      'Chilly winter mornings with natural morning frost',
    ],
    startingFare: 5500,
  },
];

interface OdishaWildlifeEcoResortsProps {
  onBookEcoTour?: (destination: string, vehicle: string, fare: number) => void;
}

export default function OdishaWildlifeEcoResorts({ onBookEcoTour }: OdishaWildlifeEcoResortsProps) {
  return (
    <section className="py-16 sm:py-20 bg-[#FAF8F5] relative overflow-hidden border-b border-slate-200/60">
      
      {/* Decorative Blur */}
      <div className="absolute top-0 right-1/4 w-80 h-80 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest text-[#006837] bg-emerald-50 border border-emerald-200 mb-3 shadow-xs">
            <Trees className="w-3.5 h-3.5 text-[#006837]" />
            Eco-Tourism &amp; Wilderness Circuits
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-black text-slate-900 tracking-tight leading-tight mb-4">
            Explore Odisha’s Wild Sanctuaries &amp;{' '}
            <span className="bg-gradient-to-r from-[#006837] to-[#004D26] bg-clip-text text-transparent">
              Untouched Nature
            </span>
          </h2>

          <p className="text-sm sm:text-base text-slate-600 font-medium leading-relaxed">
            From the leaping dolphins of Chilika to the misty pine hills of Daringbadi, travel through Odisha’s most breathtaking natural wonderlands with our all-terrain SUVs and experienced chauffeurs.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {ECO_DESTINATIONS.map((dest) => (
            <div
              key={dest.id}
              className="bg-white rounded-3xl overflow-hidden border border-slate-200/80 shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between"
            >
              <div>
                {/* Photo & Badge */}
                <div className="relative h-48 w-full overflow-hidden bg-slate-100">
                  <img
                    src={dest.image}
                    alt={dest.name}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
                  
                  <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-[10.5px] font-black uppercase tracking-wider bg-white/90 text-[#006837] backdrop-blur-md shadow-md">
                    {dest.badge}
                  </span>

                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <p className="text-[11px] font-bold text-amber-300 flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 shrink-0" />
                      <span className="truncate">{dest.distance}</span>
                    </p>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <h3 className="text-lg font-black text-slate-900 mb-1 leading-snug">
                    {dest.name}
                  </h3>
                  <p className="text-xs text-emerald-800 font-semibold mb-3">
                    {dest.title}
                  </p>

                  <div className="mb-4 py-1.5 px-2.5 rounded-lg bg-emerald-50/70 border border-emerald-100 text-[11px] text-[#006837] font-semibold">
                    🌿 Ideal: {dest.bestTime}
                  </div>

                  {/* Highlights */}
                  <div className="space-y-1.5 mb-5">
                    {dest.highlights.map((h, i) => (
                      <div key={i} className="flex items-start gap-1.5 text-xs text-slate-600 font-medium">
                        <Check className="w-3.5 h-3.5 text-[#006837] shrink-0 mt-0.5" />
                        <span className="leading-tight">{h}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Price & Action */}
              <div className="p-5 pt-0 border-t border-slate-100 mt-2 bg-slate-50/50">
                <div className="flex items-baseline justify-between pt-3 mb-3">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">
                      Starting Fare
                    </span>
                    <span className="text-2xl font-black text-[#006837]">
                      ₹{dest.startingFare.toLocaleString('en-IN')}
                    </span>
                  </div>
                  <span className="text-[10px] font-bold text-slate-600 bg-white px-2 py-0.5 rounded-md border border-slate-200">
                    {dest.recommendedCar.split('/')[0]}
                  </span>
                </div>

                <button
                  onClick={() => onBookEcoTour && onBookEcoTour(dest.name, dest.recommendedCar, dest.startingFare)}
                  className="w-full py-2.5 px-4 rounded-xl text-xs font-black uppercase tracking-wider text-white bg-[#006837] hover:bg-[#004D26] shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Book Safari Cab</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

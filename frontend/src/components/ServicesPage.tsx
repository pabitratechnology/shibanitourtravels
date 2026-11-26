import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import {
  Car, Bus, Users, Hotel, Plane, MapPin, Sparkles,
  CheckCircle2, Clock, ShieldCheck, Star, Phone, ArrowRight,
  ChevronRight, Calendar, DollarSign, Award, ThumbsUp, Send
} from 'lucide-react';
import PageHero from './PageHero.js';

interface ServicesPageProps {
  onBookService?: (serviceName?: string, vehicle?: string, pickup?: string, drop?: string) => void;
  defaultTab?: string;
}

type ServiceTabKey = 'cabs' | 'tours' | 'tempo' | 'hotels' | 'transit' | 'custom';

interface TabDefinition {
  id: ServiceTabKey;
  label: string;
  sub: string;
  icon: React.ReactNode;
}

const TABS: TabDefinition[] = [
  { id: 'cabs', label: 'Cab Rental & Taxi', sub: 'Local & Outstation', icon: <Car className="w-4 h-4" /> },
  { id: 'tours', label: 'Tour Packages', sub: 'Odisha & All India', icon: <Bus className="w-4 h-4" /> },
  { id: 'tempo', label: 'Tempo & Luxury Coaches', sub: '12, 17, 26 Seaters', icon: <Users className="w-4 h-4" /> },
  { id: 'hotels', label: 'Direct Hotel Booking', sub: 'Best Partner Rates', icon: <Hotel className="w-4 h-4" /> },
  { id: 'transit', label: 'Flight & Train Tickets', sub: 'Seamless Connections', icon: <Plane className="w-4 h-4" /> },
  { id: 'custom', label: 'Customized Travel Plans', sub: 'Bespoke Itineraries', icon: <MapPin className="w-4 h-4" /> },
];

/* ── CAB PACKAGES DATA ── */
const LOCAL_TAXI_PACKAGES = [
  { duration: '4 Hours / 40 Km', type: 'City Tour / Half Day', dzire: 1200, crysta: 1800, urbania: 3200 },
  { duration: '8 Hours / 80 Km', type: 'Full Day City Sightseeing', dzire: 2200, crysta: 3200, urbania: 5200 },
  { duration: '12 Hours / 120 Km', type: 'Extended City & Suburb', dzire: 3200, crysta: 4400, urbania: 6800 },
  { duration: 'Outstation Per Km', type: 'Round Trip (Min 250km/day)', dzire: 12, crysta: 18, urbania: 28 },
];

const POPULAR_CAB_ROUTES = [
  { from: 'Bhubaneswar', to: 'Puri Jagannath Temple', dist: '60 Km', oneWay: 1499, roundTrip: 1800, time: '1.5 hrs' },
  { from: 'Bhubaneswar', to: 'Konark Sun Temple', dist: '65 Km', oneWay: 1599, roundTrip: 1900, time: '1.5 hrs' },
  { from: 'Bhubaneswar', to: 'Chilika Lake (Satapada)', dist: '105 Km', oneWay: 2499, roundTrip: 2800, time: '2.5 hrs' },
  { from: 'Bhubaneswar (BBI Airport)', to: 'Puri Hotel Drop', dist: '65 Km', oneWay: 1599, roundTrip: 2100, time: '1.5 hrs' },
  { from: 'Bhubaneswar', to: 'Cuttack Silver City', dist: '30 Km', oneWay: 999, roundTrip: 1400, time: '45 mins' },
  { from: 'Bhubaneswar', to: 'Daringbadi (Hill Station)', dist: '250 Km', oneWay: 5499, roundTrip: 6500, time: '5.5 hrs' },
];

/* ── TOUR PACKAGES DATA ── */
const TOUR_PACKAGES_LIST = [
  {
    name: 'Odisha Golden Triangle Heritage Tour',
    duration: '3 Days / 2 Nights',
    route: 'Bhubaneswar – Puri – Konark',
    image: '/banners/konark_temple.png',
    price: 6499,
    highlights: ['Puri Jagannath Temple VIP Darshan', 'Konark Sun Temple UNESCO Light Show', 'Dhauli Peace Pagoda & Khandagiri Caves', 'Chandrabhaga Beach Sunset'],
  },
  {
    name: 'Chilika Lake & Coastal Wildlife Odyssey',
    duration: '4 Days / 3 Nights',
    route: 'Bhubaneswar – Puri – Satapada – Gopalpur',
    image: '/banners/chilika_lake.png',
    price: 9999,
    highlights: ['Irrawaddy Dolphins Boat Safari', 'Kalijai Island Temple Visit', 'Gopalpur on Sea Beach Resort Stay', 'Tampara Lake Water Activities'],
  },
  {
    name: 'Wild Odisha Tiger & Mangrove Safari',
    duration: '5 Days / 4 Nights',
    route: 'Bhubaneswar – Bhitarkanika – Similipal',
    image: '/banners/bhubaneswar_city.png',
    price: 14999,
    highlights: ['Saltwater Crocodile Mangrove Cruise', 'Similipal Tiger Reserve Forest Safari', 'Barehipani (399m) Cascading Falls', 'Nature Camp Accommodation'],
  },
  {
    name: 'Daringbadi Hill Station & Tribal Valleys',
    duration: '4 Days / 3 Nights',
    route: 'Bhubaneswar – Daringbadi – Phulbani',
    image: '/banners/travel_fleet.png',
    price: 8999,
    highlights: ['Pine Forest & Organic Coffee Plantations', 'Midubanda & Dasingbadi Waterfalls', 'Emu Bird Farm & Lover’s Point', 'Winter Morning Frost Landscapes'],
  },
];

/* ── TEMPO & LUXURY FLEET DATA ── */
const GROUP_FLEET = [
  {
    name: 'Force Urbania Luxury (17 Seater)',
    tag: 'Executive VVIP Class',
    seats: '17 Pushback Captain Recliners',
    rate: '₹28/km',
    image: '/images/force_urbania_wide.png',
    features: ['Panoramic View Windows', 'Triple AC Vents', 'Ambient LED Mood Lights', 'Individual Mobile USB Charging'],
  },
  {
    name: 'Force Maharaja Tempo Traveller (12/17 Seater)',
    tag: 'Group Pilgrimage Favorite',
    seats: '12 – 17 Reclining Pushback Seats',
    rate: '₹22/km',
    image: '/images/tempo_traveller_wide.png',
    features: ['Chilled AC Cabin', 'Ample Luggage Boot (15+ Bags)', 'Music System & PA Mic', 'Emergency First-Aid Kit'],
  },
  {
    name: 'Executive Deluxe Coach (26 Seater)',
    tag: 'Corporate & Wedding Fleet',
    seats: '26 Luxurious Pushback Seats',
    rate: '₹34/km',
    image: '/banners/travel_fleet.png',
    features: ['Air Suspension for Bumpy Roads', 'Overhead Luggage Racks', 'Curtained Windows & PA System', 'Trained Highway Driver'],
  },
  {
    name: 'Volvo Multi-Axle Sovereign Coach (45-53 Seater)',
    tag: 'Grand Tour & Conference',
    seats: '45 – 53 Semi-Sleeper Recliners',
    rate: '₹55/km',
    image: '/banners/travel_fleet.png',
    features: ['Full Air Suspension Luxury Ride', 'Twin LCD Video Screens', 'Chilled Mineral Water Dispenser', 'Spacious Cargo Underbelly'],
  },
];

/* ── HOTEL PARTNERS DATA ── */
const PARTNER_HOTELS = [
  {
    city: 'Puri',
    hotel: 'Mayfair Waves / Heritage Puri',
    type: '5-Star Beach Luxury Resort',
    rate: 'From ₹4,500/night',
    discount: 'Save 20% via Shibani',
    perks: ['Sea-Facing Balcony', 'Temple Darshan Shuttle', 'Complimentary Buffet Breakfast'],
  },
  {
    city: 'Bhubaneswar',
    hotel: 'Hotel Swosti Premium / Trident',
    type: '5-Star Business & Luxury',
    rate: 'From ₹3,800/night',
    discount: 'Save 25% Corporate Rate',
    perks: ['Swimming Pool & Gym', 'Airport Pickup Included', 'High-Speed Wi-Fi'],
  },
  {
    city: 'Konark',
    hotel: 'Lotus Eco Beach Resort',
    type: 'Eco-Cottages on Ramachandi Beach',
    rate: 'From ₹3,200/night',
    discount: 'Direct Partner Price',
    perks: ['Private Beach Access', 'Watersports Discounts', 'Authentic Odia Seafood'],
  },
  {
    city: 'Gopalpur',
    hotel: 'Mayfair Palm Beach Resort',
    type: 'Heritage Colonial Beachfront Resort',
    rate: 'From ₹5,200/night',
    discount: 'Exclusive Leisure Deal',
    perks: ['Private Beach Cabanas', 'Sea-View Dining', 'Spa & Wellness Center'],
  },
];

export default function ServicesPage({ onBookService }: ServicesPageProps) {
  const location = useLocation();
  const navigate = useNavigate();

  // Parse tab from URL search or default to 'cabs'
  const [activeTab, setActiveTab] = useState<ServiceTabKey>('cabs');

  // Custom Itinerary form state
  const [customForm, setCustomForm] = useState({
    name: '',
    phone: '',
    destinations: 'Puri, Konark, Chilika',
    days: '3 Days',
    travelers: '4 Persons',
    vehicle: 'Innova Crysta',
    notes: '',
  });
  const [customSubmitted, setCustomSubmitted] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const tabParam = params.get('tab') as ServiceTabKey;
    if (tabParam && TABS.some(t => t.id === tabParam)) {
      setActiveTab(tabParam);
    }
  }, [location.search]);

  const handleSelectTab = (tabId: ServiceTabKey) => {
    setActiveTab(tabId);
    navigate(`/services?tab=${tabId}`, { replace: true });
    window.scrollTo({ top: 320, behavior: 'smooth' });
  };

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customForm.name || !customForm.phone) return;
    setCustomSubmitted(true);
    if (onBookService) {
      onBookService(
        `Custom Plan: ${customForm.destinations}`,
        customForm.vehicle,
        'Bhubaneswar',
        customForm.destinations
      );
    }
  };

  return (
    <div className="bg-[#FAF8F5] min-h-screen text-slate-800">
      
      {/* ══ PAGE HERO ══ */}
      <PageHero
        title="Comprehensive Travel Solutions Across Odisha"
        subtitle="From seamless taxi rentals and spiritual yatras to luxury coaches, partner hotels, and customized group itineraries."
        tag="All-in-One Travel Partner"
        backgroundImage="/banners/hero_travel_fleet_panoramic.jpg"
        stats={[
          { value: '80+', label: 'GPS Vehicles' },
          { value: '5,000+', label: 'Happy Travelers' },
          { value: '24/7', label: 'Support Desk' },
          { value: '100%', label: 'On-Time Promise' },
        ]}
      />

      {/* ══ 6 TABS NAVIGATION STRIP ══ */}
      <div className="sticky top-[100px] sm:top-[108px] z-30 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <div className="flex items-center gap-2 sm:gap-3 overflow-x-auto scrollbar-none py-3">
            {TABS.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => handleSelectTab(tab.id)}
                  className={`flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-black whitespace-nowrap transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#006837] text-white shadow-md shadow-emerald-950/20 ring-2 ring-[#006837]/30'
                      : 'bg-slate-50 text-slate-700 hover:bg-slate-100 hover:text-[#006837] border border-slate-200/60'
                  }`}
                >
                  <span className={isActive ? 'text-amber-300' : 'text-slate-500'}>
                    {tab.icon}
                  </span>
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ══ ACTIVE TAB CONTENT SECTION ══ */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-12 sm:py-16">
        
        {/* ── TAB 1: CAB RENTAL & TAXI SERVICE ── */}
        {activeTab === 'cabs' && (
          <div className="space-y-12 animate-fade-in">
            {/* Header */}
            <div className="text-center max-w-3xl mx-auto">
              <span className="text-xs font-black uppercase tracking-widest text-[#006837] bg-emerald-50 border border-emerald-200 px-3.5 py-1 rounded-full mb-3 inline-block">
                Service #1
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mb-3">
                Cab Rental &amp; Taxi Service in Odisha
              </h2>
              <p className="text-sm sm:text-base text-slate-600 font-medium">
                Transparent local city rentals, outstation road trips, and 24/7 BBI airport taxi transfers with verified uniformed chauffeurs.
              </p>
            </div>

            {/* Local Packages Grid */}
            <div>
              <h3 className="text-xl font-black text-slate-900 mb-6 flex items-center gap-2">
                <Clock className="w-5 h-5 text-[#006837]" />
                Hourly Local Rental Rate Matrix (Bhubaneswar / Cuttack / Puri)
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {LOCAL_TAXI_PACKAGES.map((pkg, i) => (
                  <div key={i} className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-md hover:shadow-xl transition-all">
                    <span className="text-[10px] font-black uppercase text-amber-700 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200 mb-2 inline-block">
                      {pkg.type}
                    </span>
                    <h4 className="text-lg font-black text-slate-900 mb-4">{pkg.duration}</h4>
                    <div className="space-y-2.5 border-t border-slate-100 pt-3 text-xs">
                      <div className="flex justify-between items-center">
                        <span className="text-slate-600 font-medium">Swift Dzire (Sedan):</span>
                        <strong className="text-[#006837] font-black text-sm">₹{pkg.dzire}</strong>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-slate-600 font-medium">Innova Crysta (7S):</span>
                        <strong className="text-[#006837] font-black text-sm">₹{pkg.crysta}</strong>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-slate-600 font-medium">Force Urbania (17S):</span>
                        <strong className="text-[#006837] font-black text-sm">₹{pkg.urbania}</strong>
                      </div>
                    </div>
                    <button
                      onClick={() => onBookService && onBookService('Local Cab Rental', 'Swift Dzire', 'Bhubaneswar', pkg.duration)}
                      className="mt-6 w-full py-2.5 rounded-xl bg-[#006837] hover:bg-[#004D26] text-white text-xs font-black uppercase tracking-wider transition-all shadow-md cursor-pointer"
                    >
                      Book This Plan
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Popular Outstation Routes Matrix */}
            <div>
              <h3 className="text-xl font-black text-slate-900 mb-6 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-[#006837]" />
                Popular Outstation Routes &amp; Fixed Fares
              </h3>
              <div className="bg-white rounded-3xl border border-slate-200/80 shadow-md overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs sm:text-sm">
                    <thead className="bg-[#004D26] text-white uppercase text-[11px] font-black tracking-wider">
                      <tr>
                        <th className="py-4 px-6">Route</th>
                        <th className="py-4 px-4">Distance</th>
                        <th className="py-4 px-4">Estimated Travel Time</th>
                        <th className="py-4 px-4">Sedan One-Way</th>
                        <th className="py-4 px-4">Sedan Round-Trip</th>
                        <th className="py-4 px-6 text-right">Instant Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                      {POPULAR_CAB_ROUTES.map((route, i) => (
                        <tr key={i} className="hover:bg-slate-50 transition-colors">
                          <td className="py-3.5 px-6 font-bold text-slate-900">
                            {route.from} ➔ <span className="text-[#006837] font-black">{route.to}</span>
                          </td>
                          <td className="py-3.5 px-4 font-mono">{route.dist}</td>
                          <td className="py-3.5 px-4">{route.time}</td>
                          <td className="py-3.5 px-4 font-black text-[#006837]">₹{route.oneWay.toLocaleString('en-IN')}</td>
                          <td className="py-3.5 px-4 font-black text-slate-900">₹{route.roundTrip.toLocaleString('en-IN')}</td>
                          <td className="py-3.5 px-6 text-right">
                            <button
                              onClick={() => onBookService && onBookService(`Outstation: ${route.to}`, 'Swift Dzire', route.from, route.to)}
                              className="px-3.5 py-1.5 rounded-lg bg-[#006837] hover:bg-[#004D26] text-white text-xs font-bold transition-all shadow-xs cursor-pointer"
                            >
                              Book Cab
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── TAB 2: TOUR PACKAGES ── */}
        {activeTab === 'tours' && (
          <div className="space-y-12 animate-fade-in">
            <div className="text-center max-w-3xl mx-auto">
              <span className="text-xs font-black uppercase tracking-widest text-[#006837] bg-emerald-50 border border-emerald-200 px-3.5 py-1 rounded-full mb-3 inline-block">
                Service #2
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mb-3">
                Odisha &amp; All-India Guided Tour Packages
              </h2>
              <p className="text-sm sm:text-base text-slate-600 font-medium">
                Complete all-inclusive holiday itineraries featuring private AC chauffeur transport, verified hotel stays, guided temple darshans, and sightseeing.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {TOUR_PACKAGES_LIST.map((pkg, idx) => (
                <div key={idx} className="bg-white rounded-3xl overflow-hidden border border-slate-200/80 shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col justify-between">
                  <div>
                    <div className="relative h-48 w-full bg-slate-100 overflow-hidden">
                      <img src={pkg.image} alt={pkg.name} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                      <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-white/90 text-[#006837] text-[10.5px] font-black uppercase">
                        {pkg.duration}
                      </span>
                      <div className="absolute bottom-3 left-3 text-white text-xs font-bold">
                        {pkg.route}
                      </div>
                    </div>

                    <div className="p-5">
                      <h3 className="text-base font-black text-slate-900 leading-snug mb-3">
                        {pkg.name}
                      </h3>
                      <div className="space-y-2 mb-4">
                        {pkg.highlights.map((h, i) => (
                          <div key={i} className="flex items-start gap-2 text-xs text-slate-600 font-medium">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#006837] shrink-0 mt-0.5" />
                            <span>{h}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="p-5 pt-0 border-t border-slate-100 mt-2 bg-slate-50/50">
                    <div className="flex items-baseline justify-between pt-3 mb-3">
                      <div>
                        <span className="text-[10px] uppercase font-bold text-slate-400 block">Starting From</span>
                        <span className="text-2xl font-black text-[#006837]">₹{pkg.price.toLocaleString('en-IN')}</span>
                      </div>
                      <span className="text-[10.5px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                        Per Person (Twin Share)
                      </span>
                    </div>
                    <button
                      onClick={() => onBookService && onBookService(pkg.name, 'Innova Crysta', 'Bhubaneswar', pkg.route)}
                      className="w-full py-2.5 rounded-xl bg-[#006837] hover:bg-[#004D26] text-white text-xs font-black uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <span>Book Package</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── TAB 3: TEMPO TRAVELLER & LUXURY COACHES ── */}
        {activeTab === 'tempo' && (
          <div className="space-y-12 animate-fade-in">
            <div className="text-center max-w-3xl mx-auto">
              <span className="text-xs font-black uppercase tracking-widest text-[#006837] bg-emerald-50 border border-emerald-200 px-3.5 py-1 rounded-full mb-3 inline-block">
                Service #3
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mb-3">
                Tempo Traveller &amp; Luxury Coaches
              </h2>
              <p className="text-sm sm:text-base text-slate-600 font-medium">
                Odisha’s largest premium group travel fleet: 12-seater Maharaja Tempo Travellers, 17-seater Force Urbanias, 26-seater executive coaches, and Volvo sleeper buses.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {GROUP_FLEET.map((vehicle, idx) => (
                <div key={idx} className="bg-white rounded-3xl overflow-hidden border border-slate-200/80 shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col justify-between">
                  <div>
                    <div className="relative h-48 w-full bg-slate-100 overflow-hidden">
                      <img src={vehicle.image} alt={vehicle.name} className="w-full h-full object-cover" />
                      <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-[#006837] text-white text-[10.5px] font-black uppercase tracking-wider">
                        {vehicle.tag}
                      </span>
                    </div>

                    <div className="p-5">
                      <h3 className="text-base font-black text-slate-900 mb-1">{vehicle.name}</h3>
                      <p className="text-xs font-bold text-amber-700 mb-3">{vehicle.seats}</p>
                      <div className="space-y-1.5 mb-4">
                        {vehicle.features.map((f, i) => (
                          <div key={i} className="flex items-center gap-2 text-xs text-slate-600 font-medium">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#006837] shrink-0" />
                            <span>{f}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="p-5 pt-0 border-t border-slate-100 mt-2 bg-slate-50/50">
                    <div className="flex items-baseline justify-between pt-3 mb-3">
                      <span className="text-xs font-bold text-slate-500">Outstation Rate:</span>
                      <span className="text-xl font-black text-[#006837]">{vehicle.rate}</span>
                    </div>
                    <button
                      onClick={() => onBookService && onBookService(vehicle.name, vehicle.name, 'Bhubaneswar', 'Group Tour')}
                      className="w-full py-2.5 rounded-xl bg-[#006837] hover:bg-[#004D26] text-white text-xs font-black uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <span>Reserve Vehicle</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── TAB 4: DIRECT HOTEL BOOKING ── */}
        {activeTab === 'hotels' && (
          <div className="space-y-12 animate-fade-in">
            <div className="text-center max-w-3xl mx-auto">
              <span className="text-xs font-black uppercase tracking-widest text-[#006837] bg-emerald-50 border border-emerald-200 px-3.5 py-1 rounded-full mb-3 inline-block">
                Service #4
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mb-3">
                Direct Hotel Booking with Verified Partner Rates
              </h2>
              <p className="text-sm sm:text-base text-slate-600 font-medium">
                Take advantage of Shibani Travels’ direct partner contracts with 5-star resorts, heritage villas, and beach hotels across Puri, Bhubaneswar, Konark, and Gopalpur.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {PARTNER_HOTELS.map((hotel, idx) => (
                <div key={idx} className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-md hover:shadow-xl transition-all flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-emerald-50 text-[#006837] border border-emerald-200">
                        {hotel.city}
                      </span>
                      <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                        {hotel.discount}
                      </span>
                    </div>

                    <h3 className="text-base font-black text-slate-900 mb-1">{hotel.hotel}</h3>
                    <p className="text-xs text-slate-500 font-semibold mb-4">{hotel.type}</p>

                    <div className="space-y-2 mb-6">
                      {hotel.perks.map((p, i) => (
                        <div key={i} className="flex items-center gap-2 text-xs text-slate-600 font-medium">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#006837] shrink-0" />
                          <span>{p}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="border-t border-slate-100 pt-4">
                    <div className="text-lg font-black text-[#006837] mb-3">{hotel.rate}</div>
                    <button
                      onClick={() => onBookService && onBookService(`Hotel: ${hotel.hotel}`, 'N/A', hotel.city, 'Hotel Booking')}
                      className="w-full py-2.5 rounded-xl bg-[#006837] hover:bg-[#004D26] text-white text-xs font-black uppercase tracking-wider transition-all shadow-md cursor-pointer"
                    >
                      Book Partner Hotel
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── TAB 5: FLIGHT & TRAIN BOOKING ── */}
        {activeTab === 'transit' && (
          <div className="space-y-12 animate-fade-in max-w-4xl mx-auto">
            <div className="text-center">
              <span className="text-xs font-black uppercase tracking-widest text-[#006837] bg-emerald-50 border border-emerald-200 px-3.5 py-1 rounded-full mb-3 inline-block">
                Service #5
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mb-3">
                Flight &amp; Train Ticketing Assistance
              </h2>
              <p className="text-sm sm:text-base text-slate-600 font-medium">
                Seamless multimodal connections. Domestic flights to/from Bhubaneswar BBI airport and confirmed IRCTC train ticket reservations paired with airport cab drops.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Flight Card */}
              <div className="bg-white rounded-3xl p-7 border border-slate-200/80 shadow-md">
                <div className="w-12 h-12 rounded-2xl bg-sky-50 border border-sky-200 flex items-center justify-center text-sky-700 mb-4">
                  <Plane className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-black text-slate-900 mb-2">Domestic Flights (BBI Airport)</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium mb-4">
                  Direct connectivity between Bhubaneswar and New Delhi, Mumbai, Bengaluru, Hyderabad, Kolkata, Chennai. Zero convenience fee for tour guests.
                </p>
                <div className="space-y-2 mb-6 text-xs text-slate-700 font-medium">
                  <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#006837]" /> Group flight discount rates</div>
                  <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#006837]" /> Baggage &amp; web check-in support</div>
                  <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#006837]" /> Airport VIP Chauffeur pickup combo</div>
                </div>
                <button
                  onClick={() => onBookService && onBookService('Flight Booking Assistance', 'Sedan Airport Drop', 'BBI Airport', 'Destination City')}
                  className="w-full py-3 rounded-xl bg-[#006837] hover:bg-[#004D26] text-white text-xs font-black uppercase tracking-wider transition-all shadow-md cursor-pointer"
                >
                  Request Flight Tickets
                </button>
              </div>

              {/* Train Card */}
              <div className="bg-white rounded-3xl p-7 border border-slate-200/80 shadow-md">
                <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-700 mb-4">
                  <Bus className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-black text-slate-900 mb-2">IRCTC Train Reservations</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium mb-4">
                  Authorized IRCTC train ticketing desk for Vande Bharat Express, Rajdhani, and express trains connecting Puri, Bhubaneswar, Cuttack, and all India.
                </p>
                <div className="space-y-2 mb-6 text-xs text-slate-700 font-medium">
                  <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#006837]" /> Tatkal booking assistance</div>
                  <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#006837]" /> Puri/Bhubaneswar station transfer cabs</div>
                  <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#006837]" /> Confirmed berth allocation guidance</div>
                </div>
                <button
                  onClick={() => onBookService && onBookService('Train Ticket Assistance', 'Station Cab Drop', 'Bhubaneswar Station', 'Destination')}
                  className="w-full py-3 rounded-xl bg-[#006837] hover:bg-[#004D26] text-white text-xs font-black uppercase tracking-wider transition-all shadow-md cursor-pointer"
                >
                  Request Train Tickets
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ── TAB 6: CUSTOMIZED TRAVEL PLANS ── */}
        {activeTab === 'custom' && (
          <div className="space-y-12 animate-fade-in max-w-3xl mx-auto">
            <div className="text-center">
              <span className="text-xs font-black uppercase tracking-widest text-[#006837] bg-emerald-50 border border-emerald-200 px-3.5 py-1 rounded-full mb-3 inline-block">
                Service #6
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mb-3">
                Customized Travel Plans &amp; Group Itineraries
              </h2>
              <p className="text-sm sm:text-base text-slate-600 font-medium">
                Tell us your travel dream, group size, and preferred dates. Our senior Odisha travel designers will curate a personalized roadmap within 2 hours.
              </p>
            </div>

            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xl">
              {customSubmitted ? (
                <div className="text-center py-10">
                  <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center mx-auto mb-4 text-[#006837]">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-black text-slate-900 mb-2">Custom Itinerary Request Logged!</h3>
                  <p className="text-sm text-slate-600 font-medium max-w-md mx-auto mb-6">
                    Thank you {customForm.name}. Our senior destination planner is drafting your personalized travel itinerary and calling you shortly.
                  </p>
                  <button
                    onClick={() => setCustomSubmitted(false)}
                    className="px-6 py-2.5 rounded-xl bg-[#006837] text-white text-xs font-black uppercase tracking-wider"
                  >
                    Submit Another Request
                  </button>
                </div>
              ) : (
                <form onSubmit={handleCustomSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-black uppercase text-slate-700 mb-1">Your Full Name</label>
                      <input
                        type="text"
                        required
                        value={customForm.name}
                        onChange={(e) => setCustomForm({ ...customForm, name: e.target.value })}
                        placeholder="Rajesh Pattnaik"
                        className="w-full px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold border border-slate-200 bg-slate-50 focus:bg-white focus:border-[#006837] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-black uppercase text-slate-700 mb-1">Phone / WhatsApp Number</label>
                      <input
                        type="tel"
                        required
                        value={customForm.phone}
                        onChange={(e) => setCustomForm({ ...customForm, phone: e.target.value })}
                        placeholder="+91 98611 17168"
                        className="w-full px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold border border-slate-200 bg-slate-50 focus:bg-white focus:border-[#006837] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-black uppercase text-slate-700 mb-1">Trip Duration</label>
                      <select
                        value={customForm.days}
                        onChange={(e) => setCustomForm({ ...customForm, days: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold border border-slate-200 bg-slate-50 focus:bg-white focus:border-[#006837] focus:outline-none cursor-pointer"
                      >
                        <option>2 Days / 1 Night</option>
                        <option>3 Days / 2 Nights</option>
                        <option>4 Days / 3 Nights</option>
                        <option>5 Days / 4 Nights</option>
                        <option>7+ Days Extended</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-black uppercase text-slate-700 mb-1">Group Size</label>
                      <select
                        value={customForm.travelers}
                        onChange={(e) => setCustomForm({ ...customForm, travelers: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold border border-slate-200 bg-slate-50 focus:bg-white focus:border-[#006837] focus:outline-none cursor-pointer"
                      >
                        <option>Solo / Couple (1-2 Persons)</option>
                        <option>Small Family (3-4 Persons)</option>
                        <option>Large Family (5-7 Persons)</option>
                        <option>Group Tour (8-16 Persons)</option>
                        <option>Corporate / Wedding (20+ Persons)</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-black uppercase text-slate-700 mb-1">Preferred Vehicle</label>
                      <select
                        value={customForm.vehicle}
                        onChange={(e) => setCustomForm({ ...customForm, vehicle: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold border border-slate-200 bg-slate-50 focus:bg-white focus:border-[#006837] focus:outline-none cursor-pointer"
                      >
                        <option>Swift Dzire (Sedan)</option>
                        <option>Toyota Innova Crysta</option>
                        <option>Toyota Fortuner 4x4</option>
                        <option>Force Urbania (17S)</option>
                        <option>Tempo Traveller (12/17S)</option>
                        <option>Volvo Luxury Coach</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-black uppercase text-slate-700 mb-1">Places You Want to Visit</label>
                    <input
                      type="text"
                      value={customForm.destinations}
                      onChange={(e) => setCustomForm({ ...customForm, destinations: e.target.value })}
                      placeholder="e.g. Puri Jagannath Temple, Konark, Chilika, Daringbadi"
                      className="w-full px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold border border-slate-200 bg-slate-50 focus:bg-white focus:border-[#006837] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-black uppercase text-slate-700 mb-1">Special Requirements (Optional)</label>
                    <textarea
                      rows={3}
                      value={customForm.notes}
                      onChange={(e) => setCustomForm({ ...customForm, notes: e.target.value })}
                      placeholder="Elderly passenger wheelchair support, hotel star preference, food requirements..."
                      className="w-full px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold border border-slate-200 bg-slate-50 focus:bg-white focus:border-[#006837] focus:outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-xl bg-[#006837] hover:bg-[#004D26] text-white text-xs sm:text-sm font-black uppercase tracking-wider transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    <span>Generate Custom Itinerary Quote</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        )}

      </div>

    </div>
  );
}

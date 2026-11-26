import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Car, Map, Search, ChevronRight, ChevronLeft,
  Volume2, Music, MapPin, Calendar, Clock,
  User, Phone, ShieldCheck, Check, Sparkles, ArrowRight, Users, Play
} from 'lucide-react';
import { ambientAudio } from '../utils/ambientAudio.js';
import { ALL_ODISHA_LOCATIONS, POPULAR_QUICK_LOCATIONS, OdishaLocationItem } from '../data/allOdishaLocations.js';

interface HeroProps {
  onBookNow: (pickup?: string, drop?: string, date?: string, journeyType?: string, name?: string, phone?: string) => void;
  onExploreFleet?: () => void;
  onEstimateTrip?: () => void;
}

/* ── PRIMARY SERVICE TABS (Patra Travels Inspired - Focused Exclusively on Cabs & Tours) ── */
type ServiceTab = 'taxi' | 'packages';

interface ServiceTabConfig {
  id: ServiceTab;
  label: string;
  icon: React.ReactNode;
  activeColor: string;
  badge: string;
}

const SERVICE_TABS: ServiceTabConfig[] = [
  { id: 'taxi', label: 'Cabs & Taxi Rental', icon: <Car className="w-5 h-5 stroke-[2.5]" />, activeColor: '#006837', badge: 'Instant Cab' },
  { id: 'packages', label: 'Odisha Tour Packages', icon: <Map className="w-5 h-5 stroke-[2.5]" />, activeColor: '#004D26', badge: '30+ Circuits' },
];

/* ── TAXI TRIP MODES ── */
type TaxiMode = 'outstation' | 'local' | 'airport' | 'one-way' | 'round-trip';

const TAXI_MODES: { id: TaxiMode; label: string }[] = [
  { id: 'outstation', label: 'Outstation Trip' },
  { id: 'local', label: 'Local City Tour' },
  { id: 'airport', label: 'Airport Transfer' },
  { id: 'one-way', label: 'One Way Drop' },
  { id: 'round-trip', label: 'Round Trip' },
];

/* ── POPULAR ODISHA TOUR PACKAGES CIRCUITS ── */
const POPULAR_TOUR_CIRCUITS = [
  'Puri - Konark - Bhubaneswar (Golden Triangle 3D/2N)',
  'Divine Puri Jagannath VIP Pilgrimage (2D/1N)',
  'Chilika Lake & Satapada Dolphin Eco Safari (2D/1N)',
  'Daringbadi (Kashmir of Odisha) Hill Tour (3D/2N)',
  'Similipal Tiger Reserve & Waterfall Safari (3D/2N)',
  'Bhitarkanika Mangroves & Crocodile Sanctuary (2D/1N)',
  'Ghatgaon Maa Tarini & Keonjhar Heritage (2D/1N)',
  'Gopalpur on Sea & Taratarini Temple Tour (2D/1N)',
];

/* ── VEHICLE TIERS ── */
const VEHICLE_TIERS = [
  { id: 'sedan', name: 'Swift Dzire', category: 'Sedan (4 Seats)', rateMultiplier: 1.0, rate: '₹12/km' },
  { id: 'innova', name: 'Innova Crysta', category: 'SUV (7 Seats)', rateMultiplier: 1.45, rate: '₹18/km' },
  { id: 'urbania', name: 'Force Urbania', category: 'Van (17 Seats)', rateMultiplier: 2.2, rate: '₹28/km' },
  { id: 'tempo', name: 'Tempo Traveller', category: 'Minibus (12-26 Seats)', rateMultiplier: 1.85, rate: '₹22/km' },
];

const LOCAL_DURATIONS = [
  { label: '4 Hours / 40 Km (City Tour)', fare: 1200 },
  { label: '8 Hours / 80 Km (Full Day)', fare: 2200 },
  { label: '12 Hours / 120 Km (Extended Sightseeing)', fare: 3200 },
];

const TIME_OPTIONS = [
  '06:00 AM', '07:00 AM', '08:00 AM', '09:00 AM',
  '10:00 AM', '11:00 AM', '12:00 PM', '01:00 PM',
  '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM',
  '06:00 PM', '07:00 PM', '08:00 PM', '09:00 PM',
];

/* ── HIGH-DEFINITION PANORAMIC HERO BACKGROUND SCENES (6 Curated Photos) ── */
const HERO_BACKGROUND_SCENES = [
  {
    id: 'shibani-panoramic-odisha',
    script: 'One Stop Travel Solution',
    title: 'Odisha’s Premier Cab Rental & Tour Packages',
    subtitle: 'Book Verified Taxis & Curated Itineraries Across Odisha',
    badge: '🌟 Shibani Grand Panoramic Odisha',
    bg: '/banners/shibani_hero_panoramic.jpg',
    mobileBg: '/banners/hero_mobile_shibani_odisha.jpg',
  },
  {
    id: 'ai-coastal-odyssey',
    script: 'Odisha Coastal Marine Drive',
    title: 'Scenic Marine Drive & Luxury Fleet',
    subtitle: 'Puri to Konark Coastal Marine Drive in Supreme Comfort',
    badge: '🌊 Marine Drive Highway',
    bg: '/banners/ai_hero_coastal_highway.jpg',
    mobileBg: '/banners/hero_mobile_coastal_marine_drive.jpg',
  },
  {
    id: 'lord-jagannath-blessing',
    script: 'Dedicated to Mahaprabhu Shri Jagannath',
    title: 'Sacred Blessings for Every Road Journey',
    subtitle: 'Daily VIP Puri Jagannath Temple Pilgrimages & Heritage Tours',
    badge: '🙏 Shree Mandir Puri Dham',
    bg: '/banners/lord_jagannath_puri.png',
    mobileBg: '/banners/lord_jagannath_puri.png',
  },
  {
    id: 'konark-sun-temple',
    script: 'UNESCO World Heritage Tour',
    title: 'Konark Sun Temple & Golden Beach',
    subtitle: '13th-Century Kalinga Architecture & Heritage Circuit',
    badge: '🏛️ UNESCO Konark Sun Temple',
    bg: '/banners/hero_konark_panoramic.jpg',
    mobileBg: '/banners/konark_temple.png',
  },
  {
    id: 'chilika-lake-lagoon',
    script: 'Asia’s Largest Brackish Water Lagoon',
    title: 'Chilika Lake, Satapada & Irrawaddy Dolphins',
    subtitle: 'Serene Island Boat Safaris & Coastal Eco-Resorts',
    badge: '🐬 Chilika Lake Eco-Tour',
    bg: '/banners/hero_chilika_lake_panoramic.jpg',
    mobileBg: '/banners/chilika_lake.png',
  },
  {
    id: 'luxury-fleet-coaches',
    script: '80+ GPS-Enabled Fleet Across Odisha',
    title: 'Travel in Comfort. Ride with Confidence.',
    subtitle: 'Volvo Coaches, Force Urbanias, Innova Crysta & Wedding Cars',
    badge: '🚌 Shibani 80+ Luxury Fleet',
    bg: '/banners/hero_travel_fleet_panoramic.jpg',
    mobileBg: '/banners/travel_fleet.png',
  },
];

export default function Hero({ onBookNow, onExploreFleet, onEstimateTrip }: HeroProps) {
  void onExploreFleet;
  void onEstimateTrip;

  // Service Tab State
  const [activeTab, setActiveTab] = useState<ServiceTab>('taxi');
  const [taxiMode, setTaxiMode] = useState<TaxiMode>('outstation');
  const [selectedVehicle, setSelectedVehicle] = useState('innova');

  // Route Form Fields
  const [pickupCity, setPickupCity] = useState('Bhubaneswar Airport (BBI)');
  const [destination, setDestination] = useState('Puri Jagannath Temple & Swargadwar');
  const [duration, setDuration] = useState('8 Hours / 80 Km (Full Day)');
  const [packageCircuit, setPackageCircuit] = useState('Puri - Konark - Bhubaneswar (Golden Triangle 3D/2N)');

  // Date & Time
  const [pickupDate, setPickupDate] = useState(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  });
  const [pickupTime, setPickupTime] = useState('08:00 AM');

  // Simple Guest Contact info right on the Hero card
  const [guestName, setGuestName] = useState('');
  const [guestPhone, setGuestPhone] = useState('');
  const [guests, setGuests] = useState('1 Traveller');

  // Dropdown States
  const [pickupOpen, setPickupOpen] = useState(false);
  const [destOpen, setDestOpen] = useState(false);
  const [durationOpen, setDurationOpen] = useState(false);
  const [timeOpen, setTimeOpen] = useState(false);
  const [guestsOpen, setGuestsOpen] = useState(false);
  const [vehicleOpen, setVehicleOpen] = useState(false);

  // Background Slider State (6 Scenic Banners)
  const [bgIdx, setBgIdx] = useState(0);

  // Background Ambient Sound State
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  useEffect(() => {
    ambientAudio.subscribe((playing) => {
      setIsPlayingAudio(playing);
    });
  }, []);

  // Auto-cycle through the 6 high-definition photos every 8 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setBgIdx((prev) => (prev + 1) % HERO_BACKGROUND_SCENES.length);
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  const toggleMusic = () => {
    ambientAudio.toggle();
  };

  const nextBg = () => setBgIdx((prev) => (prev + 1) % HERO_BACKGROUND_SCENES.length);
  const prevBg = () => setBgIdx((prev) => (prev - 1 + HERO_BACKGROUND_SCENES.length) % HERO_BACKGROUND_SCENES.length);

  // Calculate live dynamic estimated fare
  const currentVehicleTier = VEHICLE_TIERS.find((v) => v.id === selectedVehicle) || VEHICLE_TIERS[0];
  let calculatedFare = 1800;

  if (taxiMode === 'local') {
    const matchedDur = LOCAL_DURATIONS.find((d) => d.label === duration);
    calculatedFare = Math.round((matchedDur ? matchedDur.fare : 2200) * currentVehicleTier.rateMultiplier);
  } else if (taxiMode === 'airport') {
    calculatedFare = Math.round(1400 * currentVehicleTier.rateMultiplier);
  } else {
    calculatedFare = Math.round(2400 * currentVehicleTier.rateMultiplier);
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (activeTab === 'taxi') {
      const dropTarget = taxiMode === 'local' ? duration : destination;
      onBookNow(pickupCity, dropTarget, pickupDate, `Taxi (${taxiMode.toUpperCase()}) - ${currentVehicleTier.name}`, guestName, guestPhone);
    } else {
      onBookNow(pickupCity, packageCircuit, pickupDate, 'Odisha Tour Package', guestName, guestPhone);
    }
  };

  const currentScene = HERO_BACKGROUND_SCENES[bgIdx];

  // Location Categories for Grouped Dropdown
  const locationCategories: OdishaLocationItem['category'][] = [
    'Airports & Transit',
    'Spiritual & Heritage',
    'Beaches & Coastal',
    'Hills & Wildlife',
    'Major Cities & Hubs',
  ];

  return (
    <div className="relative pt-[116px] sm:pt-[122px] lg:pt-[128px] overflow-hidden select-none">

      {/* ═════════════════════════════════════════════════════════════════
          1. FULL-BLEED SCENIC HERO BACKGROUND (RESPONSIVE DESKTOP + MOBILE)
          ═════════════════════════════════════════════════════════════════ */}
      <div className="relative w-full min-h-[640px] lg:min-h-[720px] flex items-center justify-center overflow-hidden py-10 sm:py-14">
        
        {/* Dynamic High-Resolution Background Image */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentScene.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="absolute inset-0"
          >
            {/* Mobile Portrait View (< 640px) */}
            <div
              className="block sm:hidden w-full h-full bg-cover bg-center transition-all duration-700"
              style={{ backgroundImage: `url('${currentScene.mobileBg || currentScene.bg}')` }}
            />
            {/* Tablet & Desktop Wide Panoramic View (>= 640px) */}
            <div
              className="hidden sm:block w-full h-full bg-cover bg-center transition-all duration-700"
              style={{ backgroundImage: `url('${currentScene.bg}')` }}
            />
          </motion.div>
        </AnimatePresence>

        {/* Clear Directional Scrim Overlay */}
        <div
          className="absolute inset-0 z-10 pointer-events-none block sm:hidden"
          style={{
            background: 'linear-gradient(180deg, rgba(0, 0, 0, 0.78) 0%, rgba(0, 0, 0, 0.45) 45%, rgba(0, 0, 0, 0.85) 100%)',
          }}
        />
        <div
          className="absolute inset-0 z-10 pointer-events-none hidden sm:block"
          style={{
            background: 'linear-gradient(90deg, rgba(0, 0, 0, 0.85) 0%, rgba(0, 0, 0, 0.65) 45%, rgba(0, 0, 0, 0.15) 80%, transparent 100%), linear-gradient(180deg, rgba(0, 0, 0, 0.40) 0%, transparent 35%, rgba(0, 0, 0, 0.65) 100%)',
          }}
        />

        {/* ── MAIN CONTENT CONTAINER (Matching Reference Design with Previous Brand Colors) ── */}
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          
          <div className="w-full">
            
            {/* 1. Top Capsule Tag */}
            <div className="flex items-center justify-between mb-3 flex-wrap gap-2 text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/55 backdrop-blur-md border border-white/20 text-xs font-mono font-bold tracking-widest uppercase text-white/95">
                <span className="w-2 h-2 rounded-full bg-[#E25822] animate-pulse" />
                <span>ONE STOP TRAVEL SOLUTION • 28+ YEARS IN BUSINESS (SINCE 1998)</span>
              </div>

              {/* Background Music Toggle */}
              <button
                onClick={toggleMusic}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold transition-all backdrop-blur-md border cursor-pointer ${
                  isPlayingAudio
                    ? 'bg-amber-500 text-slate-950 border-amber-300 ring-2 ring-amber-400/50'
                    : 'bg-black/55 hover:bg-black/75 text-white border-white/20'
                }`}
                title={isPlayingAudio ? 'Pause Ambient Flute' : 'Play Serene Odisha Flute'}
              >
                {isPlayingAudio ? (
                  <>
                    <Volume2 className="w-3.5 h-3.5 animate-pulse text-slate-950" />
                    <span>Flute Music: ON</span>
                  </>
                ) : (
                  <>
                    <Music className="w-3.5 h-3.5 text-amber-400" />
                    <span>Background Music</span>
                  </>
                )}
              </button>
            </div>

            {/* 2. Main Headline (Refined with Real Service Content) */}
            <div className="text-left mb-4">
              <h1 className="text-4xl sm:text-6xl lg:text-[70px] font-black text-white tracking-tight leading-[0.98] drop-shadow-[0_4px_16px_rgba(0,0,0,0.9)] font-sans">
                Odisha's Premier<br />
                <span className="text-amber-300">Cab Rental &amp; Tours.</span>
              </h1>

              {/* Sub-description */}
              <p className="text-sm sm:text-base lg:text-lg text-white/90 font-medium max-w-2xl mt-3 mb-5 leading-relaxed drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)]">
                Book verified AC cabs, luxury coaches &amp; curated holiday packages across all 30 districts of Odisha with professional chauffeurs at guaranteed best rates.
              </p>

              {/* Action Buttons: Book Your Cab & View Tour Packages */}
              <div className="flex items-center gap-3 sm:gap-4 flex-wrap mb-5">
                <button
                  type="button"
                  onClick={() => onBookNow()}
                  className="px-6 sm:px-7 py-3 rounded-full bg-[#E25822] hover:bg-[#c94916] text-white font-black text-sm flex items-center gap-2 shadow-lg transition-transform hover:scale-105 cursor-pointer"
                >
                  <span>Book Your Cab</span>
                  <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                </button>

                <button
                  type="button"
                  onClick={() => onEstimateTrip && onEstimateTrip()}
                  className="px-5 py-3 rounded-full bg-black/60 hover:bg-black/80 backdrop-blur-md border border-white/25 text-white font-bold text-sm flex items-center gap-2 shadow-md transition cursor-pointer"
                >
                  <Map className="w-4 h-4 text-amber-400" />
                  <span>View Tour Circuits</span>
                </button>
              </div>

              {/* Trust Badges */}
              <div className="flex items-center gap-3 sm:gap-6 text-xs sm:text-sm font-semibold text-white/95 mb-4 flex-wrap">
                <div className="flex items-center gap-1.5">
                  <div className="w-4 h-4 rounded-full bg-amber-500/30 border border-amber-400 flex items-center justify-center text-amber-300 shrink-0">
                    <Check className="w-2.5 h-2.5 stroke-[3]" />
                  </div>
                  <span className="drop-shadow text-amber-200 font-bold">28+ Years in Business</span>
                </div>

                <div className="flex items-center gap-1.5">
                  <div className="w-4 h-4 rounded-full bg-emerald-500/25 border border-emerald-400 flex items-center justify-center text-emerald-400 shrink-0">
                    <Check className="w-2.5 h-2.5 stroke-[3]" />
                  </div>
                  <span className="drop-shadow">30 Districts Connected</span>
                </div>

                <div className="flex items-center gap-1.5">
                  <div className="w-4 h-4 rounded-full bg-emerald-500/25 border border-emerald-400 flex items-center justify-center text-emerald-400 shrink-0">
                    <Check className="w-2.5 h-2.5 stroke-[3]" />
                  </div>
                  <span className="drop-shadow">80+ Verified Fleet</span>
                </div>

                <div className="flex items-center gap-1.5">
                  <div className="w-4 h-4 rounded-full bg-emerald-500/25 border border-emerald-400 flex items-center justify-center text-emerald-400 shrink-0">
                    <Check className="w-2.5 h-2.5 stroke-[3]" />
                  </div>
                  <span className="drop-shadow">Guaranteed Best Rates</span>
                </div>
              </div>
            </div>

            {/* 3. Scenic Spot Strip + Carousel Slider Navigation (Above Search Bar) */}
            <div className="flex items-center justify-between gap-3 mb-3 flex-wrap">
              {/* Left: Location Badge Pill */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-xs text-white shadow-md">
                <MapPin className="w-3.5 h-3.5 text-[#E25822] shrink-0" />
                <span className="font-bold text-white">{currentScene.badge.replace(/^[^\w]+/, '')}</span>
                <span className="text-white/40">•</span>
                <span className="text-emerald-300 font-semibold">{currentScene.subtitle}</span>
              </div>

              {/* Right: Slide Dots + Prev/Next Controls */}
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1.5 bg-black/50 backdrop-blur-md px-2.5 py-1.5 rounded-full border border-white/20">
                  {HERO_BACKGROUND_SCENES.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setBgIdx(i)}
                      className={`h-1.5 rounded-full transition-all cursor-pointer ${
                        bgIdx === i ? 'w-5 bg-[#E25822]' : 'w-1.5 bg-white/40 hover:bg-white/70'
                      }`}
                      aria-label={`Go to slide ${i + 1}`}
                    />
                  ))}
                </div>

                <div className="flex items-center gap-1">
                  <button
                    onClick={prevBg}
                    aria-label="Previous Slide"
                    className="w-7 h-7 rounded-full bg-black/60 hover:bg-black/80 border border-white/20 text-white flex items-center justify-center cursor-pointer transition"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={nextBg}
                    aria-label="Next Slide"
                    className="w-7 h-7 rounded-full bg-black/60 hover:bg-black/80 border border-white/20 text-white flex items-center justify-center cursor-pointer transition"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
            {/* ═════════════════════════════════════════════════════════════
                SHIBANI EXPANSIVE CONCIERGE SEARCH BAR (Bottom-Positioned)
                - Wide horizontal card expanding left and right
                - "Plan Your Trip" title block with vertical divider
                - 5 boxed inputs in a row: FROM, TO, TRAVEL DATE, GUESTS, VEHICLE
                - Vibrant circular red/coral arrow action button
                - Bottom sub-bar with KM/Duration pill, Fare & Popular Routes
                ═════════════════════════════════════════════════════════════ */}
            <form onSubmit={handleSearch} className="w-full max-w-6xl xl:max-w-7xl mx-auto bg-white/98 backdrop-blur-md rounded-3xl sm:rounded-[32px] p-4 sm:p-6 lg:p-7 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.45)] border border-white/90 ring-1 ring-black/5 text-left relative z-30">
              
              {/* Row 1: Title + Vertical Divider + 5 Boxes + Circular CTA */}
              <div className="flex flex-col lg:flex-row lg:items-center gap-3 lg:gap-4 justify-between">
                
                {/* Title Block */}
                <div className="shrink-0 text-left pr-2 lg:max-w-[200px] xl:max-w-[230px]">
                  <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight leading-tight">
                    Plan Your Trip
                  </h2>
                  <p className="text-xs sm:text-[13px] text-slate-500 font-medium mt-1 leading-snug">
                    Choose your destination and let us take care of the rest.
                  </p>
                </div>

                {/* Vertical Divider (Desktop) */}
                <div className="hidden lg:block w-[1px] h-12 bg-slate-200 shrink-0" />

                {/* 5 Input Boxes (Responsive Grid / Flex) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-2.5 flex-1 items-center">
                  
                  {/* BOX 1: FROM */}
                  <div className="relative">
                    <div
                      onClick={() => {
                        setPickupOpen(!pickupOpen);
                        setDestOpen(false);
                        setGuestsOpen(false);
                        setVehicleOpen(false);
                      }}
                      className="h-[70px] bg-slate-50/80 hover:bg-white border border-slate-200 hover:border-emerald-600/60 rounded-2xl px-3.5 py-2.5 flex flex-col justify-between cursor-pointer transition shadow-2xs group"
                    >
                      <div className="flex items-center gap-1.5 text-slate-400">
                        <MapPin className="w-3.5 h-3.5 text-slate-400 group-hover:text-emerald-600 transition-colors shrink-0" />
                        <span className="text-[10px] font-black uppercase tracking-wider text-slate-500">FROM</span>
                      </div>
                      <div className="flex items-center justify-between text-xs sm:text-[13px] font-bold text-slate-900">
                        <span className="truncate pr-1">{pickupCity.includes('Airport') ? 'Bhubaneswar Airport' : pickupCity.split(',')[0]}</span>
                        <span className="text-slate-400 text-xs shrink-0">▾</span>
                      </div>
                      <div className="text-[10px] text-slate-400 truncate">Pick-up location</div>
                    </div>

                    {/* Popover Dropdown */}
                    {pickupOpen && (
                      <div className="absolute top-full mt-1.5 left-0 right-0 sm:w-72 bg-white border border-slate-200 rounded-2xl shadow-2xl p-2.5 z-50 max-h-64 overflow-y-auto">
                        <div className="text-[10px] uppercase font-black tracking-wider text-slate-400 px-2 py-1 bg-slate-50 rounded mb-1.5">
                          Select Pick-up Spot
                        </div>
                        {locationCategories.map((cat) => (
                          <div key={cat} className="mb-2">
                            <div className="text-[9.5px] uppercase font-bold text-slate-400 px-2 py-0.5">
                              {cat}
                            </div>
                            <div className="space-y-0.5 mt-0.5">
                              {ALL_ODISHA_LOCATIONS.filter((l) => l.category === cat).slice(0, 5).map((loc) => (
                                <button
                                  key={loc.name}
                                  type="button"
                                  onClick={() => {
                                    setPickupCity(loc.name);
                                    setPickupOpen(false);
                                  }}
                                  className="w-full text-left px-2.5 py-1.5 rounded-lg hover:bg-emerald-50 hover:text-[#006837] text-xs font-bold text-slate-800 flex items-center justify-between group cursor-pointer transition"
                                >
                                  <span className="truncate">{loc.name}</span>
                                  <span className="text-[9px] text-slate-400 shrink-0 ml-1">
                                    {loc.badge || loc.district}
                                  </span>
                                </button>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* BOX 2: TO */}
                  <div className="relative">
                    <div
                      onClick={() => {
                        setDestOpen(!destOpen);
                        setPickupOpen(false);
                        setGuestsOpen(false);
                        setVehicleOpen(false);
                      }}
                      className="h-[70px] bg-slate-50/80 hover:bg-white border border-slate-200 hover:border-amber-600/60 rounded-2xl px-3.5 py-2.5 flex flex-col justify-between cursor-pointer transition shadow-2xs group"
                    >
                      <div className="flex items-center gap-1.5 text-slate-400">
                        <MapPin className="w-3.5 h-3.5 text-red-500 shrink-0" />
                        <span className="text-[10px] font-black uppercase tracking-wider text-slate-500">TO</span>
                      </div>
                      <div className="flex items-center justify-between text-xs sm:text-[13px] font-bold text-slate-900">
                        <span className="truncate pr-1">{destination.includes('Puri') ? 'Puri Jagannath Temple' : destination.includes('Konark') ? 'Konark Sun Temple' : destination.includes('Chilika') ? 'Chilika Lake' : destination.split('&')[0].split('(')[0]}</span>
                        <span className="text-slate-400 text-xs shrink-0">▾</span>
                      </div>
                      <div className="text-[10px] text-slate-400 truncate">Destination</div>
                    </div>

                    {/* Popover Dropdown */}
                    {destOpen && (
                      <div className="absolute top-full mt-1.5 left-0 right-0 sm:w-72 bg-white border border-slate-200 rounded-2xl shadow-2xl p-2.5 z-50 max-h-64 overflow-y-auto">
                        <div className="text-[10px] uppercase font-black tracking-wider text-slate-400 px-2 py-1 bg-slate-50 rounded mb-1.5">
                          Select Destination Spot
                        </div>
                        {locationCategories.map((cat) => (
                          <div key={cat} className="mb-2">
                            <div className="text-[9.5px] uppercase font-bold text-slate-400 px-2 py-0.5">
                              {cat}
                            </div>
                            <div className="space-y-0.5 mt-0.5">
                              {ALL_ODISHA_LOCATIONS.filter((l) => l.category === cat).slice(0, 5).map((loc) => (
                                <button
                                  key={loc.name}
                                  type="button"
                                  onClick={() => {
                                    setDestination(loc.name);
                                    setDestOpen(false);
                                  }}
                                  className="w-full text-left px-2.5 py-1.5 rounded-lg hover:bg-emerald-50 hover:text-[#006837] text-xs font-bold text-slate-800 flex items-center justify-between group cursor-pointer transition"
                                >
                                  <span className="truncate">{loc.name}</span>
                                  <span className="text-[9px] text-slate-400 shrink-0 ml-1">
                                    {loc.badge || loc.district}
                                  </span>
                                </button>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* BOX 3: TRAVEL DATE */}
                  <div className="relative">
                    <label className="h-[70px] bg-slate-50/80 hover:bg-white border border-slate-200 hover:border-slate-300 rounded-2xl px-3.5 py-2.5 flex flex-col justify-between cursor-pointer transition shadow-2xs block">
                      <div className="flex items-center gap-1.5 text-slate-400">
                        <Calendar className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span className="text-[10px] font-black uppercase tracking-wider text-slate-500">TRAVEL DATE</span>
                      </div>
                      <div className="flex items-center justify-between text-xs sm:text-[13px] font-bold text-slate-900">
                        <input
                          type="date"
                          value={pickupDate}
                          onChange={(e) => setPickupDate(e.target.value)}
                          min={new Date().toISOString().split('T')[0]}
                          className="w-full bg-transparent font-bold text-xs sm:text-[13px] text-slate-900 focus:outline-none cursor-pointer"
                        />
                      </div>
                      <div className="text-[10px] text-slate-400">Select date</div>
                    </label>
                  </div>

                  {/* BOX 4: GUESTS */}
                  <div className="relative">
                    <div
                      onClick={() => {
                        setGuestsOpen(!guestsOpen);
                        setPickupOpen(false);
                        setDestOpen(false);
                        setVehicleOpen(false);
                      }}
                      className="h-[70px] bg-slate-50/80 hover:bg-white border border-slate-200 hover:border-slate-300 rounded-2xl px-3.5 py-2.5 flex flex-col justify-between cursor-pointer transition shadow-2xs group"
                    >
                      <div className="flex items-center gap-1.5 text-slate-400">
                        <Users className="w-3.5 h-3.5 text-slate-400 group-hover:text-emerald-600 transition-colors shrink-0" />
                        <span className="text-[10px] font-black uppercase tracking-wider text-slate-500">GUESTS</span>
                      </div>
                      <div className="flex items-center justify-between text-xs sm:text-[13px] font-bold text-slate-900">
                        <span className="truncate pr-1">{guests}</span>
                        <span className="text-slate-400 text-xs shrink-0">▾</span>
                      </div>
                      <div className="text-[10px] text-slate-400 truncate">{guests}</div>
                    </div>

                    {guestsOpen && (
                      <div className="absolute top-full mt-1.5 left-0 bg-white border border-slate-200 rounded-2xl shadow-2xl p-1.5 z-50 w-44 space-y-0.5">
                        {['1 Traveller', '2 Travellers', '3-4 Travellers', '5-7 Travellers', '8-15 Travellers', '16+ Group'].map((g) => (
                          <button
                            key={g}
                            type="button"
                            onClick={() => {
                              setGuests(g);
                              setGuestsOpen(false);
                            }}
                            className="w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-bold hover:bg-emerald-50 hover:text-[#006837] text-slate-800 transition cursor-pointer"
                          >
                            {g}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* BOX 5: VEHICLE */}
                  <div className="relative">
                    <div
                      onClick={() => {
                        setVehicleOpen(!vehicleOpen);
                        setPickupOpen(false);
                        setDestOpen(false);
                        setGuestsOpen(false);
                      }}
                      className="h-[70px] bg-slate-50/80 hover:bg-white border border-slate-200 hover:border-slate-300 rounded-2xl px-3.5 py-2.5 flex flex-col justify-between cursor-pointer transition shadow-2xs group"
                    >
                      <div className="flex items-center gap-1.5 text-slate-400">
                        <Car className="w-3.5 h-3.5 text-slate-400 group-hover:text-emerald-600 transition-colors shrink-0" />
                        <span className="text-[10px] font-black uppercase tracking-wider text-slate-500">VEHICLE</span>
                      </div>
                      <div className="flex items-center justify-between text-xs sm:text-[13px] font-bold text-slate-900">
                        <span className="truncate pr-1">{currentVehicleTier.name}</span>
                        <span className="text-slate-400 text-xs shrink-0">▾</span>
                      </div>
                      <div className="text-[10.5px] font-bold text-[#E25822] truncate">
                        {currentVehicleTier.rate} • {currentVehicleTier.category.split('(')[1]?.replace(')', '') || 'AC'}
                      </div>
                    </div>

                    {vehicleOpen && (
                      <div className="absolute top-full mt-1.5 right-0 bg-white border border-slate-200 rounded-2xl shadow-2xl p-1.5 z-50 w-56 space-y-1">
                        {VEHICLE_TIERS.map((tier) => (
                          <button
                            key={tier.id}
                            type="button"
                            onClick={() => {
                              setSelectedVehicle(tier.id);
                              setVehicleOpen(false);
                            }}
                            className="w-full text-left px-2.5 py-1.5 rounded-lg hover:bg-emerald-50 hover:text-[#006837] transition cursor-pointer flex items-center justify-between"
                          >
                            <div>
                              <div className="text-xs font-bold text-slate-900">{tier.name}</div>
                              <div className="text-[10px] text-slate-500">{tier.category}</div>
                            </div>
                            <span className="text-[11px] font-bold text-[#E25822]">{tier.rate}</span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                </div>

                {/* Circular Action Button */}
                <div className="shrink-0 flex justify-end">
                  <button
                    type="submit"
                    aria-label="Search and Plan Trip"
                    className="w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-gradient-to-tr from-[#E25822] to-[#FF4500] hover:from-[#d14714] hover:to-[#e03a00] text-white flex items-center justify-center shadow-lg transition-transform hover:scale-105 shrink-0 cursor-pointer"
                  >
                    <ArrowRight className="w-6 h-6 stroke-[2.5]" />
                  </button>
                </div>

              </div>

              {/* Row 2: Bottom Status Sub-Bar */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pt-4 mt-4 border-t border-slate-100">
                
                {/* Left: Distance/Duration pill + Estimated Fare */}
                <div className="flex items-center gap-3 flex-wrap">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-[#006837] text-xs font-bold">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span>62 KM • 1h 23m</span>
                  </div>

                  <div className="flex items-baseline gap-1.5 text-xs text-slate-600">
                    <span className="font-medium text-slate-500">Est. Fare:</span>
                    <span className="text-base sm:text-lg font-black text-slate-900">
                      ₹{calculatedFare.toLocaleString('en-IN')}
                    </span>
                    <span className="text-[11px] text-slate-400 font-normal">
                      (Fuel &amp; Chauffeur Included)
                    </span>
                  </div>
                </div>

                {/* Right: Popular Routes Chips */}
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="text-[10.5px] font-bold uppercase tracking-wider text-slate-400">
                    POPULAR:
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      setPickupCity('Bhubaneswar, Odisha');
                      setDestination('Puri Jagannath Temple & Swargadwar');
                    }}
                    className="px-3 py-1 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition cursor-pointer"
                  >
                    Bhubaneswar — Puri
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setPickupCity('Bhubaneswar, Odisha');
                      setDestination('Konark Sun Temple UNESCO World Heritage');
                    }}
                    className="px-3 py-1 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition cursor-pointer"
                  >
                    Bhubaneswar — Konark
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setPickupCity('Bhubaneswar, Odisha');
                      setDestination('Chilika Lake & Satapada Dolphin Sanctuary');
                    }}
                    className="px-3 py-1 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition cursor-pointer"
                  >
                    Bhubaneswar — Chilika
                  </button>
                </div>

              </div>

            </form>

          </div>

        </div>

      </div>

      {/* Floating WhatsApp Action Pill */}
      <a
        href="https://wa.me/919861117168"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#20BA5A] text-white flex items-center justify-center shadow-2xl transition-transform hover:scale-110 cursor-pointer"
      >
        <svg className="w-8 h-8 fill-current" viewBox="0 0 24 24">
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z"/>
        </svg>
      </a>

    </div>
  );
}

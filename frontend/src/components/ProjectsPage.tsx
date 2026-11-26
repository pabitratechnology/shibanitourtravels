import React, { useState, useMemo } from 'react';
import { 
  Award, 
  Sparkles, 
  Car, 
  Users, 
  MapPin, 
  CheckCircle2, 
  Calculator, 
  ShieldCheck, 
  Layers, 
  Send, 
  Clock, 
  Map, 
  Sliders, 
  Building,
  User,
  Heart,
  Calendar,
  Globe,
  ChevronRight,
  Info,
  Home
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import PageHero from './PageHero.js';

interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: 'VVIP Delegations' | 'Royal Weddings' | 'Corporate Events' | 'Eco-Tourism Sights';
  vehicleType: 'Force Urbania' | 'Mercedes S-Class' | 'Toyota Crysta' | 'Toyota Fortuner' | 'Volvo Luxury Coaches';
  image: string;
  clientName: string;
  date: string;
  duration: string;
  passengerCount: number;
  vehiclesDeployed: number;
  satisfactionRate: string;
  metrics: { label: string; value: string }[];
  routeTimeline: { stop: string; desc: string; time: string }[];
  summary: string;
}

export default function ProjectsPage({ onBook }: { onBook: (vehicle?: any, pickup?: string, drop?: string, date?: string, journeyType?: 'Local' | 'Outstation' | 'One Way' | 'Round Trip' | 'Airport Transfer') => void }) {
  // Selected Filters
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedVehicle, setSelectedVehicle] = useState<string>('All');
  const [activeProjectDetail, setActiveProjectDetail] = useState<string | null>(null);

  // RFP Calculator State
  const [rfpScope, setRfpScope] = useState<'Wedding' | 'Corporate' | 'VVIP' | 'Tour'>('Corporate');
  const [rfpGuests, setRfpGuests] = useState<number>(30);
  const [rfpFleetPreference, setRfpFleetPreference] = useState<'Force Urbania' | 'Sedans' | 'Fortuners' | 'Crystas' | 'Volvo Coaches'>('Force Urbania');
  const [rfpRoute, setRfpRoute] = useState<'Single' | 'Triangle' | 'National Reserve' | 'Multi-City'>('Triangle');
  const [showRfpResultAnimation, setShowRfpResultAnimation] = useState(false);
  const [rfpFormSubmitted, setRfpFormSubmitted] = useState(false);
  const [rfpEnquiryId, setRfpEnquiryId] = useState('');

  // Sample Completed High-Profile Projects Data
  const projects: Project[] = [
    {
      id: 'proj-1',
      title: 'Odisha G20 Summit Delegation Transport',
      subtitle: 'Premium International Guest Logistics',
      category: 'VVIP Delegations',
      vehicleType: 'Force Urbania',
      image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&q=80&w=800',
      clientName: 'Ministry of External Affairs & Regional Delegates',
      date: 'April 2026',
      duration: '5 Days',
      passengerCount: 180,
      vehiclesDeployed: 12,
      satisfactionRate: '100% On-Time',
      summary: 'Provided flawless, heavily secured shuttle services for international delegates across high-profile summits in Bhubaneswar, managing 12 premium Force Urbanias and Mercedes S-Class with 24/7 dedicated control desks.',
      metrics: [
        { label: 'GPS Tracking Frequency', value: 'Live 5s interval' },
        { label: 'Safety Incidents', value: 'Zero' },
        { label: 'Total Distance Logged', value: '4,200 km' }
      ],
      routeTimeline: [
        { stop: 'Biju Patnaik Airport (BBI)', desc: 'VVIP terminal reception & synchronized custom luggage van dispatch', time: '08:00 AM' },
        { stop: 'Mayfair Lagoon Resort', desc: 'Secure security check-in, orientation, and chauffeur briefing sessions', time: '10:30 AM' },
        { stop: 'Lok Seva Bhawan (State Secretariat)', desc: 'Coordinated drop-off of delegates with priority state security pass', time: '01:30 PM' },
        { stop: 'Konark Sun Temple Site', desc: 'Evening architectural light & sound delegation study visit', time: '06:00 PM' }
      ]
    },
    {
      id: 'proj-2',
      title: 'The Royal Patnaik Wedding Convoy',
      subtitle: 'Elite Floral Wedding Transport Design',
      category: 'Royal Weddings',
      vehicleType: 'Mercedes S-Class',
      image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=800',
      clientName: 'Patnaik & Mohanty Royal Families',
      date: 'May 2026',
      duration: '3 Days',
      passengerCount: 250,
      vehiclesDeployed: 18,
      satisfactionRate: '4.95/5 Client Rating',
      summary: 'Executed complete luxury guest and couple transit design utilizing multiple Mercedes S-Class, custom decorated Range Rovers, and a fleet of Toyota Crystas. Chauffeurs wore customized traditional Odia uniforms.',
      metrics: [
        { label: 'Bride & Groom Flagships', value: 'Mercedes-Benz S350d' },
        { label: 'Floral Design standard', value: 'Orchid-Lilac Premium Art' },
        { label: 'VIP Guests Picked Up', value: '112 Delegates' }
      ],
      routeTimeline: [
        { stop: 'Cuttack Palatial Residence', desc: 'Morning groom convoy departure with traditional flower styling', time: '09:00 AM' },
        { stop: 'Bhubaneswar Wedding Palace', desc: 'Synchronized guest arrival and valet coordination of 18 executive vehicles', time: '12:00 PM' },
        { stop: 'Puri Sea Beach Resort', desc: 'Late evening beachside reception transfer and premium family departures', time: '08:30 PM' }
      ]
    },
    {
      id: 'proj-3',
      title: 'National Steel Corp annual Board Conclave',
      subtitle: 'Corporate VIP Board Executive Transportation',
      category: 'Corporate Events',
      vehicleType: 'Toyota Crysta',
      image: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&q=80&w=800',
      clientName: 'National Steel Corporation Executive Board',
      date: 'June 2026',
      duration: '3 Days',
      passengerCount: 45,
      vehiclesDeployed: 8,
      satisfactionRate: 'Zero delays',
      summary: 'Coordinated highly sensitive travel needs for C-Suite executives with a fleet of pristine Toyota Innova Crystas and premium Hycross hybrid models. Included onboard high-speed WiFi and real-time dispatch dashboard.',
      metrics: [
        { label: 'Executive Fleet Mix', value: 'Innova Crysta & Hycross' },
        { label: 'On-Board Amenities', value: 'Chilled Water, Tablet Screens' },
        { label: 'Corporate SLA Compliant', value: '100% Verified' }
      ],
      routeTimeline: [
        { stop: 'Corporate Headquarters', desc: 'Bespoke board member pick-up with dedicated luggage assistance', time: '07:30 AM' },
        { stop: 'Bhubaneswar Golf Course', desc: 'Mid-day networking session shuttle and premium driver standby', time: '11:00 AM' },
        { stop: 'Chandrabhaga Beach Eco-Retreat', desc: 'Board retreat sunset dinners and high-safety highway transfers', time: '05:00 PM' }
      ]
    },
    {
      id: 'proj-4',
      title: 'Global Heritage Eco-Retreat Tour Logistics',
      subtitle: 'Curated Heritage & Eco-Retreat Tours',
      category: 'Eco-Tourism Sights',
      vehicleType: 'Volvo Luxury Coaches',
      image: 'https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&q=80&w=800',
      clientName: 'International Eco-Heritage Alliance',
      date: 'May 2026',
      duration: '7 Days',
      passengerCount: 90,
      vehiclesDeployed: 3,
      satisfactionRate: 'UNESCO Certified Path',
      summary: 'Organized and executed multi-day regional cultural exploration for premium global historians and nature scholars utilizing 3 of our top-tier Volvo Multi-Axle luxury buses and expert native tour coordinators.',
      metrics: [
        { label: 'Primary Sights Covered', value: 'UNESCO Konark, Bhitarkanika' },
        { label: 'Travel Coordinators', value: '3 Licensed Historians' },
        { label: 'Fuel Type Standard', value: 'Low Emission Eco-Diesel' }
      ],
      routeTimeline: [
        { stop: 'Bhubaneswar Heritage Corridor', desc: 'Explored Rajarani & Mukteswar temples with early morning guided walking', time: '06:00 AM' },
        { stop: 'Chilika Lake Sanctuary Barkul', desc: 'Speedboat boarding for bird conservation sanctuary tour', time: '11:30 AM' },
        { stop: 'Bhitarkanika Mangrove Gate', desc: 'Check-in at luxury eco-tents and secure boat safari briefing', time: '04:00 PM' }
      ]
    },
    {
      id: 'proj-5',
      title: 'VVIP Spiritual Dignitaries Rath Yatra Transport',
      subtitle: 'Mass Spiritual Transit Management',
      category: 'VVIP Delegations',
      vehicleType: 'Toyota Fortuner',
      image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=800',
      clientName: 'Trustees & High-Net-Worth Spiritual Patrons',
      date: 'July 2026',
      duration: '4 Days',
      passengerCount: 35,
      vehiclesDeployed: 6,
      satisfactionRate: 'Secure Bulletproof Clearance',
      summary: 'Highly delicate convoy deployment during the grand Puri Rath Yatra. Navigated extremely crowded lanes safely with 4x4 rugged Fortuners, skilled police liaison personnel, and satellite GPS connectivity.',
      metrics: [
        { label: 'Chauffeur Experience', value: 'Min 15 Years in Odisha' },
        { label: 'Police/Spiritual Liaison', value: 'Fully integrated' },
        { label: 'Crowd Navigation Index', value: 'Excellent' }
      ],
      routeTimeline: [
        { stop: 'Bhubaneswar VIP Residence', desc: 'High-security convoy setup and emergency communication brief', time: '04:00 AM' },
        { stop: 'Puri Grand Road Corridor', desc: 'Accessing specialized VVIP parking lanes near Jagannath Temple', time: '07:30 AM' },
        { stop: 'Mausima Temple Junction', desc: 'Securing dignitaries safe exit during the Rath pull ceremony', time: '02:00 PM' }
      ]
    },
    {
      id: 'proj-6',
      title: 'Similipal Tiger Reserve Off-Road Exploration',
      subtitle: 'Custom Luxury Jungle Transit Project',
      category: 'Eco-Tourism Sights',
      vehicleType: 'Toyota Fortuner',
      image: 'https://images.unsplash.com/photo-1470240731273-7821a6eeb6bd?auto=format&fit=crop&q=80&w=800',
      clientName: 'Eco-Adventurers Club India & Global Guests',
      date: 'February 2026',
      duration: '4 Days',
      passengerCount: 16,
      vehiclesDeployed: 4,
      satisfactionRate: '4.98/5 Wildlife Success',
      summary: 'Navigated rugged terrains, waterfall riverbeds, and mud tracks of Similipal Biosphere Reserve safely with our custom-tuned 4x4 Toyota Fortuners. Chauffeurs possessed certified off-road driving training.',
      metrics: [
        { label: 'Average Trail Elevation', value: '850 meters' },
        { label: 'Emergency Kit Spares', value: 'Dual spare, winches' },
        { label: 'Jungle Guide Liaison', value: '1 Native Tracker per SUV' }
      ],
      routeTimeline: [
        { stop: 'Lulung Entry Checkpost', desc: 'Vehicle safety inspection, tire pressure adjustment, permits check', time: '08:00 AM' },
        { stop: 'Barehipani Waterfall site', desc: 'Extreme terrain navigation through thick Sal forests and rocky river beds', time: '11:00 AM' },
        { stop: 'Chahala Salt Lick Station', desc: 'Quiet twilight wildlife standby; tiger/elephant viewing spot', time: '04:30 PM' }
      ]
    }
  ];

  // Dynamic filter lists
  const categoriesList = ['All', 'VVIP Delegations', 'Royal Weddings', 'Corporate Events', 'Eco-Tourism Sights'];
  const vehiclesList = ['All', 'Force Urbania', 'Mercedes S-Class', 'Toyota Crysta', 'Toyota Fortuner', 'Volvo Luxury Coaches'];

  // Filter projects dynamically
  const filteredProjects = useMemo(() => {
    return projects.filter(p => {
      const matchCat = selectedCategory === 'All' || p.category === selectedCategory;
      const matchVeh = selectedVehicle === 'All' || p.vehicleType === selectedVehicle;
      return matchCat && matchVeh;
    });
  }, [selectedCategory, selectedVehicle]);

  // Interactive RFP Fleet Recommendation Logic
  const computedRfp = useMemo(() => {
    let vehiclesRecommended = '';
    let crewRecommended = '';
    let costEst = '';
    let whatsAppTxt = '';

    if (rfpScope === 'Corporate') {
      if (rfpGuests <= 15) {
        vehiclesRecommended = '1x Force Urbania Luxury (17 Seater)';
        crewRecommended = '1 Executive Chauffeur';
        costEst = '₹8,500 - ₹12,000 / Day';
      } else if (rfpGuests <= 35) {
        vehiclesRecommended = '2x Force Urbania Luxury (17 Seater) OR 1x SML Premium Coach (26 Seater)';
        crewRecommended = '2 Chauffeurs + 1 On-Ground Fleet Supervisor';
        costEst = '₹17,000 - ₹24,000 / Day';
      } else {
        vehiclesRecommended = '1x Volvo AC Sleeper Coach (45 Seater) AND 2x Toyota Crysta';
        crewRecommended = '3 Professional Chauffeurs + 1 Fleet Coordinator';
        costEst = '₹32,000 - ₹45,000 / Day';
      }
    } else if (rfpScope === 'Wedding') {
      if (rfpGuests <= 15) {
        vehiclesRecommended = '1x Mercedes S-Class (Bride/Groom) & 2x Toyota Crysta (Family)';
        crewRecommended = '3 Uniformed VIP Chauffeurs';
        costEst = '₹32,000 - ₹40,000 / Event';
      } else if (rfpGuests <= 50) {
        vehiclesRecommended = '1x Mercedes S-Class (VIP) & 2x Force Urbania (17 Seater) & 2x Toyota Crysta';
        crewRecommended = '5 VIP Chauffeurs + 1 Wedding Valet Coordinator';
        costEst = '₹54,000 - ₹68,000 / Event';
      } else {
        vehiclesRecommended = '2x Mercedes S-Class & 3x Force Urbania & 4x Toyota Innova Crysta';
        crewRecommended = '9 Uniformed VIP Chauffeurs + 2 Wedding Logistics Managers';
        costEst = '₹95,000 - ₹1,20,000 / Event';
      }
    } else if (rfpScope === 'VVIP') {
      vehiclesRecommended = `${Math.ceil(rfpGuests / 6)}x Toyota Fortuner 4x4 or Mercedes S-Class Convoy`;
      crewRecommended = `${Math.ceil(rfpGuests / 6)}x Senior Chauffeurs + 1 VVIP Police Liaison Executive`;
      costEst = `₹${Math.ceil(rfpGuests / 6) * 15000} - ₹${Math.ceil(rfpGuests / 6) * 25000} / Day`;
    } else { // Tours
      if (rfpGuests <= 7) {
        vehiclesRecommended = '1x Toyota Innova Crysta Luxury';
        crewRecommended = '1 Local Chauffeur cum Native Travel Guide';
        costEst = '₹3,500 - ₹5,000 / Day';
      } else if (rfpGuests <= 17) {
        vehiclesRecommended = '1x Force Urbania Luxury (17 Seater)';
        crewRecommended = '1 Senior Chauffeur + 1 Certified Tour Guide';
        costEst = '₹8,500 - ₹11,000 / Day';
      } else {
        vehiclesRecommended = '1x SML Luxury Coach (26 Seater) AND 1x Toyota Crysta';
        crewRecommended = '2 Experienced Chauffeurs + 1 Regional Tour Director';
        costEst = '₹16,000 - ₹22,000 / Day';
      }
    }

    const routeLabel = 
      rfpRoute === 'Single' ? 'Point-to-Point' :
      rfpRoute === 'Triangle' ? 'Odisha Golden Triangle (Bhubaneswar-Puri-Konark)' :
      rfpRoute === 'National Reserve' ? 'National Wildlife Reserve Safari (Similipal/Bhitarkanika)' :
      'Multi-City Regional Tour';

    whatsAppTxt = `Namaskar Shibani Travels! I submitted an RFP estimation via your Advanced Projects Dashboard.
- Event Category: ${rfpScope}
- Headcount: ${rfpGuests} Guests
- Fleet Preference: ${rfpFleetPreference}
- Desired Route: ${routeLabel}
- Suggested Combo: ${vehiclesRecommended}
- Estimated Range: ${costEst}
Please share custom rate quotes and availability details.`;

    return { vehiclesRecommended, crewRecommended, costEst, whatsAppTxt, routeLabel };
  }, [rfpScope, rfpGuests, rfpFleetPreference, rfpRoute]);

  const handleRfpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowRfpResultAnimation(true);
    setRfpFormSubmitted(true);
    
    // Simulate real database ID generation
    const randomId = 'RFP-' + Math.floor(100000 + Math.random() * 900000);
    setRfpEnquiryId(randomId);

    // Call mock API for logging the event
    fetch('/api/enquiries', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: `RFP Corporate Requester (${rfpScope})`,
        email: 'corporate.rfp@shibanitravels.com',
        phone: '+91 99999 99999',
        subject: `Corporate Transport Proposal - ${rfpScope}`,
        message: `RFP Log ID: ${randomId}. Scale: ${rfpGuests} guests. Preferred Fleet: ${rfpFleetPreference}. Route: ${computedRfp.routeLabel}. Recommended Combo: ${computedRfp.vehiclesRecommended}.`,
        date: new Date().toISOString().split('T')[0]
      })
    })
    .catch(err => console.error('Failed logging RFP:', err));
  };

  const handleBookProjectVehicle = (vehicleType: string) => {
    let mockVehicle = { name: `${vehicleType} Elite`, category: 'Premium Fleet', id: 'generic' };
    if (vehicleType.includes('Urbania')) {
      mockVehicle = { id: 'v-5', name: 'Force Urbania Luxury', category: 'Force Urbania' };
    } else if (vehicleType.includes('Mercedes')) {
      mockVehicle = { id: 'v-1', name: 'Mercedes-Benz S-Class', category: 'Luxury Cars' };
    } else if (vehicleType.includes('Crysta')) {
      mockVehicle = { id: 'v-3', name: 'Toyota Innova Crysta', category: 'Innova Crysta' };
    } else if (vehicleType.includes('Fortuner')) {
      mockVehicle = { id: 'v-4', name: 'Toyota Fortuner', category: 'SUV' };
    } else if (vehicleType.includes('Volvo')) {
      mockVehicle = { id: 'v-8', name: 'Volvo AC Sleeper Bus', category: 'Luxury Bus' };
    }
    onBook(mockVehicle);
  };

  return (
    <div className="bg-gradient-to-b from-[#180f0c] via-[#241713] to-[#0f0a08] min-h-screen text-[#fcfaf2]">
      
      {/* ══ FULL SCREEN ADVANCED 3D PROJECTS HERO SHOWCASE ══ */}
      <div className="relative min-h-[75vh] flex flex-col justify-between pt-[118px] pb-12 overflow-hidden text-white bg-[#180f0c]">
        <div className="absolute inset-0 z-0">
          <img
            src="/banners/wedding_car.png"
            alt="Event & Corporate Projects"
            className="w-full h-full object-cover"
            style={{ filter: 'brightness(0.26) saturate(1.2)' }}
          />
          <div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(135deg, rgba(24,15,12,0.96) 0%, rgba(36,23,19,0.9) 60%, rgba(15,10,8,0.96) 100%)',
            }}
          />
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[450px] rounded-full pointer-events-none opacity-50"
            style={{ background: 'radial-gradient(circle, rgba(226,88,34,0.3) 0%, transparent 70%)', filter: 'blur(90px)' }} />
          <div className="absolute bottom-0 left-0 right-0 h-[3px]"
            style={{ background: 'linear-gradient(to right, transparent, #E25822 30%, #E8C97A 50%, #E25822 70%, transparent)' }} />
        </div>

        {/* Top Breadcrumb Navigation */}
        <div className="max-w-7xl mx-auto w-full relative z-10 px-4 sm:px-6 lg:px-8 pt-2 pb-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-300 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/15 shadow-lg">
              <button onClick={() => window.location.href = '/'} className="flex items-center gap-1.5 hover:text-amber-400 transition-colors">
                <Home className="w-3.5 h-3.5 text-[#52B788]" /> Home
              </button>
              <ChevronRight className="w-3.5 h-3.5 text-white/40" />
              <span className="text-amber-400 font-bold">Event & Corporate Projects</span>
            </div>

            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest text-[#E8C97A] bg-amber-400/10 backdrop-blur-md border border-amber-400/30 shadow-lg">
              <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
              MICE & Event Logistics
            </div>
          </div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center my-auto px-4">
          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight mb-4 drop-shadow-xl"
          >
            Enterprise Fleet &{' '}
            <span className="bg-gradient-to-r from-amber-200 via-amber-400 to-amber-500 bg-clip-text text-transparent italic">
              Special Projects
            </span>
          </motion.h1>
          <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed font-medium">
            Explore our record of VVIP state delegations, royal wedding convoys, corporate summits, and high-terrain wildlife tours across Odisha.
          </p>
        </div>
      </div>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        {/* Interactive Logistics Dashboard Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-[10px] font-mono font-black text-yellow-500 bg-yellow-950/40 px-3 py-1 rounded border border-yellow-500/10 uppercase tracking-widest">
            Logistical Excellence Showcase
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-white mt-4 uppercase tracking-wider">
            Completed Portfolios & Fleet Deployments
          </h2>
          <p className="text-xs sm:text-sm text-stone-400 mt-3 leading-relaxed">
            From the sand docks of Puri to the rocky terrains of Similipal, view real statistics, fleet configurations, and live timeline schedules of our premium completed projects.
          </p>
        </div>

        {/* Dashboard Statistics Panels (Bento Layout) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-16">
          <div className="bg-gradient-to-br from-[#2a1a15] to-[#1a110e] border border-yellow-500/10 p-5 rounded-2xl relative overflow-hidden text-left">
            <div className="absolute top-0 right-0 w-16 h-16 bg-yellow-500/5 rounded-full blur-xl" />
            <Car className="w-5 h-5 text-yellow-500 mb-2" />
            <h4 className="text-xl font-mono font-black text-white">80+ Elite Cars</h4>
            <p className="text-[10px] text-stone-400 mt-1 uppercase tracking-wider">In-House GPS Tracked Fleet</p>
          </div>
          <div className="bg-gradient-to-br from-[#2a1a15] to-[#1a110e] border border-yellow-500/10 p-5 rounded-2xl relative overflow-hidden text-left">
            <div className="absolute top-0 right-0 w-16 h-16 bg-emerald-500/5 rounded-full blur-xl" />
            <Users className="w-5 h-5 text-emerald-400 mb-2" />
            <h4 className="text-xl font-mono font-black text-white">100% Verified</h4>
            <p className="text-[10px] text-stone-400 mt-1 uppercase tracking-wider">Defensive Chauffeurs</p>
          </div>
          <div className="bg-gradient-to-br from-[#2a1a15] to-[#1a110e] border border-yellow-500/10 p-5 rounded-2xl relative overflow-hidden text-left">
            <div className="absolute top-0 right-0 w-16 h-16 bg-purple-500/5 rounded-full blur-xl" />
            <Clock className="w-5 h-5 text-purple-400 mb-2" />
            <h4 className="text-xl font-mono font-black text-white">24/7 Desk</h4>
            <p className="text-[10px] text-stone-400 mt-1 uppercase tracking-wider">Live Concierge Supervision</p>
          </div>
          <div className="bg-gradient-to-br from-[#2a1a15] to-[#1a110e] border border-yellow-500/10 p-5 rounded-2xl relative overflow-hidden text-left">
            <div className="absolute top-0 right-0 w-16 h-16 bg-blue-500/5 rounded-full blur-xl" />
            <ShieldCheck className="w-5 h-5 text-blue-400 mb-2" />
            <h4 className="text-xl font-mono font-black text-white">99.8% On-Time</h4>
            <p className="text-[10px] text-stone-400 mt-1 uppercase tracking-wider">Zero Transit Delays</p>
          </div>
        </div>

        {/* Dashboard Filter Hub */}
        <div className="bg-[#241713]/80 border border-yellow-500/15 rounded-3xl p-6 mb-12 flex flex-col md:flex-row md:items-center justify-between gap-6 text-left shadow-2xl relative">
          <div className="space-y-1">
            <h4 className="text-xs font-mono font-bold text-yellow-500 uppercase tracking-widest flex items-center gap-1.5">
              <Sliders className="w-4 h-4 text-yellow-500" />
              Dynamic Project Filters
            </h4>
            <p className="text-[10px] text-stone-400">Isolate case logs by transport category or vehicle fleet model</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
            {/* Category Filter */}
            <div className="flex flex-col gap-1 w-full sm:w-48">
              <span className="text-[9px] font-mono text-stone-500 uppercase font-black">By Sector Type</span>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="bg-[#1e120f] border border-yellow-500/10 rounded-xl px-3 py-2 text-[10px] font-bold tracking-wider text-stone-200 focus:border-yellow-500 outline-none cursor-pointer"
              >
                {categoriesList.map((cat, i) => (
                  <option key={i} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            {/* Vehicle Filter */}
            <div className="flex flex-col gap-1 w-full sm:w-48">
              <span className="text-[9px] font-mono text-stone-500 uppercase font-black">By Primary Fleet</span>
              <select
                value={selectedVehicle}
                onChange={(e) => setSelectedVehicle(e.target.value)}
                className="bg-[#1e120f] border border-yellow-500/10 rounded-xl px-3 py-2 text-[10px] font-bold tracking-wider text-stone-200 focus:border-yellow-500 outline-none cursor-pointer"
              >
                {vehiclesList.map((veh, i) => (
                  <option key={i} value={veh}>{veh}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* PROJECTS GRID */}
        {filteredProjects.length === 0 ? (
          <div className="bg-[#211411]/50 border border-yellow-500/10 rounded-2xl py-16 text-center">
            <Info className="w-8 h-8 text-yellow-500/40 mx-auto mb-3" />
            <h4 className="text-sm font-bold text-white">No Matching Projects Found</h4>
            <p className="text-xs text-stone-500 mt-1">Adjust filters to explore more of our high-profile travel case logs.</p>
            <button 
              onClick={() => { setSelectedCategory('All'); setSelectedVehicle('All'); }}
              className="mt-4 px-4 py-2 bg-yellow-500/10 text-yellow-500 text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-yellow-500 hover:text-stone-950 transition-all"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
            {filteredProjects.map((project) => {
              const isExpanded = activeProjectDetail === project.id;
              return (
                <div 
                  key={project.id}
                  className="bg-[#2b1b17]/45 border border-yellow-500/10 rounded-2xl overflow-hidden group hover:border-yellow-500/25 transition-all duration-300 shadow-xl text-left flex flex-col justify-between"
                >
                  <div>
                    {/* Cover Image & Category Badge */}
                    <div className="relative h-48 overflow-hidden">
                      <div className="absolute inset-0 bg-stone-950/40 group-hover:bg-stone-950/25 transition-colors z-10" />
                      <img 
                        src={project.image} 
                        alt={project.title} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        referrerPolicy="no-referrer"
                      />
                      <span className="absolute top-3 left-3 z-20 text-[8px] font-black font-mono uppercase tracking-widest bg-yellow-500 text-stone-950 px-2 py-1 rounded">
                        {project.category}
                      </span>
                      <span className="absolute bottom-3 right-3 z-20 text-[8px] font-black font-mono uppercase tracking-widest bg-stone-950/80 text-yellow-400 border border-yellow-500/10 px-2 py-1 rounded backdrop-blur-sm">
                        {project.vehicleType}
                      </span>
                    </div>

                    {/* Card Content */}
                    <div className="p-5 space-y-4">
                      <div>
                        <div className="flex items-center gap-1.5 text-[8px] font-mono font-bold text-stone-500 uppercase tracking-widest">
                          <span>{project.date}</span>
                          <span>•</span>
                          <span>{project.duration}</span>
                        </div>
                        <h3 className="text-base font-black text-white group-hover:text-yellow-400 transition-colors mt-1 uppercase tracking-wide leading-snug">
                          {project.title}
                        </h3>
                        <p className="text-[10px] text-stone-400 font-medium italic mt-0.5">{project.subtitle}</p>
                      </div>

                      <p className="text-[11px] text-stone-400 leading-relaxed line-clamp-3">
                        {project.summary}
                      </p>

                      {/* Key Indicators */}
                      <div className="grid grid-cols-3 gap-2 py-3 border-y border-yellow-500/10 text-center">
                        <div className="space-y-0.5">
                          <p className="text-[8px] text-stone-500 font-bold uppercase tracking-wider">Vehicles</p>
                          <p className="text-xs font-mono font-black text-white">{project.vehiclesDeployed} units</p>
                        </div>
                        <div className="space-y-0.5">
                          <p className="text-[8px] text-stone-500 font-bold uppercase tracking-wider">Guests</p>
                          <p className="text-xs font-mono font-black text-white">{project.passengerCount}+ PAX</p>
                        </div>
                        <div className="space-y-0.5">
                          <p className="text-[8px] text-stone-500 font-bold uppercase tracking-wider">Audited</p>
                          <p className="text-[9px] font-mono font-black text-emerald-400">{project.satisfactionRate}</p>
                        </div>
                      </div>

                      {/* Collapsible advanced section (Route Tracker & Metrics) */}
                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="space-y-4 overflow-hidden pt-1"
                          >
                            {/* Detailed Metrics */}
                            <div className="bg-[#1e120f] border border-yellow-500/5 p-3 rounded-xl space-y-1.5">
                              <p className="text-[8px] font-mono font-bold text-yellow-500 uppercase tracking-widest">Project Audit Metrics</p>
                              <div className="space-y-1">
                                {project.metrics.map((met, idx) => (
                                  <div key={idx} className="flex justify-between items-center text-[10px]">
                                    <span className="text-stone-400">{met.label}</span>
                                    <span className="font-mono font-black text-white">{met.value}</span>
                                  </div>
                                ))}
                              </div>
                            </div>

                            {/* Detailed Route Timeline tracker */}
                            <div className="space-y-2">
                              <p className="text-[8px] font-mono font-bold text-yellow-500 uppercase tracking-widest flex items-center gap-1">
                                <Map className="w-3 h-3 text-yellow-500" />
                                Synchronized Dispatch Schedule
                              </p>
                              
                              <div className="relative border-l border-yellow-500/10 pl-4 ml-2.5 space-y-3 text-left">
                                {project.routeTimeline.map((timeStop, index) => (
                                  <div key={index} className="relative text-[10px]">
                                    {/* Circle node indicator */}
                                    <span className="absolute -left-[20.5px] top-1 w-2.5 h-2.5 rounded-full bg-yellow-500 border-2 border-[#180f0c]" />
                                    <div className="flex justify-between items-start gap-1">
                                      <p className="font-black text-stone-200 uppercase tracking-tight">{timeStop.stop}</p>
                                      <span className="text-[8px] font-mono text-yellow-500 shrink-0 font-bold bg-yellow-500/5 border border-yellow-500/10 px-1 rounded">{timeStop.time}</span>
                                    </div>
                                    <p className="text-stone-400 text-[9px] mt-0.5">{timeStop.desc}</p>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>

                  {/* Action buttons footer inside card */}
                  <div className="p-5 pt-0 mt-2 flex gap-3 border-t border-yellow-500/5 pt-4 bg-[#211411]/20">
                    <button
                      onClick={() => setActiveProjectDetail(isExpanded ? null : project.id)}
                      className="flex-1 py-2 bg-stone-900/60 hover:bg-[#2b1b17] border border-white/5 hover:border-yellow-500/15 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all text-stone-300 text-center"
                    >
                      {isExpanded ? 'Hide Specs' : 'Expand Specs & Route'}
                    </button>
                    <button
                      onClick={() => handleBookProjectVehicle(project.vehicleType)}
                      className="px-4 py-2 bg-yellow-500 hover:bg-amber-500 text-stone-950 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all shadow-md"
                    >
                      Rent Similar
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* ADVANCED SECTION 2: INTERACTIVE CORPORATE / EVENT RFP CALCULATOR */}
        <div className="bg-gradient-to-br from-[#2a1a15] to-[#160f0d] border border-yellow-500/15 rounded-3xl p-6 sm:p-10 shadow-2xl relative text-left">
          <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-500/5 rounded-full blur-3xl pointer-events-none" />
          
          <div className="grid lg:grid-cols-12 gap-10 items-start">
            
            {/* Input Form Column */}
            <div className="lg:col-span-6 space-y-6">
              <div>
                <span className="text-[10px] font-mono font-black text-yellow-500 uppercase tracking-widest flex items-center gap-1.5">
                  <Calculator className="w-4 h-4 text-yellow-500 animate-pulse" />
                  Fleet RFP Configurator
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-white mt-2 uppercase tracking-wide">
                  Configure Your Custom Event Transportation
                </h3>
                <p className="text-xs text-stone-400 mt-2 leading-relaxed">
                  Planning a heavy logistics task like a multi-car wedding convoy, a corporate board outing, or a state VIP delegation tour? Use our dynamic estimator below to instantly configure your crew, support level, and custom vehicle combinations.
                </p>
              </div>

              <form onSubmit={handleRfpSubmit} className="space-y-4 pt-2">
                
                {/* 1. Scope select */}
                <div>
                  <label className="block text-xs font-semibold text-stone-300 mb-1.5 uppercase tracking-wider font-mono">1. Event Scope / Objective</label>
                  <div className="grid grid-cols-4 gap-2">
                    {[
                      { id: 'Corporate', label: 'Corporate', icon: Building },
                      { id: 'Wedding', label: 'Wedding', icon: Heart },
                      { id: 'VVIP', label: 'VIP Convoy', icon: Award },
                      { id: 'Tour', label: 'Group Tour', icon: Map }
                    ].map((item) => (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => setRfpScope(item.id as any)}
                        className={`py-2 px-1 text-[10px] font-bold border rounded-xl flex flex-col items-center justify-center gap-1.5 transition-all ${
                          rfpScope === item.id 
                            ? 'bg-yellow-500 text-stone-950 border-yellow-400' 
                            : 'bg-stone-900/40 text-stone-400 border-white/5 hover:border-yellow-500/15 hover:text-stone-200'
                        }`}
                      >
                        <item.icon className="w-4 h-4" />
                        <span className="truncate w-full text-center">{item.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* 2. Expected Headcount slider */}
                <div>
                  <div className="flex justify-between items-center mb-1.5">
                    <label className="text-xs font-semibold text-stone-300 uppercase tracking-wider font-mono">2. Guest Headcount</label>
                    <span className="text-xs font-mono font-black text-yellow-400 bg-yellow-950/40 px-2.5 py-0.5 rounded border border-yellow-500/5">{rfpGuests} Guests</span>
                  </div>
                  <input
                    type="range"
                    min={4}
                    max={120}
                    step={2}
                    value={rfpGuests}
                    onChange={(e) => {
                      setRfpGuests(parseInt(e.target.value));
                      setRfpFormSubmitted(false);
                    }}
                    className="w-full h-1 bg-stone-900 rounded-lg appearance-none cursor-pointer accent-yellow-500"
                  />
                  <div className="flex justify-between text-[8px] font-mono text-stone-500 mt-1">
                    <span>4 (Small Group)</span>
                    <span>40 (Medium Event)</span>
                    <span>80 (Large Convoy)</span>
                    <span>120+ (Mega Delegation)</span>
                  </div>
                </div>

                {/* 3. Primary Fleet Choice select */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-stone-300 mb-1.5 uppercase tracking-wider font-mono">3. Primary Fleet Type</label>
                    <select
                      value={rfpFleetPreference}
                      onChange={(e) => {
                        setRfpFleetPreference(e.target.value as any);
                        setRfpFormSubmitted(false);
                      }}
                      className="w-full bg-[#1e120f] border border-yellow-500/10 rounded-xl px-3 py-3 text-xs font-bold text-stone-200 focus:border-yellow-500 outline-none cursor-pointer"
                    >
                      <option value="Force Urbania">Force Urbania (Premium Vans)</option>
                      <option value="Sedans">Executive Sedans (Honda City/Dzire)</option>
                      <option value="Crystas">Toyota Crysta (Premium SUVs)</option>
                      <option value="Fortuners">Toyota Fortuner (Off-Road SUVs)</option>
                      <option value="Volvo Coaches">Volvo Luxury AC Sleeper coaches</option>
                    </select>
                  </div>

                  {/* 4. Route type select */}
                  <div>
                    <label className="block text-xs font-semibold text-stone-300 mb-1.5 uppercase tracking-wider font-mono">4. Travel Route Path</label>
                    <select
                      value={rfpRoute}
                      onChange={(e) => {
                        setRfpRoute(e.target.value as any);
                        setRfpFormSubmitted(false);
                      }}
                      className="w-full bg-[#1e120f] border border-yellow-500/10 rounded-xl px-3 py-3 text-xs font-bold text-stone-200 focus:border-yellow-500 outline-none cursor-pointer"
                    >
                      <option value="Single">Local Point-to-Point Transit</option>
                      <option value="Triangle">Bhubaneswar-Puri-Konark Triangle</option>
                      <option value="National Reserve">Jungle Off-Road Route (National Park)</option>
                      <option value="Multi-City">Custom Multi-City Wedding Transit</option>
                    </select>
                  </div>
                </div>

                {/* Submit RFQ calculation */}
                <button
                  type="submit"
                  className="w-full py-3.5 bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-400 hover:to-amber-500 text-stone-950 font-black uppercase text-xs tracking-widest rounded-xl shadow-lg hover:scale-[1.01] transition-all flex items-center justify-center gap-2"
                >
                  <Calculator className="w-4 h-4 text-stone-950" />
                  Calculate Fleet Recommendation
                </button>

              </form>
            </div>

            {/* Recommendation Display Column */}
            <div className="lg:col-span-6 bg-[#1a110e]/90 border border-yellow-500/10 rounded-2xl p-6 sm:p-8 flex flex-col justify-between h-full relative">
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
              
              <div>
                <h4 className="text-xs font-mono font-black text-emerald-400 uppercase tracking-widest flex items-center gap-1 border-b border-yellow-500/10 pb-3 mb-5">
                  <ShieldCheck className="w-4.5 h-4.5 text-emerald-400" />
                  Audited Fleet Combination
                </h4>

                <div className="space-y-6">
                  {/* Vehicle Combo widget */}
                  <div>
                    <span className="text-[9px] font-mono font-bold text-stone-500 uppercase tracking-widest block">Recommended Transport combination</span>
                    <div className="flex items-center gap-3 mt-1.5">
                      <div className="w-10 h-10 rounded-xl bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center text-yellow-500 shrink-0">
                        <Car className="w-5 h-5" />
                      </div>
                      <p className="text-sm font-black text-white uppercase tracking-wide">
                        {computedRfp.vehiclesRecommended}
                      </p>
                    </div>
                  </div>

                  {/* Chauffeur Crew widget */}
                  <div>
                    <span className="text-[9px] font-mono font-bold text-stone-500 uppercase tracking-widest block">Chauffeurs & Coordinators Assigned</span>
                    <div className="flex items-center gap-3 mt-1.5">
                      <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
                        <Users className="w-5 h-5" />
                      </div>
                      <p className="text-sm font-black text-white uppercase tracking-wide">
                        {computedRfp.crewRecommended}
                      </p>
                    </div>
                  </div>

                  {/* Estimated Cost widget */}
                  <div>
                    <span className="text-[9px] font-mono font-bold text-stone-500 uppercase tracking-widest block">Estimated Rate bracket</span>
                    <div className="flex items-center gap-3 mt-1.5">
                      <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 shrink-0">
                        <span className="font-mono font-black text-sm">₹</span>
                      </div>
                      <p className="text-lg font-mono font-black text-yellow-400">
                        {computedRfp.costEst}
                      </p>
                    </div>
                  </div>

                  {/* Deliverables lists */}
                  <div className="pt-4 border-t border-yellow-500/5 space-y-2">
                    <span className="text-[9px] font-mono font-bold text-[#c5a059] uppercase tracking-widest block">Included Luxury Inclusions</span>
                    <ul className="grid grid-cols-2 gap-2 text-[10px]">
                      <li className="flex items-center gap-1.5 text-stone-400">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
                        Live GPS Tracking Link
                      </li>
                      <li className="flex items-center gap-1.5 text-stone-400">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
                        Chilled Mineral Water
                      </li>
                      <li className="flex items-center gap-1.5 text-stone-400">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
                        Luggage Valet Assistance
                      </li>
                      <li className="flex items-center gap-1.5 text-stone-400">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
                        24/7 Control Room Line
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Instant WhatsApp RFP Desk Action buttons */}
              <div className="space-y-3 mt-8">
                {rfpFormSubmitted && showRfpResultAnimation && (
                  <div className="bg-emerald-950/45 border border-emerald-500/20 rounded-xl p-3 text-center text-xs text-emerald-400 animate-fade-in flex flex-col gap-1">
                    <span className="font-black text-[10px] uppercase tracking-widest">✓ LOGGED IN TRAVEL CONTROL CENTER</span>
                    <p className="text-[9px] text-stone-400 leading-relaxed">
                      Your event request proposal is verified and stored under ID: <strong className="text-white font-mono">{rfpEnquiryId}</strong>. Our logistics specialist is reviewing your custom setup now.
                    </p>
                  </div>
                )}

                <div className="flex gap-3">
                  <a
                    href={`https://wa.me/919437100001?text=${encodeURIComponent(computedRfp.whatsAppTxt)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-black uppercase text-[10px] tracking-widest rounded-xl shadow-lg hover:scale-[1.01] transition-all flex items-center justify-center gap-2 border border-emerald-500/20"
                  >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01c12.008.01c3.202.001 6.212 1.246 8.477 3.513 2.262 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.413 9.863-9.864.001-2.64-1.023-5.123-2.887-6.989C16.581 1.884 14.09 1.861 12.01 1.861c-5.435 0-9.86 4.414-9.864 9.865-.001 1.802.477 3.568 1.385 5.112L2.533 21.41l4.114-1.076zm12.334-5.865c-.328-.163-1.936-.957-2.264-1.077-.327-.12-.566-.18-.804.18-.238.359-.925 1.167-1.133 1.407-.208.24-.417.27-.745.105-.328-.163-1.386-.51-2.639-1.629-.974-.869-1.631-1.943-1.821-2.271-.19-.328-.02-.505.144-.668.148-.146.328-.382.492-.574.164-.191.218-.328.328-.546.11-.218.055-.41-.027-.573-.082-.164-.804-1.936-1.102-2.659-.29-.696-.583-.603-.804-.614-.208-.01-.447-.012-.686-.012-.239 0-.626.09-.953.447-.328.359-1.25 1.222-1.25 2.976 0 1.754 1.279 3.447 1.457 3.687.179.24 2.518 3.844 6.098 5.39 3.58 1.546 3.58 1.031 4.234.972.653-.06 2.083-.852 2.375-1.674.292-.823.292-1.53.205-1.674-.087-.146-.328-.27-.655-.433z"/>
                    </svg>
                    <span>Send Proposal To WhatsApp</span>
                  </a>

                  <button
                    onClick={() => {
                      const scaleLabel = 
                        rfpScope === 'Corporate' ? 'Corporate Event' :
                        rfpScope === 'Wedding' ? 'Royal Wedding' :
                        rfpScope === 'VVIP' ? 'VIP Convoy' : 'Group Tour';
                      
                      onBook(
                        { id: 'custom-event', name: `${scaleLabel} Custom Combo`, category: 'Event Combo' },
                        'Bhubaneswar',
                        'Odisha Custom Event Location',
                        '',
                        rfpScope === 'Corporate' || rfpScope === 'VVIP' ? 'Outstation' : 'Round Trip'
                      );
                    }}
                    className="flex-1 py-3 bg-gradient-to-r from-yellow-500 to-amber-600 text-stone-950 font-black uppercase text-[10px] tracking-widest rounded-xl hover:scale-[1.01] transition-transform text-center flex items-center justify-center"
                  >
                    Hold Fleet Instantly
                  </button>
                </div>
              </div>
              
            </div>

          </div>
        </div>

      </div>

    </div>
  );
}

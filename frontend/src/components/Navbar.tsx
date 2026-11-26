import { useState, useEffect, useRef } from 'react';
import {
  Phone, Mail, Menu, X, ChevronDown,
  ArrowRight, CalendarCheck, Car, Users, Sparkles, Bus, MessageSquare,
  Compass, Landmark, Trees, Mountain, Umbrella, Palette
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import ShibaniLogo from './ShibaniLogo.js';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  openBookingModal: () => void;
}

const VEHICLE_CATEGORIES = [
  {
    category: 'Sedans & Hatchbacks',
    icon: <Car className="w-4 h-4 text-[#006837]" />,
    vehicles: [
      { name: 'Maruti Swift Dzire (AI Showcase)', price: '₹12/km', seats: '4 Seater', id: 'ai-swift-dzire' },
      { name: 'Honda City i-VTEC Sport (White)', price: '₹16/km', seats: '4 Seater', id: 'real-honda-city' },
      { name: 'Hyundai Verna Premium (White)', price: '₹16/km', seats: '4 Seater', id: 'real-hyundai-verna' },
      { name: 'Maruti Suzuki Swift Dzire (Fleet)', price: '₹12/km', seats: '4 Seater', id: 'v-13' },
      { name: 'Maruti Suzuki Swift', price: '₹11/km', seats: '4 Seater', id: 'v-12' },
      { name: 'Maruti Suzuki WagonR', price: '₹10/km', seats: '4 Seater', id: 'v-11' },
    ],
  },
  {
    category: 'SUVs & Executive MUVs',
    icon: <Car className="w-4 h-4 text-[#D32F2F]" />,
    vehicles: [
      { name: 'Toyota Innova Crysta (AI Showcase)', price: '₹18/km', seats: '7 Seater', id: 'ai-innova-crysta' },
      { name: 'Toyota Fortuner 4x4 (AI Showcase)', price: '₹24/km', seats: '7 Seater', id: 'ai-fortuner' },
      { name: 'Toyota Innova Crysta (VIP Fleet)', price: '₹18/km', seats: '7 Seater', id: 'v-3' },
      { name: 'Toyota Innova Hycross Hybrid', price: '₹20/km', seats: '7 Seater', id: 'v-9' },
      { name: 'Toyota Fortuner 4x4 (VIP)', price: '₹24/km', seats: '7 Seater', id: 'v-4' },
      { name: 'Mahindra Scorpio-N', price: '₹17/km', seats: '7 Seater', id: 'v-16' },
      { name: 'Maruti Suzuki Ertiga Hybrid', price: '₹14/km', seats: '6 Seater', id: 'v-14' },
      { name: 'Mahindra Bolero Power+', price: '₹13/km', seats: '7 Seater', id: 'v-15' },
    ],
  },
  {
    category: 'Force Urbania Luxury Vans',
    icon: <Users className="w-4 h-4 text-[#0284C7]" />,
    vehicles: [
      { name: 'Force Urbania (AI 3D Showcase)', price: '₹28/km', seats: '17 Seater', id: 'ai-force-urbania' },
      { name: 'Force Urbania Wedding Garland', price: '₹28/km', seats: '17 Seater', id: 'real-force-urbania-wedding' },
      { name: 'Force Urbania Bronze Luxury Van', price: '₹28/km', seats: '17 Seater', id: 'real-force-urbania-bronze' },
      { name: 'Force Urbania VIP Lounge', price: '₹28/km', seats: '17 Seater', id: 'v-5' },
      { name: 'Force Urbania Executive (13 Seater)', price: '₹25/km', seats: '13 Seater', id: 'v-29' },
    ],
  },
  {
    category: 'Force Tempo Travellers',
    icon: <Users className="w-4 h-4 text-[#7C3AED]" />,
    vehicles: [
      { name: 'Force Tempo 17 Seater (AI Showcase)', price: '₹22/km', seats: '17 Seater', id: 'ai-tempo-traveller' },
      { name: 'Force Traveller Jay Jagannath', price: '₹24/km', seats: '17 Seater', id: 'real-traveller-jagannath' },
      { name: 'Force Traveller Jay Maa Tarini', price: '₹32/km', seats: '26 Seater', id: 'real-traveller-tarini' },
      { name: 'Tempo Traveller Maharaja LED', price: '₹26/km', seats: '12 Seater', id: 'real-traveller-interior-led' },
      { name: 'Tempo Traveller Executive 2x1', price: '₹24/km', seats: '17 Seater', id: 'real-traveller-pushback' },
      { name: 'Force Traveller OD02 AX 4881', price: '₹24/km', seats: '17 Seater', id: 'real-traveller-od02ax4881' },
      { name: 'Force Traveller OD02 DF 4498', price: '₹24/km', seats: '17 Seater', id: 'real-traveller-od02df4498' },
      { name: 'Force Traveller OD02 DU 3328', price: '₹24/km', seats: '17 Seater', id: 'real-traveller-od02du3328' },
      { name: 'Force Traveller OD33 BA 4090', price: '₹24/km', seats: '17 Seater', id: 'real-traveller-od33ba4090' },
      { name: 'Tata Winger Executive (High Roof)', price: '₹20/km', seats: '15 Seater', id: 'real-tata-winger' },
    ],
  },
  {
    category: 'VVIP Wedding & Luxury Cars',
    icon: <Sparkles className="w-4 h-4 text-[#CA8A04]" />,
    vehicles: [
      { name: 'Mercedes-Benz Wedding Limousine', price: '₹22,000/day', seats: '4 Seater', id: 'ai-wedding-car' },
      { name: 'Mercedes-Benz Cockpit Lounge', price: '₹20,000/day', seats: '4 Seater', id: 'real-mercedes-interior' },
      { name: 'Audi A6 Matrix Elite (Front Grille)', price: '₹16,000/day', seats: '4 Seater', id: 'real-audi-a6-grille' },
      { name: 'Audi A6 Matrix Elite (Lounge Open)', price: '₹16,000/day', seats: '4 Seater', id: 'real-audi-a6-open' },
      { name: 'Audi A6 Matrix Elite (Side Profile)', price: '₹16,000/day', seats: '4 Seater', id: 'real-audi-a6-side' },
      { name: 'Jaguar XF Royal Portico Edition', price: '₹18,000/day', seats: '4 Seater', id: 'real-jaguar-xf-hotel' },
      { name: 'Jaguar XF Highway Tourer', price: '₹18,000/day', seats: '4 Seater', id: 'real-jaguar-xf-road' },
      { name: 'Jaguar XF Nature Retreat', price: '₹18,000/day', seats: '4 Seater', id: 'real-jaguar-xf-nature' },
    ],
  },
  {
    category: 'Luxury Buses & Tour Coaches',
    icon: <Bus className="w-4 h-4 text-[#16A34A]" />,
    vehicles: [
      { name: 'Volvo Multi-Axle Luxury Bus', price: '₹48/km', seats: '45 Seater', id: 'ai-luxury-coach' },
      { name: 'Volvo 9600 Sovereign Sleeper', price: '₹55/km', seats: '40 Sleeper', id: 'v-8' },
      { name: 'SML Executive AC Coach (31 Seater)', price: '₹38/km', seats: '31 Seater', id: 'real-sml-coach' },
      { name: 'BharatBenz Luxury Tour Coach', price: '₹42/km', seats: '35 Seater', id: 'v-27' },
    ],
  },
];

const SERVICES_ITEMS = [
  { label: 'Cab Rental & Taxi Service', sub: 'Local city & outstation travel', id: 'services?tab=cabs' },
  { label: 'Tour Packages (All India)', sub: 'Puri, Konark, Golden Triangle & more', id: 'services?tab=tours' },
  { label: 'Tempo Traveller & Luxury', sub: '12, 17, 26 Seater options', id: 'services?tab=tempo' },
  { label: 'Hotel Booking (Direct Partner)', sub: 'Best partner rates across Odisha', id: 'services?tab=hotels' },
  { label: 'Flight & Train Booking', sub: 'Seamless connections', id: 'services?tab=transit' },
  { label: 'Customized Travel Plans', sub: 'Tailored itineraries for groups & families', id: 'services?tab=custom' },
];

const TOUR_CATEGORIES_NAV = [
  {
    category: 'Spiritual Yatras',
    categoryFilter: 'Spiritual Yatras',
    icon: <Sparkles className="w-3.5 h-3.5 text-amber-500" />,
    badge: '7 Tours',
    packages: [
      { id: 'pkg-puri-vip', name: 'Puri Jagannath VIP Darshan', duration: '3D/2N', price: '₹3,999' },
      { id: 'pkg-bhubaneswar-temple', name: 'Ekamra Kshetra 500-Temples', duration: '2D/1N', price: '₹2,499' },
      { id: 'pkg-biraja-taratarini', name: 'Biraja & Taratarini Shaktipeeth', duration: '4D/3N', price: '₹5,499' },
      { id: 'pkg-panchalingeswar', name: 'Panchalingeswar & Chandipur', duration: '3D/2N', price: '₹4,200' },
      { id: 'pkg-chariot-rath', name: 'Puri Rath Yatra Mega Festival', duration: '4D/3N', price: '₹7,999' },
    ],
  },
  {
    category: 'Golden Triangle & Heritage',
    categoryFilter: 'Golden Triangle',
    icon: <Landmark className="w-3.5 h-3.5 text-[#006837]" />,
    badge: '6 Tours',
    packages: [
      { id: 'pkg-golden-triangle-chilika', name: 'Golden Triangle & Chilika', duration: '4D/3N', price: '₹4,999' },
      { id: 'pkg-diamond-triangle', name: 'Diamond Buddhist Circuit', duration: '3D/2N', price: '₹3,800' },
      { id: 'pkg-konark-coastal', name: 'Konark Sun Temple & Coast', duration: '1 Day', price: '₹1,800' },
      { id: 'pkg-raghurajpur-art', name: 'Raghurajpur Crafts & Pipili', duration: '1 Day', price: '₹1,600' },
      { id: 'pkg-barabati-silver', name: 'Barabati & Cuttack Millenium', duration: '2D/1N', price: '₹2,700' },
    ],
  },
  {
    category: 'Eco-Tourism & Wildlife',
    categoryFilter: 'Eco & Wildlife',
    icon: <Trees className="w-3.5 h-3.5 text-emerald-600" />,
    badge: '6 Tours',
    packages: [
      { id: 'pkg-chilika-dolphins', name: 'Chilika Dolphins & Kalijai', duration: '2D/1N', price: '₹2,999' },
      { id: 'pkg-bhitarkanika-safari', name: 'Bhitarkanika Croc & Mangrove', duration: '3D/2N', price: '₹5,200' },
      { id: 'pkg-similipal-tigers', name: 'Similipal Tiger Safari', duration: '3D/2N', price: '₹6,499' },
      { id: 'pkg-mangalajodi-birds', name: 'Mangalajodi Bird Sanctuary', duration: '1 Day', price: '₹1,999' },
      { id: 'pkg-satkosia-gorge', name: 'Satkosia Tiger Gorge Eco-Camp', duration: '3D/2N', price: '₹5,800' },
    ],
  },
  {
    category: 'Hill Stations & Waterfalls',
    categoryFilter: 'Hill Stations',
    icon: <Mountain className="w-3.5 h-3.5 text-blue-600" />,
    badge: '5 Tours',
    packages: [
      { id: 'pkg-daringbadi-kashmir', name: 'Daringbadi - Kashmir of Odisha', duration: '3D/2N', price: '₹4,500' },
      { id: 'pkg-deomali-peak', name: 'Koraput Valley & Deomali Peak', duration: '4D/3N', price: '₹6,200' },
      { id: 'pkg-khandadhar-falls', name: 'Khandadhar & Keonjhar Falls', duration: '3D/2N', price: '₹4,800' },
      { id: 'pkg-harishankar', name: 'Gandhamardan & Harishankar', duration: '3D/2N', price: '₹4,100' },
      { id: 'pkg-badasankha-valley', name: 'Badasankha Valley & Keonjhar', duration: '3D/2N', price: '₹5,100' },
    ],
  },
  {
    category: 'Beaches & Coastal Drives',
    categoryFilter: 'Beaches & Coastal',
    icon: <Umbrella className="w-3.5 h-3.5 text-cyan-600" />,
    badge: '4 Tours',
    packages: [
      { id: 'pkg-puri-beach-escape', name: 'Puri Blue Flag & Marine Drive', duration: '2D/1N', price: '₹2,200' },
      { id: 'pkg-gopalpur-sea', name: 'Gopalpur-on-Sea & Tampara', duration: '3D/2N', price: '₹3,900' },
      { id: 'pkg-chandipur-magic', name: 'Chandipur Vanishing Sea Mystery', duration: '2D/1N', price: '₹3,200' },
      { id: 'pkg-astaranga-sunset', name: 'Astaranga Sunset Beach Trail', duration: '1 Day', price: '₹1,900' },
    ],
  },
  {
    category: 'Tribal Heritage & Culture',
    categoryFilter: 'Tribal & Culture',
    icon: <Palette className="w-3.5 h-3.5 text-purple-600" />,
    badge: '4 Tours',
    packages: [
      { id: 'pkg-koraput-tribal', name: 'Koraput Bonda Tribal Haats', duration: '5D/4N', price: '₹8,500' },
      { id: 'pkg-sambalpur-handloom', name: 'Sambalpuri Handloom Weavers', duration: '3D/2N', price: '₹4,600' },
      { id: 'pkg-keonjhar-canyon', name: 'Keonjhar Gond Art & Canyon', duration: '3D/2N', price: '₹4,400' },
      { id: 'pkg-complete-odisha', name: 'Grand 10-Day All-Odisha Odyssey', duration: '10D/9N', price: '₹18,999' },
    ],
  },
];

export default function Navbar({ activeTab, setActiveTab, openBookingModal }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 25);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  useEffect(() => {
    const fn = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener('mousedown', fn);
    return () => document.removeEventListener('mousedown', fn);
  }, []);

  const handleMouseEnter = (menu: string) => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    setActiveDropdown(menu);
  };

  const handleMouseLeave = () => {
    if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
    closeTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 200);
  };

  const navigate = (id: string) => {
    if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
    setActiveDropdown(null);
    setMobileOpen(false);
    setActiveTab(id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div ref={navRef} className="fixed top-0 inset-x-0 z-50 flex flex-col font-sans">
      
      {/* ── TOP UTILITY STRIP ── */}
      <div
        className="py-1.5 px-3 sm:px-6 lg:px-12 flex items-center justify-between text-[11px] text-white select-none transition-colors"
        style={{
          background: 'linear-gradient(90deg, #003818 0%, #005A2C 50%, #004D26 100%)',
          borderBottom: '1px solid rgba(255,255,255,0.12)',
        }}
      >
        {/* Left: Phone & Email */}
        <div className="flex items-center gap-3 sm:gap-6 min-w-0">
          <a
            href="tel:+919861117168"
            className="flex items-center gap-1.5 opacity-95 hover:opacity-100 hover:underline transition-opacity font-semibold tracking-wide text-[11px] sm:text-xs truncate"
          >
            <Phone className="w-3.5 h-3.5 text-[#86EFAC] shrink-0" />
            <span className="font-semibold">+91 9861117168</span>
          </a>

          <a
            href="mailto:info@shibanitravels.com"
            className="hidden sm:flex items-center gap-1.5 opacity-95 hover:opacity-100 hover:underline transition-opacity font-medium tracking-wide"
          >
            <Mail className="w-3.5 h-3.5 text-[#86EFAC]" />
            <span>info@shibanitravels.com</span>
          </a>
        </div>

        {/* Center: Tagline */}
        <div className="hidden md:flex items-center">
          <span className="font-semibold text-xs tracking-wider text-[#F0FDF4] drop-shadow-xs flex items-center gap-1.5">
            <span className="text-amber-300 font-bold">🏆 28+ Years in Business</span>
            <span className="text-white/60">•</span>
            <span>Serving Odisha Since 1998</span>
          </span>
        </div>

        {/* Right: Social Media Icons */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Facebook */}
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
            className="w-5 h-5 rounded-full bg-white/15 hover:bg-[#1877F2] flex items-center justify-center text-white hover:scale-110 transition-all shadow-xs"
            title="Follow us on Facebook"
          >
            <svg className="w-2.5 h-2.5 fill-current" viewBox="0 0 24 24">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
          </a>

          {/* Instagram */}
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="w-5 h-5 rounded-full bg-white/15 hover:bg-gradient-to-tr hover:from-[#F58529] hover:via-[#DD2A7B] hover:to-[#8134AF] flex items-center justify-center text-white hover:scale-110 transition-all shadow-xs"
            title="Follow us on Instagram"
          >
            <svg className="w-2.5 h-2.5 fill-current" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
          </a>

          {/* YouTube */}
          <a
            href="https://youtube.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="YouTube"
            className="w-5 h-5 rounded-full bg-white/15 hover:bg-[#FF0000] flex items-center justify-center text-white hover:scale-110 transition-all shadow-xs"
            title="Watch us on YouTube"
          >
            <svg className="w-2.5 h-2.5 fill-current" viewBox="0 0 24 24">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
            </svg>
          </a>

          {/* WhatsApp */}
          <a
            href="https://wa.me/919861117168"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp"
            className="w-5 h-5 rounded-full bg-[#25D366] flex items-center justify-center text-white hover:scale-110 transition-all shadow-xs"
            title="Chat on WhatsApp"
          >
            <MessageSquare className="w-3 h-3 fill-current" />
          </a>
        </div>
      </div>

      {/* ── MAIN NAVBAR ── */}
      <div
        className="bg-white px-2.5 sm:px-6 lg:px-12 py-2 sm:py-3 flex items-center justify-between border-b transition-all duration-300 gap-1.5 sm:gap-4 w-full max-w-full relative z-50 overflow-visible"
        style={{
          borderColor: scrolled ? '#E2E8F0' : '#F1F5F9',
          boxShadow: scrolled ? '0 4px 20px -2px rgba(0, 0, 0, 0.08)' : '0 2px 10px rgba(0,0,0,0.03)',
        }}
      >
        {/* Real Logo */}
        <button
          onClick={() => navigate('home')}
          className="cursor-pointer transition-transform hover:scale-[1.02] text-left shrink-1 min-w-0"
        >
          <ShibaniLogo size="sm" className="sm:hidden" />
          <ShibaniLogo size="md" className="hidden sm:flex" />
        </button>

        {/* Desktop Navigation Links */}
        <nav className="hidden xl:flex items-center gap-1 2xl:gap-1.5">
          
          {/* Home */}
          <button
            onClick={() => navigate('home')}
            className={`px-3.5 py-1.5 text-[12.5px] font-bold rounded-full transition-all cursor-pointer ${
              activeTab === 'home'
                ? 'bg-[#006837] text-white shadow-sm'
                : 'text-slate-700 hover:text-[#006837] hover:bg-slate-50'
            }`}
          >
            Home
          </button>

          {/* About Us */}
          <button
            onClick={() => navigate('about')}
            className={`px-3.5 py-1.5 text-[12.5px] font-bold rounded-full transition-all cursor-pointer ${
              activeTab === 'about'
                ? 'text-[#006837] bg-green-50'
                : 'text-slate-700 hover:text-[#006837] hover:bg-slate-50'
            }`}
          >
            About Us
          </button>

          {/* ══ OUR SERVICES DROPDOWN ══ */}
          <div
            className="relative"
            onMouseEnter={() => handleMouseEnter('services')}
            onMouseLeave={handleMouseLeave}
          >
            <button
              onClick={(e) => {
                e.stopPropagation();
                setActiveDropdown(activeDropdown === 'services' ? null : 'services');
              }}
              className={`flex items-center gap-1 px-3.5 py-1.5 text-[12.5px] font-bold rounded-full transition-all cursor-pointer ${
                activeTab === 'services' || activeDropdown === 'services'
                  ? 'text-[#006837] bg-green-50'
                  : 'text-slate-700 hover:text-[#006837] hover:bg-slate-50'
              }`}
            >
              <span>Our Services</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${activeDropdown === 'services' ? 'rotate-180 text-[#006837]' : 'text-slate-400'}`} />
            </button>

            {/* Continuous Hover Wrapper (Zero Dead Zone Gap) */}
            {activeDropdown === 'services' && (
              <div
                className="absolute top-full left-0 pt-2 w-72 z-50 pointer-events-auto"
                onMouseEnter={() => handleMouseEnter('services')}
                onMouseLeave={handleMouseLeave}
              >
                <div className="bg-white rounded-2xl shadow-2xl border border-slate-100 p-2">
                  {SERVICES_ITEMS.map((item, idx) => (
                    <button
                      key={idx}
                      onClick={() => navigate(item.id)}
                      className="w-full text-left p-2.5 rounded-xl hover:bg-green-50 transition-colors flex flex-col group cursor-pointer"
                    >
                      <span className="text-xs font-bold text-slate-800 group-hover:text-[#006837] transition-colors">
                        {item.label}
                      </span>
                      <span className="text-[10px] text-slate-500 mt-0.5">
                        {item.sub}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* ══ TOUR PACKAGES (30+ ODISHA PACKAGES MEGA-MENU) ══ */}
          <div
            className="relative"
            onMouseEnter={() => handleMouseEnter('tours')}
            onMouseLeave={handleMouseLeave}
          >
            <button
              onClick={(e) => {
                e.stopPropagation();
                setActiveDropdown(activeDropdown === 'tours' ? null : 'tours');
              }}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 text-[12.5px] font-bold rounded-full transition-all cursor-pointer ${
                activeTab === 'tours' || activeDropdown === 'tours'
                  ? 'text-[#006837] bg-green-50 ring-1 ring-green-300'
                  : 'text-slate-700 hover:text-[#006837] hover:bg-slate-50'
              }`}
            >
              <Compass className="w-3.5 h-3.5 text-[#E25822]" />
              <span>Tour Packages</span>
              <span className="px-1.5 py-0.2 rounded-full text-[9px] font-black bg-amber-100 text-amber-800">
                30+
              </span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${activeDropdown === 'tours' ? 'rotate-180 text-[#006837]' : 'text-slate-400'}`} />
            </button>

            {/* Continuous Hover Wrapper */}
            {activeDropdown === 'tours' && (
              <div
                className="absolute top-full -left-28 2xl:-left-16 pt-2 w-[860px] 2xl:w-[920px] z-50 pointer-events-auto"
                onMouseEnter={() => handleMouseEnter('tours')}
                onMouseLeave={handleMouseLeave}
              >
                <div
                  className="bg-white rounded-3xl shadow-2xl border border-slate-100 p-6 max-h-[82vh] overflow-y-auto"
                  style={{
                    boxShadow: '0 25px 60px -15px rgba(0, 50, 25, 0.2), 0 0 20px rgba(0,0,0,0.05)',
                  }}
                >
                  {/* Header */}
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-xl bg-orange-50 border border-orange-200 flex items-center justify-center text-[#E25822]">
                        <Compass className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="text-sm font-black text-slate-900 flex items-center gap-2">
                          <span>All Odisha Tour Packages</span>
                          <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-green-100 text-[#006837]">
                            30+ Authentic Itineraries
                          </span>
                        </h4>
                        <p className="text-[10.5px] text-slate-500 font-medium">
                          Private AC Chauffeur Cab • Handpicked Partner Hotels • Guided Temple Darshan • Zero Hidden Costs
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => navigate('tours')}
                      className="text-xs font-bold text-[#006837] hover:underline flex items-center gap-1 bg-green-50 px-3 py-1.5 rounded-full transition-colors cursor-pointer"
                    >
                      View All 32+ Packages <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>

                  {/* 6 Categories in a 3-column Grid */}
                  <div className="grid grid-cols-3 gap-4">
                    {TOUR_CATEGORIES_NAV.map((cat, cIdx) => (
                      <div key={cIdx} className="space-y-1.5 bg-slate-50/70 p-3 rounded-2xl border border-slate-200/60 hover:border-green-300 transition-colors">
                        <div className="flex items-center justify-between pb-1.5 border-b border-slate-200/80">
                          <button
                            onClick={() => navigate(`tours?category=${encodeURIComponent(cat.categoryFilter)}`)}
                            className="flex items-center gap-1.5 text-[11.5px] font-black text-slate-800 hover:text-[#006837] transition-colors cursor-pointer text-left"
                          >
                            {cat.icon}
                            <span className="truncate">{cat.category}</span>
                          </button>
                          <span className="text-[9px] font-bold text-slate-500 bg-white px-1.5 py-0.5 rounded-full border border-slate-200 shrink-0">
                            {cat.badge}
                          </span>
                        </div>
                        <div className="space-y-1">
                          {cat.packages.map((pkg, pIdx) => (
                            <button
                              key={pIdx}
                              onClick={() => {
                                navigate(`tour/${pkg.id}`);
                              }}
                              className="w-full text-left p-1.5 rounded-lg hover:bg-white hover:shadow-xs transition-all flex items-center justify-between group cursor-pointer"
                            >
                              <div className="pr-1 overflow-hidden">
                                <span className="text-[10.5px] font-bold text-slate-700 group-hover:text-[#006837] block truncate">
                                  {pkg.name}
                                </span>
                                <span className="text-[9px] text-slate-400">
                                  {pkg.duration}
                                </span>
                              </div>
                              <span className="text-[9.5px] font-black text-[#006837] bg-white px-1.5 py-0.5 rounded border border-green-200/60 shrink-0">
                                {pkg.price}
                              </span>
                            </button>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Footer Strip */}
                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs bg-gradient-to-r from-emerald-50 via-green-50 to-amber-50 p-2.5 rounded-2xl">
                    <div className="flex items-center gap-2 text-slate-700">
                      <Sparkles className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                      <span className="text-[11px] font-semibold">
                        Custom dates or private group itineraries? Custom plans crafted in 15 minutes!
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <a
                        href="tel:+919861117168"
                        className="px-2.5 py-1 rounded-lg bg-white border border-green-300 text-[10.5px] font-bold text-[#006837] hover:bg-green-100/60 transition-colors flex items-center gap-1 shadow-2xs"
                      >
                        <Phone className="w-3 h-3 text-[#006837]" />
                        <span>+91 98611 17168</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* ══ ALL VEHICLES MEGA-MENU ══ */}
          <div
            className="relative"
            onMouseEnter={() => handleMouseEnter('fleet')}
            onMouseLeave={handleMouseLeave}
          >
            <button
              onClick={(e) => {
                e.stopPropagation();
                setActiveDropdown(activeDropdown === 'fleet' ? null : 'fleet');
              }}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 text-[12.5px] font-bold rounded-full transition-all cursor-pointer ${
                activeTab === 'fleet' || activeDropdown === 'fleet'
                  ? 'text-[#006837] bg-green-50 ring-1 ring-green-300'
                  : 'text-slate-700 hover:text-[#006837] hover:bg-slate-50'
              }`}
            >
              <Car className="w-3.5 h-3.5 text-[#006837]" />
              <span>All Vehicles</span>
              <span className="px-1.5 py-0.2 rounded-full text-[9px] font-black bg-red-100 text-[#D32F2F]">
                35+
              </span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${activeDropdown === 'fleet' ? 'rotate-180 text-[#006837]' : 'text-slate-400'}`} />
            </button>

            {/* Continuous Hover Wrapper */}
            {activeDropdown === 'fleet' && (
              <div
                className="absolute top-full -left-56 2xl:-left-40 pt-2 w-[880px] 2xl:w-[940px] z-50 pointer-events-auto"
                onMouseEnter={() => handleMouseEnter('fleet')}
                onMouseLeave={handleMouseLeave}
              >
                <div
                  className="bg-white rounded-3xl shadow-2xl border border-slate-100 p-6 max-h-[82vh] overflow-y-auto"
                  style={{
                    boxShadow: '0 25px 60px -15px rgba(0, 50, 25, 0.2), 0 0 20px rgba(0,0,0,0.05)',
                  }}
                >
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
                    <div className="flex items-center gap-2">
                      <Car className="w-4 h-4 text-[#006837]" />
                      <h4 className="text-sm font-black text-slate-900">
                        Explore Our Complete Luxury & Tourist Fleet (35+ Options)
                      </h4>
                    </div>
                    <button
                      onClick={() => navigate('fleet')}
                      className="text-xs font-bold text-[#006837] hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      View All 35+ Vehicles Page <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>

                  <div className="grid grid-cols-3 gap-5">
                    {VEHICLE_CATEGORIES.map((cat, cIdx) => (
                      <div key={cIdx} className="space-y-2">
                        <div className="flex items-center gap-1.5 text-xs font-black text-slate-800 pb-1 border-b border-slate-100">
                          {cat.icon}
                          <span>{cat.category}</span>
                        </div>
                        <div className="space-y-1">
                          {cat.vehicles.map((v, vIdx) => (
                            <button
                              key={vIdx}
                              onClick={() => {
                                navigate('vehicle-' + v.id);
                              }}
                              className="w-full text-left p-1.5 rounded-lg hover:bg-green-50 transition-colors flex items-center justify-between group cursor-pointer"
                            >
                              <div>
                                <span className="text-[11px] font-bold text-slate-800 group-hover:text-[#006837] block leading-tight">
                                  {v.name}
                                </span>
                                <span className="text-[9.5px] text-slate-400">
                                  {v.seats}
                                </span>
                              </div>
                              <span className="text-[10px] font-black text-[#006837] bg-green-100/60 px-1.5 py-0.5 rounded">
                                {v.price}
                              </span>
                            </button>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Gallery */}
          <button
            onClick={() => navigate('gallery')}
            className={`px-3 py-1.5 text-[12px] font-bold rounded-full transition-all cursor-pointer ${
              activeTab === 'gallery'
                ? 'text-[#006837] bg-green-50'
                : 'text-slate-700 hover:text-[#006837] hover:bg-slate-50'
            }`}
          >
            Gallery
          </button>

          {/* Blog */}
          <button
            onClick={() => navigate('blog')}
            className={`px-3 py-1.5 text-[12px] font-bold rounded-full transition-all cursor-pointer ${
              activeTab === 'blog'
                ? 'text-[#006837] bg-green-50'
                : 'text-slate-700 hover:text-[#006837] hover:bg-slate-50'
            }`}
          >
            Blog
          </button>

          {/* Contact Us */}
          <button
            onClick={() => navigate('contact')}
            className={`px-3 py-1.5 text-[12px] font-bold rounded-full transition-all cursor-pointer ${
              activeTab === 'contact'
                ? 'text-[#006837] bg-green-50'
                : 'text-slate-700 hover:text-[#006837] hover:bg-slate-50'
            }`}
          >
            Contact Us
          </button>

        </nav>

        {/* Right CTA Button: "Book Now ->" + Mobile Hamburger */}
        <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
          {/* Mobile Compact Book Button */}
          <button
            onClick={openBookingModal}
            className="flex sm:hidden items-center gap-1 px-3 py-1.5 rounded-full text-[11px] font-bold text-white shadow-xs cursor-pointer shrink-0 transition-transform active:scale-95 whitespace-nowrap"
            style={{
              background: 'linear-gradient(135deg, #006837 0%, #008746 100%)',
            }}
          >
            <CalendarCheck className="w-3.5 h-3.5 text-white shrink-0" />
            <span>Book</span>
          </button>

          {/* Desktop & Tablet Full Book Now Button */}
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            onClick={openBookingModal}
            className="hidden sm:flex items-center gap-2 px-4 lg:px-5 py-2.5 rounded-full text-xs font-bold text-white tracking-wide cursor-pointer shadow-md transition-all shrink-0 whitespace-nowrap"
            style={{
              background: 'linear-gradient(135deg, #006837 0%, #008746 100%)',
              boxShadow: '0 4px 14px rgba(0, 104, 55, 0.35)',
            }}
          >
            <CalendarCheck className="w-4 h-4 text-white shrink-0" />
            <span>Book Now</span>
            <ArrowRight className="w-3.5 h-3.5 stroke-[2.5] shrink-0" />
          </motion.button>

          {/* Mobile Menu Hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="xl:hidden p-1.5 sm:p-2 rounded-xl text-slate-800 hover:bg-slate-100 active:bg-slate-200 transition-colors cursor-pointer shrink-0 min-w-[36px] min-h-[36px] flex items-center justify-center border border-slate-200/80 bg-slate-50"
            aria-label="Toggle navigation menu"
          >
            {mobileOpen ? <X className="w-5 h-5 sm:w-6 sm:h-6 text-slate-900" /> : <Menu className="w-5 h-5 sm:w-6 sm:h-6 text-slate-900" />}
          </button>
        </div>
      </div>

      {/* ── MOBILE DRAWER ── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="xl:hidden bg-white border-b border-slate-200 px-5 sm:px-6 py-6 shadow-2xl max-h-[88vh] overflow-y-auto"
          >
            {/* Mobile Header Branding */}
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100">
              <ShibaniLogo size="md" />
              <button
                onClick={() => setMobileOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center cursor-pointer transition-colors"
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Navigation Links Grid */}
            <div className="flex flex-col gap-1.5">
              {[
                { id: 'home', label: 'Home' },
                { id: 'about', label: 'About Us' },
                { id: 'fleet', label: 'Our Vehicles (25+ Fleet)', badge: '25+' },
                { id: 'services', label: 'Our Services' },
                { id: 'tours', label: 'Tour Packages (30+ Odisha)', badge: '30+' },
                { id: 'gallery', label: 'Photo Gallery' },
                { id: 'blog', label: 'Odisha Travel Blog' },
                { id: 'contact', label: 'Contact Us' },
              ].map((item) => {
                const isCurrent = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => navigate(item.id)}
                    className={`w-full text-left py-2.5 px-4 rounded-xl font-bold text-sm transition-all cursor-pointer flex items-center justify-between ${
                      isCurrent
                        ? 'bg-[#006837] text-white shadow-sm'
                        : 'text-slate-800 hover:bg-emerald-50 hover:text-[#006837]'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span>{item.label}</span>
                      {item.badge && (
                        <span className={`text-[10px] font-black px-1.5 py-0.2 rounded-full ${
                          isCurrent ? 'bg-white text-[#006837]' : 'bg-amber-100 text-amber-800'
                        }`}>
                          {item.badge}
                        </span>
                      )}
                    </div>
                    <ArrowRight className={`w-3.5 h-3.5 ${isCurrent ? 'text-white' : 'text-slate-400'}`} />
                  </button>
                );
              })}
            </div>

            {/* Quick Tour Categories Direct Access */}
            <div className="mt-4 pt-4 border-t border-slate-100">
              <div className="flex items-center justify-between mb-2 px-1">
                <span className="text-[11px] font-black uppercase tracking-wider text-[#006837] flex items-center gap-1.5">
                  <Compass className="w-3.5 h-3.5 text-[#E25822]" />
                  <span>Explore 30+ Tour Packages</span>
                </span>
                <button
                  onClick={() => navigate('tours')}
                  className="text-[10px] font-bold text-[#006837] hover:underline cursor-pointer"
                >
                  View All (32) →
                </button>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {[
                  { name: '🕉️ Spiritual Yatras (7)', cat: 'Spiritual Yatras' },
                  { name: '🏛️ Golden Triangle (6)', cat: 'Golden Triangle' },
                  { name: '🌿 Wildlife & Eco (6)', cat: 'Eco & Wildlife' },
                  { name: '⛰️ Hill Stations (5)', cat: 'Hill Stations' },
                  { name: '🏖️ Coastal Beaches (4)', cat: 'Beaches & Coastal' },
                  { name: '🎨 Tribal & Culture (4)', cat: 'Tribal & Culture' },
                ].map((c) => (
                  <button
                    key={c.name}
                    onClick={() => navigate(`tours?category=${encodeURIComponent(c.cat)}`)}
                    className="px-2.5 py-1.5 rounded-lg text-xs font-bold bg-amber-50/80 border border-amber-200/80 text-slate-800 hover:bg-green-50 hover:text-[#006837] transition-colors cursor-pointer"
                  >
                    {c.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Quick Fleet Shortcuts */}
            <div className="mt-4 pt-4 border-t border-slate-100">
              <span className="text-[11px] font-black uppercase tracking-wider text-[#006837] block mb-2 px-1">
                Popular Fleet Direct Access
              </span>
              <div className="flex flex-wrap gap-1.5">
                {[
                  { name: 'Swift Dzire', id: 'v-13' },
                  { name: 'Innova Crysta', id: 'v-3' },
                  { name: 'Force Urbania', id: 'v-5' },
                  { name: 'Toyota Fortuner', id: 'v-4' },
                  { name: 'Tempo Traveller', id: 'v-6' },
                  { name: 'Audi A6 Elite', id: 'v-19' },
                  { name: 'Jaguar XF', id: 'v-20' },
                ].map((v) => (
                  <button
                    key={v.name}
                    onClick={() => navigate('vehicle-' + v.id)}
                    className="px-2.5 py-1 rounded-lg text-xs font-bold bg-slate-50 border border-slate-200 text-slate-700 hover:bg-emerald-50 hover:text-[#006837] transition-colors cursor-pointer"
                  >
                    {v.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Direct Contact & Booking Action Buttons */}
            <div className="mt-5 pt-4 border-t border-slate-200 space-y-2.5">
              <button
                onClick={() => {
                  setMobileOpen(false);
                  openBookingModal();
                }}
                className="w-full py-3.5 bg-gradient-to-r from-[#006837] to-[#008746] text-white rounded-xl font-black text-xs sm:text-sm uppercase tracking-wider shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                <CalendarCheck className="w-4 h-4" />
                <span>Book a Ride Online</span>
              </button>

              <div className="grid grid-cols-2 gap-2">
                <a
                  href="tel:+919861117168"
                  className="py-3 bg-green-50 text-[#006837] border border-green-200 rounded-xl font-bold text-center flex items-center justify-center gap-1.5 text-xs"
                >
                  <Phone className="w-4 h-4 text-[#006837]" />
                  <span>Call Us</span>
                </a>

                <a
                  href="https://wa.me/919861117168"
                  target="_blank"
                  rel="noreferrer"
                  className="py-3 bg-emerald-500 text-white rounded-xl font-bold text-center flex items-center justify-center gap-1.5 text-xs shadow-xs"
                >
                  <MessageSquare className="w-4 h-4 fill-current" />
                  <span>WhatsApp</span>
                </a>
              </div>

              {/* Mobile Social Links Strip */}
              <div className="flex items-center justify-center gap-3 pt-2">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Facebook"
                  className="w-8 h-8 rounded-full bg-slate-100 hover:bg-[#1877F2] hover:text-white text-slate-600 flex items-center justify-center transition-all shadow-xs"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Instagram"
                  className="w-8 h-8 rounded-full bg-slate-100 hover:bg-gradient-to-tr hover:from-[#F58529] hover:via-[#DD2A7B] hover:to-[#8134AF] hover:text-white text-slate-600 flex items-center justify-center transition-all shadow-xs"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="YouTube"
                  className="w-8 h-8 rounded-full bg-slate-100 hover:bg-[#FF0000] hover:text-white text-slate-600 flex items-center justify-center transition-all shadow-xs"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                </a>
                <a
                  href="https://wa.me/919861117168"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="WhatsApp"
                  className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-600 hover:bg-emerald-500 hover:text-white flex items-center justify-center transition-all shadow-xs"
                >
                  <MessageSquare className="w-4 h-4 fill-current" />
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

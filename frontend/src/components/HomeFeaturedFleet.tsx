import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Users, Briefcase, ShieldCheck, Sparkles, ArrowRight,
  Gauge, Check, Phone, Eye, Car, Camera, Star
} from 'lucide-react';

interface HomeFeaturedFleetProps {
  onBookVehicle: (vehicle?: any) => void;
  onViewAllFleet: () => void;
  onSelectVehicle: (id: string) => void;
}

export interface FleetVehicleItem {
  id: string;
  name: string;
  category: string;
  capacity: string;
  luggage: string;
  pricePerKm: string;
  pricePerDay: string;
  img: string;
  features: string[];
  badge: 'AI Showcase' | 'Real Fleet';
  tag: string;
  isReal: boolean;
  filterGroup: 'Sedans' | 'SUVs & MUVs' | 'Force Urbania' | 'Tempo Traveller' | 'Luxury & Wedding' | 'Buses & Coaches';
}

export const ALL_FLEET_VEHICLES: FleetVehicleItem[] = [
  // ── 1. AI-GENERATED SHOWCASE VEHICLES (RESTORED WITH ORIGINAL ASSETS) ──
  {
    id: 'ai-swift-dzire',
    name: 'Maruti Suzuki Swift Dzire',
    category: 'Sedan',
    capacity: '4 Passengers',
    luggage: '2 Bags',
    pricePerKm: '₹12/km',
    pricePerDay: '₹2,400/day',
    img: '/images/swift_dzire_wide.png',
    features: ['AI 3D Showcase Model', 'Dual Chilled AC', 'Bluetooth Audio & GPS', 'Uniformed Chauffeur'],
    badge: 'AI Showcase',
    tag: 'Economy Sedan',
    isReal: false,
    filterGroup: 'Sedans',
  },
  {
    id: 'ai-innova-crysta',
    name: 'Toyota Innova Crysta',
    category: 'Innova Crysta',
    capacity: '7 Passengers',
    luggage: '4 Bags',
    pricePerKm: '₹18/km',
    pricePerDay: '₹3,500/day',
    img: '/images/innova_crysta_wide.png',
    features: ['AI 3D Showcase Model', 'Captain Recliner Seats', 'Independent Roof AC', 'Huge Luggage Boot'],
    badge: 'AI Showcase',
    tag: 'Executive MUV',
    isReal: false,
    filterGroup: 'SUVs & MUVs',
  },
  {
    id: 'ai-fortuner',
    name: 'Toyota Fortuner 4x4',
    category: 'SUV',
    capacity: '7 Passengers',
    luggage: '4 Bags',
    pricePerKm: '₹24/km',
    pricePerDay: '₹5,500/day',
    img: '/images/fortuner_wide.png',
    features: ['AI 3D Showcase Model', '4x4 Off-Road Terrain', 'Sunroof & Leather', 'VIP Convoy Stance'],
    badge: 'AI Showcase',
    tag: 'Premium 4x4 SUV',
    isReal: false,
    filterGroup: 'SUVs & MUVs',
  },
  {
    id: 'ai-force-urbania',
    name: 'Force Urbania Luxury Van',
    category: 'Force Urbania',
    capacity: '17 Passengers',
    luggage: '10 Bags',
    pricePerKm: '₹28/km',
    pricePerDay: '₹8,500/day',
    img: '/images/force_urbania_wide.png',
    features: ['AI 3D Showcase Model', 'Panoramic Sealed Windows', 'Individual Passenger AC & USB', 'Monocoque Body'],
    badge: 'AI Showcase',
    tag: 'Luxury Van',
    isReal: false,
    filterGroup: 'Force Urbania',
  },
  {
    id: 'ai-tempo-traveller',
    name: 'Force Tempo Traveller 17 Seater',
    category: 'Tempo Traveller',
    capacity: '17 Passengers',
    luggage: '10 Bags',
    pricePerKm: '₹22/km',
    pricePerDay: '₹6,000/day',
    img: '/images/tempo_traveller_wide.png',
    features: ['AI 3D Showcase Model', '2x1 Pushback Recliners', 'Chilled Climate AC', 'Heavy Roof Luggage Carrier'],
    badge: 'AI Showcase',
    tag: 'Touring Van',
    isReal: false,
    filterGroup: 'Tempo Traveller',
  },
  {
    id: 'ai-wedding-car',
    name: 'Mercedes-Benz Royal Wedding Limousine',
    category: 'Luxury Cars',
    capacity: '4 Passengers',
    luggage: '3 Bags',
    pricePerKm: '₹65/km',
    pricePerDay: '₹22,000/day',
    img: '/banners/wedding_car.png',
    features: ['AI Showcase Model', 'Fresh Floral Decoration', 'White-Glove Chauffeur', 'Red Carpet Arrival'],
    badge: 'AI Showcase',
    tag: 'Royal Wedding Car',
    isReal: false,
    filterGroup: 'Luxury & Wedding',
  },
  {
    id: 'ai-luxury-coach',
    name: 'Volvo Multi-Axle Luxury Tour Coach',
    category: 'Luxury Bus',
    capacity: '45 Passengers',
    luggage: '35 Bags',
    pricePerKm: '₹48/km',
    pricePerDay: '₹19,000/day',
    img: '/banners/travel_fleet.png',
    features: ['AI Showcase Model', 'Air Suspension Ride', 'PA Mic & LED Screen', 'Interstate Corporate Fleet'],
    badge: 'AI Showcase',
    tag: 'Interstate Coach',
    isReal: false,
    filterGroup: 'Buses & Coaches',
  },

  // ── 2. REAL VERIFIED SHIBANI FLEET PHOTOS (ALL USER VEHICLE PHOTOS) ──
  {
    id: 'real-audi-a6-grille',
    name: 'Audi A6 Matrix Elite (Front Grille)',
    category: 'Luxury Cars',
    capacity: '4 Passengers',
    luggage: '3 Bags',
    pricePerKm: '₹45/km',
    pricePerDay: '₹16,000/day',
    img: '/vehicles/real/audi_a6_front_grille_real.jpg',
    features: ['Real Shibani Fleet', 'Matrix LED Headlamps', 'Bang & Olufsen 3D Sound', 'Plate: UP14 CU 2276'],
    badge: 'Real Fleet',
    tag: 'VIP Luxury Sedan',
    isReal: true,
    filterGroup: 'Luxury & Wedding',
  },
  {
    id: 'real-audi-a6-open',
    name: 'Audi A6 Matrix Elite (Lounge View)',
    category: 'Luxury Cars',
    capacity: '4 Passengers',
    luggage: '3 Bags',
    pricePerKm: '₹45/km',
    pricePerDay: '₹16,000/day',
    img: '/vehicles/real/audi_a6_doors_open_real.jpg',
    features: ['Real Shibani Fleet', 'All Doors Open Welcoming Stance', 'Milano Leather Upholstery', 'Bhubaneswar Airport VIP'],
    badge: 'Real Fleet',
    tag: 'Wedding & Delegation',
    isReal: true,
    filterGroup: 'Luxury & Wedding',
  },
  {
    id: 'real-jaguar-xf-hotel',
    name: 'Jaguar XF Royal Portico Edition',
    category: 'Luxury Cars',
    capacity: '4 Passengers',
    luggage: '3 Bags',
    pricePerKm: '₹50/km',
    pricePerDay: '₹18,000/day',
    img: '/vehicles/real/jaguar_xf_hotel_portico_real.jpg',
    features: ['Real Shibani Fleet', 'British Luxury Design', 'Meridian Sound System', 'Plate: HR26 DM 2323'],
    badge: 'Real Fleet',
    tag: 'Royal Wedding Car',
    isReal: true,
    filterGroup: 'Luxury & Wedding',
  },
  {
    id: 'real-jaguar-xf-road',
    name: 'Jaguar XF Highway Tourer',
    category: 'Luxury Cars',
    capacity: '4 Passengers',
    luggage: '3 Bags',
    pricePerKm: '₹50/km',
    pricePerDay: '₹18,000/day',
    img: '/vehicles/real/jaguar_xf_road_profile_real.jpg',
    features: ['Real Shibani Fleet', 'Adaptive Suspension', 'Rotary Gear Shifter', 'Highway Escort Vehicle'],
    badge: 'Real Fleet',
    tag: 'Executive Travel',
    isReal: true,
    filterGroup: 'Luxury & Wedding',
  },
  {
    id: 'real-mercedes-interior',
    name: 'Mercedes-Benz E-Class Cockpit',
    category: 'Luxury Cars',
    capacity: '4 Passengers',
    luggage: '3 Bags',
    pricePerKm: '₹55/km',
    pricePerDay: '₹20,000/day',
    img: '/vehicles/real/mercedes_benz_driver_seat_interior_real.jpg',
    features: ['Real Shibani Fleet', 'Dual 12.3-inch Cockpit Displays', 'Burmester Surround Audio', 'Nappa Leather Heated Seats'],
    badge: 'Real Fleet',
    tag: 'VIP Luxury Interior',
    isReal: true,
    filterGroup: 'Luxury & Wedding',
  },
  {
    id: 'real-force-urbania-wedding',
    name: 'Force Urbania Wedding Garland Edition',
    category: 'Force Urbania',
    capacity: '17 Passengers',
    luggage: '10 Bags',
    pricePerKm: '₹28/km',
    pricePerDay: '₹8,500/day',
    img: '/vehicles/real/force_urbania_wedding_garland_real.jpg',
    features: ['Real Shibani Fleet', 'Decorated with Fresh Marigold Garland', '17 Pushback Ergonomic Seats', 'Panoramic View Windows'],
    badge: 'Real Fleet',
    tag: 'Marriage Baraat Van',
    isReal: true,
    filterGroup: 'Force Urbania',
  },
  {
    id: 'real-force-urbania-bronze',
    name: 'Force Urbania Bronze Luxury Van',
    category: 'Force Urbania',
    capacity: '17 Passengers',
    luggage: '10 Bags',
    pricePerKm: '₹28/km',
    pricePerDay: '₹8,500/day',
    img: '/vehicles/real/force_urbania_luxury_van_bronze_real.jpg',
    features: ['Real Shibani Fleet', 'Metallic Bronze Exterior', 'Monocoque Aerodynamic Design', 'USB Port per Passenger'],
    badge: 'Real Fleet',
    tag: 'Corporate & Tour Van',
    isReal: true,
    filterGroup: 'Force Urbania',
  },
  {
    id: 'real-traveller-jagannath',
    name: 'Force Traveller Jay Jagannath (17 Seater)',
    category: 'Tempo Traveller',
    capacity: '17 Passengers',
    luggage: '10 Bags',
    pricePerKm: '₹24/km',
    pricePerDay: '₹6,500/day',
    img: '/vehicles/real/force_traveller_jay_jagannath_real.jpg',
    features: ['Real Shibani Fleet', 'Blessed Puri Dham Pilgrimage Vehicle', 'Plate: OD02 AX 4881', 'Heavy Duty Luggage Carrier'],
    badge: 'Real Fleet',
    tag: 'Puri Yatra Special',
    isReal: true,
    filterGroup: 'Tempo Traveller',
  },
  {
    id: 'real-traveller-tarini',
    name: 'Force Traveller Jay Maa Tarini (26 Seater)',
    category: 'Tempo Traveller',
    capacity: '26 Passengers',
    luggage: '15 Bags',
    pricePerKm: '₹32/km',
    pricePerDay: '₹9,500/day',
    img: '/vehicles/real/force_traveller_jay_maa_tarini_real.jpg',
    features: ['Real Shibani Fleet', 'Plate: OD05 AK 9627', '2x1 Luxury Pushback Recliners', 'Ghatgaon & Keonjhar Circuit'],
    badge: 'Real Fleet',
    tag: 'Group Pilgrimage',
    isReal: true,
    filterGroup: 'Tempo Traveller',
  },
  {
    id: 'real-traveller-interior-led',
    name: 'Tempo Traveller Maharaja Ambient LED Edition',
    category: 'Tempo Traveller',
    capacity: '12 Passengers',
    luggage: '8 Bags',
    pricePerKm: '₹26/km',
    pricePerDay: '₹7,500/day',
    img: '/vehicles/real/tempo_traveller_luxury_interior_led_real.jpg',
    features: ['Real Shibani Fleet', 'Orange Diamond Quilted Recliners', 'Multi-Color Mood LED Ceiling', 'Surround Sound Audio'],
    badge: 'Real Fleet',
    tag: 'Maharaja Lounge',
    isReal: true,
    filterGroup: 'Tempo Traveller',
  },
  {
    id: 'real-traveller-pushback',
    name: 'Tempo Traveller Executive 2x1 Pushback',
    category: 'Tempo Traveller',
    capacity: '17 Passengers',
    luggage: '10 Bags',
    pricePerKm: '₹24/km',
    pricePerDay: '₹6,500/day',
    img: '/vehicles/real/tempo_traveller_pushback_seats_interior_real.jpg',
    features: ['Real Shibani Fleet', 'Wide Aisles & Individual Armrests', 'High-Capacity Chilled AC Blowers', 'Highway Seating Comfort'],
    badge: 'Real Fleet',
    tag: 'Touring Recliner',
    isReal: true,
    filterGroup: 'Tempo Traveller',
  },
  {
    id: 'real-sml-coach',
    name: 'SML Executive AC Coach (31 Seater)',
    category: 'Luxury Bus',
    capacity: '31 Passengers',
    luggage: '25 Bags',
    pricePerKm: '₹38/km',
    pricePerDay: '₹14,000/day',
    img: '/vehicles/real/sml_executive_coach_bus_real.jpg',
    features: ['Real Shibani Fleet', 'Air Suspension Ride', 'PA Mic & Sound System', 'Big Conferences & Baraats'],
    badge: 'Real Fleet',
    tag: 'Executive Bus',
    isReal: true,
    filterGroup: 'Buses & Coaches',
  },
  {
    id: 'real-tata-winger',
    name: 'Tata Winger Executive (OD02 CM 9290)',
    category: 'Tempo Traveller',
    capacity: '15 Passengers',
    luggage: '8 Bags',
    pricePerKm: '₹20/km',
    pricePerDay: '₹5,500/day',
    img: '/vehicles/real/tata_winger_od02cm9290_rear_real.jpg',
    features: ['Real Shibani Fleet', 'Plate: OD02 CM 9290', 'High Roof Stand-Up Cabin', 'Twin Independent ACs'],
    badge: 'Real Fleet',
    tag: 'Family Tourer',
    isReal: true,
    filterGroup: 'Tempo Traveller',
  },
  {
    id: 'real-honda-city',
    name: 'Honda City i-VTEC Sport (White)',
    category: 'Sedan',
    capacity: '4 Passengers',
    luggage: '3 Bags',
    pricePerKm: '₹16/km',
    pricePerDay: '₹3,200/day',
    img: '/vehicles/real/honda_city_sport_white_real.jpg',
    features: ['Real Shibani Fleet', 'Pure White Aerodynamic Finish', 'Electric Sunroof & Cruise', 'Airport Executive Cab'],
    badge: 'Real Fleet',
    tag: 'Premium Sedan',
    isReal: true,
    filterGroup: 'Sedans',
  },
  {
    id: 'real-hyundai-verna',
    name: 'Hyundai Verna Premium Sedan (White)',
    category: 'Sedan',
    capacity: '4 Passengers',
    luggage: '3 Bags',
    pricePerKm: '₹16/km',
    pricePerDay: '₹3,000/day',
    img: '/vehicles/real/hyundai_verna_white_real.jpg',
    features: ['Real Shibani Fleet', 'Ventilated Front Seats', 'Whisper-Quiet Cabin', 'City & Outstation Tours'],
    badge: 'Real Fleet',
    tag: 'Sedan',
    isReal: true,
    filterGroup: 'Sedans',
  },
  {
    id: 'real-traveller-od02df4498',
    name: 'Force Traveller 17 Seater (OD02 DF 4498)',
    category: 'Tempo Traveller',
    capacity: '17 Passengers',
    luggage: '10 Bags',
    pricePerKm: '₹24/km',
    pricePerDay: '₹6,500/day',
    img: '/vehicles/real/force_traveller_od02df4498_front_real.jpg',
    features: ['Real Shibani Fleet', 'Plate: OD02 DF 4498', 'Rear Luggage Ladder', 'Chilled Dual AC Blowers'],
    badge: 'Real Fleet',
    tag: 'Touring Van',
    isReal: true,
    filterGroup: 'Tempo Traveller',
  },
  {
    id: 'real-traveller-od02du3328',
    name: 'Force Traveller Tourist Cruiser (OD02 DU 3328)',
    category: 'Tempo Traveller',
    capacity: '17 Passengers',
    luggage: '10 Bags',
    pricePerKm: '₹24/km',
    pricePerDay: '₹6,500/day',
    img: '/vehicles/real/force_traveller_od02du3328_rear_real.jpg',
    features: ['Real Shibani Fleet', 'Plate: OD02 DU 3328', 'Full Rear Guard & Step', 'Puri, Konark, Chilika Circuit'],
    badge: 'Real Fleet',
    tag: 'Holiday Cruiser',
    isReal: true,
    filterGroup: 'Tempo Traveller',
  },
  {
    id: 'real-traveller-od33ba4090',
    name: 'Force Traveller Showroom Delivery (OD33 BA 4090)',
    category: 'Tempo Traveller',
    capacity: '17 Passengers',
    luggage: '10 Bags',
    pricePerKm: '₹24/km',
    pricePerDay: '₹6,500/day',
    img: '/vehicles/real/force_traveller_od33ba4090_delivery_real.jpg',
    features: ['Real Shibani Fleet', 'Plate: OD33 BA 4090', 'Brand New Fleet Unit', 'Smooth Long Distance Journey'],
    badge: 'Real Fleet',
    tag: 'New Fleet Unit',
    isReal: true,
    filterGroup: 'Tempo Traveller',
  },
  {
    id: 'real-audi-a6-portrait',
    name: 'Audi A6 Matrix Elite (Portrait View)',
    category: 'Luxury Cars',
    capacity: '4 Passengers',
    luggage: '3 Bags',
    pricePerKm: '₹45/km',
    pricePerDay: '₹16,000/day',
    img: '/vehicles/real/audi_a6_front_portrait_real.jpg',
    features: ['Real Shibani Fleet', 'Executive Stance', 'Virtual Cockpit', 'Plate: UP14 CU 2276'],
    badge: 'Real Fleet',
    tag: 'VIP Luxury Sedan',
    isReal: true,
    filterGroup: 'Luxury & Wedding',
  },
  {
    id: 'real-audi-a6-side',
    name: 'Audi A6 Matrix Elite (Side Profile)',
    category: 'Luxury Cars',
    capacity: '4 Passengers',
    luggage: '3 Bags',
    pricePerKm: '₹45/km',
    pricePerDay: '₹16,000/day',
    img: '/vehicles/real/audi_a6_side_profile_real.jpg',
    features: ['Real Shibani Fleet', 'Aerodynamic Side Stance', 'Sunroof', 'Plate: UP14 CU 2276'],
    badge: 'Real Fleet',
    tag: 'VIP Luxury Sedan',
    isReal: true,
    filterGroup: 'Luxury & Wedding',
  },
  {
    id: 'real-audi-a6-cockpit',
    name: 'Audi A6 Virtual Cockpit & Dashboard',
    category: 'Luxury Cars',
    capacity: '4 Passengers',
    luggage: '3 Bags',
    pricePerKm: '₹45/km',
    pricePerDay: '₹16,000/day',
    img: '/vehicles/real/audi_a6_interior_cockpit_real.jpg',
    features: ['Real Shibani Fleet', 'Dual Touchscreen MMI Navigation', 'Virtual Cockpit', 'Ambient Lighting'],
    badge: 'Real Fleet',
    tag: 'Executive Cockpit',
    isReal: true,
    filterGroup: 'Luxury & Wedding',
  },
  {
    id: 'real-jaguar-xf-nature',
    name: 'Jaguar XF Royal Nature Retreat',
    category: 'Luxury Cars',
    capacity: '4 Passengers',
    luggage: '3 Bags',
    pricePerKm: '₹50/km',
    pricePerDay: '₹18,000/day',
    img: '/vehicles/real/jaguar_xf_nature_doors_open_real.jpg',
    features: ['Real Shibani Fleet', 'Pure White British Luxury', 'Open Doors Ambience', 'Plate: HR26 DM 2323'],
    badge: 'Real Fleet',
    tag: 'Royal Wedding Car',
    isReal: true,
    filterGroup: 'Luxury & Wedding',
  },
  {
    id: 'real-mercedes-cockpit-wide',
    name: 'Mercedes-Benz Ambient Cockpit Lounge',
    category: 'Luxury Cars',
    capacity: '4 Passengers',
    luggage: '3 Bags',
    pricePerKm: '₹55/km',
    pricePerDay: '₹20,000/day',
    img: '/vehicles/real/mercedes_benz_interior_cockpit_real.jpg',
    features: ['Real Shibani Fleet', '64-Color Ambient Lighting', 'Executive Rear Seating', 'Plate: OD02 MB 2026'],
    badge: 'Real Fleet',
    tag: 'VIP Luxury Interior',
    isReal: true,
    filterGroup: 'Luxury & Wedding',
  },
  {
    id: 'real-traveller-od02ax4881',
    name: 'Force Traveller Super Cruiser (OD02 AX 4881)',
    category: 'Tempo Traveller',
    capacity: '17 Passengers',
    luggage: '10 Bags',
    pricePerKm: '₹24/km',
    pricePerDay: '₹6,500/day',
    img: '/vehicles/real/force_traveller_od02ax4881_front_real.jpg',
    features: ['Real Shibani Fleet', 'Plate: OD02 AX 4881', 'High Roof Stand-Up Height', 'Puri Mandir Darshan Special'],
    badge: 'Real Fleet',
    tag: 'Pilgrimage Special',
    isReal: true,
    filterGroup: 'Tempo Traveller',
  },
  {
    id: 'real-traveller-od02df4498-rear',
    name: 'Force Traveller Heavy Carrier Edition',
    category: 'Tempo Traveller',
    capacity: '17 Passengers',
    luggage: '12 Bags',
    pricePerKm: '₹24/km',
    pricePerDay: '₹6,500/day',
    img: '/vehicles/real/force_traveller_od02df4498_rear_ladder_real.jpg',
    features: ['Real Shibani Fleet', 'Full Rear Heavy Step & Ladder', 'Luggage Roof Rails', 'Outstation Tour Ready'],
    badge: 'Real Fleet',
    tag: 'Heavy Carrier Van',
    isReal: true,
    filterGroup: 'Tempo Traveller',
  },
  {
    id: 'real-traveller-side',
    name: 'Force Traveller Highway Explorer (White)',
    category: 'Tempo Traveller',
    capacity: '17 Passengers',
    luggage: '10 Bags',
    pricePerKm: '₹24/km',
    pricePerDay: '₹6,500/day',
    img: '/vehicles/real/force_traveller_side_view_real.jpg',
    features: ['Real Shibani Fleet', 'Aerodynamic Side Profile', 'Tinted UV Glass', 'Long Distance Comfort'],
    badge: 'Real Fleet',
    tag: 'Highway Tourer',
    isReal: true,
    filterGroup: 'Tempo Traveller',
  },
  {
    id: 'real-traveller-cba-side',
    name: 'Force Traveller Corporate Cab Fleet',
    category: 'Tempo Traveller',
    capacity: '17 Passengers',
    luggage: '10 Bags',
    pricePerKm: '₹24/km',
    pricePerDay: '₹6,500/day',
    img: '/vehicles/real/force_traveller_cba_cabs_side_real.jpg',
    features: ['Real Shibani Fleet', 'Corporate Employee Transport', 'Uniformed Chauffeur', 'Dedicated Route Support'],
    badge: 'Real Fleet',
    tag: 'Corporate Fleet',
    isReal: true,
    filterGroup: 'Tempo Traveller',
  },
];

const CATEGORY_TABS = [
  'All Fleet (34+)',
  '✨ AI Showcase (7)',
  '📸 Real Fleet Photos (27)',
  'Sedans',
  'SUVs & MUVs',
  'Force Urbania',
  'Tempo Traveller',
  'Luxury & Wedding',
  'Buses & Coaches',
];

export default function HomeFeaturedFleet({
  onBookVehicle,
  onViewAllFleet,
  onSelectVehicle,
}: HomeFeaturedFleetProps) {
  const [activeTab, setActiveTab] = useState('All Fleet (34+)');

  const filtered =
    activeTab === 'All Fleet (34+)'
      ? ALL_FLEET_VEHICLES
      : activeTab === '✨ AI Showcase (7)'
      ? ALL_FLEET_VEHICLES.filter((v) => !v.isReal || v.badge === 'AI Showcase')
      : activeTab === '📸 Real Fleet Photos (27)'
      ? ALL_FLEET_VEHICLES.filter((v) => v.isReal || v.badge === 'Real Fleet')
      : ALL_FLEET_VEHICLES.filter((v) => v.filterGroup === activeTab || v.category === activeTab);

  return (
    <section className="py-20 sm:py-24 bg-[#FAFDFB] relative overflow-hidden" id="fleet">
      
      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div className="absolute top-1/4 right-0 w-[500px] h-[500px] rounded-full bg-emerald-100/40 blur-3xl" />
        <div className="absolute bottom-1/4 left-0 w-[500px] h-[500px] rounded-full bg-amber-100/30 blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-10">
          <div className="flex items-center justify-center gap-3 mb-2">
            <div className="w-10 sm:w-16 h-0.5 bg-[#006837]" />
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight">
              <span className="text-[#006837]">Our Complete</span>{' '}
              <span className="text-[#D32F2F]">Travel Fleet</span>
            </h2>
            <div className="w-10 sm:w-16 h-0.5 bg-[#006837]" />
          </div>
          <p className="text-sm sm:text-base font-semibold text-slate-600 max-w-2xl mx-auto">
            Explore both our 3D AI Showcase models and real verified Odisha fleet photos — Sedans, Innova Crysta, Force Urbania, Luxury Tempo Travellers, Audi, Jaguar & Volvo Coaches.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center justify-center gap-2 overflow-x-auto pb-4 mb-10 scrollbar-none flex-nowrap sm:flex-wrap">
          {CATEGORY_TABS.map((tab) => {
            const isActive = activeTab === tab;
            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-full text-xs font-bold tracking-wide transition-all whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'bg-[#006837] text-white shadow-md scale-105 ring-2 ring-[#006837]/30'
                    : 'bg-white text-slate-700 hover:bg-green-50 border border-slate-200 hover:border-green-300'
                }`}
              >
                {tab}
              </button>
            );
          })}
        </div>

        {/* ══ VEHICLES GRID ══ */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <AnimatePresence mode="popLayout">
            {filtered.map((vehicle) => (
              <motion.div
                key={vehicle.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-3xl p-5 border border-slate-100 shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col justify-between group relative overflow-hidden"
              >
                {/* Top Badge Row */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                    {vehicle.tag}
                  </span>
                  
                  {vehicle.isReal ? (
                    <span className="text-[10px] font-black px-2.5 py-1 rounded-full bg-emerald-600 text-white shadow-sm flex items-center gap-1">
                      <Camera className="w-3 h-3" />
                      <span>Real Photo</span>
                    </span>
                  ) : (
                    <span className="text-[10px] font-black px-2.5 py-1 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-sm flex items-center gap-1">
                      <Sparkles className="w-3 h-3" />
                      <span>AI 3D Model</span>
                    </span>
                  )}
                </div>

                {/* Vehicle Image Container */}
                <div className="h-48 sm:h-52 w-full overflow-hidden rounded-2xl my-2 border border-slate-200/80 bg-slate-50 relative flex items-center justify-center p-2">
                  <img
                    src={vehicle.img}
                    alt={vehicle.name}
                    className="w-full h-full object-cover rounded-xl transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between pointer-events-none">
                    <span className="text-[10px] font-bold text-white bg-black/60 backdrop-blur-md px-2 py-0.5 rounded border border-white/20">
                      {vehicle.category}
                    </span>
                  </div>
                </div>

                {/* Name & Capacity Row */}
                <div>
                  <h3 className="text-base font-black text-slate-900 group-hover:text-[#006837] transition-colors leading-tight mb-2">
                    {vehicle.name}
                  </h3>

                  {/* Specs Chips */}
                  <div className="flex items-center gap-3 text-slate-500 text-xs mb-3 font-medium">
                    <span className="flex items-center gap-1">
                      <Users className="w-3.5 h-3.5 text-[#006837]" />
                      {vehicle.capacity}
                    </span>
                    <span className="flex items-center gap-1">
                      <Briefcase className="w-3.5 h-3.5 text-[#D32F2F]" />
                      {vehicle.luggage}
                    </span>
                  </div>

                  {/* Feature Checkmarks */}
                  <div className="space-y-1 mb-4 border-t border-slate-100 pt-3">
                    {vehicle.features.slice(0, 3).map((f, i) => (
                      <div key={i} className="flex items-center gap-1.5 text-[11px] text-slate-600">
                        <Check className="w-3 h-3 text-[#006837] stroke-[3]" />
                        <span className="truncate">{f}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Pricing & CTA Button */}
                <div className="border-t border-slate-100 pt-3 mt-auto">
                  <div className="flex items-baseline justify-between mb-3">
                    <div>
                      <span className="text-lg font-black text-[#006837]">
                        {vehicle.pricePerKm}
                      </span>
                      <span className="text-[10px] text-slate-400 ml-1">/ Outstation</span>
                    </div>
                    <span className="text-xs font-bold text-slate-600">
                      {vehicle.pricePerDay}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => onSelectVehicle(vehicle.id)}
                      className="py-2 px-3 rounded-xl text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors flex items-center justify-center gap-1 cursor-pointer"
                    >
                      <Eye className="w-3.5 h-3.5" /> Details
                    </button>
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => onBookVehicle(vehicle)}
                      className="py-2 px-3 rounded-xl text-xs font-bold text-white shadow-md transition-all flex items-center justify-center gap-1 cursor-pointer"
                      style={{
                        background: 'linear-gradient(135deg, #006837 0%, #008746 100%)',
                      }}
                    >
                      <span>Book</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* ══ QUALITY & SERVICE GUARANTEE BANNER ══ */}
        <div
          className="rounded-3xl p-6 sm:p-8 text-white shadow-2xl relative overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, #004D26 0%, #006837 60%, #013A1D 100%)',
          }}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-center">
            {[
              { title: 'Well-Maintained Fleet', desc: 'Sanitized, inspected, and road-ready before every departure' },
              { title: 'Police Verified Chauffeurs', desc: 'Courteous local drivers fluent in Odia, Hindi & English' },
              { title: 'Safe & Comfortable Travel', desc: 'GPS tracked 24/7 with comprehensive passenger insurance' },
              { title: '24x7 Support Desk', desc: 'Instant WhatsApp & phone dispatch assistance for peace of mind' },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-[#EAB308] text-[#004D26] flex items-center justify-center shrink-0 font-bold text-xs mt-0.5">
                  ✓
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white tracking-wide">
                    {item.title}
                  </h4>
                  <p className="text-xs text-green-100/75 mt-0.5 font-medium leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 pt-5 border-t border-white/15 flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-xs text-green-100/90 font-medium">
              Looking for custom multi-vehicle convoy or corporate bus fleet?
            </span>
            <button
              onClick={onViewAllFleet}
              className="py-2.5 px-6 rounded-full text-xs font-bold text-[#004D26] bg-white hover:bg-green-50 transition-colors flex items-center gap-2 cursor-pointer shadow-lg"
            >
              <span>Explore All 35+ Vehicles</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}

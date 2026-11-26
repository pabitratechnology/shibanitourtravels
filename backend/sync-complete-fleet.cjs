const fs = require('fs');
const path = require('path');
const sqlite3 = require('sqlite3');

const jsonPath = path.join(__dirname, 'database.json');
const sqlitePath = path.join(__dirname, 'database.sqlite');

// ── 1. AI-GENERATED SHOWCASE FLEET (7 CANONICAL 3D MODELS) ──
const aiVehicles = [
  {
    id: 'ai-swift-dzire',
    name: 'Maruti Suzuki Swift Dzire (AI Showcase)',
    category: 'Sedan',
    image: '/images/swift_dzire_wide.png',
    pricePerKm: 12,
    pricePerDay: 2400,
    capacity: 4,
    luggage: 2,
    mileage: '22 km/l',
    specifications: { ac: true, musicSystem: true, chargingPort: true, pushbackSeats: false, airbags: true, gps: true },
    features: ['AI 3D Showcase Model', 'Dual Chilled AC', 'Bluetooth Audio & GPS', 'Uniformed Chauffeur'],
    availability: 'Available',
    gallery: ['/images/swift_dzire_wide.png', '/images/swift_dzire.png'],
    plateNumber: 'OD02 DZ 2026',
    isRealFleet: false,
    badge: 'AI Showcase'
  },
  {
    id: 'ai-innova-crysta',
    name: 'Toyota Innova Crysta (AI Showcase)',
    category: 'Innova Crysta',
    image: '/images/innova_crysta_wide.png',
    pricePerKm: 18,
    pricePerDay: 3500,
    capacity: 7,
    luggage: 4,
    mileage: '14 km/l',
    specifications: { ac: true, musicSystem: true, chargingPort: true, pushbackSeats: true, airbags: true, gps: true },
    features: ['AI 3D Showcase Model', 'Captain Recliner Seats', 'Independent Roof AC', 'Huge Boot Space'],
    availability: 'Available',
    gallery: ['/images/innova_crysta_wide.png', '/images/innova_crysta.png'],
    plateNumber: 'OD02 CR 2026',
    isRealFleet: false,
    badge: 'AI Showcase'
  },
  {
    id: 'ai-fortuner',
    name: 'Toyota Fortuner 4x4 (AI Showcase)',
    category: 'SUV',
    image: '/images/fortuner_wide.png',
    pricePerKm: 24,
    pricePerDay: 5500,
    capacity: 7,
    luggage: 4,
    mileage: '12 km/l',
    specifications: { ac: true, musicSystem: true, chargingPort: true, pushbackSeats: true, airbags: true, gps: true },
    features: ['AI 3D Showcase Model', '4x4 Off-Road Terrain', 'Sunroof & Leather', 'VIP Convoy Stance'],
    availability: 'Available',
    gallery: ['/images/fortuner_wide.png', '/images/fortuner.png'],
    plateNumber: 'OD02 FT 4444',
    isRealFleet: false,
    badge: 'AI Showcase'
  },
  {
    id: 'ai-force-urbania',
    name: 'Force Urbania Luxury Van (AI Showcase)',
    category: 'Force Urbania',
    image: '/images/force_urbania_wide.png',
    pricePerKm: 28,
    pricePerDay: 8500,
    capacity: 17,
    luggage: 10,
    mileage: '11 km/l',
    specifications: { ac: true, musicSystem: true, chargingPort: true, pushbackSeats: true, airbags: true, gps: true },
    features: ['AI 3D Showcase Model', 'Panoramic Picture Windows', 'Individual AC & USB', 'Monocoque Body'],
    availability: 'Available',
    gallery: ['/images/force_urbania_wide.png', '/images/force_urbania.png'],
    plateNumber: 'OD02 UR 2026',
    isRealFleet: false,
    badge: 'AI Showcase'
  },
  {
    id: 'ai-tempo-traveller',
    name: 'Force Tempo Traveller 17 Seater (AI Showcase)',
    category: 'Tempo Traveller',
    image: '/images/tempo_traveller_wide.png',
    pricePerKm: 22,
    pricePerDay: 6000,
    capacity: 17,
    luggage: 10,
    mileage: '10 km/l',
    specifications: { ac: true, musicSystem: true, chargingPort: true, pushbackSeats: true, airbags: true, gps: true },
    features: ['AI 3D Showcase Model', '2x1 Pushback Recliners', 'Chilled Climate AC', 'Roof Luggage Carrier'],
    availability: 'Available',
    gallery: ['/images/tempo_traveller_wide.png', '/images/tempo_traveller.png'],
    plateNumber: 'OD02 TT 2026',
    isRealFleet: false,
    badge: 'AI Showcase'
  },
  {
    id: 'ai-wedding-car',
    name: 'Mercedes-Benz Royal Wedding Limousine (AI Showcase)',
    category: 'Luxury Cars',
    image: '/banners/wedding_car.png',
    pricePerKm: 65,
    pricePerDay: 22000,
    capacity: 4,
    luggage: 3,
    mileage: '10 km/l',
    specifications: { ac: true, musicSystem: true, chargingPort: true, pushbackSeats: true, airbags: true, gps: true },
    features: ['AI Showcase Model', 'Fresh Floral Decoration', 'White-Glove Chauffeur', 'Red Carpet Arrival'],
    availability: 'Available',
    gallery: ['/banners/wedding_car.png'],
    plateNumber: 'OD02 WD 9999',
    isRealFleet: false,
    badge: 'AI Showcase'
  },
  {
    id: 'ai-luxury-coach',
    name: 'Volvo Multi-Axle Luxury Tour Coach (AI Showcase)',
    category: 'Luxury Bus',
    image: '/banners/travel_fleet.png',
    pricePerKm: 48,
    pricePerDay: 19000,
    capacity: 45,
    luggage: 35,
    mileage: '6 km/l',
    specifications: { ac: true, musicSystem: true, chargingPort: true, pushbackSeats: true, airbags: true, gps: true },
    features: ['AI Showcase Model', 'Air Suspension Ride', 'PA Mic & LED Screen', 'Interstate Corporate Fleet'],
    availability: 'Available',
    gallery: ['/banners/travel_fleet.png'],
    plateNumber: 'OD02 VL 1000',
    isRealFleet: false,
    badge: 'AI Showcase'
  }
];

// ── 2. REAL VERIFIED SHIBANI FLEET (ALL 27 REAL VEHICLE PHOTOS) ──
const realVehicles = [
  {
    id: 'real-audi-a6-grille',
    name: 'Audi A6 Matrix Elite (Front Grille)',
    category: 'Luxury Cars',
    image: '/vehicles/real/audi_a6_front_grille_real.jpg',
    pricePerKm: 45,
    pricePerDay: 16000,
    capacity: 4,
    luggage: 3,
    mileage: '14 km/l',
    specifications: { ac: true, musicSystem: true, chargingPort: true, pushbackSeats: true, airbags: true, gps: true },
    features: ['Real Shibani Fleet', 'Matrix LED Headlamps', 'Bang & Olufsen 3D Sound', 'Plate: UP14 CU 2276'],
    availability: 'Available',
    gallery: [
      '/vehicles/real/audi_a6_front_grille_real.jpg',
      '/vehicles/real/audi_a6_front_portrait_real.jpg',
      '/vehicles/real/audi_a6_side_profile_real.jpg',
      '/vehicles/real/audi_a6_doors_open_real.jpg',
      '/vehicles/real/audi_a6_interior_cockpit_real.jpg'
    ],
    plateNumber: 'UP14 CU 2276',
    isRealFleet: true,
    badge: 'Real Fleet'
  },
  {
    id: 'real-audi-a6-open',
    name: 'Audi A6 Matrix Elite (Executive Lounge)',
    category: 'Luxury Cars',
    image: '/vehicles/real/audi_a6_doors_open_real.jpg',
    pricePerKm: 45,
    pricePerDay: 16000,
    capacity: 4,
    luggage: 3,
    mileage: '14 km/l',
    specifications: { ac: true, musicSystem: true, chargingPort: true, pushbackSeats: true, airbags: true, gps: true },
    features: ['Real Shibani Fleet', 'All Doors Open Welcoming View', 'Milano Leather Upholstery', 'Airport VIP Pickup'],
    availability: 'Available',
    gallery: [
      '/vehicles/real/audi_a6_doors_open_real.jpg',
      '/vehicles/real/audi_a6_interior_cockpit_real.jpg'
    ],
    plateNumber: 'UP14 CU 2276',
    isRealFleet: true,
    badge: 'Real Fleet'
  },
  {
    id: 'real-audi-a6-portrait',
    name: 'Audi A6 Matrix Elite (Portrait View)',
    category: 'Luxury Cars',
    image: '/vehicles/real/audi_a6_front_portrait_real.jpg',
    pricePerKm: 45,
    pricePerDay: 16000,
    capacity: 4,
    luggage: 3,
    mileage: '14 km/l',
    specifications: { ac: true, musicSystem: true, chargingPort: true, pushbackSeats: true, airbags: true, gps: true },
    features: ['Real Shibani Fleet', 'Executive Stance', 'Virtual Cockpit', 'Plate: UP14 CU 2276'],
    availability: 'Available',
    gallery: ['/vehicles/real/audi_a6_front_portrait_real.jpg'],
    plateNumber: 'UP14 CU 2276',
    isRealFleet: true,
    badge: 'Real Fleet'
  },
  {
    id: 'real-audi-a6-side',
    name: 'Audi A6 Matrix Elite (Side Profile)',
    category: 'Luxury Cars',
    image: '/vehicles/real/audi_a6_side_profile_real.jpg',
    pricePerKm: 45,
    pricePerDay: 16000,
    capacity: 4,
    luggage: 3,
    mileage: '14 km/l',
    specifications: { ac: true, musicSystem: true, chargingPort: true, pushbackSeats: true, airbags: true, gps: true },
    features: ['Real Shibani Fleet', 'Aerodynamic Side Stance', 'Sunroof', 'Plate: UP14 CU 2276'],
    availability: 'Available',
    gallery: ['/vehicles/real/audi_a6_side_profile_real.jpg'],
    plateNumber: 'UP14 CU 2276',
    isRealFleet: true,
    badge: 'Real Fleet'
  },
  {
    id: 'real-audi-a6-cockpit',
    name: 'Audi A6 Virtual Cockpit & Dashboard',
    category: 'Luxury Cars',
    image: '/vehicles/real/audi_a6_interior_cockpit_real.jpg',
    pricePerKm: 45,
    pricePerDay: 16000,
    capacity: 4,
    luggage: 3,
    mileage: '14 km/l',
    specifications: { ac: true, musicSystem: true, chargingPort: true, pushbackSeats: true, airbags: true, gps: true },
    features: ['Real Shibani Fleet', 'Dual Touchscreen MMI Navigation', 'Virtual Cockpit Digital Instrument', 'Ambient LED'],
    availability: 'Available',
    gallery: ['/vehicles/real/audi_a6_interior_cockpit_real.jpg'],
    plateNumber: 'UP14 CU 2276',
    isRealFleet: true,
    badge: 'Real Fleet'
  },
  {
    id: 'real-jaguar-xf-hotel',
    name: 'Jaguar XF Royal Portico Edition',
    category: 'Luxury Cars',
    image: '/vehicles/real/jaguar_xf_hotel_portico_real.jpg',
    pricePerKm: 50,
    pricePerDay: 18000,
    capacity: 4,
    luggage: 3,
    mileage: '13 km/l',
    specifications: { ac: true, musicSystem: true, chargingPort: true, pushbackSeats: true, airbags: true, gps: true },
    features: ['Real Shibani Fleet', 'Portico Luxury Entrance', 'Meridian Sound System', 'Plate: HR26 DM 2323'],
    availability: 'Available',
    gallery: [
      '/vehicles/real/jaguar_xf_hotel_portico_real.jpg',
      '/vehicles/real/jaguar_xf_road_profile_real.jpg',
      '/vehicles/real/jaguar_xf_nature_doors_open_real.jpg'
    ],
    plateNumber: 'HR26 DM 2323',
    isRealFleet: true,
    badge: 'Real Fleet'
  },
  {
    id: 'real-jaguar-xf-road',
    name: 'Jaguar XF Highway Tourer',
    category: 'Luxury Cars',
    image: '/vehicles/real/jaguar_xf_road_profile_real.jpg',
    pricePerKm: 50,
    pricePerDay: 18000,
    capacity: 4,
    luggage: 3,
    mileage: '13 km/l',
    specifications: { ac: true, musicSystem: true, chargingPort: true, pushbackSeats: true, airbags: true, gps: true },
    features: ['Real Shibani Fleet', 'Adaptive Suspension', 'Rotary Gear Shifter', 'Highway Escort Vehicle'],
    availability: 'Available',
    gallery: ['/vehicles/real/jaguar_xf_road_profile_real.jpg'],
    plateNumber: 'HR26 DM 2323',
    isRealFleet: true,
    badge: 'Real Fleet'
  },
  {
    id: 'real-jaguar-xf-nature',
    name: 'Jaguar XF Royal Nature Retreat',
    category: 'Luxury Cars',
    image: '/vehicles/real/jaguar_xf_nature_doors_open_real.jpg',
    pricePerKm: 50,
    pricePerDay: 18000,
    capacity: 4,
    luggage: 3,
    mileage: '13 km/l',
    specifications: { ac: true, musicSystem: true, chargingPort: true, pushbackSeats: true, airbags: true, gps: true },
    features: ['Real Shibani Fleet', 'Pure White British Luxury', 'Open Doors Ambience', 'Plate: HR26 DM 2323'],
    availability: 'Available',
    gallery: ['/vehicles/real/jaguar_xf_nature_doors_open_real.jpg'],
    plateNumber: 'HR26 DM 2323',
    isRealFleet: true,
    badge: 'Real Fleet'
  },
  {
    id: 'real-mercedes-interior',
    name: 'Mercedes-Benz E-Class Driver Cockpit',
    category: 'Luxury Cars',
    image: '/vehicles/real/mercedes_benz_driver_seat_interior_real.jpg',
    pricePerKm: 55,
    pricePerDay: 20000,
    capacity: 4,
    luggage: 3,
    mileage: '12 km/l',
    specifications: { ac: true, musicSystem: true, chargingPort: true, pushbackSeats: true, airbags: true, gps: true },
    features: ['Real Shibani Fleet', 'Dual 12.3-inch Cockpit Displays', 'Burmester Surround Audio', 'Nappa Leather Heated Seats'],
    availability: 'Available',
    gallery: [
      '/vehicles/real/mercedes_benz_driver_seat_interior_real.jpg',
      '/vehicles/real/mercedes_benz_interior_cockpit_real.jpg'
    ],
    plateNumber: 'OD02 MB 2026',
    isRealFleet: true,
    badge: 'Real Fleet'
  },
  {
    id: 'real-mercedes-cockpit-wide',
    name: 'Mercedes-Benz Ambient Cockpit Lounge',
    category: 'Luxury Cars',
    image: '/vehicles/real/mercedes_benz_interior_cockpit_real.jpg',
    pricePerKm: 55,
    pricePerDay: 20000,
    capacity: 4,
    luggage: 3,
    mileage: '12 km/l',
    specifications: { ac: true, musicSystem: true, chargingPort: true, pushbackSeats: true, airbags: true, gps: true },
    features: ['Real Shibani Fleet', '64-Color Ambient Lighting', 'Executive Rear Seating', 'Plate: OD02 MB 2026'],
    availability: 'Available',
    gallery: ['/vehicles/real/mercedes_benz_interior_cockpit_real.jpg'],
    plateNumber: 'OD02 MB 2026',
    isRealFleet: true,
    badge: 'Real Fleet'
  },
  {
    id: 'real-force-urbania-wedding',
    name: 'Force Urbania Wedding Garland Edition (17 Seater)',
    category: 'Force Urbania',
    image: '/vehicles/real/force_urbania_wedding_garland_real.jpg',
    pricePerKm: 28,
    pricePerDay: 8500,
    capacity: 17,
    luggage: 10,
    mileage: '11 km/l',
    specifications: { ac: true, musicSystem: true, chargingPort: true, pushbackSeats: true, airbags: true, gps: true },
    features: ['Real Shibani Fleet', 'Decorated with Fresh Marigold Garland', '17 Pushback Ergonomic Seats', 'Panoramic View Windows'],
    availability: 'Available',
    gallery: [
      '/vehicles/real/force_urbania_wedding_garland_real.jpg',
      '/vehicles/real/force_urbania_luxury_van_bronze_real.jpg'
    ],
    plateNumber: 'OD02 UR 1717',
    isRealFleet: true,
    badge: 'Real Fleet'
  },
  {
    id: 'real-force-urbania-bronze',
    name: 'Force Urbania Bronze Luxury Van (17 Seater)',
    category: 'Force Urbania',
    image: '/vehicles/real/force_urbania_luxury_van_bronze_real.jpg',
    pricePerKm: 28,
    pricePerDay: 8500,
    capacity: 17,
    luggage: 10,
    mileage: '11 km/l',
    specifications: { ac: true, musicSystem: true, chargingPort: true, pushbackSeats: true, airbags: true, gps: true },
    features: ['Real Shibani Fleet', 'Metallic Bronze Exterior', 'Monocoque Aerodynamic Design', 'USB Port per Passenger'],
    availability: 'Available',
    gallery: [
      '/vehicles/real/force_urbania_luxury_van_bronze_real.jpg',
      '/vehicles/real/force_urbania_wedding_garland_real.jpg'
    ],
    plateNumber: 'OD02 UR 8800',
    isRealFleet: true,
    badge: 'Real Fleet'
  },
  {
    id: 'real-traveller-jagannath',
    name: 'Force Traveller Jay Jagannath (17 Seater)',
    category: 'Tempo Traveller',
    image: '/vehicles/real/force_traveller_jay_jagannath_real.jpg',
    pricePerKm: 24,
    pricePerDay: 6500,
    capacity: 17,
    luggage: 10,
    mileage: '11 km/l',
    specifications: { ac: true, musicSystem: true, chargingPort: true, pushbackSeats: true, airbags: true, gps: true },
    features: ['Real Shibani Fleet', 'Blessed Puri Dham Pilgrimage Vehicle', 'Plate: OD02 AX 4881', 'Heavy Duty Luggage Carrier'],
    availability: 'Available',
    gallery: [
      '/vehicles/real/force_traveller_jay_jagannath_real.jpg',
      '/vehicles/real/force_traveller_od02ax4881_front_real.jpg'
    ],
    plateNumber: 'OD02 AX 4881',
    isRealFleet: true,
    badge: 'Real Fleet'
  },
  {
    id: 'real-traveller-tarini',
    name: 'Force Traveller Jay Maa Tarini (26 Seater)',
    category: 'Tempo Traveller',
    image: '/vehicles/real/force_traveller_jay_maa_tarini_real.jpg',
    pricePerKm: 32,
    pricePerDay: 9500,
    capacity: 26,
    luggage: 15,
    mileage: '9 km/l',
    specifications: { ac: true, musicSystem: true, chargingPort: true, pushbackSeats: true, airbags: true, gps: true },
    features: ['Real Shibani Fleet', 'Plate: OD05 AK 9627', '2x1 Luxury Pushback Recliners', 'Ghatgaon & Keonjhar Circuit'],
    availability: 'Available',
    gallery: ['/vehicles/real/force_traveller_jay_maa_tarini_real.jpg'],
    plateNumber: 'OD05 AK 9627',
    isRealFleet: true,
    badge: 'Real Fleet'
  },
  {
    id: 'real-traveller-interior-led',
    name: 'Tempo Traveller Maharaja Ambient LED Edition (12 Seater)',
    category: 'Tempo Traveller',
    image: '/vehicles/real/tempo_traveller_luxury_interior_led_real.jpg',
    pricePerKm: 26,
    pricePerDay: 7500,
    capacity: 12,
    luggage: 8,
    mileage: '11 km/l',
    specifications: { ac: true, musicSystem: true, chargingPort: true, pushbackSeats: true, airbags: true, gps: true },
    features: ['Real Shibani Fleet', 'Orange Diamond Quilted Recliners', 'Multi-Color Mood LED Ceiling', 'Surround Sound Audio'],
    availability: 'Available',
    gallery: [
      '/vehicles/real/tempo_traveller_luxury_interior_led_real.jpg',
      '/vehicles/real/tempo_traveller_pushback_seats_interior_real.jpg'
    ],
    plateNumber: 'OD02 MH 1212',
    isRealFleet: true,
    badge: 'Real Fleet'
  },
  {
    id: 'real-traveller-pushback',
    name: 'Tempo Traveller Executive 2x1 Pushback (17 Seater)',
    category: 'Tempo Traveller',
    image: '/vehicles/real/tempo_traveller_pushback_seats_interior_real.jpg',
    pricePerKm: 24,
    pricePerDay: 6500,
    capacity: 17,
    luggage: 10,
    mileage: '10 km/l',
    specifications: { ac: true, musicSystem: true, chargingPort: true, pushbackSeats: true, airbags: true, gps: true },
    features: ['Real Shibani Fleet', 'Wide Aisles & Individual Armrests', 'High-Capacity Chilled AC Blowers', 'Highway Seating Comfort'],
    availability: 'Available',
    gallery: ['/vehicles/real/tempo_traveller_pushback_seats_interior_real.jpg'],
    plateNumber: 'OD02 PB 1717',
    isRealFleet: true,
    badge: 'Real Fleet'
  },
  {
    id: 'real-traveller-od02ax4881',
    name: 'Force Traveller Super Cruiser (OD02 AX 4881)',
    category: 'Tempo Traveller',
    image: '/vehicles/real/force_traveller_od02ax4881_front_real.jpg',
    pricePerKm: 24,
    pricePerDay: 6500,
    capacity: 17,
    luggage: 10,
    mileage: '10 km/l',
    specifications: { ac: true, musicSystem: true, chargingPort: true, pushbackSeats: true, airbags: true, gps: true },
    features: ['Real Shibani Fleet', 'Plate: OD02 AX 4881', 'High Roof Stand-Up Height', 'Puri Mandir Darshan Special'],
    availability: 'Available',
    gallery: ['/vehicles/real/force_traveller_od02ax4881_front_real.jpg'],
    plateNumber: 'OD02 AX 4881',
    isRealFleet: true,
    badge: 'Real Fleet'
  },
  {
    id: 'real-traveller-od02df4498',
    name: 'Force Traveller 17 Seater (OD02 DF 4498)',
    category: 'Tempo Traveller',
    image: '/vehicles/real/force_traveller_od02df4498_front_real.jpg',
    pricePerKm: 24,
    pricePerDay: 6500,
    capacity: 17,
    luggage: 10,
    mileage: '10 km/l',
    specifications: { ac: true, musicSystem: true, chargingPort: true, pushbackSeats: true, airbags: true, gps: true },
    features: ['Real Shibani Fleet', 'Plate: OD02 DF 4498', 'Rear Luggage Ladder', 'Chilled Dual AC Blowers'],
    availability: 'Available',
    gallery: [
      '/vehicles/real/force_traveller_od02df4498_front_real.jpg',
      '/vehicles/real/force_traveller_od02df4498_rear_ladder_real.jpg'
    ],
    plateNumber: 'OD02 DF 4498',
    isRealFleet: true,
    badge: 'Real Fleet'
  },
  {
    id: 'real-traveller-od02df4498-rear',
    name: 'Force Traveller Heavy Carrier Edition (OD02 DF 4498)',
    category: 'Tempo Traveller',
    image: '/vehicles/real/force_traveller_od02df4498_rear_ladder_real.jpg',
    pricePerKm: 24,
    pricePerDay: 6500,
    capacity: 17,
    luggage: 12,
    mileage: '10 km/l',
    specifications: { ac: true, musicSystem: true, chargingPort: true, pushbackSeats: true, airbags: true, gps: true },
    features: ['Real Shibani Fleet', 'Full Rear Heavy Step & Ladder', 'Luggage Roof Rails', 'Outstation Tour Ready'],
    availability: 'Available',
    gallery: ['/vehicles/real/force_traveller_od02df4498_rear_ladder_real.jpg'],
    plateNumber: 'OD02 DF 4498',
    isRealFleet: true,
    badge: 'Real Fleet'
  },
  {
    id: 'real-traveller-od02du3328',
    name: 'Force Traveller Tourist Cruiser (OD02 DU 3328)',
    category: 'Tempo Traveller',
    image: '/vehicles/real/force_traveller_od02du3328_rear_real.jpg',
    pricePerKm: 24,
    pricePerDay: 6500,
    capacity: 17,
    luggage: 10,
    mileage: '10 km/l',
    specifications: { ac: true, musicSystem: true, chargingPort: true, pushbackSeats: true, airbags: true, gps: true },
    features: ['Real Shibani Fleet', 'Plate: OD02 DU 3328', 'Full Rear Guard & Step', 'Puri, Konark, Chilika Circuit'],
    availability: 'Available',
    gallery: [
      '/vehicles/real/force_traveller_od02du3328_rear_real.jpg',
      '/vehicles/real/force_traveller_side_view_real.jpg'
    ],
    plateNumber: 'OD02 DU 3328',
    isRealFleet: true,
    badge: 'Real Fleet'
  },
  {
    id: 'real-traveller-side',
    name: 'Force Traveller Highway Explorer (White)',
    category: 'Tempo Traveller',
    image: '/vehicles/real/force_traveller_side_view_real.jpg',
    pricePerKm: 24,
    pricePerDay: 6500,
    capacity: 17,
    luggage: 10,
    mileage: '10 km/l',
    specifications: { ac: true, musicSystem: true, chargingPort: true, pushbackSeats: true, airbags: true, gps: true },
    features: ['Real Shibani Fleet', 'Aerodynamic Side Profile', 'Tinted UV Glass', 'Long Distance Comfort'],
    availability: 'Available',
    gallery: ['/vehicles/real/force_traveller_side_view_real.jpg'],
    plateNumber: 'OD02 DU 3328',
    isRealFleet: true,
    badge: 'Real Fleet'
  },
  {
    id: 'real-traveller-od33ba4090',
    name: 'Force Traveller Showroom Delivery (OD33 BA 4090)',
    category: 'Tempo Traveller',
    image: '/vehicles/real/force_traveller_od33ba4090_delivery_real.jpg',
    pricePerKm: 24,
    pricePerDay: 6500,
    capacity: 17,
    luggage: 10,
    mileage: '11 km/l',
    specifications: { ac: true, musicSystem: true, chargingPort: true, pushbackSeats: true, airbags: true, gps: true },
    features: ['Real Shibani Fleet', 'Plate: OD33 BA 4090', 'Brand New Fleet Unit', 'Smooth Long Distance Journey'],
    availability: 'Available',
    gallery: [
      '/vehicles/real/force_traveller_od33ba4090_delivery_real.jpg',
      '/vehicles/real/force_traveller_cba_cabs_side_real.jpg'
    ],
    plateNumber: 'OD33 BA 4090',
    isRealFleet: true,
    badge: 'Real Fleet'
  },
  {
    id: 'real-traveller-cba-side',
    name: 'Force Traveller Corporate Cab Fleet',
    category: 'Tempo Traveller',
    image: '/vehicles/real/force_traveller_cba_cabs_side_real.jpg',
    pricePerKm: 24,
    pricePerDay: 6500,
    capacity: 17,
    luggage: 10,
    mileage: '11 km/l',
    specifications: { ac: true, musicSystem: true, chargingPort: true, pushbackSeats: true, airbags: true, gps: true },
    features: ['Real Shibani Fleet', 'Corporate Employee Transport', 'Uniformed Chauffeur', 'Dedicated Route Support'],
    availability: 'Available',
    gallery: ['/vehicles/real/force_traveller_cba_cabs_side_real.jpg'],
    plateNumber: 'OD33 BA 4090',
    isRealFleet: true,
    badge: 'Real Fleet'
  },
  {
    id: 'real-sml-coach',
    name: 'SML Executive AC Coach (31 Seater)',
    category: 'Luxury Bus',
    image: '/vehicles/real/sml_executive_coach_bus_real.jpg',
    pricePerKm: 38,
    pricePerDay: 14000,
    capacity: 31,
    luggage: 25,
    mileage: '8 km/l',
    specifications: { ac: true, musicSystem: true, chargingPort: true, pushbackSeats: true, airbags: true, gps: true },
    features: ['Real Shibani Fleet', 'Air Suspension Ride', 'PA Mic & Sound System', 'Big Conferences & Baraats'],
    availability: 'Available',
    gallery: ['/vehicles/real/sml_executive_coach_bus_real.jpg'],
    plateNumber: 'OD02 SM 3131',
    isRealFleet: true,
    badge: 'Real Fleet'
  },
  {
    id: 'real-tata-winger',
    name: 'Tata Winger Executive (OD02 CM 9290)',
    category: 'Tempo Traveller',
    image: '/vehicles/real/tata_winger_od02cm9290_rear_real.jpg',
    pricePerKm: 20,
    pricePerDay: 5500,
    capacity: 15,
    luggage: 8,
    mileage: '12 km/l',
    specifications: { ac: true, musicSystem: true, chargingPort: true, pushbackSeats: true, airbags: true, gps: true },
    features: ['Real Shibani Fleet', 'Plate: OD02 CM 9290', 'High Roof Stand-Up Cabin', 'Twin Independent ACs'],
    availability: 'Available',
    gallery: ['/vehicles/real/tata_winger_od02cm9290_rear_real.jpg'],
    plateNumber: 'OD02 CM 9290',
    isRealFleet: true,
    badge: 'Real Fleet'
  },
  {
    id: 'real-honda-city',
    name: 'Honda City i-VTEC Sport (White)',
    category: 'Sedan',
    image: '/vehicles/real/honda_city_sport_white_real.jpg',
    pricePerKm: 16,
    pricePerDay: 3200,
    capacity: 4,
    luggage: 3,
    mileage: '16 km/l',
    specifications: { ac: true, musicSystem: true, chargingPort: true, pushbackSeats: false, airbags: true, gps: true },
    features: ['Real Shibani Fleet', 'Pure White Aerodynamic Finish', 'Electric Sunroof & Cruise', 'Airport Executive Cab'],
    availability: 'Available',
    gallery: ['/vehicles/real/honda_city_sport_white_real.jpg'],
    plateNumber: 'OD02 HC 1122',
    isRealFleet: true,
    badge: 'Real Fleet'
  },
  {
    id: 'real-hyundai-verna',
    name: 'Hyundai Verna Premium Sedan (White)',
    category: 'Sedan',
    image: '/vehicles/real/hyundai_verna_white_real.jpg',
    pricePerKm: 16,
    pricePerDay: 3000,
    capacity: 4,
    luggage: 3,
    mileage: '17 km/l',
    specifications: { ac: true, musicSystem: true, chargingPort: true, pushbackSeats: false, airbags: true, gps: true },
    features: ['Real Shibani Fleet', 'Ventilated Front Seats', 'Whisper-Quiet Cabin', 'City & Outstation Tours'],
    availability: 'Available',
    gallery: ['/vehicles/real/hyundai_verna_white_real.jpg'],
    plateNumber: 'OD02 HV 4545',
    isRealFleet: true,
    badge: 'Real Fleet'
  }
];

// Combine unique master fleet: 7 AI Showcase + 27 Real Fleet photos = 34 unique models
const masterFleet = [...aiVehicles, ...realVehicles];

// Legacy aliases mapping to ensure backwards compatibility with older links (e.g. v-1, v-13)
const legacyAliases = [
  { ...aiVehicles[0], id: 'v-13' }, // Swift Dzire
  { ...aiVehicles[0], id: 'v-11' }, // WagonR
  { ...aiVehicles[0], id: 'v-12' }, // Swift
  { ...aiVehicles[0], id: 'v-17' }, // Sedan
  { ...aiVehicles[1], id: 'v-3' },  // Innova Crysta
  { ...aiVehicles[1], id: 'v-9' },  // Innova Hycross
  { ...aiVehicles[1], id: 'v-14' }, // Ertiga
  { ...aiVehicles[2], id: 'v-4' },  // Fortuner
  { ...aiVehicles[2], id: 'v-15' }, // Bolero
  { ...aiVehicles[2], id: 'v-16' }, // Scorpio
  { ...aiVehicles[3], id: 'v-5' },  // Force Urbania
  { ...aiVehicles[4], id: 'v-6' },  // Tempo Traveller
  { ...aiVehicles[5], id: 'v-7' },  // Wedding Car
  { ...aiVehicles[6], id: 'v-8' },  // Volvo Bus
  { ...realVehicles[0], id: 'v-19' }, // Audi A6 Grille
  { ...realVehicles[1], id: 'v-2' },  // Audi A6 Open
  { ...realVehicles[5], id: 'v-20' }, // Jaguar XF Portico
  { ...realVehicles[6], id: 'v-21' }, // Jaguar XF Road
  { ...realVehicles[8], id: 'v-1' },  // Mercedes Benz Cockpit
  { ...realVehicles[8], id: 'v-18' }, // Mercedes Benz
  { ...realVehicles[10], id: 'v-29' }, // Force Urbania Bronze
  { ...realVehicles[12], id: 'v-30' }, // Jay Jagannath
  { ...realVehicles[13], id: 'v-31' }, // Jay Maa Tarini
  { ...realVehicles[14], id: 'v-32' }, // Maharaja Ambient LED
  { ...realVehicles[15], id: 'v-33' }, // Executive Pushback
  { ...realVehicles[23], id: 'v-27' }, // SML Coach
  { ...realVehicles[24], id: 'v-26' }, // Tata Winger
  { ...realVehicles[25], id: 'v-10' }, // Honda City
  { ...realVehicles[25], id: 'v-25' }, // Honda City
  { ...realVehicles[26], id: 'v-28' }, // Hyundai Verna
];

const dbRecords = [...masterFleet, ...legacyAliases];

console.log(`Prepared ${masterFleet.length} unique fleet vehicles and ${legacyAliases.length} legacy aliases (Total DB Records: ${dbRecords.length})`);

// Update database.json
const raw = fs.readFileSync(jsonPath, 'utf8').replace(/^\uFEFF/, '');
const data = JSON.parse(raw);
data.vehicles = dbRecords;
fs.writeFileSync(jsonPath, JSON.stringify(data, null, 2), 'utf8');
console.log('Saved updated database.json successfully.');

// Sync into SQLite
const db = new sqlite3.Database(sqlitePath, (err) => {
  if (err) {
    console.error('Failed to open database:', err);
    process.exit(1);
  }
});

db.serialize(() => {
  db.run('DELETE FROM vehicles', (err) => {
    if (err) console.error('Error clearing vehicles table:', err);
  });

  const stmt = db.prepare(`
    INSERT INTO vehicles (
      id, name, category, image, pricePerKm, pricePerDay, capacity, luggage, mileage,
      ac, musicSystem, chargingPort, pushbackSeats, airbags, gps, features, availability,
      gallery, plateNumber, isRealFleet
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  let inserted = 0;
  for (const v of dbRecords) {
    const spec = v.specifications || {};
    stmt.run(
      v.id,
      v.name,
      v.category,
      v.image,
      v.pricePerKm,
      v.pricePerDay,
      v.capacity,
      v.luggage,
      v.mileage || '14 km/l',
      spec.ac ? 1 : 0,
      spec.musicSystem ? 1 : 0,
      spec.chargingPort ? 1 : 0,
      spec.pushbackSeats ? 1 : 0,
      spec.airbags ? 1 : 0,
      spec.gps ? 1 : 0,
      JSON.stringify(v.features || []),
      v.availability || 'Available',
      JSON.stringify(v.gallery || [v.image]),
      v.plateNumber || '',
      v.isRealFleet ? 1 : 0,
      (err) => {
        if (err) console.error('Insert error for', v.id, err);
        else inserted++;
      }
    );
  }

  stmt.finalize(() => {
    console.log(`Successfully synced ${dbRecords.length} vehicles into SQLite database.`);
    db.close();
  });
});

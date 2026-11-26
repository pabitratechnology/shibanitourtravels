const fs = require('fs');
const path = require('path');
const sqlite3 = require('sqlite3');

const jsonPath = path.join(__dirname, 'database.json');
const sqlitePath = path.join(__dirname, 'database.sqlite');

const raw = fs.readFileSync(jsonPath, 'utf8').replace(/^\uFEFF/, '');
const data = JSON.parse(raw);

// Define all 27 real vehicles corresponding to the user's photos
const realVehiclesMap = [
  {
    id: 'v-19',
    name: 'Audi A6 Matrix Elite (OD-02)',
    category: 'Wedding Cars',
    image: '/vehicles/real/audi_a6_front_grille_real.jpg',
    pricePerKm: 65,
    pricePerDay: 20000,
    capacity: 4,
    luggage: 3,
    mileage: '12 km/l',
    plateNumber: 'OD02 BG 0001',
    isRealFleet: true,
    gallery: [
      '/vehicles/real/audi_a6_front_grille_real.jpg',
      '/vehicles/real/audi_a6_front_portrait_real.jpg',
      '/vehicles/real/audi_a6_side_profile_real.jpg',
      '/vehicles/real/audi_a6_doors_open_real.jpg',
      '/vehicles/real/audi_a6_interior_cockpit_real.jpg'
    ],
    features: ['Real Shibani Fleet', 'Panoramic Sunroof', 'Matrix LED Headlamps', 'Bang & Olufsen Sound', 'Wedding Ribbon Ready']
  },
  {
    id: 'v-19-a',
    name: 'Audi A6 White Royal Limousine',
    category: 'Wedding Cars',
    image: '/vehicles/real/audi_a6_doors_open_real.jpg',
    pricePerKm: 65,
    pricePerDay: 22000,
    capacity: 4,
    luggage: 3,
    mileage: '12 km/l',
    plateNumber: 'OD02 BG 0001',
    isRealFleet: true,
    gallery: [
      '/vehicles/real/audi_a6_doors_open_real.jpg',
      '/vehicles/real/audi_a6_side_profile_real.jpg',
      '/vehicles/real/audi_a6_front_grille_real.jpg'
    ],
    features: ['Real Shibani Fleet', 'VIP Groom Entry', 'Chauffeur in Uniform', 'Plush Leather Interior']
  },
  {
    id: 'v-19-b',
    name: 'Audi A6 Executive Highway Sedan',
    category: 'Luxury Cars',
    image: '/vehicles/real/audi_a6_side_profile_real.jpg',
    pricePerKm: 60,
    pricePerDay: 18000,
    capacity: 4,
    luggage: 3,
    mileage: '13 km/l',
    plateNumber: 'OD02 BG 0001',
    isRealFleet: true,
    gallery: [
      '/vehicles/real/audi_a6_side_profile_real.jpg',
      '/vehicles/real/audi_a6_interior_cockpit_real.jpg'
    ],
    features: ['Real Shibani Fleet', 'Smooth Highway Cruise', 'Corporate Delegation', 'Full Climate Control']
  },
  {
    id: 'v-20',
    name: 'Jaguar XF Royal White (HR-26)',
    category: 'Wedding Cars',
    image: '/vehicles/real/jaguar_xf_hotel_portico_real.jpg',
    pricePerKm: 70,
    pricePerDay: 22000,
    capacity: 4,
    luggage: 3,
    mileage: '11 km/l',
    plateNumber: 'HR26 DM 2323',
    isRealFleet: true,
    gallery: [
      '/vehicles/real/jaguar_xf_hotel_portico_real.jpg',
      '/vehicles/real/jaguar_xf_nature_doors_open_real.jpg',
      '/vehicles/real/jaguar_xf_road_profile_real.jpg'
    ],
    features: ['Real Shibani Fleet', 'VVIP Wedding Entry', 'Luxury Portico Display', 'Meridian Sound System', 'British Luxury Design']
  },
  {
    id: 'v-20-a',
    name: 'Jaguar XF Nature Edition (Doors Open)',
    category: 'Wedding Cars',
    image: '/vehicles/real/jaguar_xf_nature_doors_open_real.jpg',
    pricePerKm: 70,
    pricePerDay: 22000,
    capacity: 4,
    luggage: 3,
    mileage: '11 km/l',
    plateNumber: 'HR26 DM 2323',
    isRealFleet: true,
    gallery: [
      '/vehicles/real/jaguar_xf_nature_doors_open_real.jpg',
      '/vehicles/real/jaguar_xf_road_profile_real.jpg',
      '/vehicles/real/jaguar_xf_hotel_portico_real.jpg'
    ],
    features: ['Real Shibani Fleet', 'Open Door Wedding Photoshoot', 'Ceremonial Groom Escort']
  },
  {
    id: 'v-20-b',
    name: 'Jaguar XF Road Profile Luxury',
    category: 'Luxury Cars',
    image: '/vehicles/real/jaguar_xf_road_profile_real.jpg',
    pricePerKm: 65,
    pricePerDay: 20000,
    capacity: 4,
    luggage: 3,
    mileage: '12 km/l',
    plateNumber: 'HR26 DM 2323',
    isRealFleet: true,
    gallery: [
      '/vehicles/real/jaguar_xf_road_profile_real.jpg',
      '/vehicles/real/jaguar_xf_hotel_portico_real.jpg'
    ],
    features: ['Real Shibani Fleet', 'Aerodynamic Profile', 'High-Speed Stability', 'Puri-Bhubaneswar Expressway Ready']
  },
  {
    id: 'v-1',
    name: 'Mercedes-Benz Executive (Cockpit Real)',
    category: 'Luxury Cars',
    image: '/vehicles/real/mercedes_benz_driver_seat_interior_real.jpg',
    pricePerKm: 75,
    pricePerDay: 25000,
    capacity: 4,
    luggage: 3,
    mileage: '12 km/l',
    plateNumber: 'OD02 MB 2026',
    isRealFleet: true,
    gallery: [
      '/vehicles/real/mercedes_benz_driver_seat_interior_real.jpg',
      '/vehicles/real/mercedes_benz_interior_cockpit_real.jpg'
    ],
    features: ['Real Shibani Fleet', 'Dual Display Cockpit', 'Nappa Leather Heated Seats', 'Panoramic Sunroof']
  },
  {
    id: 'v-18',
    name: 'Mercedes-Benz E-Class Cockpit Edition',
    category: 'Luxury Cars',
    image: '/vehicles/real/mercedes_benz_interior_cockpit_real.jpg',
    pricePerKm: 55,
    pricePerDay: 18000,
    capacity: 4,
    luggage: 3,
    mileage: '13 km/l',
    plateNumber: 'OD02 ME 1010',
    isRealFleet: true,
    gallery: [
      '/vehicles/real/mercedes_benz_interior_cockpit_real.jpg',
      '/vehicles/real/mercedes_benz_driver_seat_interior_real.jpg'
    ],
    features: ['Real Shibani Fleet', 'Multibeam LED', 'Burmester Sound System', 'Corporate Executive Seat']
  },
  {
    id: 'v-5',
    name: 'Force Urbania 17 Seater (Wedding Garland)',
    category: 'Force Urbania',
    image: '/vehicles/real/force_urbania_wedding_garland_real.jpg',
    pricePerKm: 28,
    pricePerDay: 8500,
    capacity: 17,
    luggage: 10,
    mileage: '11 km/l',
    plateNumber: 'OD02 UR 1700',
    isRealFleet: true,
    gallery: [
      '/vehicles/real/force_urbania_wedding_garland_real.jpg',
      '/vehicles/real/force_urbania_luxury_van_bronze_real.jpg'
    ],
    features: ['Real Shibani Fleet', 'Marigold Wedding Garland Decoration', 'Pushback Reclining Seats', 'Roof Mounted AC', 'Panoramic Windows']
  },
  {
    id: 'v-21',
    name: 'Force Urbania 13 Seater (Bronze Luxury)',
    category: 'Force Urbania',
    image: '/vehicles/real/force_urbania_luxury_van_bronze_real.jpg',
    pricePerKm: 26,
    pricePerDay: 7500,
    capacity: 13,
    luggage: 8,
    mileage: '12 km/l',
    plateNumber: 'OD02 UR 1300',
    isRealFleet: true,
    gallery: [
      '/vehicles/real/force_urbania_luxury_van_bronze_real.jpg',
      '/vehicles/real/force_urbania_wedding_garland_real.jpg'
    ],
    features: ['Real Shibani Fleet', 'Metallic Bronze Body', 'Executive Recliner Captain Seats', 'Individual USB Ports']
  },
  {
    id: 'v-6',
    name: 'Force Traveller 12 Seater (Jay Jagannath)',
    category: 'Tempo Traveller',
    image: '/vehicles/real/force_traveller_jay_jagannath_real.jpg',
    pricePerKm: 22,
    pricePerDay: 6000,
    capacity: 12,
    luggage: 8,
    mileage: '11 km/l',
    plateNumber: 'OD02 JJ 1212',
    isRealFleet: true,
    gallery: [
      '/vehicles/real/force_traveller_jay_jagannath_real.jpg',
      '/vehicles/real/tempo_traveller_luxury_interior_led_real.jpg',
      '/vehicles/real/tempo_traveller_pushback_seats_interior_real.jpg'
    ],
    features: ['Real Shibani Fleet', 'Jai Jagannath Windshield Blessing', 'High-Roof AC Cabin', 'Puri Mandir Pilgrimage Special']
  },
  {
    id: 'v-31',
    name: 'Force Traveller 26 Seater (Jay Maa Tarini)',
    category: 'Tempo Traveller',
    image: '/vehicles/real/force_traveller_jay_maa_tarini_real.jpg',
    pricePerKm: 32,
    pricePerDay: 8500,
    capacity: 26,
    luggage: 15,
    mileage: '9 km/l',
    plateNumber: 'OD02 MT 2626',
    isRealFleet: true,
    gallery: [
      '/vehicles/real/force_traveller_jay_maa_tarini_real.jpg',
      '/vehicles/real/tempo_traveller_luxury_interior_led_real.jpg',
      '/vehicles/real/tempo_traveller_pushback_seats_interior_real.jpg'
    ],
    features: ['Real Shibani Fleet', 'Jay Maa Tarini Blessings', '26 Pushback Seats', 'Dual Blower AC', 'Rear Luggage Carrier']
  },
  {
    id: 'v-32',
    name: 'Force Traveller 17 Seater (OD02 AX 4881)',
    category: 'Tempo Traveller',
    image: '/vehicles/real/force_traveller_od02ax4881_front_real.jpg',
    pricePerKm: 25,
    pricePerDay: 6500,
    capacity: 17,
    luggage: 10,
    mileage: '10 km/l',
    plateNumber: 'OD02 AX 4881',
    isRealFleet: true,
    gallery: [
      '/vehicles/real/force_traveller_od02ax4881_front_real.jpg',
      '/vehicles/real/tempo_traveller_pushback_seats_interior_real.jpg'
    ],
    features: ['Real Shibani Fleet', 'Government Registered OD02 AX 4881', 'Clean White Coach', 'Experienced Hill Driver']
  },
  {
    id: 'v-33',
    name: 'Force Traveller 17 Seater (OD02 DF 4498)',
    category: 'Tempo Traveller',
    image: '/vehicles/real/force_traveller_od02df4498_front_real.jpg',
    pricePerKm: 25,
    pricePerDay: 6500,
    capacity: 17,
    luggage: 10,
    mileage: '10 km/l',
    plateNumber: 'OD02 DF 4498',
    isRealFleet: true,
    gallery: [
      '/vehicles/real/force_traveller_od02df4498_front_real.jpg',
      '/vehicles/real/force_traveller_od02df4498_rear_ladder_real.jpg'
    ],
    features: ['Real Shibani Fleet', 'Yellow Commercial Plate OD02 DF 4498', 'Rear Luggage Ladder', 'GPS Real-Time Tracking']
  },
  {
    id: 'v-34',
    name: 'Force Traveller 14 Seater (OD02 DU 3328)',
    category: 'Tempo Traveller',
    image: '/vehicles/real/force_traveller_od02du3328_rear_real.jpg',
    pricePerKm: 24,
    pricePerDay: 6200,
    capacity: 14,
    luggage: 8,
    mileage: '11 km/l',
    plateNumber: 'OD02 DU 3328',
    isRealFleet: true,
    gallery: [
      '/vehicles/real/force_traveller_od02du3328_rear_real.jpg',
      '/vehicles/real/force_traveller_side_view_real.jpg'
    ],
    features: ['Real Shibani Fleet', 'Commercial Number OD02 DU 3328', 'Daringbadi & Similipal Hill Permitted', 'Comfort Recliners']
  },
  {
    id: 'v-35',
    name: 'Force Traveller 12 Seater (OD33 BA 4090 Delivery)',
    category: 'Tempo Traveller',
    image: '/vehicles/real/force_traveller_od33ba4090_delivery_real.jpg',
    pricePerKm: 22,
    pricePerDay: 5800,
    capacity: 12,
    luggage: 8,
    mileage: '11 km/l',
    plateNumber: 'OD33 BA 4090',
    isRealFleet: true,
    gallery: [
      '/vehicles/real/force_traveller_od33ba4090_delivery_real.jpg',
      '/vehicles/real/tempo_traveller_luxury_interior_led_real.jpg'
    ],
    features: ['Real Shibani Fleet', 'Brand New Showroom Delivery Vehicle', 'OD33 BA 4090', 'Odisha Inter-District Permit']
  },
  {
    id: 'v-36',
    name: 'Force Traveller 17 Seater (Tour Profile)',
    category: 'Tempo Traveller',
    image: '/vehicles/real/force_traveller_side_view_real.jpg',
    pricePerKm: 25,
    pricePerDay: 6500,
    capacity: 17,
    luggage: 10,
    mileage: '10 km/l',
    plateNumber: 'OD02 AX 4881',
    isRealFleet: true,
    gallery: [
      '/vehicles/real/force_traveller_side_view_real.jpg',
      '/vehicles/real/tempo_traveller_pushback_seats_interior_real.jpg'
    ],
    features: ['Real Shibani Fleet', 'Long Wheelbase Side Profile', 'Spacious Legroom', 'Curtains & First Aid Box']
  },
  {
    id: 'v-37',
    name: 'Force Traveller Executive (CBA Cabs)',
    category: 'Tempo Traveller',
    image: '/vehicles/real/force_traveller_cba_cabs_side_real.jpg',
    pricePerKm: 24,
    pricePerDay: 6200,
    capacity: 14,
    luggage: 8,
    mileage: '11 km/l',
    plateNumber: 'OD02 CB 9988',
    isRealFleet: true,
    gallery: [
      '/vehicles/real/force_traveller_cba_cabs_side_real.jpg',
      '/vehicles/real/tempo_traveller_luxury_interior_led_real.jpg'
    ],
    features: ['Real Shibani Fleet', 'Corporate Shuttles & Tour Convoys', 'High-Back Reclining Pushback Seats']
  },
  {
    id: 'v-38',
    name: 'Tempo Traveller Maharaja (LED Starlight Interior)',
    category: 'Tempo Traveller',
    image: '/vehicles/real/tempo_traveller_luxury_interior_led_real.jpg',
    pricePerKm: 26,
    pricePerDay: 7000,
    capacity: 12,
    luggage: 8,
    mileage: '11 km/l',
    plateNumber: 'OD02 JJ 1212',
    isRealFleet: true,
    gallery: [
      '/vehicles/real/tempo_traveller_luxury_interior_led_real.jpg',
      '/vehicles/real/tempo_traveller_pushback_seats_interior_real.jpg',
      '/vehicles/real/force_traveller_jay_jagannath_real.jpg'
    ],
    features: ['Real Shibani Fleet', 'VVIP Blue Ambient LED Ceiling', '2x1 Luxury Sofa Recliners', 'Android Smart TV Screen']
  },
  {
    id: 'v-39',
    name: 'Tempo Traveller 2x1 Recliner Coach',
    category: 'Tempo Traveller',
    image: '/vehicles/real/tempo_traveller_pushback_seats_interior_real.jpg',
    pricePerKm: 25,
    pricePerDay: 6800,
    capacity: 15,
    luggage: 10,
    mileage: '10 km/l',
    plateNumber: 'OD02 MT 2626',
    isRealFleet: true,
    gallery: [
      '/vehicles/real/tempo_traveller_pushback_seats_interior_real.jpg',
      '/vehicles/real/tempo_traveller_luxury_interior_led_real.jpg'
    ],
    features: ['Real Shibani Fleet', 'Ergonomic 2x1 Pushback Leather Seats', 'Neck Pillows & Bottle Holders', 'Individual AC Louvers']
  },
  {
    id: 'v-29',
    name: 'Tata Winger Executive (OD02 CM 9290)',
    category: 'Force Urbania',
    image: '/vehicles/real/tata_winger_od02cm9290_rear_real.jpg',
    pricePerKm: 22,
    pricePerDay: 5800,
    capacity: 15,
    luggage: 8,
    mileage: '12 km/l',
    plateNumber: 'OD02 CM 9290',
    isRealFleet: true,
    gallery: [
      '/vehicles/real/tata_winger_od02cm9290_rear_real.jpg'
    ],
    features: ['Real Shibani Fleet', 'OD02 CM 9290 Commercial Registration', 'Rear AC Unit', 'Family Holiday Coach']
  },
  {
    id: 'v-10',
    name: 'Honda City i-VTEC Sport (White)',
    category: 'Sedan',
    image: '/vehicles/real/honda_city_sport_white_real.jpg',
    pricePerKm: 14,
    pricePerDay: 2500,
    capacity: 4,
    luggage: 3,
    mileage: '16 km/l',
    plateNumber: 'OD02 HC 1000',
    isRealFleet: true,
    gallery: [
      '/vehicles/real/honda_city_sport_white_real.jpg'
    ],
    features: ['Real Shibani Fleet', 'Pearl White Aerodynamic Body', 'Sunroof', 'Chilled AC', 'Airport Transfer Special']
  },
  {
    id: 'v-30',
    name: 'Hyundai Verna SX Elite (White)',
    category: 'Sedan',
    image: '/vehicles/real/hyundai_verna_white_real.jpg',
    pricePerKm: 15,
    pricePerDay: 2600,
    capacity: 4,
    luggage: 3,
    mileage: '16 km/l',
    plateNumber: 'OD02 HV 3030',
    isRealFleet: true,
    gallery: [
      '/vehicles/real/hyundai_verna_white_real.jpg'
    ],
    features: ['Real Shibani Fleet', 'Ventilated Seats', 'Wireless Phone Charger', 'Smooth Suspension for Highway Trips']
  },
  {
    id: 'v-27',
    name: 'SML Executive Coach (31 Seater AC Bus)',
    category: 'Luxury Bus',
    image: '/vehicles/real/sml_executive_coach_bus_real.jpg',
    pricePerKm: 45,
    pricePerDay: 15000,
    capacity: 31,
    luggage: 25,
    mileage: '7 km/l',
    plateNumber: 'OD02 EC 3131',
    isRealFleet: true,
    gallery: [
      '/vehicles/real/sml_executive_coach_bus_real.jpg'
    ],
    features: ['Real Shibani Fleet', '31 High-Back Pushback Reclining Seats', 'Under-Floor Huge Luggage Bays', 'PA & Mic System', 'College & Corporate Tours']
  }
];

// Merge into data.vehicles
const existingMap = new Map();
data.vehicles.forEach(v => existingMap.set(v.id, v));

realVehiclesMap.forEach(rv => {
  if (existingMap.has(rv.id)) {
    const existing = existingMap.get(rv.id);
    Object.assign(existing, rv);
  } else {
    data.vehicles.push(rv);
    existingMap.set(rv.id, rv);
  }
});

// Save database.json
fs.writeFileSync(jsonPath, JSON.stringify(data, null, 2), 'utf8');
console.log(`Updated database.json with all ${realVehiclesMap.length} real fleet entries!`);

// Now sync directly to SQLite database
const db = new sqlite3.Database(sqlitePath, (err) => {
  if (err) {
    console.error('Failed to open database:', err);
    process.exit(1);
  }
});

db.serialize(() => {
  const addCol = (col, type) => {
    db.run(`ALTER TABLE vehicles ADD COLUMN ${col} ${type}`, () => {});
  };
  addCol('gallery', 'TEXT');
  addCol('plateNumber', 'TEXT');
  addCol('isRealFleet', 'INTEGER DEFAULT 0');

  const stmt = db.prepare(`
    INSERT INTO vehicles (
      id, name, category, image, pricePerKm, pricePerDay, capacity, luggage, mileage,
      ac, musicSystem, chargingPort, pushbackSeats, airbags, gps, features, availability,
      gallery, plateNumber, isRealFleet
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    ON CONFLICT(id) DO UPDATE SET
      name=excluded.name,
      category=excluded.category,
      image=excluded.image,
      pricePerKm=excluded.pricePerKm,
      pricePerDay=excluded.pricePerDay,
      capacity=excluded.capacity,
      luggage=excluded.luggage,
      mileage=excluded.mileage,
      ac=excluded.ac,
      musicSystem=excluded.musicSystem,
      chargingPort=excluded.chargingPort,
      pushbackSeats=excluded.pushbackSeats,
      airbags=excluded.airbags,
      gps=excluded.gps,
      features=excluded.features,
      availability=excluded.availability,
      gallery=excluded.gallery,
      plateNumber=excluded.plateNumber,
      isRealFleet=excluded.isRealFleet
  `);

  let count = 0;
  for (const v of data.vehicles) {
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
      spec.ac ? 1 : 1,
      spec.musicSystem ? 1 : 1,
      spec.chargingPort ? 1 : 1,
      spec.pushbackSeats ? 1 : 1,
      spec.airbags ? 1 : 1,
      spec.gps ? 1 : 1,
      JSON.stringify(v.features || []),
      v.availability || 'Available',
      JSON.stringify(v.gallery || [v.image]),
      v.plateNumber || null,
      v.isRealFleet ? 1 : 0
    );
    count++;
  }

  stmt.finalize(() => {
    console.log(`SQLite synced successfully with ${count} total vehicles!`);
    db.close();
  });
});

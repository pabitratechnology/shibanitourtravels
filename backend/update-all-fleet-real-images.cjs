const fs = require('fs');
const path = require('path');
const sqlite3 = require('./node_modules/sqlite3');

const jsonPath = path.join(__dirname, 'database.json');
const sqlitePath = path.join(__dirname, 'database.sqlite');

const raw = fs.readFileSync(jsonPath, 'utf8').replace(/^\uFEFF/, '');
const data = JSON.parse(raw);

// Map of real photos from frontend/public/Vehicle Images
const realImageFiles = [
  { name: 'Audi A6 Matrix Elite (UP14 CU 2276)', file: 'WhatsApp Image 2026-11-22 at 4.58.50 PM (1).jpeg', realName: 'audi_a6_front_grille_real.jpg', cat: 'Wedding Cars', plate: 'UP14 CU 2276' },
  { name: 'Audi A6 Royal Limousine (Doors Open)', file: 'WhatsApp Image 2026-11-22 at 4.58.54 PM.jpeg', realName: 'audi_a6_doors_open_real.jpg', cat: 'Wedding Cars', plate: 'OD02 BG 0001' },
  { name: 'Audi A6 Executive Highway Sedan', file: 'WhatsApp Image 2026-11-22 at 4.59.05 PM.jpeg', realName: 'audi_a6_side_profile_real.jpg', cat: 'Luxury Cars', plate: 'OD02 BG 0001' },
  { name: 'Audi A6 Showroom Edition', file: 'WhatsApp Image 2026-11-22 at 4.59.03 PM (1).jpeg', realName: 'audi_a6_front_portrait_real.jpg', cat: 'Luxury Cars', plate: 'OD02 BG 0001' },
  { name: 'Audi A6 MMI Virtual Cockpit', file: 'WhatsApp Image 2026-11-22 at 4.58.50 PM.jpeg', realName: 'audi_a6_interior_cockpit_real.jpg', cat: 'Luxury Cars', plate: 'OD02 BG 0001' },
  { name: 'Jaguar XF Royal White (HR26 DM 2323)', file: 'WhatsApp Image 2026-11-22 at 4.58.52 PM.jpeg', realName: 'jaguar_xf_hotel_portico_real.jpg', cat: 'Wedding Cars', plate: 'HR26 DM 2323' },
  { name: 'Jaguar XF Nature Edition (Doors Open)', file: 'WhatsApp Image 2026-11-22 at 4.58.59 PM.jpeg', realName: 'jaguar_xf_nature_doors_open_real.jpg', cat: 'Wedding Cars', plate: 'HR26 DM 2323' },
  { name: 'Jaguar XF Highway VIP Profile', file: 'WhatsApp Image 2026-11-22 at 4.59.01 PM.jpeg', realName: 'jaguar_xf_road_profile_real.jpg', cat: 'Luxury Cars', plate: 'HR26 DM 2323' },
  { name: 'Force Urbania Royal Wedding Edition', file: 'WhatsApp Image 2026-11-22 at 4.59.10 PM.jpeg', realName: 'force_urbania_wedding_garland_real.jpg', cat: 'Force Urbania', plate: 'OD02 BU 7788' },
  { name: 'Force Urbania Bronze Luxury Van (17 Seater)', file: 'WhatsApp Image 2026-11-22 at 4.58.57 PM.jpeg', realName: 'force_urbania_luxury_van_bronze_real.jpg', cat: 'Force Urbania', plate: 'OD02 CZ 1122' },
  { name: 'Force Traveller Jay Jagannath (OD02 AX 4881)', file: 'WhatsApp Image 2026-11-22 at 4.58.56 PM.jpeg', realName: 'force_traveller_jay_jagannath_real.jpg', cat: 'Tempo Traveller', plate: 'OD02 AX 4881' },
  { name: 'Force Traveller 17-Seater Front (OD02 AX 4881)', file: 'WhatsApp Image 2026-11-22 at 4.59.02 PM (1).jpeg', realName: 'force_traveller_od02ax4881_front_real.jpg', cat: 'Tempo Traveller', plate: 'OD02 AX 4881' },
  { name: 'Force Traveller Jay Maa Tarini (OD05 AK 9627)', file: 'WhatsApp Image 2026-11-22 at 4.59.03 PM (2).jpeg', realName: 'force_traveller_jay_maa_tarini_real.jpg', cat: 'Tempo Traveller', plate: 'OD05 AK 9627' },
  { name: 'Force Traveller 26-Seater Front (OD02 DF 4498)', file: 'WhatsApp Image 2026-11-22 at 4.59.04 PM (1).jpeg', realName: 'force_traveller_od02df4498_front_real.jpg', cat: 'Tempo Traveller', plate: 'OD02 DF 4498' },
  { name: 'Force Traveller Rear Luggage Ladder (OD02 DF 4498)', file: 'WhatsApp Image 2026-11-22 at 4.59.09 PM.jpeg', realName: 'force_traveller_od02df4498_rear_ladder_real.jpg', cat: 'Tempo Traveller', plate: 'OD02 DF 4498' },
  { name: 'Force Traveller Touring Carrier (OD02 DU 3328)', file: 'WhatsApp Image 2026-11-22 at 4.58.55 PM.jpeg', realName: 'force_traveller_od02du3328_rear_real.jpg', cat: 'Tempo Traveller', plate: 'OD02 DU 3328' },
  { name: 'Force Traveller Brand New Delivery (OD33 BA 4090)', file: 'WhatsApp Image 2026-11-22 at 4.58.58 PM.jpeg', realName: 'force_traveller_od33ba4090_delivery_real.jpg', cat: 'Tempo Traveller', plate: 'OD33 BA 4090' },
  { name: 'Force Traveller CBA Cruiser (Side View)', file: 'WhatsApp Image 2026-11-22 at 4.59.04 PM.jpeg', realName: 'force_traveller_cba_cabs_side_real.jpg', cat: 'Tempo Traveller', plate: 'OD02 EE 5544' },
  { name: 'Force Traveller Commercial Lineup (Side Profile)', file: 'WhatsApp Image 2026-11-22 at 4.59.07 PM.jpeg', realName: 'force_traveller_side_view_real.jpg', cat: 'Tempo Traveller', plate: 'OD02 CL 8899' },
  { name: 'Tempo Traveller Maharaja Recliner Interior (LED)', file: 'WhatsApp Image 2026-11-22 at 4.59.00 PM (1).jpeg', realName: 'tempo_traveller_luxury_interior_led_real.jpg', cat: 'Tempo Traveller', plate: 'OD02 MR 9900' },
  { name: 'Tempo Traveller 2x1 Pushback Leather Recliners', file: 'WhatsApp Image 2026-11-22 at 4.59.11 PM.jpeg', realName: 'tempo_traveller_pushback_seats_interior_real.jpg', cat: 'Tempo Traveller', plate: 'OD02 MR 9901' },
  { name: 'Honda City i-VTEC Sport (White Showroom)', file: 'WhatsApp Image 2026-11-22 at 4.59.03 PM.jpeg', realName: 'honda_city_sport_white_real.jpg', cat: 'Sedan', plate: 'OD02 HC 1001' },
  { name: 'Hyundai Verna Premium White Sedan', file: 'WhatsApp Image 2026-11-22 at 4.58.51 PM (1).jpeg', realName: 'hyundai_verna_white_real.jpg', cat: 'Sedan', plate: 'OD02 HV 2002' },
  { name: 'Mercedes-Benz Driver Ergonomics & Dual Cockpit', file: 'WhatsApp Image 2026-11-22 at 4.59.06 PM.jpeg', realName: 'mercedes_benz_driver_seat_interior_real.jpg', cat: 'Luxury Cars', plate: 'OD02 MB 2026' },
  { name: 'Mercedes-Benz Luxury Cabin & Console', file: 'WhatsApp Image 2026-11-22 at 4.58.51 PM.jpeg', realName: 'mercedes_benz_interior_cockpit_real.jpg', cat: 'Luxury Cars', plate: 'OD02 MB 2027' },
  { name: 'Tata Winger Executive 15-Seater (OD02 CM 9290)', file: 'WhatsApp Image 2026-11-22 at 4.59.02 PM.jpeg', realName: 'tata_winger_od02cm9290_rear_real.jpg', cat: 'Tempo Traveller', plate: 'OD02 CM 9290' },
  { name: 'SML Executive Coach 31-Seater Tourist Bus', file: 'WhatsApp Image 2026-11-22 at 4.59.00 PM.jpeg', realName: 'sml_executive_coach_bus_real.jpg', cat: 'Luxury Bus', plate: 'OD02 SB 3131' }
];

// Clean vehicles list: replace any Unsplash vehicle with real fleet or local wide images
let realIdx = 0;
data.vehicles.forEach((v) => {
  if (v.image && (v.image.includes('unsplash') || !v.isRealFleet)) {
    if (v.name.includes('Swift Dzire')) {
      v.image = '/images/swift_dzire_wide.png';
    } else if (v.name.includes('Innova Crysta') || v.name.includes('Hycross')) {
      v.image = '/images/innova_crysta_wide.png';
    } else if (v.name.includes('Fortuner')) {
      v.image = '/images/fortuner_wide.png';
    } else if (v.name.includes('Urbania') && !v.image.includes('real')) {
      v.image = '/vehicles/real/force_urbania_wedding_garland_real.jpg';
      v.isRealFleet = true;
    } else if (v.name.includes('Traveller') && !v.image.includes('real')) {
      v.image = '/vehicles/real/force_traveller_jay_jagannath_real.jpg';
      v.isRealFleet = true;
    } else {
      // Pick next available real photo
      const real = realImageFiles[realIdx % realImageFiles.length];
      realIdx++;
      v.image = '/vehicles/real/' + real.realName;
      v.isRealFleet = true;
      v.plateNumber = v.plateNumber || real.plate;
      v.gallery = [
        '/vehicles/real/' + real.realName,
        encodeURI('/Vehicle Images/' + real.file)
      ];
    }
  }
});

fs.writeFileSync(jsonPath, JSON.stringify(data, null, 2), 'utf8');
console.log('database.json updated. Total vehicles:', data.vehicles.length);

// Sync SQLite database
const db = new sqlite3.Database(sqlitePath);
db.serialize(() => {
  db.run('DELETE FROM vehicles', err => {
    if (err) console.error('Delete error:', err);
    else console.log('Cleared existing SQLite vehicles');
  });

  const stmt = db.prepare(`
    INSERT INTO vehicles (
      id, name, category, image, pricePerKm, pricePerDay,
      capacity, luggage, mileage, ac, musicSystem, chargingPort,
      pushbackSeats, airbags, gps, features, availability,
      gallery, plateNumber, isRealFleet
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  data.vehicles.forEach(v => {
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
      v.plateNumber || '',
      v.isRealFleet ? 1 : 0
    );
  });

  stmt.finalize(err => {
    if (err) console.error('Finalize error:', err);
    else console.log('All vehicles synced to SQLite');
    db.close();
  });
});

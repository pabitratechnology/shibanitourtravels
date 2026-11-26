const fs = require('fs');
const path = require('path');
const sqlite3 = require('sqlite3');

const jsonPath = path.join(__dirname, 'database.json');
const sqlitePath = path.join(__dirname, 'database.sqlite');

const raw = fs.readFileSync(jsonPath, 'utf8').replace(/^\uFEFF/, '');
const data = JSON.parse(raw);

const db = new sqlite3.Database(sqlitePath, (err) => {
  if (err) {
    console.error('Failed to open database:', err);
    process.exit(1);
  }
});

db.serialize(() => {
  // Add columns if they do not exist
  const addCol = (col, type) => {
    db.run(`ALTER TABLE vehicles ADD COLUMN ${col} ${type}`, (err) => {
      // Ignore if column already exists
    });
  };

  addCol('gallery', 'TEXT');
  addCol('plateNumber', 'TEXT');
  addCol('isRealFleet', 'INTEGER DEFAULT 0');

  // Upsert all vehicles
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
      spec.ac ? 1 : 0,
      spec.musicSystem ? 1 : 0,
      spec.chargingPort ? 1 : 0,
      spec.pushbackSeats ? 1 : 0,
      spec.airbags ? 1 : 0,
      spec.gps ? 1 : 0,
      JSON.stringify(v.features || []),
      v.availability || 'Available',
      JSON.stringify(v.gallery || [v.image]),
      v.plateNumber || null,
      v.isRealFleet ? 1 : 0
    );
    count++;
  }

  stmt.finalize(() => {
    console.log(`Successfully synced ${count} vehicles into SQLite database!`);
    db.close();
  });
});

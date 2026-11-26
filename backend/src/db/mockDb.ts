import fs from 'fs';
import path from 'path';
import { 
  Vehicle, 
  Booking, 
  TourPackage, 
  Driver, 
  Testimonial, 
  GalleryItem, 
  Enquiry, 
  Blog, 
  Offer, 
  Notification, 
  FAQ, 
  Review 
} from '../types.js';

const DB_FILE = path.join(process.cwd(), 'backend', 'database.json');

// Define Initial Seed Data
const initialVehicles: Vehicle[] = [
  {
    id: 'v-1',
    name: 'Mercedes-Benz S-Class',
    category: 'Luxury Cars',
    image: 'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&q=80&w=800',
    pricePerKm: 75,
    pricePerDay: 25000,
    capacity: 4,
    luggage: 2,
    mileage: '12 km/l',
    specifications: { ac: true, musicSystem: true, chargingPort: true, pushbackSeats: true, airbags: true, gps: true },
    features: ['Panoramic Sunroof', 'Burmester Sound System', 'Nappa Leather Seats', 'Ambient Lighting', 'Chauffeur Driven'],
    availability: 'Available'
  },
  {
    id: 'v-2',
    name: 'Range Rover Sport',
    category: 'Luxury SUV',
    image: 'https://images.unsplash.com/photo-1606016159991-dfe4f2746ad5?auto=format&fit=crop&q=80&w=800',
    pricePerKm: 85,
    pricePerDay: 28000,
    capacity: 5,
    luggage: 4,
    mileage: '10 km/l',
    specifications: { ac: true, musicSystem: true, chargingPort: true, pushbackSeats: true, airbags: true, gps: true },
    features: ['All-Wheel Drive', 'Meridian Sound System', 'Air Suspension', 'Ventilated Seats', 'Panoramic Glass Roof'],
    availability: 'Available'
  },
  {
    id: 'v-3',
    name: 'Toyota Innova Crysta',
    category: 'Innova Crysta',
    image: 'https://images.unsplash.com/photo-1581540222194-0def2dda95b8?auto=format&fit=crop&q=80&w=800',
    pricePerKm: 18,
    pricePerDay: 3500,
    capacity: 7,
    luggage: 3,
    mileage: '13 km/l',
    specifications: { ac: true, musicSystem: true, chargingPort: true, pushbackSeats: true, airbags: true, gps: true },
    features: ['Captain Seats', 'Dual Zone AC', 'Touchscreen Infotainment', 'Steering Controls', 'Spacious Cabin'],
    availability: 'Available'
  },
  {
    id: 'v-4',
    name: 'Toyota Fortuner',
    category: 'SUV',
    image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=800',
    pricePerKm: 24,
    pricePerDay: 5500,
    capacity: 7,
    luggage: 4,
    mileage: '11 km/l',
    specifications: { ac: true, musicSystem: true, chargingPort: true, pushbackSeats: true, airbags: true, gps: true },
    features: ['4x4 Capability', 'Leather Interiors', 'Cruise Control', 'Rugged Build', 'High Ground Clearance'],
    availability: 'Available'
  },
  {
    id: 'v-5',
    name: 'Force Urbania Luxury (17 Seater)',
    category: 'Force Urbania',
    image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&q=80&w=800',
    pricePerKm: 28,
    pricePerDay: 8500,
    capacity: 17,
    luggage: 8,
    mileage: '9 km/l',
    specifications: { ac: true, musicSystem: true, chargingPort: true, pushbackSeats: true, airbags: true, gps: true },
    features: ['Monocoque Body', 'Individual AC Vents', 'Individual USB Ports', 'LED Reading Lamps', 'Reclining Luxury Seats'],
    availability: 'Available'
  },
  {
    id: 'v-6',
    name: 'Tempo Traveller Elite (12 Seater)',
    category: 'Tempo Traveller',
    image: 'https://images.unsplash.com/photo-1570125909232-eb263c188f7e?auto=format&fit=crop&q=80&w=800',
    pricePerKm: 22,
    pricePerDay: 6000,
    capacity: 12,
    luggage: 6,
    mileage: '10 km/l',
    specifications: { ac: true, musicSystem: true, chargingPort: true, pushbackSeats: true, airbags: true, gps: true },
    features: ['Premium Leatherette Seats', 'LCD TV Screen', 'JBL Sound System', 'Spacious Legroom', 'Aesthetic Ambient Roof'],
    availability: 'Available'
  },
  {
    id: 'v-7',
    name: 'Toyota Hilux Wedding Car',
    category: 'Wedding Cars',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=800',
    pricePerKm: 40,
    pricePerDay: 15000,
    capacity: 5,
    luggage: 3,
    mileage: '10 km/l',
    specifications: { ac: true, musicSystem: true, chargingPort: true, pushbackSeats: true, airbags: true, gps: true },
    features: ['Floral Decoration Available', 'Royal Entry Vibe', 'Spacious Interiors', 'Premium Wedding Chauffeur'],
    availability: 'Available'
  },
  {
    id: 'v-8',
    name: 'Volvo Multi-Axle AC Sleeper',
    category: 'Luxury Bus',
    image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&q=80&w=800',
    pricePerKm: 60,
    pricePerDay: 22000,
    capacity: 45,
    luggage: 30,
    mileage: '4 km/l',
    specifications: { ac: true, musicSystem: true, chargingPort: true, pushbackSeats: true, airbags: true, gps: true },
    features: ['Plush Sleeper Berths', 'USB Chargers', 'Air Suspension', 'Washroom Facility', 'GPS Tracking', 'CCTV Security'],
    availability: 'Available'
  },
  {
    id: 'v-9',
    name: 'Toyota Innova Hycross',
    category: 'Toyota Hycross',
    image: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&q=80&w=800',
    pricePerKm: 22,
    pricePerDay: 4800,
    capacity: 7,
    luggage: 3,
    mileage: '16 km/l',
    specifications: { ac: true, musicSystem: true, chargingPort: true, pushbackSeats: true, airbags: true, gps: true },
    features: ['Hybrid Silent Drive', 'Panoramic Sunroof', 'Otto Seats', 'ADAS Safety', 'Excellent Fuel Efficiency'],
    availability: 'Available'
  },
  {
    id: 'v-10',
    name: 'Honda City i-VTEC',
    category: 'Sedan',
    image: 'https://images.unsplash.com/photo-1617531653332-bd46c24f2068?auto=format&fit=crop&q=80&w=800',
    pricePerKm: 14,
    pricePerDay: 2500,
    capacity: 5,
    luggage: 2,
    mileage: '15 km/l',
    specifications: { ac: true, musicSystem: true, chargingPort: true, pushbackSeats: true, airbags: true, gps: true },
    features: ['Elegant Sedan Styling', 'Touchscreen Music System', 'Smooth Ride Comfort', 'Spacious Trunk'],
    availability: 'Available'
  },
  {
    id: 'v-11',
    name: 'Maruti Suzuki WagonR',
    category: 'Hatchback',
    image: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&q=80&w=800',
    pricePerKm: 10,
    pricePerDay: 1500,
    capacity: 4,
    luggage: 1,
    mileage: '21 km/l',
    specifications: { ac: true, musicSystem: true, chargingPort: true, pushbackSeats: false, airbags: true, gps: false },
    features: ['Highly Economical', 'Perfect for City Traffic', 'Tallboy Stance Headroom', 'Excellent Mileage'],
    availability: 'Available'
  },
  {
    id: 'v-12',
    name: 'Maruti Suzuki Swift',
    category: 'Hatchback',
    image: 'https://images.unsplash.com/photo-1620216462725-b4618a38a7c2?auto=format&fit=crop&q=80&w=800',
    pricePerKm: 11,
    pricePerDay: 1800,
    capacity: 5,
    luggage: 2,
    mileage: '22 km/l',
    specifications: { ac: true, musicSystem: true, chargingPort: true, pushbackSeats: false, airbags: true, gps: true },
    features: ['Sporty Ride & Steering', 'Compact Hatchback Parking', 'Bluetooth Sound System', 'Dual Front Airbags'],
    availability: 'Available'
  },
  {
    id: 'v-13',
    name: 'Maruti Suzuki Swift Dzire',
    category: 'Sedan',
    image: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&q=80&w=800',
    pricePerKm: 12,
    pricePerDay: 2200,
    capacity: 5,
    luggage: 2,
    mileage: '23 km/l',
    specifications: { ac: true, musicSystem: true, chargingPort: true, pushbackSeats: true, airbags: true, gps: true },
    features: ['Most Popular Indian Sedan', 'Large Dedicated Boot Space', 'Excellent AC Cooling', 'Comfortable Rear Seating'],
    availability: 'Available'
  },
  {
    id: 'v-14',
    name: 'Maruti Suzuki Ertiga Smart Hybrid',
    category: 'SUV',
    image: 'https://images.unsplash.com/photo-1619767886558-efdc259cde1a?auto=format&fit=crop&q=80&w=800',
    pricePerKm: 15,
    pricePerDay: 3200,
    capacity: 7,
    luggage: 3,
    mileage: '18 km/l',
    specifications: { ac: true, musicSystem: true, chargingPort: true, pushbackSeats: true, airbags: true, gps: true },
    features: ['Affordable 7-Seater Choice', 'Smart Hybrid Fuel Saving', 'Double Blower Roof AC', 'Flexible Foldable Seats'],
    availability: 'Available'
  },
  {
    id: 'v-15',
    name: 'Mahindra Bolero Power+',
    category: 'SUV',
    image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=800',
    pricePerKm: 14,
    pricePerDay: 2800,
    capacity: 7,
    luggage: 4,
    mileage: '14 km/l',
    specifications: { ac: true, musicSystem: true, chargingPort: true, pushbackSeats: false, airbags: true, gps: false },
    features: ['Ultra-Rugged Steel Body', 'Perfect for Rural Odisha', 'High Ground Clearance', 'Heavy Duty Suspension'],
    availability: 'Available'
  },
  {
    id: 'v-16',
    name: 'Mahindra Scorpio-N',
    category: 'SUV',
    image: 'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&q=80&w=800',
    pricePerKm: 22,
    pricePerDay: 5000,
    capacity: 7,
    luggage: 3,
    mileage: '12 km/l',
    specifications: { ac: true, musicSystem: true, chargingPort: true, pushbackSeats: true, airbags: true, gps: true },
    features: ['Big Daddy of SUVs', 'Touchscreen Infotainment', 'Commanding Seating Stance', 'Premium Safety Rating'],
    availability: 'Available'
  },
  {
    id: 'v-17',
    name: 'Toyota Camry Hybrid',
    category: 'Luxury Cars',
    image: 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?auto=format&fit=crop&q=80&w=800',
    pricePerKm: 30,
    pricePerDay: 7500,
    capacity: 5,
    luggage: 3,
    mileage: '18 km/l',
    specifications: { ac: true, musicSystem: true, chargingPort: true, pushbackSeats: true, airbags: true, gps: true },
    features: ['Hybrid Synergy Drive', 'E-CVT Automatic Gearbox', 'Premium Leather Upholstery', 'Ventilated Front Seats', 'Ultra Quiet Cabin Vibe'],
    availability: 'Available'
  },
  {
    id: 'v-18',
    name: 'Mercedes-Benz E-Class',
    category: 'Luxury Cars',
    image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&q=80&w=800',
    pricePerKm: 50,
    pricePerDay: 18000,
    capacity: 5,
    luggage: 3,
    mileage: '11 km/l',
    specifications: { ac: true, musicSystem: true, chargingPort: true, pushbackSeats: true, airbags: true, gps: true },
    features: ['Panoramic Electric Sunroof', 'Thermotronic Multi-Zone AC', 'Electric Rear Memory Seats', 'Burmester Premium Surround', 'Elite VVIP Chauffeur Driven'],
    availability: 'Available'
  },
  {
    id: 'v-19',
    name: 'Audi A6 Matrix Elite',
    category: 'Wedding Cars',
    image: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&q=80&w=800',
    pricePerKm: 45,
    pricePerDay: 16000,
    capacity: 5,
    luggage: 3,
    mileage: '12 km/l',
    specifications: { ac: true, musicSystem: true, chargingPort: true, pushbackSeats: true, airbags: true, gps: true },
    features: ['Matrix LED Beam Headlights', 'Dynamic Sweeping Indicators', 'Audi Virtual Cockpit Console', 'Premium Wedding Decoration', 'Red Carpet Groom/Bride Entry'],
    availability: 'Available'
  },
  {
    id: 'v-20',
    name: 'Jaguar XF Royal Edition',
    category: 'Wedding Cars',
    image: 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&q=80&w=800',
    pricePerKm: 55,
    pricePerDay: 20000,
    capacity: 5,
    luggage: 3,
    mileage: '11 km/l',
    specifications: { ac: true, musicSystem: true, chargingPort: true, pushbackSeats: true, airbags: true, gps: true },
    features: ['Meridian Surround Sound', 'Rotary Gear Shift Selector', 'Royal Windsor Leather', 'Premium Wedding Floral Decor', 'Experienced VVIP Chauffeur'],
    availability: 'Available'
  },
  {
    id: 'v-21',
    name: 'Force Urbania Executive (13 Seater)',
    category: 'Force Urbania',
    image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&q=80&w=800',
    pricePerKm: 26,
    pricePerDay: 7500,
    capacity: 13,
    luggage: 6,
    mileage: '10 km/l',
    specifications: { ac: true, musicSystem: true, chargingPort: true, pushbackSeats: true, airbags: true, gps: true },
    features: ['Crash-Tested Monocoque Body', 'Individual Reclining Seats', 'Personal Roof AC Vents', 'Fast USB Chargers (All Seats)', 'LED Reading Lamps & Ambient'],
    availability: 'Available'
  },
  {
    id: 'v-22',
    name: 'Force Urbania Grand (26 Seater)',
    category: 'Force Urbania',
    image: 'https://images.unsplash.com/photo-1570125909232-eb263c188f7e?auto=format&fit=crop&q=80&w=800',
    pricePerKm: 35,
    pricePerDay: 12000,
    capacity: 26,
    luggage: 10,
    mileage: '8 km/l',
    specifications: { ac: true, musicSystem: true, chargingPort: true, pushbackSeats: true, airbags: true, gps: true },
    features: ['Spacious Center Aisle Path', 'Wide Panoramic Glass Windows', 'Heavy Duty Air Suspension', 'Dual LCD Screen Entertainment', 'Soft Leather Headrests'],
    availability: 'Available'
  },
  {
    id: 'v-23',
    name: 'Hyundai i20 Asta Elite',
    category: 'Hatchback',
    image: 'https://images.unsplash.com/photo-1609521263047-f8f205293f24?auto=format&fit=crop&q=80&w=800',
    pricePerKm: 11,
    pricePerDay: 1800,
    capacity: 5,
    luggage: 2,
    mileage: '18 km/l',
    specifications: { ac: true, musicSystem: true, chargingPort: true, pushbackSeats: false, airbags: true, gps: true },
    features: ['Bose Premium Sound System', 'Fully Digital Instrument Cluster', 'Smart Sunroof & AC Blaster', 'Perfect for City Congestion'],
    availability: 'Available'
  },
  {
    id: 'v-24',
    name: 'Toyota Etios Liva Tourer',
    category: 'Sedan',
    image: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&q=80&w=800',
    pricePerKm: 13,
    pricePerDay: 2300,
    capacity: 5,
    luggage: 2,
    mileage: '16 km/l',
    specifications: { ac: true, musicSystem: true, chargingPort: true, pushbackSeats: true, airbags: true, gps: true },
    features: ['Bulletproof Toyota D-4D Engine', 'Superior Legroom & Comfort', 'High Efficiency Double AC', 'Spacious Dedicated Trunk Boot'],
    availability: 'Available'
  },
  {
    id: 'v-25',
    name: 'Kia Carens Luxury Plus',
    category: 'SUV',
    image: 'https://images.unsplash.com/photo-1633755307643-485121beb485?auto=format&fit=crop&q=80&w=800',
    pricePerKm: 16,
    pricePerDay: 3500,
    capacity: 7,
    luggage: 3,
    mileage: '16 km/l',
    specifications: { ac: true, musicSystem: true, chargingPort: true, pushbackSeats: true, airbags: true, gps: true },
    features: ['Bose Premium 8-Speaker Audio', 'Sky Light Electric Sunroof', 'Ventilated Front Seats System', '64-Color Ambient Mood Lighting', 'One-Touch Electric Tumble Seats'],
    availability: 'Available'
  },
  {
    id: 'v-26',
    name: 'Tata Safari Adventure Gold',
    category: 'SUV',
    image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=800',
    pricePerKm: 22,
    pricePerDay: 5200,
    capacity: 7,
    luggage: 4,
    mileage: '13 km/l',
    specifications: { ac: true, musicSystem: true, chargingPort: true, pushbackSeats: true, airbags: true, gps: true },
    features: ['Panoramic Skyroof Window', 'Harman 9-Speaker Audio System', 'Advanced Terrain Response Modes', 'Ventilated Captain Middle Seats', 'Electronic Parking Brake Tech'],
    availability: 'Available'
  },
  {
    id: 'v-27',
    name: 'SML Executive Coach (31 Seater)',
    category: 'Luxury Bus',
    image: 'https://images.unsplash.com/photo-1570125909232-eb263c188f7e?auto=format&fit=crop&q=80&w=800',
    pricePerKm: 45,
    pricePerDay: 15000,
    capacity: 31,
    luggage: 15,
    mileage: '6 km/l',
    specifications: { ac: true, musicSystem: true, chargingPort: true, pushbackSeats: true, airbags: false, gps: true },
    features: ['High Performance Roof AC Blower', 'Plush Reclining 2x2 Seating', 'LED TV Screen with Wired Mic', 'Spacious Under-Chassis Luggage', 'Wide Entrance Passenger Door'],
    availability: 'Available'
  },
  {
    id: 'v-28',
    name: 'Volvo 9600 Sovereign Coach (53 Seater)',
    category: 'Luxury Bus',
    image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&q=80&w=800',
    pricePerKm: 75,
    pricePerDay: 26000,
    capacity: 53,
    luggage: 40,
    mileage: '3.5 km/l',
    specifications: { ac: true, musicSystem: true, chargingPort: true, pushbackSeats: true, airbags: true, gps: true },
    features: ['Supreme Air Suspension Comfort', 'Double-Glazed Acoustic Glass', 'Onboard Luxury Clean Washroom', 'Individ. Reading & USB Charging', 'Aesthetic VVIP Cabin Lighting'],
    availability: 'Available'
  }
];

const initialTourPackages: TourPackage[] = [
  {
    id: 'p-1',
    title: 'Odisha Golden Triangle Tour',
    duration: '4 Days / 3 Nights',
    description: 'Explore the religious, archaeological, and cultural heart of Odisha. From ancient temples of Bhubaneswar to the golden sands of Puri and the architectural wonder of Konark.',
    price: 9999,
    image: 'https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&q=80&w=800',
    highlights: ['Bhubaneswar Temples (Lingaraj, Mukteshwar)', 'Jagannath Temple Puri', 'Konark Sun Temple (UNESCO Site)', 'Chilika Lake Dolphin Cruise'],
    itinerary: [
      { day: 1, title: 'Arrival in Bhubaneswar', description: 'Pickup from Airport/Station, check-in, visit Lingaraj & Mukteshwar temples, Khandagiri & Udayagiri Caves. Stay in Bhubaneswar.' },
      { day: 2, title: 'Bhubaneswar to Puri via Dhauli', description: 'Drive to Puri. En-route visit Dhauli Peace Pagoda and Pipili Applique Village. Check-in at Puri hotel. Visit Jagannath Temple in the evening and relax at Golden Beach.' },
      { day: 3, title: 'Konark Sun Temple & Marine Drive', description: 'Drive along the beautiful Marine Drive. Visit Chandrabhaga Beach and the magnificent Konark Sun Temple. Return to Puri for overnight stay.' },
      { day: 4, title: 'Chilika Lake Sanctuary & Departure', description: 'Excursion to Satapada (Chilika Lake), spot Irrawaddy Dolphins and visit Sea Mouth. Return to Bhubaneswar for departure transfer.' }
    ],
    locations: ['Bhubaneswar', 'Puri', 'Konark', 'Chilika']
  },
  {
    id: 'p-2',
    title: 'Chilika & Gopalpur Beach Escape',
    duration: '3 Days / 2 Nights',
    description: 'A serene getaway to India’s largest coastal lagoon, Chilika Lake, paired with the colonial beach town of Gopalpur-on-Sea.',
    price: 7499,
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=800',
    highlights: ['Satapada Dolphin Watching', 'Gopalpur Beach Sunset', 'Kalijai Temple Island', 'Seafood Gastronomy'],
    itinerary: [
      { day: 1, title: 'Bhubaneswar to Gopalpur', description: 'Drive from Bhubaneswar to Gopalpur. Check-in at luxury beach resort. Relax on the pristine beach and watch the vintage lighthouse.' },
      { day: 2, title: 'Chilika Lake Barkul Exploration', description: 'Excursion to Barkul side of Chilika Lake. Take a speedboat cruise to Kalijai Temple island and Nalabana Bird Sanctuary.' },
      { day: 3, title: 'Tara Tarini Temple & Departure', description: 'Visit the sacred Tara Tarini Hill Shrine, enjoy panoramic river views. Drive back to Bhubaneswar for departure.' }
    ],
    locations: ['Gopalpur', 'Chilika', 'Bhubaneswar']
  },
  {
    id: 'p-3',
    title: 'Bhitarkanika Wildlife Odyssey',
    duration: '3 Days / 2 Nights',
    description: 'Immerse yourself in India’s second largest mangrove ecosystem, home to giant saltwater crocodiles, monitor lizards, and exotic migratory birds.',
    price: 8999,
    image: 'https://images.unsplash.com/photo-1470240731273-7821a6eeb6bd?auto=format&fit=crop&q=80&w=800',
    highlights: ['Mangrove Boat Safari', 'Saltwater Crocodile Spotting', 'Exotic Migratory Bird Watching', 'Historical Pentha Beach'],
    itinerary: [
      { day: 1, title: 'Bhubaneswar to Bhitarkanika', description: 'Drive to Khola entry gate of Bhitarkanika. Check-in at eco-luxury tents. Evening forest walk and cultural performance.' },
      { day: 2, title: 'Full Day Creek Safari', description: 'Enjoy a thrilling boat safari through dense mangrove creeks. Spot crocodiles, deer, and kingfishers. Visit the ancient hunting tower of kings.' },
      { day: 3, title: 'Pentha Beach & Departure', description: 'Visit the beautiful pine-fringed Pentha Beach. Drive back to Bhubaneswar for airport/railway transfer.' }
    ],
    locations: ['Bhitarkanika', 'Bhubaneswar']
  }
];

const initialDrivers: Driver[] = [
  {
    id: 'd-1',
    name: 'Satyabrata Sahoo',
    phone: '+91 94371 00001',
    licenseNumber: 'OR-02-20150004523',
    rating: 4.9,
    experienceYears: 12,
    status: 'Available',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200'
  },
  {
    id: 'd-2',
    name: 'Prakash Mohapatra',
    phone: '+91 94371 00002',
    licenseNumber: 'OR-02-20120008432',
    rating: 4.8,
    experienceYears: 15,
    status: 'Available',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200'
  },
  {
    id: 'd-3',
    name: 'Ranjan Rout',
    phone: '+91 94371 00003',
    licenseNumber: 'OR-02-20180001928',
    rating: 4.7,
    experienceYears: 8,
    status: 'On Duty',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200'
  }
];

const initialTestimonials: Testimonial[] = [
  {
    id: 't-1',
    name: 'Dr. Alok Senapati',
    location: 'Corporate Client, Bhubaneswar',
    rating: 5,
    comment: 'We hired 5 Force Urbanias and 3 Mercedes S-Class for our international medical conference in Bhubaneswar. The coordination, punctuality, and condition of the vehicles were absolutely top-tier. Shibani Tour & Travels is undoubtedly the most reliable provider in Odisha!',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=150',
    date: '2026-05-15'
  },
  {
    id: 't-2',
    name: 'Meera & Sanjay Sharma',
    location: 'Family Vacation, New Delhi',
    rating: 5,
    comment: 'Booked the Odisha Golden Triangle Tour with a Toyota Crysta and driver Prakash. He was extremely knowledgeable about temples, polite, and drove so smoothly. The hotel recommendations were superb. Highly recommend their customized tour packages!',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150',
    date: '2026-06-20'
  },
  {
    id: 't-3',
    name: 'Ananya Das',
    location: 'Wedding Booking, Cuttack',
    rating: 5,
    comment: 'Fabulous experience! We booked a premium luxury Jaguar and a customized Audi for a wedding. The cars arrived spotless, beautifully decorated, and exactly on time. Staff was extremely supportive. Truly a five-star premium travel partner!',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150',
    date: '2026-06-29'
  }
];

const initialGallery: GalleryItem[] = [
  { id: 'g-1', title: 'Our Premium Force Urbania Fleet', category: 'vehicles', image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&q=80&w=800', isVideo: false },
  { id: 'g-2', title: 'Pristine Golden Beach Puri', category: 'odisha', image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=800', isVideo: false },
  { id: 'g-3', title: 'Sunset view of Konark Sun Temple', category: 'odisha', image: 'https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&q=80&w=800', isVideo: false },
  { id: 'g-4', title: 'Luxury Mercedes Wedding Car', category: 'vehicles', image: 'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&q=80&w=800', isVideo: false },
  { id: 'g-5', title: 'Dolphin Safari in Satapada Chilika', category: 'odisha', image: 'https://images.unsplash.com/photo-1500485035595-cbe6f645feb1?auto=format&fit=crop&q=80&w=800', isVideo: false },
  { id: 'g-6', title: 'Drone Shot of Marine Drive Bhubaneswar-Puri', category: 'drone', image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&q=80&w=800', isVideo: false }
];

const initialBlogs: Blog[] = [
  {
    id: 'b-1',
    title: 'The Ultimate Guide to Exploring Bhubaneswar: Temple City of India',
    slug: 'bhubaneswar-temple-city-guide',
    summary: 'Discover the rich architectural heritage, history, and food culture of Odisha’s capital city, from ancient Lingaraj Temple to modern cafes.',
    content: `Bhubaneswar, the capital of Odisha, is famously known as the Temple City of India. With a history spanning over 3,000 years, the city once boasted more than 7,000 temples. Today, several hundred beautiful stone temples still stand as a testament to the Kalinga style of architecture.

### Top Temples to Visit:
1. **Lingaraj Temple:** Built in the 11th century, this majestic temple is dedicated to Lord Shiva and stands at a soaring height of 180 feet.
2. **Mukteshwar Temple:** Widely recognized as the "Gem of Odisha Architecture" due to its famous arched gateway (Torana) and detailed carvings.
3. **Rajarani Temple:** Beautifully carved with female figures and standing in manicured gardens, famous for its unique sandstone colors.

### Best Way to Get Around:
To tour Bhubaneswar comfortably in the hot and humid climate of Odisha, hiring a reliable luxury car or a spacious Tempo Traveller for group excursions is highly recommended. Shibani Tour & Travels provides custom local sightseeing packages with expert native drivers.`,
    image: 'https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&q=80&w=800',
    author: 'Satyabrata Pradhan',
    date: '2026-06-12',
    tags: ['Bhubaneswar', 'Temple Tour', 'Odisha Tourism']
  },
  {
    id: 'b-2',
    title: 'Why Force Urbania is Rewriting Group Travel Rules in Odisha',
    slug: 'force-urbania-luxury-travel-odisha',
    summary: 'Explore why discerning travelers, wedding parties, and corporate clients are switching to Force Urbania rentals for outstation trips.',
    content: `Group traveling used to mean compromising on comfort and safety. But with the introduction of the **Force Urbania**, luxury group commuting is finally here in Odisha.

### Why Force Urbania is the Premium Choice:
- **Monocoque Chassis:** Unlike traditional mini-buses that vibrate and shake, the Urbania's monocoque design provides car-like handling and ultimate structural safety.
- **Plush Reclining Seats:** Individual seats with soft upholstery, triple-point seatbelts, and separate reading lights.
- **Aesthetic Air Vents:** Dual-zone powerful AC system that cools the entire vehicle in minutes, even in Odisha's summer peak.
- **Panoramic Windows:** Offers gorgeous unobstructed views of the scenic Eastern Ghats, Chilika lagoon, and marine drive.

At Shibani Tour & Travels, we have introduced a fleet of premium Force Urbanias in 13-seater, 17-seater, and 26-seater variants, making us the top booking choice for weddings, pilgrimages, and corporate trips.`,
    image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&q=80&w=800',
    author: 'Travel Desk Specialist',
    date: '2026-06-25',
    tags: ['Force Urbania', 'Group Travel', 'Luxury Rentals']
  }
];

const initialOffers: Offer[] = [
  { id: 'o-1', code: 'SHIBANI10', discountPercentage: 10, description: 'Get 10% off on your first luxury car rental booking.', validUntil: '2026-12-31', minBookingValue: 3000 },
  { id: 'o-2', code: 'ODISHA15', discountPercentage: 15, description: 'Exclusive 15% discount on full Golden Triangle Tour packages.', validUntil: '2026-09-30', minBookingValue: 8000 },
  { id: 'o-3', code: 'URBANIA500', discountPercentage: 5, description: 'Flat Rs. 500 off on Force Urbania premium group bookings.', validUntil: '2026-08-31', minBookingValue: 6000 }
];

const initialFAQs: FAQ[] = [
  { id: 'f-1', question: 'How do I book a vehicle with Shibani Tour & Travels?', answer: 'You can book instantly using our state-of-the-art online booking portal, via WhatsApp, or by calling our 24/7 hotline at +91-9437100001. We provide instant reservation confirmations.', category: 'Booking' },
  { id: 'f-2', question: 'Do you offer self-drive cars in Bhubaneswar?', answer: 'Yes, we have an optional premium self-drive catalog for corporate executives and verified travelers with valid documentation. However, most of our fleet is chauffeur-driven to provide you with absolute comfort.', category: 'Fleet' },
  { id: 'f-3', question: 'What are the outstation taxi charges per kilometer?', answer: 'Our rates start as low as Rs. 11/km for hatchbacks, Rs. 14/km for sedans, Rs. 18/km for Toyota Crysta, and Rs. 28/km for luxury Force Urbanias. Final fares are fully transparent without hidden fuel or driver night surcharges.', category: 'Pricing' },
  { id: 'f-4', question: 'Are toll taxes and state borders permits included in the quote?', answer: 'For tour packages, all-inclusive pricing is provided. For daily rentals/taxi services, state border permits, tolls, and parking fees are either paid actuals by the client or calculated in your customized dynamic invoice.', category: 'Pricing' }
];

const initialBookings: Booking[] = [
  {
    id: 'b-1001',
    customerName: 'Aman Agarwal',
    customerEmail: 'aman@example.com',
    customerPhone: '9876543210',
    pickupLocation: 'Bhubaneswar Airport (BBI)',
    dropLocation: 'Hotel Mayfair Lagoon, Bhubaneswar',
    journeyType: 'Airport Transfer',
    pickupDate: '2026-07-10',
    pickupTime: '14:30',
    vehicleId: 'v-3',
    vehicleName: 'Toyota Innova Crysta',
    vehicleCategory: 'Innova Crysta',
    passengers: 4,
    luggage: 3,
    discountAmount: 0,
    totalFare: 3500,
    paymentOption: 'Card',
    paymentStatus: 'Paid',
    bookingStatus: 'Confirmed',
    driverId: 'd-1',
    driverName: 'Satyabrata Sahoo',
    createdAt: '2026-07-05T18:30:00Z'
  },
  {
    id: 'b-1002',
    customerName: 'Padmini Mohanty',
    customerEmail: 'padmini@example.com',
    customerPhone: '8877665544',
    pickupLocation: 'Puri Railway Station',
    dropLocation: 'Konark Sun Temple',
    journeyType: 'Outstation',
    pickupDate: '2026-07-15',
    pickupTime: '09:00',
    returnDate: '2026-07-15',
    vehicleId: 'v-10',
    vehicleName: 'Honda City i-VTEC',
    vehicleCategory: 'Sedan',
    passengers: 3,
    luggage: 1,
    discountAmount: 250,
    totalFare: 2250,
    paymentOption: 'UPI',
    paymentStatus: 'Paid',
    bookingStatus: 'Confirmed',
    driverId: 'd-2',
    driverName: 'Prakash Mohapatra',
    createdAt: '2026-07-06T09:15:00Z',
    couponCode: 'SHIBANI10'
  }
];

const initialEnquiries: Enquiry[] = [
  { id: 'eq-1', name: 'Satyajit Mishra', email: 'satyajit@gmail.com', phone: '9439122334', subject: 'Corporate Tour Query', message: 'We require 3 luxury AC buses for our employee outing from Bhubaneswar to Chilika on August 15. Please send quotes and GST details.', status: 'Pending', createdAt: '2026-07-06T08:00:00Z' }
];

const initialNotifications: Notification[] = [
  { id: 'n-1', title: 'New Booking Confirmed', message: 'Booking b-1002 from Padmini Mohanty has been successfully verified.', type: 'success', createdAt: '2026-07-06T09:16:00Z', isRead: false },
  { id: 'n-2', title: 'New Corporate Query', message: 'Satyajit Mishra submitted an enquiry regarding Corporate buses.', type: 'info', createdAt: '2026-07-06T08:02:00Z', isRead: true }
];

export class MockDatabase {
  private data: {
    vehicles: Vehicle[];
    tourPackages: TourPackage[];
    drivers: Driver[];
    testimonials: Testimonial[];
    gallery: GalleryItem[];
    blogs: Blog[];
    offers: Offer[];
    faqs: FAQ[];
    bookings: Booking[];
    enquiries: Enquiry[];
    notifications: Notification[];
    reviews: Review[];
  };

  constructor() {
    this.data = {
      vehicles: initialVehicles,
      tourPackages: initialTourPackages,
      drivers: initialDrivers,
      testimonials: initialTestimonials,
      gallery: initialGallery,
      blogs: initialBlogs,
      offers: initialOffers,
      faqs: initialFAQs,
      bookings: initialBookings,
      enquiries: initialEnquiries,
      notifications: initialNotifications,
      reviews: []
    };
    this.load();
  }

  private load() {
    try {
      if (fs.existsSync(DB_FILE)) {
        const fileContent = fs.readFileSync(DB_FILE, 'utf-8');
        const parsed = JSON.parse(fileContent);
        this.data = { ...this.data, ...parsed };
      } else {
        this.save();
      }
    } catch (e) {
      console.error('Error loading database, re-initializing seeds', e);
      this.save();
    }
  }

  private save() {
    try {
      fs.writeFileSync(DB_FILE, JSON.stringify(this.data, null, 2), 'utf-8');
    } catch (e) {
      console.error('Error saving database file:', e);
    }
  }

  // Getters
  getVehicles() { return this.data.vehicles; }
  getTourPackages() { return this.data.tourPackages; }
  getDrivers() { return this.data.drivers; }
  getTestimonials() { return this.data.testimonials; }
  getGallery() { return this.data.gallery; }
  getBlogs() { return this.data.blogs; }
  getOffers() { return this.data.offers; }
  getFAQs() { return this.data.faqs; }
  getBookings() { return this.data.bookings; }
  getEnquiries() { return this.data.enquiries; }
  getNotifications() { return this.data.notifications; }
  getReviews() { return this.data.reviews; }

  // Setters / Helpers
  addBooking(booking: Omit<Booking, 'id' | 'createdAt'>) {
    const id = `b-${Date.now()}`;
    const newBooking: Booking = {
      ...booking,
      id,
      createdAt: new Date().toISOString()
    };
    this.data.bookings.unshift(newBooking);
    
    // Add a corresponding notification
    this.addNotification({
      title: 'New Booking Received',
      message: `${newBooking.customerName} has booked a ${newBooking.vehicleName} (${newBooking.journeyType}) for Rs. ${newBooking.totalFare}.`,
      type: 'success'
    });

    this.save();
    return newBooking;
  }

  updateBookingStatus(id: string, status: Booking['bookingStatus'], driverId?: string) {
    const booking = this.data.bookings.find(b => b.id === id);
    if (booking) {
      booking.bookingStatus = status;
      if (driverId) {
        const driver = this.data.drivers.find(d => d.id === driverId);
        if (driver) {
          booking.driverId = driver.id;
          booking.driverName = driver.name;
          driver.status = 'On Duty';
        }
      } else if (status === 'Completed' && booking.driverId) {
        const driver = this.data.drivers.find(d => d.id === booking.driverId);
        if (driver) {
          driver.status = 'Available';
        }
      }
      this.save();
      return booking;
    }
    return null;
  }

  addEnquiry(enquiry: Omit<Enquiry, 'id' | 'createdAt' | 'status'>) {
    const id = `eq-${Date.now()}`;
    const newEnquiry: Enquiry = {
      ...enquiry,
      id,
      status: 'Pending',
      createdAt: new Date().toISOString()
    };
    this.data.enquiries.unshift(newEnquiry);

    this.addNotification({
      title: 'New Enquiry',
      message: `Enquiry about "${newEnquiry.subject}" received from ${newEnquiry.name}.`,
      type: 'info'
    });

    this.save();
    return newEnquiry;
  }

  addNotification(notif: Omit<Notification, 'id' | 'createdAt' | 'isRead'>) {
    const id = `n-${Date.now()}`;
    const newNotif: Notification = {
      ...notif,
      id,
      createdAt: new Date().toISOString(),
      isRead: false
    };
    this.data.notifications.unshift(newNotif);
    this.save();
    return newNotif;
  }

  markNotificationsAsRead() {
    this.data.notifications.forEach(n => n.isRead = true);
    this.save();
  }

  addReview(review: Omit<Review, 'id' | 'date'>) {
    const id = `r-${Date.now()}`;
    const newReview: Review = {
      ...review,
      id,
      date: new Date().toISOString().split('T')[0]
    };
    this.data.reviews.unshift(newReview);
    this.save();
    return newReview;
  }

  addTestimonial(testimonial: Omit<Testimonial, 'id' | 'date'>) {
    const id = `t-${Date.now()}`;
    const newTestimonial: Testimonial = {
      ...testimonial,
      id,
      date: new Date().toISOString().split('T')[0]
    };
    this.data.testimonials.unshift(newTestimonial);
    this.save();
    return newTestimonial;
  }

  addBlog(blog: Omit<Blog, 'id' | 'date' | 'slug'>) {
    const id = `b-${Date.now()}`;
    const slug = blog.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const newBlog: Blog = {
      ...blog,
      id,
      slug,
      date: new Date().toISOString().split('T')[0]
    };
    this.data.blogs.unshift(newBlog);
    this.save();
    return newBlog;
  }

  addGalleryItem(item: Omit<GalleryItem, 'id'>) {
    const id = `g-${Date.now()}`;
    const newItem: GalleryItem = { ...item, id };
    this.data.gallery.unshift(newItem);
    this.save();
    return newItem;
  }
}

// Single instance of database
export const db = new MockDatabase();

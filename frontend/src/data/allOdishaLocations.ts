export interface OdishaLocationItem {
  name: string;
  category: 'Airports & Transit' | 'Spiritual & Heritage' | 'Beaches & Coastal' | 'Hills & Wildlife' | 'Major Cities & Hubs';
  district: string;
  isPopular?: boolean;
  distanceFromBhubaneswar?: string;
  badge?: string;
}

export const ALL_ODISHA_LOCATIONS: OdishaLocationItem[] = [
  // ── AIRPORTS & TRANSIT ──
  { name: 'Bhubaneswar Airport (BBI)', category: 'Airports & Transit', district: 'Khordha', isPopular: true, badge: 'Airport' },
  { name: 'Bhubaneswar Railway Station', category: 'Airports & Transit', district: 'Khordha', isPopular: true, badge: 'Rail' },
  { name: 'Cuttack Railway Station', category: 'Airports & Transit', district: 'Cuttack', isPopular: true, badge: 'Rail' },
  { name: 'Puri Railway Station', category: 'Airports & Transit', district: 'Puri', isPopular: true, badge: 'Rail' },
  { name: 'Berhampur Railway Station', category: 'Airports & Transit', district: 'Ganjam', isPopular: false, badge: 'Rail' },
  { name: 'Jharsuguda Airport (VSS)', category: 'Airports & Transit', district: 'Jharsuguda', isPopular: false, badge: 'Airport' },
  { name: 'Rourkela Airport / Station', category: 'Airports & Transit', district: 'Sundargarh', isPopular: false, badge: 'Transit' },

  // ── SPIRITUAL & HERITAGE ──
  { name: 'Puri Jagannath Temple & Swargadwar', category: 'Spiritual & Heritage', district: 'Puri', isPopular: true, distanceFromBhubaneswar: '60 km', badge: 'Char Dham' },
  { name: 'Konark Sun Temple UNESCO World Heritage', category: 'Spiritual & Heritage', district: 'Puri', isPopular: true, distanceFromBhubaneswar: '65 km', badge: 'UNESCO' },
  { name: 'Bhubaneswar Ekamra Kshetra (Lingaraj & Dhauli)', category: 'Spiritual & Heritage', district: 'Khordha', isPopular: true, distanceFromBhubaneswar: '0 km', badge: 'Temples' },
  { name: 'Ghatgaon Maa Tarini Pitha', category: 'Spiritual & Heritage', district: 'Keonjhar', isPopular: true, distanceFromBhubaneswar: '180 km', badge: 'Pilgrimage' },
  { name: 'Jajpur Maa Biraja Kshetra (Shakti Peetha)', category: 'Spiritual & Heritage', district: 'Jajpur', isPopular: true, distanceFromBhubaneswar: '110 km', badge: 'Shakti Peeth' },
  { name: 'Sambalpur Maa Samaleswari Temple', category: 'Spiritual & Heritage', district: 'Sambalpur', isPopular: false, distanceFromBhubaneswar: '280 km', badge: 'Western Odisha' },
  { name: 'Taratarini Shakti Peetha (Rushikulya)', category: 'Spiritual & Heritage', district: 'Ganjam', isPopular: false, distanceFromBhubaneswar: '175 km', badge: 'Hill Shrine' },
  { name: 'Sarala Temple (Jhankada)', category: 'Spiritual & Heritage', district: 'Jagatsinghpur', isPopular: false, distanceFromBhubaneswar: '75 km', badge: 'Saraswati' },
  { name: 'Kapilash Mahadev Temple (Dhenkanal)', category: 'Spiritual & Heritage', district: 'Dhenkanal', isPopular: false, distanceFromBhubaneswar: '95 km', badge: 'Kailash of Odisha' },
  { name: 'Gupteswar Shiva Cave Temple', category: 'Spiritual & Heritage', district: 'Koraput', isPopular: false, distanceFromBhubaneswar: '510 km', badge: 'Sacred Cave' },

  // ── BEACHES & COASTAL ──
  { name: 'Chilika Lake (Satapada Dolphin Safari)', category: 'Beaches & Coastal', district: 'Puri', isPopular: true, distanceFromBhubaneswar: '110 km', badge: 'Dolphins' },
  { name: 'Chilika Lake (Barkul & Kalijai Island)', category: 'Beaches & Coastal', district: 'Khordha', isPopular: true, distanceFromBhubaneswar: '100 km', badge: 'Lagoon' },
  { name: 'Gopalpur on Sea Beach Resort', category: 'Beaches & Coastal', district: 'Ganjam', isPopular: true, distanceFromBhubaneswar: '170 km', badge: 'Blue Flag' },
  { name: 'Chandipur Beach (Vanishing Sea & Waves)', category: 'Beaches & Coastal', district: 'Balasore', isPopular: true, distanceFromBhubaneswar: '215 km', badge: 'Phenomenon' },
  { name: 'Chandrabhaga Beach & Marine Drive (Konark)', category: 'Beaches & Coastal', district: 'Puri', isPopular: true, distanceFromBhubaneswar: '68 km', badge: 'Golden Sand' },
  { name: 'Paradip Sea Port & Beach', category: 'Beaches & Coastal', district: 'Jagatsinghpur', isPopular: false, distanceFromBhubaneswar: '115 km', badge: 'Port City' },
  { name: 'Astaranga Golden Sunset Beach', category: 'Beaches & Coastal', district: 'Puri', isPopular: false, distanceFromBhubaneswar: '85 km', badge: 'Sunset' },
  { name: 'Talsari & Udaypur Beach (Balasore)', category: 'Beaches & Coastal', district: 'Balasore', isPopular: false, distanceFromBhubaneswar: '270 km', badge: 'Red Crabs' },

  // ── HILLS & WILDLIFE ──
  { name: 'Daringbadi (Kashmir of Odisha Pine Hills)', category: 'Hills & Wildlife', district: 'Kandhamal', isPopular: true, distanceFromBhubaneswar: '260 km', badge: 'Hill Station' },
  { name: 'Similipal Tiger Reserve & Waterfall Safari', category: 'Hills & Wildlife', district: 'Mayurbhanj', isPopular: true, distanceFromBhubaneswar: '260 km', badge: 'Tiger Reserve' },
  { name: 'Bhitarkanika Mangrove & Saltwater Crocodile Safari', category: 'Hills & Wildlife', district: 'Kendrapara', isPopular: true, distanceFromBhubaneswar: '140 km', badge: 'Amazon of East' },
  { name: 'Satkosia Tiger Reserve & Gorge Sanctuary', category: 'Hills & Wildlife', district: 'Angul', isPopular: true, distanceFromBhubaneswar: '130 km', badge: 'Eco Camp' },
  { name: 'Deomali Peak & Koraput Coffee Valleys (1672m)', category: 'Hills & Wildlife', district: 'Koraput', isPopular: true, distanceFromBhubaneswar: '510 km', badge: 'Highest Peak' },
  { name: 'Kuldiha Wildlife Sanctuary & Elephant Reserve', category: 'Hills & Wildlife', district: 'Balasore', isPopular: false, distanceFromBhubaneswar: '230 km', badge: 'Wildlife' },
  { name: 'Debrigarh Wildlife Sanctuary (Hirakud Dam)', category: 'Hills & Wildlife', district: 'Bargarh', isPopular: false, distanceFromBhubaneswar: '320 km', badge: 'Lake Safari' },
  { name: 'Khandadhar Waterfalls (Sundargarh)', category: 'Hills & Wildlife', district: 'Sundargarh', isPopular: false, distanceFromBhubaneswar: '290 km', badge: 'Waterfalls' },

  // ── MAJOR CITIES & INDUSTRIAL HUBS ──
  { name: 'Bhubaneswar (Capital Smart City)', category: 'Major Cities & Hubs', district: 'Khordha', isPopular: true, badge: 'Hub' },
  { name: 'Cuttack (Millennium & Silver City)', category: 'Major Cities & Hubs', district: 'Cuttack', isPopular: true, distanceFromBhubaneswar: '28 km', badge: 'Commercial' },
  { name: 'Puri Town & Sea Beach Road', category: 'Major Cities & Hubs', district: 'Puri', isPopular: true, distanceFromBhubaneswar: '60 km', badge: 'Tourism' },
  { name: 'Rourkela (Steel City of India)', category: 'Major Cities & Hubs', district: 'Sundargarh', isPopular: false, distanceFromBhubaneswar: '330 km', badge: 'Smart City' },
  { name: 'Sambalpur (Western Odisha Hub)', category: 'Major Cities & Hubs', district: 'Sambalpur', isPopular: false, distanceFromBhubaneswar: '280 km', badge: 'Commercial' },
  { name: 'Berhampur (Silk City of South Odisha)', category: 'Major Cities & Hubs', district: 'Ganjam', isPopular: false, distanceFromBhubaneswar: '170 km', badge: 'Trading' },
  { name: 'Balasore Industrial & Missile Hub', category: 'Major Cities & Hubs', district: 'Balasore', isPopular: false, distanceFromBhubaneswar: '210 km', badge: 'Industry' },
  { name: 'Angul & Talcher Industrial Belt', category: 'Major Cities & Hubs', district: 'Angul', isPopular: false, distanceFromBhubaneswar: '130 km', badge: 'Mining/Power' },
  { name: 'Baripada (Mayurbhanj Chhau Cultural Capital)', category: 'Major Cities & Hubs', district: 'Mayurbhanj', isPopular: false, distanceFromBhubaneswar: '250 km', badge: 'Heritage' },
  { name: 'Jeypore & Rayagada (South Odisha Gateway)', category: 'Major Cities & Hubs', district: 'Koraput', isPopular: false, distanceFromBhubaneswar: '480 km', badge: 'Transit' },
];

export const POPULAR_QUICK_LOCATIONS = [
  'Bhubaneswar Airport (BBI)',
  'Bhubaneswar Railway Station',
  'Puri Jagannath Temple & Swargadwar',
  'Konark Sun Temple UNESCO World Heritage',
  'Chilika Lake (Satapada Dolphin Safari)',
  'Daringbadi (Kashmir of Odisha Pine Hills)',
  'Gopalpur on Sea Beach Resort',
  'Similipal Tiger Reserve & Waterfall Safari',
  'Ghatgaon Maa Tarini Pitha',
  'Cuttack (Millennium & Silver City)',
];

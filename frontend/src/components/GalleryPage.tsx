import React, { useState } from 'react';
import { Sparkles, Camera, MapPin, Layers, ExternalLink, ChevronRight, Home, Eye, Play } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function GalleryPage() {
  const [activeFilter, setActiveFilter] = useState<'All' | 'real' | 'fleet' | 'weddings' | 'destinations' | 'drone'>('All');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const items = [
    {
      id: 101,
      title: 'Audi A6 Matrix Elite (UP14 CU 2276)',
      category: 'real',
      image: '/vehicles/real/audi_a6_front_grille_real.jpg',
      location: 'Shibani Travels Fleet Hub, Bhubaneswar',
      desc: 'Our flagship white Audi A6 luxury sedan with Matrix LED headlights ready for VIP weddings & corporate transit in Odisha.'
    },
    {
      id: 102,
      title: 'Audi A6 Matrix Elite - Full Front Portrait',
      category: 'real',
      image: '/vehicles/real/audi_a6_front_portrait_real.jpg',
      location: 'Shibani Executive Garage, Bhubaneswar',
      desc: 'Showroom-finish Audi A6 luxury sedan prepared for high-profile executive airport transfers.'
    },
    {
      id: 103,
      title: 'Audi A6 Matrix Elite - Dynamic Side Profile',
      category: 'real',
      image: '/vehicles/real/audi_a6_side_profile_real.jpg',
      location: 'VIP Boulevard, Bhubaneswar',
      desc: 'Aerodynamic side silhouette of our pristine Audi A6 luxury sedan with premium alloy wheels.'
    },
    {
      id: 104,
      title: 'Audi A6 Luxury Sedan - All Doors Open Display',
      category: 'real',
      image: '/vehicles/real/audi_a6_doors_open_real.jpg',
      location: 'Fleet Showcase Ground, Bhubaneswar',
      desc: 'Display of roomy cabin space, premium dual-tone leather upholstery, and wide door aperture.'
    },
    {
      id: 105,
      title: 'Audi A6 MMI Virtual Cockpit & Cabin',
      category: 'real',
      image: '/vehicles/real/audi_a6_interior_cockpit_real.jpg',
      location: 'Executive Chauffeur Division',
      desc: 'Pristine beige leather interior, dual-zone climate control, and digital MMI navigation console inside our Audi A6.'
    },
    {
      id: 106,
      title: 'Jaguar XF Royal Edition (HR26 DM 2323)',
      category: 'real',
      image: '/vehicles/real/jaguar_xf_hotel_portico_real.jpg',
      location: 'Hotel Mayfair Lagoon Portico, Bhubaneswar',
      desc: 'Royal edition Jaguar XF luxury sedan parked at 5-star hotel portico for high-profile VIP guest transfers.'
    },
    {
      id: 107,
      title: 'Jaguar XF Countryside & Heritage Drive',
      category: 'real',
      image: '/vehicles/real/jaguar_xf_nature_doors_open_real.jpg',
      location: 'Dhauli Shanti Stupa Road, Odisha',
      desc: 'All doors open showing spacious luxury seating of our Jaguar XF amidst Odisha countryside.'
    },
    {
      id: 108,
      title: 'Jaguar XF Royal White - Highway Profile',
      category: 'real',
      image: '/vehicles/real/jaguar_xf_road_profile_real.jpg',
      location: 'Puri-Konark Marine Drive Highway',
      desc: 'Jaguar XF showing powerful road stance and British luxury prestige along Odisha coastal highways.'
    },
    {
      id: 109,
      title: 'Force Urbania Royal Wedding Edition',
      category: 'real',
      image: '/vehicles/real/force_urbania_wedding_garland_real.jpg',
      location: 'Bhubaneswar Grand Marriage Venue',
      desc: 'Our latest Force Urbania luxury van beautifully decorated with fresh orchid garlands and balloons for a grand baraat.'
    },
    {
      id: 110,
      title: 'Force Urbania Bronze Luxury Van (17 Seater)',
      category: 'real',
      image: '/vehicles/real/force_urbania_luxury_van_bronze_real.jpg',
      location: 'Bhubaneswar Corporate Tech Park',
      desc: 'Metallic bronze Force Urbania 17-seater luxury van with panoramic touring windows and individual AC vents.'
    },
    {
      id: 111,
      title: 'Force Traveller Jay Jagannath (OD02 AX 4881)',
      category: 'real',
      image: '/vehicles/real/force_traveller_jay_jagannath_real.jpg',
      location: 'Puri Jagannath Temple Highway',
      desc: 'Commercial Odisha registered Force Traveller blessed with Jay Jagannath emblem for daily pilgrimage circuits.'
    },
    {
      id: 112,
      title: 'Force Traveller (OD02 AX 4881) - Front Profile',
      category: 'real',
      image: '/vehicles/real/force_traveller_od02ax4881_front_real.jpg',
      location: 'Shibani Puri Terminal',
      desc: 'Clean front angle of commercial tourist permit 17-seater Force Traveller for family yatras.'
    },
    {
      id: 113,
      title: 'Force Traveller Jay Maa Tarini (OD05 AK 9627)',
      category: 'real',
      image: '/vehicles/real/force_traveller_jay_maa_tarini_real.jpg',
      location: 'Ghatgaon & Keonjhar Route',
      desc: 'Odisha state permit 26-seater Force Traveller specially assigned for Ghatgaon Maa Tarini and northern pilgrimage trips.'
    },
    {
      id: 114,
      title: 'Force Traveller 26-Seater (OD02 DF 4498)',
      category: 'real',
      image: '/vehicles/real/force_traveller_od02df4498_front_real.jpg',
      location: 'Bhubaneswar Railway Station Circuit',
      desc: 'Long wheelbase 26-passenger Force Traveller for university educational excursions and corporate teams.'
    },
    {
      id: 115,
      title: 'Force Traveller (OD02 DF 4498) - Rear Luggage Ladder',
      category: 'real',
      image: '/vehicles/real/force_traveller_od02df4498_rear_ladder_real.jpg',
      location: 'Inter-City Highway Terminal',
      desc: 'Heavy-duty steel rear ladder and reinforced roof luggage carrier for long-distance group tours.'
    },
    {
      id: 116,
      title: 'Force Traveller (OD02 DU 3328) - Touring Carrier',
      category: 'real',
      image: '/vehicles/real/force_traveller_od02du3328_rear_real.jpg',
      location: 'Cuttack Transit Hub',
      desc: 'Rear view of commercial Force Traveller coach with heavy cargo carrier ready for luggage-heavy tours.'
    },
    {
      id: 117,
      title: 'Brand New Force Traveller (OD33 BA 4090)',
      category: 'real',
      image: '/vehicles/real/force_traveller_od33ba4090_delivery_real.jpg',
      location: 'Shibani Fleet Induction Center',
      desc: 'Brand new showroom delivery day photo of latest generation Force Cruiser joining the Shibani fleet.'
    },
    {
      id: 118,
      title: 'Force Traveller Cruiser - Side Highway Profile',
      category: 'real',
      image: '/vehicles/real/force_traveller_cba_cabs_side_real.jpg',
      location: 'National Highway 16, Odisha',
      desc: 'Side view of our white Force Traveller cruising smoothly on the Bhubaneswar-Cuttack express corridor.'
    },
    {
      id: 119,
      title: 'Force Traveller 17-Seater - Commercial Lineup',
      category: 'real',
      image: '/vehicles/real/force_traveller_side_view_real.jpg',
      location: 'Shibani Central Depot',
      desc: 'Full side profile showing wide tinted passenger glass and clean commercial livery.'
    },
    {
      id: 120,
      title: 'Tempo Traveller Ultra-Luxury Recliner Interior',
      category: 'real',
      image: '/vehicles/real/tempo_traveller_luxury_interior_led_real.jpg',
      location: 'Shibani Luxury Coach Division',
      desc: 'Inside view of our custom Maharaja 2x1 leather pushback seats with ambient orange diamond quilting & LED ceiling.'
    },
    {
      id: 121,
      title: 'Tempo Traveller 2x1 Pushback Leather Recliners',
      category: 'real',
      image: '/vehicles/real/tempo_traveller_pushback_seats_interior_real.jpg',
      location: 'VIP Coach Workshop',
      desc: 'Plush ergonomic headrests, individual armrests, and ample legroom inside our custom Tempo Traveller.'
    },
    {
      id: 122,
      title: 'Honda City Sport (White Showroom Edition)',
      category: 'real',
      image: '/vehicles/real/honda_city_sport_white_real.jpg',
      location: 'Airport Transfer Fleet Hub',
      desc: 'Premium white Honda City i-VTEC sedan for executive airport pick-and-drop transfers in Bhubaneswar.'
    },
    {
      id: 123,
      title: 'Hyundai Verna Premium Sedan (White)',
      category: 'real',
      image: '/vehicles/real/hyundai_verna_white_real.jpg',
      location: 'Bhubaneswar Corporate Hub',
      desc: 'Aerodynamic Hyundai Verna sedan with silent air-conditioned cabin for outstation and twin-city transit.'
    },
    {
      id: 124,
      title: 'Mercedes-Benz Driver Ergonomics & Dual Cockpit',
      category: 'real',
      image: '/vehicles/real/mercedes_benz_driver_seat_interior_real.jpg',
      location: 'VIP Chauffeur Fleet Hub',
      desc: 'Top-tier ergonomics, multi-function steering and twin digital displays inside our Mercedes-Benz.'
    },
    {
      id: 125,
      title: 'Mercedes-Benz Luxury Cabin & Console',
      category: 'real',
      image: '/vehicles/real/mercedes_benz_interior_cockpit_real.jpg',
      location: 'VVIP Chauffeur Service',
      desc: 'Exquisite wood veneer finish, ambient LED lighting, and soft-touch dashboard inside our luxury Mercedes.'
    },
    {
      id: 126,
      title: 'Tata Winger Executive (OD02 CM 9290)',
      category: 'real',
      image: '/vehicles/real/tata_winger_od02cm9290_rear_real.jpg',
      location: 'Cuttack-Bhubaneswar Twin City Operations',
      desc: 'High-roof Tata Winger 15-seater with heavy-duty roof rack and carrier for extended family tours.'
    },
    {
      id: 127,
      title: 'SML Executive Coach 31-Seater Tourist Bus',
      category: 'real',
      image: '/vehicles/real/sml_executive_coach_bus_real.jpg',
      location: 'Bhubaneswar Inter-State Bus Hub',
      desc: '31-passenger air-suspension SML luxury coach for school, college, and corporate group conferences.'
    },
    {
      id: 1,
      title: 'VVIP Force Urbania Luxury Fleet',
      category: 'fleet',
      image: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&q=80&w=800',
      location: 'Bhubaneswar Operations Hub',
      desc: 'Our latest generation Force Urbania 17-seater fleet lined up for luxury guest transit.'
    },
    {
      id: 2,
      title: 'Royal Wedding Convoy at Mayfair',
      category: 'weddings',
      image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=800',
      location: 'Mayfair Lagoon, Bhubaneswar',
      desc: 'Synchronized deployment of 12 Innova Crystas decorated with orchids for a royal marriage ceremony.'
    },
    {
      id: 3,
      title: 'Puri Golden Beach Morning Drive',
      category: 'destinations',
      image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=800',
      location: 'Puri Swargadwar Sea Beach',
      desc: 'Coastal luxury tour with our VVIP Toyota Fortuner SUV along the Bay of Bengal coastline.'
    },
    {
      id: 4,
      title: 'Konark Sun Temple Heritage Tour',
      category: 'destinations',
      image: 'https://images.unsplash.com/photo-1609946782786-905101683935?auto=format&fit=crop&q=80&w=800',
      location: 'Konark Sun Temple UNESCO Site',
      desc: 'Guiding global heritage delegates in our Volvo air-suspension luxury tourist coach.'
    },
    {
      id: 5,
      title: 'Similipal Wildlife Reserve Safari',
      category: 'drone',
      image: 'https://images.unsplash.com/photo-1470240731273-7821a6eeb6bd?auto=format&fit=crop&q=80&w=800',
      location: 'Similipal Tiger Reserve, Mayurbhanj',
      desc: 'Off-road 4x4 Fortuner jungle expedition capturing rare wildlife trails.'
    },
    {
      id: 6,
      title: 'Mercedes-Benz S-Class Bridal Entrance',
      category: 'weddings',
      image: 'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&q=80&w=800',
      location: 'Cuttack Heritage Palace',
      desc: 'Luxury S-Class flagship bridal car arrival adorned with floral artistry.'
    }
  ];

  const filters = [
    { code: 'All', label: 'All Photos (33)' },
    { code: 'real', label: '📸 Real Fleet Photos (27)' },
    { code: 'fleet', label: 'Fleet Showcase' },
    { code: 'weddings', label: 'Wedding Convoys' },
    { code: 'destinations', label: 'Odisha Destinations' },
    { code: 'drone', label: 'Aerial Drone Shots' }
  ];

  const filteredItems = items.filter((item) => activeFilter === 'All' || item.category === activeFilter);

  return (
    <div className="bg-[#FAFDFB] min-h-screen text-slate-800 font-sans">
      
      {/* ══ FULL SCREEN ADVANCED BRAND HERO SHOWCASE ══ */}
      <div className="relative min-h-[50vh] flex flex-col justify-between pt-[104px] pb-12 overflow-hidden text-white bg-gradient-to-r from-[#00381B] via-[#004D26] to-[#00381B]">
        <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
          <img
            src="/banners/bhubaneswar_city.png"
            alt="Photo Gallery"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-[3px]"
          style={{ background: 'linear-gradient(to right, transparent, #006837 30%, #D32F2F 50%, #006837 70%, transparent)' }} />

        {/* Top Breadcrumb Navigation */}
        <div className="max-w-7xl mx-auto w-full relative z-10 px-4 sm:px-6 lg:px-8 pt-2 pb-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs font-semibold text-green-100 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/15 shadow-sm">
              <button onClick={() => window.location.href = '/'} className="flex items-center gap-1.5 hover:text-white transition-colors">
                <Home className="w-3.5 h-3.5 text-green-300" /> Home
              </button>
              <ChevronRight className="w-3.5 h-3.5 text-white/40" />
              <span className="text-amber-300 font-bold">Photo Gallery</span>
            </div>

            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest text-green-200 bg-white/10 backdrop-blur-md border border-white/20 shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
              Visual Showcase
            </div>
          </div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center my-auto px-4">
          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight mb-4 drop-shadow-md"
          >
            Luxury Fleet & Destination{' '}
            <span className="text-amber-300 italic font-serif">
              Gallery
            </span>
          </motion.h1>
          <p className="text-green-100/90 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed font-medium">
            Browse high-definition snapshots of our executive sedans, Force Urbania vans, wedding convoys, and heritage tours across Puri and Konark.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

        {/* Filter controls */}
        <div className="flex flex-wrap gap-2 justify-center mb-12">
          {filters.map((f) => (
            <button
              key={f.code}
              onClick={() => setActiveFilter(f.code as any)}
              className={`px-5 py-2 rounded-xl text-xs font-semibold tracking-wider transition-all duration-300 ${
                activeFilter === f.code
                  ? 'bg-gradient-to-r from-yellow-500 to-amber-600 text-stone-950 shadow-[0_4px_15px_rgba(226, 88, 34,0.25)] font-bold'
                  : 'bg-[#2b1b17]/50 text-stone-300 border border-yellow-500/10 hover:border-yellow-500/20 hover:bg-[#2b1b17]/80'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Gallery Masonry/Flex grid */}
        {filteredItems.length === 0 ? (
          <div className="text-center py-16 bg-slate-50 border border-slate-200 rounded-2xl">
            <p className="text-slate-500 text-sm">No media assets in this category.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                onClick={() => setSelectedImage(item.image)}
                className="group relative h-72 rounded-2xl overflow-hidden border border-slate-200/80 hover:border-emerald-500/60 shadow-lg cursor-pointer transition-all duration-500 bg-white"
              >
                {/* Image */}
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />

                {/* Glass layer overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-60 group-hover:opacity-85 transition-opacity duration-300" />

                {/* Hover indicator icon */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                  <span className="p-3 bg-[#006837] text-white rounded-full shadow-lg transform translate-y-3 group-hover:translate-y-0 transition-transform duration-300">
                    <Eye className="w-5 h-5" />
                  </span>
                </div>

                {/* Information block */}
                <div className="absolute bottom-4 left-4 right-4 z-10 text-left">
                  <span className="text-[9px] font-mono font-bold text-yellow-500 uppercase tracking-widest bg-yellow-950/60 border border-yellow-500/10 px-2 py-0.5 rounded">
                    {item.category === 'vehicles' ? 'Fleet' : item.category === 'odisha' ? 'Scenic' : 'Aero Drone'}
                  </span>
                  <h4 className="text-sm font-bold text-[#fcfaf2] mt-1.5 group-hover:text-yellow-400 transition-colors">
                    {item.title}
                  </h4>
                </div>

              </div>
            ))}
          </div>
        )}

      </div>

      {/* Lightbox Modal overlay */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 cursor-zoom-out"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="max-w-4xl max-h-[85vh] w-full relative"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={selectedImage}
                alt="Enlarged Luxury Preview"
                className="w-full h-auto max-h-[85vh] object-contain rounded-2xl border border-yellow-500/20 shadow-2xl"
              />
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute -top-10 right-0 text-stone-400 hover:text-white text-sm"
              >
                ✕ Close Preview
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}

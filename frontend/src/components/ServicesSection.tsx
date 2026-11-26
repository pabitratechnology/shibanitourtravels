import React from 'react';
import { motion } from 'motion/react';
import {
  Car, Bus, Users, Hotel, Plane, MapPin, ArrowRight, Sparkles
} from 'lucide-react';

interface ServicesSectionProps {
  onBook: (serviceTitle?: string) => void;
  onNavigateToServices?: (tabKey?: string) => void;
}

const SERVICES = [
  {
    tabKey: 'cabs',
    title: 'Cab Rental & Taxi Service',
    desc: 'Local city rides, airport drops, and outstation cabs with verified drivers.',
    icon: <Car className="w-6 h-6 text-[#006837]" />,
    iconBg: '#ECFDF5',
    iconBorder: '#A7F3D0',
    badge: 'Popular',
  },
  {
    tabKey: 'tours',
    title: 'Tour Packages (All India)',
    desc: 'All-inclusive Golden Triangle, spiritual yatras, and interstate tour circuits.',
    icon: <Bus className="w-6 h-6 text-[#D97706]" />,
    iconBg: '#FEF3C7',
    iconBorder: '#FDE68A',
    badge: 'All India',
  },
  {
    tabKey: 'tempo',
    title: 'Tempo Traveller & Luxury',
    desc: '12, 17, and 26-seater Force Urbanias & Travellers for group expeditions.',
    icon: <Users className="w-6 h-6 text-[#006837]" />,
    iconBg: '#ECFDF5',
    iconBorder: '#A7F3D0',
    badge: 'Group Travel',
  },
  {
    tabKey: 'hotels',
    title: 'Hotel Booking (Direct Partner)',
    desc: 'Handpicked partner hotels & heritage resorts at verified exclusive prices.',
    icon: <Hotel className="w-6 h-6 text-[#D97706]" />,
    iconBg: '#FEF3C7',
    iconBorder: '#FDE68A',
    badge: 'Direct Rates',
  },
  {
    tabKey: 'transit',
    title: 'Flight & Train Booking',
    desc: 'Hassle-free domestic flight tickets and confirmed IRCTC train reservations.',
    icon: <Plane className="w-6 h-6 text-[#006837]" />,
    iconBg: '#ECFDF5',
    iconBorder: '#A7F3D0',
    badge: 'Fast Connect',
  },
  {
    tabKey: 'custom',
    title: 'Customized Travel Plans',
    desc: 'Tailor-made private itineraries designed around your schedule and budget.',
    icon: <MapPin className="w-6 h-6 text-[#E25822]" />,
    iconBg: '#FFF7ED',
    iconBorder: '#FFEDD5',
    badge: 'Bespoke',
  },
];

export default function ServicesSection({ onBook, onNavigateToServices }: ServicesSectionProps) {
  const handleCardClick = (srv: typeof SERVICES[0]) => {
    if (onNavigateToServices) {
      onNavigateToServices(srv.tabKey);
    } else {
      onBook(srv.title);
    }
  };

  return (
    <section className="py-16 sm:py-20 bg-white relative overflow-hidden">
      
      {/* Decorative Brand Tint */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 text-center relative z-10">
        
        {/* Section Header: —— Our Services —— */}
        <div className="flex items-center justify-center gap-3 mb-3">
          <div className="w-10 sm:w-16 h-0.5 bg-[#006837]" />
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight">
            <span className="text-[#006837]">Our</span>{' '}
            <span className="text-[#E25822]">Services</span>
          </h2>
          <div className="w-10 sm:w-16 h-0.5 bg-[#006837]" />
        </div>

        <p className="text-xs sm:text-sm text-slate-500 max-w-xl mx-auto mb-12 font-medium">
          Comprehensive travel, taxi, fleet, and accommodation solutions for business travelers, families, and pilgrimage groups.
        </p>

        {/* 6 Service Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 sm:gap-5">
          {SERVICES.map((srv, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -6, scale: 1.02 }}
              transition={{ duration: 0.25 }}
              onClick={() => handleCardClick(srv)}
              className="bg-[#FAF8F5] rounded-3xl p-5 sm:p-6 border border-slate-200/80 shadow-xs hover:shadow-xl hover:border-[#006837]/40 transition-all flex flex-col items-center text-center cursor-pointer group"
            >
              {/* Circular Colored Icon Chip */}
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110 shadow-xs"
                style={{
                  background: srv.iconBg,
                  border: `1.5px solid ${srv.iconBorder}`,
                }}
              >
                {srv.icon}
              </div>

              {/* Title */}
              <h3 className="text-sm font-extrabold text-slate-800 leading-snug group-hover:text-[#006837] transition-colors mb-2">
                {srv.title}
              </h3>

              {/* Description */}
              <p className="text-[11px] text-slate-500 leading-relaxed font-medium mb-3">
                {srv.desc}
              </p>

              <span className="mt-auto text-[10.5px] font-black uppercase text-[#006837] flex items-center gap-1 group-hover:gap-1.5 transition-all">
                <span>View Plans</span>
                <ArrowRight className="w-3 h-3" />
              </span>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA to Full Services Directory */}
        <div className="mt-10">
          <button
            onClick={() => onNavigateToServices && onNavigateToServices('cabs')}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white border border-[#006837] text-[#006837] hover:bg-[#006837] hover:text-white transition-all text-xs font-black uppercase tracking-wider shadow-sm hover:shadow-md cursor-pointer"
          >
            <span>Explore All 6 Services &amp; Fixed Rate Cards</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </section>
  );
}

import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar.js';
import Hero from './components/Hero.js';
import CallbackWidget from './components/CallbackWidget.js';
import BookingForm from './components/BookingForm.js';
import BookingSuccessModal from './components/BookingSuccessModal.js';
import AiChatbot from './components/AiChatbot.js';
import VehiclePage from './components/VehiclePage.js';
import AiEstimator from './components/AiEstimator.js';
import AboutPage from './components/AboutPage.js';
import ProjectsPage from './components/ProjectsPage.js';
import GalleryPage from './components/GalleryPage.js';
import TestimonialsPage from './components/TestimonialsPage.js';
import BlogPage from './components/BlogPage.js';
import ContactPage from './components/ContactPage.js';
import ContactFooter from './components/ContactFooter.js';
import AdminPanel from './components/AdminPanel.js';
import HomeFeaturedFleet from './components/HomeFeaturedFleet.js';
import OdishaLocations from './components/OdishaLocations.js';
import HomeReviews from './components/HomeReviews.js';
import WhyChooseUs from './components/WhyChooseUs.js';
import BookingProcess from './components/BookingProcess.js';
import Footer from './components/Footer.js';
import ServicesSection from './components/ServicesSection.js';
import BlogPreview from './components/BlogPreview.js';
import PartnersStrip from './components/PartnersStrip.js';
import VehicleDetailPage from './components/vehicles/VehicleDetailPage.js';
import HomeAboutSection from './components/HomeAboutSection.js';
import HomeTourPackages from './components/HomeTourPackages.js';
import ToursPage from './components/ToursPage.js';
import TourDetailPage from './components/TourDetailPage.js';
import DayTourRates from './components/DayTourRates.js';
import CircuitExplorer from './components/CircuitExplorer.js';
import HomeFaqSection from './components/HomeFaqSection.js';
import ServicesPage from './components/ServicesPage.js';
import OdishaPilgrimageSpecials from './components/OdishaPilgrimageSpecials.js';
import SafetyTrustGuarantee from './components/SafetyTrustGuarantee.js';
import OdishaWildlifeEcoResorts from './components/OdishaWildlifeEcoResorts.js';
import { Sparkles, MapPin, Car, Star, Briefcase } from 'lucide-react';

// Map tab IDs → human-readable breadcrumb labels + icons + background images + tags
const PAGE_META: Record<string, { label: string; icon: React.ReactNode; desc: string; bg: string; tag: string }> = {
  services:     { label: 'Our Comprehensive Services',   icon: <Briefcase className="w-4 h-4" />,desc: 'Cab rentals, tour packages, luxury coaches, direct hotels, flights & custom itineraries', bg: '/banners/travel_fleet.png', tag: 'Full Travel Solutions' },
  fleet:        { label: 'Our Premium Fleet',           icon: <Car className="w-4 h-4" />,     desc: 'Browse 80+ vehicles — sedans, SUVs, coaches, and VVIP wedding cars', bg: '/banners/travel_fleet.png', tag: '80+ GPS Vehicles' },
  projects:     { label: 'Event & Corporate Projects',  icon: <Star className="w-4 h-4" />,    desc: 'MICE, corporate transport and group event logistics', bg: '/banners/wedding_car.png', tag: 'MICE & Event Logistics' },
  tours:        { label: 'Odisha Tour Packages',        icon: <MapPin className="w-4 h-4" />,  desc: 'Curated 2–7 day itineraries across Odisha\'s top destinations', bg: '/banners/konark_temple.png', tag: 'Guided Regional Tours' },
  about:        { label: 'About Shibani Travels',       icon: <Sparkles className="w-4 h-4" />,desc: 'More than 28 years of excellence in premium road transport in Odisha', bg: '/banners/travel_fleet.png', tag: '28+ Years in Business (Since 1998)' },
  gallery:      { label: 'Photo Gallery',               icon: <Star className="w-4 h-4" />,    desc: 'Fleet photographs, destination shots, and event highlights', bg: '/banners/jagannath_temple.png', tag: 'Visual Showcase' },
  testimonials: { label: 'Client Testimonials',         icon: <Star className="w-4 h-4" />,    desc: 'Real reviews from 5,000+ satisfied passengers', bg: '/banners/chilika_lake.png', tag: '4.9★ Rated Agency' },
  blog:         { label: 'Odisha Travel Guides',        icon: <MapPin className="w-4 h-4" />,  desc: 'Expert travel guides, route maps, and trip tips', bg: '/banners/bhubaneswar_city.png', tag: 'Expert Travel Guides' },
  contact:      { label: 'Contact & Helpline',          icon: <Sparkles className="w-4 h-4" />,desc: 'Call, WhatsApp, or email our round-the-clock support desk', bg: '/banners/travel_fleet.png', tag: '24/7 Support Desk' },
  admin:        { label: 'Admin Dashboard',             icon: <Star className="w-4 h-4" />,    desc: 'Manage bookings, fleet, and operations', bg: '/banners/travel_fleet.png', tag: 'Operations Hub' },
  forex:        { label: 'Forex Services',              icon: <Sparkles className="w-4 h-4" />,desc: 'Currency exchange and international travel services', bg: '/banners/travel_fleet.png', tag: 'International Services' },
  visa:         { label: 'Visa Assistance',             icon: <Sparkles className="w-4 h-4" />,desc: 'Visa application and documentation support', bg: '/banners/travel_fleet.png', tag: 'Documentation Desk' },
  tour:         { label: 'Tour Itinerary & Details',    icon: <MapPin className="w-4 h-4" />,  desc: 'Detailed day-wise itinerary, inclusions, fleet options & booking', bg: '/banners/konark_temple.png', tag: 'Tour Details' },
  package:      { label: 'Tour Itinerary & Details',    icon: <MapPin className="w-4 h-4" />,  desc: 'Detailed day-wise itinerary, inclusions, fleet options & booking', bg: '/banners/konark_temple.png', tag: 'Tour Details' },
};

function VehicleDetailWrapper({ onBook, onBack }: { onBook: (vehicle: any) => void; onBack: () => void }) {
  return <VehicleDetailPage onBook={onBook} onBack={onBack} />;
}

function AppContent() {
  const navigate = useNavigate();
  const location = useLocation();

  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [successBookingId, setSuccessBookingId] = useState<string | null>(null);
  const [selectedVehicle, setSelectedVehicle] = useState<any | null>(null);
  const [searchPickup, setSearchPickup] = useState('');
  const [searchDrop, setSearchDrop] = useState('');
  const [searchDate, setSearchDate] = useState('');
  const [searchJourneyType, setSearchJourneyType] = useState<'Local' | 'Outstation' | 'One Way' | 'Round Trip' | 'Airport Transfer'>('Outstation');
  const [searchName, setSearchName] = useState('');
  const [searchPhone, setSearchPhone] = useState('');

  // Resolve activeTab based on location.pathname
  const path = location.pathname;
  let activeTab = 'home';
  if (path === '/' || path === '/home') {
    activeTab = 'home';
  } else if (path.startsWith('/services')) {
    activeTab = 'services';
  } else if (path.startsWith('/about')) {
    activeTab = 'about';
  } else if (path.startsWith('/fleet') || path.startsWith('/vehicles')) {
    activeTab = 'fleet';
  } else if (path.startsWith('/projects')) {
    activeTab = 'projects';
  } else if (path.startsWith('/tours')) {
    activeTab = 'tours';
  } else if (path.startsWith('/gallery')) {
    activeTab = 'gallery';
  } else if (path.startsWith('/testimonials')) {
    activeTab = 'testimonials';
  } else if (path.startsWith('/blog')) {
    activeTab = 'blog';
  } else if (path.startsWith('/contact')) {
    activeTab = 'contact';
  } else if (path.startsWith('/admin')) {
    activeTab = 'admin';
  } else if (path.startsWith('/forex')) {
    activeTab = 'forex';
  } else if (path.startsWith('/visa')) {
    activeTab = 'visa';
  } else if (path.startsWith('/vehicle/')) {
    activeTab = 'fleet';
  } else if (path.startsWith('/tour/') || path.startsWith('/package/')) {
    activeTab = 'tours';
  }

  const handleOpenBooking = (
    vehicle: any = null,
    pickup = '',
    drop = '',
    date = '',
    journeyType: 'Local' | 'Outstation' | 'One Way' | 'Round Trip' | 'Airport Transfer' = 'Outstation',
    name = '',
    phone = ''
  ) => {
    setSelectedVehicle(vehicle);
    setSearchPickup(pickup);
    setSearchDrop(drop);
    setSearchDate(date);
    setSearchJourneyType(journeyType);
    setSearchName(name);
    setSearchPhone(phone);
    setIsBookingOpen(true);
  };

  const handleBookingSuccess = (bookingId: string) => {
    setIsBookingOpen(false);
    setSuccessBookingId(bookingId);
  };

  const navigateTo = (tab: string) => {
    if (tab === 'home') {
      navigate('/');
    } else if (tab === 'vehicles' || tab === 'fleet') {
      navigate('/fleet');
    } else if (tab.startsWith('vehicle-')) {
      const id = tab.replace('vehicle-', '');
      navigate(`/vehicle/${id}`);
    } else if (tab.startsWith('tour-') || tab.startsWith('tour/')) {
      const id = tab.replace(/^tour[-/]/, '');
      navigate(`/tour/${id}`);
    } else if (tab.startsWith('package-') || tab.startsWith('package/')) {
      const id = tab.replace(/^package[-/]/, '');
      navigate(`/tour/${id}`);
    } else if (tab.startsWith('services')) {
      navigate(`/${tab}`);
    } else {
      navigate(`/${tab}`);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const isAdminRoute = path.startsWith('/admin');

  if (isAdminRoute) {
    return (
      <div className="min-h-screen text-[#FAF8F5] bg-[#020617] antialiased">
        <main className="min-h-screen">
          <Routes>
            <Route path="/admin" element={<AdminPanel />} />
          </Routes>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen text-slate-700 font-sans antialiased overflow-x-hidden" style={{ background: '#FAF8F5' }}>

      {/* ── Fixed Navigation ── */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={navigateTo}
        openBookingModal={() => handleOpenBooking()}
      />



      {/* ── Main Section Renderer ── */}
      <main className="min-h-[60vh]">
        <Routes>
          {/* HOME */}
          <Route path="/" element={
            <div className="space-y-0 animate-fade-in bg-white">
              {/* 1. Hero with Composite Banner & Search Trips Bar */}
              <Hero
                onBookNow={(pickup, drop, date, journeyType, name, phone) => handleOpenBooking(null, pickup, drop, date, journeyType as any, name, phone)}
                onExploreFleet={() => navigateTo('fleet')}
                onEstimateTrip={() => navigateTo('tours')}
              />

              {/* 2. About Shibani Travels Section (Story, Pillars, 4 Live Stats) */}
              <HomeAboutSection
                onLearnMore={() => navigateTo('about')}
                onBookNow={() => handleOpenBooking()}
              />

              {/* 3. Our Services (6 Core Service Cards) */}
              <ServicesSection
                onBook={(service) => handleOpenBooking(null, undefined, undefined, undefined, service as any)}
                onNavigateToServices={(tabKey) => navigateTo(`services?tab=${tabKey || 'cabs'}`)}
              />

              {/* 3.5. Odisha Sacred Pilgrimages & VIP Darshan Circuit */}
              <OdishaPilgrimageSpecials
                onBookPilgrimage={(name, vehicle) => handleOpenBooking(null, 'Bhubaneswar', name, undefined, `Pilgrimage Cab (${vehicle})` as any)}
              />

              {/* 4. Odisha Featured Tour Packages (Like Kalyani Tours DMC) */}
              <HomeTourPackages
                onBookPackage={(pkg) => handleOpenBooking(null, undefined, undefined, undefined, pkg as any)}
                onViewAllTours={() => navigateTo('tours')}
              />

              {/* 5. Transparent Odisha Day Tour Taxi Rates Matrix */}
              <DayTourRates
                onBookRide={(from, to) => handleOpenBooking(null, from, to)}
              />

              {/* 5.5. Pristine Odisha Wildlife & Eco-Tourism Circuit */}
              <OdishaWildlifeEcoResorts
                onBookEcoTour={(dest, vehicle) => handleOpenBooking(null, 'Bhubaneswar', dest, undefined, `Wildlife Safari (${vehicle})` as any)}
              />

              {/* 6. Odisha Travel Circuits & Route Explorer */}
              <CircuitExplorer
                onPlanCircuit={(circuit) => handleOpenBooking(null, 'Bhubaneswar', circuit)}
              />

              {/* 7. Popular Destinations Showcase */}
              <OdishaLocations onPlanTrip={(dest) => handleOpenBooking(null, 'Bhubaneswar', dest)} />

              {/* 8. Our Fleet (Full Vehicles Showcase with Tabs, Specs & Pricing) */}
              <HomeFeaturedFleet
                onBookVehicle={(vehicle) => handleOpenBooking(vehicle)}
                onViewAllFleet={() => navigateTo('fleet')}
                onSelectVehicle={(id) => navigateTo('vehicle-' + id)}
              />

              {/* 8.5. 6-Pillar Supreme Safety & Trust Guarantee */}
              <SafetyTrustGuarantee
                onPlanTrip={() => handleOpenBooking()}
              />

              {/* 8. Simple 3-Step Booking Process */}
              <BookingProcess />

              {/* 9. Why Choose Shibani Travels */}
              <WhyChooseUs />

              {/* 10. What Our Customers Say & Plan Your Next Trip Banner */}
              <HomeReviews
                onViewAllReviews={() => navigateTo('testimonials')}
                onPlanTrip={() => handleOpenBooking()}
              />

              {/* 11. Frequently Asked Questions (FAQ) & Booking Guide */}
              <HomeFaqSection />

              {/* 12. Travel Guides & Blog Preview */}
              <BlogPreview onNavigate={() => navigateTo('blog')} />

              {/* 13. Trust Partners Strip */}
              <PartnersStrip />
            </div>
          } />
          <Route path="/home" element={<Navigate to="/" replace />} />

          {/* SERVICES */}
          <Route path="/services" element={
            <div className="animate-fade-in">
              <ServicesPage
                onBookService={(name, vehicle, from, to) => handleOpenBooking(null, from, to, undefined, name as any)}
              />
            </div>
          } />

          {/* ABOUT */}
          <Route path="/about" element={
            <div className="animate-fade-in">
              <AboutPage />
            </div>
          } />

          {/* FLEET */}
          <Route path="/fleet" element={
            <div className="animate-fade-in">
              <VehiclePage
                onBookVehicle={handleOpenBooking}
                onSelectVehicle={(id) => navigateTo('vehicle-' + id)}
              />
            </div>
          } />
          <Route path="/vehicles" element={<Navigate to="/fleet" replace />} />

          {/* PROJECTS */}
          <Route path="/projects" element={
            <div className="animate-fade-in">
              <ProjectsPage onBook={(v, p, d, dt, jt) => handleOpenBooking(v, p, d, dt, jt)} />
            </div>
          } />

          {/* TOURS */}
          <Route path="/tours" element={
            <div className="animate-fade-in">
              <ToursPage
                onBookPackage={(name, vehicle, from, to) => handleOpenBooking(null, from, to, undefined, name as any)}
              />
            </div>
          } />

          {/* TOUR DETAILS */}
          <Route path="/tour/:id" element={
            <div className="animate-fade-in">
              <TourDetailPage
                onBookPackage={(name, vehicle, from, to) => handleOpenBooking(null, from, to, undefined, name as any)}
              />
            </div>
          } />
          <Route path="/package/:id" element={
            <div className="animate-fade-in">
              <TourDetailPage
                onBookPackage={(name, vehicle, from, to) => handleOpenBooking(null, from, to, undefined, name as any)}
              />
            </div>
          } />

          {/* GALLERY */}
          <Route path="/gallery" element={
            <div className="animate-fade-in">
              <GalleryPage />
            </div>
          } />

          {/* TESTIMONIALS */}
          <Route path="/testimonials" element={
            <div className="animate-fade-in">
              <TestimonialsPage />
            </div>
          } />

          {/* BLOG */}
          <Route path="/blog" element={
            <div className="animate-fade-in">
              <BlogPage />
            </div>
          } />

          {/* CONTACT */}
          <Route path="/contact" element={
            <div className="animate-fade-in">
              <ContactPage />
            </div>
          } />

          {/* ADMIN */}
          <Route path="/admin" element={
            <div className="animate-fade-in">
              <AdminPanel />
            </div>
          } />

          {/* FOREX / VISA */}
          <Route path="/forex" element={
            <div className="animate-fade-in flex items-center justify-center py-32 text-center">
              <div>
                <div className="text-6xl mb-4">💱</div>
                <h2 className="text-2xl font-black text-slate-900 mb-2">Forex Services</h2>
                <p className="text-slate-500 mb-6">Coming soon. Contact us for details.</p>
                <button onClick={() => handleOpenBooking()} className="btn-primary px-6 py-3">Contact Our Team</button>
              </div>
            </div>
          } />

          <Route path="/visa" element={
            <div className="animate-fade-in flex items-center justify-center py-32 text-center">
              <div>
                <div className="text-6xl mb-4">🛂</div>
                <h2 className="text-2xl font-black text-slate-900 mb-2">Visa Assistance</h2>
                <p className="text-slate-500 mb-6">Coming soon. Contact us for details.</p>
                <button onClick={() => handleOpenBooking()} className="btn-primary px-6 py-3">Contact Our Team</button>
              </div>
            </div>
          } />

          {/* VEHICLE DETAILS */}
          <Route path="/vehicle/:id" element={
            <div className="animate-fade-in">
              <VehicleDetailWrapper onBook={handleOpenBooking} onBack={() => navigateTo('fleet')} />
            </div>
          } />

          {/* FALLBACK 404 ROUTE */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      {/* ── Global Footer ── */}
      <Footer setActiveTab={navigateTo} />

      {/* ── Floating AI Chatbot ── */}
      <AiChatbot />

      {/* ── Callback Request Widget ── */}
      <CallbackWidget />

      {/* ── Booking Modal ── */}
      {isBookingOpen && (
        <BookingForm
          initialVehicle={selectedVehicle}
          onClose={() => setIsBookingOpen(false)}
          onSuccess={handleBookingSuccess}
          initialPickup={searchPickup}
          initialDrop={searchDrop}
          initialDate={searchDate}
          initialJourneyType={searchJourneyType}
          initialName={searchName}
          initialPhone={searchPhone}
        />
      )}

      {/* ── Booking Success Overlay ── */}
      {successBookingId && (
        <BookingSuccessModal
          bookingId={successBookingId}
          onClose={() => setSuccessBookingId(null)}
        />
      )}
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

import React, { useState } from 'react';
import {
  Phone, Mail, MapPin, Clock, Send, MessageSquare,
  ShieldCheck, CheckCircle2, ChevronRight, Home, Sparkles,
  PhoneCall, Building2, Car, Compass, Calendar, AlertCircle
} from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    serviceType: 'Outstation Cab Rental',
    travelDate: '',
    pickupLocation: 'Bhubaneswar',
    message: '',
  });

  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) {
      setErrorMessage('Please provide your name and phone number.');
      return;
    }

    setSubmitting(true);
    setErrorMessage('');

    try {
      const res = await fetch('/api/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          email: formData.email || `${formData.phone}@guest.shibanitravels.com`,
          subject: `${formData.serviceType} (${formData.pickupLocation})`,
          message: `Date: ${formData.travelDate || 'Immediate'} | Service: ${formData.serviceType} | Pickup: ${formData.pickupLocation} | Details: ${formData.message}`,
        }),
      });

      if (res.ok) {
        setSubmitted(true);
        setFormData({
          name: '',
          phone: '',
          email: '',
          serviceType: 'Outstation Cab Rental',
          travelDate: '',
          pickupLocation: 'Bhubaneswar',
          message: '',
        });
        setTimeout(() => setSubmitted(false), 8000);
      } else {
        setErrorMessage('Failed to submit enquiry. Please call us directly at +91 98611 17168.');
      }
    } catch (_) {
      setErrorMessage('Connection error. Please call our 24/7 hotline directly.');
    } finally {
      setSubmitting(false);
    }
  };

  const BRANCH_OFFICES = [
    {
      city: 'Bhubaneswar (Headquarters)',
      type: 'Central Dispatch Hub & Fleet Command',
      address: 'Plot No. 124, Saheed Nagar / Master Canteen Square, Bhubaneswar, Odisha 751007',
      landmark: 'Near Master Canteen Railway Station Circle',
      phone: '+91 98611 17168 / +91 94371 00001',
      email: 'info@shibanitravels.com',
      hours: '24 Hours / 7 Days a Week (Dispatch Active)',
    },
    {
      city: 'BBI Airport Desk (Bhubaneswar)',
      type: 'Terminal Arrival & VIP Meet Desk',
      address: 'Biju Patnaik International Airport, Terminal 1 & 2 Arrival Lounge, Airport Road, Bhubaneswar 751020',
      landmark: 'Gate 2 Passenger Pickup Zone',
      phone: '+91 98611 17168',
      email: 'airport@shibanitravels.com',
      hours: '5:00 AM – 11:30 PM (Flight Aligned)',
    },
    {
      city: 'Puri Jagannath Dham',
      type: 'Pilgrimage & Heritage Operations Hub',
      address: 'VIP Road, Near Puri Railway Station & Grand Road Junction, Puri, Odisha 752001',
      landmark: '5 Minutes from Shree Jagannath Temple',
      phone: '+91 98611 17168',
      email: 'puri@shibanitravels.com',
      hours: '6:00 AM – 10:00 PM Daily',
    },
    {
      city: 'Cuttack Commercial Branch',
      type: 'Corporate & Millennium City Logistics',
      address: 'Badambadi Bus Stand Road, Link Road Square, Cuttack, Odisha 753012',
      landmark: 'Near Badambadi Central Junction',
      phone: '+91 98611 17168',
      email: 'cuttack@shibanitravels.com',
      hours: '8:00 AM – 9:00 PM Daily',
    },
  ];

  return (
    <div className="bg-[#FAFDFB] text-slate-800 font-sans min-h-screen">
      
      {/* ── 1. PAGE HERO BANNER ── */}
      <div className="relative pt-[116px] pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-[#00381B] via-[#004D26] to-[#00381B] text-white overflow-hidden text-center">
        {/* Background Overlay */}
        <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
          <img
            src="/banners/travel_fleet.png"
            alt="Shibani Travels Contact"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="max-w-5xl mx-auto relative z-10">
          {/* Breadcrumb */}
          <div className="flex items-center justify-center gap-2 text-xs font-semibold text-green-100 bg-white/10 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/20 w-max mx-auto mb-5 shadow-sm">
            <a href="/" className="flex items-center gap-1 hover:text-white transition-colors">
              <Home className="w-3.5 h-3.5" /> Home
            </a>
            <ChevronRight className="w-3 h-3 text-white/50" />
            <span className="text-amber-300 font-bold">Contact Us</span>
          </div>

          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-[10px] font-black uppercase tracking-widest text-[#86EFAC] bg-white/10 border border-white/20 mb-3">
            <Sparkles className="w-3.5 h-3.5" /> 28+ Years in Business • 24/7 Dedicated Support
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight mb-4">
            Connect With <span className="text-green-300">Shibani</span> <span className="text-amber-400">Travel Desk</span>
          </h1>

          <p className="text-green-100/90 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed font-medium mb-6">
            Get instant assistance for taxi bookings, curated tour packages, luxury wedding convoys, or corporate travel across Odisha. We confirm reservations within 15 minutes.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-xs font-bold">
            {['15-Min Guaranteed Quote', '24/7 Live Dispatch Desk', 'Zero Advance Booking Available', '80+ GPS-Enabled Fleet'].map((item, idx) => (
              <span key={idx} className="bg-white/15 px-3 py-1.5 rounded-full border border-white/20 text-white flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-amber-300" />
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ── 2. QUICK ASSISTANCE CARDS ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 -mt-8 relative z-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          <a
            href="tel:+919861117168"
            className="bg-white rounded-2xl p-5 border border-slate-100 shadow-lg hover:shadow-xl transition-all group flex items-start gap-4 text-left cursor-pointer"
          >
            <div className="w-12 h-12 rounded-xl bg-green-100 text-[#006837] flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
              <PhoneCall className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block mb-0.5">24/7 Booking Hotline</span>
              <p className="text-sm font-black text-slate-900 leading-tight group-hover:text-[#006837] transition-colors">+91 98611 17168</p>
              <p className="text-[11px] text-slate-500 font-medium mt-1">Instant telephone cab dispatch</p>
            </div>
          </a>

          <a
            href="https://wa.me/919861117168"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white rounded-2xl p-5 border border-slate-100 shadow-lg hover:shadow-xl transition-all group flex items-start gap-4 text-left cursor-pointer"
          >
            <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
              <MessageSquare className="w-6 h-6 fill-current" />
            </div>
            <div>
              <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block mb-0.5">WhatsApp Quick Desk</span>
              <p className="text-sm font-black text-slate-900 leading-tight group-hover:text-emerald-600 transition-colors">+91 98611 17168</p>
              <p className="text-[11px] text-slate-500 font-medium mt-1">Chat for custom quotes in 5 min</p>
            </div>
          </a>

          <a
            href="mailto:info@shibanitravels.com"
            className="bg-white rounded-2xl p-5 border border-slate-100 shadow-lg hover:shadow-xl transition-all group flex items-start gap-4 text-left cursor-pointer"
          >
            <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
              <Mail className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block mb-0.5">Official E-Mail</span>
              <p className="text-sm font-black text-slate-900 leading-tight group-hover:text-blue-600 transition-colors">info@shibanitravels.com</p>
              <p className="text-[11px] text-slate-500 font-medium mt-1">Corporate contracts &amp; itineraries</p>
            </div>
          </a>

          <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-lg flex items-start gap-4 text-left">
            <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center shrink-0">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block mb-0.5">Operating Hours</span>
              <p className="text-sm font-black text-slate-900 leading-tight">24 Hours / 365 Days</p>
              <p className="text-[11px] text-slate-500 font-medium mt-1">Live highway fleet support</p>
            </div>
          </div>

        </div>
      </div>

      {/* ── 3. MAIN FORM & OPERATIONAL HUBS GRID ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Form (7 cols) */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-10 border border-slate-100 shadow-xl text-left">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-6 h-0.5 bg-[#006837]" />
              <span className="text-xs font-bold uppercase tracking-wider text-[#006837]">Direct Enquiry Desk</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mb-2">
              Send an Enquiry or Booking Request
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 font-medium mb-6">
              Fill in your trip details. Our travel managers will prepare a customized quote and itinerary for you.
            </p>

            {submitted && (
              <div className="mb-6 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs sm:text-sm flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold">Thank You! Your Enquiry Has Been Successfully Received.</p>
                  <p className="text-xs text-emerald-700 mt-0.5">Our travel operations desk will call/WhatsApp you within 15 minutes with vehicle availability and best rates.</p>
                </div>
              </div>
            )}

            {errorMessage && (
              <div className="mb-6 p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. Ramesh Mohapatra"
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:border-[#006837] focus:bg-white focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Mobile Number (WhatsApp) *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="e.g. 9861117168"
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:border-[#006837] focus:bg-white focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="e.g. ramesh@example.com"
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:border-[#006837] focus:bg-white focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Service Required
                  </label>
                  <select
                    name="serviceType"
                    value={formData.serviceType}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:border-[#006837] focus:bg-white focus:outline-none transition-colors cursor-pointer"
                  >
                    <option value="Outstation Cab Rental">Outstation Cab Rental (Innova / Swift)</option>
                    <option value="Odisha Tour Package">Curated Odisha Tour Package</option>
                    <option value="Airport Pickup / Drop">BBI Airport Pickup / Drop</option>
                    <option value="Force Urbania / Tempo Group">Force Urbania / Tempo Group Travel</option>
                    <option value="Luxury Wedding Car Convoy">Luxury Wedding Car Convoy (Mercedes/Audi)</option>
                    <option value="Corporate / Bus Rental">Volvo Coach / Corporate Transit</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Pickup Location / City
                  </label>
                  <input
                    type="text"
                    name="pickupLocation"
                    value={formData.pickupLocation}
                    onChange={handleChange}
                    placeholder="e.g. Bhubaneswar Airport, Puri, Cuttack"
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:border-[#006837] focus:bg-white focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Tentative Travel Date
                  </label>
                  <input
                    type="date"
                    name="travelDate"
                    value={formData.travelDate}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:border-[#006837] focus:bg-white focus:outline-none transition-colors cursor-pointer"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Trip Details &amp; Message
                </label>
                <textarea
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us about the number of passengers, preferred destinations (e.g. Puri, Konark, Chilika), vehicle preferences, or custom requirements..."
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:border-[#006837] focus:bg-white focus:outline-none transition-colors leading-relaxed"
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full py-4 rounded-xl bg-[#006837] hover:bg-[#008746] text-white font-black text-sm uppercase tracking-wider shadow-lg hover:shadow-xl transition-all cursor-pointer flex items-center justify-center gap-2 active:scale-98 disabled:opacity-50"
              >
                {submitting ? (
                  <span>Submitting Enquiry...</span>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Send Message &amp; Request Callback</span>
                  </>
                )}
              </button>

              <p className="text-[11px] text-slate-400 text-center font-medium">
                🔒 We respect your privacy. No spam. You will only receive your itinerary quote and verification call.
              </p>
            </form>
          </div>

          {/* Right: Offices & Operational Hubs (5 cols) */}
          <div className="lg:col-span-5 space-y-4 text-left">
            <div className="flex items-center gap-2 mb-1">
              <Building2 className="w-4 h-4 text-[#006837]" />
              <span className="text-xs font-bold uppercase tracking-wider text-[#006837]">Our Regional Offices</span>
            </div>
            <h3 className="text-2xl font-black text-slate-900">
              Where to Find Us Across Odisha
            </h3>
            <p className="text-xs text-slate-500 font-medium mb-4">
              Visit our offices or coordinate in person with our station managers:
            </p>

            <div className="space-y-4">
              {BRANCH_OFFICES.map((branch, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center justify-between mb-1.5 flex-wrap gap-1">
                    <h4 className="text-sm font-black text-slate-900">{branch.city}</h4>
                    <span className="text-[10px] font-bold text-[#006837] bg-green-50 px-2 py-0.5 rounded-full border border-green-200">
                      {branch.type}
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 font-medium leading-relaxed mb-2 flex items-start gap-2">
                    <MapPin className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                    <span>{branch.address}</span>
                  </p>

                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] font-bold text-slate-700 flex-wrap gap-2">
                    <a href="tel:+919861117168" className="hover:text-[#006837] transition-colors flex items-center gap-1">
                      <Phone className="w-3 h-3 text-[#006837]" />
                      <span>{branch.phone}</span>
                    </a>
                    <span className="text-slate-400 font-normal">{branch.hours}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Guarantees Box */}
            <div className="p-5 rounded-2xl bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200/80 text-left">
              <h5 className="text-xs font-black uppercase tracking-wider text-amber-900 mb-2 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-amber-700" />
                The Shibani Service Guarantee
              </h5>
              <ul className="text-xs text-amber-900/85 space-y-1.5 font-medium">
                <li>• 100% Fixed Fares with driver allowance and tolls declared upfront.</li>
                <li>• AC always functional; fresh bottled water provided on outstation trips.</li>
                <li>• Chauffeur arrives at your doorstep 15 minutes before pickup.</li>
              </ul>
            </div>

          </div>

        </div>
      </section>

    </div>
  );
}

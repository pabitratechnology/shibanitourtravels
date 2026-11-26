import React, { useState, useEffect } from 'react';
import { Vehicle, Offer } from '../types.js';
import {
  Calendar, MapPin, Users, Check,
  X, ShieldCheck, Sparkles, Phone, Mail, User, Clock,
  ArrowRight
} from 'lucide-react';
import { ALL_ODISHA_LOCATIONS, POPULAR_QUICK_LOCATIONS } from '../data/allOdishaLocations.js';

interface BookingFormProps {
  initialVehicle?: Vehicle | null;
  onClose: () => void;
  onSuccess: (bookingId: string) => void;
  initialPickup?: string;
  initialDrop?: string;
  initialDate?: string;
  initialJourneyType?: 'Local' | 'Outstation' | 'One Way' | 'Round Trip' | 'Airport Transfer';
  initialName?: string;
  initialPhone?: string;
  initialEmail?: string;
}

export default function BookingForm({
  initialVehicle,
  onClose,
  onSuccess,
  initialPickup = '',
  initialDrop = '',
  initialDate = '',
  initialJourneyType = 'Outstation',
  initialName = '',
  initialPhone = '',
  initialEmail = '',
}: BookingFormProps) {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [offers, setOffers] = useState<Offer[]>([]);

  // Simple Guest Details
  const [customerName, setCustomerName] = useState(initialName);
  const [customerPhone, setCustomerPhone] = useState(initialPhone);
  const [customerEmail, setCustomerEmail] = useState(initialEmail);

  // Tour / Trip Details
  const [journeyType, setJourneyType] = useState<'Local' | 'Outstation' | 'One Way' | 'Round Trip' | 'Airport Transfer'>(initialJourneyType);
  const [pickup, setPickup] = useState(initialPickup || 'Bhubaneswar, Odisha');
  const [drop, setDrop] = useState(initialDrop || 'Puri Jagannath Temple');
  const [pickupDate, setPickupDate] = useState(() => {
    if (initialDate) return initialDate;
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  });
  const [pickupTime, setPickupTime] = useState('08:00 AM');
  const [specialRequirement, setSpecialRequirement] = useState('');

  // Vehicle Selection
  const [selectedVehicleId, setSelectedVehicleId] = useState(initialVehicle?.id || 'v-13');
  const [couponCode, setCouponCode] = useState('SHIBANI500');
  const [discountApplied, setDiscountApplied] = useState(true);

  // Dropdown visibility
  const [pickupDropdownOpen, setPickupDropdownOpen] = useState(false);
  const [dropDropdownOpen, setDropDropdownOpen] = useState(false);

  // Submission State
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/vehicles')
      .then((res) => res.json())
      .then((data: Vehicle[]) => {
        setVehicles(data);
        if (initialVehicle) {
          setSelectedVehicleId(initialVehicle.id);
        } else if (data.length > 0 && !selectedVehicleId) {
          setSelectedVehicleId(data[0].id);
        }
      })
      .catch((err) => console.error('Error fetching vehicles:', err));

    fetch('/api/offers')
      .then((res) => res.json())
      .then((data: Offer[]) => setOffers(data))
      .catch((err) => console.error('Error fetching offers:', err));
  }, [initialVehicle, selectedVehicleId]);

  const selectedVehicle = vehicles.find((v) => v.id === selectedVehicleId) || vehicles[0];

  // Calculate Fare
  const baseRate = selectedVehicle?.pricePerDay || 3500;
  const discountAmount = discountApplied ? 500 : 0;
  const estimatedFare = Math.max(baseRate - discountAmount, 1000);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim() || !customerPhone.trim()) {
      setErrorMessage('Please enter your full name and contact phone number.');
      return;
    }

    setSubmitting(true);
    setErrorMessage(null);

    const bookingPayload = {
      customerName: customerName.trim(),
      customerEmail: customerEmail.trim() || 'guest@shibanitravels.com',
      customerPhone: customerPhone.trim(),
      pickupLocation: pickup.trim(),
      dropLocation: drop.trim(),
      journeyType,
      pickupDate,
      pickupTime,
      vehicleId: selectedVehicle?.id || 'v-13',
      vehicleName: selectedVehicle?.name || 'Maruti Swift Dzire',
      vehicleCategory: selectedVehicle?.category || 'Sedan',
      passengers: selectedVehicle?.capacity || 4,
      luggage: selectedVehicle?.luggage || 2,
      specialRequirement: specialRequirement.trim() || undefined,
      couponCode: discountApplied ? couponCode : undefined,
      discountAmount,
      totalFare: estimatedFare,
      paymentOption: 'Pay to Driver Directly',
      paymentStatus: 'Pending',
      bookingStatus: 'Confirmed',
    };

    fetch('/api/bookings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(bookingPayload),
    })
      .then((res) => {
        if (!res.ok) throw new Error('Booking submission failed');
        return res.json();
      })
      .then((data) => {
        setSubmitting(false);
        onSuccess(data.id);
      })
      .catch((err) => {
        console.error('Reservation failure:', err);
        setErrorMessage('Could not transmit reservation. Please retry or contact Helpline: +91 9861117168.');
        setSubmitting(false);
      });
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      {/* Modal Container: Simple, Spacious, High-Converting */}
      <div className="bg-white rounded-3xl sm:rounded-[32px] w-full max-w-3xl overflow-hidden shadow-2xl border border-slate-100 max-h-[94vh] flex flex-col relative text-left">
        
        {/* Header Strip */}
        <div className="px-6 py-4 sm:px-8 sm:py-5 border-b border-slate-100 flex items-center justify-between bg-gradient-to-r from-[#004D26] via-[#006837] to-[#004D26] text-white">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/15 border border-white/25 flex items-center justify-center shrink-0">
              <Sparkles className="w-5 h-5 text-amber-300" />
            </div>
            <div>
              <h3 className="text-base sm:text-xl font-black text-white leading-tight">
                Quick Tour &amp; Cab Reservation
              </h3>
              <p className="text-xs text-white/80 font-medium mt-0.5">
                Simple 1-step booking • Instant WhatsApp confirmation • Zero advance fee
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer shrink-0"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 sm:p-8 overflow-y-auto flex-1 space-y-6 bg-slate-50/50">
          
          {errorMessage && (
            <div className="p-3 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-xs font-bold">
              {errorMessage}
            </div>
          )}

          {/* ── STEP 1: GUEST DETAILS (Name, Phone, Email) ── */}
          <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
              <User className="w-4 h-4 text-[#006837]" />
              <h4 className="text-xs font-black uppercase tracking-wider text-slate-800">
                1. Guest Contact Information
              </h4>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
              {/* Full Name */}
              <div>
                <label className="block text-[11px] font-black uppercase tracking-wide text-slate-700 mb-1">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="e.g. Rajesh Mohapatra"
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm font-bold text-slate-900 bg-slate-50 focus:bg-white focus:border-[#006837] focus:outline-none transition-all"
                  />
                </div>
              </div>

              {/* Phone / WhatsApp */}
              <div>
                <label className="block text-[11px] font-black uppercase tracking-wide text-slate-700 mb-1">
                  Phone / WhatsApp <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="tel"
                    required
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    placeholder="e.g. +91 98611 17168"
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm font-bold text-slate-900 bg-slate-50 focus:bg-white focus:border-[#006837] focus:outline-none transition-all"
                  />
                </div>
              </div>

              {/* Email Address */}
              <div>
                <label className="block text-[11px] font-black uppercase tracking-wide text-slate-700 mb-1">
                  Email Address (Optional)
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    value={customerEmail}
                    onChange={(e) => setCustomerEmail(e.target.value)}
                    placeholder="e.g. name@gmail.com"
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm font-bold text-slate-900 bg-slate-50 focus:bg-white focus:border-[#006837] focus:outline-none transition-all"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* ── STEP 2: TOUR ROUTE (From -> To with All Odisha Locations) ── */}
          <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100 flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#006837]" />
                <h4 className="text-xs font-black uppercase tracking-wider text-slate-800">
                  2. Tour Route (From &amp; To)
                </h4>
              </div>

              {/* Trip Type Pills */}
              <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
                {(['Outstation', 'Local', 'One Way', 'Airport Transfer'] as const).map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => {
                      setJourneyType(t);
                      if (t === 'Airport Transfer') setPickup('Bhubaneswar Airport (BBI)');
                      if (t === 'Local') setDrop('Bhubaneswar City Tour');
                    }}
                    className={`px-2.5 py-1 rounded-lg text-[10.5px] font-bold transition-all cursor-pointer ${
                      journeyType === t
                        ? 'bg-[#006837] text-white shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* Pickup Location (From) */}
              <div className="relative">
                <label className="block text-[11px] font-black uppercase tracking-wide text-slate-700 mb-1">
                  Pickup From (Starting Location) <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-emerald-600 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={pickup}
                    onChange={(e) => setPickup(e.target.value)}
                    onFocus={() => setPickupDropdownOpen(true)}
                    placeholder="Enter pickup address or choose below"
                    className="w-full pl-9 pr-8 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm font-bold text-slate-900 bg-slate-50 focus:bg-white focus:border-[#006837] focus:outline-none transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setPickupDropdownOpen(!pickupDropdownOpen)}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 text-xs px-1"
                  >
                    ▾
                  </button>

                  {/* Dropdown with all locations */}
                  {pickupDropdownOpen && (
                    <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-slate-200 rounded-2xl shadow-xl p-2 z-30 max-h-56 overflow-y-auto">
                      <div className="text-[10px] uppercase font-bold text-slate-400 px-2 py-1">
                        Select Starting Point:
                      </div>
                      {ALL_ODISHA_LOCATIONS.map((loc) => (
                        <button
                          key={loc.name}
                          type="button"
                          onClick={() => {
                            setPickup(loc.name);
                            setPickupDropdownOpen(false);
                          }}
                          className="w-full text-left px-3 py-1.5 rounded-lg hover:bg-green-50 text-xs font-semibold text-slate-800 flex items-center justify-between group cursor-pointer"
                        >
                          <span>{loc.name}</span>
                          <span className="text-[9.5px] text-slate-400 group-hover:text-[#006837]">
                            {loc.badge || loc.district}
                          </span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Destination (To / Tour) */}
              <div className="relative">
                <label className="block text-[11px] font-black uppercase tracking-wide text-slate-700 mb-1">
                  Destination / Tour To <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-amber-600 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={drop}
                    onChange={(e) => setDrop(e.target.value)}
                    onFocus={() => setDropDropdownOpen(true)}
                    placeholder="Enter destination or tour spot"
                    className="w-full pl-9 pr-8 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm font-bold text-slate-900 bg-slate-50 focus:bg-white focus:border-[#006837] focus:outline-none transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setDropDropdownOpen(!dropDropdownOpen)}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 text-xs px-1"
                  >
                    ▾
                  </button>

                  {/* Dropdown with all locations */}
                  {dropDropdownOpen && (
                    <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-slate-200 rounded-2xl shadow-xl p-2 z-30 max-h-56 overflow-y-auto">
                      <div className="text-[10px] uppercase font-bold text-slate-400 px-2 py-1">
                        Select Destination / Tour Spot:
                      </div>
                      {ALL_ODISHA_LOCATIONS.map((loc) => (
                        <button
                          key={loc.name}
                          type="button"
                          onClick={() => {
                            setDrop(loc.name);
                            setDropDropdownOpen(false);
                          }}
                          className="w-full text-left px-3 py-1.5 rounded-lg hover:bg-green-50 text-xs font-semibold text-slate-800 flex items-center justify-between group cursor-pointer"
                        >
                          <span>{loc.name}</span>
                          <span className="text-[9.5px] text-slate-400 group-hover:text-[#006837]">
                            {loc.badge || loc.district}
                          </span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

            </div>

            {/* Quick Popular Destination Chips */}
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1.5">
                Popular Tour Spots in Odisha (Click to Select):
              </span>
              <div className="flex flex-wrap gap-1.5">
                {POPULAR_QUICK_LOCATIONS.slice(2, 8).map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => setDrop(p)}
                    className="text-[10.5px] font-bold px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-green-100 hover:text-[#006837] text-slate-700 border border-slate-200/80 transition-colors cursor-pointer"
                  >
                    + {p.split('(')[0].trim()}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* ── STEP 3: DATE, TIME & VEHICLE SELECTION ── */}
          <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
              <Calendar className="w-4 h-4 text-[#006837]" />
              <h4 className="text-xs font-black uppercase tracking-wider text-slate-800">
                3. Date, Time &amp; Preferred Vehicle
              </h4>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
              {/* Date */}
              <div>
                <label className="block text-[11px] font-black uppercase tracking-wide text-slate-700 mb-1">
                  Tour Date <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Calendar className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="date"
                    required
                    value={pickupDate}
                    onChange={(e) => setPickupDate(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm font-bold text-slate-900 bg-slate-50 focus:bg-white focus:border-[#006837] focus:outline-none transition-all cursor-pointer"
                  />
                </div>
              </div>

              {/* Time */}
              <div>
                <label className="block text-[11px] font-black uppercase tracking-wide text-slate-700 mb-1">
                  Pickup Time <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Clock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={pickupTime}
                    onChange={(e) => setPickupTime(e.target.value)}
                    placeholder="08:00 AM"
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm font-bold text-slate-900 bg-slate-50 focus:bg-white focus:border-[#006837] focus:outline-none transition-all"
                  />
                </div>
              </div>

              {/* Vehicle Preference */}
              <div>
                <label className="block text-[11px] font-black uppercase tracking-wide text-slate-700 mb-1">
                  Select Vehicle Model
                </label>
                <select
                  value={selectedVehicleId}
                  onChange={(e) => setSelectedVehicleId(e.target.value)}
                  className="w-full py-2.5 px-3 rounded-xl border border-slate-200 text-xs sm:text-sm font-bold text-slate-900 bg-slate-50 focus:bg-white focus:border-[#006837] focus:outline-none transition-all cursor-pointer"
                >
                  {vehicles.map((v) => (
                    <option key={v.id} value={v.id}>
                      {v.name} ({v.capacity} Seater) — ₹{v.pricePerKm}/km
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Special Request */}
            <div>
              <label className="block text-[11px] font-black uppercase tracking-wide text-slate-700 mb-1">
                Any Special Notes / Instructions (Optional)
              </label>
              <input
                type="text"
                value={specialRequirement}
                onChange={(e) => setSpecialRequirement(e.target.value)}
                placeholder="e.g. Flight AI-472 arriving at 9:30 AM, need child seat, English speaking driver"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-800 bg-slate-50 focus:bg-white focus:border-[#006837] focus:outline-none transition-all"
              />
            </div>
          </div>

          {/* ── SUMMARY STRIP & INSTANT SUBMISSION ── */}
          <div className="bg-gradient-to-r from-emerald-50 via-green-50 to-amber-50 p-5 rounded-2xl border border-emerald-200/80 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-bold text-slate-600">Selected Vehicle:</span>
                <span className="text-sm font-black text-[#006837]">{selectedVehicle?.name}</span>
                <span className="text-[10px] font-black bg-white px-2 py-0.5 rounded border border-green-200 text-[#006837]">
                  ₹{selectedVehicle?.pricePerKm}/km
                </span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Zero advance required. Pay chauffeur directly upon completion.</span>
              </div>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <button
                type="submit"
                disabled={submitting}
                className="w-full sm:w-auto px-7 py-3 rounded-2xl bg-[#006837] hover:bg-[#004D26] text-white font-black text-xs sm:text-sm uppercase tracking-wider shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
              >
                <span>{submitting ? 'Confirming...' : 'Confirm Reservation'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Guarantee Pills */}
          <div className="grid grid-cols-3 gap-2 text-center pt-1 text-slate-600">
            <div className="flex items-center justify-center gap-1.5 text-[11px] font-bold">
              <Check className="w-3.5 h-3.5 text-[#006837]" />
              <span>Instant Confirmation</span>
            </div>
            <div className="flex items-center justify-center gap-1.5 text-[11px] font-bold">
              <Check className="w-3.5 h-3.5 text-[#006837]" />
              <span>Free Cancellation</span>
            </div>
            <div className="flex items-center justify-center gap-1.5 text-[11px] font-bold">
              <Check className="w-3.5 h-3.5 text-[#006837]" />
              <span>Clean AC Cabs</span>
            </div>
          </div>

        </form>
      </div>
    </div>
  );
}

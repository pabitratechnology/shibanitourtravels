import React, { useState } from 'react';
import { Compass, Sparkles, MapPin, Calendar, Users, HelpCircle, Loader, Shield, Landmark, ChevronRight, Home } from 'lucide-react';
import { motion } from 'motion/react';

export default function AiEstimator() {
  const [pickup, setPickup] = useState('Bhubaneswar');
  const [destination, setDestination] = useState('Puri & Konark Sun Temple');
  const [duration, setDuration] = useState('3 Days / 2 Nights');
  const [passengers, setPassengers] = useState(4);
  const [vehicleCategory, setVehicleCategory] = useState('Innova Crysta');
  const [specialRequest, setSpecialRequest] = useState('');
  
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any | null>(null);

  const handleEstimate = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    fetch('/api/ai/estimate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        pickup,
        destination,
        duration,
        passengers,
        vehicleCategory,
        specialRequest
      })
    })
      .then((res) => res.json())
      .then((data) => {
        setResult(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error generating AI estimate:', err);
        setLoading(false);
        alert('Could not generate estimation. Please try again.');
      });
  };

  const recommendedDestinations = [
    'Puri Jagannath Temple & Marine Drive',
    'Konark Sun Temple Architectural Wonders',
    'Chilika Lake Satapada Irrawaddy Dolphins',
    'Bhitarkanika Wildlife Mangrove & Crocodiles',
    'Gopalpur-on-Sea Colonial Beach Getaway',
    'Cuttack Maritime Museum & Silver Filigree heritage'
  ];

  return (
    <div className="bg-gradient-to-b from-[#1a110e] via-[#241713] to-[#0f0a08] min-h-screen text-[#fcfaf2]">
      
      {/* ══ FULL SCREEN ADVANCED 3D TOURS HERO SHOWCASE ══ */}
      <div className="relative min-h-[75vh] flex flex-col justify-between pt-[118px] pb-12 overflow-hidden text-white bg-[#1a110e]">
        <div className="absolute inset-0 z-0">
          <img
            src="/banners/konark_temple.png"
            alt="Odisha Tour Packages"
            className="w-full h-full object-cover"
            style={{ filter: 'brightness(0.26) saturate(1.2)' }}
          />
          <div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(135deg, rgba(26,17,14,0.96) 0%, rgba(36,23,19,0.9) 60%, rgba(15,10,8,0.96) 100%)',
            }}
          />
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[450px] rounded-full pointer-events-none opacity-50"
            style={{ background: 'radial-gradient(circle, rgba(226,88,34,0.3) 0%, transparent 70%)', filter: 'blur(90px)' }} />
          <div className="absolute bottom-0 left-0 right-0 h-[3px]"
            style={{ background: 'linear-gradient(to right, transparent, #E25822 30%, #E8C97A 50%, #E25822 70%, transparent)' }} />
        </div>

        {/* Top Breadcrumb Navigation */}
        <div className="max-w-7xl mx-auto w-full relative z-10 px-4 sm:px-6 lg:px-8 pt-2 pb-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-300 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/15 shadow-lg">
              <button onClick={() => window.location.href = '/'} className="flex items-center gap-1.5 hover:text-amber-400 transition-colors">
                <Home className="w-3.5 h-3.5 text-[#52B788]" /> Home
              </button>
              <ChevronRight className="w-3.5 h-3.5 text-white/40" />
              <span className="text-amber-400 font-bold">Odisha Tour Packages</span>
            </div>

            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest text-[#E8C97A] bg-amber-400/10 backdrop-blur-md border border-amber-400/30 shadow-lg">
              <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
              Guided Regional Tours
            </div>
          </div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center my-auto px-4">
          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight mb-4 drop-shadow-xl"
          >
            Curated Odisha Tours &{' '}
            <span className="bg-gradient-to-r from-amber-200 via-amber-400 to-amber-500 bg-clip-text text-transparent italic">
              AI Trip Estimator
            </span>
          </motion.h1>
          <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed font-medium">
            Instantly calculate fair-fare travel estimates for Puri, Konark, Chilika, and Bhitarkanika tailored with driver allocations and zero hidden fees.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

        {/* Dynamic grid split */}
        <div className="grid lg:grid-cols-12 gap-12 items-start">
          
          {/* Input Form Column */}
          <div className="lg:col-span-5 bg-gradient-to-b from-[#2b1b17] to-[#1e120f] border border-yellow-500/10 rounded-2xl p-6 sm:p-8 shadow-2xl relative">
            <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/5 rounded-full blur-3xl" />
            
            <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2 pb-3 border-b border-yellow-500/10">
              <Sparkles className="w-5 h-5 text-purple-400" />
              Customize Your Plan
            </h3>

            <form onSubmit={handleEstimate} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-stone-400 mb-1.5">Where should we pick you up?</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3.5 w-4 h-4 text-purple-400" />
                  <input
                    type="text"
                    required
                    value={pickup}
                    onChange={(e) => setPickup(e.target.value)}
                    className="w-full bg-[#1e120f] border border-yellow-500/10 rounded-xl pl-9 pr-4 py-3 text-xs focus:border-purple-500 outline-none text-[#fcfaf2]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-400 mb-1.5">Tourist Spots to Explore</label>
                <div className="relative">
                  <Landmark className="absolute left-3 top-3.5 w-4 h-4 text-purple-400" />
                  <input
                    type="text"
                    required
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    className="w-full bg-[#1e120f] border border-yellow-500/10 rounded-xl pl-9 pr-4 py-3 text-xs focus:border-purple-500 outline-none text-[#fcfaf2]"
                  />
                </div>
                {/* Suggestions badges */}
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {recommendedDestinations.slice(0, 3).map((dest, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setDestination(dest)}
                      className="text-[9px] bg-yellow-950/20 text-yellow-500/90 border border-yellow-500/5 px-2 py-0.5 rounded hover:border-yellow-500/25 transition-colors"
                    >
                      + {dest.split(' ')[0]}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-400 mb-1.5">Duration</label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-3.5 w-4 h-4 text-purple-400" />
                    <input
                      type="text"
                      placeholder="e.g. 3 Days"
                      required
                      value={duration}
                      onChange={(e) => setDuration(e.target.value)}
                      className="w-full bg-[#1e120f] border border-yellow-500/10 rounded-xl pl-9 pr-4 py-3 text-xs focus:border-purple-500 outline-none text-[#fcfaf2]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-400 mb-1.5">Passengers</label>
                  <div className="relative">
                    <Users className="absolute left-3 top-3.5 w-4 h-4 text-purple-400" />
                    <input
                      type="number"
                      min={1}
                      required
                      value={passengers}
                      onChange={(e) => setPassengers(parseInt(e.target.value) || 1)}
                      className="w-full bg-[#1e120f] border border-yellow-500/10 rounded-xl pl-9 pr-4 py-3 text-xs focus:border-purple-500 outline-none text-[#fcfaf2]"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-400 mb-1.5">Preferred Fleet Style</label>
                <select
                  value={vehicleCategory}
                  onChange={(e) => setVehicleCategory(e.target.value)}
                  className="w-full bg-[#1e120f] border border-yellow-500/10 rounded-xl px-4 py-3 text-xs focus:border-purple-500 outline-none text-[#fcfaf2]"
                >
                  <option value="Innova Crysta">Toyota Innova Crysta (Luxury 7 Seater)</option>
                  <option value="Force Urbania Luxury">Force Urbania (Luxury 17 Seater)</option>
                  <option value="Mercedes-Benz S-Class">Mercedes-Benz S-Class (VIP Chauffeur)</option>
                  <option value="Tempo Traveller">Tempo Traveller Elite (12 Seater)</option>
                  <option value="Volvo Sleeper Bus">Volvo AC Sleeper Coach (Group Tour)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-400 mb-1.5">Special Interests (Optional)</label>
                <textarea
                  placeholder="e.g. Focus on ancient history, beach relaxing, photography, authentic Odia cuisine spots..."
                  value={specialRequest}
                  onChange={(e) => setSpecialRequest(e.target.value)}
                  className="w-full h-20 bg-[#1e120f] border border-yellow-500/10 rounded-xl px-4 py-2.5 text-xs focus:border-purple-500 outline-none resize-none text-stone-300"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full mt-4 py-3.5 bg-gradient-to-r from-purple-600 via-amber-500 to-amber-600 text-stone-950 font-black text-xs tracking-widest uppercase rounded-xl transition-all shadow-lg hover:brightness-110 active:scale-98 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader className="w-4 h-4 animate-spin text-stone-950" />
                    AI is designing tour...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-stone-950" />
                    Generate AI Estimation
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Results Column */}
          <div className="lg:col-span-7 flex flex-col h-full min-h-[480px]">
            {loading ? (
              <div className="flex-1 bg-[#2b1b17]/20 border border-purple-500/15 rounded-2xl flex flex-col items-center justify-center p-8 text-center h-full animate-pulse">
                <Compass className="w-12 h-12 text-purple-400 animate-spin-slow mb-4" />
                <h4 className="text-lg font-bold text-white">Consulting Odisha Travel AI Specialist...</h4>
                <p className="text-xs text-stone-400 max-w-xs mt-2 leading-relaxed">
                  Analyzing route distances, optimal temples opening times, scenic coastal roads, and calculating real-time transparent fleet rates.
                </p>
              </div>
            ) : result ? (
              <div className="bg-gradient-to-b from-[#251713] to-[#1a110e] border border-purple-500/20 rounded-2xl p-6 sm:p-8 shadow-2xl space-y-6 animate-fade-in text-left">
                
                {/* Result header */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-yellow-500/10 pb-4 gap-4">
                  <div>
                    <span className="text-[10px] uppercase font-mono tracking-widest text-purple-400">Customized Proposal</span>
                    <h4 className="text-xl font-bold text-white">Your Odisha Adventure Guide</h4>
                  </div>
                  <div className="bg-purple-950/40 border border-purple-500/20 px-4 py-2.5 rounded-xl text-right">
                    <p className="text-[9px] uppercase text-stone-400">ESTIMATED TOUR FARE</p>
                    <p className="text-2xl font-mono font-black text-white">₹{result.estimatedFare.toLocaleString()}</p>
                  </div>
                </div>

                {/* Itinerary content - Render Markdown basically */}
                <div className="prose prose-invert max-w-none text-stone-300 text-xs sm:text-sm space-y-4 leading-relaxed max-h-[350px] overflow-y-auto pr-2 custom-scrollbar">
                  <div className="whitespace-pre-wrap font-sans bg-[#120b09]/50 border border-yellow-500/5 p-5 rounded-xl">
                    {result.itinerary}
                  </div>
                </div>

                {/* Cost breakup & fleet recommendations */}
                <div className="grid md:grid-cols-2 gap-6 pt-4 border-t border-yellow-500/10">
                  
                  {/* Cost list */}
                  <div>
                    <h5 className="text-xs font-bold text-[#c5a059] uppercase tracking-wider mb-2">Estimated Expense Breakup</h5>
                    <div className="space-y-1.5">
                      {result.breakdown?.map((b: any, i: number) => (
                        <div key={i} className="flex justify-between items-center text-xs border-b border-yellow-500/5 pb-1">
                          <span className="text-stone-400">{b.label}</span>
                          <span className="font-mono text-stone-200">₹{b.value.toLocaleString()}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Vehicle recommendation */}
                  <div>
                    <h5 className="text-xs font-bold text-purple-400 uppercase tracking-wider mb-2">Recommended Shibani Vehicles</h5>
                    <div className="space-y-2">
                      {result.recommendedVehicles?.map((v: string, i: number) => (
                        <div key={i} className="flex items-center gap-2 bg-[#2d1b17]/50 border border-purple-500/10 p-2.5 rounded-lg">
                          <Landmark className="w-4 h-4 text-yellow-500 shrink-0" />
                          <span className="text-xs font-semibold text-stone-200">{v}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>

                {/* Trust guarantee banner */}
                <div className="p-3 bg-emerald-950/20 border border-emerald-500/15 rounded-xl flex items-center gap-2.5">
                  <Shield className="w-5 h-5 text-emerald-400 shrink-0" />
                  <p className="text-[10px] sm:text-xs text-stone-300">
                    <strong>Shibani Guarantee:</strong> Fares are purely transparent. Itinerary can be customized 100% on demand. No hidden night-charges.
                  </p>
                </div>

              </div>
            ) : (
              <div className="flex-1 bg-gradient-to-b from-[#2b1b17]/20 to-[#1e120f]/20 border border-yellow-500/10 rounded-2xl flex flex-col items-center justify-center p-8 text-center h-full">
                <Compass className="w-10 h-10 text-stone-600 mb-4 animate-spin-slow" />
                <h4 className="text-base font-bold text-stone-300">Awaiting Custom Travel Criteria</h4>
                <p className="text-xs text-stone-500 max-w-xs mt-1">
                  Adjust pickup, preferred fleet styling, destinations on the left, then click "Generate AI Estimation" to begin.
                </p>
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}

import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { CheckCircle2, Sparkles, Calendar, Smartphone, ShieldCheck, X, Copy, Check } from 'lucide-react';
import confetti from 'canvas-confetti';

interface BookingSuccessModalProps {
  bookingId: string;
  onClose: () => void;
}

export default function BookingSuccessModal({ bookingId, onClose }: BookingSuccessModalProps) {
  
  const triggerConfettiExplosion = () => {
    // School pride theme / custom golden palette
    const colors = ['#eab308', '#E25822', '#fbbf24', '#fcfaf2', '#10b981'];
    
    // Left edge spray
    confetti({
      particleCount: 120,
      angle: 60,
      spread: 70,
      origin: { x: 0, y: 0.8 },
      colors: colors
    });
    
    // Right edge spray
    confetti({
      particleCount: 120,
      angle: 120,
      spread: 70,
      origin: { x: 1, y: 0.8 },
      colors: colors
    });

    // Center burst
    setTimeout(() => {
      confetti({
        particleCount: 80,
        spread: 100,
        origin: { x: 0.5, y: 0.5 },
        colors: colors
      });
    }, 200);
  };

  // Trigger on initial mount
  useEffect(() => {
    triggerConfettiExplosion();
    
    // Gentle follow-up shower
    const timer = setTimeout(() => {
      confetti({
        particleCount: 40,
        spread: 60,
        origin: { x: 0.5, y: 0.3 },
        colors: ['#eab308', '#fbbf24', '#ffffff']
      });
    }, 850);

    return () => clearTimeout(timer);
  }, []);

  const [copied, setCopied] = React.useState(false);
  const handleCopyId = () => {
    navigator.clipboard.writeText(bookingId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#0f0a08]/95 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      
      {/* Background Decorative Sparkle Nodes */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-10 left-10 w-48 h-48 bg-yellow-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl" />
      </div>

      {/* Main Success Container card */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        transition={{ type: 'spring', damping: 25, stiffness: 180 }}
        className="bg-[#0f0b09] border-2 border-yellow-500/30 rounded-3xl w-full max-w-lg overflow-hidden shadow-[0_30px_90px_rgba(0,0,0,0.95)] relative text-center p-6 sm:p-10"
      >
        {/* Top gold visual accent line */}
        <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-yellow-500 to-transparent opacity-80" />

        {/* Floating dismissal button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-stone-500 hover:text-white transition-colors bg-white/5 rounded-full border border-white/5 hover:border-yellow-500/20"
          title="Close Confirmation"
        >
          <X className="w-4.5 h-4.5" />
        </button>

        {/* Animated Checkmark and Circle */}
        <div className="relative mx-auto w-20 h-20 mb-6 flex items-center justify-center">
          <motion.div
            initial={{ scale: 0, rotate: -45 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.1, type: 'spring', stiffness: 200, damping: 15 }}
            className="absolute inset-0 rounded-full bg-emerald-500/10 border-2 border-emerald-500/40 flex items-center justify-center"
          >
            <CheckCircle2 className="w-12 h-12 text-emerald-400 stroke-[1.5]" />
          </motion.div>
          
          {/* Sparkles rotating around checkmark */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 15, ease: 'linear' }}
            className="absolute -inset-2 pointer-events-none"
          >
            <Sparkles className="absolute -top-1 right-2 w-5 h-5 text-yellow-400 animate-pulse" />
            <Sparkles className="absolute -bottom-1 left-2 w-4 h-4 text-[#c5a059] animate-pulse" />
          </motion.div>
        </div>

        {/* Main Hospitality Title */}
        <span className="text-[10px] font-mono tracking-[0.4em] text-yellow-500 font-extrabold block mb-2">
          JOURNEY SECURED SUCCESSFULLY
        </span>
        <h2 className="text-2xl font-black text-white uppercase tracking-wider mb-3">
          Namaskar! Booking Confirmed
        </h2>
        <p className="text-xs text-stone-400 max-w-md mx-auto leading-relaxed mb-8">
          Your luxury transport layout is reserved. Our 24/7 travel desk concierge is aligning your premium vehicle and custom uniforms for your professional chauffeur right now.
        </p>

        {/* Ticket receipt container */}
        <div className="bg-[#150f0d] border border-yellow-500/15 rounded-2xl p-5 mb-8 relative text-left">
          {/* Ticket jagged edges emulation on sides */}
          <div className="absolute top-1/2 -left-2.5 -translate-y-1/2 w-5 h-5 bg-[#0f0a08] border-r border-yellow-500/15 rounded-full" />
          <div className="absolute top-1/2 -right-2.5 -translate-y-1/2 w-5 h-5 bg-[#0f0a08] border-l border-yellow-500/15 rounded-full" />

          <div className="flex justify-between items-center border-b border-white/5 pb-3 mb-3">
            <span className="text-[10px] font-mono text-stone-500 font-bold uppercase tracking-wider">RESERVATION TOKEN ID</span>
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-mono font-black text-yellow-400 tracking-wide select-all bg-yellow-950/40 px-2 py-0.5 rounded border border-yellow-500/10">
                {bookingId}
              </span>
              <button 
                onClick={handleCopyId} 
                className="p-1 hover:bg-white/5 rounded text-stone-400 hover:text-yellow-400 transition-colors"
                title="Copy Token to Clipboard"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex gap-3 items-center">
              <div className="w-8 h-8 rounded-lg bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center text-yellow-500 shrink-0">
                <Calendar className="w-4 h-4" />
              </div>
              <div className="text-xs">
                <p className="text-stone-400 font-bold uppercase text-[9px] tracking-wider leading-none mb-0.5">Assigned Service</p>
                <p className="text-white font-black uppercase">GPS-Tracked Regional Chauffeur</p>
              </div>
            </div>

            <div className="flex gap-3 items-center">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
                <Smartphone className="w-4 h-4" />
              </div>
              <div className="text-xs">
                <p className="text-stone-400 font-bold uppercase text-[9px] tracking-wider leading-none mb-0.5">Real-time SMS Updates</p>
                <p className="text-white font-black uppercase">Chauffeur details arriving via SMS/WhatsApp</p>
              </div>
            </div>

            <div className="flex gap-3 items-center">
              <div className="w-8 h-8 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 shrink-0">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div className="text-xs">
                <p className="text-stone-400 font-bold uppercase text-[9px] tracking-wider leading-none mb-0.5">Safety Guarantee</p>
                <p className="text-white font-black uppercase">ISO-9001 Compliant Verified Safe Travel</p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Button Segment */}
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={triggerConfettiExplosion}
            className="flex-1 py-3 bg-[#1e120f] hover:bg-[#2b1b17] border border-yellow-500/20 hover:border-yellow-500/50 text-yellow-400 text-xs font-black uppercase tracking-widest rounded-xl transition-all flex items-center justify-center gap-1.5 active:scale-95"
          >
            <Sparkles className="w-4 h-4 text-yellow-500 animate-pulse" />
            Shower Confetti
          </button>
          
          <button
            onClick={onClose}
            className="flex-1 py-3 bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-400 hover:to-amber-500 text-stone-950 text-xs font-black uppercase tracking-widest rounded-xl shadow-lg transition-all"
          >
            Acknowledge & Continue
          </button>
        </div>
      </motion.div>

    </div>
  );
}

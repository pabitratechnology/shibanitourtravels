import React from 'react';
import { motion } from 'motion/react';
import { Sparkles } from 'lucide-react';

interface PageHeroProps {
  title: string;
  subtitle: string;
  tag: string;
  backgroundImage?: string;
  stats?: { value: string; label: string }[];
  accentWord?: string;
}

export default function PageHero({
  title,
  subtitle,
  tag,
  backgroundImage,
  stats,
  accentWord,
}: PageHeroProps) {
  const renderTitle = () => {
    if (!accentWord) {
      const words = title.split(' ');
      const mid = Math.floor(words.length / 2);
      return words.map((word, i) =>
        i === mid ? (
          <span key={i} className="text-[#86EFAC] italic font-serif"> {word} </span>
        ) : <span key={i}>{word} </span>
      );
    }
    const parts = title.split(accentWord);
    return parts.map((part, i) => (
      <React.Fragment key={i}>
        {part}
        {i < parts.length - 1 && (
          <span className="text-[#86EFAC] italic font-serif">{accentWord}</span>
        )}
      </React.Fragment>
    ));
  };

  return (
    <div className="relative overflow-hidden flex items-center justify-center pt-[124px] sm:pt-[132px] min-h-[380px] sm:min-h-[420px]">
      {/* Background Layer */}
      <div className="absolute inset-0 z-0">
        {backgroundImage ? (
          <>
            <img
              src={backgroundImage}
              alt={title}
              className="w-full h-full object-cover"
              style={{ filter: 'brightness(0.3) saturate(1.1)' }}
            />
            <div
              className="absolute inset-0"
              style={{
                background: 'linear-gradient(135deg, rgba(0,48,22,0.92) 0%, rgba(0,77,38,0.85) 60%, rgba(1,38,19,0.92) 100%)',
              }}
            />
          </>
        ) : (
          <div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(135deg, #00381B 0%, #005A2F 55%, #004D26 100%)',
            }}
          />
        )}

        {/* Soft atmospheric ambient glow */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(ellipse, rgba(134,239,172,0.15) 0%, transparent 70%)', filter: 'blur(70px)' }}
        />

        {/* Bottom accent divider line */}
        <div
          className="absolute bottom-0 left-0 right-0 h-[3px]"
          style={{
            background: 'linear-gradient(to right, transparent, #006837 30%, #D32F2F 50%, #006837 70%, transparent)',
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 w-full text-center flex flex-col items-center py-12">
        {/* Tag badge */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest text-[#86EFAC] bg-white/10 backdrop-blur-md border border-white/20 mb-4 shadow-sm"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#86EFAC]" />
          {tag}
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.1 }}
          className="text-white mb-3 text-3xl sm:text-5xl font-black tracking-tight leading-tight"
        >
          {renderTitle()}
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.2 }}
          className="text-green-100/90 text-xs sm:text-sm max-w-2xl leading-relaxed font-medium mb-6"
        >
          {subtitle}
        </motion.p>

        {/* Optional Stats */}
        {stats && stats.length > 0 && (
          <div className="flex flex-wrap justify-center gap-4 sm:gap-8 pt-4 border-t border-white/15">
            {stats.map((s, idx) => (
              <div key={idx} className="text-center">
                <span className="text-xl sm:text-2xl font-black text-white block">
                  {s.value}
                </span>
                <span className="text-[10px] sm:text-xs text-green-200/80 font-medium uppercase tracking-wider">
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

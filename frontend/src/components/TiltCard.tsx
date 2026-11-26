import React, { useState, useRef } from 'react';
import { motion } from 'motion/react';

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  maxTilt?: number; // max tilt angle in degrees
  scaleOnHover?: number;
  glowColor?: string;
}

export default function TiltCard({
  children,
  className = '',
  style = {},
  maxTilt = 14,
  scaleOnHover = 1.03,
  glowColor = 'rgba(45, 106, 79, 0.25)',
}: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50, opacity: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = (mouseX / width) * 100;
    const yPct = (mouseY / height) * 100;

    // Calculate rotation (-maxTilt to +maxTilt)
    const rotY = ((mouseX / width) - 0.5) * maxTilt * 2;
    const rotX = -((mouseY / height) - 0.5) * maxTilt * 2;

    setRotateX(rotX);
    setRotateY(rotY);
    setGlarePos({ x: xPct, y: yPct, opacity: 0.35 });
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
    setGlarePos({ x: 50, y: 50, opacity: 0 });
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{
        rotateX,
        rotateY,
        scale: rotateX !== 0 ? scaleOnHover : 1,
      }}
      transition={{
        type: 'spring',
        stiffness: 300,
        damping: 20,
        mass: 0.5,
      }}
      className={`relative overflow-hidden ${className}`}
      style={{
        transformStyle: 'preserve-3d',
        perspective: 1000,
        willChange: 'transform',
        ...style,
      }}
    >
      {/* Dynamic 3D Glare Gloss Overlay */}
      <div
        className="absolute inset-0 pointer-events-none z-30 transition-opacity duration-300 rounded-[inherit]"
        style={{
          background: `radial-gradient(circle at ${glarePos.x}% ${glarePos.y}%, rgba(255, 255, 255, 0.45) 0%, rgba(255, 255, 255, 0) 65%)`,
          opacity: glarePos.opacity,
          mixBlendMode: 'overlay',
        }}
      />

      {/* Dynamic Ambient Neon Radial Glow */}
      <div
        className="absolute -inset-px pointer-events-none z-0 transition-opacity duration-300 rounded-[inherit]"
        style={{
          background: `radial-gradient(circle at ${glarePos.x}% ${glarePos.y}%, ${glowColor} 0%, transparent 70%)`,
          opacity: glarePos.opacity ? 1 : 0,
        }}
      />

      {/* Content wrapper with transform style */}
      <div className="relative z-10 w-full h-full" style={{ transformStyle: 'preserve-3d' }}>
        {children}
      </div>
    </motion.div>
  );
}

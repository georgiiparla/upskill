"use client";

import { useMemo } from 'react';
import { Sparkles, Zap, Star, Heart, TrendingUp } from 'lucide-react';

const mantras = [
  "Your journey is uniquely yours—celebrate every milestone 🌱",
  "Excellence is the sum of consistent effort 💪",
  "Progress over perfection, always 📈",
  "Stay focused, stay present, stay great 🎯",
  "Momentum is real—keep pushing forward ⚡",
  "Build it better, live it fuller 🚀",
  "Consistency is the ultimate differentiator 🏆",
  "Your growth matters, your effort counts 🔥",
  "Transform intentions into achievements ✨",
  "You are capable of extraordinary things 🌟",
];

const FloatingIcon = ({ icon: Icon, delay, duration, x, y }) => (
  <div 
    className="absolute pointer-events-none"
    style={{
      left: x,
      top: y,
      animation: `float ${duration}s ease-in-out ${delay}s infinite`,
    }}
  >
    <Icon className="h-4 w-4 text-csway-green/30 dark:text-csway-green/20" />
  </div>
);

export const MantraHero = () => {
  const mantra = useMemo(() => {
    const randomIndex = Math.floor(Math.random() * mantras.length);
    return mantras[randomIndex];
  }, []);

  return (
    <div className="relative py-8 px-4">
      {/* Floating icons */}
      <FloatingIcon icon={Sparkles} delay={0} duration={3} x="10%" y="20%" />
      <FloatingIcon icon={Zap} delay={0.5} duration={3.5} x="85%" y="30%" />
      <FloatingIcon icon={Star} delay={1} duration={4} x="15%" y="70%" />
      <FloatingIcon icon={Heart} delay={1.5} duration={3.2} x="90%" y="60%" />
      <FloatingIcon icon={TrendingUp} delay={0.8} duration={3.8} x="50%" y="10%" />

      {/* Mantra text */}
      <div className="text-center">
        <p className="text-xl sm:text-2xl font-semibold bg-gradient-to-r from-csway-green via-emerald-400 to-teal-500 bg-clip-text text-transparent leading-relaxed">
          {mantra}
        </p>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
            opacity: 0.3;
          }
          50% {
            transform: translateY(-20px) rotate(10deg);
            opacity: 0.6;
          }
        }
      `}</style>
    </div>
  );
};

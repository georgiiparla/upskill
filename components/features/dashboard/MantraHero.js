"use client";

import { useMemo, useState } from 'react';
import { Sparkles, Zap, Star, Heart, TrendingUp } from 'lucide-react';
import '@fontsource/jetbrains-mono/400.css';
import '@fontsource/jetbrains-mono/700.css';

const mantras = [
  "Your journey is uniquely yours—celebrate every milestone",
  "Excellence is the sum of consistent effort",
  "Progress over perfection, always",
  "Stay focused, stay present, stay great...",
  "Momentum is real—keep pushing forward",
  "Build it better, live it fuller",
  "Consistency is the ultimate differentiator",
  "Your growth matters, your effort counts",
  "Transform intentions into achievements",
  "You are capable of extraordinary things",
];

const FloatingIcon = ({ icon: Icon, delay, duration, x, y }) => (
  <div 
    className="absolute pointer-events-none"
    style={{
      left: x,
      top: y,
      animation: `float ${duration}s ease-in-out ${delay}s infinite`,
      opacity: 0.15,
    }}
  >
    <Icon className="h-4 w-4 text-slate-900/60 dark:text-indigo-400/30" />
  </div>
);

export const MantraHero = () => {
  const mantra = useMemo(() => {
    const randomIndex = Math.floor(Math.random() * mantras.length);
    return mantras[randomIndex];
  }, []);

  const [displayedText, setDisplayedText] = useState('');

  useMemo(() => {
    let index = 0;
    setDisplayedText('');
    
    const fullText = 'Mantra of the week: ' + mantra;
    
    const interval = setInterval(() => {
      if (index <= fullText.length) {
        setDisplayedText(fullText.substring(0, index));
        index++;
      } else {
        clearInterval(interval);
      }
    }, 30);

    return () => clearInterval(interval);
  }, [mantra]);

  return (
    <div className="relative py-8 px-4">
      {/* Floating icons */}
      <FloatingIcon icon={Sparkles} delay={0} duration={3} x="15%" y="20%" />
      <FloatingIcon icon={Zap} delay={0.5} duration={3.5} x="85%" y="30%" />
      <FloatingIcon icon={Star} delay={1} duration={4} x="70%" y="70%" />
      <FloatingIcon icon={Heart} delay={1.5} duration={3.2} x="95%" y="60%" />
      <FloatingIcon icon={TrendingUp} delay={0.8} duration={3.8} x="75%" y="10%" />
      <FloatingIcon icon={Sparkles} delay={1.2} duration={3.3} x="45%" y="75%" />
      <FloatingIcon icon={Zap} delay={0.3} duration={4.2} x="25%" y="50%" />
      <FloatingIcon icon={Star} delay={1.8} duration={3.5} x="90%" y="45%" />
      <FloatingIcon icon={Heart} delay={0.7} duration={3.8} x="35%" y="15%" />
      <FloatingIcon icon={TrendingUp} delay={1.3} duration={4} x="60%" y="80%" />
      <FloatingIcon icon={Sparkles} delay={2} duration={3.2} x="10%" y="65%" />
      <FloatingIcon icon={Zap} delay={1.1} duration={3.9} x="80%" y="20%" />

      {/* Mantra text with typing animation */}
      <div className="text-left">
        <p className="text-lg md:text-xl lg:text-2xl bg-gradient-to-r from-slate-500 via-slate-600 to-slate-500 dark:from-indigo-300 dark:via-purple-300 dark:to-indigo-300 bg-clip-text text-transparent leading-relaxed min-h-[1.5em]" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
          {displayedText}
          {displayedText.length < ('Mantra of the week: ' + mantra).length && <span className="animate-pulse">|</span>}
        </p>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
            opacity: 0.15;
          }
          50% {
            transform: translateY(-8px);
            opacity: 0.25;
          }
        }
      `}</style>
    </div>
  );
};

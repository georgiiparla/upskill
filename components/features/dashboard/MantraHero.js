"use client";

import { useMemo } from 'react';
import Image from 'next/image';
import '@fontsource/jetbrains-mono/400.css';
import '@fontsource/jetbrains-mono/700.css';

const mantras = [
  "- Your journey is uniquely yours—celebrate every milestone",
  "- Excellence is the sum of consistent effort",
  "- Progress over perfection, always",
  "- Stay focused, stay present, stay great...",
  "- Momentum is real—keep pushing forward",
  "- Build it better, live it fuller",
  "- Consistency is the ultimate differentiator",
  "- Your growth matters, your effort counts",
  "- Transform intentions into achievements",
  "- You are capable of extraordinary things",
];

export const MantraHero = () => {
  const mantra = useMemo(() => {
    const randomIndex = Math.floor(Math.random() * mantras.length);
    return mantras[randomIndex];
  }, []);

  return (
    <div className="relative py-8 px-4">
      {/* Logo and mantra text */}
      <div className="text-left flex items-center gap-3">

        <p className="text-lg md:text-xl lg:text-2xl bg-gradient-to-r from-slate-500 via-slate-600 to-slate-500 dark:from-indigo-300 dark:via-purple-300 dark:to-indigo-300 bg-clip-text text-transparent leading-relaxed" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
          {mantra}
        </p>
          {/*<Image*/}
          {/*    src="/csway-logo.png"*/}
          {/*    alt="Mantra"*/}
          {/*    width={24}*/}
          {/*    height={24}*/}
          {/*    className="h-6 w-6"*/}
          {/*    style={{*/}
          {/*        filter: 'invert(0.4) sepia(0.5) hue-rotate(200deg) saturate(1.2)'*/}
          {/*    }}*/}
          {/*/>*/}

      </div>
    </div>
  );
};

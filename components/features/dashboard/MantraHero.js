"use client";

import { useMemo } from 'react';

const mantras = [
  "'Cutting corners hurts'",
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

        <p className="text-lg md:text-xl lg:text-2xl bg-gradient-to-r from-slate-500 via-slate-600 to-slate-500 dark:from-indigo-300 dark:via-purple-300 dark:to-indigo-300 bg-clip-text text-transparent leading-relaxed">
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

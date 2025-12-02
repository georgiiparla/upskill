"use client";

import { useMemo, useState, useRef, useEffect } from 'react';
import { useTheme } from 'next-themes';
import tinycolor from 'tinycolor2';
import { MoreHorizontal, Pencil, Link as LinkIcon } from 'lucide-react';
import { BackgroundGradientAnimation } from '@/components/ui/BackgroundGradientAnimation';
import { BASE_COLORS, ICON_MAP, generateGradientTheme, IconDisplay } from './agenda-shared';

export const AgendaItemView = ({ item, onEditClick, isSystemMantra }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const dropdownRef = useRef(null);
    const { theme, systemTheme } = useTheme();

    const currentTheme = theme === 'system' ? systemTheme : theme;
    const isDark = currentTheme === 'dark';

    // Click outside handler
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (!isMenuOpen) return;
            if (dropdownRef.current && dropdownRef.current.contains(event.target)) return;
            setIsMenuOpen(false);
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [isMenuOpen]);

    // --- COLOR LOGIC ---
    const iconKey = item.icon_name || 'ClipboardList';
    const colorKey = isSystemMantra ? 'Star' : (ICON_MAP[iconKey]?.colorKey || 'ClipboardList');
    const baseColor = BASE_COLORS[colorKey];

    const gradientConfig = useMemo(() => {
        if (!isDark) return null;
        return generateGradientTheme(baseColor);
    }, [baseColor, isDark]);

    const lightModeStyle = !isDark ? {
        borderColor: tinycolor(baseColor).setAlpha(0.4).toRgbString(),
        borderWidth: '1px',
        backgroundColor: '#ffffff'
    } : {};

    const badgeStyle = isDark ? {
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        color: baseColor,
        boxShadow: 'none'
    } : {
        backgroundColor: tinycolor(baseColor).setAlpha(0.1).toRgbString(),
        color: baseColor,
        boxShadow: 'none'
    };

    // --- CONTENT RENDERER ---
    const Content = () => (
        // [!] Removed bg-transparent to ensure no conflicts, kept positioning
        <div className="relative h-full flex flex-col z-20">
            {/* Badge */}
            <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center justify-center h-8 w-8 rounded-lg backdrop-blur-md" style={badgeStyle}>
                <IconDisplay name={item.icon_name} className="h-4 w-4" />
            </div>

            <div className="py-8 px-4 pl-16 flex-1 flex flex-col justify-center">
                <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                        <h3 className={`font-medium text-sm sm:text-base md:text-lg mb-2 break-words drop-shadow-sm ${isDark ? 'text-white' : 'text-slate-900'}`}>
                            {item.title}
                        </h3>
                        <div className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                            {item.editor_username ? (
                                <>Updated by <span className={`font-medium ${isDark ? 'text-slate-200' : 'text-slate-700'}`}>{item.editor_username}</span></>
                            ) : isSystemMantra ? (
                                <>Updated by <span className={`font-medium ${isDark ? 'text-slate-200' : 'text-slate-700'}`}>System</span></>
                            ) : null}
                        </div>
                    </div>

                    {!isSystemMantra && (
                        <div className="relative z-20">
                            <button
                                onClick={(e) => { e.stopPropagation(); setIsMenuOpen(!isMenuOpen); }}
                                className={`flex-shrink-0 p-2 rounded-lg transition-all ${isDark ? 'text-white/60 hover:text-white hover:bg-white/20' : 'text-slate-400 hover:text-slate-900 hover:bg-slate-100'}`}
                            >
                                <MoreHorizontal className="h-4 w-4" />
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );

    return (
        // [!] FIX: This wrapper allows the card to take up space in the Grid
        <div className="relative w-full h-full group">

            {/* 1. BACKGROUND LAYER (Absolute) 
                This handles the rounded corners, borders, and gradients.
                It sits BEHIND the content.
            */}
            <div
                className={`
                    absolute inset-0 rounded-xl overflow-hidden transition-all duration-300
                    ${isDark ? 'bg-slate-900 border border-slate-800 shadow-lg group-hover:border-slate-700/80 group-hover:shadow-2xl' : 'bg-white'}
                `}
                style={lightModeStyle}
            >
                {isDark && (
                    <>
                        <div className="absolute inset-0 bg-slate-900 z-0" />

                        {/* Layer 1: Breathing Base */}
                        <div className="absolute inset-0 z-0 animate-glow-breathe pointer-events-none">
                            <BackgroundGradientAnimation
                                containerClassName="h-full w-full"
                                size="130%"
                                interactive={false}
                                {...gradientConfig}
                            />
                        </div>

                        {/* Layer 2: Hover Highlight */}
                        <div className="absolute inset-0 z-1 opacity-0 group-hover:opacity-100 transition-opacity duration-[2000ms] ease-out">
                            <BackgroundGradientAnimation
                                containerClassName="h-full w-full"
                                size="130%"
                                interactive={true}
                                {...gradientConfig}
                            />
                        </div>

                        <div className="absolute inset-0 bg-slate-950/10 pointer-events-none z-10" />
                    </>
                )}
            </div>

            {/* 2. CONTENT LAYER (Relative)
                This is in the document flow, giving the card its height/shape.
            */}
            <Content />

            {/* 3. DROPDOWN MENU (Absolute, Highest Z-Index)
                It sits outside the overflow-hidden background layer, so it won't be clipped.
            */}
            {isMenuOpen && (
                <div
                    ref={dropdownRef}
                    className="absolute right-4 z-50 w-48 origin-top-right rounded-xl shadow-2xl ring-1 ring-black/5 focus:outline-none bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border border-slate-200/60 dark:border-slate-700/60"
                    style={{ top: '50%', marginTop: '1.25rem' }}
                >
                    <div className="py-1">
                        <button onClick={() => { onEditClick(); setIsMenuOpen(false); }} className="w-full text-left flex items-center gap-2.5 px-4 py-2.5 text-sm transition-colors text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800/80">
                            <Pencil className="h-4 w-4 text-slate-400 dark:text-slate-500" /><span>Edit item</span>
                        </button>
                        {item.link && (
                            <a href={item.link} target="_blank" rel="noopener noreferrer" onClick={() => setIsMenuOpen(false)} className="w-full text-left flex items-center gap-2.5 px-4 py-2.5 text-sm transition-colors text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800/80">
                                <LinkIcon className="h-4 w-4 text-slate-400 dark:text-slate-500" /><span>Open link</span>
                            </a>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};
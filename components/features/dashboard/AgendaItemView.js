"use client";

import { useMemo, useState, useRef, useEffect } from 'react';
import { useTheme } from 'next-themes';
import tinycolor from 'tinycolor2';
import { MoreHorizontal, Pencil, Link as LinkIcon } from 'lucide-react';
import { motion } from 'framer-motion';
import { BASE_COLORS, ICON_MAP, IconDisplay } from './agenda-shared';

// --- CONFIGURATION: Animation Settings ---
const ANIMATION_CONFIG = {
    hoverDelay: 0.1,      // Global debounce delay for all hover effects
    resetDelay: 0,        // Instant reset
    scaleSpring: {        // Physics for card scaling
        type: "spring",
        stiffness: 400,
        damping: 25
    },
    mascotSpring: {       // Physics for mascot entrance
        type: "spring",
        stiffness: 260,
        damping: 15,
        mass: 1
    },
    frameTransition: {    // Physics for Border/Shadow/Color transitions
        duration: 0.3,
        ease: "easeOut"
    }
};

export const AgendaItemView = ({ item, onEditClick, isSystemMantra }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const dropdownRef = useRef(null);
    const { theme, systemTheme } = useTheme();

    // Ensure we have a stable boolean for the theme
    const currentTheme = theme === 'system' ? systemTheme : theme;
    const isDark = currentTheme === 'dark';

    // Click outside handler for the dropdown menu
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

    // Identify the mascot icon
    const MascotIcon = ICON_MAP[iconKey]?.component || ICON_MAP['ClipboardList'].component;

    // --- CRITICAL FIX: Unified Frame Variants ---
    // We define explicit visual states for BOTH themes in the same object.
    const frameVariants = useMemo(() => {
        const c = tinycolor(baseColor);

        if (isDark) {
            return {
                idle: {
                    // Dark Mode Idle: Low opacity colored border
                    borderColor: c.clone().setAlpha(0.3).toRgbString(),
                    boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
                    backgroundColor: "rgba(15, 23, 42, 1)", // slate-900
                    transition: { ...ANIMATION_CONFIG.frameTransition, delay: ANIMATION_CONFIG.resetDelay }
                },
                hover: {
                    // Dark Mode Hover: Full opacity colored border
                    borderColor: c.clone().setAlpha(1.0).toRgbString(),
                    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
                    backgroundColor: "rgba(15, 23, 42, 1)",
                    transition: { ...ANIMATION_CONFIG.frameTransition, delay: ANIMATION_CONFIG.hoverDelay }
                }
            };
        }

        // Light Mode Configuration
        return {
            idle: {
                // Low opacity colored border
                borderColor: c.clone().setAlpha(0.3).toRgbString(),
                boxShadow: "0 0 0 0 rgba(0,0,0,0)",
                backgroundColor: "#ffffff",
                transition: { ...ANIMATION_CONFIG.frameTransition, delay: ANIMATION_CONFIG.resetDelay }
            },
            hover: {
                // Full opacity colored border
                borderColor: c.clone().setAlpha(1.0).toRgbString(),
                boxShadow: "0 0 0 0 rgba(0,0,0,0)",
                backgroundColor: "#ffffff",
                transition: { ...ANIMATION_CONFIG.frameTransition, delay: ANIMATION_CONFIG.hoverDelay }
            }
        };
    }, [baseColor, isDark]);

    // --- CRITICAL FIX: Base Styles ---
    const baseCardStyle = useMemo(() => {
        const c = tinycolor(baseColor);
        if (isDark) {
            return {
                borderWidth: '1px',
                borderStyle: 'solid',
                borderColor: c.clone().setAlpha(0.3).toRgbString(),
                backgroundColor: "rgba(15, 23, 42, 1)"
            };
        }

        return {
            borderWidth: '1px',
            borderStyle: 'solid',
            borderColor: c.clone().setAlpha(0.3).toRgbString(),
            backgroundColor: '#ffffff'
        };
    }, [isDark, baseColor]);

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
        <div className="relative h-full flex flex-col z-20 pointer-events-none">
            {/* Badge */}
            <div className="absolute left-6 top-1/2 -translate-y-1/2 flex items-center justify-center h-8 w-8 rounded-lg backdrop-blur-md" style={badgeStyle}>
                <IconDisplay name={item.icon_name} className="h-4 w-4" />
            </div>

            <div className="py-10 px-6 pl-20 flex-1 flex flex-col justify-center pointer-events-auto">
                <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                        <h3 className={`font-medium text-base sm:text-lg md:text-xl mb-2 break-words drop-shadow-sm ${isDark ? 'text-white' : 'text-slate-900'}`}>
                            {item.title}
                        </h3>
                        <div className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
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
        <motion.div
            className={`relative w-full h-full group ${isMenuOpen ? '!z-[100]' : ''}`}
            initial="idle"
            whileHover="hover"
            whileTap="hover"
            // Use 'animate' to force a state reset when theme changes
            animate="idle"
            // [!] SCALE EFFECT
            variants={{
                idle: {
                    scale: 1,
                    zIndex: 0,
                    transition: { ...ANIMATION_CONFIG.scaleSpring, delay: ANIMATION_CONFIG.resetDelay }
                },
                hover: {
                    scale: 1.02,
                    zIndex: 10,
                    transition: { ...ANIMATION_CONFIG.scaleSpring, delay: ANIMATION_CONFIG.hoverDelay }
                }
            }}
        >

            {/* 1. BACKGROUND LAYER (Absolute) */}
            <motion.div
                className="absolute inset-0 rounded-xl overflow-hidden"
                // [!] Apply base styles immediately to prevent Flash of Unstyled Content (FOUC)
                style={baseCardStyle}
                // [!] Variants handle smooth interpolation between states
                variants={frameVariants}
            >
                {/* --- UNIFIED: Mascot Animation for BOTH Themes --- */}
                <motion.div
                    className="absolute -bottom-8 -right-8 z-0 pointer-events-none"
                    variants={{
                        idle: {
                            y: 40,
                            x: 40,
                            rotate: 10,
                            opacity: 0,
                            scale: 0.8
                        },
                        hover: {
                            y: 0,
                            x: 0,
                            rotate: -15,
                            opacity: 0.25,
                            scale: 1,
                            transition: { ...ANIMATION_CONFIG.mascotSpring, delay: ANIMATION_CONFIG.hoverDelay }
                        }
                    }}
                >
                    <MascotIcon
                        size={140}
                        color={baseColor}
                        strokeWidth={1.5}
                    />
                </motion.div>

                {isDark && (
                    <div className="absolute inset-0 bg-slate-950/10 pointer-events-none z-10" />
                )}
            </motion.div>

            {/* 2. CONTENT LAYER */}
            <Content />

            {/* 3. DROPDOWN MENU */}
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
        </motion.div>
    );
};
"use client";

import { useState, useRef, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { motion } from 'framer-motion';

import { AgendaItemContent } from './components/AgendaItemContent';
import { AgendaItemDropdown } from './components/AgendaItemDropdown';
import { useAgendaItemStyles, ANIMATION_CONFIG } from './hooks/useAgendaItemStyles';

export const AgendaItemView = ({ item, onEditClick, isSystemMantra }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const dropdownRef = useRef(null);
    const { theme, systemTheme } = useTheme();

    // Ensure we have a stable boolean for the theme
    const currentTheme = theme === 'system' ? systemTheme : theme;
    const isDark = currentTheme === 'dark';

    // Click outside handler for the dropdown menu
    // --- COLOR LOGIC & STYLES ---
    const { baseColor, MascotIcon, frameVariants, baseCardStyle, badgeStyle } = useAgendaItemStyles(item, isSystemMantra, isDark);

    return (
        <motion.div
            className={`relative w-full h-full group ${isMenuOpen ? '!z-[100]' : ''}`}
            initial="idle"
            whileHover="hover"
            whileTap="hover"
            animate="idle"
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
                style={baseCardStyle}
                variants={frameVariants}
            >
                {/* Mascot Animation for BOTH Themes */}
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
            <AgendaItemContent
                item={item}
                isSystemMantra={isSystemMantra}
                isDark={isDark}
                onMenuToggle={() => setIsMenuOpen(!isMenuOpen)}
                badgeStyle={badgeStyle}
            />

            {/* 3. DROPDOWN MENU */}
            <AgendaItemDropdown
                item={item}
                isOpen={isMenuOpen}
                onClose={() => setIsMenuOpen(false)}
                onEdit={() => onEditClick(item.id)}
            />
        </motion.div>
    );
};
"use client";
import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import tinycolor from 'tinycolor2';
import { AgendaItemContent } from './components/AgendaItemContent';
import { AgendaItemDropdown } from './components/AgendaItemDropdown';
import { useAgendaItemStyles, ANIMATION_CONFIG } from './hooks/useAgendaItemStyles';

export const AgendaItemView = ({ item, onEditClick, isSystemMantra }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { baseColor, MascotIcon } = useAgendaItemStyles(item, isSystemMantra);

    // Calculate theme-specific accent colors once
    const accentVars = useMemo(() => {
        const c = tinycolor(baseColor);
        return {
            '--accent-base': baseColor,
            '--accent-light': c.clone().darken(15).saturate(15).toRgbString(),
            '--accent-dark': c.clone().lighten(20).saturate(20).toRgbString(),
            '--accent-border': c.clone().setAlpha(0.3).toRgbString(),
            '--shadow-idle': '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
            '--shadow-hover': '0 20px 25px -5px rgba(0, 0, 0, 0.12)',
        };
    }, [baseColor]);

    return (
        <motion.div
            className="agenda-card-root relative w-full h-full group"
            style={{
                ...accentVars,
                zIndex: isMenuOpen ? 100 : 0
            }}
            initial="idle"
            whileHover="hover"
            whileTap="hover"
            animate="idle"
            variants={{
                idle: { scale: 1, transition: { ...ANIMATION_CONFIG.scaleSpring, delay: ANIMATION_CONFIG.resetDelay } },
                hover: { scale: 1.02, transition: { ...ANIMATION_CONFIG.scaleSpring, delay: ANIMATION_CONFIG.hoverDelay } }
            }}
        >
            <motion.div
                className="absolute inset-0 rounded-xl overflow-hidden border bg-white dark:bg-slate-900"
                variants={{
                    idle: {
                        borderColor: 'var(--accent-border)',
                        boxShadow: 'var(--shadow-idle)',
                        transition: { ...ANIMATION_CONFIG.frameTransition, delay: ANIMATION_CONFIG.resetDelay },
                    },
                    hover: {
                        borderColor: 'var(--accent-base)',
                        boxShadow: 'var(--shadow-hover)',
                        transition: { ...ANIMATION_CONFIG.frameTransition, delay: ANIMATION_CONFIG.hoverDelay },
                    }
                }}
            >
                <motion.div
                    className="absolute -bottom-8 -right-8 z-0 pointer-events-none"
                    variants={{
                        idle: { y: 30, x: 30, rotate: 10, opacity: 0.05, scale: 0.9 },
                        hover: {
                            y: 0, x: 0, rotate: -15, opacity: 0.85, scale: 1,
                            transition: { ...ANIMATION_CONFIG.mascotSpring, delay: ANIMATION_CONFIG.hoverDelay }
                        }
                    }}
                >
                    <MascotIcon size={140} color="var(--accent-base)" stroke={1} />
                </motion.div>

                <div className="absolute inset-0 bg-slate-950/10 pointer-events-none z-10 hidden dark:block" />
            </motion.div>

            <AgendaItemContent
                item={item}
                isSystemMantra={isSystemMantra}
                onMenuToggle={() => setIsMenuOpen(!isMenuOpen)}
            />

            <AgendaItemDropdown
                item={item}
                isOpen={isMenuOpen}
                onClose={() => setIsMenuOpen(false)}
                onEdit={() => onEditClick(item.id)}
            />

            <style jsx global>{`
                :global(.dark) .agenda-card-root {
                    --shadow-idle: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
                    --shadow-hover: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
                }
            `}</style>
        </motion.div>
    );
};

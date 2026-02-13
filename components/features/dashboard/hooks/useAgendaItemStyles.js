import { useMemo } from 'react';
import tinycolor from 'tinycolor2';
import { BASE_COLORS, ICON_MAP } from '../agenda-shared';

export const ANIMATION_CONFIG = {
    hoverDelay: 0.1,      // Global debounce delay for all hover effects
    resetDelay: 0,        // Instant reset
    scaleSpring: {        // Physics for card scaling
        type: "spring",
        stiffness: 400,
        damping: 25
    },
    mascotSpring: {       // Physics for mascot entrance — smooth, no bounce
        type: "spring",
        stiffness: 200,
        damping: 25,
        mass: 1
    },
    frameTransition: {    // Physics for Border/Shadow/Color transitions
        duration: 0.3,
        ease: "easeOut"
    }
};

export const useAgendaItemStyles = (item, isSystemMantra, isDark) => {
    const iconKey = item.icon_name || 'ClipboardList';
    const colorKey = isSystemMantra ? 'Star' : (ICON_MAP[iconKey]?.colorKey || 'ClipboardList');
    const baseColor = BASE_COLORS[colorKey];

    const MascotIcon = ICON_MAP[iconKey]?.component || ICON_MAP['ClipboardList'].component;

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

    const textColor = useMemo(() => {
        const c = tinycolor(baseColor);
        if (isDark) {
            // Dark Mode: Brighter neon — more saturation, more lightening
            return c.lighten(20).saturate(20).toRgbString();
        } else {
            // Light Mode: Less darkening to keep vibrancy while maintaining contrast
            return c.darken(15).saturate(15).toRgbString();
        }
    }, [baseColor, isDark]);

    return {
        baseColor,
        textColor,
        MascotIcon,
        frameVariants,
        baseCardStyle,
        badgeStyle
    };
};

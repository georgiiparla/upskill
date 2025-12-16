import tinycolor from 'tinycolor2';
import {
    ClipboardList, BookOpen, FileText, MessageSquare, Star
} from 'lucide-react';

// --- CONFIGURATION ---
export const BASE_COLORS = {
    ClipboardList: '#3b82f6', // Blue 500
    BookOpen: '#a855f7',      // Purple 500
    FileText: '#94a3b8',      // Slate 400
    MessageSquare: '#10b981', // Emerald 500
    Star: '#ef4444',          // CHANGED: Red 500 (Brighter than Rose 500 or Red 600)
    Default: '#64748b'        // Slate
};

export const ICON_MAP = {
    ClipboardList: { component: ClipboardList, colorKey: 'ClipboardList' },
    BookOpen: { component: BookOpen, colorKey: 'BookOpen' },
    FileText: { component: FileText, colorKey: 'FileText' },
    MessageSquare: { component: MessageSquare, colorKey: 'MessageSquare' },
    Star: { component: Star, colorKey: 'Star' },
};

// --- UTILITIES ---
const toRgbString = (colorObj) => {
    const { r, g, b } = colorObj.toRgb();
    return `${r}, ${g}, ${b}`;
};

// --- BRIGHT NEON GENERATOR ---
// --- BRIGHT NEON GENERATOR ---
export const generateGradientTheme = (baseColorHex, isDark = true) => {
    const base = tinycolor(baseColorHex);
    // [!] Theme-dependent Base
    const slateBase = isDark ? '#0f172a' : '#ffffff'; // Slate 900 vs White

    // Analyze input color
    const hsl = base.toHsl();
    const isGrayscale = hsl.s < 0.2; // Detect if it's the Gray/File icon

    let coreColor, glowColor, secondaryGlow, ambientColor;

    if (isGrayscale) {
        // --- STRATEGY: MONOCHROME / SILVER ---
        if (isDark) {
            const silverBase = tinycolor('#cbd5e1'); // Slate 300
            coreColor = tinycolor('#f8fafc').setAlpha(0.9); // Slate 50
            glowColor = silverBase.clone().setAlpha(0.8);
            secondaryGlow = tinycolor('#64748b').setAlpha(0.7); // Slate 500
            ambientColor = tinycolor('#475569').setAlpha(0.5); // Slate 600
        } else {
            // Light Mode Grayscale
            coreColor = tinycolor('#0f172a').setAlpha(0.1); // Dark hint
            glowColor = tinycolor('#94a3b8').setAlpha(0.2); // Slate 400
            secondaryGlow = tinycolor('#cbd5e1').setAlpha(0.3); // Slate 300
            ambientColor = tinycolor('#f1f5f9').setAlpha(0.8); // Slate 100
        }

    } else {
        // --- STRATEGY: COLORFUL ---

        // 1. Core: The exact base color
        coreColor = base.clone().setAlpha(1.0);

        // 2. Glow: The exact base color, slightly transparent
        glowColor = base.clone().setAlpha(0.9);

        // 3. Shift: Minimal spin
        secondaryGlow = base.clone().spin(5).setAlpha(0.8);

        // 4. Ambient: 
        if (isDark) {
            ambientColor = base.clone().darken(5).setAlpha(0.6);
        } else {
            // In light mode, ambient should be very light/washy
            ambientColor = base.clone().lighten(20).setAlpha(0.3);
        }
    }

    // Background Mix:
    let bgStart, bgEnd;

    if (isDark) {
        bgStart = tinycolor.mix(slateBase, coreColor, 15);
        bgEnd = tinycolor(slateBase);
    } else {
        // Light Mode Background logic
        // We want a very subtle wash, not a dark mix
        bgStart = tinycolor.mix(slateBase, coreColor, 5); // Mostly white with tiny tint
        bgEnd = tinycolor(slateBase); // Pure white
    }

    return {
        gradientBackgroundStart: bgStart.toRgbString(),
        gradientBackgroundEnd: bgEnd.toRgbString(),

        // The Center/Largest Blob -> The "Light Source"
        firstColor: toRgbString(coreColor),

        // The Surrounding Blobs
        secondColor: toRgbString(glowColor),
        thirdColor: toRgbString(secondaryGlow),

        // The Atmosphere
        fourthColor: toRgbString(ambientColor),

        // Anchor
        fifthColor: toRgbString(tinycolor(slateBase)),

        // Mouse Pointer
        pointerColor: toRgbString(coreColor.clone().setAlpha(0.8))
    };
};

export const IconDisplay = ({ name, ...props }) => {
    const Icon = ICON_MAP[name]?.component || ClipboardList;
    return <Icon {...props} />;
};
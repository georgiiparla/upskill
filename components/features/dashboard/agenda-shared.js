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
export const generateGradientTheme = (baseColorHex) => {
    const base = tinycolor(baseColorHex);
    const slateBase = '#0f172a'; // Slate 900

    // Analyze input color
    const hsl = base.toHsl();
    const isGrayscale = hsl.s < 0.2; // Detect if it's the Gray/File icon

    let coreColor, glowColor, secondaryGlow, ambientColor;

    if (isGrayscale) {
        // --- STRATEGY: MONOCHROME / SILVER ---
        // Kept similar to original but tightened to match the slate icon
        const silverBase = tinycolor('#cbd5e1'); // Slate 300

        coreColor = tinycolor('#f8fafc').setAlpha(0.9); // Slate 50
        glowColor = silverBase.clone().setAlpha(0.8);
        secondaryGlow = tinycolor('#64748b').setAlpha(0.7); // Slate 500
        ambientColor = tinycolor('#475569').setAlpha(0.5); // Slate 600

    } else {
        // --- STRATEGY: PRIMITIVE BRIGHT COLORS ---
        // CHANGED: Removed .lighten() and .saturate() calls that created the pastel/neon look.
        // We now use the base color directly to match the icon exactly.

        // 1. Core: The exact base color (e.g., Blue 500)
        coreColor = base.clone().setAlpha(1.0);

        // 2. Glow: The exact base color, slightly transparent for blending
        glowColor = base.clone().setAlpha(0.9);

        // 3. Shift: Minimal spin to create texture without changing the perceived color family
        secondaryGlow = base.clone().spin(5).setAlpha(0.8);

        // 4. Ambient: A slightly darker version for the background depth
        ambientColor = base.clone().darken(5).setAlpha(0.6);
    }

    // Background Mix:
    // We mix a small amount of the primitive color into the dark background
    // so the card feels cohesive.
    const bgStart = tinycolor.mix(slateBase, coreColor, 15);
    const bgEnd = tinycolor(slateBase);

    return {
        gradientBackgroundStart: bgStart.toRgbString(),
        gradientBackgroundEnd: bgEnd.toRgbString(),

        // The Center/Largest Blob -> The "Light Source"
        firstColor: toRgbString(coreColor),

        // The Surrounding Blobs -> Matching the primitive icon color
        secondColor: toRgbString(glowColor),
        thirdColor: toRgbString(secondaryGlow),

        // The Atmosphere
        fourthColor: toRgbString(ambientColor),

        // Anchor
        fifthColor: toRgbString(tinycolor(slateBase)),

        // Mouse Pointer -> Pure Base Color
        pointerColor: toRgbString(coreColor.clone().setAlpha(0.8))
    };
};

export const IconDisplay = ({ name, ...props }) => {
    const Icon = ICON_MAP[name]?.component || ClipboardList;
    return <Icon {...props} />;
};
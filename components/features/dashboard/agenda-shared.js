import tinycolor from 'tinycolor2';
// [!] Import Tabler Icons
import {
    IconClipboardList,
    IconBook,
    IconFileText,
    IconMessageCircle, // Replacing MessageSquare
    IconStar,
    IconHelp // Default fallback
} from '@tabler/icons-react';

// --- CONFIGURATION ---
// [!] KEYS MUST MATCH BACKEND 'VALID_ICONS' EXACTLY
export const BASE_COLORS = {
    ClipboardList: '#3b82f6', // Blue 500
    BookOpen: '#a855f7',      // Purple 500
    FileText: '#94a3b8',      // Slate 400
    MessageSquare: '#10b981', // Emerald 500
    Star: '#ef4444',          // Red 500
    Default: '#64748b'        // Slate
};

// [!] Map Backend Strings -> Tabler Components
export const ICON_MAP = {
    ClipboardList: { component: IconClipboardList, colorKey: 'ClipboardList' },
    BookOpen: { component: IconBook, colorKey: 'BookOpen' },
    FileText: { component: IconFileText, colorKey: 'FileText' },
    // Backend says 'MessageSquare', but we visually use Tabler's 'IconMessageCircle'
    MessageSquare: { component: IconMessageCircle, colorKey: 'MessageSquare' },
    Star: { component: IconStar, colorKey: 'Star' },
};

// --- UTILITIES ---
const toRgbString = (colorObj) => {
    const { r, g, b } = colorObj.toRgb();
    return `${r}, ${g}, ${b}`;
};

// --- BRIGHT NEON GENERATOR ---
export const generateGradientTheme = (baseColorHex, isDark = true) => {
    const base = tinycolor(baseColorHex);
    const slateBase = isDark ? '#0f172a' : '#ffffff';

    const hsl = base.toHsl();
    const isGrayscale = hsl.s < 0.2;

    let coreColor, glowColor, secondaryGlow, ambientColor;

    if (isGrayscale) {
        if (isDark) {
            const silverBase = tinycolor('#cbd5e1');
            coreColor = tinycolor('#f8fafc').setAlpha(0.9);
            glowColor = silverBase.clone().setAlpha(0.8);
            secondaryGlow = tinycolor('#64748b').setAlpha(0.7);
            ambientColor = tinycolor('#475569').setAlpha(0.5);
        } else {
            coreColor = tinycolor('#0f172a').setAlpha(0.1);
            glowColor = tinycolor('#94a3b8').setAlpha(0.2);
            secondaryGlow = tinycolor('#cbd5e1').setAlpha(0.3);
            ambientColor = tinycolor('#f1f5f9').setAlpha(0.8);
        }
    } else {
        coreColor = base.clone().setAlpha(1.0);
        glowColor = base.clone().setAlpha(0.9);
        secondaryGlow = base.clone().spin(5).setAlpha(0.8);
        if (isDark) {
            ambientColor = base.clone().darken(5).setAlpha(0.6);
        } else {
            ambientColor = base.clone().lighten(20).setAlpha(0.3);
        }
    }

    let bgStart, bgEnd;
    if (isDark) {
        bgStart = tinycolor.mix(slateBase, coreColor, 15);
        bgEnd = tinycolor(slateBase);
    } else {
        bgStart = tinycolor.mix(slateBase, coreColor, 5);
        bgEnd = tinycolor(slateBase);
    }

    return {
        gradientBackgroundStart: bgStart.toRgbString(),
        gradientBackgroundEnd: bgEnd.toRgbString(),
        firstColor: toRgbString(coreColor),
        secondColor: toRgbString(glowColor),
        thirdColor: toRgbString(secondaryGlow),
        fourthColor: toRgbString(ambientColor),
        fifthColor: toRgbString(tinycolor(slateBase)),
        pointerColor: toRgbString(coreColor.clone().setAlpha(0.8))
    };
};

export const IconDisplay = ({ name, ...props }) => {
    // Safety check: if backend sends a name we don't have, fallback
    const Icon = ICON_MAP[name]?.component || IconHelp;
    return <Icon {...props} />;
};
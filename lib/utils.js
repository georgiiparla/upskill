import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import tinycolor from 'tinycolor2';

export function cn(...inputs) {
    return twMerge(clsx(inputs));
}

/**
 * Transforms an icon's base color (HEX or RGB string) into a theme-aware, subtle gradient palette.
 * @param {string} colorBase - The icon's base color (e.g., "59, 130, 246").
 * @param {string} theme - 'light' or 'dark'.
 * @param {boolean} isMantra - If true, applies a brighter/red-toned treatment.
 * @returns {Array<string>} An array of 5 RGB strings (e.g., ["R, G, B", ...]).
 */
export const generateThemeGradientPalette = (colorBase, theme, isMantra) => {
    const base = tinycolor(colorBase.includes('rgb') ? colorBase : `rgb(${colorBase})`);
    let h = base.toHsl().h;
    let s = base.toHsl().s;
    let l = base.toHsl().l;

    if (isMantra) {
        h = base.toHsl().h > 200 ? 350 : 10; // Shift toward red/pink hue (0-20 or 350-360)
        s = Math.min(s, 0.9); // Cap saturation
    }

    if (theme === 'dark') {
        s = Math.max(s * 0.3, 0.05); // Heavily desaturate
        l = Math.min(l * 0.45, 0.4); // Darken significantly (max lightness 40%)

        const steps = [
            // Darkest step (BG)
            tinycolor({ h, s, l: l * 0.5 }).toRgbString().match(/\d{1,3}/g).join(', '),
            // Dark accent 1
            tinycolor({ h, s, l: l * 0.7 }).toRgbString().match(/\d{1,3}/g).join(', '),
            // Primary tone
            tinycolor({ h, s, l: l * 0.9 }).toRgbString().match(/\d{1,3}/g).join(', '),
            // Light accent
            tinycolor({ h, s, l: Math.min(l * 1.2, 0.5) }).toRgbString().match(/\d{1,3}/g).join(', '),
            // Pointer color / Brightest highlight
            tinycolor({ h, s: Math.min(s * 1.5, 0.7), l: Math.min(l * 1.5, 0.6) }).toRgbString().match(/\d{1,3}/g).join(', ')
        ];
        return steps;

    } else {
        // Light Theme: Soft, desaturated, light.
        s = Math.min(s * 0.2, 0.15); // Heavily desaturate (max saturation 15%)
        l = Math.max(l * 1.15, 0.85); // Lighten significantly (min lightness 85%)

        const steps = [
            // Darkest accent
            tinycolor({ h, s: s * 1.5, l: Math.max(l * 0.8, 0.7) }).toRgbString().match(/\d{1,3}/g).join(', '),
            // Primary tone
            tinycolor({ h, s, l: l * 0.95 }).toRgbString().match(/\d{1,3}/g).join(', '),
            // Light accent 1
            tinycolor({ h, s: s * 0.8, l }).toRgbString().match(/\d{1,3}/g).join(', '),
            // Light accent 2
            tinycolor({ h, s: s * 0.5, l: Math.min(l * 1.05, 0.98) }).toRgbString().match(/\d{1,3}/g).join(', '),
            // Lightest step (BG)
            tinycolor({ h, s: 0.01, l: 0.99 }).toRgbString().match(/\d{1,3}/g).join(', ')
        ];
        return steps;
    }
};

/**
 * Maps the ICON_MAP keys to their corresponding base RGB values.
 * FIX: Ensuring accurate and saturated base colors for consistent HSL derivation.
 * @returns {Record<string, string>} Mapping of icon name to base RGB string (R, G, B).
 */
export const getIconBaseColors = () => {
    return {
        // Red fix: Using highly saturated red base (Tailwind Red 600 equivalent)
        Star: "220, 38, 38",

        // Blue fix: Using saturated blue base (Tailwind Blue 600 equivalent)
        ClipboardList: "37, 99, 235",

        BookOpen: "147, 51, 234",     // Purple 600
        FileText: "71, 85, 105",      // Slate 600
        MessageSquare: "5, 150, 105"  // Teal 600
    };
};
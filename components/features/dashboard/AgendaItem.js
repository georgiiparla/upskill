"use client";

import { useState, useRef, useEffect, useMemo } from 'react';
import {
    ClipboardList, Pencil, X, Check, BookOpen,
    FileText, MessageSquare, Star, Link as LinkIcon, MoreHorizontal
} from 'lucide-react';
import { clientFetch } from '@/lib/client-api';
import { useAuth } from '@/context/AuthContext';
import toast from 'react-hot-toast';
import { useTheme } from 'next-themes';
import tinycolor from 'tinycolor2';

import { BlurOverlay } from '../../core/layout/BlurOverlay';
import { DetailActionButton } from '../../core/buttons/Buttons';
import { BackgroundGradientAnimation } from '@/components/ui/BackgroundGradientAnimation';

// --- BASE COLOR CONFIGURATION ---
const BASE_COLORS = {
    ClipboardList: '#3b82f6', // Blue 500
    BookOpen: '#a855f7',      // Purple 500
    FileText: '#737373',      // Neutral 500
    MessageSquare: '#10b981', // Emerald 500
    Star: '#f43f5e',          // Rose 500
    Default: '#64748b'        // Slate
};

// --- ICON MAPPING ---
const ICON_MAP = {
    ClipboardList: { component: ClipboardList, colorKey: 'ClipboardList' },
    BookOpen: { component: BookOpen, colorKey: 'BookOpen' },
    FileText: { component: FileText, colorKey: 'FileText' },
    MessageSquare: { component: MessageSquare, colorKey: 'MessageSquare' },
    Star: { component: Star, colorKey: 'Star' },
};

// --- UTILITY: RGB String Formatter ---
const toRgbString = (colorObj) => {
    const { r, g, b } = colorObj.toRgb();
    return `${r}, ${g}, ${b}`;
};

// --- GRADIENT GENERATOR (Dark Mode Only) ---
const generateGradientTheme = (baseColorHex, isMantra) => {
    const base = tinycolor(baseColorHex);
    // Dark Mode Anchor
    const slateBase = '#0f172a'; // Slate 900

    // Background: Slightly stronger tint to establish the pastel "atmosphere"
    const bgStart = tinycolor.mix(slateBase, base, 12);
    const bgEnd = tinycolor(slateBase);

    // DARK MODE: SOFT PASTELS / MATTE LOOK
    // Strategy: 
    // 1. Desaturate (~20%): Removes the harsh "neon" intensity.
    // 2. Less Darkening (10-20%): Keeps the color lighter and "chalkier".
    // 3. Lower Alpha (0.5-0.6): Blends the lighter color smoothly into the dark bg.

    // Primary: Soft, Hazy Pastel
    const color1 = base.clone().darken(10).desaturate(20).setAlpha(0.6);

    // Secondary: Muted, smoother shift
    const color2 = base.clone().darken(15).desaturate(25).spin(15).setAlpha(0.5);

    // Tertiary: Background wash
    const color3 = base.clone().darken(20).desaturate(30).spin(-15).setAlpha(0.5);

    // Ambient: Faint undertone
    const color4 = base.clone().darken(25).desaturate(30).setAlpha(0.4);

    // Anchor: Fades to background
    const color5 = tinycolor(slateBase);

    return {
        gradientBackgroundStart: bgStart.toRgbString(),
        gradientBackgroundEnd: bgEnd.toRgbString(),
        firstColor: toRgbString(color1),
        secondColor: toRgbString(color2),
        thirdColor: toRgbString(color3),
        fourthColor: toRgbString(color4),
        fifthColor: toRgbString(color5),
        pointerColor: toRgbString(base.clone().setAlpha(0.3))
    };
};

const IconDisplay = ({ name, ...props }) => {
    const Icon = ICON_MAP[name]?.component || ClipboardList;
    return <Icon {...props} />;
};

// --- ITEM CONTENT COMPONENT ---
const ItemContent = ({ isEditing, item, isSystemMantra, setIsMenuOpen, isMenuOpen, isDark }) => {
    // TEXT COLORS
    const titleClass = isEditing
        ? 'text-slate-900 dark:text-white'
        : (isDark ? 'text-white' : 'text-slate-900');

    const subtitleLabelClass = isEditing
        ? 'text-slate-500 dark:text-slate-400'
        : (isDark ? 'text-slate-400' : 'text-slate-500');

    const subtitleValueClass = isEditing
        ? 'text-slate-700 dark:text-slate-300'
        : (isDark ? 'text-slate-200' : 'text-slate-700');

    // MENU ICON
    const menuIconClass = isEditing
        ? 'text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-700'
        : (isDark ? 'text-white/60 hover:text-white hover:bg-white/20' : 'text-slate-400 hover:text-slate-900 hover:bg-slate-100');

    // --- ICON & COLOR LOGIC ---
    const iconKey = item.icon_name || 'ClipboardList';
    const baseColor = BASE_COLORS[ICON_MAP[iconKey]?.colorKey] || BASE_COLORS.Default;

    // Badge Styles
    const badgeStyle = isDark ? {
        // Dark Mode: White Glass Background + COLORED Icon
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        color: baseColor, // Using specific color (e.g. Blue) instead of White
        boxShadow: 'none'
    } : {
        // Light Mode: Tinted Background + COLORED Icon
        backgroundColor: tinycolor(baseColor).setAlpha(0.1).toRgbString(),
        color: baseColor,
        boxShadow: 'none'
    };

    return (
        <div className={`relative rounded-lg h-full flex flex-col transition-all duration-300 z-10
            ${isEditing ? 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 shadow-xl' : 'bg-transparent'}
        `}>
            {/* Icon Badge */}
            <div
                className={`absolute left-4 top-1/2 -translate-y-1/2 flex items-center justify-center h-8 w-8 rounded-lg backdrop-blur-md transition-all duration-300 ${isEditing ? 'opacity-0 scale-0' : 'opacity-100 scale-100'}`}
                style={badgeStyle}
            >
                <IconDisplay name={item.icon_name} className="h-4 w-4" />
            </div>

            <div className={`py-8 px-4 ${isEditing ? 'pl-6' : 'pl-16'} flex-1 flex flex-col justify-center`}>
                <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                        <h3 className={`font-medium text-sm sm:text-base md:text-lg mb-2 break-words drop-shadow-sm ${titleClass}`}>
                            {item.title}
                        </h3>

                        <div className={`text-xs ${subtitleLabelClass}`}>
                            {item.editor_username ? (
                                <>Updated by <span className={`font-medium ${subtitleValueClass}`}>{item.editor_username}</span></>
                            ) : isSystemMantra ? (
                                <>Updated by <span className={`font-medium ${subtitleValueClass}`}>System</span></>
                            ) : null}
                        </div>
                    </div>

                    {!isSystemMantra && (
                        <div className="relative z-20">
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setIsMenuOpen(!isMenuOpen);
                                }}
                                title="More options"
                                className={`flex-shrink-0 p-2 rounded-lg transition-all ${menuIconClass}`}
                            >
                                <MoreHorizontal className="h-4 w-4" />
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

// --- MAIN COMPONENT ---
export const AgendaItem = ({ item, onUpdate, isEditing, setEditingItemId }) => {
    const [title, setTitle] = useState(item.title);
    const [iconName, setIconName] = useState(item.icon_name);
    const [link, setLink] = useState(item.link || '');
    const [isLoading, setIsLoading] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const dropdownRef = useRef(null);
    const { refreshNavbarPoints } = useAuth();
    const { theme, systemTheme } = useTheme();

    const currentTheme = theme === 'system' ? systemTheme : theme;
    const isDark = currentTheme === 'dark';

    const isSystemMantra = item.is_system_mantra;
    const MAX_CHARS = 94;
    const MAX_LINK_CHARS = 2048;

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (!isMenuOpen) return;
            if (dropdownRef.current && dropdownRef.current.contains(event.target)) {
                return;
            }
            setIsMenuOpen(false);
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isMenuOpen]);

    const handleSave = async () => {
        const hasTitleChanged = title.trim() !== item.title;
        const hasIconChanged = iconName !== item.icon_name;
        const hasLinkChanged = link.trim() !== (item.link || '');

        if (!hasTitleChanged && !hasIconChanged && !hasLinkChanged) {
            setEditingItemId(null);
            return;
        }

        setIsLoading(true);
        const payload = {
            title: title.trim(),
            icon_name: iconName,
            link: link.trim()
        };

        const response = await clientFetch(`/agenda_items/${item.id}`, {
            method: 'PATCH',
            body: payload
        });
        setIsLoading(false);

        if (response.success) {
            onUpdate(response.data);
            setEditingItemId(null);
            toast.success("Focus item updated!");
            refreshNavbarPoints();
        } else {
            toast.error(`Error: ${response.error}`);
        }
    };

    const handleCancel = () => {
        setTitle(item.title);
        setIconName(item.icon_name);
        setLink(item.link || '');
        setEditingItemId(null);
    };

    // --- PREPARE STYLES ---
    const colorKey = isSystemMantra ? 'Star' : (ICON_MAP[item.icon_name]?.colorKey || 'ClipboardList');
    const baseColor = BASE_COLORS[colorKey];

    // Dark Mode: Calculate Gradient Config
    const gradientConfig = useMemo(() => {
        if (!isDark) return null;
        return generateGradientTheme(baseColor, isSystemMantra);
    }, [baseColor, isSystemMantra, isDark]);

    // Light Mode: Border Style
    const lightModeStyle = !isDark ? {
        // Adjust '0.3' to change opacity (0.1 = fainter, 0.5 = stronger)
        borderColor: tinycolor(baseColor).setAlpha(0.4).toRgbString(),
        borderWidth: '1px',
        backgroundColor: '#ffffff'
    } : {};

    return (
        <>
            {isEditing && <BlurOverlay />}
            <div className={`group relative transition-all duration-300 h-full ${isEditing ? 'z-50 scale-[1.02]' : ''}`}>

                {isEditing ? (
                    // EDIT MODE
                    <div className="relative rounded-lg bg-white dark:bg-slate-900 transition-all duration-300 h-full flex flex-col border border-slate-200 dark:border-slate-700 shadow-2xl">
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center justify-center h-8 w-8 opacity-0"></div>

                        <div className="py-8 px-4 pl-6 flex-1 flex flex-col justify-center">
                            <div className="space-y-4">
                                <div className="flex items-center gap-2">
                                    {Object.keys(ICON_MAP).map(name => {
                                        const isActive = iconName === name;
                                        const btnColor = BASE_COLORS[ICON_MAP[name].colorKey];
                                        const btnStyle = isActive
                                            ? { backgroundColor: tinycolor(btnColor).setAlpha(0.1).toRgbString(), color: btnColor, borderColor: btnColor }
                                            : { backgroundColor: 'transparent', color: '#64748b', borderColor: 'transparent' };

                                        return (
                                            <button
                                                key={name}
                                                onClick={() => setIconName(name)}
                                                style={btnStyle}
                                                className={`p-2.5 rounded-lg border transition-all ${isActive ? 'scale-110' : 'hover:bg-slate-100 dark:hover:bg-slate-800'}`}
                                            >
                                                <IconDisplay name={name} className="h-4 w-4" />
                                            </button>
                                        );
                                    })}
                                </div>
                                <div className="relative">
                                    <input
                                        type="text"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                        maxLength={MAX_CHARS}
                                        className="w-full px-4 py-3 pr-16 text-base sm:text-lg border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-slate-300 dark:focus:ring-slate-600 focus:border-slate-300 dark:focus:border-slate-600 outline-none transition-all"
                                        autoFocus
                                        placeholder="Enter focus item..."
                                    />
                                    <div className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 dark:text-slate-500 font-medium pointer-events-none">{title.length}/{MAX_CHARS}</div>
                                </div>
                                <div className="relative">
                                    <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 dark:text-slate-500" />
                                    <input
                                        type="url"
                                        value={link}
                                        onChange={(e) => setLink(e.target.value)}
                                        maxLength={MAX_LINK_CHARS}
                                        placeholder="Add a link (optional)"
                                        className="w-full pl-10 pr-4 py-2.5 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-slate-300 dark:focus:ring-slate-600 focus:border-slate-300 dark:focus:border-slate-600 outline-none transition-all placeholder:text-slate-400 dark:placeholder:text-slate-500"
                                    />
                                </div>
                                <div className="flex justify-end gap-2 pt-2">
                                    <DetailActionButton icon={X} text="Cancel" colorScheme="gray" onClick={handleCancel} disabled={isLoading} />
                                    <DetailActionButton icon={Check} text="Save" colorScheme="blue" onClick={handleSave} isLoading={isLoading} />
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    // VIEW MODE
                    <div
                        className={`w-full h-full rounded-xl overflow-hidden relative 
                            ${isDark
                                ? 'bg-slate-900 border border-slate-700/50 shadow-lg'
                                : 'bg-white'
                            }
                        `}
                        style={lightModeStyle}
                    >
                        {isDark ? (
                            /* DARK MODE: Gradient Animation */
                            <BackgroundGradientAnimation
                                containerClassName="rounded-xl"
                                size="120%"
                                {...gradientConfig}
                            >
                                {/* --- MASK OVERLAY LAYER ---
                                    Adjust opacity class below to control brightness/contrast of the gradient.
                                    - bg-slate-950/40 = Default (Balanced)
                                    - bg-slate-950/60 = Darker, less color
                                    - bg-slate-950/20 = Brighter, neon-like
                                */}
                                <div className="absolute inset-0 z-1 bg-slate-950/40 pointer-events-none transition-all duration-300" />

                                <ItemContent
                                    isEditing={false}
                                    item={item}
                                    isSystemMantra={isSystemMantra}
                                    setIsMenuOpen={setIsMenuOpen}
                                    isMenuOpen={isMenuOpen}
                                    setEditingItemId={setEditingItemId}
                                    isDark={isDark}
                                />
                            </BackgroundGradientAnimation>
                        ) : (
                            /* LIGHT MODE: Simple Content Wrapper */
                            <div className="relative w-full h-full">
                                <ItemContent
                                    isEditing={false}
                                    item={item}
                                    isSystemMantra={isSystemMantra}
                                    setIsMenuOpen={setIsMenuOpen}
                                    isMenuOpen={isMenuOpen}
                                    setEditingItemId={setEditingItemId}
                                    isDark={isDark}
                                />
                            </div>
                        )}
                    </div>
                )}

                {/* DROPDOWN MENU */}
                {isMenuOpen && !isEditing && (
                    <div
                        ref={dropdownRef}
                        className="absolute right-4 z-50 w-48 origin-top-right rounded-xl shadow-2xl ring-1 ring-black/5 focus:outline-none
                            bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl
                            border border-slate-200/60 dark:border-slate-700/60"
                        style={{
                            top: '50%',
                            marginTop: '1.25rem'
                        }}
                    >
                        <div className="py-1">
                            <button
                                onClick={() => {
                                    setEditingItemId(item.id);
                                    setIsMenuOpen(false);
                                }}
                                className="w-full text-left flex items-center gap-2.5 px-4 py-2.5 text-sm transition-colors
                                    text-slate-700 dark:text-slate-200 
                                    hover:bg-slate-100 dark:hover:bg-slate-800/80
                                "
                            >
                                <Pencil className="h-4 w-4 text-slate-400 dark:text-slate-500" />
                                <span>Edit item</span>
                            </button>
                            {item.link && (
                                <a
                                    href={item.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={() => setIsMenuOpen(false)}
                                    className="w-full text-left flex items-center gap-2.5 px-4 py-2.5 text-sm transition-colors
                                        text-slate-700 dark:text-slate-200 
                                        hover:bg-slate-100 dark:hover:bg-slate-800/80
                                    "
                                >
                                    <LinkIcon className="h-4 w-4 text-slate-400 dark:text-slate-500" />
                                    <span>Open link</span>
                                </a>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};
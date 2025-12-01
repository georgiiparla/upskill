"use client";

import { useState, useRef, useEffect } from 'react';
import {
    ClipboardList, Pencil, X, Check, BookOpen,
    FileText, MessageSquare, Star, Link as LinkIcon, MoreHorizontal
} from 'lucide-react';
import { clientFetch } from '@/lib/client-api';
import { useAuth } from '@/context/AuthContext';
import toast from 'react-hot-toast';
import { BlurOverlay } from '../../core/layout/BlurOverlay';
import { DetailActionButton } from '../../core/buttons/Buttons';

const ICON_MAP = {
    ClipboardList: {
        component: ClipboardList,
        colors: "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400",
        ring: "ring-blue-500",
        border: "border-blue-200",
        subtleBg: "from-blue-50/60 to-slate-50/40 dark:from-blue-900/20 dark:to-slate-800/30"
    },
    BookOpen: {
        component: BookOpen,
        colors: "bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400",
        ring: "ring-purple-500",
        border: "border-purple-200",
        subtleBg: "from-purple-50/60 to-slate-50/40 dark:from-purple-900/20 dark:to-slate-800/30"
    },
    FileText: {
        component: FileText,
        colors: "bg-slate-50 dark:bg-slate-700/20 text-slate-600 dark:text-slate-400",
        ring: "ring-slate-500",
        border: "border-slate-200",
        subtleBg: "from-slate-50/60 to-slate-50/40 dark:from-slate-800/20 dark:to-slate-800/30"
    },
    MessageSquare: {
        component: MessageSquare,
        colors: "bg-teal-50 dark:bg-teal-900/20 text-teal-600 dark:text-teal-400",
        ring: "ring-teal-500",
        border: "border-teal-200",
        subtleBg: "from-teal-50/60 to-slate-50/40 dark:from-teal-900/20 dark:to-slate-800/30"
    },
    Star: {
        component: Star,
        colors: "bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400",
        ring: "ring-red-500",
        border: "border-red-200",
        subtleBg: "from-red-50/60 to-slate-50/40 dark:from-red-900/20 dark:to-slate-800/30"
    },
};

const IconDisplay = ({ name, ...props }) => {
    const Icon = ICON_MAP[name]?.component || ClipboardList;
    return <Icon {...props} />;
};

export const AgendaItem = ({ item, onUpdate, isEditing, setEditingItemId, isFirst }) => {
    const [title, setTitle] = useState(item.title);
    const [iconName, setIconName] = useState(item.icon_name);
    const [link, setLink] = useState(item.link || '');
    const [isLoading, setIsLoading] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuRef = useRef(null);
    const { refreshNavbarPoints } = useAuth();
    const isSystemMantra = item.is_system_mantra;

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsMenuOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const MAX_CHARS = 94; // Existing limit for Title
    const MAX_LINK_CHARS = 2048; // Limit for URL

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

    const activeIconName = isEditing ? iconName : item.icon_name;
    const currentIcon = ICON_MAP[activeIconName] || ICON_MAP.ClipboardList;

    return (
        <>
            {isEditing && <BlurOverlay />}
            <div className={`group relative transition-all duration-300 h-full ${isEditing ? 'z-50 scale-[1.02]' : ''}`}>
                <div className={`relative rounded-lg bg-gradient-to-br ${currentIcon.subtleBg}  transition-all duration-300 h-full flex flex-col border ${currentIcon.border} dark:border-transparent ${isEditing
                    ? `ring-2 ${currentIcon.ring} shadow-2xl shadow-csway-green/20`
                    : ''
                    }`}>
                    {/* Icon badge */}
                    <div className={`absolute left-4 top-1/2 -translate-y-1/2 flex items-center justify-center h-8 w-8 rounded-lg ${currentIcon.colors} transition-all duration-300 ${isEditing ? 'opacity-0 scale-0' : 'opacity-100 scale-100'}`}>
                        <IconDisplay name={item.icon_name} className="h-4 w-4" />
                    </div>

                    <div className={`py-8 px-4 ${isEditing ? 'pl-6' : 'pl-16'} flex-1 flex flex-col justify-center`}>
                        {isEditing ? (
                            <div className="space-y-4">
                                {/* Icon selector */}
                                <div className="flex items-center gap-2">
                                    {Object.keys(ICON_MAP).map(name => (
                                        <button
                                            key={name}
                                            onClick={() => setIconName(name)}
                                            className={`p-2.5 rounded-lg transition-all ${ICON_MAP[name].colors} ${iconName === name ? `ring-2 ${ICON_MAP[name].ring} scale-110` : 'scale-100 hover:scale-105'
                                                }`}
                                        >
                                            <IconDisplay name={name} className="h-4 w-4" />
                                        </button>
                                    ))}
                                </div>

                                {/* Title input */}
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
                                    <div className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 dark:text-slate-500 font-medium pointer-events-none">
                                        {title.length}/{MAX_CHARS}
                                    </div>
                                </div>

                                {/* Link input */}
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

                                {/* Action buttons */}
                                <div className="flex justify-end gap-2 pt-2">
                                    <DetailActionButton
                                        icon={X}
                                        text="Cancel"
                                        colorScheme="gray"
                                        onClick={handleCancel}
                                        disabled={isLoading}
                                    />
                                    <DetailActionButton
                                        icon={Check}
                                        text="Save"
                                        colorScheme="blue"
                                        onClick={handleSave}
                                        isLoading={isLoading}
                                    />
                                </div>
                            </div>
                        ) : (
                            <>
                                <div className="flex items-start justify-between gap-4">
                                    <div className="flex-1 min-w-0">
                                        <h3 className={`font-medium text-sm sm:text-base md:text-lg text-slate-900 dark:text-white mb-2 break-words ${isFirst ? '' : ''}`}>
                                            {item.title}
                                        </h3>
                                        {item.editor_username ? (
                                            <p className="text-xs text-slate-500 dark:text-slate-400">
                                                Updated by <span className="font-medium text-slate-700 dark:text-slate-300">{item.editor_username}</span>
                                            </p>
                                        ) : isSystemMantra ? (
                                            <p className="text-xs text-slate-500 dark:text-slate-400">
                                                Updated by <span className="font-medium text-slate-700 dark:text-slate-300">System</span>
                                            </p>
                                        ) : null}
                                    </div>

                                    {!isSystemMantra && (
                                        <div className="relative" ref={menuRef}>
                                            <button
                                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                                                title="More options"
                                                className="flex-shrink-0 p-2 rounded-lg text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-700 transition-all"
                                            >
                                                <MoreHorizontal className="h-4 w-4" />
                                            </button>
                                            {isMenuOpen && (
                                                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-slate-800 rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 py-1 z-50">
                                                    <button
                                                        onClick={() => {
                                                            setEditingItemId(item.id);
                                                            setIsMenuOpen(false);
                                                        }}
                                                        className="w-full text-left flex items-center gap-2 px-4 py-2 text-sm text-slate-700 dark:text-slate-200"
                                                    >
                                                        <Pencil className="h-4 w-4" />
                                                        <span>Edit item</span>
                                                    </button>
                                                    {item.link && (
                                                        <a
                                                            href={item.link}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            onClick={() => setIsMenuOpen(false)}
                                                            className="w-full text-left flex items-center gap-2 px-4 py-2 text-sm text-slate-700 dark:text-slate-200"
                                                        >
                                                            <LinkIcon className="h-4 w-4" />
                                                            <span>Open link</span>
                                                        </a>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};
"use client";

import { useState } from 'react';
import {
    ClipboardList, Pencil, X, Check, BookOpen,
    FileText, MessageSquare, Lightbulb, Link as LinkIcon
} from 'lucide-react';
import { clientFetch } from '@/lib/client-api';
import { useAuth } from '@/context/AuthContext';
import toast from 'react-hot-toast';
import { BlurOverlay } from '../../core/layout/BlurOverlay';
import { DetailActionButton } from '../../core/buttons/Buttons';

const ICON_MAP = {
    ClipboardList: {
        component: ClipboardList,
        colors: "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 border-blue-200/50 dark:border-blue-700/30",
        ring: "ring-blue-500",
    },
    BookOpen: {
        component: BookOpen,
        colors: "bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 border-purple-200/50 dark:border-purple-700/30",
        ring: "ring-purple-500",
    },
    FileText: {
        component: FileText,
        colors: "bg-slate-50 dark:bg-slate-700/20 text-slate-600 dark:text-slate-400 border-slate-200/50 dark:border-slate-600/30",
        ring: "ring-slate-500",
    },
    MessageSquare: {
        component: MessageSquare,
        colors: "bg-teal-50 dark:bg-teal-900/20 text-teal-600 dark:text-teal-400 border-teal-200/50 dark:border-teal-700/30",
        ring: "ring-teal-500",
    },
    Lightbulb: {
        component: Lightbulb,
        colors: "bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400 border-amber-200/50 dark:border-amber-700/30",
        ring: "ring-amber-500",
    },
};

const IconDisplay = ({ name, ...props }) => {
    const Icon = ICON_MAP[name]?.component || ClipboardList;
    return <Icon {...props} />;
};

export const AgendaItem = ({ item, onUpdate, isEditing, setEditingItemId }) => {
    const [title, setTitle] = useState(item.title);
    const [iconName, setIconName] = useState(item.icon_name);
    const [link, setLink] = useState(item.link || '');
    const [isLoading, setIsLoading] = useState(false);
    const { refreshNavbarPoints } = useAuth();

    const MAX_CHARS = 94;

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

    const currentIcon = ICON_MAP[item.icon_name] || ICON_MAP.ClipboardList;

    return (
        <>
            {isEditing && <BlurOverlay />}
            <div className={`group relative transition-all duration-300 ${isEditing ? 'z-50 scale-[1.02]' : ''}`}>
                <div className={`relative overflow-hidden rounded-xl bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm border transition-all duration-300 ${
                    isEditing 
                        ? 'border-csway-green shadow-2xl shadow-csway-green/20' 
                        : 'border-slate-200/50 dark:border-slate-700/50 hover:border-slate-300/80 dark:hover:border-slate-600/80 hover:shadow-lg'
                }`}>
                    {/* Icon badge */}
                    <div className={`absolute left-4 top-4 flex items-center justify-center h-8 w-8 rounded-lg border ${currentIcon.colors} transition-all duration-300 ${isEditing ? 'opacity-0 scale-0' : 'opacity-100 scale-100'}`}>
                        <IconDisplay name={item.icon_name} className="h-4 w-4" />
                    </div>

                    <div className="p-6 pl-16">
                        {isEditing ? (
                            <div className="space-y-4">
                                {/* Icon selector */}
                                <div className="flex items-center gap-2">
                                    {Object.keys(ICON_MAP).map(name => (
                                        <button
                                            key={name}
                                            onClick={() => setIconName(name)}
                                            className={`p-2.5 rounded-lg transition-all border ${ICON_MAP[name].colors} ${
                                                iconName === name ? `ring-2 ${ICON_MAP[name].ring} scale-110` : 'scale-100 hover:scale-105'
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
                                        className="w-full px-4 py-3 pr-20 text-lg font-semibold border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-csway-green focus:border-csway-green outline-none transition-all"
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
                                        placeholder="Add a link (optional)"
                                        className="w-full pl-10 pr-4 py-2.5 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-csway-green focus:border-csway-green outline-none transition-all placeholder:text-slate-400 dark:placeholder:text-slate-500"
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
                                        text="Save Changes"
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
                                        <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-1 flex items-center gap-2">
                                            <span className="truncate">{item.title}</span>
                                            {item.link && (
                                                <a
                                                    href={item.link}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    title="Open link"
                                                    onClick={(e) => e.stopPropagation()}
                                                    className="flex-shrink-0 inline-flex items-center justify-center h-7 w-7 rounded-lg text-slate-400 hover:text-csway-green hover:bg-slate-100 dark:hover:bg-slate-700 transition-all"
                                                >
                                                    <LinkIcon className="h-4 w-4" />
                                                </a>
                                            )}
                                        </h3>
                                    </div>

                                    <button
                                        onClick={() => setEditingItemId(item.id)}
                                        title="Edit item"
                                        className="flex-shrink-0 p-2 rounded-lg text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-700 opacity-0 group-hover:opacity-100 transition-all"
                                    >
                                        <Pencil className="h-4 w-4" />
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

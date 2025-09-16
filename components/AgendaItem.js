"use client";

import { useState } from 'react';
import {
    ClipboardList, Pencil, X, Check, Loader2, BookOpen,
    FileText, MessageSquare, Lightbulb, Link as LinkIcon, ExternalLink
} from 'lucide-react';
import { clientFetch } from '@/lib/client-api';
import toast from 'react-hot-toast';
import { formatRelativeTime } from '@/lib/helper_func';
import { BlurOverlay } from './BlurOverlay';

const ICON_MAP = {
    ClipboardList: {
        component: ClipboardList,
        colors: "bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-400",
        ring: "ring-blue-500",
    },
    BookOpen: {
        component: BookOpen,
        colors: "bg-purple-100 text-purple-600 dark:bg-purple-900 dark:text-purple-400",
        ring: "ring-purple-500",
    },
    FileText: {
        component: FileText,
        colors: "bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400",
        ring: "ring-gray-500",
    },
    MessageSquare: {
        component: MessageSquare,
        colors: "bg-teal-100 text-teal-600 dark:bg-teal-900 dark:text-teal-400",
        ring: "ring-teal-500",
    },
    Lightbulb: {
        component: Lightbulb,
        colors: "bg-amber-100 text-amber-600 dark:bg-amber-900 dark:text-amber-400",
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
            toast.success("Agenda item updated!");
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
            <li className={`mb-6 ml-6 transition-all duration-300 ease-in-out ${isEditing ? 'relative z-50 scale-[1.02]' : ''}`}>
                <span className={`absolute flex items-center justify-center w-7 h-7 rounded-full -left-3.5 transition-opacity ${currentIcon.colors} ${isEditing ? 'opacity-0 duration-0' : 'opacity-100 duration-300 delay-300'}`}>
                    <IconDisplay name={item.icon_name} className="w-4 h-4" />
                </span>
                <div className={`p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg border border-gray-200 dark:border-gray-600 relative group transition-shadow duration-300 ${isEditing ? 'shadow-2xl shadow-black/20' : 'shadow-sm'}`}>
                    {isEditing ? (
                        <div className="space-y-3">
                            <div>
                                <div className="flex items-center space-x-2 mt-1">
                                    {Object.keys(ICON_MAP).map(name => (
                                        <button
                                            key={name}
                                            onClick={() => setIconName(name)}
                                            className={`p-2 rounded-full transition-all ${ICON_MAP[name].colors} ${iconName === name ? `ring-2 ${ICON_MAP[name].ring}` : 'ring-0'}`}
                                        >
                                            <IconDisplay name={name} className="h-4" />
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <input
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                maxLength={MAX_CHARS}
                                className="w-full px-2 py-1 border rounded-md bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 outline-none"
                                autoFocus
                            />
                            <div className="relative">
                                <LinkIcon className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                                <input
                                    type="text"
                                    value={link}
                                    onChange={(e) => setLink(e.target.value)}
                                    placeholder="Add a URL..."
                                    className="w-full pl-8 pr-2 py-1 border rounded-md bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 outline-none text-sm placeholder:text-gray-400"
                                />
                            </div>
                            <div className="text-right text-xs text-gray-400 -mt-2">
                                {title.length} / {MAX_CHARS}
                            </div>
                            <div className="flex justify-end space-x-2 pt-1">
                                <button onClick={handleCancel} disabled={isLoading} className="p-1 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 disabled:opacity-50">
                                    <X className="h-4 w-4" />
                                </button>
                                <button onClick={handleSave} disabled={isLoading} className="p-1 text-green-600 hover:green-blue-800 disabled:opacity-50">
                                    {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Check className="h-4 w-4" />}
                                </button>
                            </div>
                        </div>
                    ) : (
                        <>
                            <p className="text-xs font-normal text-gray-500 dark:text-gray-400 mb-1">
                                {item.editor_username
                                    ? `Edited by ${item.editor_username} ${formatRelativeTime(item.updated_at)}`
                                    : `Last updated ${formatRelativeTime(item.updated_at)}`
                                }
                            </p>
                            <div className="flex items-center space-x-2">
                                <p className="text-base font-semibold text-gray-900 dark:text-white">{item.title}</p>
                            </div>

                            {/* This container is now responsive */}
                            <div className="absolute top-2 right-2 flex flex-col space-y-1 md:flex-row md:space-y-0 md:space-x-1 items-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                {item.link && (
                                    <a
                                        href={item.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        title="Open link"
                                        onClick={(e) => e.stopPropagation()}
                                        className="p-1.5 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-200/70 dark:hover:bg-gray-600/70"
                                    >
                                        <ExternalLink className="h-4 w-4" />
                                    </a>
                                )}
                                <button
                                    onClick={() => setEditingItemId(item.id)}
                                    title="Edit item"
                                    className="p-1.5 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-200/70 dark:hover:bg-gray-600/70"
                                >
                                    <Pencil className="h-4 w-4" />
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </li>
        </>
    );
};
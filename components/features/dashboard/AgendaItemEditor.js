// components/features/dashboard/AgendaItemEditor.js
"use client";

import { useState } from 'react';
import { X, Check, Link as LinkIcon } from 'lucide-react';
import tinycolor from 'tinycolor2';
import { DetailActionButton } from '../../core/buttons/Buttons';
import { BASE_COLORS, ICON_MAP, IconDisplay } from './agenda-shared';

export const AgendaItemEditor = ({ item, onSave, onCancel, isLoading }) => {
    const [title, setTitle] = useState(item.title);
    const [iconName, setIconName] = useState(item.icon_name);
    const [link, setLink] = useState(item.link || '');

    const MAX_CHARS = 94;
    const MAX_LINK_CHARS = 2048;

    const handleSaveClick = () => {
        onSave(title, iconName, link);
    };

    return (
        <div className="relative rounded-lg bg-white dark:bg-slate-900 transition-all duration-300 h-full flex flex-col border border-slate-200 dark:border-slate-700 shadow-2xl z-50">
            <div className="py-8 px-4 pl-6 flex-1 flex flex-col justify-center">
                <div className="space-y-4">
                    {/* Icon Selector */}
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

                    {/* Title Input */}
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

                    {/* Link Input */}
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

                    {/* Actions */}
                    <div className="flex justify-end gap-2 pt-2">
                        <DetailActionButton icon={X} text="Cancel" colorScheme="gray" onClick={onCancel} disabled={isLoading} />
                        <DetailActionButton icon={Check} text="Save" colorScheme="blue" onClick={handleSaveClick} isLoading={isLoading} />
                    </div>
                </div>
            </div>
        </div>
    );
};
"use client";
import { useEffect, useRef } from 'react';
// [!] Swapping Lucide for Tabler
import { IconPencil, IconLink } from '@tabler/icons-react';

export const AgendaItemDropdown = ({ item, isOpen, onClose, onEdit }) => {
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (!isOpen) return;
            if (dropdownRef.current && dropdownRef.current.contains(event.target)) return;
            onClose();
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <div
            ref={dropdownRef}
            className="absolute right-4 z-50 w-48 origin-top-right rounded-xl shadow-2xl ring-1 ring-black/5 focus:outline-none bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border border-slate-200/60 dark:border-slate-700/60"
            style={{ top: '50%', marginTop: '1.25rem' }}
        >
            <div className="py-1">
                <button onClick={() => { onEdit(); onClose(); }} className="w-full text-left flex items-center gap-2.5 px-4 py-2.5 text-sm transition-colors text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800/80">
                    <IconPencil className="h-4 w-4 text-slate-400 dark:text-slate-500" /><span>Edit item</span>
                </button>
                {item.link && (
                    <a href={item.link} target="_blank" rel="noopener noreferrer" onClick={() => onClose()} className="w-full text-left flex items-center gap-2.5 px-4 py-2.5 text-sm transition-colors text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800/80">
                        <IconLink className="h-4 w-4 text-slate-400 dark:text-slate-500" /><span>Open link</span>
                    </a>
                )}
            </div>
        </div>
    );
};
"use client";
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export const ConsoleDropdown = ({ title, children, hasUnviewedEvents = false, onOpen, onClose }) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleToggle = () => {
        const newState = !isOpen;
        setIsOpen(newState);
        if (newState && onOpen) onOpen();
        if (!newState && onClose) onClose();
    };

    return (
        <section className="w-full">
            <button
                onClick={handleToggle}
                className="w-full text-left group focus:outline-none"
                aria-expanded={isOpen}
                aria-controls={`console-content-${title.replace(/\s+/g, '-').toLowerCase()}`}
            >
                <div
                    className={`
                        bg-transparent 
                        border border-dashed border-slate-300/60 dark:border-slate-600/60 
                        rounded-lg p-4 
                        transition-colors duration-200 
                        hover:bg-slate-50/50 dark:hover:bg-slate-800/30
                        focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-900
                    `}
                >
                    <div className="flex items-center justify-between gap-3">
                        <div className="flex items-center gap-3">
                            {/* Header Text: JetBrains Mono */}
                            <h2
                                className="text-sm md:text-base font-medium text-slate-700 dark:text-slate-200"
                                style={{ fontFamily: "'JetBrains Mono', monospace" }}
                            >
                                {title}
                            </h2>

                            {/* Blue Glowing Indicator (Preserved Design) */}
                            {hasUnviewedEvents && (
                                <div className="relative flex items-center justify-center">
                                    <div className="w-2 h-2 bg-blue-500 rounded-full shadow-[0_0_8px_rgba(59,130,246,0.8)] animate-pulse"></div>
                                </div>
                            )}
                        </div>

                        {/* Animated Chevron: Snappy rotation */}
                        <ChevronDown
                            className={`
                                h-4 w-4 text-slate-400 
                                transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)]
                                ${isOpen ? 'rotate-180' : 'rotate-0'}
                                group-hover:text-slate-600 dark:group-hover:text-slate-300
                            `}
                        />
                    </div>
                </div>
            </button>

            {/* Performance Animation Wrapper:
               1. Uses CSS Grid (grid-template-rows) to animate height from 0 to auto without layout thrashing.
               2. Keeps content in DOM (better for scroll state) but hides it visually.
               3. Duration is tight (200ms) to feel "responsive" not "floaty".
            */}
            <div
                id={`console-content-${title.replace(/\s+/g, '-').toLowerCase()}`}
                className={`
                    grid transition-[grid-template-rows,opacity] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)]
                    ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-50'}
                `}
                aria-hidden={!isOpen}
            >
                <div className="overflow-hidden min-h-0">
                    {/* Add a tiny top margin that is only visible when open to separate content from header */}
                    <div className="pt-2">
                        {children}
                    </div>
                </div>
            </div>
        </section>
    );
};
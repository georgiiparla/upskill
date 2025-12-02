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
                        /* SOLID STYLE (Matches AgendaItem Cards) */
                        bg-white dark:bg-slate-900
                        border border-slate-200 dark:border-slate-800
                        
                        rounded-xl p-6 
                        transition-all duration-200 
                        
                        hover:border-slate-300 dark:hover:border-slate-700
                        hover:shadow-sm dark:hover:bg-slate-900/80
                        
                        focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-900
                    `}
                >
                    <div className="flex items-center justify-between gap-3">
                        <div className="flex items-center gap-3">
                            {/* Header Text: JetBrains Mono */}
                            <h2
                                className="text-sm md:text-base font-semibold text-slate-800 dark:text-slate-100"
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

                        {/* Animated Chevron */}
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

            {/* Performance Animation Wrapper */}
            <div
                id={`console-content-${title.replace(/\s+/g, '-').toLowerCase()}`}
                className={`
                    grid transition-[grid-template-rows,opacity] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)]
                    ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-50'}
                `}
                aria-hidden={!isOpen}
            >
                <div className="overflow-hidden min-h-0">
                    <div className="pt-2">
                        {children}
                    </div>
                </div>
            </div>
        </section>
    );
};
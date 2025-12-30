"use client";
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export const ConsoleDropdown = ({
    title,
    children,
    hasUnviewedEvents = false,
    onOpen,
    onClose,
    icon: Icon
}) => {
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
                        bg-white dark:bg-slate-900
                        border border-slate-200 dark:border-slate-800
                        rounded-xl
                        /* [!] Height Match: standard x-padding (px-4), responsive y-padding (py-3 md:py-5) */
                        px-4 py-3 md:py-5
                        transition-all duration-200 
                        hover:border-slate-300 dark:hover:border-slate-700
                        hover:shadow-sm dark:hover:bg-slate-900/80
                        focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-900
                    `}
                >
                    <div className="flex items-center justify-between gap-3">
                        <div className="flex items-center gap-4">
                            {/* NEUTRAL ICON BOX: Fixed w-10 h-10, Slate colors */}
                            {Icon && (
                                <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-lg transition-colors bg-slate-100 dark:bg-slate-800">
                                    <Icon className="h-5 w-5 text-slate-500 dark:text-slate-400" stroke={1.5} />
                                </div>
                            )}

                            <div className="flex items-center gap-3">
                                <h2 className="text-base md:text-lg font-bold text-slate-700 dark:text-slate-200">
                                    {title}
                                </h2>
                                {hasUnviewedEvents && (
                                    <div className="w-2 h-2 ml-2 rounded-full bg-blue-600 dark:bg-blue-500 animate-pulse" />
                                )}
                            </div>
                        </div>

                        <ChevronDown
                            className={`
                                h-5 w-5 text-slate-400 
                                transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)]
                                ${isOpen ? 'rotate-180' : 'rotate-0'}
                                group-hover:text-slate-600 dark:group-hover:text-slate-300
                            `}
                        />
                    </div>
                </div>
            </button>

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
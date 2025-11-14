"use client";
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export const ConsoleDropdown = ({ title, children, hasUnviewedEvents = false, onOpen }) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleToggle = () => {
        const newState = !isOpen;
        setIsOpen(newState);
        if (newState && onOpen) onOpen();
    };

    return (
        <section>
            <button
                onClick={handleToggle}
                className="w-full text-left"
            >
                <div className="bg-transparent border border-dashed border-slate-300/60 dark:border-slate-600/60 rounded-md p-6">
                    <div className="flex items-center justify-between gap-3">
                        <div className="flex items-center gap-3">
                            <h2 className="text-md md:text-lg font-normal text-slate-900 dark:text-white">{title}</h2>
                            {hasUnviewedEvents && (
                                <div className="w-2 h-2 bg-green-500 rounded-full" />
                            )}
                        </div>
                        <ChevronDown className={`mr-1 h-5 w-5 text-slate-600 dark:text-slate-400 flex-shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                    </div>
                </div>
            </button>

            {isOpen && children}
        </section>
    );
};

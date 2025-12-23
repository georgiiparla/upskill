"use client";
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Check } from 'lucide-react';

export const QuestFilter = ({ currentFilter, onFilterChange }) => {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef(null);

    const options = [
        { value: 'weekly', label: 'Weekly Quests' },
        { value: 'core', label: 'Core Quests' }
    ];

    const selectedOption = options.find(opt => opt.value === currentFilter);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (containerRef.current && !containerRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className="relative w-full md:w-auto" ref={containerRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`
                    w-full md:w-48 flex items-center justify-between px-4 py-2.5 rounded-xl
                    bg-white dark:bg-slate-900 
                    border border-slate-200 dark:border-slate-800
                    text-sm font-medium text-slate-700 dark:text-slate-200
                    transition-all duration-200
                    focus:outline-none focus:ring-2 focus:ring-blue-500/20
                    shadow-sm
                `}
            >
                <span className="truncate">{selectedOption?.label}</span>
                <ChevronDown
                    className={`w-4 h-4 ml-2 text-slate-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                />
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.96 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.96 }}
                        transition={{ duration: 0.15, ease: "easeOut" }}
                        className="absolute right-0 top-full mt-2 w-full md:w-56 z-50 mb-4"
                    >
                        <div className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl rounded-xl border border-slate-200/60 dark:border-slate-800/60 shadow-xl overflow-hidden p-1.5">
                            {options.map((option) => (
                                <button
                                    key={option.value}
                                    onClick={() => {
                                        onFilterChange(option.value);
                                        setIsOpen(false);
                                    }}
                                    className={`
                                        w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm transition-colors duration-150
                                        ${currentFilter === option.value
                                            ? 'bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400'
                                            : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700/50'
                                        }
                                    `}
                                >
                                    <span className="font-medium">{option.label}</span>
                                    {currentFilter === option.value && (
                                        <motion.div
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            transition={{ type: "spring", bounce: 0.5 }}
                                        >
                                            <Check className="w-4 h-4" />
                                        </motion.div>
                                    )}
                                </button>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

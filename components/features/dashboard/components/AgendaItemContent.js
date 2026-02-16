"use client";
import { IconDots } from '@tabler/icons-react';

export const AgendaItemContent = ({ item, isSystemMantra, onMenuToggle }) => {
    return (
        <div className="relative h-full flex flex-col z-20 pointer-events-none">
            <div className="py-8 px-6 md:py-10 md:px-8 flex-1 flex flex-col justify-center pointer-events-auto">
                <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                        <h3
                            className="font-bold text-xl md:text-2xl leading-tight mb-2 break-words drop-shadow-sm text-[var(--accent-light)] dark:text-[var(--accent-dark)]"
                        >
                            {item.title}
                        </h3>

                        <div className="text-sm text-slate-500 dark:text-slate-400">
                            {item.editor_username ? (
                                <>Updated by <span className="font-medium text-slate-700 dark:text-slate-200">{item.editor_username}</span></>
                            ) : isSystemMantra ? (
                                <>Updated by <span className="font-medium text-slate-700 dark:text-slate-200">System</span></>
                            ) : null}
                        </div>
                    </div>
                    {!isSystemMantra && (
                        <div className="relative z-20 -mr-2 -mt-2">
                            <button
                                onClick={(e) => { e.stopPropagation(); onMenuToggle(); }}
                                className="flex-shrink-0 p-2 rounded-lg transition-all text-slate-400 hover:text-slate-900 hover:bg-slate-100 dark:text-white/60 dark:hover:text-white dark:hover:bg-white/20"
                            >
                                <IconDots className="h-5 w-5" stroke={1.5} />
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
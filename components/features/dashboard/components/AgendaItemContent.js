"use client";
import { IconDots } from '@tabler/icons-react';

export const AgendaItemContent = ({ item, isSystemMantra, isDark, onMenuToggle, textColor }) => {
    return (
        <div className="relative h-full flex flex-col z-20 pointer-events-none">
            <div className="py-8 px-6 md:py-10 md:px-8 flex-1 flex flex-col justify-center pointer-events-auto">
                <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                        <h3
                            className="font-bold text-xl md:text-2xl leading-tight mb-2 break-words drop-shadow-sm"
                            style={{ color: textColor }}
                        >
                            {item.title}
                        </h3>

                        <div className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                            {item.editor_username ? (
                                <>Updated by <span className={`font-medium ${isDark ? 'text-slate-200' : 'text-slate-700'}`}>{item.editor_username}</span></>
                            ) : isSystemMantra ? (
                                <>Updated by <span className={`font-medium ${isDark ? 'text-slate-200' : 'text-slate-700'}`}>System</span></>
                            ) : null}
                        </div>
                    </div>
                    {!isSystemMantra && (
                        <div className="relative z-20 -mr-2 -mt-2">
                            <button
                                onClick={(e) => { e.stopPropagation(); onMenuToggle(); }}
                                className={`flex-shrink-0 p-2 rounded-lg transition-all ${isDark ? 'text-white/60 hover:text-white hover:bg-white/20' : 'text-slate-400 hover:text-slate-900 hover:bg-slate-100'}`}
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
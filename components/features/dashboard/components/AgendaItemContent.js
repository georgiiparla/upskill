"use client";

import { MoreHorizontal } from 'lucide-react';
import { IconDisplay } from '../agenda-shared';

export const AgendaItemContent = ({ item, isSystemMantra, isDark, onMenuToggle, badgeStyle }) => {
    return (
        <div className="relative h-full flex flex-col z-20 pointer-events-none">
            {/* Badge */}
            <div className="absolute left-6 top-1/2 -translate-y-1/2 flex items-center justify-center h-8 w-8 rounded-lg backdrop-blur-md" style={badgeStyle}>
                <IconDisplay name={item.icon_name} className="h-4 w-4" />
            </div>

            <div className="py-10 px-6 pl-20 flex-1 flex flex-col justify-center pointer-events-auto">
                <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                        <h3 className={`font-bold text-lg sm:text-xl md:text-2xl mb-2 break-words drop-shadow-sm ${isDark ? 'text-slate-200' : 'text-slate-700'}`}>
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
                        <div className="relative z-20">
                            <button
                                onClick={(e) => { e.stopPropagation(); onMenuToggle(); }}
                                className={`flex-shrink-0 p-2 rounded-lg transition-all ${isDark ? 'text-white/60 hover:text-white hover:bg-white/20' : 'text-slate-400 hover:text-slate-900 hover:bg-slate-100'}`}
                            >
                                <MoreHorizontal className="h-4 w-4" />
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

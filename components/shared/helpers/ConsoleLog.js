"use client";

import React, { useState } from 'react'; // Added useState

export const ConsoleLog = ({ children, maxHeight = "max-h-[300px]" }) => {
    // Local state to handle the "Minimize" interaction
    const [isMinimized, setIsMinimized] = useState(false);

    return (
        <div
            className={`
                mt-4 
                bg-white/50 dark:bg-slate-950/50 
                border border-slate-200 dark:border-slate-800 
                rounded-xl 
                shadow-sm
                backdrop-blur-md
                overflow-hidden
                flex flex-col
                transition-all duration-300 ease-in-out
                ${isMinimized ? 'h-auto' : ''} /* Allow height to adjust when minimized */
            `}
        >
            {/* Window Controls - Now Interactive Buttons */}
            <div className="flex gap-2 px-4 py-3 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">

                {/* Red: Minimize/Close Action */}
                <button
                    onClick={() => setIsMinimized(true)}
                    className="w-2.5 h-2.5 rounded-full bg-red-500/80 border border-red-600/20 hover:bg-red-600 hover:scale-110 active:scale-90 transition-all cursor-pointer focus:outline-none"
                    aria-label="Minimize Console"
                    title="Minimize"
                />

                {/* Amber: Minimize Action */}
                <button
                    onClick={() => setIsMinimized(true)}
                    className="w-2.5 h-2.5 rounded-full bg-amber-500/80 border border-amber-600/20 hover:bg-amber-600 hover:scale-110 active:scale-90 transition-all cursor-pointer focus:outline-none"
                    aria-label="Minimize Console"
                    title="Minimize"
                />

                {/* Green: Expand/Restore Action */}
                <button
                    onClick={() => setIsMinimized(false)}
                    className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 border border-emerald-600/20 hover:bg-emerald-600 hover:scale-110 active:scale-90 transition-all cursor-pointer focus:outline-none"
                    aria-label="Expand Console"
                    title="Expand"
                />
            </div>

            {/* Content Area - Conditionally rendered based on state */}
            {!isMinimized && (
                <div
                    className={`
                        p-2 md:p-4 
                        text-xs md:text-sm 
                        font-mono 
                        overflow-y-auto 
                        ${maxHeight}
                        scrollbar-thin scrollbar-thumb-slate-200 dark:scrollbar-thumb-slate-700 scrollbar-track-transparent
                        animate-fade-in /* Simple fade in when restored */
                    `}
                    style={{
                        fontFamily: "'JetBrains Mono', monospace",
                    }}
                >
                    <div className="flex flex-col gap-1">
                        {children}
                    </div>
                </div>
            )}

            {/* Optional: Placeholder text when minimized to show it's still there */}
            {isMinimized && (
                <div className="px-4 py-2 text-xs text-slate-400 font-mono italic">
                    Console minimized...
                </div>
            )}
        </div>
    );
};
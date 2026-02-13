"use client";
import React, { useState } from 'react';

export const ConsoleLog = ({ children, className = "" }) => {
    const [isMinimized, setIsMinimized] = useState(false);
    const [viewMode, setViewMode] = useState('detailed');

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
                ${isMinimized ? 'h-auto' : ''}
                ${className}
            `}
        >
            <div className="flex gap-2 px-4 py-3 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
                <button
                    onClick={() => setIsMinimized(true)}
                    className="w-2.5 h-2.5 rounded-full bg-red-500/80 border border-red-600/20 hover:bg-red-600 hover:scale-110 active:scale-90 transition-all cursor-pointer focus:outline-none"
                    aria-label="Minimize Console"
                    title="Minimize"
                />
                <button
                    onClick={() => {
                        setIsMinimized(false);
                        setViewMode('minimal');
                    }}
                    className="w-2.5 h-2.5 rounded-full bg-amber-500/80 border border-amber-600/20 hover:bg-amber-600 hover:scale-110 active:scale-90 transition-all cursor-pointer focus:outline-none"
                    aria-label="Minimal View"
                    title="Minimal View"
                />
                <button
                    onClick={() => {
                        setIsMinimized(false);
                        setViewMode('detailed');
                    }}
                    className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 border border-emerald-600/20 hover:bg-emerald-600 hover:scale-110 active:scale-90 transition-all cursor-pointer focus:outline-none"
                    aria-label="Detailed View"
                    title="Detailed View"
                />
            </div>

            {!isMinimized && (
                <div
                    className={`
                    p-2 md:p-4 
                    text-sm md:text-base 
                    font-mono 
                    h-auto
                `}
                >
                    <div className="flex flex-col gap-1">
                        {React.Children.map(children, child => {
                            if (React.isValidElement(child)) {
                                return React.cloneElement(child, { viewMode });
                            }
                            return child;
                        })}
                    </div>
                </div>
            )}

            {isMinimized && (
                <div className="px-4 py-2 text-xs text-slate-400 font-mono italic">
                    Console minimized...
                </div>
            )}
        </div>
    );
};
"use client";

export const ConsoleLog = ({ children }) => {
    return (
        <div className="mt-6 bg-white/60 dark:bg-slate-800/20 border border-slate-300/60 dark:border-slate-600/60 rounded-lg p-4 md:p-8 text-sm md:text-sm overflow-x-hidden" style={{ fontFamily: "'JetBrains Mono', monospace", wordBreak: "break-word" }}>
            <div className="space-y-1">
                {children}
            </div>
        </div>
    );
};

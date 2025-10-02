"use client";

const MetricItem = ({ icon, label, allTime, thisWeek }) => (
    <div className="group bg-gradient-to-br from-slate-50/60 to-slate-100/40 dark:from-slate-800/60 dark:to-slate-700/40 p-5 rounded-xl border border-slate-200/40 dark:border-slate-700/40 hover:shadow-md transition-all duration-200 hover:scale-[1.02]">
        <div className="flex items-start space-x-4">
            <div className="flex-shrink-0 mt-1 p-1.5 bg-white/60 dark:bg-slate-900/60 rounded-lg shadow-sm group-hover:shadow-md transition-shadow duration-200">{icon}</div>
            <div className="flex flex-col flex-1 min-w-0">
                <span className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">{label}</span>
                <div className="flex items-baseline space-x-3">
                    <span className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">{allTime.toLocaleString()}</span>
                    {Number(thisWeek) > 0 && (
                        <span className="text-sm font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20 px-2 py-1 rounded-full">+{thisWeek.toLocaleString()} this week</span>
                    )}
                </div>
            </div>
        </div>
    </div>
);

export { MetricItem };

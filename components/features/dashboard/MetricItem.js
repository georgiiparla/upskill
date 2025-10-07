"use client";

const MetricItem = ({ icon, label, allTime, thisWeek }) => (
    <div className="group bg-white dark:bg-slate-800 p-3 md:p-5 rounded-xl border border-slate-200 dark:border-slate-700">
        <div className="flex items-start space-x-3 md:space-x-4">
            <div className="flex-shrink-0 mt-1 p-1.5 bg-white dark:bg-slate-900 rounded-lg shadow-sm">{icon}</div>
            <div className="flex flex-col flex-1 min-w-0">
                <span className="text-xs md:text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">{label}</span>
                <div className="flex items-baseline space-x-2 md:space-x-3">
                    <span className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white tracking-tight">{allTime.toLocaleString()}</span>
                    {Number(thisWeek) > 0 && (
                        <span className="text-xs md:text-sm font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20 px-2 py-1 rounded-full">+{thisWeek.toLocaleString()} this week</span>
                    )}
                </div>
            </div>
        </div>
    </div>
);

export { MetricItem };

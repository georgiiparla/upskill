export default function DashboardSkeleton() {
    return (
        <div className="space-y-12 animate-pulse">
            {/* Agenda Items */}
            <div className="space-y-4 pt-24">
                {/*<div className="h-6 w-1/4 bg-slate-200/60 dark:bg-slate-700/60 rounded mb-6"></div>*/}
                {[...Array(3)].map((_, i) => (
                    <div key={i} className="relative bg-white/80 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-lg p-8 pl-16">
                        {/* Icon badge */}
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 h-8 w-8 bg-slate-200/60 dark:bg-slate-700/60 rounded-lg"></div>
                        <div className="flex-1 space-y-2">
                            <div className="h-5 w-1/2 bg-slate-200/60 dark:bg-slate-700/60 rounded"></div>
                            <div className="h-3 w-1/3 bg-slate-200/60 dark:bg-slate-700/60 rounded"></div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Console/Activity Stream */}
            <div className="space-y-4">
                <div className="h-6 w-1/4 bg-slate-200/60 dark:bg-slate-700/60 rounded mb-6"></div>
                <div className="bg-white/80 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-lg p-4 h-[250px]">
                    <div className="space-y-2">
                        {/* Activity lines */}
                        {[...Array(7)].map((_, i) => (
                            <div key={i} className="h-3 w-3/4 bg-slate-200/60 dark:bg-slate-700/60 rounded"></div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
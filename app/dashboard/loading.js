export default function DashboardSkeleton() {
    return (
        <div className="space-y-12 animate-pulse pt-8">
            {/* Agenda Items */}
            <div className="space-y-3 pt-0">
                {[...Array(5)].map((_, i) => (
                    <div key={i} className="relative bg-white/80 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-lg p-10 pl-16">
                        {/* Icon badge */}
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 h-8 w-8 bg-slate-200/60 dark:bg-slate-700/60 rounded-lg"></div>
                        <div className="flex-1 space-y-2">
                            <div className="h-5 w-2/3 bg-slate-200/60 dark:bg-slate-700/60 rounded"></div>
                            <div className="h-3 w-1/4 bg-slate-200/60 dark:bg-slate-700/60 rounded"></div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
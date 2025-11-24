export default function DashboardSkeleton() {
    return (
        <div className="space-y-8 animate-pulse pb-16 pt-3">
            {/* This Week's Agenda Card */}
            <section className="bg-slate-100/20 dark:bg-slate-800/20 border border-slate-200 dark:border-slate-700 rounded-xl p-8">
                <div className="flex items-center gap-4 mb-8">
                    <div className="w-10 h-10 rounded-lg bg-slate-200/60 dark:bg-slate-700/60"></div>
                    <div className="flex-1 space-y-2">
                        <div className="h-6 w-1/3 bg-slate-200/60 dark:bg-slate-700/60 rounded"></div>
                        <div className="h-4 w-2/3 bg-slate-200/60 dark:bg-slate-700/60 rounded"></div>
                    </div>
                </div>

                {/* Agenda Items Grid */}
                <div className="grid grid-cols-1 gap-4 auto-rows-fr">
                    {[...Array(3)].map((_, i) => (
                        <div key={i} className="relative bg-gradient-to-br from-slate-50 to-slate-50/40 dark:from-slate-900/40 dark:to-slate-900/20 border border-slate-200/60 dark:border-slate-700/60 rounded-xl p-8 pl-16">
                            {/* Icon badge */}
                            <div className="absolute left-4 top-1/2 -translate-y-1/2 h-8 w-8 bg-slate-200/60 dark:bg-slate-700/60 rounded-lg"></div>
                            <div className="flex-1 space-y-2">
                                <div className="h-5 w-2/3 bg-slate-200/60 dark:bg-slate-700/60 rounded"></div>
                                <div className="h-3 w-1/4 bg-slate-200/60 dark:bg-slate-700/60 rounded"></div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Dashboard Card */}
            <section className="bg-slate-100/20 dark:bg-slate-800/20 border border-slate-200 dark:border-slate-700 rounded-xl p-8">
                <div className="space-y-6">
                    <div className="flex items-center gap-4 mb-8">
                        <div className="w-10 h-10 rounded-lg bg-slate-200/60 dark:bg-slate-700/60"></div>
                        <div className="flex-1 space-y-2">
                            <div className="h-6 w-1/3 bg-slate-200/60 dark:bg-slate-700/60 rounded"></div>
                            <div className="h-4 w-2/3 bg-slate-200/60 dark:bg-slate-700/60 rounded"></div>
                        </div>
                    </div>

                    {/* Quick Action Buttons */}
                    <div className="flex gap-4">
                        {[...Array(2)].map((_, i) => (
                            <div key={i} className="flex-1 flex items-center gap-3 px-4 py-3 rounded-xl border border-dashed border-slate-300/40 dark:border-slate-600/40 bg-transparent">
                                <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-slate-200/60 dark:bg-slate-700/60"></div>
                                <div className="flex-1 h-4 w-24 bg-slate-200/60 dark:bg-slate-700/60 rounded"></div>
                            </div>
                        ))}
                    </div>

                    {/* Console Dropdowns */}
                    <div className="space-y-4">
                        {[...Array(2)].map((_, i) => (
                            <div key={i} className="bg-transparent border border-dashed border-slate-300/60 dark:border-slate-600/60 rounded-xl p-6">
                                <div className="h-6 w-1/3 bg-slate-200/60 dark:bg-slate-700/60 rounded"></div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
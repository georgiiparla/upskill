import { HeroHeaderSkeleton, CardSkeleton } from "@/components/ui/loading/Skeletons";

export default function DashboardSkeleton() {
    return (
        <div className="w-full space-y-8 pb-10 animate-pulse">

            <HeroHeaderSkeleton />

            <div className="flex flex-col gap-10">

                <div className="grid grid-cols-1 gap-5 auto-rows-fr">
                    {[...Array(3)].map((_, i) => (
                        <div key={i} className="h-full">
                            <div className="relative rounded-lg bg-slate-100/40 dark:bg-slate-800/20 border border-slate-200/60 dark:border-slate-700/60 h-full flex flex-col">
                                <div className="py-8 px-6 md:py-10 md:px-8 flex-1 flex flex-col justify-center">
                                    <div className="space-y-3">
                                        <div className="h-8 w-3/4 bg-slate-200/60 dark:bg-slate-700/60 rounded"></div>
                                        <div className="h-4 w-1/4 bg-slate-200/60 dark:bg-slate-700/60 rounded"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="flex flex-row gap-4">
                    {[...Array(2)].map((_, i) => (
                        <div key={i} className="flex-1 flex items-center justify-center md:justify-start gap-3 px-3 md:px-5 py-3 md:py-5 rounded-xl border border-slate-200/60 dark:border-slate-700/60 bg-slate-50/50 dark:bg-slate-800/30 min-w-0 h-[72px]">
                            <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-slate-200/60 dark:bg-slate-700/60"></div>
                            <div className="h-4 w-20 md:w-32 bg-slate-200/60 dark:bg-slate-700/60 rounded"></div>
                        </div>
                    ))}
                </div>

                <div className="space-y-6">
                    {[...Array(2)].map((_, i) => (
                        <div key={i} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 md:py-5">
                            <div className="flex items-center justify-between gap-3">
                                <div className="flex items-center gap-4">
                                    <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                                        <div className="h-5 w-5 bg-slate-200 dark:bg-slate-700 rounded"></div>
                                    </div>
                                    <div className="h-5 w-40 bg-slate-200 dark:bg-slate-700 rounded"></div>
                                </div>
                                <div className="h-5 w-5 bg-slate-200 dark:bg-slate-700 rounded"></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
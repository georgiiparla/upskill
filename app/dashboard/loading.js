import { CardSkeleton, TextSkeleton } from "@/components/shared/loading/Skeletons";

const SectionHeaderSkeleton = () => (
    <div className="flex items-center gap-4 mb-8">
        <div className="flex-shrink-0">
            <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-gray-100 dark:bg-gray-800 shadow-sm">
                <div className="h-5 w-5 bg-slate-200/60 dark:bg-slate-700/60 rounded"></div>
            </div>
        </div>
        <div className="flex-1 min-w-0 space-y-2">
            <div className="h-6 w-48 bg-slate-200/60 dark:bg-slate-700/60 rounded"></div>
            <div className="h-4 w-64 bg-slate-200/60 dark:bg-slate-700/60 rounded"></div>
        </div>
    </div>
);

export default function DashboardSkeleton() {
    return (
        <div className="space-y-8 animate-pulse pb-16 pt-3">
            {/* This Week's Agenda Card */}
            {/* innerClassName matches Dashboard.js exactly */}
            <CardSkeleton innerClassName="pt-3 px-3 pb-8">
                <SectionHeaderSkeleton />

                {/* Agenda Items Grid - Matches Dashboard.js grid-cols-1 gap-5 */}
                <div className="grid grid-cols-1 gap-5 auto-rows-fr">
                    {[...Array(3)].map((_, i) => (
                        <div key={i} className="h-full">
                            {/* Matches AgendaItem.js structure & classes */}
                            <div className="relative rounded-lg bg-slate-100/40 dark:bg-slate-800/20 border border-slate-200/60 dark:border-slate-700/60 h-full flex flex-col">
                                {/* Icon badge - Positioned exactly as in AgendaItem */}
                                <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center justify-center h-8 w-8 rounded-lg bg-slate-200/60 dark:bg-slate-700/60"></div>

                                {/* Padding matches AgendaItem: py-8 px-4 pl-16 */}
                                <div className="py-8 px-4 pl-16 flex-1 flex flex-col justify-center">
                                    <div className="space-y-2">
                                        <div className="h-5 w-3/4 bg-slate-200/60 dark:bg-slate-700/60 rounded"></div>
                                        <div className="h-3 w-1/4 bg-slate-200/60 dark:bg-slate-700/60 rounded"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </CardSkeleton>

            {/* Dashboard Section Card */}
            <CardSkeleton innerClassName="pt-3 px-3 pb-8">
                <div className="space-y-6">
                    <SectionHeaderSkeleton />

                    {/* Quick Action Buttons - Matches Dashboard.js flex gap-4 */}
                    <div className="flex gap-4">
                        {[...Array(2)].map((_, i) => (
                            // Matches QuickActionButton structure: px-3 md:px-5 py-3 md:py-5
                            <div key={i} className="flex-1 flex items-center justify-center md:justify-start gap-3 px-3 md:px-5 py-3 md:py-5 rounded-md border border-dashed border-slate-300/40 dark:border-slate-600/40 bg-transparent min-w-0">
                                <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-slate-200/60 dark:bg-slate-700/60"></div>
                                <div className="hidden md:block h-4 w-24 bg-slate-200/60 dark:bg-slate-700/60 rounded"></div>
                            </div>
                        ))}
                    </div>

                    {/* Console Dropdowns - Matches ConsoleDropdown structure */}
                    <div className="space-y-4">
                        {[...Array(2)].map((_, i) => (
                            <div key={i} className="bg-transparent border border-dashed border-slate-300/60 dark:border-slate-600/60 rounded-md p-6">
                                <div className="flex items-center justify-between gap-3">
                                    <div className="flex items-center gap-3">
                                        <div className="h-5 w-40 bg-slate-200/60 dark:bg-slate-700/60 rounded"></div>
                                    </div>
                                    <div className="h-5 w-5 bg-slate-200/60 dark:bg-slate-700/60 rounded"></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </CardSkeleton>
        </div>
    );
}
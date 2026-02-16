import { HeroHeaderSkeleton } from "@/components/ui/loading/Skeletons";

const QuestCardSkeleton = () => {
    return (
        <div className="animate-pulse relative w-full">
            <div className="bg-white/90 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm min-h-[320px] flex flex-col w-full overflow-hidden relative">

                <div className="relative z-10 flex flex-col w-full h-full p-6 md:p-8">

                    <div className="w-full flex justify-center mb-8">
                        <div className="flex gap-1.5 opacity-50">
                            <div className="w-6 h-1.5 rounded-full bg-slate-200 dark:bg-slate-700"></div>
                            <div className="w-1.5 h-1.5 rounded-full bg-slate-200 dark:bg-slate-700"></div>
                            <div className="w-1.5 h-1.5 rounded-full bg-slate-200 dark:bg-slate-700"></div>
                        </div>
                    </div>

                    <div className="flex-1 flex flex-col items-center justify-center text-center space-y-6">
                        {/* Title Skeleton */}
                        <div className="h-8 md:h-10 bg-slate-200 dark:bg-slate-700 rounded w-2/3 md:w-1/2 mx-auto"></div>

                        {/* Description Skeleton */}
                        <div className="space-y-3 w-full max-w-lg mx-auto">
                            <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-full"></div>
                            <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-5/6 mx-auto"></div>
                            <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-4/6 mx-auto"></div>
                        </div>

                        {/* Badge Skeleton */}
                        <div className="pt-4">
                            <div className="h-8 w-24 bg-slate-200 dark:bg-slate-700 rounded-full"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default function QuestsLoading() {
    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                <div className="flex-1">
                    <HeroHeaderSkeleton />
                </div>

                {/* Filter Skeleton - Matches QuestFilter dimensions and placement */}
                <div className="flex justify-start md:justify-end w-full md:w-auto min-w-[192px]">
                    <div className="w-full md:w-48 h-[42px] bg-slate-200 dark:bg-slate-700/60 rounded-xl animate-pulse" />
                </div>
            </div>

            <div className="w-full">
                <QuestCardSkeleton />
            </div>
        </div>
    );
}
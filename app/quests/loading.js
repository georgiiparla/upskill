import { Card } from "@/components/shared/helpers/Helper";

const HeroHeaderSkeleton = () => (
    <div className="flex items-center gap-6 animate-pulse py-6">
        <div className="flex-shrink-0">
            <div className="w-14 h-14 bg-gray-300 dark:bg-gray-700 rounded-xl"></div>
        </div>

        <div className="flex-1 min-w-0">
            <div className="space-y-2">
                <div className="h-8 bg-gray-300 dark:bg-gray-700 rounded w-40"></div>
                <div className="h-5 bg-gray-300 dark:bg-gray-700 rounded w-56"></div>
            </div>
        </div>
    </div>
);

const QuestCardSkeleton = () => {
    return (
        <div className="animate-pulse relative">
            {/* Card container with gradient background */}
            <div className="bg-gradient-to-br from-slate-50/60 via-pink-50/40 to-gray-50/80 dark:from-slate-900/20 dark:via-pink-900/10 dark:to-gray-900/30 border border-slate-300/60 dark:border-slate-700/60 shadow-lg shadow-pink-500/20 rounded-xl min-h-[400px] max-h-[500px] flex flex-col mx-auto max-w-5xl overflow-hidden relative">

                {/* Content area */}
                <div className="flex-1 flex flex-col items-center justify-center text-center px-8 py-6 relative">
                    <div className="space-y-6 max-w-3xl w-full">
                        {/* Title skeleton */}
                        <div className="space-y-2">
                            <div className="h-8 bg-gray-300 dark:bg-gray-700 rounded w-3/4 mx-auto"></div>
                            <div className="h-8 bg-gray-300 dark:bg-gray-700 rounded w-1/2 mx-auto"></div>
                        </div>

                        {/* Description skeleton */}
                        <div className="space-y-3 max-w-2xl mx-auto">
                            <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-full"></div>
                            <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-4/5 mx-auto"></div>
                            <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-3/4 mx-auto"></div>
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
            {/* Hero Header Skeleton */}
            <HeroHeaderSkeleton />

            {/* Quest grid with updated layout */}
            <div className="grid grid-cols-1 gap-8 max-w-6xl mx-auto">
                <QuestCardSkeleton />
            </div>
        </div>
    );
}
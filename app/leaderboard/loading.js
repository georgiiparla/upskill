import { Award, Trophy } from 'lucide-react';
// Reusable Skeletons
const CardSkeleton = ({ children, className = '' }) => (
    <div className={`p-6 bg-white dark:bg-gray-800/50 rounded-xl border border-gray-200 dark:border-gray-700 ${className}`}>
        {children}
    </div>
);
const SectionTitleSkeleton = () => (
    <div className="h-7 w-1/2 bg-gray-300 dark:bg-gray-700 rounded mb-4"></div>
);

const PodiumSkeleton = () => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
        {/* 2nd Place Skeleton */}
        <div className="md:order-1">
            <CardSkeleton className="text-center p-4 !border-gray-300 !dark:border-gray-600">
                <div className="h-10 w-10 mx-auto mb-2 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
                <div className="h-6 w-3/4 mx-auto bg-gray-300 dark:bg-gray-700 rounded"></div>
                <div className="h-4 w-1/2 mx-auto mt-2 bg-gray-300 dark:bg-gray-700 rounded"></div>
                <div className="h-8 w-1/3 mx-auto mt-2 bg-gray-300 dark:bg-gray-700 rounded"></div>
            </CardSkeleton>
        </div>
        {/* 1st Place Skeleton */}
        <div className="md:order-2 relative z-10">
            <CardSkeleton className="text-center p-6 !border-csway-orange dark:border-csway-orange transform md:scale-110 shadow-lg">
                <div className="h-12 w-12 mx-auto mb-2 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
                <div className="h-7 w-3/4 mx-auto bg-gray-300 dark:bg-gray-700 rounded"></div>
                <div className="h-5 w-1/2 mx-auto mt-2 bg-gray-300 dark:bg-gray-700 rounded"></div>
                <div className="h-9 w-1/3 mx-auto mt-2 bg-gray-300 dark:bg-gray-700 rounded"></div>
            </CardSkeleton>
        </div>
        {/* 3rd Place Skeleton */}
        <div className="md:order-3">
            <CardSkeleton className="text-center p-4 !border-csway-red/50 dark:border-csway-red/80">
                <div className="h-10 w-10 mx-auto mb-2 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
                <div className="h-6 w-3/4 mx-auto bg-gray-300 dark:bg-gray-700 rounded"></div>
                <div className="h-4 w-1/2 mx-auto mt-2 bg-gray-300 dark:bg-gray-700 rounded"></div>
                <div className="h-8 w-1/3 mx-auto mt-2 bg-gray-300 dark:bg-gray-700 rounded"></div>
            </CardSkeleton>
        </div>
    </div>
);

const LadderSkeleton = () => (
    <CardSkeleton>
        <div className="overflow-x-auto">
            <div className="space-y-4 p-2">
                {[...Array(5)].map((_, i) => (
                    <div key={i} className="flex items-center space-x-4">
                        <div className="h-6 w-6 bg-gray-300 dark:bg-gray-700 rounded"></div>
                        <div className="h-6 flex-1 bg-gray-300 dark:bg-gray-700 rounded"></div>
                        <div className="h-6 w-1/4 bg-gray-300 dark:bg-gray-700 rounded"></div>
                    </div>
                ))}
            </div>
        </div>
    </CardSkeleton>
);

export default function LeaderboardLoading() {
    return (
        <div className="space-y-12 animate-pulse">
            <div>
                <SectionTitleSkeleton />
                <PodiumSkeleton />
            </div>
            <div>
                <SectionTitleSkeleton />
                <LadderSkeleton />
            </div>
        </div>
    );
}
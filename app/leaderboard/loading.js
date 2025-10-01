const HeroHeaderSkeleton = () => (
    <div className="flex items-center gap-6 animate-pulse py-6">
        <div className="flex-shrink-0">
            <div className="w-14 h-14 bg-gray-300 dark:bg-gray-700 rounded-xl"></div>
        </div>

        <div className="flex-1 min-w-0">
            <div className="space-y-2">
                <div className="h-8 bg-gray-300 dark:bg-gray-700 rounded w-48"></div>
                <div className="h-5 bg-gray-300 dark:bg-gray-700 rounded w-64"></div>
            </div>
        </div>
    </div>
);

const CardSkeleton = ({ children, className = '' }) => (
    <div className={`bg-white/50 dark:bg-gray-800/50 backdrop-blur-lg rounded-xl border border-white/20 shadow-md ${className}`}>
        <div className="p-4">{children}</div>
    </div>
);

const LeaderboardSkeleton = () => (
    <div className="animate-pulse">
        {/* Desktop Bars Layout */}
        <div className="hidden lg:block space-y-4">
            {[...Array(5)].map((_, i) => (
                <CardSkeleton key={i} className="p-2">
                    <div className="flex items-center justify-between">
                        {/* Left Side: Rank, Avatar, Name */}
                        <div className="flex items-center gap-4">
                            {/* Rank Badge */}
                            <div className="h-8 w-8 bg-gray-300 dark:bg-gray-700 rounded-full"></div>

                            {/* Avatar */}
                            <div className="h-12 w-12 bg-gray-300 dark:bg-gray-700 rounded-full"></div>

                            {/* Name */}
                            <div className="h-5 w-24 bg-gray-300 dark:bg-gray-700 rounded"></div>
                        </div>

                        {/* Center: Progress Bar */}
                        <div className="flex-1 max-w-3xl mx-8">
                            <div className="w-full h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                                {/* Simple progress bar */}
                                <div className="h-full bg-gray-300 dark:bg-gray-600 rounded-full"></div>
                            </div>
                        </div>

                        {/* Right Side: Points */}
                        <div className="text-right">
                            <div className="h-5 w-16 bg-gray-300 dark:bg-gray-700 rounded mb-1"></div>
                            <div className="h-3 w-8 bg-gray-300 dark:bg-gray-700 rounded"></div>
                        </div>
                    </div>
                </CardSkeleton>
            ))}
        </div>

        {/* Mobile Cards */}
        <div className="lg:hidden space-y-3">
            {[...Array(5)].map((_, i) => (
                <CardSkeleton key={i} className="p-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            {/* Rank Badge */}
                            <div className="h-6 w-6 bg-gray-300 dark:bg-gray-700 rounded-full"></div>

                            {/* Avatar */}
                            <div className="h-10 w-10 bg-gray-300 dark:bg-gray-700 rounded-full"></div>

                            {/* Name */}
                            <div className="h-5 w-20 bg-gray-300 dark:bg-gray-700 rounded"></div>
                        </div>

                        {/* Points */}
                        <div className="text-right">
                            <div className="h-4 w-12 bg-gray-300 dark:bg-gray-700 rounded mb-1"></div>
                            <div className="h-3 w-8 bg-gray-300 dark:bg-gray-700 rounded"></div>
                        </div>
                    </div>
                </CardSkeleton>
            ))}
        </div>
    </div>
);

export default function LeaderboardLoading() {
    return (
        <div className="space-y-8">
            {/* Hero Header Skeleton */}
            <HeroHeaderSkeleton />

            {/* Leaderboard Skeleton */}
            <LeaderboardSkeleton />
        </div>
    );
}
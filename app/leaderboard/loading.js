import { CardSkeleton, TextSkeleton, HeroHeaderSkeleton } from "@/components/ui/loading/Skeletons";

// Matches LeaderboardItem styling
const ItemContainerSkeleton = ({ children, className = '' }) => (
    <div className={`bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-200/50 dark:border-gray-700/50 ${className}`}>
        {children}
    </div>
);

const LeaderboardSkeleton = () => (
    <div className="animate-pulse">
        {/* Desktop Layout - Matches DesktopLeaderboard.js */}
        <div className="hidden lg:block space-y-4">
            {[...Array(5)].map((_, i) => (
                // Matches LeaderboardItem (Desktop) padding: p-6
                <ItemContainerSkeleton key={i} className="p-6">
                    <div className="flex items-center">
                        {/* Left Side: Fixed Width w-80 */}
                        <div className="flex items-center gap-4 w-80 flex-shrink-0">
                            {/* Avatar: w-12 h-12 */}
                            <div className="w-12 h-12 bg-slate-300 dark:bg-slate-700 rounded-full shadow-md"></div>
                            {/* Name */}
                            <div className="h-5 w-32 bg-slate-300 dark:bg-slate-700 rounded"></div>
                        </div>

                        {/* Center: Progress Bar - Flex-1, mx-8 */}
                        <div className="flex-1 mx-8">
                            <div className="w-full h-3 bg-slate-200 dark:bg-slate-700 rounded-full"></div>
                        </div>

                        {/* Right Side: Fixed Width w-20 */}
                        <div className="text-right w-20 flex-shrink-0">
                            <div className="h-6 w-12 bg-slate-300 dark:bg-slate-700 rounded ml-auto mb-1"></div>
                            <div className="h-3 w-6 bg-slate-200 dark:bg-slate-700 rounded ml-auto"></div>
                        </div>
                    </div>
                </ItemContainerSkeleton>
            ))}
        </div>

        {/* Mobile Layout - Matches MobileLeaderboard.js */}
        <div className="lg:hidden space-y-3">
            {[...Array(5)].map((_, i) => (
                // Matches LeaderboardItem (Mobile) padding: p-4
                <ItemContainerSkeleton key={i} className="p-4">
                    <div className="flex items-center justify-between">
                        {/* Left Side */}
                        <div className="flex items-center gap-3">
                            {/* Avatar: w-10 h-10 */}
                            <div className="h-10 w-10 bg-slate-300 dark:bg-slate-700 rounded-full"></div>
                            {/* Name */}
                            <div className="h-5 w-24 bg-slate-300 dark:bg-slate-700 rounded"></div>
                        </div>

                        {/* Right Side */}
                        <div className="text-right">
                            <div className="h-5 w-12 bg-slate-300 dark:bg-slate-700 rounded mb-1 ml-auto"></div>
                        </div>
                    </div>
                </ItemContainerSkeleton>
            ))}
        </div>
    </div>
);

export default function LeaderboardLoading() {
    return (
        <div className="mx-auto w-full space-y-8">
            <HeroHeaderSkeleton />
            <LeaderboardSkeleton />
        </div>
    );
}
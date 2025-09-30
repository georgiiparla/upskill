const SectionTitleSkeleton = () => (
    <div className="flex items-center mb-8 animate-pulse">
        <div className="h-6 w-6 bg-gray-300 dark:bg-gray-700 rounded"></div>
        <div className="h-6 w-48 bg-gray-300 dark:bg-gray-700 rounded ml-3"></div>
    </div>
);

const CardSkeleton = ({ children, className = '' }) => (
    <div className={`bg-white/50 dark:bg-gray-800/50 backdrop-blur-lg rounded-xl border border-white/20 shadow-md ${className}`}>
        <div className="p-6">{children}</div>
    </div>
);

const PodiumSkeleton = () => (
    <div className="animate-pulse">
        {/* Mobile Layout */}
        <div className="grid grid-cols-1 md:hidden gap-6 items-end px-4">
            {[...Array(3)].map((_, i) => (
                <CardSkeleton key={i}>
                    <div className="text-center">
                        <div className="h-16 w-16 mx-auto mb-4 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
                        <div className="h-6 w-3/4 mx-auto mb-2 bg-gray-300 dark:bg-gray-700 rounded"></div>
                        <div className="h-4 w-1/2 mx-auto mb-3 bg-gray-300 dark:bg-gray-700 rounded"></div>
                        <div className="h-8 w-1/3 mx-auto bg-gray-300 dark:bg-gray-700 rounded"></div>
                    </div>
                </CardSkeleton>
            ))}
        </div>

        {/* Desktop Layout */}
        <div className="hidden md:grid grid-cols-3 gap-6 items-end px-4 min-h-[300px]">
            {/* 2nd place */}
            <CardSkeleton>
                <div className="text-center">
                    <div className="h-16 w-16 mx-auto mb-4 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
                    <div className="h-6 w-3/4 mx-auto mb-2 bg-gray-300 dark:bg-gray-700 rounded"></div>
                    <div className="h-4 w-1/2 mx-auto mb-3 bg-gray-300 dark:bg-gray-700 rounded"></div>
                    <div className="h-8 w-1/3 mx-auto bg-gray-300 dark:bg-gray-700 rounded"></div>
                </div>
            </CardSkeleton>
            
            {/* 1st place - larger */}
            <CardSkeleton className="transform md:scale-110 shadow-lg">
                <div className="text-center">
                    <div className="h-20 w-20 mx-auto mb-4 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
                    <div className="h-7 w-3/4 mx-auto mb-2 bg-gray-300 dark:bg-gray-700 rounded"></div>
                    <div className="h-5 w-1/2 mx-auto mb-3 bg-gray-300 dark:bg-gray-700 rounded"></div>
                    <div className="h-9 w-1/3 mx-auto bg-gray-300 dark:bg-gray-700 rounded"></div>
                </div>
            </CardSkeleton>
            
            {/* 3rd place */}
            <CardSkeleton>
                <div className="text-center">
                    <div className="h-16 w-16 mx-auto mb-4 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
                    <div className="h-6 w-3/4 mx-auto mb-2 bg-gray-300 dark:bg-gray-700 rounded"></div>
                    <div className="h-4 w-1/2 mx-auto mb-3 bg-gray-300 dark:bg-gray-700 rounded"></div>
                    <div className="h-8 w-1/3 mx-auto bg-gray-300 dark:bg-gray-700 rounded"></div>
                </div>
            </CardSkeleton>
        </div>
    </div>
);

const LeaderboardTableSkeleton = () => (
    <div className="animate-pulse">
        {/* Desktop Table */}
        <div className="hidden md:block">
            <CardSkeleton className="overflow-hidden border-0 shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead className="bg-gray-50 dark:bg-gray-800/50">
                            <tr>
                                <th className="px-6 py-4 text-left">
                                    <div className="h-4 w-12 bg-gray-300 dark:bg-gray-700 rounded"></div>
                                </th>
                                <th className="px-6 py-4 text-left">
                                    <div className="h-4 w-16 bg-gray-300 dark:bg-gray-700 rounded"></div>
                                </th>
                                <th className="px-6 py-4 text-left">
                                    <div className="h-4 w-20 bg-gray-300 dark:bg-gray-700 rounded"></div>
                                </th>
                                <th className="px-6 py-4 text-right">
                                    <div className="h-4 w-16 bg-gray-300 dark:bg-gray-700 rounded ml-auto"></div>
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                            {[...Array(7)].map((_, i) => (
                                <tr key={i} className="bg-white dark:bg-gray-800">
                                    <td className="px-6 py-4">
                                        <div className="h-8 w-8 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center space-x-3">
                                            <div className="h-8 w-8 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
                                            <div className="h-5 w-24 bg-gray-300 dark:bg-gray-700 rounded"></div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="w-32">
                                            <div className="h-2.5 w-full bg-gray-300 dark:bg-gray-700 rounded-full"></div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="h-5 w-16 bg-gray-300 dark:bg-gray-700 rounded ml-auto"></div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </CardSkeleton>
        </div>

        {/* Mobile Cards */}
        <div className="md:hidden space-y-3">
            {[...Array(7)].map((_, i) => (
                <CardSkeleton key={i} className="p-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            <div className="h-10 w-10 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
                            <div>
                                <div className="h-5 w-20 bg-gray-300 dark:bg-gray-700 rounded mb-2"></div>
                                <div className="flex items-center space-x-2">
                                    <div className="w-20 h-1.5 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
                                    <div className="h-3 w-8 bg-gray-300 dark:bg-gray-700 rounded"></div>
                                </div>
                            </div>
                        </div>
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
        <div className="space-y-12">
            {/* Top Performers Section */}
            <div className="animate-fade-in">
                <SectionTitleSkeleton />
                <PodiumSkeleton />
            </div>
            
            {/* Leaderboard Section */}
            <div className="animate-fade-in">
                <SectionTitleSkeleton />
                <LeaderboardTableSkeleton />
                
                {/* Legend */}
                <div className="mt-6 text-center animate-pulse">
                    <div className="h-4 w-64 bg-gray-300 dark:bg-gray-700 rounded mx-auto"></div>
                </div>
            </div>
        </div>
    );
}
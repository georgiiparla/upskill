import { CardSkeleton } from "@/components/shared/skeletons/Skeletons";

export default function DashboardSkeleton() {
    return (
        <div className="space-y-8 animate-pulse">

            <CardSkeleton className="!py-16">
                <div className="h-7 w-1/2 bg-gray-300 dark:bg-gray-700 rounded mb-7"></div>
                <div className="relative border-l border-gray-200 dark:border-gray-700 ml-3 space-y-6">
                    {[...Array(3)].map((_, i) => (
                        <div key={i} className="ml-6 flex items-center space-x-4">
                            <div className="absolute w-6 h-6 bg-gray-300 dark:bg-gray-700 rounded-full -left-3"></div>
                            <div className="p-4 bg-gray-200 dark:bg-gray-700/50 rounded-lg h-16 w-full"></div>
                        </div>
                    ))}
                </div>
            </CardSkeleton>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

                <div className="md:col-span-1">
                    <CardSkeleton className='h-full flex flex-col justify-between'>

                        <div className="flex space-x-1 rounded-lg bg-gray-300 dark:bg-gray-700 p-1 h-10">
                            <div className="w-full rounded-md bg-white dark:bg-gray-800"></div>
                            <div className="w-full rounded-md"></div>
                        </div>

                        <div className="space-y-4 w-full mt-4">
                            <div className="border border-gray-200 dark:border-gray-700 p-4 rounded-lg h-[88px]">
                                <div className="flex items-start space-x-4">
                                    <div className="h-6 w-6 rounded-md bg-gray-300 dark:bg-gray-600 mt-1"></div>
                                    <div className="flex-1 space-y-2">
                                        <div className="h-4 w-3/4 rounded bg-gray-300 dark:bg-gray-600"></div>
                                        <div className="flex items-baseline space-x-2">
                                            <div className="h-6 w-1/4 rounded bg-gray-300 dark:bg-gray-600"></div>
                                            <div className="h-4 w-1/3 rounded bg-gray-300 dark:bg-gray-600"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="border border-gray-200 dark:border-gray-700 p-4 rounded-lg h-[88px]">
                                <div className="flex items-start space-x-4">
                                    <div className="h-6 w-6 rounded-md bg-gray-300 dark:bg-gray-600 mt-1"></div>
                                    <div className="flex-1 space-y-2">
                                        <div className="h-4 w-3/4 rounded bg-gray-300 dark:bg-gray-600"></div>
                                        <div className="flex items-baseline space-x-2">
                                            <div className="h-6 w-1/4 rounded bg-gray-300 dark:bg-gray-600"></div>
                                            <div className="h-4 w-1/3 rounded bg-gray-300 dark:bg-gray-600"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </CardSkeleton>
                </div>

                <div className="md:col-span-2">
                    <CardSkeleton>
                        <div className="h-7 w-1/2 bg-gray-300 dark:bg-gray-700 rounded mb-4"></div>
                        <div className="space-y-4">
                            {[...Array(3)].map((_, i) => (
                                <div key={i} className="flex items-start space-x-4 p-3">
                                    <div className="h-5 w-5 bg-gray-300 dark:bg-gray-700 rounded-full mt-1"></div>
                                    <div className="flex-1 space-y-2">
                                        <div className="h-4 w-3/4 bg-gray-300 dark:bg-gray-700 rounded"></div>
                                        <div className="h-3 w-1/4 bg-gray-300 dark:bg-gray-700 rounded"></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardSkeleton>
                </div>
            </div>
        </div>
    );
}
import { CardSkeleton, TextSkeleton, SectionTitleSkeleton } from "@/components/shared/loading/Skeletons";

const AliasItemSkeleton = () => (
    <div className="h-12 bg-gray-200 dark:bg-gray-700/50 rounded-lg" />
);

export default function AccountLoading() {
    return (
        <div className="space-y-8 animate-pulse">
            {/* Skeleton for the Hero Section */}
            <CardSkeleton>
                <div className="flex flex-col items-center text-center sm:flex-row sm:text-left sm:space-x-6">
                    <div className="w-24 h-24 bg-gray-300 dark:bg-gray-700 rounded-full mb-4 sm:mb-0 shrink-0" />
                    <div className="space-y-2 w-full">
                        <TextSkeleton className="h-8 w-1/2 mx-auto sm:mx-0 sm:w-1/3" />
                        <TextSkeleton className="h-5 w-3/4 mx-auto sm:mx-0 sm:w-1/2" />
                    </div>
                </div>
            </CardSkeleton>

            {/* Skeleton for the Alias Manager */}
            <CardSkeleton>
                <SectionTitleSkeleton />
                <TextSkeleton className="h-4 w-full sm:w-3/4 mb-6" />

                <div className="space-y-2 mb-6">
                    <AliasItemSkeleton />
                </div>

                <div className="flex gap-2 border-t border-gray-200 dark:border-gray-700 pt-4">
                    <div className="flex-grow h-10 bg-gray-200 dark:bg-gray-800 rounded-lg" />
                    <div className="w-10 h-10 bg-gray-300 dark:bg-gray-600 rounded-lg shrink-0" />
                </div>
            </CardSkeleton>
        </div>
    );
}
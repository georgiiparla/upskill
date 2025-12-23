import { CardSkeleton, TextSkeleton, SectionTitleSkeleton } from "@/components/ui/loading/Skeletons";

const AliasItemSkeleton = () => (
    // Matches AliasManager list item: p-3 rounded-lg
    <div className="flex justify-between items-center p-3 bg-slate-50 dark:bg-slate-800/60 rounded-lg border border-transparent">
        <TextSkeleton className="h-5 w-48" />
        <div className="h-8 w-8 rounded-full bg-slate-200 dark:bg-slate-700"></div>
    </div>
);

export default function AccountLoading() {
    return (
        <div className="space-y-8 animate-pulse">
            {/* Hero Section Skeleton */}
            <CardSkeleton>
                <div className="flex flex-col items-center text-center sm:flex-row sm:text-left sm:space-x-6">
                    {/* Avatar w-24 h-24 */}
                    <div className="w-24 h-24 bg-slate-300 dark:bg-slate-700 rounded-full mb-4 sm:mb-0 shrink-0" />
                    <div className="space-y-2 w-full">
                        {/* Username 3xl */}
                        <TextSkeleton className="h-9 w-48 mx-auto sm:mx-0" />
                        {/* Email md */}
                        <TextSkeleton className="h-5 w-64 mx-auto sm:mx-0" />
                    </div>
                </div>
            </CardSkeleton>

            {/* Alias Manager Skeleton */}
            <CardSkeleton>
                <SectionTitleSkeleton />
                <TextSkeleton className="h-4 w-3/4 mb-6" />

                <div className="mb-6 space-y-2">
                    <AliasItemSkeleton />
                    <AliasItemSkeleton />
                </div>

                {/* Form area: border-t pt-4 */}
                <div className="flex gap-2 border-t border-gray-200 dark:border-gray-700 pt-4">
                    <div className="flex-grow h-11 bg-slate-100 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700" />
                    <div className="w-11 h-11 bg-slate-300 dark:bg-slate-600 rounded-lg shrink-0" />
                </div>
            </CardSkeleton>
        </div>
    );
}
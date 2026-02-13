import { CardSkeleton, TextSkeleton, SectionTitleSkeleton } from "@/components/ui/loading/Skeletons";

const AliasItemSkeleton = () => (
    <div className="flex justify-between items-center p-3 bg-slate-50 dark:bg-slate-800/60 rounded-lg border border-transparent">
        <TextSkeleton className="h-5 w-48" />
        <div className="h-8 w-8 rounded-full bg-slate-200 dark:bg-slate-700"></div>
    </div>
);

const StatCardSkeleton = () => (
    <CardSkeleton className="flex items-center">
        <div className="w-11 h-11 rounded-full bg-slate-200 dark:bg-slate-700 mr-4 shrink-0" />
        <div className="space-y-1">
            <TextSkeleton className="h-4 w-24" />
            <TextSkeleton className="h-8 w-12" />
        </div>
    </CardSkeleton>
);

export default function AccountLoading() {
    return (
        <div className="space-y-8 animate-pulse">
            <CardSkeleton>
                <div className="flex flex-col items-center text-center sm:flex-row sm:text-left sm:space-x-6">
                    <div className="w-24 h-24 bg-slate-300 dark:bg-slate-700 rounded-full mb-4 sm:mb-0 shrink-0" />
                    <div className="space-y-1 w-full">
                        <TextSkeleton className="h-9 w-48 mx-auto sm:mx-0" />
                        <TextSkeleton className="h-5 w-64 mx-auto sm:mx-0" />
                    </div>
                </div>
            </CardSkeleton>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <StatCardSkeleton />
                <StatCardSkeleton />
            </div>

            <CardSkeleton>
                <SectionTitleSkeleton />
                <TextSkeleton className="h-4 w-3/4 mb-6" />
                <div className="mb-6 space-y-2">
                    <AliasItemSkeleton />
                </div>
                <div className="flex gap-2 border-t border-gray-200 dark:border-gray-700 pt-4">
                    <div className="flex-grow h-10 bg-slate-100 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700" />
                    <div className="w-10 h-10 bg-slate-300 dark:bg-slate-600 rounded-lg shrink-0" />
                </div>
            </CardSkeleton>
        </div>
    );
}
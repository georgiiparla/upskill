import { CardSkeleton, TextSkeleton } from "@/components/shared/loading/Skeletons";

const ListItemSkeleton = () => (
    // Matches HistoryListItem structure: py-4 px-5, border-l-4
    <div className="py-4 px-5 rounded-lg bg-slate-50/60 dark:bg-slate-800/40 border-l-4 border-slate-200 dark:border-slate-700">
        <div className="flex justify-between items-center mb-1">
            <TextSkeleton className="h-5 w-1/3 rounded" />
            <TextSkeleton className="h-3 w-16 rounded ml-2" />
        </div>
        <TextSkeleton className="h-4 w-3/4 rounded mt-2" />
    </div>
);

export default function FeedbackLoadingSkeleton() {
    return (
        <div className="space-y-8 animate-pulse">
            <CardSkeleton className="h-full flex flex-col">
                {/* Action Buttons Row - Matches Feedback.js: mb-10 */}
                <div className="flex items-center gap-4 mb-10 flex-shrink-0">
                    {[...Array(4)].map((_, i) => (
                        // Matches ActionButton dimensions: px-3 py-1.5
                        <div key={i} className="h-8 w-20 bg-slate-200/60 dark:bg-slate-700/60 rounded-md"></div>
                    ))}
                </div>

                {/* SearchBar - Matches SearchBar: mb-6 */}
                <div className="relative mb-6 flex-shrink-0">
                    <div className="w-full h-10 bg-slate-100 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700"></div>
                </div>

                {/* List Items */}
                <div className="flex-1 space-y-4">
                    {[...Array(5)].map((_, i) => (
                        <ListItemSkeleton key={i} />
                    ))}
                </div>
            </CardSkeleton>
        </div>
    );
}
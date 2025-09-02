// Reusable Skeleton for a Card component
const CardSkeleton = ({ children, className = '' }) => (
    <div className={`p-6 bg-white dark:bg-gray-800/50 rounded-xl border border-gray-200 dark:border-gray-700 ${className}`}>
        {children}
    </div>
);

// Skeleton for a line of text
const TextSkeleton = ({ className = '' }) => (
    <div className={`bg-gray-200 dark:bg-gray-700 rounded-md ${className}`} />
);

// Skeleton for a list item in the history cards
const HistoryListItemSkeleton = () => (
    <li className="bg-gray-50 dark:bg-gray-800/60 p-4 rounded-lg border-l-2 border-gray-300 dark:border-gray-600">
        <div className="flex justify-between items-center mb-2">
            <TextSkeleton className="h-4 w-2/5" />
            <TextSkeleton className="h-3 w-1/5" />
        </div>
        <TextSkeleton className="h-3 w-4/5" />
    </li>
);

// Skeleton for an item in the Focus Activity card - NOW AN <li>
const FocusActivityItemSkeleton = () => (
    <li className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800/60 rounded-lg">
        <div className="flex items-center gap-3">
            <div className="p-2 rounded-full bg-gray-200 dark:bg-gray-700">
                <div className="w-5 h-5 rounded-full bg-gray-300 dark:bg-gray-600" />
            </div>
            <TextSkeleton className="h-4 w-32" />
        </div>
        <TextSkeleton className="h-6 w-8" />
    </li>
);

export default function FeedbackLoadingSkeleton() {
    return (
        <div className="animate-pulse space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                
                {/* Feedback History Skeleton */}
                <CardSkeleton className="lg:col-span-8 flex flex-col">
                    <div className="flex justify-between items-center mb-6">
                        <TextSkeleton className="h-6 w-48" />
                        <TextSkeleton className="h-8 w-28 rounded-md" />
                    </div>
                    {/* 👇 CHANGED from <div> to <ul> */}
                    <ul className="space-y-4 list-none">
                        {[...Array(4)].map((_, i) => <HistoryListItemSkeleton key={`feedback-hist-${i}`} />)}
                    </ul>
                </CardSkeleton>
                
                {/* ... Feedback Sentiment Chart Skeleton (unchanged) ... */}
                <CardSkeleton className="lg:col-span-4">
                    <div className="flex justify-between items-center">
                        <TextSkeleton className="h-5 w-36" />
                        <TextSkeleton className="h-8 w-40 rounded-md" />
                    </div>
                    <div className="relative flex justify-center items-center my-4 h-[200px]">
                        <div className="h-48 w-48 rounded-full bg-gray-200 dark:bg-gray-700" />
                        <div className="absolute h-40 w-40 rounded-full bg-white dark:bg-gray-800/50" />
                        <TextSkeleton className="absolute h-8 w-10" />
                    </div>
                    <div className="mt-4 space-y-3">
                        {[...Array(3)].map((_, i) => (
                            <div key={`legend-${i}`} className="flex items-center justify-between text-sm">
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 rounded-full bg-gray-300 dark:bg-gray-600" />
                                    <TextSkeleton className="h-4 w-32" />
                                </div>
                                <TextSkeleton className="h-4 w-6" />
                            </div>
                        ))}
                    </div>
                </CardSkeleton>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                
                {/* Requests History Skeleton */}
                <CardSkeleton className="lg:col-span-8 flex flex-col">
                    <div className="flex justify-between items-center mb-6">
                        <TextSkeleton className="h-6 w-52" />
                        <TextSkeleton className="h-8 w-32 rounded-md" />
                    </div>
                    {/* This one was already correct, just adding list-none */}
                    <ul className="space-y-4 list-none">
                        {[...Array(3)].map((_, i) => <HistoryListItemSkeleton key={`request-hist-${i}`} />)}
                    </ul>
                </CardSkeleton>
                
                {/* Focus Activity Skeleton */}
                <CardSkeleton className="lg:col-span-4">
                    <TextSkeleton className="h-5 w-32 mb-7" />
                    {/* This one was already correct, just adding list-none */}
                    <ul className="mt-4 space-y-2 list-none">
                        {[...Array(3)].map((_, i) => <FocusActivityItemSkeleton key={`focus-item-${i}`} />)}
                    </ul>
                </CardSkeleton>
            </div>
        </div>
    );
}
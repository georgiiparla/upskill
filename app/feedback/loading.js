import { CardSkeleton, TextSkeleton } from "@/components/shared/skeletons/Skeletons";

const ListItemSkeleton = () => (
    <div className="p-4 bg-gray-50 dark:bg-gray-800/60 rounded-lg">
        <div className="space-y-2">
            <TextSkeleton className="h-4 w-3/5 rounded" />
            <TextSkeleton className="h-3 w-4/5 rounded" />
        </div>
    </div>
);

export default function FeedbackLoadingSkeleton() {
    return (
        <div className="animate-pulse">
            <CardSkeleton>
                <div className="flex items-center gap-4 mb-10">
                    <TextSkeleton className="h-8 w-24 rounded-md" />
                    <TextSkeleton className="h-8 w-24 rounded-md" />
                    <TextSkeleton className="h-8 w-24 rounded-md" />
                    <TextSkeleton className="h-8 w-24 rounded-md" />
                </div>

                <TextSkeleton className="h-10 w-full rounded-lg mb-6" />

                <div className="space-y-4">
                    {[...Array(5)].map((_, i) => (
                        <ListItemSkeleton key={i} />
                    ))}
                </div>
            </CardSkeleton>
        </div>
    );
}
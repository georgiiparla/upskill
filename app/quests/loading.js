import { Card } from "@/components/shared/helpers/Helper";

const QuestCardSkeleton = () => {
    return (
        <Card className="animate-pulse relative">
            {/* Play button placeholder in top-right */}
            <div className="absolute top-4 right-4">
                <div className="w-8 h-8 bg-gray-300 dark:bg-gray-700 rounded-lg"></div>
            </div>

            {/* Content area */}
            <div className="space-y-4 pr-12">
                {/* Title */}
                <div className="h-5 bg-gray-300 dark:bg-gray-700 rounded w-3/4"></div>

                {/* Description */}
                <div className="space-y-2">
                    <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-full"></div>
                    <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-4/5"></div>
                </div>

                {/* Status area */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 w-full">
                        <div className="h-8 bg-gray-300 dark:bg-gray-700 rounded w-full max-w-[500px]"></div>
                    </div>
                </div>
            </div>
        </Card>
    );
};

export default function QuestsLoading() {
    return (
        <div className="animate-pulse">
            {/* Header */}
            <div className="text-center mb-8 space-y-3">
                <div className="flex items-center justify-start gap-3 mb-2">
                    <div className="w-5 h-5 bg-gray-300 dark:bg-gray-700 rounded"></div>
                    <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-48"></div>
                </div>
            </div>

            {/* Quest grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {[...Array(4)].map((_, i) => (
                    <QuestCardSkeleton key={i} />
                ))}
            </div>
        </div>
    );
}
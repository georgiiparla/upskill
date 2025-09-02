// File: app/quests/loading.js

import { Card } from "@/components/Helper"; // Assuming you centralize Card/Skeletons

const QuestCardSkeleton = () => {
    return (
        <Card className="animate-pulse">
            <div className="flex justify-between items-start">
                <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-3/4"></div>
                <div className="h-5 bg-gray-300 dark:bg-gray-700 rounded-full w-12"></div>
            </div>
            <div className="mt-3 space-y-2">
                <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-full"></div>
                <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-5/6"></div>
            </div>
            <div className="mt-5">
                <div className="flex justify-between mb-1">
                    <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/4"></div>
                    <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/6"></div>
                </div>
                <div className="w-full bg-gray-300 dark:bg-gray-700 rounded-full h-2.5"></div>
            </div>
        </Card>
    );
};

export default function QuestsLoading() {
    return (
        <div className="animate-pulse">
            {/* You can replicate the page's title/description structure */}
            <div className="h-7 w-1/2 bg-gray-300 dark:bg-gray-700 rounded mb-4"></div>
            <div className="h-5 w-3/4 bg-gray-300 dark:bg-gray-700 rounded mb-6"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <QuestCardSkeleton />
                <QuestCardSkeleton />
                <QuestCardSkeleton />
            </div>
        </div>
    );
}
"use client";
import { Target } from 'lucide-react';
import { Card } from "../../shared/helpers/Helper";
import { HeroHeader } from "../../shared/helpers/HeroHeader";
import { QuestCarousel } from "./QuestCarousel";

export const Quests = ({ initialQuests }) => {
    const explicitQuests = (initialQuests || []).filter((quest) => quest.explicit !== false);

    // Sort quests: 
    // 1. Completed interval-based quests (green background)
    // 2. Other interval-based quests
    // 3. Always-type quests
    const sortedQuests = explicitQuests.sort((a, b) => {
        const aIsAlways = a.quest_type === 'always';
        const bIsAlways = b.quest_type === 'always';

        const aCompleted = a.user_completed ?? a.completed;
        const bCompleted = b.user_completed ?? b.completed;

        const aIsCompletedInterval = !aIsAlways && aCompleted;
        const bIsCompletedInterval = !bIsAlways && bCompleted;

        // Priority 1: Completed interval quests come first
        if (aIsCompletedInterval !== bIsCompletedInterval) {
            return aIsCompletedInterval ? -1 : 1;
        }

        // Priority 2: Interval-based (not always) comes before always
        if (aIsAlways !== bIsAlways) {
            return aIsAlways ? 1 : -1;
        }

        // If same type, maintain original order
        return 0;
    });

    if (sortedQuests.length === 0) {
        return (
            <div className="space-y-6">
                <HeroHeader
                    icon={Target}
                    title="Weekly Challenges"
                    subtitle="Complete mini-challenges automatically as you use the platform"
                    iconBg="from-blue-500 to-blue-600"
                    iconAccentColor="text-orange-600 dark:text-orange-400"
                />
                <Card className="text-center py-12 min-h-[200px] flex items-center justify-center">
                    <div className="space-y-4">
                        <div className="w-10 h-10 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto">
                            <Target className="h-5 w-5 text-gray-400" />
                        </div>
                        <div>
                            <h3 className="text-base font-medium text-gray-900 dark:text-white mb-2">No quests available</h3>
                            <p className="text-gray-600 dark:text-gray-400 text-sm">Check back later for new challenges.</p>
                        </div>
                    </div>
                </Card>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            {/* Hero Section Header */}
            <HeroHeader
                icon={Target}
                title="Weekly Challenges"
                subtitle="Complete mini-challenges automatically as you use the platform"
                iconBg="from-yellow-400 to-orange-500"
                iconAccentColor="text-green-600 dark:text-green-400"
            />

            {/* Quest Carousel */}
            <QuestCarousel quests={sortedQuests} />
        </div>
    );
};
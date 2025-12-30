"use client";
import { useState } from 'react';
// [!] Swapping Lucide Target for Tabler IconTargetArrow
import { IconTargetArrow, IconTarget } from '@tabler/icons-react';
import { Card } from "@/components/ui/Shared";
import { HeroHeader } from "@/components/ui/HeroHeader";
import { QuestFilter } from "./QuestFilter";
import { QuestCarousel } from "./QuestCarousel";

export const Quests = ({ initialQuests }) => {
    const [filter, setFilter] = useState('weekly');
    const explicitQuests = (initialQuests || []).filter((quest) => quest.explicit !== false);

    const filteredQuests = explicitQuests.filter(quest => {
        if (filter === 'weekly') return quest.quest_type !== 'always';
        if (filter === 'core') return quest.quest_type === 'always';
        return true;
    });

    const sortedQuests = filteredQuests.sort((a, b) => {
        const aIsAlways = a.quest_type === 'always';
        const bIsAlways = b.quest_type === 'always';
        const aCompleted = a.user_completed ?? a.completed;
        const bCompleted = b.user_completed ?? b.completed;
        const aIsCompletedInterval = !aIsAlways && aCompleted;
        const bIsCompletedInterval = !bIsAlways && bCompleted;

        if (aIsCompletedInterval !== bIsCompletedInterval) {
            return aIsCompletedInterval ? -1 : 1;
        }
        if (aIsAlways !== bIsAlways) {
            return aIsAlways ? 1 : -1;
        }
        return 0;
    });

    const hasQuests = sortedQuests.length > 0;

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                <HeroHeader
                    icon={IconTargetArrow} // [!] Updated
                    title={filter === 'weekly' ? "Weekly Quests" : "Core Quests"}
                    subtitle={filter === 'weekly' ? "Complete mini-challenges" : "Fundamental mastery quests"}
                    iconBg={filter === 'weekly' ? "from-yellow-400 to-orange-500" : "from-blue-500 to-indigo-600"}
                    iconAccentColor={filter === 'weekly' ? "text-green-600 dark:text-green-400" : "text-blue-600 dark:text-blue-400"}
                />
                <div className="flex justify-start md:justify-end w-full md:w-auto">
                    <QuestFilter
                        currentFilter={filter}
                        onFilterChange={setFilter}
                    />
                </div>
            </div>

            {hasQuests ? (
                <QuestCarousel key={filter} quests={sortedQuests} />
            ) : (
                <Card className="text-center py-12 min-h-[200px] flex items-center justify-center">
                    <div className="space-y-4">
                        <div className="w-10 h-10 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto">
                            <IconTarget className="h-5 w-5 text-gray-400" stroke={1.5} />
                        </div>
                        <div>
                            <h3 className="text-base font-medium text-gray-900 dark:text-white">
                                {filter === 'weekly' ? "No weekly quests available" : "No core quests available"}
                            </h3>
                            <p className="text-gray-600 dark:text-gray-400 text-sm">Check back later for new challenges.</p>
                        </div>
                    </div>
                </Card>
            )}
        </div>
    );
};
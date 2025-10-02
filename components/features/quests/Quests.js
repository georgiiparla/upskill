"use client";
import { Target } from 'lucide-react';
import { Card } from "../../shared/helpers/Helper";
import { HeroHeader } from "../../shared/helpers/HeroHeader";
import { QuestCarousel } from "./QuestCarousel";

export const Quests = ({ initialQuests }) => {
    if (!initialQuests || initialQuests.length === 0) {
        return (
            <div className="space-y-6">
                <HeroHeader
                    icon={Target}
                    title="Weekly Challenges"
                    subtitle="Complete mini-challenges automatically as you use the platform"
                    iconBg="from-blue-500 to-blue-600"
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
            />

            {/* Quest Carousel */}
            <QuestCarousel quests={initialQuests} />
        </div>
    );
};
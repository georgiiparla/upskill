"use client";
import React, { useState } from 'react';
import { AgendaItem } from './AgendaItem';
import '@fontsource/jetbrains-mono/400.css';
import '@fontsource/jetbrains-mono/700.css';
import { ConsoleDropdown } from "../../shared/helpers/ConsoleDropdown";
import { ConsoleLog } from "../../shared/helpers/ConsoleLog";
import { Metrics } from "./Metrics";
import { ActivityStream } from "./ActivityStream";
import { SectionHeader } from "../../shared/helpers/SectionHeader";
import { BarChart2, ClipboardList, Zap, MessageSquarePlus, ThumbsUp, Target, Trophy } from 'lucide-react';
import { DetailActionButton } from "../../core/buttons/Buttons";
import { useRouter } from 'next/navigation';

export default function Dashboard({ initialData }) {
    const [agendaItems, setAgendaItems] = useState(initialData.agendaItems);
    const [editingItemId, setEditingItemId] = useState(null);
    const router = useRouter();

    const handleUpdateAgendaItem = (updatedItem) => {
        setAgendaItems(currentItems =>
            currentItems.map(item => item.id === updatedItem.id ? updatedItem : item)
        );
    };

    return (
        <div className="space-y-24 pb-16 pt-10">
            {/* This Week's Agenda - No header, just padding */}
            <section>
                <SectionHeader
                    icon={ClipboardList}
                    title="This Week's Focus"
                    subtitle="Your top priorities and key discussion points"
                    iconAccentColor="text-blue-600 dark:text-blue-400"
                    className="mb-8"
                />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 auto-rows-fr">
                    {agendaItems.map((item, index) => (
                        <div key={item.id} className="h-full">
                            <AgendaItem
                                key={item.id}
                                item={item}
                                onUpdate={handleUpdateAgendaItem}
                                isEditing={item.id === editingItemId}
                                setEditingItemId={setEditingItemId}
                                isFirst={index === 0}
                            />
                        </div>
                    ))}
                </div>
            </section>

            {/* Quick Actions Section */}
            <section>
                <SectionHeader
                    icon={Zap}
                    title="Quick Actions"
                    subtitle="Perform common tasks quickly"
                    iconAccentColor="text-orange-600 dark:text-orange-400"
                    className="mb-8"
                />
                <div className="flex flex-wrap gap-4">
                    <DetailActionButton
                        icon={MessageSquarePlus}
                        text="Request Feedback"
                        colorScheme="orange"
                        onClick={() => router.push('/feedback/request/new')}
                    />
                    <DetailActionButton
                        icon={ThumbsUp}
                        text="Give Feedback"
                        colorScheme="blue"
                        onClick={() => router.push('/feedback')}
                    />
                    <DetailActionButton
                        icon={Target}
                        text="Quests"
                        colorScheme="green"
                        onClick={() => router.push('/quests')}
                    />
                    <DetailActionButton
                        icon={Trophy}
                        text="Leaderboard"
                        colorScheme="amber"
                        onClick={() => router.push('/leaderboard')}
                    />
                </div>
            </section>

            {/* Console Dropdowns */}
            <section className={`transition-opacity duration-300 ${editingItemId ? 'opacity-20 pointer-events-none' : 'opacity-100'}`}>
                <div className="space-y-4">
                    <SectionHeader
                        icon={BarChart2}
                        title="Weekly Summary"
                        subtitle="A quick overview of your activity"
                        iconAccentColor="text-purple-600 dark:text-purple-400"
                        className="mb-8"
                    />
                        <ConsoleLog>
                            <Metrics metricsData={initialData.activityData} />
                        </ConsoleLog>
                    <ConsoleDropdown title="Show Activity Stream Log">
                        <ConsoleLog>
                            <ActivityStream activityStream={initialData.activityStream} />
                        </ConsoleLog>
                    </ConsoleDropdown>
                </div>
            </section>
        </div>
    );
}
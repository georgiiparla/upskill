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
import { QuickActionButton } from "../../core/buttons/Buttons";
import { useRouter } from 'next/navigation';
import { Card } from "@/components/shared/helpers/Helper";

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
        <div className="space-y-8 pb-16 pt-3">
            {/* This Week's Agenda Section */}
            <Card innerClassName="p-3">
                <SectionHeader
                    icon={ClipboardList}
                    title="This Week's Agenda"
                    subtitle="Your key discussion points"
                    iconAccentColor="text-blue-600 dark:text-blue-400"
                    className="mb-8"
                />
                <div className={`grid grid-cols-1 gap-5 ${editingItemId ? 'auto-rows-auto' : 'auto-rows-fr'}`}>
                    {agendaItems.map((item, index) => (
                        <div key={item.id} className={editingItemId && item.id !== editingItemId ? 'h-full' : ''}>
                            <AgendaItem
                                key={item.id}
                                item={item}
                                onUpdate={handleUpdateAgendaItem}
                                isEditing={item.id === editingItemId}
                                setEditingItemId={setEditingItemId}
                                isFirst={index === index}
                            />
                        </div>
                    ))}
                </div>
            </Card>

            {/* Dashboard Section */}
            <Card innerClassName="p-3">
                <div className="space-y-6">
                    <SectionHeader
                        icon={BarChart2}
                        title="Dashboard Section"
                        subtitle="Quick Actions and Summary"
                        iconAccentColor="text-purple-600 dark:text-purple-400"
                        className="mb-8"
                    />
                    <div className="flex gap-4">
                        <QuickActionButton
                            icon={MessageSquarePlus}
                            text="Submit New Feedback Request"
                            colorScheme="green"
                            onClick={() => router.push('/feedback/request/new')}
                        />
                        <QuickActionButton
                            icon={ThumbsUp}
                            text="Find Pending Feedback Requests"
                            colorScheme="blue"
                            onClick={() => router.push('/feedback')}
                        />
                    </div>
                    <ConsoleDropdown title="Weekly Summary" >
                        <ConsoleLog>
                            <Metrics metricsData={initialData.activityData} />
                        </ConsoleLog>
                    </ConsoleDropdown>
                    <ConsoleDropdown title="Activity Stream Log">
                        <ConsoleLog>
                            <ActivityStream activityStream={initialData.activityStream} />
                        </ConsoleLog>
                    </ConsoleDropdown>
                </div>
            </Card>
        </div>
    );
}
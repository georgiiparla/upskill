"use client";
import React, { useState } from 'react';
import { AgendaItem } from './AgendaItem';
import '@fontsource/jetbrains-mono/400.css';
import '@fontsource/jetbrains-mono/700.css';
import { ConsoleDropdown } from "@/components/ui/ConsoleDropdown";
import { ConsoleLog } from "@/components/ui/ConsoleLog";
import { Metrics } from "./Metrics";
import { ActivityStream } from "./ActivityStream";
import { HeroHeader } from "@/components/ui/HeroHeader";
import { QuickActionButton } from "@/components/ui/Buttons";
import { useRouter } from 'next/navigation';
import { clientFetch } from "@/lib/client-api";
import {
    IconLayoutDashboard,
    IconMessagePlus,
    IconThumbUp,
    IconActivity,
    IconCalendarStats
} from '@tabler/icons-react';

export default function Dashboard({ initialData }) {
    const [agendaItems, setAgendaItems] = useState(initialData.agendaItems);
    const [editingItemId, setEditingItemId] = useState(null);
    const [hasUnviewedEvents, setHasUnviewedEvents] = useState(initialData.hasUnviewedEvents || false);
    const router = useRouter();

    const handleUpdateAgendaItem = (updatedItem) => {
        setAgendaItems(currentItems =>
            currentItems.map(item => item.id === updatedItem.id ? updatedItem : item)
        );
    };

    const handleActivityStreamViewed = async () => {
        try {
            const result = await clientFetch('/dashboard/mark-activity-viewed', { method: 'POST' });
            if (result.success) {
                setHasUnviewedEvents(false);
            }
        } catch (error) {
            console.error('Failed to mark activity stream as viewed:', error);
        }
    };

    return (
        <div className="w-full space-y-8 pb-10">
            <HeroHeader
                icon={IconLayoutDashboard}
                title="Dashboard"
                subtitle="Your daily focus, quick actions, and team insights."
                iconBg="from-blue-500 to-indigo-600"
                iconAccentColor="text-blue-600 dark:text-blue-400"
            />

            <div className="flex flex-col gap-12">

                <div className={`grid grid-cols-1 gap-5 ${editingItemId ? 'auto-rows-auto' : 'auto-rows-auto md:auto-rows-fr'}`}>
                    {agendaItems.map((item) => (
                        <div key={item.id} className={editingItemId && item.id !== editingItemId ? 'h-full' : ''}>
                            <AgendaItem
                                key={item.id}
                                item={item}
                                onUpdate={handleUpdateAgendaItem}
                                isEditing={item.id === editingItemId}
                                setEditingItemId={setEditingItemId}
                            />
                        </div>
                    ))}
                </div>

                <div className="flex flex-row gap-4">
                    <QuickActionButton
                        icon={IconMessagePlus}
                        text="Request Feedback"
                        shortText="Request"
                        colorScheme="green"
                        onClick={() => router.push('/feedback/request/new')}
                    />
                    <QuickActionButton
                        icon={IconThumbUp}
                        text="Provide Feedback"
                        shortText="Submit"
                        colorScheme="blue"
                        onClick={() => router.push('/feedback')}
                    />
                </div>

                <div className="space-y-6">
                    {/* Activity Stream */}
                    <ConsoleDropdown
                        title="Activity Stream"
                        icon={IconActivity}
                        hasUnviewedEvents={hasUnviewedEvents}
                        onClose={handleActivityStreamViewed}
                    >
                        <ConsoleLog>
                            <ActivityStream activityStream={initialData.activityStream} />
                        </ConsoleLog>
                    </ConsoleDropdown>

                    <ConsoleDropdown
                        title="Weekly Summary"
                        icon={IconCalendarStats}
                    >
                        <ConsoleLog>
                            <Metrics metricsData={initialData.activityData} />
                        </ConsoleLog>
                    </ConsoleDropdown>
                </div>
            </div>
        </div >
    );
}
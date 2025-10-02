"use client";
import { useState } from 'react';
import { MessageSquarePlus, ThumbsUp } from 'lucide-react';
import { Card } from "../../shared/helpers/Helper";
import SimpleToggleSwitch from '../../core/ui/SimpleToggleSwitch';
import { MetricItem } from './MetricItem';

const ActivityCard = ({ activityData }) => {
    const [activeView, setActiveView] = useState('personal');
    const currentData = activityData[activeView];

    const toggleOptions = [
        { id: 'personal', label: 'Me' },
        { id: 'team', label: 'Team' },
    ];

    return (
        <Card
            className='h-full min-h-[280px]'
            innerClassName='h-full flex flex-col'
        >
            <div className="mb-6">
                <SimpleToggleSwitch
                    options={toggleOptions}
                    activeOption={activeView}
                    setActiveOption={setActiveView}
                />
            </div>

            {/* Enhanced Metrics Grid */}
            <div className="grid grid-cols-1 gap-5 flex-1">
                <MetricItem
                    icon={<MessageSquarePlus className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />}
                    label="Requests Created"
                    allTime={currentData.requests.allTime}
                    thisWeek={currentData.requests.thisWeek}
                />
                <MetricItem
                    icon={<ThumbsUp className="h-5 w-5 text-blue-600 dark:text-blue-400" />}
                    label="Feedback Given"
                    allTime={currentData.feedback.allTime}
                    thisWeek={currentData.feedback.thisWeek}
                />
            </div>
        </Card>
    );
};

export { ActivityCard };

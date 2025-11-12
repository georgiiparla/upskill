"use client";

import { useState } from 'react';
import { ListChecks } from 'lucide-react';
import { Card, SectionTitle } from '@/components/shared/helpers/Helper';
import { QuestListItem } from './QuestListItem';

// Time unit conversions aligned with Rails ActiveSupport
// Rails uses 365.2425 days per year (leap year adjusted)
const TIME_UNITS = {
    seconds: 1,
    minutes: 60,
    hours: 3600,
    days: 86400,
    weeks: 604800,
    months: 2592000,  // 30 days
    years: 31556952,  // 365.2425 days (Rails standard)
};

export const QuestList = ({ quests, onUpdatePoints, onToggleExplicit, updatingId, togglingId }) => {
    const [editingId, setEditingId] = useState(null);
    const [draftValue, setDraftValue] = useState('');
    const [draftResetUnits, setDraftResetUnits] = useState(null);
    const [inlineError, setInlineError] = useState('');

    // Calculate total seconds from all units
    const calculateTotalSeconds = (units) => {
        return Object.entries(units).reduce((total, [unit, value]) => {
            return total + (parseInt(value) || 0) * TIME_UNITS[unit];
        }, 0);
    };

    const startEditing = (quest) => {
        setEditingId(quest.id);
        setDraftValue(String(quest.points ?? 0));
        
        // Parse existing interval into units
        const totalSeconds = quest.reset_interval_seconds || 0;
        const units = { years: 0, months: 0, weeks: 0, days: 0, hours: 0, minutes: 0, seconds: 0 };
        
        let remaining = totalSeconds;
        for (const [unit, factor] of Object.entries(TIME_UNITS).reverse()) {
            if (unit === 'seconds') continue;
            units[unit] = Math.floor(remaining / factor);
            remaining = remaining % factor;
        }
        units.seconds = remaining;
        
        setDraftResetUnits(units);
        setInlineError('');
    };

    const cancelEditing = () => {
        setEditingId(null);
        setDraftValue('');
        setDraftResetUnits(null);
        setInlineError('');
    };

    const handleSave = async (questId) => {
        const trimmed = draftValue.trim();

        if (trimmed === '') {
            setInlineError('Points are required.');
            return;
        }

        const parsed = Number(trimmed);

        if (!Number.isInteger(parsed) || parsed < 0) {
            setInlineError('Enter a non-negative whole number.');
            return;
        }

        setInlineError('');

        const totalSeconds = calculateTotalSeconds(draftResetUnits);

        const success = await (onUpdatePoints 
            ? onUpdatePoints(questId, parsed, totalSeconds > 0 ? totalSeconds : null) 
            : Promise.resolve(false));

        if (success) {
            cancelEditing();
        } else {
            setInlineError('Unable to update quest. Please try again.');
        }
    };

    if (!quests.length) {
        return (
            <Card className="h-full" innerClassName="space-y-6">
                <SectionTitle icon={<ListChecks className="h-6 w-6 text-csway-green" />} title="Existing quests" />
                <div className="flex h-full min-h-[180px] flex-col items-center justify-center rounded-lg border border-dashed border-slate-300/60 bg-white/40 text-center text-sm text-slate-500 dark:border-slate-700/70 dark:bg-slate-900/40 dark:text-slate-400">
                    <p>No quests found yet.</p>
                </div>
            </Card>
        );
    }

    return (
        <Card glass={false} className="h-full" innerClassName="space-y-6">
            <SectionTitle icon={<ListChecks className="h-6 w-6 text-csway-green" />} title="Existing quests" />

            <ul className="space-y-3">
                {quests.map((quest) => (
                    <QuestListItem
                        key={`${quest.id}-${quest.explicit}`}
                        quest={quest}
                        isEditing={editingId === quest.id}
                        editingId={editingId}
                        draftValue={draftValue}
                        setDraftValue={setDraftValue}
                        draftResetUnits={draftResetUnits}
                        setDraftResetUnits={setDraftResetUnits}
                        inlineError={inlineError}
                        updatingId={updatingId}
                        togglingId={togglingId}
                        onStartEditing={startEditing}
                        onCancelEditing={cancelEditing}
                        onSave={handleSave}
                        onToggleExplicit={onToggleExplicit}
                    />
                ))}
            </ul>
        </Card>
    );
};

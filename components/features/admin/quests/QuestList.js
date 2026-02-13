"use client";

import { useState } from 'react';
import { Inbox } from 'lucide-react';
import { QuestListItem } from './QuestListItem';

export const QuestList = ({ quests, onUpdatePoints, onToggleExplicit, updatingId, togglingId }) => {
    const [editingId, setEditingId] = useState(null);
    const [draftValue, setDraftValue] = useState('');
    const [draftResetUnits, setDraftResetUnits] = useState(null);
    const [inlineError, setInlineError] = useState('');

    const calculateTotalSeconds = (units) => {
        let total = 0;
        total += (parseInt(units.days) || 0) * 86400;    // Days to seconds
        total += (parseInt(units.hours) || 0) * 3600;    // Hours to seconds
        total += (parseInt(units.minutes) || 0) * 60;    // Minutes to seconds
        return total;
    };

    const startEditing = (quest) => {
        setEditingId(quest.id);
        setDraftValue(String(quest.points ?? 0));

        const totalSeconds = quest.reset_interval_seconds || 0;

        const units = { days: 0, hours: 0, minutes: 0 };
        let remaining = totalSeconds;

        units.days = Math.floor(remaining / 86400);
        remaining %= 86400;

        units.hours = Math.floor(remaining / 3600);
        remaining %= 3600;

        units.minutes = Math.floor(remaining / 60);

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
            <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-slate-300 bg-slate-50 py-16 dark:border-slate-700 dark:bg-slate-800/30">
                <Inbox className="h-10 w-10 text-slate-400 mb-3" />
                <p className="text-sm font-medium text-slate-900 dark:text-white">No quests found</p>
            </div>
        );
    }

    return (
        <div className="w-full">
            <div className="hidden md:grid md:grid-cols-[3fr_1fr_1fr] border-b border-slate-200 bg-slate-50/50 py-3 px-4 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:border-slate-700 dark:bg-slate-800/50 dark:text-slate-400 rounded-t-lg">
                <div>Quest Details</div>
                <div className="text-center">Reward</div>
                <div className="text-right">Actions</div>
            </div>

            <ul className="divide-y divide-slate-100 border border-t-0 border-slate-200 rounded-b-lg bg-white dark:divide-slate-700 dark:border-slate-700 dark:bg-slate-900">
                {quests.sort((a, b) => {
                    if (a.quest_type === 'interval-based' && b.quest_type !== 'interval-based') return -1;
                    if (a.quest_type !== 'interval-based' && b.quest_type === 'interval-based') return 1;
                    return 0;
                }).map((quest) => (
                    <QuestListItem
                        key={`${quest.id}-${quest.explicit}`}
                        quest={quest}
                        isEditing={editingId === quest.id}
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
        </div>
    );
};
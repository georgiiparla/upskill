"use client";

import { useState } from 'react';
import { ListChecks } from 'lucide-react';
import { Card, SectionTitle } from '@/components/shared/helpers/Helper';
import { QuestListItem } from './QuestListItem';

export const QuestList = ({ quests, onUpdatePoints, onDeleteQuest, onToggleExplicit, updatingId, deletingId, togglingId }) => {
    const [editingId, setEditingId] = useState(null);
    const [draftValue, setDraftValue] = useState('');
    const [inlineError, setInlineError] = useState('');

    const startEditing = (quest) => {
        setEditingId(quest.id);
        setDraftValue(String(quest.points ?? 0));
        setInlineError('');
    };

    const cancelEditing = () => {
        setEditingId(null);
        setDraftValue('');
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

        const success = await (onUpdatePoints ? onUpdatePoints(questId, parsed) : Promise.resolve(false));

        if (success) {
            cancelEditing();
        } else {
            setInlineError('Unable to update points. Please try again.');
        }
    };

    if (!quests.length) {
        return (
            <Card className="h-full" innerClassName="space-y-6">
                <SectionTitle icon={<ListChecks className="h-6 w-6 text-csway-green" />} title="Existing quests" />
                <div className="flex h-full min-h-[180px] flex-col items-center justify-center rounded-lg border border-dashed border-slate-300/60 bg-white/40 text-center text-sm text-slate-500 dark:border-slate-700/70 dark:bg-slate-900/40 dark:text-slate-400">
                    <p>No quests found yet.</p>
                    <p className="mt-1 text-xs">Create your first quest to energize the team.</p>
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
                        key={quest.id || `${quest.code}-${quest.title}`}
                        quest={quest}
                        isEditing={editingId === quest.id}
                        editingId={editingId}
                        draftValue={draftValue}
                        setDraftValue={setDraftValue}
                        inlineError={inlineError}
                        updatingId={updatingId}
                        deletingId={deletingId}
                        togglingId={togglingId}
                        onStartEditing={startEditing}
                        onCancelEditing={cancelEditing}
                        onSave={handleSave}
                        onDelete={onDeleteQuest}
                        onToggleExplicit={onToggleExplicit}
                    />
                ))}
            </ul>
        </Card>
    );
};

"use client";

import { useState } from 'react';
import toast from 'react-hot-toast';
import { clientFetch } from '@/lib/client-api'; //
import { QuestList } from './QuestList'; //

export const QuestsManager = ({ initialQuests = [], onQuestsChange }) => {
    const [quests, setQuests] = useState(initialQuests);
    const [updatingId, setUpdatingId] = useState(null);
    const [togglingId, setTogglingId] = useState(null);

    const updateQuests = (newQuests) => {
        setQuests(newQuests);
        onQuestsChange?.(newQuests);
    };

    const handlePointsUpdate = async (questId, points, resetInterval) => {
        setUpdatingId(questId);
        const toastId = toast.loading('Updating quest...');

        // Logic preserved from original
        const body = { points };
        if (resetInterval !== null && resetInterval !== undefined) {
            body.reset_interval_seconds = resetInterval;
        }

        const response = await clientFetch(`/quests/${questId}`, {
            method: 'PATCH',
            body,
        });

        setUpdatingId(null);

        if (!response.success) {
            toast.error(response.error || 'Failed to update quest.', { id: toastId });
            return false;
        }

        toast.success('Quest updated.', { id: toastId });
        const updatedQuest = response.data;
        updateQuests((prev) => prev.map((quest) => (quest.id === updatedQuest.id ? updatedQuest : quest)));

        return true;
    };

    const handleToggleExplicit = async (quest) => {
        if (!quest || !quest.id) {
            toast.error('Unable to determine which quest to update.');
            return;
        }

        const currentExplicit = quest.explicit !== false;
        setTogglingId(quest.id);
        const toastId = toast.loading(currentExplicit ? 'Hiding quest...' : 'Publishing quest...');

        const response = await clientFetch(`/quests/${quest.id}`, {
            method: 'PATCH',
            body: { explicit: !currentExplicit },
        });

        setTogglingId(null);

        if (!response.success) {
            toast.error(response.error || 'Failed to update visibility.', { id: toastId });
            return;
        }

        const updated = response.data;
        toast.success(updated.explicit ? 'Quest is now visible.' : 'Quest is now hidden.', { id: toastId });
        updateQuests((prev) => prev.map((q) => (q.id === updated.id ? updated : q)));
    };

    return (
        <div className="w-full">
            <QuestList
                quests={quests}
                onUpdatePoints={handlePointsUpdate}
                onToggleExplicit={handleToggleExplicit}
                updatingId={updatingId}
                togglingId={togglingId}
            />
        </div>
    );
};
"use client";

import { useState } from 'react';
import toast from 'react-hot-toast';
import { clientFetch, deleteQuest } from '@/lib/client-api';
import { AddQuestForm } from './AddQuestForm';
import { QuestList } from './QuestList';

export const QuestsManager = ({ initialQuests = [], onQuestsChange }) => {
    const [quests, setQuests] = useState(initialQuests);
    const [updatingId, setUpdatingId] = useState(null);
    const [deletingId, setDeletingId] = useState(null);
    const [togglingId, setTogglingId] = useState(null);

    const updateQuests = (newQuests) => {
        setQuests(newQuests);
        onQuestsChange?.(newQuests);
    };

    const handleQuestCreated = (quest) => {
        updateQuests((prev) => {
            const filtered = prev.filter((existing) => existing.id !== quest.id && existing.code !== quest.code);
            return [quest, ...filtered];
        });
    };

    const handlePointsUpdate = async (questId, points) => {
        setUpdatingId(questId);
        const toastId = toast.loading('Updating quest points...');

        const response = await clientFetch(`/quests/${questId}`, {
            method: 'PATCH',
            body: { points },
        });

        setUpdatingId(null);

        if (!response.success) {
            toast.error(response.error || 'Failed to update quest points.', { id: toastId });
            return false;
        }

        toast.success('Quest points updated.', { id: toastId });

        const updatedQuest = response.data;
        updateQuests((prev) => prev.map((quest) => (quest.id === updatedQuest.id ? updatedQuest : quest)));

        return true;
    };

    const handleDeleteQuest = async (quest) => {
        if (!quest || !quest.id) {
            toast.error('Unable to determine which quest to delete.');
            return;
        }

        setDeletingId(quest.id);
        const toastId = toast.loading('Deleting quest...');

        const response = await deleteQuest(quest.id);

        setDeletingId(null);

        if (!response.success) {
            toast.error(response.error || 'Failed to delete quest.', { id: toastId });
            return;
        }

        toast.success('Quest deleted.', { id: toastId });
        updateQuests((prev) => prev.filter((existing) => existing.id !== quest.id));
    };

    const handleToggleExplicit = async (quest) => {
        if (!quest || !quest.id) {
            toast.error('Unable to determine which quest to update.');
            return;
        }

        const currentExplicit = quest.explicit !== false;
        setTogglingId(quest.id);
        const toastId = toast.loading(currentExplicit ? 'Hiding quest from carousel...' : 'Showing quest on carousel...');

        const response = await clientFetch(`/quests/${quest.id}`, {
            method: 'PATCH',
            body: { explicit: !currentExplicit },
        });

        setTogglingId(null);

        if (!response.success) {
            toast.error(response.error || 'Failed to update quest visibility.', { id: toastId });
            return;
        }

        const updated = response.data;
        toast.success(updated.explicit ? 'Quest will appear on the carousel.' : 'Quest hidden from carousel.', { id: toastId });
        updateQuests((prev) => prev.map((q) => (q.id === updated.id ? updated : q)));
    };

    return (
        <div className="space-y-6">
            <div className="grid gap-6 lg:grid-cols-[minmax(0,4fr)_minmax(0,5fr)] xl:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
                <AddQuestForm onCreated={handleQuestCreated} />
                <QuestList
                    quests={quests}
                    onUpdatePoints={handlePointsUpdate}
                    onDeleteQuest={handleDeleteQuest}
                    onToggleExplicit={handleToggleExplicit}
                    updatingId={updatingId}
                    deletingId={deletingId}
                    togglingId={togglingId}
                />
            </div>
        </div>
    );
};

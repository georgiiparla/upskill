"use client";

import { useState } from 'react';
import toast from 'react-hot-toast';
import { ListChecks, Pencil, Check, X, Loader2, Trash2, ToggleLeft, ToggleRight } from 'lucide-react';

import { clientFetch, deleteQuest } from '@/lib/client-api';
import { AddQuestForm } from './AddQuestForm';
import { Card, SectionTitle } from '../../shared/helpers/Helper';

const QuestList = ({ quests, onUpdatePoints, onDeleteQuest, onToggleExplicit, updatingId, deletingId, togglingId }) => {
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
        <Card className="h-full" innerClassName="space-y-6">
            <SectionTitle icon={<ListChecks className="h-6 w-6 text-csway-green" />} title="Existing quests" />

            <ul className="space-y-3">
                {quests.map((quest) => {
                    const isEditing = editingId === quest.id;
                    const isUpdating = updatingId === quest.id;
                    const isDeleting = deletingId === quest.id;
                    const isToggling = togglingId === quest.id;
                    const isBusy = isUpdating || isDeleting || isToggling;
                    const isExplicit = quest.explicit !== false;

                    return (
                        <li
                            key={quest.id || `${quest.code}-${quest.title}`}
                            className="group rounded-xl border border-slate-200/70 bg-white/70 p-4 transition-all duration-200 hover:border-csway-green/80 hover:bg-white dark:border-slate-700/70 dark:bg-slate-900/50 dark:hover:border-csway-green/60 dark:hover:bg-slate-900"
                        >
                            <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                                <div className="space-y-2">
                                    <div className="flex items-center gap-2">
                                        <span className="text-sm font-semibold text-slate-900 dark:text-white">{quest.title}</span>
                                        <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-slate-500 dark:bg-slate-800/80 dark:text-slate-300">
                                            {quest.code}
                                        </span>
                                    </div>
                                    {quest.description && (
                                        <p className="text-xs text-slate-600 dark:text-slate-400">
                                            {quest.description}
                                        </p>
                                    )}
                                    <div className="flex flex-wrap items-center gap-2">
                                        <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${isExplicit ? 'bg-csway-green/10 text-csway-green' : 'bg-slate-200/70 text-slate-600 dark:bg-slate-800/60 dark:text-slate-300'}`}>
                                            {isExplicit ? 'Explicit quest' : 'Implicit quest'}
                                        </span>
                                    </div>
                                </div>

                                <div className="space-y-2 md:text-right">
                                    {isEditing ? (
                                        <div className="flex flex-wrap items-center gap-2 md:justify-end">
                                            <input
                                                type="number"
                                                min="0"
                                                step="1"
                                                value={draftValue}
                                                onChange={(e) => setDraftValue(e.target.value)}
                                                className="w-24 rounded-lg border border-slate-200/70 bg-white/90 px-3 py-2 text-sm text-slate-900 shadow-sm focus:border-csway-green focus:outline-none focus:ring-2 focus:ring-csway-green/30 dark:border-slate-700/70 dark:bg-slate-900/70 dark:text-slate-100"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => handleSave(quest.id)}
                                                disabled={isBusy}
                                                className="inline-flex items-center gap-1 rounded-md bg-csway-green px-3 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-csway-green/90 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-csway-green disabled:cursor-not-allowed disabled:bg-slate-400"
                                            >
                                                {isBusy ? <Loader2 className="h-4 w-4 animate-spin" /> : <Check className="h-4 w-4" />}
                                            </button>
                                            <button
                                                type="button"
                                                onClick={cancelEditing}
                                                disabled={isBusy}
                                                className="inline-flex items-center gap-1 rounded-md border border-slate-300 px-3 py-2 text-xs font-semibold text-slate-600 transition hover:border-slate-400 hover:text-slate-800 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-slate-300 disabled:cursor-not-allowed disabled:opacity-60 dark:border-slate-700 dark:text-slate-300 dark:hover:border-slate-500 dark:hover:text-white"
                                            >
                                                <X className="h-4 w-4" />
                                            </button>
                                        </div>
                                    ) : (
                                        <div className="flex flex-wrap items-center gap-2 md:justify-end">
                                            <span className="flex items-center gap-1 rounded-lg bg-emerald-500/10 px-3 py-1 text-sm font-semibold text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-300">
                                                {quest.points}
                                                <span className="text-xs font-medium">pts</span>
                                            </span>
                                            <div className="flex items-center gap-2">
                                                <button
                                                    type="button"
                                                    onClick={() => startEditing(quest)}
                                                    disabled={isBusy}
                                                    className="inline-flex items-center gap-1 rounded-md border border-transparent px-3 py-2 text-xs font-semibold text-slate-600 transition hover:border-slate-200 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-slate-300 disabled:cursor-not-allowed disabled:opacity-60 dark:text-slate-300 dark:hover:border-slate-600 dark:hover:bg-slate-800/60"
                                                >
                                                    <Pencil className="h-4 w-4" />
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={() => onToggleExplicit?.(quest)}
                                                    disabled={isBusy}
                                                    className={`inline-flex items-center gap-1 rounded-md border border-transparent px-3 py-2 text-xs font-semibold transition focus:outline-none focus:ring-2 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-60 ${isExplicit ? 'text-amber-600 hover:border-amber-200 hover:bg-amber-50 focus:ring-amber-200 dark:text-amber-300 dark:hover:border-amber-400/60 dark:hover:bg-amber-500/10' : 'text-slate-500 hover:border-slate-200 hover:bg-slate-100 focus:ring-slate-200 dark:text-slate-300 dark:hover:border-slate-600 dark:hover:bg-slate-800/60'}`}
                                                >
                                                    {isToggling ? (
                                                        <Loader2 className="h-4 w-4 animate-spin" />
                                                    ) : isExplicit ? (
                                                        <ToggleRight className="h-4 w-4" />
                                                    ) : (
                                                        <ToggleLeft className="h-4 w-4" />
                                                    )}
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={() => onDeleteQuest?.(quest)}
                                                    disabled={isBusy}
                                                    className="inline-flex items-center gap-1 rounded-md border border-transparent px-3 py-2 text-xs font-semibold text-red-600 transition hover:border-red-200 hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-red-200 disabled:cursor-not-allowed disabled:opacity-60 dark:text-red-300 dark:hover:border-red-400/70 dark:hover:bg-red-500/10"
                                                >
                                                    {isDeleting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}
                                                </button>
                                            </div>
                                        </div>
                                    )}

                                    {isEditing && inlineError && (
                                        <p className="text-xs text-red-500 md:text-right">{inlineError}</p>
                                    )}
                                </div>
                            </div>
                        </li>
                    );
                })}
            </ul>
        </Card>
    );
};

//const QuestInsightCard = ({ icon, label, value, helper }) => (
//    <Card className="h-full" variant="custom" innerClassName="flex items-start gap-4">
//        <div className="rounded-xl bg-csway-green/10 p-3 text-csway-green">
//            {icon}
//        </div>
//        <div className="space-y-1">
//            <p className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">{label}</p>
//            <p className="text-2xl font-semibold text-slate-900 dark:text-white">{value}</p>
//            {helper && <p className="text-xs text-slate-500 dark:text-slate-400">{helper}</p>}
//        </div>
//    </Card>
//);

export const QuestsManager = ({ initialQuests = [] }) => {
    const [quests, setQuests] = useState(initialQuests);
    const [updatingId, setUpdatingId] = useState(null);
    const [deletingId, setDeletingId] = useState(null);
    const [togglingId, setTogglingId] = useState(null);

    const handleQuestCreated = (quest) => {
        setQuests((prev) => {
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
        setQuests((prev) => prev.map((quest) => (quest.id === updatedQuest.id ? updatedQuest : quest)));

        return true;
    };

    const handleDeleteQuest = async (quest) => {
        if (!quest || !quest.id) {
            toast.error('Unable to determine which quest to delete.');
            return;
        }

        const confirmed = window.confirm(`Delete quest "${quest.title}"? This action cannot be undone.`);
        if (!confirmed) return;

        setDeletingId(quest.id);
        const toastId = toast.loading('Deleting quest...');

        const response = await deleteQuest(quest.id);

        setDeletingId(null);

        if (!response.success) {
            toast.error(response.error || 'Failed to delete quest.', { id: toastId });
            return;
        }

        toast.success('Quest deleted.', { id: toastId });
        setQuests((prev) => prev.filter((existing) => existing.id !== quest.id));
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
        setQuests((prev) => prev.map((q) => (q.id === updated.id ? updated : q)));
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

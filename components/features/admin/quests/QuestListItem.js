"use client";

import { useState } from 'react';
import { Pencil, Check, X, Trash2, ToggleLeft, ToggleRight, Loader2 } from 'lucide-react';
import { IconButton } from '@/components/core/buttons/Buttons';
import { Modal } from '@/components/core/ui/Modal';

export const QuestListItem = ({
    quest,
    isEditing,
    draftValue,
    setDraftValue,
    inlineError,
    updatingId,
    deletingId,
    togglingId,
    onStartEditing,
    onCancelEditing,
    onSave,
    onDelete,
    onToggleExplicit,
}) => {
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    const isUpdating = updatingId === quest.id;
    const isDeleting = deletingId === quest.id;
    const isToggling = togglingId === quest.id;
    const isBusy = isUpdating || isDeleting || isToggling;
    const isExplicit = quest.explicit !== false;

    const handleDeleteClick = () => {
        setIsDeleteModalOpen(true);
    };

    const handleDeleteConfirm = async () => {
        setIsDeleteModalOpen(false);
        await onDelete?.(quest);
    };

    return (
        <li
            key={quest.id || `${quest.code}-${quest.title}`}
            className="group rounded-xl border border-slate-200/70 bg-white p-4 transition-all duration-200 dark:border-slate-700/70 dark:bg-slate-900"
        >
            <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                {/* Quest Info */}
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
                        <span
                            className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${
                                isExplicit
                                    ? 'bg-csway-green/10 text-csway-green'
                                    : 'bg-slate-200/70 text-slate-600 dark:bg-slate-800/60 dark:text-slate-300'
                            }`}
                        >
                            {isExplicit ? 'Explicit quest' : 'Implicit quest'}
                        </span>
                    </div>
                </div>

                {/* Quest Actions */}
                <div className="space-y-2 md:text-right">
                    {isEditing ? (
                        // Editing Mode
                        <div className="flex flex-wrap items-center gap-2 md:justify-end">
                            <input
                                type="number"
                                min="0"
                                step="1"
                                value={draftValue}
                                onChange={(e) => setDraftValue(e.target.value)}
                                className="w-24 rounded-lg border border-slate-200/70 bg-white/90 px-3 py-2 text-sm text-slate-900 shadow-sm focus:border-csway-green focus:outline-none focus:ring-2 focus:ring-csway-green/30 dark:border-slate-700/70 dark:bg-slate-900/70 dark:text-slate-100"
                            />
                            <IconButton
                                icon={Check}
                                onClick={() => onSave(quest.id)}
                                disabled={isBusy}
                                isLoading={isBusy}
                                colorScheme="emerald"
                            />
                            <IconButton
                                icon={X}
                                onClick={onCancelEditing}
                                disabled={isBusy}
                                colorScheme="slate"
                            />
                        </div>
                    ) : (
                        // View Mode
                        <div className="flex flex-wrap items-center gap-2 md:justify-end">
                            <span className="flex items-center gap-1 rounded-lg bg-emerald-500/10 px-3 py-1 text-sm font-semibold text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-300">
                                {quest.points}
                                <span className="text-xs font-medium">pts</span>
                            </span>
                            <div className="flex items-center gap-2">
                                <IconButton
                                    icon={Pencil}
                                    onClick={() => onStartEditing(quest)}
                                    disabled={isBusy}
                                    colorScheme="slate"
                                />
                                <button
                                    type="button"
                                    onClick={() => onToggleExplicit?.(quest)}
                                    disabled={isBusy}
                                    className={`inline-flex items-center gap-1 rounded-md border border-transparent px-3 py-2 text-xs font-semibold transition focus:outline-none focus:ring-2 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-60 ${
                                        isExplicit
                                            ? 'text-amber-600 hover:border-amber-200 hover:bg-amber-50 focus:ring-amber-200 dark:text-amber-300 dark:hover:border-amber-400/60 dark:hover:bg-amber-500/10'
                                            : 'text-slate-500 hover:border-slate-200 hover:bg-slate-100 focus:ring-slate-200 dark:text-slate-300 dark:hover:border-slate-600 dark:hover:bg-slate-800/60'
                                    }`}
                                >
                                    {isToggling ? (
                                        <Loader2 className="h-4 w-4 animate-spin" />
                                    ) : isExplicit ? (
                                        <ToggleRight className="h-4 w-4" />
                                    ) : (
                                        <ToggleLeft className="h-4 w-4" />
                                    )}
                                </button>
                                <IconButton
                                    icon={Trash2}
                                    onClick={handleDeleteClick}
                                    disabled={isBusy}
                                    isLoading={isDeleting}
                                    colorScheme="red"
                                />
                            </div>
                        </div>
                    )}

                    {isEditing && inlineError && (
                        <p className="text-xs text-red-500 md:text-right">{inlineError}</p>
                    )}
                </div>
            </div>

            <Modal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                onConfirm={handleDeleteConfirm}
                title="Delete Quest"
                confirmText="Delete"
                cancelText="Cancel"
                confirmButtonClass="bg-red-600 hover:bg-red-700"
                isConfirming={isDeleting}
            >
                <p>
                    Are you sure you want to delete <strong>{quest.title}</strong>? This action cannot be undone.
                </p>
            </Modal>
        </li>
    );
};

"use client";

import { useState } from 'react';
import { Settings, Play, AlertCircle, Loader2 } from 'lucide-react';
import { clientFetch } from '@/lib/client-api';
import toast from 'react-hot-toast';
import { Modal } from '@/components/ui/Modal';

const JOBS = [
    { id: 'leaderboard_reset_job', label: 'Reset Leaderboard', description: 'Resets points for the new cycle' },
    { id: 'leaderboard_sync_job', label: 'Sync Leaderboard', description: 'Syncs public points with shadow points' },
    { id: 'quest_reset_job', label: 'Reset Quests', description: 'Resets progress for interval-based quests' },
];

export const JobTriggers = () => {
    const [runningJob, setRunningJob] = useState(null);
    const [confirmModalOpen, setConfirmModalOpen] = useState(false);
    const [selectedJob, setSelectedJob] = useState(null);
    const [confirmationInput, setConfirmationInput] = useState('');

    const openConfirmation = (jobId, label) => {
        setSelectedJob({ id: jobId, label });
        setConfirmationInput('');
        setConfirmModalOpen(true);
    };

    const handleConfirmRun = async () => {
        if (!selectedJob) return;

        const expectedCommand = `sudo ${selectedJob.id}`;
        if (confirmationInput !== expectedCommand) {
            toast.error('Incorrect confirmation command');
            return;
        }

        setConfirmModalOpen(false);
        setRunningJob(selectedJob.id);
        const toastId = toast.loading(`Triggering ${selectedJob.label}...`);

        try {
            const { success, error } = await clientFetch(`/admin/jobs/${selectedJob.id}`, {
                method: 'POST'
            });

            if (success) {
                toast.success(`${selectedJob.label} triggered successfully`, { id: toastId });
            } else {
                toast.error(`Failed to trigger ${selectedJob.label}: ${error}`, { id: toastId });
            }
        } catch (err) {
            toast.error(`Error: ${err.message}`, { id: toastId });
        } finally {
            setRunningJob(null);
            setSelectedJob(null);
        }
    };

    return (
        <>
            <Modal
                isOpen={confirmModalOpen}
                onClose={() => setConfirmModalOpen(false)}
                onConfirm={handleConfirmRun}
                title="Special Job Confirmation"
                confirmText="Execute Force Run"
                confirmButtonClass="bg-red-600 hover:bg-red-700"
                isConfirming={runningJob !== null}
            >
                <div className="space-y-4">
                    <div className="flex items-start gap-3 p-3 bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800 rounded-md">
                        <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400 mt-0.5 shrink-0" />
                        <div className="text-sm text-red-800 dark:text-red-200">
                            <p className="font-semibold">Warning: Strong Intent Required</p>
                            <p className="mt-1">
                                This is a privileged operation that bypasses safety schedules.
                                It may have significant side effects on user data or system state.
                            </p>
                        </div>
                    </div>

                    <div>
                        <p className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                            Type <span className="font-mono font-bold text-slate-900 dark:text-white select-all">sudo {selectedJob?.id}</span> to confirm:
                        </p>
                        <input
                            type="text"
                            value={confirmationInput}
                            onChange={(e) => setConfirmationInput(e.target.value)}
                            placeholder={`sudo ${selectedJob?.id}`}
                            className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-mono text-sm focus:ring-2 focus:ring-red-500/20 focus:border-red-500 outline-none transition-all placeholder:text-slate-400"
                            autoFocus
                        />
                    </div>
                </div>
            </Modal>

            <div className="w-full space-y-4">
                <div className="flex items-center justify-between px-1">
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                        <Settings className="h-4 w-4 text-slate-400" />
                        Background Jobs
                    </h3>
                    <span className="text-xs font-mono text-slate-400">
                        {JOBS.length} jobs
                    </span>
                </div>

                <div className="rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden">
                    <div className="divide-y divide-slate-100 dark:divide-slate-800">
                        {JOBS.map(({ id, label, description }) => (
                            <div
                                key={id}
                                className="group flex items-center justify-between px-4 py-3 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                            >
                                <div className="min-w-0 flex-1 space-y-0.5">
                                    <p className="font-medium text-sm text-slate-700 dark:text-slate-200">
                                        {label}
                                    </p>
                                    <p className="text-xs text-slate-500 dark:text-slate-400">
                                        {description}
                                    </p>
                                </div>

                                <button
                                    onClick={() => openConfirmation(id, label)}
                                    disabled={runningJob !== null}
                                    className="ml-4 p-1.5 rounded-md text-slate-400 hover:text-csway-green hover:bg-slate-100 dark:hover:bg-slate-700 dark:hover:text-csway-green transition-all focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
                                    title="Run Job"
                                >
                                    {runningJob === id ? (
                                        <Loader2 className="h-4 w-4 animate-spin" />
                                    ) : (
                                        <Play className="h-4 w-4 fill-current opacity-70 group-hover:opacity-100" />
                                    )}
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

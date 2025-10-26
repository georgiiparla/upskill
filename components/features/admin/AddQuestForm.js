"use client";

import { useState } from 'react';
import toast from 'react-hot-toast';
import { Sparkles, Loader2, PlusCircle } from 'lucide-react';

import { clientFetch } from '@/lib/client-api';
import { Card, SectionTitle } from '../../shared/helpers/Helper';

const initialFormState = {
    code: '',
    title: '',
    description: '',
    points: '50',
    explicit: true,
};

export const AddQuestForm = ({ onCreated }) => {
    const [form, setForm] = useState(initialFormState);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setForm((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    };

    const submit = async (e) => {
        e.preventDefault();
        if (loading) return;

        const trimmedCode = form.code.trim();
        const trimmedTitle = form.title.trim();
        const trimmedDescription = form.description.trim();

        if (!trimmedCode || !trimmedTitle || !trimmedDescription) {
            setError('Please complete all fields before creating a quest.');
            return;
        }

        const pointsValue = Number(form.points);
        if (Number.isNaN(pointsValue) || pointsValue < 0) {
            setError('Points must be a valid number greater than or equal to 0.');
            return;
        }

        setLoading(true);
        setError(null);

        const toastId = toast.loading('Creating quest...');

        const payload = {
            code: trimmedCode,
            title: trimmedTitle,
            description: trimmedDescription,
            points: pointsValue,
            explicit: Boolean(form.explicit),
        };

        const response = await clientFetch('/quests', { method: 'POST', body: payload });
        setLoading(false);

        if (!response.success) {
            const message = response.error || 'Failed to create quest. Please try again.';
            toast.error(message, { id: toastId });
            setError(message);
            return;
        }

        toast.success('Quest created successfully!', { id: toastId });
        setForm(initialFormState);
        setError(null);

        if (onCreated) {
            onCreated(response.data);
        }
    };

    return (
        <Card glass={false} className="h-full" innerClassName="space-y-6">
            <div className="space-y-3">
                <SectionTitle
                    icon={<Sparkles className="h-6 w-6 text-csway-green" />}
                    title="Create a new quest"
                />
                <p className="text-sm text-gray-600 dark:text-gray-400">
                    Design a new challenge for the team. Codes should be unique and descriptive so automations can pick them up easily.
                </p>
            </div>

            <form onSubmit={submit} className="space-y-5">
                <div className="grid gap-4 md:grid-cols-[1.2fr_0.8fr]">
                    <div className="space-y-2">
                        <label htmlFor="code" className="text-sm font-medium text-gray-700 dark:text-gray-300">Quest code</label>
                        <input
                            id="code"
                            name="code"
                            value={form.code}
                            onChange={handleChange}
                            placeholder="e.g. give_feedback"
                            className="w-full rounded-lg border border-slate-200/70 bg-white/90 px-3 py-2 text-sm text-gray-900 shadow-sm transition focus:border-csway-green focus:outline-none focus:ring-2 focus:ring-csway-green/30 dark:border-slate-700/70 dark:bg-slate-900/70 dark:text-gray-100"
                            autoComplete="off"
                            required
                        />
                        <p className="text-xs text-gray-500 dark:text-gray-400">Use lowercase with underscores. This must stay unique.</p>
                    </div>
                    <div className="space-y-2">
                        <label htmlFor="points" className="text-sm font-medium text-gray-700 dark:text-gray-300">Reward points</label>
                        <input
                            id="points"
                            type="number"
                            name="points"
                            min="0"
                            step="5"
                            value={form.points}
                            onChange={handleChange}
                            className="w-full rounded-lg border border-slate-200/70 bg-white/90 px-3 py-2 text-sm text-gray-900 shadow-sm transition focus:border-csway-green focus:outline-none focus:ring-2 focus:ring-csway-green/30 dark:border-slate-700/70 dark:bg-slate-900/70 dark:text-gray-100"
                            required
                        />
                        <p className="text-xs text-gray-500 dark:text-gray-400">Keep rewards aligned with existing quest tiers.</p>
                    </div>
                </div>

                <div className="space-y-2">
                    <label htmlFor="title" className="text-sm font-medium text-gray-700 dark:text-gray-300">Quest title</label>
                    <input
                        id="title"
                        name="title"
                        value={form.title}
                        onChange={handleChange}
                        placeholder="e.g. First Feedback Request"
                        className="w-full rounded-lg border border-slate-200/70 bg-white/90 px-3 py-2 text-sm text-gray-900 shadow-sm transition focus:border-csway-green focus:outline-none focus:ring-2 focus:ring-csway-green/30 dark:border-slate-700/70 dark:bg-slate-900/70 dark:text-gray-100"
                        required
                    />
                </div>

                <div className="space-y-2">
                    <label htmlFor="description" className="text-sm font-medium text-gray-700 dark:text-gray-300">Quest description</label>
                    <textarea
                        id="description"
                        name="description"
                        value={form.description}
                        onChange={handleChange}
                        placeholder="Describe what users need to do to complete this quest."
                        rows={4}
                        className="w-full rounded-lg border border-slate-200/70 bg-white/90 px-3 py-2 text-sm text-gray-900 shadow-sm transition focus:border-csway-green focus:outline-none focus:ring-2 focus:ring-csway-green/30 dark:border-slate-700/70 dark:bg-slate-900/70 dark:text-gray-100"
                        required
                    />
                </div>



                {error && <p className="text-sm text-red-500 dark:text-red-400">{error}</p>}

                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-start gap-3">
                        <input
                            id="explicit"
                            name="explicit"
                            type="checkbox"
                            checked={form.explicit}
                            onChange={handleChange}
                            className="mt-1 h-4 w-4 rounded border-slate-300 text-csway-green focus:ring-csway-green"
                        />
                        <div className="space-y-1">
                            <label htmlFor="explicit" className="text-sm font-medium text-gray-700 dark:text-gray-300">Show in quests carousel</label>
                        </div>
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        className="inline-flex items-center justify-center gap-2 rounded-lg bg-csway-green px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-csway-green/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-csway-green disabled:cursor-not-allowed disabled:bg-slate-400"
                    >
                        {loading ? (
                            <>
                                <Loader2 className="h-4 w-4 animate-spin" />
                                Creating...
                            </>
                        ) : (
                            <>
                                Create
                            </>
                        )}
                    </button>
                </div>
            </form>
        </Card>
    );
};

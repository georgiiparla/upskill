"use client";
import { useState } from 'react';
import toast from 'react-hot-toast';
import { Card, SectionTitle } from "@/components/ui/Shared";
// [!] Swapping Lucide for Tabler
import { IconAt, IconMailPlus, IconTrash, IconLoader2 } from '@tabler/icons-react';
import { Modal } from '@/components/ui/Modal';
import { addUserAlias, removeUserAlias } from '@/lib/client-api';

export const AliasManager = ({ initialAliases = [] }) => {
    const [aliases, setAliases] = useState(initialAliases);
    const [newAlias, setNewAlias] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedAlias, setSelectedAlias] = useState(null);
    const MAX_EMAIL_LENGTH = 254;

    const handleAddAlias = async (e) => {
        e.preventDefault();
        if (!newAlias.trim()) {
            toast.error("Email cannot be empty.");
            return;
        }
        setIsSubmitting(true);
        const toastId = toast.loading('Adding email alias...');
        const response = await addUserAlias(newAlias);
        if (response.success) {
            toast.success('Alias added!', { id: toastId });
            setAliases([...aliases, response.data]);
            setNewAlias('');
        } else {
            toast.error(`Error: ${response.error}`, { id: toastId });
        }
        setIsSubmitting(false);
    };

    const confirmRemove = (alias) => {
        setSelectedAlias(alias);
        setIsModalOpen(true);
    };

    const handleRemoveAlias = async () => {
        if (!selectedAlias) return;
        setIsModalOpen(false);
        const toastId = toast.loading('Removing alias...');
        const response = await removeUserAlias(selectedAlias.id);
        if (response.success) {
            toast.success('Alias removed!', { id: toastId });
            setAliases(aliases.filter(a => a.id !== selectedAlias.id));
            setSelectedAlias(null);
        } else {
            toast.error(`Error: ${response.error}`, { id: toastId });
        }
    };

    return (
        <>
            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onConfirm={handleRemoveAlias}
                title="Confirm Removal"
                confirmText="Remove"
            >
                <p>Are you sure you want to remove <strong>{selectedAlias?.email}</strong> as an alias? You will no longer be able to log in with this email.</p>
            </Modal>

            <Card>
                <SectionTitle icon={<IconAt className="h-6 w-6 text-csway-green" />} title="Manage Your Email Aliases" />
                <p className="mb-6 text-sm text-gray-600 dark:text-gray-400">
                    Add an alternative email you can use to sign into your account.
                </p>

                <div className="mb-6 space-y-2">
                    {aliases.map(alias => (
                        <div key={alias.id} className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-800/60 rounded-lg">
                            <p className="font-medium text-gray-800 dark:text-gray-200">{alias.email}</p>
                            <button
                                onClick={() => confirmRemove(alias)}
                                className="p-2 text-gray-500 rounded-full hover:bg-red-100 hover:text-red-600 dark:hover:bg-red-900/50"
                                title="Remove Alias"
                            >
                                <IconTrash className="h-4 w-4" />
                            </button>
                        </div>
                    ))}
                </div>

                {aliases.length === 0 ? (
                    <form onSubmit={handleAddAlias} className="flex gap-2 border-t border-gray-200 dark:border-gray-700 pt-4">
                        <input
                            type="email"
                            value={newAlias}
                            onChange={(e) => setNewAlias(e.target.value)}
                            maxLength={MAX_EMAIL_LENGTH}
                            placeholder="your-alias@example.com"
                            className="flex-grow px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700"
                            required
                        />
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            title="Add Alias"
                            className="flex items-center justify-center p-2.5 text-white bg-csway-green rounded-lg shadow-sm hover:bg-green-500/80 focus:outline-none focus:ring-2 disabled:bg-gray-400"
                        >
                            {isSubmitting ? <IconLoader2 className="h-5 w-5 animate-spin" /> : <IconMailPlus className="h-5 w-5" />}
                        </button>
                    </form>
                ) : (
                    <div className="border-t border-gray-200 dark:border-gray-700 pt-4 text-center text-sm text-gray-500 dark:text-gray-400">
                        You have reached the limit of one email alias.
                    </div>
                )}
            </Card>
        </>
    );
};
import { Card } from "@/components/ui/Shared";
import { Avatar } from '@/components/ui/Avatar';

import {
    IconTag,
    IconMessagePlus,
    IconTrash,
    IconArchive,
    IconEye,
    IconEyeOff
} from "@tabler/icons-react";
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import toast from 'react-hot-toast';
import { Modal } from '@/components/ui/Modal';
import { clientFetch } from '@/lib/client-api';
import { DetailActionButton } from '@/components/ui/Buttons';

export const RequestDetailsCard = ({ requestData, onUpdate }) => {
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isCloseModalOpen, setIsCloseModalOpen] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [isClosing, setIsClosing] = useState(false);
    const [isTogglingVisibility, setIsTogglingVisibility] = useState(false);
    const router = useRouter();
    const { refreshNavbarPoints } = useAuthStore();

    const handleClose = async () => {
        setIsClosing(true);
        const toastId = toast.loading('Closing request...');

        const response = await clientFetch(`/feedback_requests/${requestData.id}`, {
            method: 'PATCH',
            body: { status: 'closed' }
        });

        setIsClosing(false);
        setIsCloseModalOpen(false);

        if (response.success) {
            toast.success('Request closed successfully!', { id: toastId });
            onUpdate(response.data);
        } else {
            toast.error(`Error: ${response.error}`, { id: toastId });
        }
    };

    const handleDelete = async () => {
        setIsDeleting(true);
        const toastId = toast.loading('Deleting request...');

        const response = await clientFetch(`/feedback_requests/${requestData.id}`, {
            method: 'DELETE'
        });

        setIsDeleting(false);
        setIsDeleteModalOpen(false);

        if (response.success) {
            toast.success('Request deleted successfully!', { id: toastId });
            // Refresh navbar points since deleting the request should remove awarded points
            try { refreshNavbarPoints(); } catch (e) { /* ignore */ }
            router.push('/feedback');
            router.refresh();
        } else {
            toast.error(`Error: ${response.error}`, { id: toastId });
        }
    };

    const handleVisibilityToggle = async () => {
        setIsTogglingVisibility(true);
        const newVisibility = requestData.visibility === 'public' ? 'requester_only' : 'public';
        const toastId = toast.loading(`Making request ${newVisibility === 'public' ? 'public' : 'private'}...`);

        const response = await clientFetch(`/feedback_requests/${requestData.id}/visibility`, {
            method: 'PATCH',
            body: { visibility: newVisibility }
        });

        setIsTogglingVisibility(false);

        if (response.success) {
            toast.success('Visibility updated!', { id: toastId });
            onUpdate(response.data);
        } else {
            toast.error(`Error: ${response.error}`, { id: toastId });
        }
    };

    const shouldShowActionCard = requestData.isOwner || (!requestData.isOwner && requestData.status !== 'closed');

    const isClosed = requestData.status === 'closed';
    const displayTopic = isClosed ? `[Closed] ${requestData.topic}` : requestData.topic;
    const topicClasses = isClosed
        ? "text-gray-500 dark:text-gray-400"
        : "text-gray-900 dark:text-white";

    const isPublic = requestData.visibility === 'public';

    return (
        <div className="space-y-6">
            <Modal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                onConfirm={handleDelete}
                title="Confirm Deletion"
                confirmText="Delete"
                confirmButtonClass="bg-red-600 hover:bg-red-700"
                isConfirming={isDeleting}
            >
                <p>Are you sure you want to delete this feedback request? This action cannot be undone.</p>
            </Modal>

            <Modal
                isOpen={isCloseModalOpen}
                onClose={() => setIsCloseModalOpen(false)}
                onConfirm={handleClose}
                title="Confirm Close"
                confirmText="Close Request"
                confirmButtonClass="bg-blue-600 hover:bg-blue-700"
                isConfirming={isClosing}
            >
                <p>Are you sure you want to close this feedback request? Once closed, no new feedback can be submitted.</p>
            </Modal>

            <div>
                <h3 className={`text-lg font-bold transition-colors break-words ${topicClasses}`}>{displayTopic}</h3>
                <div className="flex items-center gap-2 mt-2">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Requested by</span>

                    {requestData.pair_username ? (
                        <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded-full border border-slate-200 dark:border-slate-700">
                            <div className="flex -space-x-2">
                                <Avatar username={requestData.requester_username} className="w-5 h-5 text-[9px] ring-2 ring-white dark:ring-slate-900" />
                                <Avatar username={requestData.pair_username} className="w-5 h-5 text-[9px] ring-2 ring-white dark:ring-slate-900" />
                            </div>
                            <span className="text-sm font-medium text-gray-900 dark:text-gray-200">
                                {requestData.requester_username} & {requestData.pair_username}
                            </span>
                        </div>
                    ) : (
                        <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded-full border border-slate-200 dark:border-slate-700">
                            <Avatar username={requestData.requester_username} className="w-5 h-5 text-[9px]" />
                            <span className="text-sm font-medium text-gray-900 dark:text-gray-200">
                                {requestData.requester_username}
                            </span>
                        </div>
                    )}

                    <span className="text-sm text-gray-500 dark:text-gray-400">on {new Date(requestData.created_at).toLocaleDateString()}</span>
                </div>
            </div>

            <div className="space-y-4">
                <div className="space-y-8">
                    <div className="space-y-6 text-sm text-gray-700 dark:text-gray-300 bg-gradient-to-br from-slate-50/60 to-slate-100/40 dark:from-slate-800/60 dark:to-slate-700/40 p-4 rounded-md border border-slate-200/40 dark:border-slate-700/40">
                        <div>
                            <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed break-words">
                                {requestData.details ? requestData.details : "No additional details provided."}
                            </p>
                        </div>

                        <div className="flex items-center space-x-2 bg-gradient-to-br from-slate-100/60 to-slate-200/40 dark:from-slate-700/60 dark:to-slate-600/40 p-2 rounded-md">
                            <IconTag className="h-4 w-4 text-gray-500" stroke={1.5} />
                            <span className="text-xs font-mono text-gray-600 dark:text-gray-400">{requestData.tag}</span>
                        </div>
                    </div>
                </div>

                {shouldShowActionCard && (
                    <Card>
                        <div className="flex justify-center items-center gap-2">
                            {!requestData.isOwner && !isClosed && (
                                <Link href={`/feedback/request/${requestData.tag}/new`} passHref>
                                    <DetailActionButton
                                        icon={IconMessagePlus} text="Give Feedback" colorScheme="orange" title="Give Feedback"
                                    />
                                </Link>
                            )}
                            {requestData.isOwner && (
                                <>
                                    <DetailActionButton
                                        icon={isPublic ? IconEyeOff : IconEye}
                                        text={isPublic ? "Private" : "Public"}
                                        colorScheme="gray"
                                        onClick={handleVisibilityToggle}
                                        isLoading={isTogglingVisibility}
                                        title="Toggle visibility"
                                    />
                                    {!isClosed && (
                                        <DetailActionButton
                                            icon={IconArchive} text="Close" colorScheme="blue"
                                            onClick={() => setIsCloseModalOpen(true)}
                                            isLoading={isClosing} title="Close Request"
                                        />
                                    )}
                                    <DetailActionButton
                                        icon={IconTrash} text="Delete" colorScheme="red"
                                        onClick={() => setIsDeleteModalOpen(true)}
                                        isLoading={isDeleting} title="Delete Request"
                                    />
                                </>
                            )}
                        </div>
                    </Card>
                )}
            </div>
        </div>
    );
};
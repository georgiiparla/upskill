import { Card } from "../../../shared/helpers/Helper";
import { Tag, MessageSquarePlus, Trash2, Archive, Eye, EyeOff } from "lucide-react";
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import toast from 'react-hot-toast';
import { Modal } from '../../../core/ui/Modal';
import { clientFetch } from '@/lib/client-api';
import { DetailActionButton } from '../../../core/buttons/Buttons';

export const RequestDetailsCard = ({ requestData, onUpdate }) => {
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isCloseModalOpen, setIsCloseModalOpen] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [isClosing, setIsClosing] = useState(false);
    const [isTogglingVisibility, setIsTogglingVisibility] = useState(false);
    const router = useRouter();
    const { refreshNavbarPoints } = useAuth();

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
        <>
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
                <h3 className={`text-lg font-bold transition-colors ${topicClasses}`}>{displayTopic}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    Requested by <span className="font-medium">{requestData.requester_username}</span> on {new Date(requestData.created_at).toLocaleDateString()}
                </p>
            </div>

            <div className="space-y-4">
                <div className="space-y-8">
                    <div className="space-y-6 text-sm text-gray-700 dark:text-gray-300 bg-gradient-to-br from-slate-50/60 to-slate-100/40 dark:from-slate-800/60 dark:to-slate-700/40 p-4 rounded-md border border-slate-200/40 dark:border-slate-700/40">
                        <div>
                            <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                                {requestData.details ? requestData.details : "No additional details provided."}
                            </p>
                        </div>

                        <div className="flex items-center space-x-2 bg-gradient-to-br from-slate-100/60 to-slate-200/40 dark:from-slate-700/60 dark:to-slate-600/40 p-2 rounded-md">
                            <Tag className="h-4 w-4 text-gray-500" />
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
                                        icon={MessageSquarePlus} text="Give Feedback" colorScheme="orange" title="Give Feedback"
                                    />
                                </Link>
                            )}

                            {requestData.isOwner && (
                                <>
                                    <DetailActionButton
                                        icon={isPublic ? EyeOff : Eye}
                                        text={isPublic ? "Private" : "Public"}
                                        colorScheme="gray"
                                        onClick={handleVisibilityToggle}
                                        isLoading={isTogglingVisibility}
                                        title="Toggle visibility"
                                    />
                                    {!isClosed && (
                                        <DetailActionButton
                                            icon={Archive} text="Close" colorScheme="blue"
                                            onClick={() => setIsCloseModalOpen(true)}
                                            isLoading={isClosing} title="Close Request"
                                        />
                                    )}
                                    <DetailActionButton
                                        icon={Trash2} text="Delete" colorScheme="red"
                                        onClick={() => setIsDeleteModalOpen(true)}
                                        isLoading={isDeleting} title="Delete Request"
                                    />
                                </>
                            )}
                        </div>
                    </Card>
                )}
            </div>
        </>
    );
};
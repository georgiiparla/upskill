import { Card } from "@/components/shared/Helper";
import { Tag, MessageSquarePlus, Trash2, Pencil } from "lucide-react";
import Link from 'next/link';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { Modal } from '@/components/shared/Modal';
import { clientFetch } from '@/lib/client-api';

export const RequestDetailsCard = ({ requestData }) => {
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const router = useRouter();

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
            router.push('/feedback');
            router.refresh();
        } else {
            toast.error(`Error: ${response.error}`, { id: toastId });
        }
    };

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

            <div className="space-y-4">
                
                <Card innerClassName="!p-2">
                    <div className="flex justify-center items-center space-x-4">
                        <Link href={`/feedback/request/${requestData.tag}/new`} passHref>
                            <button
                                title="Give Feedback"
                                className="flex items-center px-4 py-2 rounded-md text-csway-orange hover:bg-csway-orange/10 transition-colors text-sm font-medium"
                            >
                                <MessageSquarePlus className="h-4 w-4 mr-2" />
                                <span>Comment</span>
                            </button>
                        </Link>

                        
                        {requestData.isOwner && (
                            <>
                                <button
                                    title="Edit Request"
                                    className="flex items-center px-4 py-2 rounded-md text-gray-500 hover:bg-gray-500/10 transition-colors text-sm font-medium"
                                    onClick={() => alert('Edit action not implemented yet.')}
                                >
                                    <Pencil className="h-4 w-4 mr-2" />
                                    <span>Edit</span>
                                </button>
                                <button
                                    title="Delete Request"
                                    className="flex items-center px-4 py-2 rounded-md text-gray-500 hover:text-red-500 hover:bg-red-500/10 transition-colors text-sm font-medium"
                                    onClick={() => setIsDeleteModalOpen(true)}
                                >
                                    <Trash2 className="h-4 w-4 mr-2" />
                                    <span>Delete</span>
                                </button>
                            </>
                        )}
                    </div>
                </Card>
                
                
                <Card>
                    <div className="space-y-8">
                        <div>
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white">{requestData.topic}</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                                Requested by <span className="font-medium">{requestData.requester_username}</span> on {new Date(requestData.created_at).toLocaleDateString()}
                            </p>
                        </div>
                        <div className="text-sm text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-700/50 p-4 rounded-md border border-gray-200 dark:border-gray-700">
                            <span className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                                Description:
                            </span>
                            <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                                {requestData.details}
                            </p>
                        </div>
                        <div className="flex items-center space-x-2 bg-gray-100 dark:bg-gray-800 p-2 rounded-md">
                            <Tag className="h-4 w-4 text-gray-500" />
                            <span className="text-xs font-mono text-gray-600 dark:text-gray-400">{requestData.tag}</span>
                        </div>
                    </div>
                </Card>
            </div>
        </>
    );
};
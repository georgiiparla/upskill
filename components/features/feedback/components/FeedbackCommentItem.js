"use client";
import { useState } from "react";
import { Card } from "@/components/ui/Shared";
import { Avatar } from "@/components/ui/Avatar";
import { formatRelativeTime } from "@/lib/helper-func";

import { IconThumbUp, IconTrash, IconUser } from "@tabler/icons-react";
import { Modal } from "@/components/ui/Modal";
import { likeSubmission, unlikeSubmission, deleteSubmission } from "@/lib/client-api";
import { useAuthStore } from "@/store/authStore";
import toast from 'react-hot-toast';

export const FeedbackCommentItem = ({ feedback, onDeleteSuccess }) => {
    const [isLiked, setIsLiked] = useState(feedback.initialLiked || false);
    const [likeCount, setLikeCount] = useState(feedback.likes || 0);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const { refreshNavbarPoints } = useAuthStore();
    const isOwner = feedback.isCommentOwner;

    const handleLikeToggle = async () => {
        const originalLikedState = isLiked;
        const originalLikeCount = likeCount;
        setIsLiked(!originalLikedState);
        setLikeCount(originalLikedState ? originalLikeCount - 1 : originalLikeCount + 1);
        const action = originalLikedState ? unlikeSubmission : likeSubmission;
        const response = await action(feedback.id);
        if (!response.success) {
            toast.error(response.error || "Failed to update like.");
            setIsLiked(originalLikedState);
            setLikeCount(originalLikeCount);
        } else {
            try { refreshNavbarPoints(); } catch (e) { /* ignore */ }
        }
    };

    const handleDelete = async () => {
        setIsDeleting(true);
        const toastId = toast.loading('Deleting comment...');
        const response = await deleteSubmission(feedback.id);
        setIsDeleting(false);
        setIsDeleteModalOpen(false);
        if (response.success) {
            toast.success('Comment deleted!', { id: toastId });
            onDeleteSuccess(feedback.id);
            try { refreshNavbarPoints(); } catch (e) { /* ignore */ }
        } else {
            toast.error(`Error: ${response.error}`, { id: toastId });
        }
    };

    const sentimentColors = {
        'Exceeds Expectations': "bg-teal-500/10 dark:bg-teal-900/20 text-teal-700 dark:text-teal-400",
        'Meets Expectations': "bg-green-500/10 dark:bg-green-900/20 text-green-700 dark:text-green-400",
        'Approaching Expectations': "bg-yellow-500/10 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-400",
        'Below Expectations': "bg-red-500/10 dark:bg-red-900/20 text-red-700 dark:text-red-400",
    };
    const colorClass = sentimentColors[feedback.sentiment_text] || sentimentColors['Meets Expectations'];

    return (
        <div>
            <Modal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                onConfirm={handleDelete}
                title="Confirm Deletion"
                confirmText="Delete Comment"
                confirmButtonClass="bg-red-600 hover:bg-red-700"
                isConfirming={isDeleting}
            >
                Are you sure you want to permanently delete this comment?
            </Modal>
            <Card className={`transition-shadow hover:shadow-md ${colorClass}`}>
                <div className="flex flex-col space-y-3">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-2">
                            <IconUser className="h-4 w-4 text-gray-500 dark:text-gray-400" stroke={1.5} />
                            <span className="font-semibold text-gray-900 dark:text-white">
                                {feedback.authorName} {isOwner && '(Me)'}
                            </span>
                        </div>
                        <span className={`truncate max-w-28 sm:max-w-none text-xs font-medium px-2 py-0.5 rounded-full ${colorClass.replace('border-l-2', '')}`}>
                            {feedback.sentiment_text}
                        </span>
                    </div>
                </div>
                <div className="mt-3">
                    <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed break-words">{feedback.content}</p>
                    <div className="flex justify-between items-center pt-2 border-t border-gray-200 dark:border-gray-700 mt-3">
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                            {formatRelativeTime(feedback.created_at)}
                        </span>
                        <div className="flex items-center space-x-2">
                            {isOwner && (
                                <button
                                    onClick={() => setIsDeleteModalOpen(true)}
                                    className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-red-100 dark:hover:bg-red-900/50 hover:text-red-600 dark:hover:text-red-400 transition-colors"
                                    title="Delete Comment"
                                >
                                    <IconTrash className="h-4 w-4" stroke={1.5} />
                                </button>
                            )}
                            <button
                                onClick={handleLikeToggle}
                                className={`flex items-center space-x-1.5 px-3 py-1 rounded-full text-sm transition-colors ${isLiked
                                    ? "text-blue-600 bg-blue-100 dark:bg-blue-900 dark:text-blue-300 hover:bg-blue-200"
                                    : "text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                                    }`}
                            >
                                <IconThumbUp className={`h-4 w-4 ${isLiked ? "fill-current" : ""}`} stroke={1.5} />
                                <span>{likeCount}</span>
                            </button>
                        </div>
                    </div>
                </div>
            </Card>
        </div>
    );
};
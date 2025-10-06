"use client";

import { useState } from "react";
import { Card } from "../../../shared/helpers/Helper";
import { formatRelativeTime } from "@/lib/helper-func";
import { ThumbsUp, User, Trash2 } from "lucide-react";
import { Modal } from "../../../core/ui/Modal";
import { likeSubmission, unlikeSubmission, deleteSubmission } from "@/lib/client-api";
import { useAuth } from "@/context/AuthContext";
import toast from 'react-hot-toast';

export const FeedbackCommentItem = ({ feedback, onDeleteSuccess }) => {
    const [isLiked, setIsLiked] = useState(feedback.initialLiked || false);
    const [likeCount, setLikeCount] = useState(feedback.likes || 0);

    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    const { refreshNavbarPoints } = useAuth();
    const isOwner = feedback.isCommentOwner;

    const handleLikeToggle = async () => {
        const originalLikedState = isLiked;
        const originalLikeCount = likeCount;

        setIsLiked(!originalLikedState);
        setLikeCount(originalLikedState ? originalLikeCount - 1 : originalLikeCount + 1);

        const action = originalLikedState ? unlikeSubmission : likeSubmission;
        const response = await action(feedback.id);

        if (!response.success) {
            toast.error("Failed to update like.");
            setIsLiked(originalLikedState);
            setLikeCount(originalLikeCount);
        } else if (!originalLikedState) {
            // Only refresh on like (not unlike) since liking completes the 'like_feedback' quest
            refreshNavbarPoints();
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
        } else {
            toast.error(`Error: ${response.error}`, { id: toastId });
        }
    };

    const sentimentColors = {
        'Far Exceeds Expectations': "border-teal-500 bg-teal-50 dark:bg-teal-900/20 text-teal-700 dark:text-teal-400",
        'Exceeds Expectations': "border-green-500 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400",
        'Below Expectations': "border-red-500 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400",
        'Meets Expectations': "border-amber-500 bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400",
    };

    const colorClass = sentimentColors[feedback.sentiment_text] || sentimentColors['Meets Expectations'];

    return (
        <>
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
                            <User className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                            <span className="font-semibold text-gray-900 dark:text-white">
                                {feedback.authorName} {isOwner && '(Me)'}
                            </span>
                        </div>
                        <span className={`truncate max-w-28 sm:max-w-none text-xs font-medium px-2 py-0.5 rounded-full ${colorClass.replace('border-l-2', '')}`}>
                            {feedback.sentiment_text}
                        </span>
                    </div>

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
                                    <Trash2 className="h-4 w-4" />
                                </button>
                            )}
                            <button
                                onClick={handleLikeToggle}
                                className={`flex items-center space-x-1.5 px-3 py-1 rounded-full text-sm transition-colors ${isLiked
                                    ? "text-blue-600 bg-blue-100 dark:bg-blue-900 dark:text-blue-300 hover:bg-blue-200"
                                    : "text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                                    }`}
                            >
                                <ThumbsUp className={`h-4 w-4 ${isLiked ? "fill-current" : ""}`} />
                                <span>{likeCount}</span>
                            </button>
                        </div>
                    </div>
                </div>
            </Card>
        </>
    );
};
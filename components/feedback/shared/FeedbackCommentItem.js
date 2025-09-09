"use client";

import { useState } from "react";
import { Card } from "@/components/shared/Helper";
import { formatRelativeTime } from "@/lib/helper_func";
import { ThumbsUp, User } from "lucide-react";

export const FeedbackCommentItem = ({ feedback }) => {
    const [liked, setLiked] = useState(feedback.initialLiked || false);
    const [likeCount, setLikeCount] = useState(feedback.likes || 0);

    const handleLikeToggle = () => {
        setLiked(!liked);
        setLikeCount(liked ? likeCount - 1 : likeCount + 1);
    };

    const sentimentColors = {
        'Far Exceeds Expectations': "border-teal-500 bg-teal-50 dark:bg-teal-900/20 text-teal-700 dark:text-teal-400",
        'Exceeds Expectations': "border-green-500 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400",
        'Needs Improvement': "border-red-500 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400",
        'Meets Expectations': "border-amber-500 bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400",
    };

    const colorClass = sentimentColors[feedback.sentiment_text] || sentimentColors['Meets Expectations'];

    return (
        <Card className={`transition-shadow hover:shadow-md ${colorClass}`}>
            <div className="flex flex-col space-y-3">
                
                <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                        <User className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                        <span className="font-semibold text-gray-900 dark:text-white">{feedback.authorName}</span>
                    </div>
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${colorClass.replace('border-l-2', '')}`}>
                        
                        {feedback.sentiment_text}
                    </span>
                </div>

                
                <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">{feedback.content}</p>

                
                <div className="flex justify-between items-center pt-2 border-t border-gray-200 dark:border-gray-700 mt-3">
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                        {formatRelativeTime(feedback.created_at)}
                    </span>
                    <button
                        onClick={handleLikeToggle}
                        className={`flex items-center space-x-1.5 px-3 py-1 rounded-full text-sm transition-colors ${liked
                            ? "text-blue-600 bg-blue-100 dark:bg-blue-900 dark:text-blue-300 hover:bg-blue-200"
                            : "text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                            }`}
                    >
                        <ThumbsUp className={`h-4 w-4 ${liked ? "fill-current" : ""}`} />
                        <span>{likeCount}</span>
                    </button>
                </div>
            </div>
        </Card>
    );
};
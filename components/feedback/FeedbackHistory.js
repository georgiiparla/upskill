"use client";
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { MOCK_FEEDBACK_HISTORY } from "@/mock/mock_data";
import { Card, SectionTitle } from "../Helper";
import { MessageSquare, Loader2 } from "lucide-react";

// --- Skeleton Component for Initial Loading ---
const FeedbackSkeleton = () => (
    // Updated skeleton to match the new list item style
    <li className="p-4 rounded-lg bg-gray-50 dark:bg-gray-800/60 border-l-2 border-gray-300 dark:border-gray-600 animate-pulse">
        <div className="flex justify-between items-center mb-2">
            <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-1/3"></div>
            <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-1/4"></div>
        </div>
        <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-full"></div>
    </li>
);

// Updated function to only return the color, not the border width
const getSentimentColor = (sentiment) => {
    switch (sentiment) {
        case 'Positive': return 'border-green-500';
        case 'Negative': return 'border-red-500';
        default: return 'border-amber-500';
    }
};

export const FeedbackHistory = () => {
    const [items, setItems] = useState([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [isLoading, setIsLoading] = useState(true);
    const observer = useRef();
    const ITEMS_PER_PAGE = 5;
    const FAKE_DELAY_MS = 1500;

    // Effect for INITIAL data load with skeleton
    useEffect(() => {
        setIsLoading(true);
        const timer = setTimeout(() => {
            const initialItems = MOCK_FEEDBACK_HISTORY.slice(0, ITEMS_PER_PAGE);
            setItems(initialItems);
            setHasMore(MOCK_FEEDBACK_HISTORY.length > ITEMS_PER_PAGE);
            setIsLoading(false);
        }, FAKE_DELAY_MS);
        return () => clearTimeout(timer);
    }, []);

    // Effect for SUBSEQUENT page loads (infinite scroll)
    useEffect(() => {
        if (page === 1) return;
        const timer = setTimeout(() => {
            const startIndex = (page - 1) * ITEMS_PER_PAGE;
            const newItems = MOCK_FEEDBACK_HISTORY.slice(startIndex, startIndex + ITEMS_PER_PAGE);
            if (newItems.length > 0) {
                setItems(prev => [...prev, ...newItems]);
            }
            setHasMore(MOCK_FEEDBACK_HISTORY.length > startIndex + ITEMS_PER_PAGE);
        }, FAKE_DELAY_MS);
        return () => clearTimeout(timer);
    }, [page]);

    // Intersection Observer to trigger loading more items
    const lastItemRef = useCallback(node => {
        if (isLoading) return;
        if (observer.current) observer.current.disconnect();
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && hasMore) {
                setPage(prevPage => prevPage + 1);
            }
        });
        if (node) observer.current.observe(node);
    }, [isLoading, hasMore]);

    return (
        <div>
            <Card>
                <SectionTitle className={"mb-6"} icon={<MessageSquare className="h-6 w-6 text-indigo-500" />} title="Submission History" />
                <ul className="space-y-4">
                    {items.map((item, index) => (
                        <li
                            ref={items.length === index + 1 ? lastItemRef : null}
                            key={`${item.id}-${index}`}
                            // --- STYLING IMPROVEMENTS APPLIED HERE ---
                            className={`
                                bg-gray-50 dark:bg-gray-800/60 
                                p-4 
                                rounded-lg 
                                transition-colors 
                                hover:bg-gray-100 dark:hover:bg-gray-700/80
                                border-l-2 
                                ${getSentimentColor(item.sentiment)}
                            `}
                        >
                            <div className="flex justify-between items-center mb-1">
                                <h4 className="text-sm font-semibold text-gray-800 dark:text-gray-200">{item.subject}</h4>
                                <span className="text-sm text-gray-500 dark:text-gray-400">{item.date}</span>
                            </div>
                            <p className="text-sm text-gray-600 dark:text-gray-300">{item.content}</p>
                        </li>
                    ))}
                    {/* Skeletons are shown via the isLoading flag on the parent */}
                    {isLoading && (
                        <>
                            <FeedbackSkeleton />
                            <FeedbackSkeleton />
                            <FeedbackSkeleton />
                        </>
                    )}
                </ul>
                {/* Loader for infinite scroll */}
                {hasMore && !isLoading && (
                    <div className="flex justify-center items-center pt-6">
                        <Loader2 className="h-6 w-6 text-gray-500 animate-spin" />
                    </div>
                )}
            </Card>
        </div>
    );
};

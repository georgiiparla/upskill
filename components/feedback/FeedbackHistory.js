"use client";
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Card, SectionTitle } from "../Helper";
import { MessageSquare, Loader2, AlertTriangle } from "lucide-react";

import {MOCK_FEEDBACK_HISTORY} from "@/mock/mock_data";


const FeedbackSkeleton = () => (
    <li className="p-4 rounded-lg bg-gray-50 dark:bg-gray-800/60 border-l-2 border-gray-300 dark:border-gray-600 animate-pulse">
        <div className="flex justify-between items-center mb-2">
            <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-1/3"></div>
            <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-1/4"></div>
        </div>
        <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-full"></div>
    </li>
);





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
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isFetchingMore, setIsFetchingMore] = useState(false);
    const observer = useRef();
    const ITEMS_PER_PAGE = 5;

    

    useEffect(() => {
        const fetchFeedback = async () => {
            if (page === 1) {
                setIsLoading(true);
            } else {
                setIsFetchingMore(true);
            }

            try {
                await new Promise(resolve => setTimeout(resolve, 1000));
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/feedback?page=${page}&limit=${ITEMS_PER_PAGE}`, { credentials: 'include' });
                if (!response.ok) {
                    throw new Error(`The server responded with status: ${response.status}`);
                }
                const data = await response.json();
                console.log(data);

                setItems(MOCK_FEEDBACK_HISTORY);

                // setItems(prevItems => page === 1 ? data.items : [...prevItems, ...data.items]);
                // setHasMore(data.hasMore);

            } catch (err) {
                console.error("Failed to fetch feedback history:", err);
                setError(err.message);
                setHasMore(false);
            } finally {
                setIsLoading(false);
                setIsFetchingMore(false);
            }
        };

        if (hasMore && !error) {
            fetchFeedback();
        }
    }, [page, hasMore, error]);

    

    // TRIGGERED on last element
    const lastItemRef = useCallback(node => {
        if (isLoading || isFetchingMore) return;
        if (observer.current) observer.current.disconnect();
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && hasMore) {
                setPage(prevPage => prevPage + 1);
            }
        }); // This is a boolean that's true if the element you're watching (the last <li>) has entered the viewport.
        if (node) observer.current.observe(node);
    }, [isLoading, isFetchingMore, hasMore]);

    

    

    if (error && items.length === 0) {
        return (
            <Card>
                <SectionTitle className={"mb-6"} icon={<MessageSquare className="h-6 w-6 text-csway-orange" />} title="Submission History" />
                <div className="flex flex-col items-center justify-center text-center p-8">
                    <AlertTriangle className="h-12 w-12 text-red-500 mb-4" />
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Could not load feedback history</h3>
                    <p className="text-sm text-red-500 dark:text-red-400 mt-1">{error}</p>
                </div>
            </Card>
        )
    }

    

    return (
        <div>

        
            <Card>

                <SectionTitle className={"mb-6"} icon={<MessageSquare className="h-6 w-6 text-csway-orange" />} title="Submission History" />

                

                {isLoading && items.length === 0 ? (
                    <ul className="space-y-4">
                        <FeedbackSkeleton />
                        <FeedbackSkeleton />
                        <FeedbackSkeleton />
                    </ul>
                ) : (
                    <ul className="space-y-4">
                        {items.map((item, index) => (
                            <li
                                // ref={items.length === index + 1 ? lastItemRef : null}   // Targeting the Last Element
                                key={`${item.id}-${index}`}
                                className={`
                                    bg-gray-50 dark:bg-gray-800/60 p-4 rounded-lg 
                                    transition-colors hover:bg-gray-100 dark:hover:bg-gray-700/80
                                    border-l-2 ${getSentimentColor(item.sentiment)}
                                `}
                            >
                                <div className="flex justify-between items-center mb-1">
                                    <h4 className="text-sm font-semibold text-gray-800 dark:text-gray-200">{item.subject}</h4>
                                    <span className="text-xs text-gray-500 dark:text-gray-400">{item.created_at}</span>
                                </div>
                                <p className="text-sm text-gray-600 dark:text-gray-300">{item.content}</p>
                            </li>
                        ))}
                    </ul>
                )}

                

                {isFetchingMore && (
                    <div className="flex justify-center items-center pt-6">
                        <Loader2 className="h-6 w-6 text-gray-500 animate-spin" />
                    </div>
                )}
            </Card>
        
        </div>
    );
};
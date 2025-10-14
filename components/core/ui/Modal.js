"use client";

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { X, Loader2 } from 'lucide-react';

export const Modal = ({
    isOpen,
    onClose,
    onConfirm,
    title,
    children,
    confirmText = "Confirm",
    cancelText = "Cancel",
    confirmButtonClass = "bg-red-600 hover:bg-red-700",
    isConfirming = false
}) => {
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    if (!isOpen || !isClient) {
        return null;
    }

    return createPortal(
        <div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm"
            onClick={onClose}
        >
            <div
                className="relative w-full max-w-md p-6 bg-white rounded-lg shadow-xl dark:bg-gray-800"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex items-center justify-between pb-4 border-b border-gray-200 dark:border-gray-700">
                    <h3 className="text-lg font-normal font-mono tracking-tight text-gray-900 dark:text-white">{title}</h3>
                    <button
                        onClick={onClose}
                        className="p-1 rounded-full text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <div className="py-6 text-sm font-normal font-mono tracking-tight text-gray-600 dark:text-gray-300 mb-3">
                    {children}
                </div>

                <div className="flex justify-end space-x-4">
                    <button
                        onClick={onClose}
                        disabled={isConfirming}
                        className="px-4 py-2 text-sm font-normal font-mono tracking-tight text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600 focus:outline-none disabled:opacity-50"
                    >
                        {cancelText}
                    </button>

                    <button
                        onClick={onConfirm}
                        disabled={isConfirming}
                        className={`px-4 py-2 text-sm font-normal font-mono tracking-tight text-white rounded-md focus:outline-none flex items-center justify-center ${confirmButtonClass} disabled:opacity-50`}
                    >
                        {isConfirming && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        {confirmText}
                    </button>
                </div>
            </div>
        </div>,
        document.body // The modal will be "teleported" to the end of the <body> tag
    );
};
"use client";
import { motion } from 'framer-motion';
import { AlertCircle } from 'lucide-react';

export const InlineErrorButton = ({ errorCode, onRetry }) => {
    let message = 'Authentication failed';
    if (errorCode === 'unauthorized_email') message = 'Unauthorized';
    else if (errorCode === 'account_creation_failed') message = 'Account creation failed';

    return (
        <motion.button
            onClick={onRetry}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="mx-auto w-auto relative z-20 group flex items-center justify-between px-4 py-2 text-sm font-medium rounded-lg 
            bg-red-50/80 dark:bg-red-900/10 
            border border-red-200 dark:border-red-800 
            text-red-600 dark:text-red-400 
            hover:bg-red-100 dark:hover:bg-red-900/20 
            focus:outline-none focus:ring-2 focus:ring-red-500 transition-all duration-200"
        >
            <div className="flex items-center gap-2">
                <AlertCircle className="w-4 h-4" />
                <span>{message}</span>
            </div>
        </motion.button>
    );
};

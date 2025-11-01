import React from 'react';
import { Loader2 } from 'lucide-react';

export const ActionButton = ({ icon, text, shortText, colorScheme = 'orange', onClick, isActive = false }) => {
    const colorClasses = {
        orange: 'text-csway-orange dark:text-csway-orange ring-csway-orange',
        blue: 'text-blue-600 dark:text-blue-500 ring-blue-500',
        green: 'text-csway-green dark:text-csway-green ring-csway-green',
        gray: 'text-gray-600 dark:text-gray-400 ring-gray-500',
    };
    const selectedColor = colorClasses[colorScheme] || colorClasses.orange;

    return (
        <button
            className={`
                flex items-center justify-center px-3 py-1.5 text-sm font-semibold
                rounded-md transition-colors focus:outline-none
                
                bg-gray-100/50
                dark:bg-gray-800
                
                ${selectedColor}
                
                ${isActive
                    ? 'ring-2'
                    : 'focus:ring-2'
                }
            `}
            onClick={onClick}
        >
            {icon}
            {shortText ? (
                <>
                    <span className="hidden md:inline">{text}</span>
                    <span className="inline md:hidden">{shortText}</span>
                </>
            ) : (
                <span>{text}</span>
            )}
        </button>
    );
};

export const DetailActionButton = ({
    icon: Icon,
    text,
    onClick,
    type = "button",
    colorScheme = 'gray',
    isLoading = false,
    disabled = false,
    title = ''
}) => {
    const colorClasses = {
        orange: 'hover:bg-csway-orange/10 hover:text-csway-orange dark:hover:text-csway-orange',
        blue: 'hover:bg-blue-500/10 hover:text-blue-500 dark:hover:text-blue-500',
        red: 'hover:bg-red-500/10 hover:text-red-500 dark:hover:text-red-500',
        green: 'hover:bg-csway-green/10 hover:text-csway-green dark:hover:text-csway-green', // Added green color scheme
        gray: 'hover:bg-gray-500/10 dark:hover:bg-gray-700',
    };

    const selectedColor = colorClasses[colorScheme] || colorClasses.gray;

    return (
        <button
            title={title}
            type={type} // Use the new type prop here
            className={`
                flex items-center px-4 py-2 rounded-md transition-colors text-sm font-medium 
                disabled:opacity-50 disabled:cursor-not-allowed 
                text-gray-500 dark:text-gray-400
                ${selectedColor}
            `}
            onClick={onClick}
            disabled={disabled || isLoading}
        >
            {isLoading ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Icon className="h-4 w-4 mr-2" />}
            <span>{text}</span>
        </button>
    );
};

export const IconButton = ({
    icon: Icon,
    onClick,
    disabled = false,
    isLoading = false,
    colorScheme = 'slate',
    type = 'button',
    title = '',
}) => {
    const colorClasses = {
        emerald: {
            text: 'text-emerald-600 dark:text-emerald-300',
            hover: 'hover:border-emerald-200 hover:bg-emerald-50 dark:hover:border-emerald-400/60 dark:hover:bg-emerald-500/10',
            ring: 'focus:ring-emerald-200',
        },
        red: {
            text: 'text-red-600 dark:text-red-300',
            hover: 'hover:border-red-200 hover:bg-red-50 dark:hover:border-red-400/70 dark:hover:bg-red-500/10',
            ring: 'focus:ring-red-200',
        },
        amber: {
            text: 'text-amber-600 dark:text-amber-300',
            hover: 'hover:border-amber-200 hover:bg-amber-50 dark:hover:border-amber-400/60 dark:hover:bg-amber-500/10',
            ring: 'focus:ring-amber-200',
        },
        slate: {
            text: 'text-slate-600 dark:text-slate-300',
            hover: 'hover:border-slate-200 hover:bg-slate-100 dark:hover:border-slate-600 dark:hover:bg-slate-800/60',
            ring: 'focus:ring-slate-300',
        },
    };

    const colors = colorClasses[colorScheme] || colorClasses.slate;

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled || isLoading}
            title={title}
            className={`inline-flex items-center gap-1 rounded-md border border-transparent px-3 py-2 text-xs font-semibold transition focus:outline-none focus:ring-2 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-60 ${colors.text} ${colors.hover} ${colors.ring}`}
        >
            {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Icon className="h-4 w-4" />}
        </button>
    );
};
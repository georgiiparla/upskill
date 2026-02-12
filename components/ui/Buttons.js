import React from 'react';
// [!] Using Tabler's Loader2
import { IconLoader2 } from '@tabler/icons-react';

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
                flex items-center justify-center p-2.5 sm:px-3 sm:py-1.5 text-sm font-semibold
                rounded-md transition-colors focus:outline-none
                bg-gray-100/50
                dark:bg-gray-800
                ${selectedColor}
                ${isActive ? 'ring-2' : 'focus:ring-2'}
            `}
            onClick={onClick}
            title={text}
        >
            {icon}
            {shortText ? (
                <>
                    <span className={`hidden sm:inline md:hidden ${icon ? 'ml-2' : ''}`}>{shortText}</span>
                    <span className={`hidden md:inline ${icon ? 'ml-2' : ''}`}>{text}</span>
                </>
            ) : (
                <span className={`hidden sm:inline ${icon ? 'ml-2' : ''}`}>{text}</span>
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
        green: 'hover:bg-csway-green/10 hover:text-csway-green dark:hover:text-csway-green',
        gray: 'hover:bg-gray-500/10 dark:hover:bg-gray-700',
    };

    const selectedColor = colorClasses[colorScheme] || colorClasses.gray;

    return (
        <button
            title={title}
            type={type}
            className={`
                flex items-center px-4 py-2 rounded-md transition-colors text-sm font-medium 
                disabled:opacity-50 disabled:cursor-not-allowed 
                text-gray-500 dark:text-gray-400
                ${selectedColor}
            `}
            onClick={onClick}
            disabled={disabled || isLoading}
        >
            {isLoading ? (
                <IconLoader2 className="h-4 w-4 mr-2 animate-spin" />
            ) : (
                Icon && <Icon className="h-4 w-4 mr-2" stroke={1.5} />
            )}
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
            {isLoading ? <IconLoader2 className="h-4 w-4 animate-spin" /> : <Icon className="h-4 w-4" stroke={1.5} />}
        </button>
    );
};

export const QuickActionButton = ({
    icon: Icon,
    text,
    shortText,
    onClick,
    colorScheme = 'gray',
}) => {
    const colorClasses = {
        orange: {
            icon: 'text-csway-orange',
            text: 'text-csway-orange dark:text-csway-orange',
            bg: 'bg-csway-orange/10 dark:bg-csway-orange/20',
            buttonBg: 'bg-gradient-to-br from-orange-50/80 to-orange-100/50 dark:from-orange-900/20 dark:to-orange-900/10 border-orange-200/50 dark:border-orange-800/30 hover:border-orange-300 dark:hover:border-orange-700',
        },
        blue: {
            icon: 'text-blue-600 dark:text-blue-400',
            text: 'text-blue-700 dark:text-blue-300',
            bg: 'bg-blue-100 dark:bg-blue-900/30',
            buttonBg: 'bg-gradient-to-br from-blue-50/80 to-blue-100/50 dark:from-blue-900/20 dark:to-blue-900/10 border-blue-200/50 dark:border-blue-800/30 hover:border-blue-300 dark:hover:border-blue-700',
        },
        green: {
            icon: 'text-emerald-600 dark:text-emerald-400',
            text: 'text-emerald-700 dark:text-emerald-300',
            bg: 'bg-emerald-100 dark:bg-emerald-900/30',
            buttonBg: 'bg-gradient-to-br from-emerald-50/80 to-emerald-100/50 dark:from-emerald-900/20 dark:to-emerald-900/10 border-emerald-200/50 dark:border-emerald-800/30 hover:border-emerald-300 dark:hover:border-emerald-700',
        },
        gray: {
            icon: 'text-slate-600 dark:text-slate-400',
            text: 'text-slate-600 dark:text-slate-300',
            bg: 'bg-slate-100 dark:bg-slate-800',
            buttonBg: 'bg-gradient-to-br from-white/90 to-slate-50/50 dark:from-slate-800/60 dark:to-slate-900/40 border-slate-200/60 dark:border-slate-700/60 hover:border-slate-300 dark:hover:border-slate-600',
        },
    };

    const colors = colorClasses[colorScheme] || colorClasses.gray;

    return (
        <button
            onClick={onClick}
            className={`
                group flex items-center justify-center md:justify-start gap-3 px-3 md:px-5 py-3 md:py-5 rounded-xl transition-all duration-200
                backdrop-blur-sm shadow-sm
                ${colors.buttonBg}
                border
                dark:hover:bg-slate-800/50
                ${colors.text}
                flex-1 min-w-0
                focus:outline-none focus:ring-2 focus:ring-slate-300/50 dark:focus:ring-slate-600/50
            `}
        >
            <div className={`flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-lg transition-colors ${colors.bg}`}>
                <Icon className={`h-5 w-5 ${colors.icon}`} stroke={1.5} />
            </div>

            {/* [!] Mobile Short Text Logic */}
            {shortText ? (
                <>
                    <span className="inline md:hidden text-base font-bold truncate">
                        {shortText}
                    </span>
                    <span className="hidden md:inline text-lg font-bold truncate">
                        {text}
                    </span>
                </>
            ) : (
                <span className="text-base md:text-lg font-bold truncate">
                    {text}
                </span>
            )}
        </button>
    );
};
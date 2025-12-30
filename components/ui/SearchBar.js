import { IconSearch } from '@tabler/icons-react';

export const SearchBar = ({ searchTerm, onSearchChange, placeholder = "Search...", className = "" }) => {
    const MAX_SEARCH_LENGTH = 100;

    return (
        <div className={`relative ${className}`}>
            <input
                type="text"
                placeholder={placeholder}
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
                maxLength={MAX_SEARCH_LENGTH}
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-slate-800 dark:border-slate-700 placeholder:text-sm sm:placeholder:text-base"
            />
            <IconSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5" />
        </div>
    );
};
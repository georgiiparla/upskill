import { useState, useEffect, useRef } from 'react';
import { clientFetch } from '@/lib/client-api';
import { IconSearch, IconUser } from '@tabler/icons-react'; // Assuming tabler icons are available
import { motion, AnimatePresence } from 'framer-motion';

export default function UserSearchCombobox({ onSelect, onSearchChange, id }) {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const wrapperRef = useRef(null);

    // Debounce search
    useEffect(() => {
        let active = true;

        const timer = setTimeout(async () => {
            if (query.length < 2) {
                setResults([]);
                return;
            }

            // Don't search if we just selected a user and the query matches their name
            if (selectedUser && query === selectedUser.username) return;

            setIsLoading(true);
            const response = await clientFetch(`/users/search?q=${encodeURIComponent(query)}`);

            if (active) {
                if (response.success) {
                    setResults(Array.isArray(response) ? response : (response.data || []));
                    setIsOpen(true);
                }
                setIsLoading(false);
            }
        }, 300);

        return () => {
            active = false;
            clearTimeout(timer);
        };
    }, [query, selectedUser]);

    // Close on click outside
    useEffect(() => {
        function handleClickOutside(event) {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [wrapperRef]);

    const handleSelect = (user) => {
        setSelectedUser(user);
        setQuery(user.username);
        if (onSearchChange) onSearchChange(user.username); // Ensure verified text matches confirmed user
        setResults([]);
        setIsOpen(false);
        onSelect(user);
    };

    const handleClear = () => {
        setQuery('');
        if (onSearchChange) onSearchChange('');
        setSelectedUser(null);
        setResults([]);
        onSelect(null);
    };

    return (
        <div className="relative" ref={wrapperRef}>
            <div className="relative">
                <input
                    id={id}
                    type="text"
                    value={query}
                    autoComplete="off"
                    onChange={(e) => {
                        const newVal = e.target.value;
                        setQuery(newVal);
                        if (onSearchChange) onSearchChange(newVal);
                        setSelectedUser(null); // Clear selection on edit
                        onSelect(null); // Clear parent selection immediately on edit
                        if (!isOpen && newVal.length >= 2) setIsOpen(true);
                    }}
                    placeholder="Search users..."
                    onFocus={() => {
                        if (query.length >= 2) setIsOpen(true);
                    }}
                    className="block w-full px-5 py-4 pl-12 text-lg bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-lg focus:ring-2 transition-colors disabled:opacity-50"
                />
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400">
                    <IconSearch className="w-5 h-5" />
                </div>
                {query && (
                    <button
                        type="button"
                        onClick={handleClear}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    >
                        ✕
                    </button>
                )}
            </div>

            <AnimatePresence>
                {isOpen && (results.length > 0 || isLoading) && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute z-10 w-full mt-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg shadow-lg max-h-60 overflow-y-auto"
                    >
                        {isLoading ? (
                            <div className="p-4 text-center text-slate-500">Loading...</div>
                        ) : (
                            <ul>
                                {results.map((user) => (
                                    <li
                                        key={user.id}
                                        onClick={() => handleSelect(user)}
                                        className="px-5 py-3 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer flex items-center gap-3 transition-colors"
                                    >
                                        <div className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                                            <IconUser className="w-4 h-4" />
                                        </div>
                                        <span className="font-medium text-slate-700 dark:text-slate-200">{user.username}</span>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

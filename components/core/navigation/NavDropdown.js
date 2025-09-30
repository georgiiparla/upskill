"use client";

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronDown } from 'lucide-react';
import { Avatar } from '../ui/Avatar';

export const DropdownItem = ({ href, children, onClick }) => {
    return (
        <Link
            href={href}
            onClick={onClick}
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
        >
            {children}
        </Link>
    );
};

export const DesktopDropdown = ({ title, children, scrolled, activePaths = [] }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);
    const pathname = usePathname();
    const isActive = activePaths.some(path => pathname.startsWith(path));

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`
                    flex items-center border-b-2 text-sm font-medium transition-colors duration-150 ease-in-out
                    ${scrolled ? 'px-3 py-2' : 'px-1 pt-1'}
                    ${isActive
                        ? `text-gray-900 dark:text-gray-100 ${scrolled ? 'border-transparent' : 'border-csway-green dark:border-csway-green'}`
                        : `text-gray-500 dark:text-gray-400 border-transparent hover:text-gray-700 dark:hover:text-gray-300 ${!scrolled ? 'hover:border-gray-300 dark:hover:border-gray-600' : ''}`
                    }
                `}
            >
                {title}
                <ChevronDown className={`h-4 w-4 ml-1 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                {scrolled && isActive && <span className="absolute left-0 top-1/2 -translate-y-1/2 h-1.5 w-1.5 bg-csway-green rounded-full"></span>}
            </button>
            {isOpen && (
                <div className="absolute z-10 mt-2 w-48 origin-top-right rounded-md bg-white dark:bg-gray-800 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1" onClick={() => setIsOpen(false)}>
                        {children}
                    </div>
                </div>
            )}
        </div>
    );
};

export const UserDropdown = ({ user, onLogoutClick }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);
    const pathname = usePathname(); // Key part 1: Get the current path

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center space-x-2 p-1 pr-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none transition-colors"
            >
                <Avatar username={user?.username} className="w-7 h-7 text-xs" />
                <span className="hidden md:inline text-sm font-medium text-gray-700 dark:text-gray-300">
                    {user?.username}
                </span>
                <ChevronDown className={`h-4 w-4 text-gray-500 dark:text-gray-400 transition-transform hidden md:inline ${isOpen ? 'rotate-180' : ''}`} />
            </button>
            {isOpen && (
                <div className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white dark:bg-gray-800 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1" onClick={() => setIsOpen(false)}>
                        <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-700 mb-1">
                            <p className="font-semibold text-sm text-gray-800 dark:text-gray-100 truncate">{user?.username}</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{user?.email}</p>
                        </div>

                        {/* Key part 2: Conditionally render based on the path */}
                        {pathname !== '/account' && (
                            <DropdownItem href="/account">
                                My Account
                            </DropdownItem>
                        )}

                        <DropdownItem href="#" onClick={(e) => { e.preventDefault(); onLogoutClick(); }}>
                            Sign Out
                        </DropdownItem>
                    </div>
                </div>
            )}
        </div>
    );
};
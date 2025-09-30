"use client";

import { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { ChevronDown } from 'lucide-react';
import { Avatar } from '../ui/Avatar';
import { NavItem } from './NavItem';

import Link from 'next/link';

export const DropdownItem = ({ href, children, onClick }) => {
    return (
        <div className="relative group">
            <Link 
                href={href}
                onClick={onClick}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
            >
                {children}
            </Link>
        </div>
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
            <NavItem
                as="button"
                onClick={() => setIsOpen(!isOpen)}
                isActive={isActive}
                scrolled={scrolled}
                isDropdown={true}
                className={`flex items-center ${scrolled ? 'px-4 py-2' : 'px-4 pt-1'}`}
            >
                {title}
                <ChevronDown className={`h-4 w-4 ml-1 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </NavItem>
            {isOpen && (
                <div className="absolute z-10 mt-2 w-48 origin-top-right rounded-md bg-white dark:bg-gray-800 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none overflow-hidden">
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
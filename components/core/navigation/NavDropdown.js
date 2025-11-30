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
                className="block px-4 py-2.5 text-sm lg:text-base font-normal tracking-tight text-gray-700 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-700/50 dark:hover:text-white transition-all duration-200 rounded-lg mx-1"
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

    const isActive = activePaths.some((path) => {
        if (path === '/') return pathname === '/';
        return pathname.startsWith(path);
    });

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
                scrolled={scrolled}
                isActive={isActive}
                isDropdown={true}
                className={`flex items-center ${scrolled ? 'px-4 py-2' : 'px-4 pt-1'}`}
            >
                {title}
                <ChevronDown className={`h-3.5 w-3.5 ml-2 transition-all duration-200 text-gray-400 dark:text-gray-500 group-hover:text-gray-600 dark:group-hover:text-gray-300 ${isOpen ? 'rotate-180' : ''}`} />
            </NavItem>
            {isOpen && (
                <div className="absolute z-10 mt-3 w-48 origin-top-right rounded-xl bg-white dark:bg-slate-900 shadow-xl ring-1 ring-black/5 dark:ring-white/10 focus:outline-none overflow-hidden border border-slate-200/60 dark:border-slate-700/60">
                    <div className="py-2" onClick={() => setIsOpen(false)}>
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
    const pathname = usePathname();

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
                <span className="hidden xl:inline text-sm lg:text-base font-normal tracking-tight text-gray-700 dark:text-gray-300">
                    {user?.username}
                </span>
                <ChevronDown className={`h-3.5 w-3.5 text-gray-400 dark:text-gray-500 transition-all duration-200 hover:text-gray-600 dark:hover:text-gray-300 hidden xl:inline ${isOpen ? 'rotate-180' : ''}`} />
            </button>
            {isOpen && (
                <div className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-xl bg-white/95 dark:bg-slate-900/95 shadow-xl ring-1 ring-black/5 dark:ring-white/10 focus:outline-none border border-slate-200/60 dark:border-slate-700/60">
                    <div className="py-2" onClick={() => setIsOpen(false)}>
                        <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-700 mb-1">
                            <p className="font-normal tracking-tight text-sm text-gray-800 dark:text-gray-100 truncate">{user?.username}</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{user?.email}</p>
                        </div>

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
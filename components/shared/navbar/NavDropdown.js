"use client";

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronDown } from 'lucide-react';

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

export const DesktopDropdown = ({ title, children, scrolled, activePath }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);
    const pathname = usePathname();
    const isActive = pathname.startsWith(activePath);

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
"use client"

import { React, useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { usePathname } from 'next/navigation';
import { Menu, X, Sun, Moon, LogOut } from 'lucide-react';
import Image from 'next/image';
import { Avatar } from '../ui/Avatar';

import { useAuth } from '@/context/AuthContext';
import { Modal } from '../ui/Modal';
import { DesktopDropdown, DropdownItem, UserDropdown } from './NavDropdown';
import { NavItem } from './NavItem';

import Link from 'next/link';

const NavLink = ({ href, children, scrolled }) => (
    <NavItem 
        href={href}
        scrolled={scrolled}
        className={scrolled ? 'px-4 py-2' : 'px-4 pt-1'}
    >
        {children}
    </NavItem>
);

const MobileNavLink = ({ href, children, closeMenu }) => {
    const pathname = usePathname();
    const isActive = pathname === href;
    const activeClass = isActive
        ? "bg-csway-green/10 dark:bg-gray-700 text-csway-green dark:text-white"
        : "text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700";

    return (
        <Link 
            href={href} 
            onClick={closeMenu}
            className={`block w-full text-left px-4 py-2 text-base font-medium rounded-md ${activeClass}`}
        >
            {children}
        </Link>
    );
};

export const Navbar = () => {
    const { theme, setTheme } = useTheme();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
    const { user, logout } = useAuth();
    const pathname = usePathname();


    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        document.addEventListener('scroll', handleScroll);
        return () => document.removeEventListener('scroll', handleScroll);
    }, []);


    const handleLogoutConfirm = () => {
        logout();
        setIsLogoutModalOpen(false);
    };

    return (
        <>
            <Modal
                isOpen={isLogoutModalOpen}
                onClose={() => setIsLogoutModalOpen(false)}
                onConfirm={handleLogoutConfirm}
                title="Confirm Sign Out"
                confirmText="Sign Out"
            >
                Are you sure you want to sign out of your account?
            </Modal>

            <nav className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50 transition-all duration-300 ease-in-out">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className={`flex items-center justify-between h-16 transition-[height] duration-300 ease-in-out ${scrolled ? 'h-[44px]' : ''}`}>
                        <div className="flex items-center">
                            <Link href="/dashboard" className="flex-shrink-0 text-gray-900 dark:text-white font-bold text-xl flex items-center">
                                <Image src="/csway-logo.png" alt="CSway Logo" width={24} height={24} className="mr-2" />
                                <span className={`transition-all duration-300 ease-in-out whitespace-nowrap overflow-hidden ${scrolled ? 'w-0 opacity-0' : ''}`}>Upskill</span>
                            </Link>
                            <div className="hidden md:block">
                                <div className="ml-10 flex items-baseline space-x-4">
                                    <NavLink href="/dashboard" scrolled={scrolled}>Home</NavLink>
                                    <NavLink href="/quests" scrolled={scrolled}>Quests</NavLink>
                                    <DesktopDropdown title="Feedback" scrolled={scrolled} activePaths={['/feedback']}>
                                        <DropdownItem href="/feedback">My Feedback</DropdownItem>
                                        <DropdownItem href="/feedback/request/new">Request Feedback</DropdownItem>
                                    </DesktopDropdown>
                                    <DesktopDropdown title="Community" scrolled={scrolled} activePaths={['/leaderboard', '/admin/users']}>
                                        <DropdownItem href="/leaderboard">Leaderboard</DropdownItem>
                                        <DropdownItem href="/admin/users">Members</DropdownItem>
                                    </DesktopDropdown>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center">
                            {/* --- Desktop Controls (Dropdown) --- */}
                            <div className="hidden md:flex items-center space-x-1">
                                <UserDropdown user={user} onLogoutClick={() => setIsLogoutModalOpen(true)} />
                                <button
                                    onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                                    className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none"
                                >
                                    {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                                </button>
                            </div>

                            {/* --- Mobile Controls (Contextual Icons) --- */}
                            <div className="flex items-center md:hidden">
                                {pathname === '/account' ? (
                                    <button onClick={() => setIsLogoutModalOpen(true)} title="Sign Out" className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700">
                                        <LogOut className="h-5 w-5" />
                                    </button>
                                ) : (
                                    <Link href="/account" title="My Account" className="p-1 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700">
                                        <Avatar username={user?.username} className="w-7 h-7 text-xs" />
                                    </Link>
                                )}

                                <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2 rounded-md text-gray-500 dark:text-gray-400">
                                    {isMenuOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {isMenuOpen && (
                    <div className="md:hidden border-t border-gray-200 dark:border-gray-700">
                        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                            <MobileNavLink href="/dashboard" closeMenu={() => setIsMenuOpen(false)}>Home</MobileNavLink>
                            <MobileNavLink href="/feedback" closeMenu={() => setIsMenuOpen(false)}>My Feedback</MobileNavLink>
                            <MobileNavLink href="/feedback/request/new" closeMenu={() => setIsMenuOpen(false)}>Request Feedback</MobileNavLink>
                            <MobileNavLink href="/quests" closeMenu={() => setIsMenuOpen(false)}>Quests</MobileNavLink>
                            <MobileNavLink href="/leaderboard" closeMenu={() => setIsMenuOpen(false)}>Leaderboard</MobileNavLink>
                            <MobileNavLink href="/admin/users" closeMenu={() => setIsMenuOpen(false)}>Members</MobileNavLink>
                        </div>
                    </div>
                )}
            </nav>
        </>
    )
}
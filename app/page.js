"use client"

import React, { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { Menu, X } from 'lucide-react';
import Image from 'next/image';

import { Dashboard } from "../components/Dashboard";
import { Feedback } from "../components/Feedback";
import { Leaderboard } from "../components/Leaderboard";
import { Quests } from "../components/Quests";

// --- Style Definitions ---

const APP_STYLES = {
    appContainer: `
        min-h-screen 
        bg-gray-100 dark:bg-gray-900
    `,
    nav: `
        bg-white dark:bg-gray-800 
        border-b 
        border-gray-200 dark:border-gray-700
    `,
    navContainer: `
        mx-auto 
        max-w-7xl 
        px-4 sm:px-6 lg:px-8
    `,
    navFlexContainer: `
        flex 
        h-16 
        items-center 
        justify-between
    `,
    logoAndLinksContainer: `
        flex 
        items-center
    `,
    logoContainer: `
        flex-shrink-0 
        text-gray-900 dark:text-white 
        font-bold 
        text-xl 
        flex 
        items-center
    `,
    logoImage: `
        mr-2
    `,
    desktopNavWrapper: `
        hidden 
        md:block
    `,
    desktopNavLinksContainer: `
        ml-10 
        flex 
        items-baseline 
        space-x-4
    `,
    navActionsContainer: `
        flex 
        items-center
    `,
    themeToggleButton: `
        p-2 
        rounded-full 
        text-gray-500 dark:text-gray-400 
        hover:bg-gray-100 dark:hover:bg-gray-700 
        focus:outline-none 
        focus:ring-2 
        focus:ring-indigo-500 dark:focus:ring-white 
        focus:ring-offset-2 dark:focus:ring-offset-gray-800
    `,
    hamburgerMenuWrapper: `
        ml-2 
        md:hidden
    `,
    hamburgerButton: `
        inline-flex 
        items-center 
        justify-center 
        p-2 
        rounded-md 
        text-gray-500 dark:text-gray-400 
        hover:bg-gray-100 dark:hover:bg-gray-700 
        focus:outline-none
    `,
    hamburgerIcon: `
        block 
        h-6 w-6
    `,
    mobileMenuContainer: `
        md:hidden 
        border-t 
        border-gray-200 dark:border-gray-700
    `,
    mobileMenuLinksContainer: `
        px-2 pt-2 pb-3 
        space-y-1 
        sm:px-3
    `,
    mainContent: `
        mx-auto 
        max-w-7xl 
        px-4 py-6 
        sm:px-6 lg:px-8
    `
};

const NAVLINK_STYLES = {
    base: `
        border-b-2 
        px-1 pt-1 
        text-sm 
        font-medium 
        transition-colors 
        duration-150 
        ease-in-out
    `,
    active: `
        border-blue-700 dark:border-blue-700 
        text-gray-900 dark:text-gray-100
    `,
    inactive: `
        border-transparent 
        text-gray-500 dark:text-gray-400 
        hover:border-gray-300 dark:hover:border-gray-600 
        hover:text-gray-700 dark:hover:text-gray-300
    `
};

const MOBILE_NAVLINK_STYLES = {
    base: `
        block 
        w-full 
        text-left 
        px-4 py-2 
        text-base 
        font-medium 
        rounded-md
    `,
    active: `
        bg-indigo-50 dark:bg-gray-700 
        text-indigo-700 dark:text-white
    `,
    inactive: `
        text-gray-600 dark:text-gray-300 
        hover:bg-gray-50 dark:hover:bg-gray-700
    `
};

// --- Main App Component ---

export default function App() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
    const [currentPage, setCurrentPage] = useState('dashboard');
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return null;
    }

    const NavLink = ({ pageName, children }) => {
        const isActive = currentPage === pageName;
        const activeClass = isActive ? NAVLINK_STYLES.active : NAVLINK_STYLES.inactive;
        return (
            <button
                onClick={() => {
                    setCurrentPage(pageName);
                    setIsMenuOpen(false);
                }}
                className={`${NAVLINK_STYLES.base} ${activeClass}`}
            >
                {children}
            </button>
        );
    };

    const MobileNavLink = ({ pageName, children }) => {
        const isActive = currentPage === pageName;
        const activeClass = isActive ? MOBILE_NAVLINK_STYLES.active : MOBILE_NAVLINK_STYLES.inactive;
        return (
            <button
                onClick={() => {
                    setCurrentPage(pageName);
                    setIsMenuOpen(false);
                }}
                className={`${MOBILE_NAVLINK_STYLES.base} ${activeClass}`}
            >
                {children}
            </button>
        );
    };

    const renderPage = () => {
        switch (currentPage) {
            case 'dashboard':
                return <Dashboard />;
            case 'quests':
                return <Quests />;
            case 'feedback':
                return <Feedback />;
            case 'leaderboard':
                return <Leaderboard />;
            default:
                return <Dashboard />;
        }
    };

    return (
        <div className={APP_STYLES.appContainer}>
            {/* Navigation */}
            <nav className={APP_STYLES.nav}>
                <div className={APP_STYLES.navContainer}>
                    <div className={APP_STYLES.navFlexContainer}>
                        <div className={APP_STYLES.logoAndLinksContainer}>
                            {/* Logo */}
                            <div className={APP_STYLES.logoContainer}>
                                <Image
                                    src="/rs2logo.png"
                                    alt="Upskill Logo"
                                    width={24}
                                    height={24}
                                    className={APP_STYLES.logoImage}
                                />
                                Upskill
                            </div>
                            {/* Desktop Navigation Links */}
                            <div className={APP_STYLES.desktopNavWrapper}>
                                <div className={APP_STYLES.desktopNavLinksContainer}>
                                    <NavLink pageName="dashboard">Dashboard</NavLink>
                                    <NavLink pageName="quests">Quests</NavLink>
                                    <NavLink pageName="feedback">Feedback</NavLink>
                                    <NavLink pageName="leaderboard">Leaderboard</NavLink>
                                </div>
                            </div>
                        </div>
                        <div className={APP_STYLES.navActionsContainer}>
                            {/* Theme Toggle Button */}
                            <button
                                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                                className={APP_STYLES.themeToggleButton}
                            >
                                {theme === 'dark' ? '☀️' : '🌙'}
                            </button>
                            {/* Hamburger Menu Button */}
                            <div className={APP_STYLES.hamburgerMenuWrapper}>
                                <button
                                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                                    className={APP_STYLES.hamburgerButton}
                                >
                                    <span className="sr-only">Open main menu</span>
                                    {isMenuOpen ? (
                                        <X className={APP_STYLES.hamburgerIcon} aria-hidden="true" />
                                    ) : (
                                        <Menu className={APP_STYLES.hamburgerIcon} aria-hidden="true" />
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Mobile Menu */}
                {isMenuOpen && (
                    <div className={APP_STYLES.mobileMenuContainer}>
                        <div className={APP_STYLES.mobileMenuLinksContainer}>
                            <MobileNavLink pageName="dashboard">Dashboard</MobileNavLink>
                            <MobileNavLink pageName="quests">Quests</MobileNavLink>
                            <MobileNavLink pageName="feedback">Feedback</MobileNavLink>
                            <MobileNavLink pageName="leaderboard">Leaderboard</MobileNavLink>
                        </div>
                    </div>
                )}
            </nav>

            {/* Main Content */}
            <main>
                <div className={APP_STYLES.mainContent}>
                    {renderPage()}
                </div>
            </main>
        </div>
    );
}

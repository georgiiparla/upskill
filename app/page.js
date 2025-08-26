"use client"

import { React, useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { Menu, X, Sun, Moon, LogOut, Loader2 } from 'lucide-react';
import Image from 'next/image';

import Dashboard from "../components/Dashboard"; 
import { Feedback } from "../components/Feedback";
import { Leaderboard } from "../components/Leaderboard";
import { Quests } from "../components/Quests";
import { Auth } from '@/components/Auth';
import { useAuth } from '@/context/AuthContext';
import { Modal } from '@/components/Modal';

// --- Style Definitions ---
const tailwind_app = {
    appContainer: `
        min-h-screen 
        bg-gray-100 dark:bg-gray-900`,
    nav: `
        bg-white/80 dark:bg-gray-800/80
        backdrop-blur-sm
        border-b 
        border-gray-200 dark:border-gray-700
        sticky top-0
        z-50
        transition-all duration-300 ease-in-out`,
    navContainer: `
        mx-auto 
        max-w-7xl 
        px-4 sm:px-6 lg:px-8`,
    navFlexContainer: `
        flex 
        items-center 
        justify-between
        h-16
        transition-all duration-300 ease-in-out`,
    navFlexContainerScrolled: `
        h-[44px]`,
    logoAndLinksContainer: `
        flex 
        items-center`,
    logoContainer: `
        flex-shrink-0 
        text-gray-900 dark:text-white 
        font-bold 
        text-xl 
        flex 
        items-center`,
    logoImage: `
        mr-2`,
    logoText: `
        transition-all duration-300 ease-in-out
        whitespace-nowrap
        overflow-hidden`,
    logoTextScrolled: `
        w-0 opacity-0`,
    desktopNavWrapper: `
        hidden 
        md:block`,
    desktopNavLinksContainer: `
        ml-10 
        flex 
        items-baseline 
        space-x-4`,
    navActionsContainer: `
        flex 
        items-center`,
    themeToggleButton: `
        p-2 
        rounded-full 
        text-gray-500 dark:text-gray-400 
        hover:bg-gray-100 dark:hover:bg-gray-700 
        focus:outline-none 
        focus:ring-2 
        focus:ring-csway-green dark:focus:ring-white 
        focus:ring-offset-2 dark:focus:ring-offset-gray-800`,
    hamburgerMenuWrapper: `
        ml-2 
        md:hidden`,
    hamburgerButton: `
        inline-flex 
        items-center 
        justify-center 
        p-2 
        rounded-md 
        text-gray-500 dark:text-gray-400 
        hover:bg-gray-100 dark:hover:bg-gray-700 
        focus:outline-none`,
    hamburgerIcon: `
        block 
        h-6 w-6`,
    mobileMenuContainer: `
        md:hidden 
        border-t 
        border-gray-200 dark:border-gray-700`,
    mobileMenuLinksContainer: `
        px-2 pt-2 pb-3 
        space-y-1 
        sm:px-3`,
    mainContent: `
        mx-auto 
        max-w-7xl 
        px-4 py-6 
        sm:px-6 lg:px-8`
};

const tailwind_navlink = {
    baseDefault: `
        border-b-2 
        px-1 pt-1 
        text-sm 
        font-medium 
        transition-colors 
        duration-150 
        ease-in-out`,
    activeDefault: `
        border-csway-green dark:border-csway-green 
        text-gray-900 dark:text-gray-100`,
    inactiveDefault: `
        border-transparent 
        text-gray-500 dark:text-gray-400 
        hover:border-gray-300 dark:hover:border-gray-600 
        hover:text-gray-700 dark:hover:text-gray-300`,
    baseScrolled: `
        relative
        px-3 py-2
        text-sm 
        font-medium 
        transition-colors 
        duration-150 
        ease-in-out`,
    activeScrolled: `
        text-gray-900 dark:text-gray-100`,
    inactiveScrolled: `
        text-gray-500 dark:text-gray-400 
        hover:text-gray-700 dark:hover:text-gray-300`,
    activeDot: `
        absolute left-0 top-1/2 -translate-y-1/2 
        h-1.5 w-1.5 
        bg-csway-green rounded-full 
        transition-opacity duration-300`
};

        
const tailwind_navlink_mobile = {
    base: `
        block 
        w-full 
        text-left 
        px-4 py-2 
        text-base 
        font-medium 
        rounded-md`,
    active: `
        bg-csway-green/10 dark:bg-gray-700 
        text-csway-green dark:text-white`,
    inactive: `
        text-gray-600 dark:text-gray-300 
        hover:bg-gray-50 dark:hover:bg-gray-700`
};

export default function App() {
    
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
    const [currentPage, setCurrentPage] = useState('dashboard');
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

    const { isAuthenticated, user, logout, loading } = useAuth();

    useEffect(() => {
        const handleScroll = () => {
            const isScrolled = window.scrollY > 50;
            if (isScrolled !== scrolled) {
                setScrolled(isScrolled);
            }
        };
        document.addEventListener('scroll', handleScroll);
        return () => document.removeEventListener('scroll', handleScroll);
    }, [scrolled]);

    useEffect(() => { setMounted(true) }, []);

    const handleLogoutConfirm = () => {
        logout();
        setIsLogoutModalOpen(false);
    };

    if (!mounted || loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
                <Loader2 className="h-12 w-12 animate-spin text-csway-green" />
            </div>
        );
    }
    
    if (!isAuthenticated) {
        return <Auth />;
    }

    const NavLink = ({ pageName, children, scrolled }) => {
        const isActive = currentPage === pageName;
        const baseClass = scrolled ? tailwind_navlink.baseScrolled : tailwind_navlink.baseDefault;
        const activeClass = isActive 
            ? (scrolled ? tailwind_navlink.activeScrolled : tailwind_navlink.activeDefault) 
            : (scrolled ? tailwind_navlink.inactiveScrolled : tailwind_navlink.inactiveDefault);
        
        return (
            <button
                onClick={() => {
                    setCurrentPage(pageName);
                    setIsMenuOpen(false);
                }}
                className={`${baseClass} ${activeClass}`}
            >
                <span className={`${tailwind_navlink.activeDot} ${isActive && scrolled ? 'opacity-100' : 'opacity-0'}`}></span>
                {children}
            </button>
        );
    };

    const MobileNavLink = ({ pageName, children }) => {
        const isActive = currentPage === pageName;
        const activeClass = isActive ? tailwind_navlink_mobile.active : tailwind_navlink_mobile.inactive;
        return (
            <button
                onClick={() => {
                    setCurrentPage(pageName);
                    setIsMenuOpen(false);
                }}
                className={`${tailwind_navlink_mobile.base} ${activeClass}`}
            >
                {children}
            </button>
        );
    };

    const renderPage = () => {
        switch (currentPage) {
            case 'dashboard': return <Dashboard />;
            case 'quests': return <Quests />;
            case 'feedback': return <Feedback />;
            case 'leaderboard': return <Leaderboard />;
            default: return <Dashboard />;
        }
    };

    return (
        <div className={tailwind_app.appContainer}>
            <Modal
                isOpen={isLogoutModalOpen}
                onClose={() => setIsLogoutModalOpen(false)}
                onConfirm={handleLogoutConfirm}
                title="Confirm Sign Out"
            >
                Are you sure you want to sign out of your account?
            </Modal>

            <nav className={tailwind_app.nav}>
                <div className={tailwind_app.navContainer}>
                    <div className={`${tailwind_app.navFlexContainer} ${scrolled ? tailwind_app.navFlexContainerScrolled : ''}`}>
                        <div className={tailwind_app.logoAndLinksContainer}>
                            <div className={tailwind_app.logoContainer}>
                                <Image src="/csway-logo.png" alt="CSway Logo" width={24} height={24} className={tailwind_app.logoImage} />
                                <span className={`${tailwind_app.logoText} ${scrolled ? tailwind_app.logoTextScrolled : ''}`}>Upskill</span>
                            </div>
                            <div className={tailwind_app.desktopNavWrapper}>
                                <div className={tailwind_app.desktopNavLinksContainer}>
                                    <NavLink pageName="dashboard" scrolled={scrolled}>Dashboard</NavLink>
                                    <NavLink pageName="quests" scrolled={scrolled}>Quests</NavLink>
                                    <NavLink pageName="feedback" scrolled={scrolled}>Feedback</NavLink>
                                    <NavLink pageName="leaderboard" scrolled={scrolled}>Leaderboard</NavLink>
                                </div>
                            </div>
                        </div>
                        <div className={tailwind_app.navActionsContainer}>
                            <div className="flex items-center space-x-3">
                                <span className="hidden sm:inline text-sm text-gray-700 dark:text-gray-300">
                                    Welcome, <span className="font-bold">{user.username}</span>
                                </span>
                                <button
                                    onClick={() => setIsLogoutModalOpen(true)}
                                    className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none"
                                >
                                    <LogOut className="h-5 w-5" />
                                </button>
                                <button
                                    onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                                    className={tailwind_app.themeToggleButton}
                                >
                                    {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                                </button>
                            </div>
                            <div className={tailwind_app.hamburgerMenuWrapper}>
                                <button onClick={() => setIsMenuOpen(!isMenuOpen)} className={tailwind_app.hamburgerButton}>
                                    {isMenuOpen ? <X className={tailwind_app.hamburgerIcon} /> : <Menu className={tailwind_app.hamburgerIcon} />}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                {isMenuOpen && (
                    <div className={tailwind_app.mobileMenuContainer}>
                        <div className={tailwind_app.mobileMenuLinksContainer}>
                            <MobileNavLink pageName="dashboard">Dashboard</MobileNavLink>
                            <MobileNavLink pageName="quests">Quests</MobileNavLink>
                            <MobileNavLink pageName="feedback">Feedback</MobileNavLink>
                            <MobileNavLink pageName="leaderboard">Leaderboard</MobileNavLink>
                        </div>
                    </div>
                )}
            </nav>
            <main>
                <div className={tailwind_app.mainContent}>{renderPage()}</div>
            </main>
        </div>
    );
}
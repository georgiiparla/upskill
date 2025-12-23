"use client"

import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { usePathname } from 'next/navigation';
import { Inter } from 'next/font/google';

import { useAuth } from '@/context/AuthContext';
import { Modal } from '../ui/Modal';
import { useScrollBehavior, usePointsData, usePointsBadge } from './NavbarHelpers';

import { LogoAndBrand } from './components/LogoAndBrand';
import { DesktopNavLinks } from './components/DesktopNavLinks';
import { MobileMenu } from './components/MobileMenu';
import { DesktopControls, MobileControls } from './components/NavbarControls';

const inter = Inter({ subsets: ['latin'] });



const NavbarContent = ({ scrolled, user, rank, renderPointsText, getPointsBadgeClasses, setIsLogoutModalOpen, theme, setTheme, pathname, isMenuOpen, setIsMenuOpen, isAdmin }) => (
    <div className={`flex items-center justify-between h-16 transition-[height] duration-300 ease-in-out ${scrolled ? 'h-[44px]' : ''}`}>
        <div className="flex items-center">
            <LogoAndBrand scrolled={scrolled} />
            <DesktopNavLinks scrolled={scrolled} isAdmin={isAdmin} />
        </div>
        <div className="flex items-center">
            <DesktopControls
                user={user}
                rank={rank}
                renderPointsText={renderPointsText}
                getPointsBadgeClasses={getPointsBadgeClasses}
                setIsLogoutModalOpen={setIsLogoutModalOpen}
                theme={theme}
                setTheme={setTheme}
            />
            <MobileControls
                user={user}
                rank={rank}
                renderPointsText={renderPointsText}
                getPointsBadgeClasses={getPointsBadgeClasses}
                pathname={pathname}
                setIsLogoutModalOpen={setIsLogoutModalOpen}
                isMenuOpen={isMenuOpen}
                setIsMenuOpen={setIsMenuOpen}
            />
        </div>
    </div>
);

export const Navbar = () => {
    const { theme, setTheme } = useTheme();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
    const { user, logout, navbarRefreshTrigger, refreshNavbarPoints, isAdmin } = useAuth();
    const pathname = usePathname();

    useScrollBehavior(scrolled, setScrolled);
    const { points, rank, isPointsLoading } = usePointsData(user, navbarRefreshTrigger);
    const { getPointsBadgeClasses } = usePointsBadge(rank);

    useEffect(() => {
        if (pathname === '/leaderboard') {
            refreshNavbarPoints();
        }
    }, [pathname, refreshNavbarPoints]);

    const handleLogoutConfirm = () => {
        logout();
        setIsLogoutModalOpen(false);
    };

    // UPDATED: Simply returns points without rank text
    const renderPointsText = () => {
        if (isPointsLoading) return "…";
        return `${points ?? 0} pts`;
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

            <nav className={`lg:hidden bg-gradient-to-br from-white to-slate-50/80 dark:from-slate-900 dark:to-slate-800/90 backdrop-blur-sm border-b border-slate-200/60 dark:border-slate-700/60 sticky top-0 z-50 transition-all duration-300 ease-in-out ${inter.className}`}>
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <NavbarContent
                        scrolled={scrolled}
                        user={user}
                        rank={rank}
                        renderPointsText={renderPointsText}
                        getPointsBadgeClasses={getPointsBadgeClasses}
                        setIsLogoutModalOpen={setIsLogoutModalOpen}
                        theme={theme}
                        setTheme={setTheme}
                        pathname={pathname}
                        isMenuOpen={isMenuOpen}
                        setIsMenuOpen={setIsMenuOpen}
                        isAdmin={isAdmin}
                    />
                </div>
                <MobileMenu isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} isAdmin={isAdmin} />
            </nav>
        </>
    )
}
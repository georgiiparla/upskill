"use client";
import Link from 'next/link';
// [!] Swapping Lucide for Tabler
import { IconSun, IconMoon, IconLogout, IconMenu2, IconX } from '@tabler/icons-react';
import { UserDropdown } from '../../NavDropdown';
import { Avatar } from '@/components/ui/Avatar';

export const DesktopControls = ({ user, rank, renderPointsText, getPointsBadgeClasses, setIsLogoutModalOpen, theme, setTheme }) => (
    <div className="hidden lg:flex items-center space-x-1">
        {user && (
            <div className={`mr-3 px-3 py-1 rounded-full text-sm font-normal tracking-tight backdrop-blur-sm ${getPointsBadgeClasses()}`} title={rank ? `Current rank: #${rank}` : undefined}>
                <Link href="/leaderboard" className="focus:outline-none">{renderPointsText()}</Link>
            </div>
        )}
        <UserDropdown user={user} onLogoutClick={() => setIsLogoutModalOpen(true)} />
        <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none"
        >
            {theme === 'dark' ? <IconSun className="h-5 w-5" stroke={1.5} /> : <IconMoon className="h-5 w-5" stroke={1.5} />}
        </button>
    </div>
);

export const MobileControls = ({ user, rank, renderPointsText, getPointsBadgeClasses, pathname, setIsLogoutModalOpen, isMenuOpen, setIsMenuOpen }) => (
    <div className="flex lg:hidden items-center">
        {user && (
            <span className={`mr-3 px-2.5 py-1 rounded-full text-xs font-normal tracking-tight backdrop-blur-sm ${getPointsBadgeClasses()}`} title={rank ? `Current rank: #${rank}` : undefined}>
                <Link href="/leaderboard" className="focus:outline-none">{renderPointsText()}</Link>
            </span>
        )}
        {pathname === '/account' ? (
            <button onClick={() => setIsLogoutModalOpen(true)} title="Sign Out" className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700">
                <IconLogout className="h-5 w-5" stroke={1.5} />
            </button>
        ) : (
            <Link href="/account" title="My Account" className="p-1 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700">
                <Avatar username={user?.username} className="w-7 h-7 text-xs" />
            </Link>
        )}
        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2 rounded-md text-gray-500 dark:text-gray-400">
            {isMenuOpen ? <IconX className="block h-6 w-6" stroke={1.5} /> : <IconMenu2 className="block h-6 w-6" stroke={1.5} />}
        </button>
    </div>
);
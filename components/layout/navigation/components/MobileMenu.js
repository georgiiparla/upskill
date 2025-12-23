"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';

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
            className={`block w-full text-left px-4 py-2 text-base font-medium rounded-md tracking-tight ${activeClass}`}
        >
            {children}
        </Link>
    );
};

const MobileMenuSectionLabel = ({ children }) => (
    <p className="px-4 pt-4 text-xs font-semibold uppercase tracking-wide text-gray-400 dark:text-gray-500">
        {children}
    </p>
);

export const MobileMenu = ({ isMenuOpen, setIsMenuOpen, isAdmin }) => {
    if (!isMenuOpen) return null;

    const closeMenu = () => setIsMenuOpen(false);

    const sections = [
        {
            title: 'Feedback',
            links: [
                { href: '/feedback', label: 'My Feedback' },
                { href: '/feedback/request/new', label: 'Request Feedback' },
            ],
        },
        {
            title: 'Explore',
            links: [
                { href: '/dashboard', label: 'Dashboard' },
                { href: '/leaderboard', label: 'Leaderboard' },
                { href: '/quests', label: 'Quests' },
            ],
        },
        ...(isAdmin ? [{
            title: 'Admin',
            links: [
                { href: '/admin/quests', label: 'Quest Management' },
                { href: '/admin/users', label: 'Members' },
            ],
        }] : []),
    ];

    return (
        <div className="lg:hidden border-t border-gray-200 dark:border-gray-700">
            {sections.map((section) => (
                <div key={section.title} className="pb-3">
                    <MobileMenuSectionLabel>{section.title}</MobileMenuSectionLabel>
                    <div className="mt-1 px-2 space-y-1 sm:px-3">
                        {section.links.map((link) => (
                            <MobileNavLink
                                key={link.href}
                                href={link.href}
                                closeMenu={closeMenu}
                            >
                                {link.label}
                            </MobileNavLink>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};

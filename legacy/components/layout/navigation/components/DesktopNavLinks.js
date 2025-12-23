"use client";
import { DesktopDropdown, DropdownItem } from '../../NavDropdown';
import { NavItem } from '../../NavItem';

const NavLink = ({ href, children, scrolled }) => (
    <NavItem
        href={href}
        scrolled={scrolled}
        className={`${scrolled ? 'px-4 py-2' : 'px-4 pt-1'} tracking-tight`}
    >
        {children}
    </NavItem>
);

export const DesktopNavLinks = ({ scrolled, isAdmin }) => (
    <div className="hidden lg:block">
        <div className="ml-10 flex items-baseline space-x-4">
            <NavLink href="/dashboard" scrolled={scrolled}>Dashboard</NavLink>
            <DesktopDropdown title="Feedback" scrolled={scrolled} activePaths={["/feedback", "/feedback/request"]}>
                <DropdownItem href="/feedback">My Feedback</DropdownItem>
                <DropdownItem href="/feedback/request/new">Request Feedback</DropdownItem>
            </DesktopDropdown>
            <DesktopDropdown title="Community" scrolled={scrolled} activePaths={["/leaderboard", "/quests"]}>
                <DropdownItem href="/quests">Quests</DropdownItem>
                <DropdownItem href="/leaderboard">Leaderboard</DropdownItem>
            </DesktopDropdown>
            {isAdmin && (
                <DesktopDropdown title="Admin" scrolled={scrolled} activePaths={["/admin/quests", "/admin/users"]}>
                    <DropdownItem href="/admin/quests">Quest Management</DropdownItem>
                    <DropdownItem href="/admin/users">Members</DropdownItem>
                </DesktopDropdown>
            )}
        </div>
    </div>
);

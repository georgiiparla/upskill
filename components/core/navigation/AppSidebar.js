"use client";
import React, { useState } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/Sidebar";
import { Avatar } from "@/components/core/ui/Avatar";
import {
    IconLayoutDashboard,
    IconMessage2,
    IconTrophy,
    IconTargetArrow,
    IconSettings,
    IconLogout,
    IconSun,
    IconMoon,
    IconUser
} from "@tabler/icons-react";
import { useAuth } from "@/context/AuthContext";
import { useTheme } from "next-themes";
import Link from "next/link";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { usePointsData } from "./NavbarHelpers";

export function AppSidebar() {
    const { user, logout, isAdmin, navbarRefreshTrigger } = useAuth();
    const { points } = usePointsData(user, navbarRefreshTrigger);
    const { theme, setTheme } = useTheme();
    const [open, setOpen] = useState(false);

    const handleLinkClick = () => {
        if (typeof window !== "undefined" && window.innerWidth < 1024) {
            setOpen(false);
        }
    };

    // Define links
    const links = [
        {
            label: "Dashboard",
            href: "/dashboard",
            icon: <IconLayoutDashboard className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />,
        },
        {
            label: "My Feedback",
            href: "/feedback",
            icon: <IconMessage2 className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />,
        },
        {
            label: "Quests",
            href: "/quests",
            icon: <IconTargetArrow className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />,
        },
        {
            label: "Leaderboard",
            href: "/leaderboard",
            icon: <IconTrophy className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />,
        },
    ];

    if (isAdmin) {
        links.push({
            label: "Admin",
            href: "/admin/quests",
            icon: <IconSettings className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />,
        });
    }

    return (
        <Sidebar open={open} setOpen={setOpen} animate={true}>
            <SidebarBody className="justify-between gap-10">
                <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
                    {/* Logo */}
                    <Link href="/dashboard" className="flex items-center gap-2 py-2 mb-4" onClick={handleLinkClick}>
                        <div className="h-6 w-6 relative shrink-0">
                            <Image src="/csway-logo.png" alt="Logo" fill className="object-contain" />
                        </div>
                        {open && (
                            <span className="font-bold text-2xl lg:text-lg text-neutral-700 dark:text-white whitespace-pre">
                                Upskill
                            </span>
                        )}
                    </Link>

                    <div className="flex flex-col gap-2">
                        {links.map((link, idx) => (
                            <SidebarLink key={idx} link={link} onClick={handleLinkClick} />
                        ))}
                    </div>
                </div>

                {/* Footer / User Profile & Actions */}
                <div className="flex flex-col gap-2">
                    {/* Theme Toggle as a Link-like item */}
                    <div
                        className="flex items-center justify-start gap-2 group/sidebar py-2 cursor-pointer"
                        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                    >
                        {theme === 'dark' ? (
                            <IconSun className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
                        ) : (
                            <IconMoon className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
                        )}
                        {open && (
                            <span className="text-neutral-700 dark:text-slate-200 text-xl lg:text-sm group-hover/sidebar:translate-x-1 transition duration-150">
                                {theme === 'dark' ? 'Light' : 'Dark'}
                            </span>
                        )}
                    </div>

                    {/* Logout */}
                    <div
                        className="flex items-center justify-start gap-2 group/sidebar py-2 cursor-pointer"
                        onClick={() => logout()}
                    >
                        <IconLogout className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
                        {open && (
                            <span className="text-neutral-700 dark:text-slate-200 text-xl lg:text-sm group-hover/sidebar:translate-x-1 transition duration-150">
                                Logout
                            </span>
                        )}
                    </div>

                    {/* Profile */}
                    <SidebarLink
                        onClick={handleLinkClick}
                        link={{
                            label: user?.username ? `${user.username} (${points ?? 0} pts)` : "Profile",
                            href: "/account",
                            icon: (
                                user?.username ? (
                                    <Avatar username={user.username} className="h-7 w-7 text-xs" />
                                ) : (
                                    <div className="h-7 w-7 shrink-0 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center overflow-hidden">
                                        <IconUser className="h-4 w-4 text-slate-500" />
                                    </div>
                                )
                            ),
                        }}
                    />
                </div>
            </SidebarBody>
        </Sidebar>
    );
}

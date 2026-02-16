"use client";
import React, { useState } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "@/components/layout/Sidebar";
import { Avatar } from "@/components/ui/Avatar";
import {
    IconLayoutDashboard,
    IconMessage2,
    IconTrophy,
    IconTargetArrow,
    IconSettings,
    IconLogout,
    IconSun,
    IconMoon,
    IconUser,
    IconMessagePlus,
    IconUsers
} from "@tabler/icons-react";
import { useAuthStore } from "@/store/authStore";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { usePointsData } from "./NavbarHelpers";

export function AppSidebar() {
    const { user, logout, isAdmin, navbarRefreshTrigger } = useAuthStore();
    const router = useRouter();
    const { points } = usePointsData(user, navbarRefreshTrigger);
    const { theme, setTheme } = useTheme();
    const [open, setOpen] = useState(false);

    const handleLinkClick = () => {
        if (typeof window !== "undefined" && window.innerWidth < 1024) {
            setOpen(false);
        }
    };

    const handleLogout = async () => {
        await logout(router);
    };

    const links = [
        {
            label: "Dashboard",
            href: "/dashboard",
            icon: <IconLayoutDashboard className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" stroke={1.5} />,
        },
        {
            label: "My Feedback",
            href: "/feedback",
            icon: <IconMessage2 className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" stroke={1.5} />,
        },
        {
            label: "Request Feedback",
            href: "/feedback/request/new",
            icon: <IconMessagePlus className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" stroke={1.5} />,
        },
        {
            label: "Quests",
            href: "/quests",
            icon: <IconTargetArrow className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" stroke={1.5} />,
        },
        {
            label: "Leaderboard",
            href: "/leaderboard",
            icon: <IconTrophy className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" stroke={1.5} />,
        },
    ];

    if (isAdmin) {
        links.push({
            label: "Users",
            href: "/admin/users",
            icon: <IconUsers className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" stroke={1.5} />,
        });
        links.push({
            label: "Admin",
            href: "/admin/quests",
            icon: <IconSettings className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" stroke={1.5} />,
        });
    }
    return (
        <Sidebar open={open} setOpen={setOpen} animate={true}>
            <SidebarBody className="justify-between gap-10">
                <div className="flex flex-col flex-1 overflow-hidden">
                    {/* Logo */}
                    <Link href="/dashboard" className="flex items-center gap-2 py-2 px-2 mb-4 rounded-md" onClick={handleLinkClick}>
                        <div className="w-8 h-8 flex items-center justify-center shrink-0">
                            <div className="h-6 w-6 relative shrink-0">
                                <Image src="/csway-logo.png" alt="Logo" fill sizes="24px" className="object-contain" />
                            </div>
                        </div>
                        {open && (
                            <span className="font-bold text-2xl lg:text-lg text-neutral-700 dark:text-white whitespace-pre">
                                Upskill Platform
                            </span>
                        )}
                    </Link>
                    <div className={`flex flex-col gap-2 overflow-y-auto overflow-x-hidden ${open ? 'scrollbar-thin' : 'no-scrollbar'}`}>
                        {links.map((link, idx) => (
                            <SidebarLink key={idx} link={link} onClick={handleLinkClick} />
                        ))}
                    </div>
                </div>
                {/* Footer */}
                <div className="flex flex-col gap-2">
                    <div
                        className="flex items-center justify-start gap-2 group/sidebar py-2 px-2 cursor-pointer rounded-md"
                        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                    >
                        <div className="w-8 h-8 flex items-center justify-center shrink-0">
                            {theme === 'dark' ? (
                                <IconSun className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" stroke={1.5} />
                            ) : (
                                <IconMoon className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" stroke={1.5} />
                            )}
                        </div>
                        {open && (
                            <span className="text-neutral-700 dark:text-slate-200 text-xl lg:text-sm group-hover/sidebar:translate-x-1 transition duration-150">
                                {theme === 'dark' ? 'Light' : 'Dark'}
                            </span>
                        )}
                    </div>
                    <div
                        className="flex items-center justify-start gap-2 group/sidebar py-2 px-2 cursor-pointer rounded-md"
                        onClick={handleLogout}
                    >
                        <div className="w-8 h-8 flex items-center justify-center shrink-0">
                            <IconLogout className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" stroke={1.5} />
                        </div>
                        {open && (
                            <span className="text-neutral-700 dark:text-slate-200 text-xl lg:text-sm group-hover/sidebar:translate-x-1 transition duration-150">
                                Logout
                            </span>
                        )}
                    </div>
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
                                        <IconUser className="h-4 w-4 text-slate-500" stroke={1.5} />
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

"use client";
import React, { useState } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/Sidebar";
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

export function AppSidebar() {
    const { user, logout, isAdmin } = useAuth();
    const { theme, setTheme } = useTheme();
    const [open, setOpen] = useState(false);

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
                    <div className="flex items-center gap-2 py-2 mb-4">
                        <div className="h-6 w-6 relative shrink-0">
                            <Image src="/csway-logo.png" alt="Logo" fill className="object-contain" />
                        </div>
                        {open && (
                            <span className="font-bold text-lg text-neutral-700 dark:text-white whitespace-pre">
                                Upskill
                            </span>
                        )}
                    </div>

                    <div className="flex flex-col gap-2">
                        {links.map((link, idx) => (
                            <SidebarLink key={idx} link={link} />
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
                            <span className="text-neutral-700 dark:text-slate-200 text-sm group-hover/sidebar:translate-x-1 transition duration-150">
                                {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
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
                            <span className="text-neutral-700 dark:text-slate-200 text-sm group-hover/sidebar:translate-x-1 transition duration-150">
                                Sign Out
                            </span>
                        )}
                    </div>

                    {/* Profile */}
                    <SidebarLink
                        link={{
                            label: user?.username || "Profile",
                            href: "/account",
                            icon: (
                                <div className="h-7 w-7 shrink-0 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center overflow-hidden">
                                    {/* Simple avatar placeholder if no image, or use Avatar component if compatible */}
                                    <IconUser className="h-4 w-4 text-slate-500" />
                                </div>
                            ),
                        }}
                    />
                </div>
            </SidebarBody>
        </Sidebar>
    );
}

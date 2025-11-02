import { Inter } from "next/font/google";
import "./globals.css";

import { Toaster } from 'react-hot-toast';

import { ThemeProvider } from '@/components/shared/theme/ThemeProvider';
import { AuthProvider } from "@/context/AuthContext";
import { GlobalErrorNotifier } from "@/components/core/feedback/GlobalErrorNotifier";
import AppLayout from "@/components/core/layout/AppLayout";
import { ThemeToggleButton } from "@/components/shared/theme/ThemeToggleButton";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
    title: "Upskill",
    description: "Upskill platform",
};

export const viewport = {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
    themeColor: [
        { media: '(prefers-color-scheme: light)', color: 'white' },
        { media: '(prefers-color-scheme: dark)', color: 'black' },
    ],
};


export default function RootLayout({ children }) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className={`${inter.className} antialiased`}>
                <AuthProvider>
                    <GlobalErrorNotifier />
                    <ThemeProvider>

                        <Toaster
                            position="bottom-right"
                            toastOptions={{
                                className: 'bg-white/95 dark:bg-slate-900/95 text-gray-900 dark:text-white border border-slate-200/60 dark:border-slate-700/60 rounded-lg shadow-xl p-4 backdrop-blur-sm',
                                success: {
                                    iconTheme: {
                                        primary: '#22a55e',
                                        secondary: '#ffffff',
                                    },
                                },
                                error: {
                                    iconTheme: {
                                        primary: '#e37a7b',
                                        secondary: '#ffffff',
                                    },
                                },
                            }}
                            containerClassName="fixed z-[9999]"
                        />

                        <AppLayout>{children}</AppLayout>

                        <ThemeToggleButton />
                    </ThemeProvider>
                </AuthProvider>
            </body>
        </html>
    );
}
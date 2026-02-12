import { Outfit, JetBrains_Mono } from "next/font/google";
import "./globals.css";

import { Toaster } from 'react-hot-toast';

import { ThemeProvider } from '@/components/layout/ThemeProvider';
import { AuthProvider } from "@/context/AuthContext";
import { GlobalErrorNotifier } from "@/components/ui/feedback/GlobalErrorNotifier";
import AppLayout from "@/components/layout/AppLayout";
import { ThemeToggleButton } from "@/components/ui/ThemeToggleButton";

const outfit = Outfit({
    subsets: ["latin"],
    variable: "--font-sans",
});

const jetbrainsMono = JetBrains_Mono({
    subsets: ["latin"],
    variable: "--font-mono",
});

export const metadata = {
    title: "Upskill",
    description: "Upskill platform",
    // ADD THE SECTIONS BELOW
    manifest: '/manifest.json', // Explicitly link the manifest
    icons: {
        icon: [
            { url: '/icons/icon-192x192.png', sizes: '192x192', type: 'image/png' },
            { url: '/icons/icon-512x512.png', sizes: '512x512', type: 'image/png' },
        ],
        // Critical for iOS - uses the high-res 192px icon instead of pixelated favicon
        apple: [
            { url: '/icons/icon-192x192.png?v=2', sizes: '180x180', type: 'image/png' },
        ],
    },
    // Recommended for full PWA status
    appleWebApp: {
        capable: true,
        statusBarStyle: 'default',
        title: 'Upskill',
    },
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
            <body suppressHydrationWarning className={`${outfit.variable} ${jetbrainsMono.variable} font-sans antialiased bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-50`}>
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


                    </ThemeProvider>
                </AuthProvider>
            </body>
        </html>
    );
}
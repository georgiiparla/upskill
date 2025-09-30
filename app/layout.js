import { Inter } from "next/font/google";
import "./globals.css";

import { Toaster } from 'react-hot-toast';

import { ThemeProvider } from '../components/shared/ThemeProvider';
import { AuthProvider } from "@/context/AuthContext";
import { GlobalErrorNotifier } from "@/components/shared/GlobalErrorNotifier";
import AppLayout from "@/components/shared/AppLayout";
import { ThemeToggleButton } from "@/components/shared/ThemeToggleButton";

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
                                className: 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg p-4',
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
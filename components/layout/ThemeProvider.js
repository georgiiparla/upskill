"use client";

import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { useEffect, useState } from 'react';


export function ThemeProvider({ children }) {
    return (
        <NextThemesProvider attribute="class" defaultTheme="system">
            {children}
        </NextThemesProvider>
    );
}

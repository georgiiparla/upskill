"use client";

import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { useEffect, useState } from 'react';

export function ThemeProvider({ children }) {
	// This state ensures the component is only rendered on the client.
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	if (!mounted) {
		// On the server, return nothing to avoid a hydration mismatch.
		// The actual content will be rendered on the client.
		return <>{children}</>;
	}

	return (
		<NextThemesProvider attribute="class" defaultTheme="system">
			{children}
		</NextThemesProvider>
	);
}

// app/layout.js
import { Inter } from "next/font/google";
import "./globals.css";

import { ThemeProvider } from '../components/ThemeProvider';
import { AuthProvider } from "@/context/AuthContext";
import { GlobalErrorNotifier } from "@/components/GlobalErrorNotifier"; // IMPORT the new component

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
	title: "Upskill",
	description: "Upskill platform",
};

export default function RootLayout({ children }) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body
				className={`${inter.className} antialiased`}
			>
                <AuthProvider>
                    <GlobalErrorNotifier />
				    <ThemeProvider>
					    {children}
				    </ThemeProvider>
                </AuthProvider>
			</body>
		</html>
	);
}
import { Inter } from "next/font/google";
import "./globals.css";

import { ThemeProvider } from '../components/shared/ThemeProvider';
import { AuthProvider } from "@/context/AuthContext";
import { GlobalErrorNotifier } from "@/components/shared/GlobalErrorNotifier";
import AppLayout from "@/components/shared/AppLayout";

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
					    <AppLayout>{children}</AppLayout>
				    </ThemeProvider>
                </AuthProvider>
			</body>
		</html>
	);
}
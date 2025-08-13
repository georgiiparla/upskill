import { Inter } from "next/font/google";
import "./globals.css";

import { ThemeProvider } from '../components/ThemeProvider';

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
				<ThemeProvider>
					{children}
				</ThemeProvider>
			</body>
		</html>
	);
}

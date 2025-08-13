"use client"

import React, { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { Eye, Menu, X } from 'lucide-react'; // Import Menu and X icons
import Image from 'next/image';

import { Dashboard } from "../components/Dashboard";
import { Feedback } from "../components/Feedback";
import { Leaderboard } from "../components/Leaderboard";
import { Quests } from "../components/Quests";

// Main App Component
export default function App() {
	const { theme, setTheme } = useTheme();
	const [mounted, setMounted] = useState(false);
	const [currentPage, setCurrentPage] = useState('dashboard');
	const [isMenuOpen, setIsMenuOpen] = useState(false); // State for the mobile menu

	useEffect(() => {
		setMounted(true);
	}, []);

	if (!mounted) {
		return null;
	}

	const NavLink = ({ pageName, children }) => {
		const isActive = currentPage === pageName;
		return (
			<button
				onClick={() => {
					setCurrentPage(pageName);
					setIsMenuOpen(false); // Close menu on navigation
				}}
				className={`border-b-2 px-1 pt-1 text-sm font-medium transition-colors duration-150 ease-in-out ${isActive
					// Active State: A colored underline and strong text
					? 'border-indigo-500 dark:border-indigo-400 text-gray-900 dark:text-gray-100'
					// Inactive State: A transparent underline and muted text
					: 'border-transparent text-gray-500 dark:text-gray-400 hover:border-gray-300 dark:hover:border-gray-600 hover:text-gray-700 dark:hover:text-gray-300'
					}`}
			>
				{children}
			</button>
		);
	};

	const MobileNavLink = ({ pageName, children }) => {
		const isActive = currentPage === pageName;
		return (
			<button
				onClick={() => {
					setCurrentPage(pageName);
					setIsMenuOpen(false); // Close menu on navigation
				}}
				className={`block w-full text-left px-4 py-2 text-base font-medium rounded-md ${isActive
					? 'bg-indigo-50 dark:bg-gray-700 text-indigo-700 dark:text-white'
					: 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
					}`}
			>
				{children}
			</button>
		)
	}

	const renderPage = () => {
		switch (currentPage) {
			case 'dashboard':
				return <Dashboard />;
			case 'quests':
				return <Quests />;
			case 'feedback':
				return <Feedback />;
			case 'leaderboard':
				return <Leaderboard />;
			default:
				return <Dashboard />;
		}
	};


	return (
		<div className="min-h-screen bg-gray-100 dark:bg-gray-900">
			{/* Navigation */}
			<nav className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
				<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
					<div className="flex h-16 items-center justify-between">
						<div className="flex items-center">
							{/* Logo */}
							<div className="flex-shrink-0 text-gray-900 dark:text-white font-bold text-xl flex items-center">
								<Image
									src="/rs2logo.png" // The path to your image in the 'public' folder
									alt="Upskill Logo"
									width={32}         // Corresponds to Tailwind's h-8 (8 * 4px = 32px)
									height={32}        // Corresponds to Tailwind's w-8
									className="mr-2"   // Keeps the margin from the text
								/>
								Upskill
							</div>
							{/* Desktop Navigation Links: Hidden on mobile */}
							<div className="hidden md:block">
								<div className="ml-10 flex items-baseline space-x-4">
									<NavLink pageName="dashboard">Dashboard</NavLink>
									<NavLink pageName="quests">Quests</NavLink>
									<NavLink pageName="feedback">Feedback</NavLink>
									<NavLink pageName="leaderboard">Leaderboard</NavLink>
								</div>
							</div>
						</div>
						<div className="flex items-center">
							{/* Theme Toggle Button */}
							<button
								onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
								className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-white focus:ring-offset-2 dark:focus:ring-offset-gray-800"
							>
								{theme === 'dark' ? '☀️' : '🌙'}
							</button>
							{/* Hamburger Menu Button: Visible only on mobile */}
							<div className="ml-2 md:hidden">
								<button
									onClick={() => setIsMenuOpen(!isMenuOpen)}
									className="inline-flex items-center justify-center p-2 rounded-md text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none"
								>
									<span className="sr-only">Open main menu</span>
									{isMenuOpen ? (
										<X className="block h-6 w-6" aria-hidden="true" />
									) : (
										<Menu className="block h-6 w-6" aria-hidden="true" />
									)}
								</button>
							</div>
						</div>
					</div>
				</div>

				{/* Mobile Menu: Shows when isMenuOpen is true, hidden on desktop */}
				{isMenuOpen && (
					<div className="md:hidden border-t border-gray-200 dark:border-gray-700">
						<div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
							<MobileNavLink pageName="dashboard">Dashboard</MobileNavLink>
							<MobileNavLink pageName="quests">Quests</MobileNavLink>
							<MobileNavLink pageName="feedback">Feedback</MobileNavLink>
							<MobileNavLink pageName="leaderboard">Leaderboard</MobileNavLink>
						</div>
					</div>
				)}
			</nav>

			{/* Main Content */}
			<main>
				{/* Added responsive padding: px-4 on mobile, sm:px-6 and lg:px-8 on larger screens */}
				<div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
					{renderPage()}
				</div>
			</main>
		</div>
	);
}

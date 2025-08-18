This file is a merged representation of a subset of the codebase, containing files not matching ignore patterns, combined into a single document by Repomix.

# File Summary

## Purpose
This file contains a packed representation of a subset of the repository's contents that is considered the most important context.
It is designed to be easily consumable by AI systems for analysis, code review,
or other automated processes.

## File Format
The content is organized as follows:
1. This summary section
2. Repository information
3. Directory structure
4. Repository files (if enabled)
5. Multiple file entries, each consisting of:
  a. A header with the file path (## File: path/to/file)
  b. The full contents of the file in a code block

## Usage Guidelines
- This file should be treated as read-only. Any changes should be made to the
  original repository files, not this packed version.
- When processing this file, use the file path to distinguish
  between different files in the repository.
- Be aware that this file may contain sensitive information. Handle it with
  the same level of security as you would the original repository.

## Notes
- Some files may have been excluded based on .gitignore rules and Repomix's configuration
- Binary files are not included in this packed representation. Please refer to the Repository Structure section for a complete list of file paths, including binary files
- Files matching these patterns are excluded: node_modules
- Files matching patterns in .gitignore are excluded
- Files matching default ignore patterns are excluded
- Files are sorted by Git change count (files with more changes are at the bottom)

# Directory Structure
```
.gitignore
app/globals.css
app/layout.js
app/page.js
components/Dashboard.js
components/Feedback.js
components/feedback/FeedbackHistory.js
components/feedback/FeedbackTips.js
components/Helper.js
components/Leaderboard.js
components/Quests.js
components/ThemeProvider.js
jsconfig.json
mock/mock_data.js
next.config.mjs
package.json
postcss.config.mjs
public/file.svg
public/globe.svg
public/next.svg
public/vercel.svg
public/window.svg
README.md
tailwind.config.js
```

# Files

## File: .gitignore
````
# See https://help.github.com/articles/ignoring-files/ for more about ignoring files.

# dependencies
/node_modules
/.pnp
.pnp.*
.yarn/*
!.yarn/patches
!.yarn/plugins
!.yarn/releases
!.yarn/versions

# testing
/coverage

# next.js
/.next/
/out/

# production
/build

# misc
.DS_Store
*.pem

# debug
npm-debug.log*
yarn-debug.log*
yarn-error.log*
.pnpm-debug.log*

# env files (can opt-in for committing if needed)
.env*

# vercel
.vercel

# typescript
*.tsbuildinfo
next-env.d.ts
````

## File: components/feedback/FeedbackTips.js
````javascript
import { Lightbulb } from 'lucide-react';
import { Card, SectionTitle } from "../Helper";

// --- Style Definitions ---
const TIPS_STYLES = {
    listItem: `
        flex 
        items-start 
        text-sm 
        text-gray-600 dark:text-gray-300
    `,
    bulletPoint: `
        mt-1 
        mr-3 
        flex-shrink-0 
        h-2 w-2 
        rounded-full 
        bg-indigo-400
    `,
};

// --- List of Tips ---
const feedbackTips = [
    "Be specific: Provide concrete examples instead of vague statements.",
    "Focus on behavior, not personality. Describe the action and its impact.",
    "Offer solutions: If you identify a problem, suggest a potential improvement.",
    "Be timely: Provide feedback as soon as possible after the event.",
    "Keep it constructive: The goal is to help and improve, not to criticize."
];

export const FeedbackTips = () => {
    return (
        <div>
            <SectionTitle icon={<Lightbulb className="h-6 w-6 text-indigo-500" />} title="Tips for Effective Feedback" />
            <Card>
                <ul className="space-y-3">
                    {feedbackTips.map((tip, index) => (
                        <li key={index} className={TIPS_STYLES.listItem}>
                            <span className={TIPS_STYLES.bulletPoint}></span>
                            {tip}
                        </li>
                    ))}
                </ul>
            </Card>
        </div>
    );
};
````

## File: components/ThemeProvider.js
````javascript
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
````

## File: jsconfig.json
````json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./*"]
    }
  }
}
````

## File: next.config.mjs
````
/** @type {import('next').NextConfig} */
const nextConfig = {};

export default nextConfig;
````

## File: public/file.svg
````
<svg fill="none" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path d="M14.5 13.5V5.41a1 1 0 0 0-.3-.7L9.8.29A1 1 0 0 0 9.08 0H1.5v13.5A2.5 2.5 0 0 0 4 16h8a2.5 2.5 0 0 0 2.5-2.5m-1.5 0v-7H8v-5H3v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1M9.5 5V2.12L12.38 5zM5.13 5h-.62v1.25h2.12V5zm-.62 3h7.12v1.25H4.5zm.62 3h-.62v1.25h7.12V11z" clip-rule="evenodd" fill="#666" fill-rule="evenodd"/></svg>
````

## File: public/globe.svg
````
<svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><g clip-path="url(#a)"><path fill-rule="evenodd" clip-rule="evenodd" d="M10.27 14.1a6.5 6.5 0 0 0 3.67-3.45q-1.24.21-2.7.34-.31 1.83-.97 3.1M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16m.48-1.52a7 7 0 0 1-.96 0H7.5a4 4 0 0 1-.84-1.32q-.38-.89-.63-2.08a40 40 0 0 0 3.92 0q-.25 1.2-.63 2.08a4 4 0 0 1-.84 1.31zm2.94-4.76q1.66-.15 2.95-.43a7 7 0 0 0 0-2.58q-1.3-.27-2.95-.43a18 18 0 0 1 0 3.44m-1.27-3.54a17 17 0 0 1 0 3.64 39 39 0 0 1-4.3 0 17 17 0 0 1 0-3.64 39 39 0 0 1 4.3 0m1.1-1.17q1.45.13 2.69.34a6.5 6.5 0 0 0-3.67-3.44q.65 1.26.98 3.1M8.48 1.5l.01.02q.41.37.84 1.31.38.89.63 2.08a40 40 0 0 0-3.92 0q.25-1.2.63-2.08a4 4 0 0 1 .85-1.32 7 7 0 0 1 .96 0m-2.75.4a6.5 6.5 0 0 0-3.67 3.44 29 29 0 0 1 2.7-.34q.31-1.83.97-3.1M4.58 6.28q-1.66.16-2.95.43a7 7 0 0 0 0 2.58q1.3.27 2.95.43a18 18 0 0 1 0-3.44m.17 4.71q-1.45-.12-2.69-.34a6.5 6.5 0 0 0 3.67 3.44q-.65-1.27-.98-3.1" fill="#666"/></g><defs><clipPath id="a"><path fill="#fff" d="M0 0h16v16H0z"/></clipPath></defs></svg>
````

## File: public/next.svg
````
<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 394 80"><path fill="#000" d="M262 0h68.5v12.7h-27.2v66.6h-13.6V12.7H262V0ZM149 0v12.7H94v20.4h44.3v12.6H94v21h55v12.6H80.5V0h68.7zm34.3 0h-17.8l63.8 79.4h17.9l-32-39.7 32-39.6h-17.9l-23 28.6-23-28.6zm18.3 56.7-9-11-27.1 33.7h17.8l18.3-22.7z"/><path fill="#000" d="M81 79.3 17 0H0v79.3h13.6V17l50.2 62.3H81Zm252.6-.4c-1 0-1.8-.4-2.5-1s-1.1-1.6-1.1-2.6.3-1.8 1-2.5 1.6-1 2.6-1 1.8.3 2.5 1a3.4 3.4 0 0 1 .6 4.3 3.7 3.7 0 0 1-3 1.8zm23.2-33.5h6v23.3c0 2.1-.4 4-1.3 5.5a9.1 9.1 0 0 1-3.8 3.5c-1.6.8-3.5 1.3-5.7 1.3-2 0-3.7-.4-5.3-1s-2.8-1.8-3.7-3.2c-.9-1.3-1.4-3-1.4-5h6c.1.8.3 1.6.7 2.2s1 1.2 1.6 1.5c.7.4 1.5.5 2.4.5 1 0 1.8-.2 2.4-.6a4 4 0 0 0 1.6-1.8c.3-.8.5-1.8.5-3V45.5zm30.9 9.1a4.4 4.4 0 0 0-2-3.3 7.5 7.5 0 0 0-4.3-1.1c-1.3 0-2.4.2-3.3.5-.9.4-1.6 1-2 1.6a3.5 3.5 0 0 0-.3 4c.3.5.7.9 1.3 1.2l1.8 1 2 .5 3.2.8c1.3.3 2.5.7 3.7 1.2a13 13 0 0 1 3.2 1.8 8.1 8.1 0 0 1 3 6.5c0 2-.5 3.7-1.5 5.1a10 10 0 0 1-4.4 3.5c-1.8.8-4.1 1.2-6.8 1.2-2.6 0-4.9-.4-6.8-1.2-2-.8-3.4-2-4.5-3.5a10 10 0 0 1-1.7-5.6h6a5 5 0 0 0 3.5 4.6c1 .4 2.2.6 3.4.6 1.3 0 2.5-.2 3.5-.6 1-.4 1.8-1 2.4-1.7a4 4 0 0 0 .8-2.4c0-.9-.2-1.6-.7-2.2a11 11 0 0 0-2.1-1.4l-3.2-1-3.8-1c-2.8-.7-5-1.7-6.6-3.2a7.2 7.2 0 0 1-2.4-5.7 8 8 0 0 1 1.7-5 10 10 0 0 1 4.3-3.5c2-.8 4-1.2 6.4-1.2 2.3 0 4.4.4 6.2 1.2 1.8.8 3.2 2 4.3 3.4 1 1.4 1.5 3 1.5 5h-5.8z"/></svg>
````

## File: public/vercel.svg
````
<svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1155 1000"><path d="m577.3 0 577.4 1000H0z" fill="#fff"/></svg>
````

## File: public/window.svg
````
<svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path fill-rule="evenodd" clip-rule="evenodd" d="M1.5 2.5h13v10a1 1 0 0 1-1 1h-11a1 1 0 0 1-1-1zM0 1h16v11.5a2.5 2.5 0 0 1-2.5 2.5h-11A2.5 2.5 0 0 1 0 12.5zm3.75 4.5a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5M7 4.75a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0m1.75.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5" fill="#666"/></svg>
````

## File: README.md
````markdown
This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
````

## File: app/layout.js
````javascript
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
````

## File: components/Quests.js
````javascript
// -----------------------------------------------------------------------------
// File: components/Quests.js (MODIFIED with Skeleton Loader)
// -----------------------------------------------------------------------------
"use client"
import { Shield, Target } from 'lucide-react';
import { Card, SectionTitle } from "./Helper";
import React, { useState, useEffect } from 'react';

// --- Style Definitions ---
const QUESTS_STYLES = {
    pageDescription: `
        mb-6 
        text-gray-600 dark:text-gray-400
    `,
    questsGrid: `
        grid 
        grid-cols-1 md:grid-cols-2 lg:grid-cols-3 
        gap-6
    `,
    cardCompleted: `
        opacity-60 
        bg-gray-50 dark:bg-gray-800/50
    `,
    questTitle: `
        text-lg 
        font-bold 
        text-gray-900 dark:text-white
    `,
    pointsBadge: `
        bg-yellow-100 text-yellow-800 
        text-xs font-semibold 
        px-2.5 py-0.5 
        rounded-full 
        dark:bg-yellow-900 dark:text-yellow-300
    `,
    questDescription: `
        mt-2 
        text-sm 
        text-gray-600 dark:text-gray-400
    `,
    progressLabel: `
        text-sm 
        font-medium 
        text-gray-700 dark:text-gray-300
    `,
    progressBarContainer: `
        w-full 
        bg-gray-200 
        rounded-full 
        h-2.5 
        dark:bg-gray-700
    `,
    progressBarFill: `
        bg-blue-600 
        h-2.5 
        rounded-full
    `,
    completedBadge: `
        mt-4 
        flex items-center 
        text-green-600 dark:text-green-400
    `,
    completedLabel: `
        ml-2 
        text-sm 
        font-semibold
    `
};

// --- NEW: Skeleton Component for a single Quest Card ---
const QuestCardSkeleton = () => {
    return (
        <Card className="animate-pulse">
            <div className="flex justify-between items-start">
                {/* Title Placeholder */}
                <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-3/4"></div>
                {/* Points Placeholder */}
                <div className="h-5 bg-gray-300 dark:bg-gray-700 rounded-full w-12"></div>
            </div>
            {/* Description Placeholder */}
            <div className="mt-3 space-y-2">
                <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-full"></div>
                <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-5/6"></div>
            </div>
            <div className="mt-5">
                <div className="flex justify-between mb-1">
                    {/* Progress Label Placeholder */}
                    <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/4"></div>
                    {/* Progress Percentage Placeholder */}
                    <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/6"></div>
                </div>
                {/* Progress Bar Placeholder */}
                <div className="w-full bg-gray-300 dark:bg-gray-700 rounded-full h-2.5"></div>
            </div>
        </Card>
    );
};


export const Quests = () => {
    const [quests, setQuests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchQuests = async () => {
            try {
                // Simulate a slightly longer network request to see the skeleton
                await new Promise(resolve => setTimeout(resolve, 1000));
                
                const response = await fetch('http://localhost:9292/quests');
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setQuests(data);
            } catch (e) {
                console.error("Failed to fetch quests:", e);
                setError(e.message);
            } finally {
                setLoading(false);
            }
        };

        fetchQuests();
    }, []);

    // --- UPDATED: Loading state now renders the skeleton grid ---
    if (loading) {
        return (
            <div>
                <SectionTitle icon={<Target className="h-6 w-6 text-indigo-500" />} title="Challenges & Quests" />
                <p className={QUESTS_STYLES.pageDescription}>Engage in challenges to earn points, unlock badges, and grow your skills.</p>
                <div className={QUESTS_STYLES.questsGrid}>
                    {/* Render a few skeleton cards to show the layout */}
                    <QuestCardSkeleton />
                    <QuestCardSkeleton />
                    <QuestCardSkeleton />
                </div>
            </div>
        );
    }

    if (error) {
        return (
             <div>
                <SectionTitle icon={<Target className="h-6 w-6 text-indigo-500" />} title="Challenges & Quests" />
                <p className="text-red-500">Could not load quests: {error}</p>
            </div>
        )
    }

    return (
        <div>
            <SectionTitle icon={<Target className="h-6 w-6 text-indigo-500" />} title="Challenges & Quests" />
            <p className={QUESTS_STYLES.pageDescription}>Engage in challenges to earn points, unlock badges, and grow your skills.</p>
            <div className={QUESTS_STYLES.questsGrid}>
                {quests.map(quest => (
                    <Card key={quest.id} className={quest.completed ? QUESTS_STYLES.cardCompleted : ''}>
                        <div className="flex justify-between items-start">
                            <h3 className={QUESTS_STYLES.questTitle}>{quest.title}</h3>
                            <span className={QUESTS_STYLES.pointsBadge}>{quest.points} PTS</span>
                        </div>
                        <p className={QUESTS_STYLES.questDescription}>{quest.description}</p>
                        <div className="mt-4">
                            <div className="flex justify-between mb-1">
                                <span className={QUESTS_STYLES.progressLabel}>Progress</span>
                                <span className={QUESTS_STYLES.progressLabel}>{quest.progress}%</span>
                            </div>
                            <div className={QUESTS_STYLES.progressBarContainer}>
                                <div className={QUESTS_STYLES.progressBarFill} style={{ width: `${quest.progress}%` }}></div>
                            </div>
                        </div>
                        {quest.completed && (
                            <div className={QUESTS_STYLES.completedBadge}>
                                <Shield className="h-5 w-5" />
                                <span className={QUESTS_STYLES.completedLabel}>Completed</span>
                            </div>
                        )}
                    </Card>
                ))}
            </div>
        </div>
    );
};
````

## File: postcss.config.mjs
````
const config = {
	plugins: {
		tailwindcss: {},
		autoprefixer: {},
	},
};

export default config;
````

## File: tailwind.config.js
````javascript
// In tailwind.config.js

/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: 'class',
    content: [
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {},
    },
    // 👇 REMOVE THE PLUGINS ARRAY OR LEAVE IT EMPTY 👇
    plugins: [], 
};
````

## File: app/globals.css
````css
@tailwind base;
@tailwind components;
@tailwind utilities;

/* Add this to the end of app/globals.css */

/* Hide scrollbar for Chrome, Safari and Opera */
.no-scrollbar::-webkit-scrollbar {
    display: none;
}

/* Hide scrollbar for IE, Edge and Firefox */
.no-scrollbar {
    -ms-overflow-style: none;  /* IE and Edge */
    scrollbar-width: none;  /* Firefox */
}
````

## File: components/feedback/FeedbackHistory.js
````javascript
"use client";
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Card, SectionTitle } from "../Helper";
import { MessageSquare, Loader2, AlertTriangle } from "lucide-react"; // Import AlertTriangle

// --- Skeleton and Style components can remain unchanged ---
const FeedbackSkeleton = () => (
    <li className="p-4 rounded-lg bg-gray-50 dark:bg-gray-800/60 border-l-2 border-gray-300 dark:border-gray-600 animate-pulse">
        <div className="flex justify-between items-center mb-2">
            <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-1/3"></div>
            <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-1/4"></div>
        </div>
        <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-full"></div>
    </li>
);

const getSentimentColor = (sentiment) => {
    switch (sentiment) {
        case 'Positive': return 'border-green-500';
        case 'Negative': return 'border-red-500';
        default: return 'border-amber-500';
    }
};

export const FeedbackHistory = () => {
    const [items, setItems] = useState([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isFetchingMore, setIsFetchingMore] = useState(false);
    const observer = useRef();
    const ITEMS_PER_PAGE = 5;

    useEffect(() => {
        const fetchFeedback = async () => {
            if (page === 1) {
                setIsLoading(true);
            } else {
                setIsFetchingMore(true);
            }

            try {
                await new Promise(resolve => setTimeout(resolve, 1000));
                const response = await fetch(`http://localhost:9292/feedback?page=${page}&limit=${ITEMS_PER_PAGE}`);
                if (!response.ok) {
                    throw new Error(`The server responded with status: ${response.status}`);
                }
                const data = await response.json();
                
                setItems(prevItems => page === 1 ? data.items : [...prevItems, ...data.items]);
                setHasMore(data.hasMore);

            } catch (err) {
                console.error("Failed to fetch feedback history:", err);
                setError(err.message);
                setHasMore(false); // Stop trying to fetch more if there's an error
            } finally {
                setIsLoading(false);
                setIsFetchingMore(false);
            }
        };

        // Only fetch if there's more data and no error
        if (hasMore && !error) {
           fetchFeedback();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page]);


    const lastItemRef = useCallback(node => {
        if (isLoading || isFetchingMore) return;
        if (observer.current) observer.current.disconnect();
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && hasMore) {
                setPage(prevPage => prevPage + 1);
            }
        });
        if (node) observer.current.observe(node);
    }, [isLoading, isFetchingMore, hasMore]);
    
    // --- CORRECTED ERROR HANDLING BLOCK ---
    // This now shows a relevant error message within the original Card layout.
    if (error && items.length === 0) {
        return (
            <Card>
                <SectionTitle className={"mb-6"} icon={<MessageSquare className="h-6 w-6 text-indigo-500" />} title="Submission History" />
                <div className="flex flex-col items-center justify-center text-center p-8">
                    <AlertTriangle className="h-12 w-12 text-red-500 mb-4" />
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Could not load feedback history</h3>
                    <p className="text-sm text-red-500 dark:text-red-400 mt-1">{error}</p>
                </div>
            </Card>
        )
    }

    return (
        <div>
            <Card>
                <SectionTitle className={"mb-6"} icon={<MessageSquare className="h-6 w-6 text-indigo-500" />} title="Submission History" />
                
                {isLoading && items.length === 0 ? (
                    <ul className="space-y-4">
                        <FeedbackSkeleton />
                        <FeedbackSkeleton />
                        <FeedbackSkeleton />
                    </ul>
                ) : (
                    <ul className="space-y-4">
                        {items.map((item, index) => (
                            <li
                                ref={items.length === index + 1 ? lastItemRef : null}
                                key={`${item.id}-${index}`}
                                className={`
                                    bg-gray-50 dark:bg-gray-800/60 p-4 rounded-lg 
                                    transition-colors hover:bg-gray-100 dark:hover:bg-gray-700/80
                                    border-l-2 ${getSentimentColor(item.sentiment)}
                                `}
                            >
                                <div className="flex justify-between items-center mb-1">
                                    <h4 className="text-sm font-semibold text-gray-800 dark:text-gray-200">{item.subject}</h4>
                                    <span className="text-sm text-gray-500 dark:text-gray-400">{item.date}</span>
                                </div>
                                <p className="text-sm text-gray-600 dark:text-gray-300">{item.content}</p>
                            </li>
                        ))}
                    </ul>
                )}
                
                {isFetchingMore && (
                    <div className="flex justify-center items-center pt-6">
                        <Loader2 className="h-6 w-6 text-gray-500 animate-spin" />
                    </div>
                )}
            </Card>
        </div>
    );
};
````

## File: package.json
````json
{
  "name": "upskill-app",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev --turbopack",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "lucide-react": "^0.539.0",
    "next": "15.4.6",
    "next-themes": "^0.4.6",
    "react": "19.1.0",
    "react-dom": "19.1.0",
    "recharts": "^3.1.2"
  },
  "devDependencies": {
    "autoprefixer": "^10.4.21",
    "postcss": "^8.5.6",
    "tailwindcss": "^3.4.17"
  }
}
````

## File: components/Helper.js
````javascript
const STYLES = {
    sectionTitleContainer: `
        flex
        items-center
        mb-4
    `,
    sectionTitleHeader2: `
        text-xl 
        font-bold 
        text-gray-800 dark:text-gray-200 
        ml-3
    `,
    cardContainer: `
        bg-white/50 dark:bg-gray-800/50
        backdrop-blur-lg
        rounded-xl 
        border border-white/20
        shadow-lg
        transition-all duration-300
    `
}

export const SectionTitle = ({ icon, title, className}) => (
    <div className={`${STYLES.sectionTitleContainer} ${className}`}>
        {icon}
        <h2 className={STYLES.sectionTitleHeader2}>{title}</h2>
    </div>
);

export const Card = ({ children, className = '' }) => (
    <div className={`${STYLES.cardContainer} ${className}`}>
        <div className="p-6">{children}</div>
    </div>
);
````

## File: components/Leaderboard.js
````javascript
"use client"

import React, { useState, useEffect } from 'react'; // Import hooks
import { Trophy, Award, AlertTriangle } from 'lucide-react';
import { Card, SectionTitle } from "./Helper";

// --- Style Definitions (can remain unchanged) ---
const LEADERBOARD_STYLES = {
    podiumGrid: `
                grid 
                grid-cols-1 md:grid-cols-3 
                gap-4 items-end
                `,
    cardBase: `
                border-2 
                text-center 
                p-4
                `,
    card2nd: `
            border-gray-300 
            dark:border-gray-600
            `,
    card1st: `
                border-yellow-400 dark:border-yellow-500 
                p-6 
                transform md:scale-110 
                shadow-lg
                `,
    card3rd: `
                border-yellow-600/50 dark:border-yellow-800/80
                `,
    podiumTrophy1st: `
                        h-12 w-12 
                        text-yellow-400 
                        mx-auto 
                        mb-2
                        `,
    podiumTrophy2nd3rd: `
                        h-10 w-10 
                        mx-auto mb-2
                        `,
    podiumName1st: `
                    font-bold 
                    text-xl 
                    text-gray-800 
                    dark:text-white
                    `,
    podiumName2nd3rd: `
                        font-bold text-lg 
                        text-gray-800 dark:text-white`,
    podiumPlace1st: `
                    font-semibold 
                    text-yellow-500 dark:text-yellow-400
                    `,
    podiumPlace2nd: `
                    font-semibold 
                    text-gray-500 dark:text-gray-400
                    `,
    podiumPlace3rd: `
                    font-semibold 
                    text-yellow-700 dark:text-yellow-800
                    `,
    podiumPoints1st: `
                    text-3xl 
                    font-bold 
                    text-indigo-500 dark:text-indigo-400 mt-2
                    `,
    podiumPoints2nd3rd: `
                        text-2xl 
                        font-bold 
                        text-indigo-500 
                        dark:text-indigo-400 
                        mt-2`,
    table: `
            w-full 
            text-sm 
            text-left 
            text-gray-500 dark:text-gray-400
            `,
    tableHead: `
                text-xs 
                text-gray-700 
                uppercase 
                bg-gray-50 dark:bg-gray-700 
                dark:text-gray-400
                `,
    tableHeadCell: `
                    px-6 
                    py-3
                    `,
    tableRow: `
                bg-white 
                border-b 
                dark:bg-gray-800 
                dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600
                `,
    tableCell: `px-6 py-4`,
    tableCellRank: `
                    text-gray-500 
                    dark:text-gray-400 
                    font-bold 
                    w-6 
                    text-center`,
    tableCellUser: `
                    font-medium 
                    text-gray-900 
                    whitespace-nowrap 
                    dark:text-white
                    `,
    tableCellPoints: `
                    text-right 
                    font-bold 
                    text-gray-800 
                    dark:text-white
                    `,
};

// --- NEW: Skeleton Components for Loading State ---

const PodiumSkeleton = () => (
    <div className={LEADERBOARD_STYLES.podiumGrid}>
        {/* 2nd Place Skeleton */}
        <div className="md:order-1 animate-pulse">
            <Card className={`${LEADERBOARD_STYLES.cardBase} ${LEADERBOARD_STYLES.card2nd}`}>
                <div className="h-10 w-10 mx-auto mb-2 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
                <div className="h-6 w-3/4 mx-auto bg-gray-300 dark:bg-gray-700 rounded"></div>
                <div className="h-4 w-1/2 mx-auto mt-2 bg-gray-300 dark:bg-gray-700 rounded"></div>
                <div className="h-8 w-1/3 mx-auto mt-2 bg-gray-300 dark:bg-gray-700 rounded"></div>
            </Card>
        </div>
        {/* 1st Place Skeleton */}
        <div className="md:order-2 relative z-10 animate-pulse">
            <Card className={`${LEADERBOARD_STYLES.cardBase} ${LEADERBOARD_STYLES.card1st}`}>
                <div className="h-12 w-12 mx-auto mb-2 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
                <div className="h-7 w-3/4 mx-auto bg-gray-300 dark:bg-gray-700 rounded"></div>
                <div className="h-5 w-1/2 mx-auto mt-2 bg-gray-300 dark:bg-gray-700 rounded"></div>
                <div className="h-9 w-1/3 mx-auto mt-2 bg-gray-300 dark:bg-gray-700 rounded"></div>
            </Card>
        </div>
        {/* 3rd Place Skeleton */}
        <div className="md:order-3 animate-pulse">
            <Card className={`${LEADERBOARD_STYLES.cardBase} ${LEADERBOARD_STYLES.card3rd}`}>
                <div className="h-10 w-10 mx-auto mb-2 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
                <div className="h-6 w-3/4 mx-auto bg-gray-300 dark:bg-gray-700 rounded"></div>
                <div className="h-4 w-1/2 mx-auto mt-2 bg-gray-300 dark:bg-gray-700 rounded"></div>
                <div className="h-8 w-1/3 mx-auto mt-2 bg-gray-300 dark:bg-gray-700 rounded"></div>
            </Card>
        </div>
    </div>
);

const LadderSkeleton = () => (
    <Card>
        <div className="overflow-x-auto animate-pulse">
            <div className="space-y-4 p-2">
                {[...Array(5)].map((_, i) => (
                    <div key={i} className="flex items-center space-x-4">
                        <div className="h-6 w-6 bg-gray-300 dark:bg-gray-700 rounded"></div>
                        <div className="h-6 flex-1 bg-gray-300 dark:bg-gray-700 rounded"></div>
                        <div className="h-6 w-1/4 bg-gray-300 dark:bg-gray-700 rounded"></div>
                    </div>
                ))}
            </div>
        </div>
    </Card>
);


// --- Main Leaderboard Component ---
export const Leaderboard = () => {
    const [leaderboard, setLeaderboard] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchLeaderboard = async () => {
            try {
                // Using a small delay to make the skeleton visible
                await new Promise(resolve => setTimeout(resolve, 1000));
                const response = await fetch('http://localhost:9292/leaderboard');
                if (!response.ok) {
                    throw new Error(`Server responded with status: ${response.status}`);
                }
                const data = await response.json();
                setLeaderboard(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchLeaderboard();
    }, []);

    const getTrophyIcon = (rank) => {
        if (rank === 1) return <Trophy className="h-6 w-6 text-yellow-400" />;
        if (rank === 2) return <Trophy className="h-6 w-6 text-gray-400" />;
        if (rank === 3) return <Trophy className="h-6 w-6 text-yellow-600" />;
        return <span className={LEADERBOARD_STYLES.tableCellRank}>{rank}</span>;
    };

    if (loading) {
        return (
            <div className="space-y-12">
                <div>
                    <SectionTitle icon={<Award className="h-6 w-6 text-indigo-500" />} title="COMMS Podium Finishers" />
                    <PodiumSkeleton />
                </div>
                <div>
                    <SectionTitle icon={<Trophy className="h-6 w-6 text-indigo-500" />} title="Ladder" />
                    <LadderSkeleton />
                </div>
            </div>
        );
    }
    
    if (error) {
        return (
            <div className="flex flex-col items-center justify-center text-center p-8 bg-red-50 dark:bg-red-900/20 rounded-lg">
                <AlertTriangle className="h-12 w-12 text-red-500 mb-4" />
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Could not load the leaderboard</h3>
                <p className="text-sm text-red-500 dark:text-red-400 mt-1">{error}</p>
            </div>
        );
    }

    const topThree = leaderboard.slice(0, 3);
    const restOfLeaderboard = leaderboard.slice(3);

    return (
        <div className="space-y-12">
            {/* --- Top 3 Podium Section --- */}
            <div>
                <SectionTitle icon={<Award className="h-6 w-6 text-indigo-500" />} title="COMMS Podium Finishers" />
                <div className={LEADERBOARD_STYLES.podiumGrid}>
                    {/* 2nd Place */}
                    <div className="md:order-1">
                        {topThree[1] && (
                            <Card className={`${LEADERBOARD_STYLES.cardBase} ${LEADERBOARD_STYLES.card2nd}`}>
                                <Trophy className={`${LEADERBOARD_STYLES.podiumTrophy2nd3rd} text-gray-400`} />
                                <h3 className={LEADERBOARD_STYLES.podiumName2nd3rd}>{topThree[1].name}</h3>
                                <p className={LEADERBOARD_STYLES.podiumPlace2nd}>2nd Place</p>
                                <p className={LEADERBOARD_STYLES.podiumPoints2nd3rd}>{topThree[1].points.toLocaleString()} PTS</p>
                            </Card>
                        )}
                    </div>

                    {/* 1st Place */}
                    <div className="md:order-2 relative z-10">
                         {topThree[0] && (
                            <Card className={`${LEADERBOARD_STYLES.cardBase} ${LEADERBOARD_STYLES.card1st}`}>
                                <Trophy className={LEADERBOARD_STYLES.podiumTrophy1st} />
                                <h3 className={LEADERBOARD_STYLES.podiumName1st}>{topThree[0].name}</h3>
                                <p className={LEADERBOARD_STYLES.podiumPlace1st}>1st Place</p>
                                <p className={LEADERBOARD_STYLES.podiumPoints1st}>{topThree[0].points.toLocaleString()} PTS</p>
                            </Card>
                        )}
                    </div>

                    {/* 3rd Place */}
                    <div className="md:order-3">
                        {topThree[2] && (
                             <Card className={`${LEADERBOARD_STYLES.cardBase} ${LEADERBOARD_STYLES.card3rd}`}>
                                <Trophy className={`${LEADERBOARD_STYLES.podiumTrophy2nd3rd} text-yellow-700 dark:text-yellow-800`} />
                                <h3 className={LEADERBOARD_STYLES.podiumName2nd3rd}>{topThree[2].name}</h3>
                                <p className={LEADERBOARD_STYLES.podiumPlace3rd}>3rd Place</p>
                                <p className={LEADERBOARD_STYLES.podiumPoints2nd3rd}>{topThree[2].points.toLocaleString()} PTS</p>
                            </Card>
                        )}
                    </div>
                </div>
            </div>

            {/* --- Full Leaderboard Table (for the rest) --- */}
            <div>
                <SectionTitle icon={<Trophy className="h-6 w-6 text-indigo-500" />} title="Ladder" />
                <div className="hidden md:block">
                    <Card>
                        <div className="overflow-x-auto">
                            <table className={LEADERBOARD_STYLES.table}>
                                <thead className={LEADERBOARD_STYLES.tableHead}>
                                    <tr>
                                        <th scope="col" className={LEADERBOARD_STYLES.tableHeadCell}>Rank</th>
                                        <th scope="col" className={LEADERBOARD_STYLES.tableHeadCell}>User</th>
                                        <th scope="col" className={LEADERBOARD_STYLES.tableHeadCell}>Badges</th>
                                        <th scope="col" className={`${LEADERBOARD_STYLES.tableHeadCell} text-right`}>Points</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {restOfLeaderboard.map((user, index) => (
                                        <tr key={user.id} className={LEADERBOARD_STYLES.tableRow}>
                                            <td className={LEADERBOARD_STYLES.tableCell}>{getTrophyIcon(index + 4)}</td>
                                            <th scope="row" className={`${LEADERBOARD_STYLES.tableCell} ${LEADERBOARD_STYLES.tableCellUser}`}>{user.name}</th>
                                            <td className={LEADERBOARD_STYLES.tableCell}><div className="flex space-x-2">{user.badges.map((badge, i) => <span key={i} className="text-xl">{badge}</span>)}</div></td>
                                            <td className={`${LEADERBOARD_STYLES.tableCell} ${LEADERBOARD_STYLES.tableCellPoints}`}>{user.points.toLocaleString()}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
};
````

## File: mock/mock_data.js
````javascript
import { Award, ThumbsUp, ListChecks, BookOpen, Calendar, MessageSquare } from 'lucide-react';

// --- LEADERBOARD DATA ---
export const MOCK_LEADERBOARD = [
    { id: 1, name: 'Alex Rivera', points: 4250, badges: ['🚀', '🎯', '🔥'] },
    { id: 2, name: 'Casey Jordan', points: 3980, badges: ['💡', '🎯'] },
    { id: 3, name: 'Taylor Morgan', points: 3710, badges: ['🤝'] },
    { id: 4, name: 'Jordan Smith', points: 3500, badges: ['🚀'] },
    { id: 5, name: 'Jamie Lee', points: 3200, badges: ['💡', '🤝'] },
    { id: 6, name: 'Morgan Quinn', points: 2950, badges: ['🎯'] },
    { id: 7, name: 'Riley Chen', points: 2810, badges: ['🔥', '🤝'] },
    { id: 8, name: 'Devin Patel', points: 2650, badges: ['💡'] },
    { id: 9, name: 'Skyler Kim', points: 2400, badges: ['🚀', '🎯'] },
    { id: 10, name: 'Avery Garcia', points: 2230, badges: ['🤝'] },
    { id: 11, name: 'Parker Williams', points: 2100, badges: ['💡'] },
    { id: 12, name: 'Cameron Ito', points: 1980, badges: ['🔥'] },
    { id: 13, name: 'Rowan Davis', points: 1850, badges: ['🚀'] },
    { id: 14, name: 'Kai Martinez', points: 1720, badges: ['🎯', '🤝'] },
    { id: 15, name: 'Logan Rodriguez', points: 1600, badges: ['💡'] },
    { id: 16, name: 'Blake Nguyen', points: 1450, badges: [] },
    { id: 17, name: 'Drew Wilson', points: 1300, badges: ['🤝'] },
    { id: 18, name: 'Hayden Brown', points: 1150, badges: ['🚀'] },
    { id: 19, name: 'Emerson Taylor', points: 980, badges: ['💡'] },
    { id: 20, name: 'Jesse Miller', points: 850, badges: [] },
];

// --- QUESTS DATA ---
export const MOCK_QUESTS = [
    { id: 1, title: 'Adaptability Ace', description: 'Complete the "Handling Change" module and score 90% on the quiz.', points: 150, progress: 100, completed: true },
    { id: 2, title: 'Communication Pro', description: 'Provide constructive feedback on 5 different project documents.', points: 200, progress: 60, completed: false },
    { id: 3, title: 'Leadership Leap', description: 'Lead a project planning session and submit the meeting notes.', points: 250, progress: 0, completed: false },
    { id: 4, title: 'Teamwork Titan', description: 'Successfully complete a paired programming challenge.', points: 100, progress: 100, completed: true },
];

// --- DASHBOARD DATA ---

export const MOCK_ACTIVITY_STREAM = [
    { id: 1, user: 'Casey Jordan', action: 'completed the quest "Teamwork Titan".', time: '5m ago', icon: <Award className="h-5 w-5 text-yellow-500" /> },
    { id: 2, user: 'Alex Rivera', action: 'provided feedback on the "Q3 Marketing Plan".', time: '2h ago', icon: <ThumbsUp className="h-5 w-5 text-blue-500" /> },
    { id: 3, user: 'Taylor Morgan', action: 'updated the status of task "Deploy Staging Server".', time: '1d ago', icon: <ListChecks className="h-5 w-5 text-green-500" /> },
    { id: 4, user: 'Jamie Lee', action: 'read the article "Leading Without Authority".', time: '1d ago', icon: <BookOpen className="h-5 w-5 text-purple-500" /> },
    { id: 5, user: 'Jordan Smith', action: 'RSVP\'d to "Q3 Project Kickoff".', time: '2d ago', icon: <Calendar className="h-5 w-5 text-red-500" /> },
    { id: 6, user: 'Riley Chen', action: 'commented on the "Weekly Sync" notes.', time: '2d ago', icon: <MessageSquare className="h-5 w-5 text-teal-500" /> },
    { id: 7, user: 'Devin Patel', action: 'completed the quest "Communication Champion".', time: '2d ago', icon: <Award className="h-5 w-5 text-yellow-500" /> },
    { id: 8, user: 'Skyler Kim', action: 'provided feedback on the "New Feature" design.', time: '3d ago', icon: <ThumbsUp className="h-5 w-5 text-blue-500" /> },
    { id: 9, user: 'Alex Rivera', action: 'unlocked the "Feedback Pro" badge.', time: '3d ago', icon: <Award className="h-5 w-5 text-yellow-500" /> },
    { id: 10, user: 'Morgan Quinn', action: 'read the article "The Art of Constructive Feedback".', time: '3d ago', icon: <BookOpen className="h-5 w-5 text-purple-500" /> },
    { id: 11, user: 'Casey Jordan', action: 'created the meeting "Sprint 15 Planning".', time: '4d ago', icon: <Calendar className="h-5 w-5 text-red-500" /> },
    { id: 12, user: 'Avery Garcia', action: 'updated the status of task "Update Dependencies".', time: '4d ago', icon: <ListChecks className="h-5 w-5 text-green-500" /> },
    { id: 13, user: 'Taylor Morgan', action: 'commented on the "Q3 Project Kickoff" agenda.', time: '5d ago', icon: <MessageSquare className="h-5 w-5 text-teal-500" /> },
    { id: 14, user: 'Jamie Lee', action: 'completed the quiz for "Handling Change".', time: '5d ago', icon: <ListChecks className="h-5 w-5 text-green-500" /> },
    { id: 15, user: 'Jordan Smith', action: 'provided feedback on the "API Documentation".', time: '6d ago', icon: <ThumbsUp className="h-5 w-5 text-blue-500" /> },
];

export const MOCK_AGENDA_ITEMS = [
    { id: 1, type: 'article', title: 'The Art of Giving Constructive Feedback', category: 'Communication' },
    { id: 2, type: 'meeting', title: 'Q3 Project Kickoff', date: '2025-08-16' },
    { id: 3, type: 'article', title: 'Leading Without Authority', category: 'Leadership' },
];

export const MOCK_MEETINGS = [
    { id: 1, title: 'Q3 Project Kickoff', date: '2025-08-16', status: 'Upcoming' },
    { id: 2, title: 'Weekly Sync: Sprint 14', date: '2025-08-12', status: 'Complete' },
    { id: 3, title: 'Design Review: New Feature', date: '2025-08-11', status: 'Complete' },
    { id: 4, title: 'Q3 Project Kickoff', date: '2025-08-16', status: 'Upcoming' },
    { id: 5, title: 'Weekly Sync: Sprint 14', date: '2025-08-12', status: 'Complete' },
    { id: 6, title: 'Design Review: New Feature', date: '2025-08-11', status: 'Complete' },
    { id: 7, title: 'Q3 Project Kickoff', date: '2025-08-16', status: 'Upcoming' },
    { id: 8, title: 'Weekly Sync: Sprint 14', date: '2025-08-12', status: 'Complete' },
    { id: 9, title: 'Design Review: New Feature', date: '2025-08-11', status: 'Complete' },
];

export const MOCK_TEAM_ENGAGEMENT_DATA = [
    { category: 'Quests', value: 75, fullMark: 100 },
    { category: 'Feedback', value: 85, fullMark: 100 },
    { category: 'Meetings', value: 90, fullMark: 100 },
    { category: 'Knowledge', value: 60, fullMark: 100 },
    { category: 'Skills', value: 70, fullMark: 100 },
];

export const MOCK_PERSONAL_ENGAGEMENT_DATA = [
    { category: 'Quests', value: 95, fullMark: 100 },
    { category: 'Feedback', value: 60, fullMark: 100 },
    { category: 'Meetings', value: 100, fullMark: 100 },
    { category: 'Knowledge', value: 80, fullMark: 100 },
    { category: 'Skills', value: 45, fullMark: 100 },
];

export const FEEDBACK_TRENDS_DATA = [
    { name: 'Communication', value: 15 },
    { name: 'Leadership', value: 25 },
    { name: 'Tools', value: 18 },
    { name: 'Workload', value: 12 },
];

export const TRENDS_COLORS = ['#818cf8', '#a78bfa', '#c084fc', '#f472b6']; // Indigo, Purple, Fuchsia, Pink

// For the new Topic dropdown in the form
export const MOCK_FEEDBACK_TOPICS = [
    'General',
    'Q3 Marketing Plan',
    'New Feature Design',
    'API Documentation',
    'Onboarding Process',
    'Weekly Sync Meeting',
    'Project Alpha Performance',
    'Team Offsite Event',
];

// For the Sentiment Analysis chart
export const SENTIMENT_DATA = [
    { name: 'Positive', value: 400 },
    { name: 'Neutral', value: 120 },
    { name: 'Negative', value: 80 },
];
export const SENTIMENT_COLORS = ['#22c55e', '#f59e0b', '#ef4444'];

// For the new scrollable history list
export const MOCK_FEEDBACK_HISTORY = [
    { id: 1, subject: 'Q3 Marketing Plan', content: 'The plan is well-structured, but the timeline seems a bit too aggressive. Consider adding a buffer week.', date: '2025-08-15', sentiment: 'Neutral' },
    { id: 2, subject: 'New Feature Design', content: 'I love the new UI! It\'s much more intuitive than the previous version. Great work!', date: '2025-08-14', sentiment: 'Positive' },
    { id: 3, subject: 'API Documentation', content: 'The endpoint for user authentication is missing examples. It was difficult to understand the required request body.', date: '2025-08-12', sentiment: 'Negative' },
    { id: 4, subject: 'Onboarding Process', content: 'The new hire checklist is very helpful, but links to the HR system are broken.', date: '2025-08-11', sentiment: 'Negative' },
    { id: 5, subject: 'Weekly Sync Meeting', content: 'These meetings are productive. The agenda is clear and we stick to the topics. No changes needed.', date: '2025-08-08', sentiment: 'Positive' },
    { id: 6, subject: 'Project Alpha Performance', content: 'The application is running slower this week. We should investigate potential memory leaks.', date: '2025-08-07', sentiment: 'Neutral' },
    { id: 7, subject: 'Team Offsite Event', content: 'The proposed venue looks great and the activities seem fun. I\'m looking forward to it.', date: '2025-08-05', sentiment: 'Positive' },
];

// --- NEW: Data for the Quick Insights component ---
export const MOCK_FEEDBACK_STATS = {
    totalSubmissions: 600,
    responseRate: 82,
    positiveTrend: 5, // in percentage
};
````

## File: app/page.js
````javascript
"use client"

import React, { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { Menu, X, Sun, Moon } from 'lucide-react';
import Image from 'next/image';

import { Dashboard } from "../components/Dashboard";
import { Feedback } from "../components/Feedback";
import { Leaderboard } from "../components/Leaderboard";
import { Quests } from "../components/Quests";

// --- Style Definitions ---

const APP_STYLES = {
    appContainer: `
        min-h-screen 
        bg-gray-100 dark:bg-gray-900
    `,
    nav: `
        bg-white/80 dark:bg-gray-800/80
        backdrop-blur-sm
        border-b 
        border-gray-200 dark:border-gray-700
        sticky top-0
        z-50
        transition-all duration-300 ease-in-out
    `,
    navContainer: `
        mx-auto 
        max-w-7xl 
        px-4 sm:px-6 lg:px-8
    `,
    navFlexContainer: `
        flex 
        items-center 
        justify-between
        h-16
        transition-all duration-300 ease-in-out
    `,
    navFlexContainerScrolled: `
        h-[44px]
    `,
    logoAndLinksContainer: `
        flex 
        items-center
    `,
    logoContainer: `
        flex-shrink-0 
        text-gray-900 dark:text-white 
        font-bold 
        text-xl 
        flex 
        items-center
    `,
    logoImage: `
        mr-2
    `,
    logoText: `
        transition-all duration-300 ease-in-out
        whitespace-nowrap
        overflow-hidden
    `,
    logoTextScrolled: `
        w-0 opacity-0
    `,
    desktopNavWrapper: `
        hidden 
        md:block
    `,
    desktopNavLinksContainer: `
        ml-10 
        flex 
        items-baseline 
        space-x-4
    `,
    navActionsContainer: `
        flex 
        items-center
    `,
    themeToggleButton: `
        p-2 
        rounded-full 
        text-gray-500 dark:text-gray-400 
        hover:bg-gray-100 dark:hover:bg-gray-700 
        focus:outline-none 
        focus:ring-2 
        focus:ring-indigo-500 dark:focus:ring-white 
        focus:ring-offset-2 dark:focus:ring-offset-gray-800
    `,
    hamburgerMenuWrapper: `
        ml-2 
        md:hidden
    `,
    hamburgerButton: `
        inline-flex 
        items-center 
        justify-center 
        p-2 
        rounded-md 
        text-gray-500 dark:text-gray-400 
        hover:bg-gray-100 dark:hover:bg-gray-700 
        focus:outline-none
    `,
    hamburgerIcon: `
        block 
        h-6 w-6
    `,
    mobileMenuContainer: `
        md:hidden 
        border-t 
        border-gray-200 dark:border-gray-700
    `,
    mobileMenuLinksContainer: `
        px-2 pt-2 pb-3 
        space-y-1 
        sm:px-3
    `,
    mainContent: `
        mx-auto 
        max-w-7xl 
        px-4 py-6 
        sm:px-6 lg:px-8
    `
};

const NAVLINK_STYLES = {
    // Default (unscrolled) styles
    baseDefault: `
        border-b-2 
        px-1 pt-1 
        text-sm 
        font-medium 
        transition-colors 
        duration-150 
        ease-in-out
    `,
    activeDefault: `
        border-blue-700 dark:border-blue-700 
        text-gray-900 dark:text-gray-100
    `,
    inactiveDefault: `
        border-transparent 
        text-gray-500 dark:text-gray-400 
        hover:border-gray-300 dark:hover:border-gray-600 
        hover:text-gray-700 dark:hover:text-gray-300
    `,
    // Scrolled styles
    baseScrolled: `
        relative
        px-3 py-2
        text-sm 
        font-medium 
        transition-colors 
        duration-150 
        ease-in-out
    `,
    activeScrolled: `
        text-gray-900 dark:text-gray-100
    `,
    inactiveScrolled: `
        text-gray-500 dark:text-gray-400 
        hover:text-gray-700 dark:hover:text-gray-300
    `,
    // Style for the dot itself
    activeDot: `
      absolute left-0 top-1/2 -translate-y-1/2 
      h-1.5 w-1.5 
      bg-blue-700 rounded-full 
      transition-opacity duration-300
    `
};

const MOBILE_NAVLINK_STYLES = {
    base: `
        block 
        w-full 
        text-left 
        px-4 py-2 
        text-base 
        font-medium 
        rounded-md
    `,
    active: `
        bg-indigo-50 dark:bg-gray-700 
        text-indigo-700 dark:text-white
    `,
    inactive: `
        text-gray-600 dark:text-gray-300 
        hover:bg-gray-50 dark:hover:bg-gray-700
    `
};

// --- Main App Component ---

export default function App() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
    const [currentPage, setCurrentPage] = useState('dashboard');
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    // Effect to handle scroll detection
    useEffect(() => {
        const handleScroll = () => {
            const isScrolled = window.scrollY > 50;
            if (isScrolled !== scrolled) {
                setScrolled(isScrolled);
            }
        };

        document.addEventListener('scroll', handleScroll);
        return () => {
            document.removeEventListener('scroll', handleScroll);
        };
    }, [scrolled]);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return null;
    }

    const NavLink = ({ pageName, children, scrolled }) => {
        const isActive = currentPage === pageName;

        const baseClass = scrolled ? NAVLINK_STYLES.baseScrolled : NAVLINK_STYLES.baseDefault;
        const activeClass = isActive 
            ? (scrolled ? NAVLINK_STYLES.activeScrolled : NAVLINK_STYLES.activeDefault) 
            : (scrolled ? NAVLINK_STYLES.inactiveScrolled : NAVLINK_STYLES.inactiveDefault);
        
        return (
            <button
                onClick={() => {
                    setCurrentPage(pageName);
                    setIsMenuOpen(false);
                }}
                className={`${baseClass} ${activeClass}`}
            >
                <span className={`${NAVLINK_STYLES.activeDot} ${isActive && scrolled ? 'opacity-100' : 'opacity-0'}`}></span>
                {children}
            </button>
        );
    };

    const MobileNavLink = ({ pageName, children }) => {
        const isActive = currentPage === pageName;
        const activeClass = isActive ? MOBILE_NAVLINK_STYLES.active : MOBILE_NAVLINK_STYLES.inactive;
        return (
            <button
                onClick={() => {
                    setCurrentPage(pageName);
                    setIsMenuOpen(false);
                }}
                className={`${MOBILE_NAVLINK_STYLES.base} ${activeClass}`}
            >
                {children}
            </button>
        );
    };

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
        <div className={APP_STYLES.appContainer}>
            {/* Navigation */}
            <nav className={APP_STYLES.nav}>
                <div className={APP_STYLES.navContainer}>
                    <div className={`${APP_STYLES.navFlexContainer} ${scrolled ? APP_STYLES.navFlexContainerScrolled : ''}`}>
                        <div className={APP_STYLES.logoAndLinksContainer}>
                            {/* Logo */}
                            <div className={APP_STYLES.logoContainer}>
                                <Image
                                    src="/rs2logo.png"
                                    alt="Upskill Logo"
                                    width={24}
                                    height={24}
                                    className={APP_STYLES.logoImage}
                                />
                                <span className={`${APP_STYLES.logoText} ${scrolled ? APP_STYLES.logoTextScrolled : ''}`}>
                                    Upskill
                                </span>
                            </div>
                            {/* Desktop Navigation Links */}
                            <div className={APP_STYLES.desktopNavWrapper}>
                                <div className={APP_STYLES.desktopNavLinksContainer}>
                                    <NavLink pageName="dashboard" scrolled={scrolled}>Dashboard</NavLink>
                                    <NavLink pageName="quests" scrolled={scrolled}>Quests</NavLink>
                                    <NavLink pageName="feedback" scrolled={scrolled}>Feedback</NavLink>
                                    <NavLink pageName="leaderboard" scrolled={scrolled}>Leaderboard</NavLink>
                                </div>
                            </div>
                        </div>
                        <div className={APP_STYLES.navActionsContainer}>
                            {/* Theme Toggle Button */}
                            <button
                                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                                className={APP_STYLES.themeToggleButton}
                            >
                                {theme === 'dark' ? (
                                    <Sun className="h-5 w-5" />
                                ) : (
                                    <Moon className="h-5 w-5" />
                                )}
                            </button>
                            {/* Hamburger Menu Button */}
                            <div className={APP_STYLES.hamburgerMenuWrapper}>
                                <button
                                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                                    className={APP_STYLES.hamburgerButton}
                                >
                                    <span className="sr-only">Open main menu</span>
                                    {isMenuOpen ? (
                                        <X className={APP_STYLES.hamburgerIcon} aria-hidden="true" />
                                    ) : (
                                        <Menu className={APP_STYLES.hamburgerIcon} aria-hidden="true" />
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Mobile Menu */}
                {isMenuOpen && (
                    <div className={APP_STYLES.mobileMenuContainer}>
                        <div className={APP_STYLES.mobileMenuLinksContainer}>
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
                <div className={APP_STYLES.mainContent}>
                    {renderPage()}
                </div>
            </main>
        </div>
    );
}
````

## File: components/Feedback.js
````javascript
"use client"
import React, { useState } from 'react';
import { ThumbsUp, Lightbulb } from 'lucide-react';

import { Card, SectionTitle } from "./Helper";
import { FeedbackHistory } from './feedback/FeedbackHistory';
import { MOCK_FEEDBACK_TOPICS } from '@/mock/mock_data';

// --- Style Definitions ---
const MAIN_STYLES = {
    formLabel: `
                block 
                mb-2 
                text-sm 
                font-medium 
                text-gray-900 
                dark:text-white
                `,
    formSelect: `
                block 
                w-full 
                px-4 
                py-3 
                text-sm 
                text-gray-900 
                dark:text-white 
                bg-gray-50 dark:bg-gray-700 
                rounded-lg 
                border border-gray-300 dark:border-gray-600 
                focus:ring-blue-500 dark:focus:ring-blue-500
                focus:border-blue-500 dark:focus:border-blue-500
                `,
    formTextArea: `
                block 
                px-4 
                py-3 
                w-full min-h-[200px] 
                text-sm text-gray-900 dark:text-white 
                bg-gray-50 dark:bg-gray-700 rounded-lg 
                border border-gray-300 dark:border-gray-600 
                focus:ring-blue-500 dark:focus:ring-blue-500 
                focus:border-blue-500 dark:focus:border-blue-500 
                dark:placeholder-gray-400
                `,
    formCheckBox: `
                w-4 h-4 
                text-blue-600 
                rounded 
                bg-gray-100 
                dark:bg-gray-700 b
                order-gray-300 
                dark:border-gray-600 dark:ring-offset-gray-800 
                focus:ring-2 focus:ring-blue-500 
                dark:focus:ring-blue-600`,
    formCheckBoxLabel: `
                ml-2 
                text-sm 
                font-medium 
                text-gray-900 
                dark:text-gray-300
                `,
    submitButton: `
                w-full 
                px-5 py-2.5 
                bg-blue-600 hover:bg-blue-700 
                focus:ring-4 focus:outline-none focus:ring-blue-300 
                dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 
                text-white font-medium text-sm text-center rounded-lg
                `,
};

// --- Merged Feedback Form & Tips Component ---
const FeedbackHub = () => {
    {/* // ^ Checkbox */}
    // const [isAnonymous, setIsAnonymous] = useState(false);
    const [topic, setTopic] = useState(MOCK_FEEDBACK_TOPICS[0]);

    const tips = [
        "Be specific: Provide concrete examples instead of vague statements.",
        "Focus on behavior, not personality. Describe the action and its impact.",
        "Offer solutions: If you identify a problem, suggest a potential improvement.",
        "Be timely: Provide feedback as soon as possible after the event.",
        "Keep it constructive: The goal is to help and improve, not to criticize."
    ];

    return (
        <div>
            <SectionTitle icon={<ThumbsUp className="h-6 w-6 text-indigo-500" />} title="Provide Feedback" />
            <Card>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* // ! Left Side: FORM FEEBACK BLOCK */}
                    <form className="flex flex-col gap-6" onSubmit={(e) => e.preventDefault()}>
                        {/* // ^ Feeback topic */}
                        <div className="">
                            <label htmlFor="feedback-topic" className={MAIN_STYLES.formLabel}>Topic</label>
                            <select
                                id="feedback-topic"
                                value={topic}
                                onChange={(e) => setTopic(e.target.value)}
                                className={MAIN_STYLES.formSelect}
                            >
                                {MOCK_FEEDBACK_TOPICS.map(t => <option key={t} value={t}>{t}</option>)}
                            </select>
                        </div>
                        {/* // ^ Textarea */}
                        <div className="flex-grow">
                            <label htmlFor="feedback-text" className={MAIN_STYLES.formLabel}>What do you think?</label>
                            <textarea
                                id="feedback-text"
                                className={MAIN_STYLES.formTextArea}
                                placeholder="Provide constructive feedback..."
                            ></textarea>
                        </div>
                        {/* // ^ Checkbox */}
                        {/* <div className="flex items-center mb-4">
                            <input
                                id="anonymous-checkbox"
                                type="checkbox" checked={isAnonymous}
                                onChange={() => setIsAnonymous(!isAnonymous)}
                                className={MAIN_STYLES.formCheckBox}
                            />
                            <label htmlFor="anonymous-checkbox" className={MAIN_STYLES.formCheckBoxLabel}>Submit Anonymously</label>
                        </div> */}
                        {/* // ^ Submit button */}
                        <button type="submit" className={MAIN_STYLES.submitButton}>Submit Feedback</button>
                    </form>

                    {/* Right Side: Tips */}
                    <div className="flex flex-col">
                        <h3 className="flex items-center text-lg font-semibold text-gray-900 dark:text-white mb-4">
                            <Lightbulb className="h-6 w-6 text-indigo-500 mr-3" />
                            Tips for Effective Feedback
                        </h3>
                        <ul className="space-y-4">
                            {tips.map((tip, index) => (
                                <li key={index} className="flex items-start text-sm text-gray-600 dark:text-gray-300">
                                    <span className="ml-2 mt-1 mr-5 flex-shrink-0 h-2 w-2 rounded-full bg-indigo-400"></span>
                                    {tip}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </Card>
        </div>
    );
};


// --- Main Feedback Component ---
export const Feedback = () => {
    return (
        <div className="space-y-8">
            {/* --- Top Section: Merged Hub --- */}
            <FeedbackHub />

            {/* --- Bottom Section: Full-Width History --- */}
            <div>
                <FeedbackHistory />
            </div>
        </div>
    );
};
````

## File: components/Dashboard.js
````javascript
"use client";
import {
    RadarChart, PolarGrid, PolarAngleAxis, Radar,
    Tooltip, ResponsiveContainer
} from 'recharts';
import {
    Activity, Users, User, Calendar, BookOpen, NotebookText
} from 'lucide-react';
import { useTheme } from 'next-themes';
import React from 'react';

import { Card, SectionTitle } from "./Helper";

import {
    MOCK_ACTIVITY_STREAM,
    MOCK_AGENDA_ITEMS,
    MOCK_MEETINGS,
    MOCK_TEAM_ENGAGEMENT_DATA,
    MOCK_PERSONAL_ENGAGEMENT_DATA
} from "../mock/mock_data";


const DASHBOARD_STYLES = {
    agendaTimeline: `
        relative 
        border-l 
        border-gray-200 dark:border-gray-700 
        ml-3
    `,
    agendaIconWrapperBase: `
        absolute 
        flex items-center justify-center 
        w-6 h-6 
        rounded-full 
        -left-3 
    `,
    agendaIconWrapperArticle: `
        bg-purple-200 dark:bg-purple-900
    `,
    agendaIconWrapperMeeting: `
        bg-blue-200 dark:bg-blue-900
    `,
    agendaIconArticle: `
        w-3 h-3 text-purple-600 dark:text-purple-300
    `,
    agendaIconMeeting: `
        w-3 h-3 text-blue-600 dark:text-blue-300
    `,
    agendaCard: `
        p-4 
        bg-gray-50 dark:bg-gray-700/50 
        rounded-lg 
        border border-gray-200 dark:border-gray-600 
        shadow-sm 
        group 
        hover:bg-indigo-50 dark:hover:bg-gray-700 
        transition-all 
        cursor-pointer
    `,
    agendaDetails: `
        text-sm 
        font-normal 
        text-gray-500 dark:text-gray-400 
        mb-1
    `,
    agendaTitle: `
        text-sm 
        font-semibold 
        text-gray-900 dark:text-white 
        group-hover:text-indigo-600 dark:group-hover:text-indigo-400 
        transition-colors
    `,
    agendaNotesButton: `
        flex items-center justify-center 
        h-8 w-8 
        rounded-full 
        hover:bg-indigo-100 dark:hover:bg-indigo-900/30 
        transition-colors
    `,
    agendaNotesIcon: `
        h-5 w-5 
        text-indigo-500 dark:text-indigo-400
    `,
    // --- MANUAL CSS CLASS APPLIED HERE ---
    // We are now using our own 'no-scrollbar' class from globals.css
    cardScrollableContent: `
        flex-grow 
        overflow-y-auto 
        no-scrollbar
        max-h-[350px]
    `,
    activityListItem: `
        flex items-start 
        p-3 
        rounded-lg
        transition-colors
        hover:bg-gray-500/10
    `,
    activityUser: `
        font-bold 
        text-gray-900 dark:text-white
    `,
    activityTime: `
        text-xs 
        text-gray-500 dark:text-gray-400 
        mt-0.5
    `,
    meetingsListItem: `
        flex items-center justify-between 
        p-3 
        rounded-lg 
        transition-colors
        hover:bg-gray-500/10
    `,
    meetingsStatusBase: `
        text-xs 
        font-semibold 
        mr-4 px-2 py-1 
        rounded-full
    `,
    meetingsStatusUpcoming: `
        bg-blue-100 text-blue-800 
        dark:bg-blue-900 dark:text-blue-200
    `,
    meetingsStatusRecent: `
        bg-green-100 text-green-800 
        dark:bg-green-900 dark:text-green-200
    `,
    meetingsTitle: `
        font-semibold 
        text-gray-800 dark:text-white
    `,
    meetingsDate: `
        text-xs 
        text-gray-500 dark:text-gray-400
    `,
};


// --- Chart Components ---

const EngagementChart = ({ data, title, icon, color }) => {
    const { theme } = useTheme();
    const tickColor = theme === 'dark' ? '#9ca3af' : '#6b7280';
    return (
        <Card>
            <SectionTitle icon={icon} title={title} />
            <ResponsiveContainer width="100%" height={300}>
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
                    <PolarGrid stroke={theme === 'dark' ? '#374151' : '#e5e7eb'} />
                    <PolarAngleAxis dataKey="category" stroke={tickColor} fontSize={12} />
                    <Radar name="Engagement" dataKey="value" stroke={color} fill={color} fillOpacity={0.6} />
                    <Tooltip
                        contentStyle={{
                            backgroundColor: theme === 'dark' ? 'rgba(31, 41, 55, 0.8)' : 'rgba(255, 255, 255, 0.8)',
                            backdropFilter: 'blur(4px)',
                            borderRadius: '0.5rem',
                            border: '1px solid',
                            borderColor: theme === 'dark' ? '#374151' : '#e5e7eb'
                        }}
                        itemStyle={{ color: theme === 'dark' ? '#e5e7eb' : '#1f2937' }}
                    />
                </RadarChart>
            </ResponsiveContainer>
        </Card>
    );
};


// --- Main Dashboard Component ---

export const Dashboard = () => {
    return (
        <div className="space-y-6">
            {/* --- This Week's Agenda Section (Full Width) --- */}
            <div>
                <Card>
                    <SectionTitle
                        icon={<BookOpen className="h-6 w-6 text-indigo-500" />}
                        title="This Week's Agenda"
                        className={'mb-7'}
                    />
                    <ol className={DASHBOARD_STYLES.agendaTimeline}>
                        {MOCK_AGENDA_ITEMS.map((item) => (
                            <li key={item.id} className="mb-6 ml-6">
                                <span className={`${DASHBOARD_STYLES.agendaIconWrapperBase} ${item.type === 'article' ? DASHBOARD_STYLES.agendaIconWrapperArticle : DASHBOARD_STYLES.agendaIconWrapperMeeting
                                    }`}>
                                    {item.type === 'article' ?
                                        <BookOpen className={DASHBOARD_STYLES.agendaIconArticle} /> :
                                        <Calendar className={DASHBOARD_STYLES.agendaIconMeeting} />}
                                </span>
                                <div className={DASHBOARD_STYLES.agendaCard}>
                                    <div className="flex justify-between items-center">
                                        <div>
                                            <p className={DASHBOARD_STYLES.agendaDetails}>
                                                {item.type === 'article' ? `Learning: ${item.category}` : `Meeting: ${item.date}`}
                                            </p>
                                            <a href="#" className={DASHBOARD_STYLES.agendaTitle}>
                                                {item.title}
                                            </a>
                                        </div>
                                        <button
                                            aria-label="View notes"
                                            className={DASHBOARD_STYLES.agendaNotesButton}
                                        >
                                            <NotebookText className={DASHBOARD_STYLES.agendaNotesIcon} />
                                        </button>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ol>
                </Card>
            </div>

            {/* --- 2x2 Grid Section --- */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Team Engagement */}
                <EngagementChart
                    data={MOCK_TEAM_ENGAGEMENT_DATA}
                    title="Team Engagement"
                    icon={<Users className="h-6 w-6 text-purple-500" />}
                    color="#a78bfa"
                />

                {/* Personal Focus */}
                <EngagementChart
                    data={MOCK_PERSONAL_ENGAGEMENT_DATA}
                    title="Personal Focus"
                    icon={<User className="h-6 w-6 text-green-500" />}
                    color="#22c55e"
                />

                {/* Live Activity Stream */}
                <Card className="flex flex-col">
                    <SectionTitle icon={<Activity className="h-6 w-6 text-blue-500" />} title="Live Activity Stream" />
                    <div className={DASHBOARD_STYLES.cardScrollableContent}>
                        <ul className="space-y-4">
                            {MOCK_ACTIVITY_STREAM.map(item => (
                                <li key={item.id} className={DASHBOARD_STYLES.activityListItem}>
                                    <div className="flex-shrink-0 mt-1">{item.icon}</div>
                                    <div className="ml-4 flex-grow">
                                        <p className="text-sm text-gray-700 dark:text-gray-300">
                                            <span className={DASHBOARD_STYLES.activityUser}>{item.user}</span> {item.action}
                                        </p>
                                        <p className={DASHBOARD_STYLES.activityTime}>{item.time}</p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </Card>

                {/* Upcoming & Recent Meetings */}
                <Card className="flex flex-col">
                    <SectionTitle icon={<Calendar className="h-6 w-6 text-purple-500" />} title="Upcoming & Recent Meetings" />
                    <div className={DASHBOARD_STYLES.cardScrollableContent}>
                        <ul className="space-y-3">
                            {MOCK_MEETINGS.map(item => (
                                <li key={item.id} className={DASHBOARD_STYLES.meetingsListItem}>
                                    <div className="flex items-center">
                                        <span className={`${DASHBOARD_STYLES.meetingsStatusBase} ${item.status === 'Upcoming'
                                                ? DASHBOARD_STYLES.meetingsStatusUpcoming
                                                : DASHBOARD_STYLES.meetingsStatusRecent
                                            }`}>
                                            {item.status}
                                        </span>
                                        <div>
                                            <p className={DASHBOARD_STYLES.meetingsTitle}>{item.title}</p>
                                            <p className={DASHBOARD_STYLES.meetingsDate}>{item.date}</p>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </Card>
            </div>
        </div>
    );
};
````

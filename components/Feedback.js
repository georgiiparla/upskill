"use client"

import React, { useState } from 'react';
import { PieChart, ThumbsUp } from 'lucide-react';
import { Card, SectionTitle } from "./Helper";

export const Feedback = () => {
	const [isAnonymous, setIsAnonymous] = useState(false);

	return (
		/* This grid is mobile-first.
		   - On small screens (default): it's a 1-column stack.
		   - On large screens (lg) and up: it becomes a 2-column grid.
		*/
		<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
			{/* Feedback Submission Form */}
			<div>
				<SectionTitle icon={<ThumbsUp className="h-6 w-6 text-indigo-500" />} title="Real-Time Feedback" />
				<Card>
					<form onSubmit={(e) => e.preventDefault()}>
						<div className="mb-4">
							<label htmlFor="feedback-text" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Feedback</label>
							<textarea id="feedback-text" rows="6" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Provide constructive feedback..."></textarea>
						</div>
						<div className="flex items-center mb-4">
							<input id="anonymous-checkbox" type="checkbox" checked={isAnonymous} onChange={() => setIsAnonymous(!isAnonymous)} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
							<label htmlFor="anonymous-checkbox" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Submit Anonymously</label>
						</div>
						<button type="submit" className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit Feedback</button>
					</form>
				</Card>
			</div>
			{/* Feedback Analytics */}
			<div>
				<SectionTitle icon={<PieChart className="h-6 w-6 text-indigo-500" />} title="Feedback Analytics" />
				<Card>
					<p className="mb-4 text-gray-600 dark:text-gray-400">Trends and sentiment from recent feedback.</p>
					<div className="space-y-4">
						<div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg h-32 flex items-center justify-center text-gray-400 dark:text-gray-500">Sentiment Analysis (Chart)</div>
						<div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg h-32 flex items-center justify-center text-gray-400 dark:text-gray-500">Feedback Trends (Graph)</div>
					</div>
				</Card>
			</div>
		</div>
	);
};

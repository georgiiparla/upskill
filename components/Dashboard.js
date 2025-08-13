import { BarChart, User, Shield, Star, ThumbsUp, MessageSquare, Award, Activity } from 'lucide-react';

import { Card, SectionTitle } from "./Helper";
import { MOCK_ACTIVITY_STREAM, MOCK_ACCOUNTABILITY_LOGS } from "../mock/mock_data";

// Main Page Components
export const Dashboard = () => {
	const topSkills = [
		{ name: 'Adaptability', icon: <Star className="h-6 w-6 text-purple-500" /> },
		{ name: 'Communication', icon: <MessageSquare className="h-6 w-6 text-blue-500" /> },
		{ name: 'Leadership', icon: <User className="h-6 w-6 text-green-500" /> },
		{ name: 'Teamwork', icon: <Shield className="h-6 w-6 text-yellow-500" /> },
		{ name: 'Problem-solving', icon: <ThumbsUp className="h-6 w-6 text-red-500" /> },
	];

	return (
		<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
			{/* Top Skills */}
			<div className="lg:col-span-3">
				<Card>
					<SectionTitle icon={<Award className="h-6 w-6 text-indigo-500" />} title="Focus Skills" />
					<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 text-center">
						{topSkills.map(skill => (
							<div key={skill.name} className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg flex flex-col items-center justify-center">
								{skill.icon}
								<p className="mt-2 text-sm font-semibold text-gray-700 dark:text-gray-300">{skill.name}</p>
							</div>
						))}
					</div>
				</Card>
			</div>

			{/* Visual Metrics */}
			<Card className="lg:col-span-2">
				<SectionTitle icon={<BarChart className="h-6 w-6 text-green-500" />} title="Transparency Dashboard: Visual Metrics" />
				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					<div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg h-48 flex items-center justify-center text-gray-400 dark:text-gray-500">Task Progress (Chart)</div>
					<div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg h-48 flex items-center justify-center text-gray-400 dark:text-gray-500">Team Performance (Graph)</div>
				</div>
			</Card>

			{/* Activity Stream */}
			<Card>
				<SectionTitle icon={<Activity className="h-6 w-6 text-blue-500" />} title="Activity Stream" />
				<ul className="space-y-4">
					{MOCK_ACTIVITY_STREAM.map(item => (
						<li key={item.id} className="flex items-start">
							<div className="flex-shrink-0 mt-1">{item.icon}</div>
							<div className="ml-3">
								<p className="text-sm text-gray-600 dark:text-gray-400">
									<span className="font-bold text-gray-800 dark:text-white">{item.user}</span> {item.action}
								</p>
								<p className="text-xs text-gray-400 dark:text-gray-500">{item.time}</p>
							</div>
						</li>
					))}
				</ul>
			</Card>

			{/* Accountability Logs */}
			<div className="lg:col-span-3">
				<Card>
					<SectionTitle icon={<Shield className="h-6 w-6 text-red-500" />} title="Accountability Logs" />
					<ul className="space-y-4">
						{MOCK_ACCOUNTABILITY_LOGS.map(item => (
							<li key={item.id} className="flex items-start p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
								<div className="flex-shrink-0 mt-1">{item.icon}</div>
								<div className="ml-3">
									<p className="text-sm text-red-800 dark:text-red-200">
										<span className="font-bold">{item.user}:</span> {item.action}
									</p>
									<p className="text-xs text-red-600 dark:text-red-400">{item.time}</p>
								</div>
							</li>
						))}
					</ul>
				</Card>
			</div>
		</div>
	);
};

"use client";

// Corrected Imports:
// 1. Chart components are now imported from 'recharts'
import {
	BarChart, LineChart, XAxis, YAxis, Tooltip, Legend, CartesianGrid, Bar, Line, ResponsiveContainer
} from 'recharts';
// 2. Icons are imported from 'lucide-react'. Note the alias for BarChart to avoid naming conflicts.
import {
	BarChart as BarChartIcon, User, Shield, Star, ThumbsUp, MessageSquare, Award, Activity
} from 'lucide-react';
import { useTheme } from 'next-themes';

import { Card, SectionTitle } from "./Helper";
// Assuming mock data is in a separate file
import { MOCK_ACTIVITY_STREAM, MOCK_ACCOUNTABILITY_LOGS } from "../mock/mock_data";

// --- Chart Components ---

// Mock Data for Charts
const taskProgressData = [
	{ name: 'To Do', value: 12 },
	{ name: 'In Progress', value: 19 },
	{ name: 'In Review', value: 8 },
	{ name: 'Done', value: 35 },
];

const teamPerformanceData = [
	{ month: 'Jan', tasks: 30, quests: 15 },
	{ month: 'Feb', tasks: 45, quests: 25 },
	{ month: 'Mar', tasks: 50, quests: 40 },
	{ month: 'Apr', tasks: 60, quests: 42 },
	{ month: 'May', tasks: 55, quests: 50 },
	{ month: 'Jun', tasks: 70, quests: 65 },
];

const TaskProgressChart = () => {
	const { theme } = useTheme();
	const tickColor = theme === 'dark' ? '#9ca3af' : '#6b7280'; // gray-400 or gray-500

	return (
		<ResponsiveContainer width="100%" height={200}>
			<BarChart data={taskProgressData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
				<CartesianGrid strokeDasharray="3 3" stroke={theme === 'dark' ? '#374151' : '#e5e7eb'} />
				<XAxis dataKey="name" stroke={tickColor} fontSize={12} />
				<YAxis stroke={tickColor} fontSize={12} />
				<Tooltip
					contentStyle={{
						backgroundColor: theme === 'dark' ? '#1f2937' : '#ffffff',
						borderColor: theme === 'dark' ? '#374151' : '#e5e7eb'
					}}
				/>
				<Bar dataKey="value" fill="#818cf8" name="Tasks" />
			</BarChart>
		</ResponsiveContainer>
	);
};

const TeamPerformanceChart = () => {
	const { theme } = useTheme();
	const tickColor = theme === 'dark' ? '#9ca3af' : '#6b7280';

	return (
		<ResponsiveContainer width="100%" height={200}>
			<LineChart data={teamPerformanceData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
				<CartesianGrid strokeDasharray="3 3" stroke={theme === 'dark' ? '#374151' : '#e5e7eb'} />
				<XAxis dataKey="month" stroke={tickColor} fontSize={12} />
				<YAxis stroke={tickColor} fontSize={12} />
				<Tooltip
					contentStyle={{
						backgroundColor: theme === 'dark' ? '#1f2937' : '#ffffff',
						borderColor: theme === 'dark' ? '#374151' : '#e5e7eb'
					}}
				/>
				<Legend wrapperStyle={{ fontSize: '14px' }} />
				<Line type="monotone" dataKey="tasks" stroke="#008000" name="Tasks Completed" />
				<Line type="monotone" dataKey="quests" stroke="#a78bfa" name="Quests Finished" />
			</LineChart>
		</ResponsiveContainer>
	);
};


// --- Main Dashboard Component ---

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
				{/* Corrected to use the BarChartIcon alias */}
				<SectionTitle icon={<BarChartIcon className="h-6 w-6 text-green-500" />} title="Transparency Dashboard" />
				<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
					<div>
						<h4 className="text-center font-semibold text-gray-600 dark:text-gray-400 mb-2">Task Progress</h4>
						<TaskProgressChart />
					</div>
					<div>
						<h4 className="text-center font-semibold text-gray-600 dark:text-gray-400 mb-2">Team Performance</h4>
						<TeamPerformanceChart />
					</div>
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
								<div className="flex-shrink-0 mt-1">{/* Icon would go here */}</div>
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

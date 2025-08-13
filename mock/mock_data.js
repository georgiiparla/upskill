import { Shield, ThumbsUp, Award, ListChecks } from 'lucide-react';

export const MOCK_ACTIVITY_STREAM = [
	{ id: 1, user: 'Casey Jordan', action: 'completed the quest "Teamwork Titan".', time: '5m ago', icon: <Award className="h-5 w-5 text-yellow-500" /> },
	{ id: 2, user: 'Alex Rivera', action: 'provided feedback on the "Q3 Marketing Plan".', time: '2h ago', icon: <ThumbsUp className="h-5 w-5 text-blue-500" /> },
	{ id: 3, user: 'Taylor Morgan', action: 'updated the status of task "Deploy Staging Server".', time: '1d ago', icon: <ListChecks className="h-5 w-5 text-green-500" /> },
];

export const MOCK_ACCOUNTABILITY_LOGS = [
	{ id: 1, user: 'System', action: 'Project "Phoenix" deadline was extended to 2025-09-15.', time: '8h ago', icon: <Shield className="h-5 w-5 text-red-500" /> },
	{ id: 2, user: 'Jordan Smith', action: 'Decision made: "Adopt new analytics tool".', time: '2d ago', icon: <Shield className="h-5 w-5 text-gray-500" /> },
];

export const MOCK_LEADERBOARD = [
	{ id: 1, name: 'Alex Rivera', points: 4250, badges: ['🚀', '🎯', '🔥'] },
	{ id: 2, name: 'Casey Jordan', points: 3980, badges: ['💡', '🎯'] },
	{ id: 3, name: 'Taylor Morgan', points: 3710, badges: ['🤝'] },
	{ id: 4, name: 'Jordan Smith', points: 3500, badges: ['🚀'] },
	{ id: 5, name: 'Jamie Lee', points: 3200, badges: ['💡', '🤝'] },
];

export const MOCK_QUESTS = [
	{ id: 1, title: 'Adaptability Ace', description: 'Complete the "Handling Change" module and score 90% on the quiz.', points: 150, progress: 100, completed: true },
	{ id: 2, title: 'Communication Champion', description: 'Provide constructive feedback on 5 different project documents.', points: 200, progress: 60, completed: false },
	{ id: 3, title: 'Leadership Leap', description: 'Lead a project planning session and submit the meeting notes.', points: 250, progress: 0, completed: false },
	{ id: 4, title: 'Teamwork Titan', description: 'Successfully complete a paired programming challenge.', points: 100, progress: 100, completed: true },
];

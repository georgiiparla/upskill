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
    { id: 2, title: 'Communication Champion', description: 'Provide constructive feedback on 5 different project documents.', points: 200, progress: 60, completed: false },
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

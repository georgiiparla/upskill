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
export const MOCK_DASHBOARD = {
    agendaItems: [
        { id: 1, type: 'article', title: 'The Art of Giving Constructive Feedback', category: 'Communication', due_date: '2025-08-18' },
        { id: 2, type: 'meeting', title: 'Q3 Project Kickoff', category: 'Planning', due_date: '2025-08-19' },
        { id: 3, type: 'article', title: 'Leading Without Authority', category: 'Leadership', due_date: '2025-08-20' },
    ],
    activityStream: [
        { id: 1, user_name: 'Alex Rivera', action: 'opened a feedback request for the "Q4 Product Launch" document.', created_at: '2025-09-03T10:00:46Z' },
        { id: 2, user_name: 'Jeff Bezos', action: 'completed the quest "Onboarding Champion".', created_at: '2025-09-03T11:30:46Z' },
        { id: 3, user_name: 'Taylor Morgan', action: 'edited the "Engineering Team Weekly Agenda".', created_at: '2025-09-03T11:15:46Z' },
        { id: 4, user_name: 'Casey Jordan', action: 'published a new article titled "Mastering Asynchronous Communication".', created_at: '2025-09-03T06:15:46Z' },
        { id: 5, user_name: 'Georgii Parla', action: 'edited the "Linux Development Roadmap".', created_at: '2025-09-01T10:00:00Z' },
    ],
    activityData: {
        personal: {
            quests: { allTime: 5, thisWeek: 1 },
            feedback: { allTime: 8, thisWeek: 3 },
            points: { allTime: 1250, thisWeek: 75 },
            streak: 14
        },
        team: {
            quests: { allTime: 256, thisWeek: 12 },
            feedback: { allTime: 891, thisWeek: 34 },
        }
    }
};


// --- FEEDBACK DATA ---

export const MOCK_FEEDBACK_TOPICS = [
    'General Feedback',
    '[28 Aug 10:03] Strategy Deck, Alex Rivera',
    '[28 Aug 09:45] API Refactor, Casey Jordan',
    '[27 Aug 15:30] Client Presentation, Taylor Morgan',
    '[27 Aug 11:15] Dashboard Mockup, Jordan Smith',
    '[26 Aug 16:50] Onboarding Process, Jamie Lee',
];

export const MOCK_FEEDBACK_SUBMISSIONS = {
    items: [
        { id: 1, subject: 'Q3 Marketing Plan (Mock)', content: 'The plan is well-structured, but the timeline seems aggressive.', created_at: '2025-08-15T09:00:00Z', sentiment: 'Neutral' },
        { id: 2, subject: 'New Feature Design (Mock)', content: 'I love the new UI! It\'s much more intuitive.', created_at: '2025-08-14T11:30:00Z', sentiment: 'Positive' },
        { id: 3, subject: 'API Documentation (Mock)', content: 'The endpoint for user auth is missing examples.', created_at: '2025-08-12T16:45:00Z', sentiment: 'Negative' },
    ],
    hasMore: true,
};

export const MOCK_FEEDBACK_PROMPTS = {
    items: [
        { id: 1, topic: 'Q4 Strategy Deck Review (Mock)', details: 'Looking for feedback on the new market analysis on slide 5.', status: 'pending', requester_username: 'Alex Rivera' },
        { id: 2, topic: 'API Refactor Branch (Mock)', details: 'Is the new error handling logic robust enough for production?', status: 'pending', requester_username: 'Casey Jordan' },
    ],
    hasMore: true,
};

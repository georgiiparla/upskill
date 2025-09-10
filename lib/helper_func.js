import { formatDistanceToNow } from 'date-fns';

export const generateRandomTag = () => {
    const adjectives = [
        'helpful', 'clear', 'kind', 'honest', 'guiding', 'focused',
        'actionable', 'bright', 'insightful', 'creative', 'candid', 'deep',
        'direct', 'gentle', 'wise', 'sharp', 'brave', 'bold', 'open', 'true',
        'vital', 'solid', 'swift', 'frank', 'thorough'
    ];
    const nouns = [
        'Insight', 'Idea', 'Draft', 'Review', 'Comment', 'Echo', 'Signal',
        'Quest', 'Growth', 'Path', 'Feedback', 'Spark', 'Notion', 'Vision',
        'Query', 'Jump', 'Leap', 'Step', 'Voice', 'Pulse', 'Compass',
        'Clarity', 'Hint', 'Nudge', 'Whisper'
    ];

    const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
    const noun = nouns[Math.floor(Math.random() * nouns.length)];

    const timestampSuffix = String(Date.now()).slice(-4);

    return `${adjective}${noun}${timestampSuffix}`;
};

export const formatRelativeTime = (dateString) => {
    if (!dateString) return '';
    try {
        const date = new Date(dateString);
        return formatDistanceToNow(date, { addSuffix: true });
    } catch (error) {
        console.error("Invalid date string for formatting:", dateString);
        return dateString;
    }
};
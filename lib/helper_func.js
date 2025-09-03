import { formatDistanceToNow } from 'date-fns';

export const generateRandomTag = () => {
    const adjectives = ['helpful', 'clear', 'kind', 'honest', 'guiding', 'focused', 'actionable', 'bright', 'insightful', 'creative'];
    const nouns = ['Insight', 'Idea', 'Draft', 'Review', 'Comment', 'Echo', 'Signal', 'Quest', 'Growth', 'Path'];

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
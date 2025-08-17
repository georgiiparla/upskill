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

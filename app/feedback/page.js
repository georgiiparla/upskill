import { redirect } from 'next/navigation';
import { Feedback } from "@/components/feedback/Feedback";
import { serverFetch } from "@/lib/server-api";
import { MOCK_FEEDBACK_SUBMISSIONS, MOCK_FEEDBACK_PROMPTS } from "@/mock/mock_data";
import { sleep } from "@/lib/delay";

async function getFeedbackData() {
    await sleep(1000);

    let submissionData = {};
    let promptData = {};

    if (process.env.NEXT_PUBLIC_USE_MOCK_FEEDBACK === 'true') {
        console.log("Using mock data for feedback page.");
        submissionData = MOCK_FEEDBACK_SUBMISSIONS;
        promptData = MOCK_FEEDBACK_PROMPTS;
    } else {
        console.log("Fetching real data for feedback page.");
        const [submissions, prompts] = await Promise.all([
            serverFetch('/feedback_submissions'),
            serverFetch('/feedback_prompts')
        ]);
        submissionData = submissions;
        promptData = prompts;
    }

    const givenSentimentData = [
        { name: 'Exceeds Expectations', value: 21 },
        { name: 'Meets Expectations', value: 45 },
        { name: 'Needs Improvement', value: 8 },
    ];
    const receivedSentimentData = [
        { name: 'Exceeds Expectations', value: 2 },
        { name: 'Meets Expectations', value: 20 },
        { name: 'Needs Improvement', value: 3 },
    ];
    const focusData = [
        { name: 'Requests Sent', value: 12 },
        { name: 'Requests Answered', value: 38 },
        { name: 'Requests Ignored', value: 5 },
    ];

    return {
        submissions: submissionData.items,
        prompts: promptData.items,
        givenSentiment: givenSentimentData,
        receivedSentiment: receivedSentimentData,
        focus: focusData
    };
}

export default async function FeedbackPage() {
    try {
        const data = await getFeedbackData();
        return (
            <Feedback
                initialSubmissions={data.submissions}
                initialPrompts={data.prompts}
                givenSentimentData={data.givenSentiment}
                receivedSentimentData={data.receivedSentiment}
                focusData={data.focus}
            />
        );
    } catch (error) {
        if (error.message === 'Unauthorized') {
            redirect('/login');
        }

        console.error("Failed to load feedback page data:", error);
        throw error;
    }
}
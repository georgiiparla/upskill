import { redirect } from 'next/navigation';
import { Feedback } from "@/components/feedback/Feedback";
import { serverFetch } from "@/lib/server-api";
import { MOCK_FEEDBACK_SUBMISSIONS, MOCK_FEEDBACK_PROMPTS as MOCK_FEEDBACK_REQUESTS } from "@/mock/mock_data";
import { sleep } from "@/lib/delay";

async function getFeedbackData() {
    await sleep(1000);

    let submissionData = {};
    let requestData = {};

    if (process.env.NEXT_PUBLIC_USE_MOCK_FEEDBACK === 'true') {
        console.log("Using mock data for feedback page.");
        submissionData = MOCK_FEEDBACK_SUBMISSIONS;
        requestData = MOCK_FEEDBACK_REQUESTS;
    } else {
        console.log("Fetching real data for feedback page.");
        const [submissions, requests] = await Promise.all([
            serverFetch('/feedback_submissions'),
            serverFetch('/feedback_requests')
        ]);
        submissionData = submissions;
        requestData = requests;
    }

    return {
        submissions: submissionData.items,
        requests: requestData.items,
    };
}

export default async function FeedbackPage() {
    try {
        const data = await getFeedbackData();
        return (
            <Feedback
                initialSubmissions={data.submissions}
                initialRequests={data.requests}
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
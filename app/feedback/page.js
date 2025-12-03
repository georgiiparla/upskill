import { Feedback } from "@/components/features/feedback/Feedback";
import { serverFetch } from "@/lib/server-api";
import { sleep } from "@/lib/delay";

async function getFeedbackData() {
    await sleep(1000);

    console.log("Fetching real data for feedback page.");
    const [submissions, requests] = await Promise.all([
        serverFetch('/feedback_submissions'),
        serverFetch('/feedback_requests')
    ]);

    return {
        submissions: submissions.items,
        requests: requests.items,
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
        console.error("Feedback RSC Error:", error);
        return (
            <div className="p-8 text-center">
                <h1 className="text-2xl font-bold text-red-600">Error Loading Feedback</h1>
                <p className="mt-4 text-gray-700">Unable to fetch server data.</p>
                <p className="mt-2 text-sm text-gray-500">{error.message}</p>
            </div>
        );
    }
}
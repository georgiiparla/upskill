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
    const data = await getFeedbackData();
    return (
        <Feedback
            initialSubmissions={data.submissions}
            initialRequests={data.requests}
        />
    );
}
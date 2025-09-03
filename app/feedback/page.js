import { Feedback } from "@/components/feedback/Feedback";
import { serverFetch } from "@/lib/server-api";
import { MOCK_FEEDBACK_HISTORY, MOCK_FEEDBACK_REQUESTS } from "@/mock/mock_data";
import { sleep } from "@/lib/delay";

async function getFeedbackData() {
    await sleep(3000);

    let historyData;
    let requestsData;

    if (process.env.NEXT_PUBLIC_USE_MOCK_FEEDBACK === 'true') {
        historyData = MOCK_FEEDBACK_HISTORY;
        requestsData = MOCK_FEEDBACK_REQUESTS;
    } else {
        try {
            const feedbackResponse = await serverFetch('/feedback');
            historyData = feedbackResponse.items || [];
        } catch (error) {
            console.warn("Could not fetch feedback history", error.message);
        }

        try {
            requestsData = await serverFetch('/feedback/requests');
        } catch (error) {
            console.warn("Could not fetch feedback requests", error.message);
        }
    }
    
    // For data that doesn't have an API endpoint yet, we source it here
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
        history: historyData, 
        requests: requestsData,
        givenSentiment: givenSentimentData,
        receivedSentiment: receivedSentimentData,
        focus: focusData
    };
}

export default async function FeedbackPage() {
    const data = await getFeedbackData();
    
    return (
        <Feedback 
            initialHistory={data.history} 
            initialRequests={data.requests}
            givenSentimentData={data.givenSentiment}
            receivedSentimentData={data.receivedSentiment}
            focusData={data.focus}
        />
    );
}
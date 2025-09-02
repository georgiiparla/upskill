import { Feedback } from "@/components/Feedback";


const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export default async function FeedbackPage() {
    await sleep(3000);
    return <Feedback />;
}
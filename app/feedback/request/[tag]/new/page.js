import FeedbackHub from "@/components/features/feedback/FeedbackHub";

export default async function NewFeedbackForRequestPage({ params }) {
    const resolvedParams = await params;
    return <FeedbackHub requestTag={resolvedParams.tag} />;
}

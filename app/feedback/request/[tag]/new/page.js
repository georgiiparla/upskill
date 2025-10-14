"use client"

import { use } from 'react';
import FeedbackHub from "@/components/features/feedback/FeedbackHub";

export default function NewFeedbackForRequestPage({ params }) {
    const resolvedParams = use(params);

    return <FeedbackHub requestTag={resolvedParams.tag} />;
}
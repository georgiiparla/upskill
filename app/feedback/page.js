import { Suspense } from "react";
import { Feedback } from "@/components/features/feedback/Feedback";

export default function FeedbackPage() {
    return (
        <Suspense fallback={<div className="flex h-[50vh] w-full items-center justify-center text-slate-500">Loading workspace...</div>}>
            <Feedback />
        </Suspense>
    );
}
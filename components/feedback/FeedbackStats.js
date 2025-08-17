"use client";
import { Card, SectionTitle } from "../Helper";
import { MOCK_FEEDBACK_STATS } from "@/mock/mock_data";
import { BarChart2, CheckCircle, TrendingUp } from "lucide-react";

const StatCard = ({ icon, label, value, unit }) => (
    <div className="flex items-center p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
        <div className="p-3 rounded-full bg-indigo-100 dark:bg-indigo-900/50 text-indigo-500 dark:text-indigo-400">
            {icon}
        </div>
        <div className="ml-4">
            <p className="text-sm text-gray-500 dark:text-gray-400">{label}</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {value}<span className="text-base font-medium">{unit}</span>
            </p>
        </div>
    </div>
);

export const FeedbackStats = () => {
    return (
        <div>
            <SectionTitle icon={<BarChart2 className="h-6 w-6 text-indigo-500" />} title="Quick Insights" />
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <StatCard
                    icon={<CheckCircle className="h-6 w-6" />}
                    label="Total Submissions"
                    value={MOCK_FEEDBACK_STATS.totalSubmissions}
                />
                <StatCard
                    icon={<TrendingUp className="h-6 w-6" />}
                    label="Response Rate"
                    value={MOCK_FEEDBACK_STATS.responseRate}
                    unit="%"
                />
                <StatCard
                    icon={<TrendingUp className="h-6 w-6 text-green-500 dark:text-green-400" />}
                    label="Positive Trend"
                    value={`+${MOCK_FEEDBACK_STATS.positiveTrend}`}
                    unit="%"
                />
            </div>
        </div>
    );
};

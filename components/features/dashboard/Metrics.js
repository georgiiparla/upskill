"use client";

import React from 'react';

const MetricRow = ({ label, primaryValue, subValue, highlightColor }) => (
    <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between py-2 border-b border-slate-100/50 dark:border-slate-800/50 last:border-0">
        <div className="flex items-center gap-2 mb-1 sm:mb-0">
            <span className="text-slate-400 dark:text-slate-600 select-none">›</span>
            <span className="text-slate-600 dark:text-slate-400 font-medium">{label}</span>
        </div>

        <div className="pl-4 sm:pl-0 flex items-baseline gap-2">
            <span className={`text-lg font-bold ${highlightColor}`}>
                {primaryValue}
            </span>
            <span className="text-xs text-slate-400 dark:text-slate-500">
                {subValue}
            </span>
        </div>
    </div>
);

export const Metrics = ({ metricsData }) => {
    return (
        <div className="flex flex-col gap-6">
            {/* Personal Section */}
            <div>
                <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-3 border-b border-slate-200 dark:border-slate-700 pb-1">
                    My Activity
                </h4>
                <div className="flex flex-col">
                    <MetricRow
                        label="Feedback Given"
                        primaryValue={`${metricsData.personal.feedback.allTime || 0}`}
                        subValue={`(${metricsData.personal.feedback.thisWeek || 0} this week)`}
                        highlightColor="text-emerald-600 dark:text-emerald-400"
                    />
                    <MetricRow
                        label="Requests Made"
                        primaryValue={`${metricsData.personal.requests.allTime || 0}`}
                        subValue={`(${metricsData.personal.requests.thisWeek || 0} this week)`}
                        highlightColor="text-blue-600 dark:text-blue-400"
                    />
                </div>
            </div>

            {/* Team Section */}
            <div>
                <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-3 border-b border-slate-200 dark:border-slate-700 pb-1">
                    Team Activity
                </h4>
                <div className="flex flex-col">
                    <MetricRow
                        label="Total Feedback"
                        primaryValue={`${metricsData.team.feedback.allTime || 0}`}
                        subValue={`(${metricsData.team.feedback.thisWeek || 0} this week)`}
                        highlightColor="text-purple-600 dark:text-purple-400"
                    />
                    <MetricRow
                        label="Total Requests"
                        primaryValue={`${metricsData.team.requests.allTime || 0}`}
                        subValue={`(${metricsData.team.requests.thisWeek || 0} this week)`}
                        highlightColor="text-orange-600 dark:text-orange-400"
                    />
                </div>
            </div>
        </div>
    );
};
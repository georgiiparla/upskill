"use client";

export const Metrics = ({ metricsData }) => {
    return (
        <div>
            <div className="text-slate-600 dark:text-slate-400">
                <span className="text-slate-500 dark:text-slate-600">[metric]</span>
                {' '}
                <span className="font-semibold text-slate-900 dark:text-slate-300">Feedback Given:</span>
                {' '}
                <span className="text-csway-green font-bold">{metricsData.personal.feedback.allTime || 0}</span>
                {' '}
                <span className="text-slate-500 dark:text-slate-600">({metricsData.personal.feedback.thisWeek || 0} this week)</span>
            </div>
            <div className="text-slate-600 dark:text-slate-400 mt-1">
                <span className="text-slate-500 dark:text-slate-600">[metric]</span>
                {' '}
                <span className="font-semibold text-slate-900 dark:text-slate-300">Feedback Requested:</span>
                {' '}
                <span className="text-blue-600 dark:text-blue-400 font-bold">{metricsData.personal.requests.allTime || 0}</span>
                {' '}
                <span className="text-slate-500 dark:text-slate-600">({metricsData.personal.requests.thisWeek || 0} this week)</span>
            </div>
            <div className="text-slate-600 dark:text-slate-400 mt-1">
                <span className="text-slate-500 dark:text-slate-600">[metric]</span>
                {' '}
                <span className="font-semibold text-slate-900 dark:text-slate-300">Team Given Feedback:</span>
                {' '}
                <span className="text-purple-600 dark:text-purple-400 font-bold">{metricsData.team.feedback.allTime || 0}</span>
                {' '}
                <span className="text-slate-500 dark:text-slate-600">({metricsData.team.feedback.thisWeek || 0} this week)</span>
            </div>
            <div className="text-slate-600 dark:text-slate-400 mt-1">
                <span className="text-slate-500 dark:text-slate-600">[metric]</span>
                {' '}
                <span className="font-semibold text-slate-900 dark:text-slate-300">Team Created Requests:</span>
                {' '}
                <span className="text-orange-500 dark:text-orange-400 font-bold">{metricsData.team.requests.allTime || 0}</span>
                {' '}
                <span className="text-slate-500 dark:text-slate-600">({metricsData.team.requests.thisWeek || 0} this week)</span>
            </div>
        </div>
    );
};

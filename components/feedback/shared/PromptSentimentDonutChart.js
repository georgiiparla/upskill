// components/feedback/PromptSentimentDonutChart.js

"use client";

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import { useTheme } from 'next-themes';
import { Card, SectionTitle } from "@/components/shared/Helper"; // Assuming path based on previous files
import { BarChart2 } from 'lucide-react';

// Color mapping for sentiments, consistent with previous bar chart logic
const SENTIMENT_COLOR_MAP = {
    Positive: '#22a55e', // csway-green
    Neutral: '#f59e0b',  // amber-500
    Negative: '#e37a7b', // csway-red
};

export const PromptSentimentDonutChart = ({ title, data, className }) => {
    const { theme } = useTheme();

    // Calculate total from the 'count' property in the data array
    const total = data.reduce((acc, entry) => acc + entry.count, 0);

    // Legend component for displaying breakdown below the chart
    const Legend = () => (
        <div className="space-y-2 mt-4">
            {data.map((entry) => (
                <div
                    key={`legend-${entry.name}`}
                    className="flex items-center justify-between text-sm"
                >
                    <div className="flex items-center gap-2">
                        <span
                            className="w-3 h-3 rounded-full"
                            style={{ backgroundColor: SENTIMENT_COLOR_MAP[entry.name] }}
                        />
                        <span className="text-gray-600 dark:text-gray-400">{entry.name}</span>
                    </div>
                    <span className="font-semibold text-gray-800 dark:text-gray-200">{entry.count}</span>
                </div>
            ))}
        </div>
    );

    return (
        <Card className={className}>
            <SectionTitle icon={<BarChart2 className="h-5 w-5 text-csway-green" />} title={title} />

            <div className="relative flex justify-center items-center h-[200px]">
                {/* Background fill */}
                <div className="absolute h-[160px] w-[160px] rounded-full bg-gray-100 dark:bg-gray-900"></div>

                <ResponsiveContainer width="100%" height="100%" className="absolute">
                    <PieChart>
                        <Pie
                            data={data}
                            dataKey="count" // Use 'count' key from promptData calculation
                            innerRadius={75}
                            outerRadius={85}
                            paddingAngle={5}
                            isAnimationActive={false}
                        >
                            {data.map((entry) => (
                                <Cell
                                    key={`cell-${entry.name}`}
                                    fill={SENTIMENT_COLOR_MAP[entry.name]}
                                    stroke="none"
                                />
                            ))}
                        </Pie>
                        <Tooltip
                            cursor={{ fill: 'transparent' }}
                            contentStyle={{
                                backgroundColor: theme === 'dark' ? 'rgba(31, 41, 55, 0.8)' : 'rgba(255, 255, 255, 0.8)',
                                backdropFilter: 'blur(4px)',
                                borderRadius: '0.5rem',
                                border: '1px solid',
                                borderColor: theme === 'dark' ? '#374151' : '#e5e7eb',
                            }}
                            itemStyle={{
                                color: theme === 'dark' ? '#e5e7eb' : '#1f2937',
                            }}
                        />
                        {/* Central total counter */}
                        <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle" className="text-3xl font-bold fill-current text-gray-800 dark:text-gray-200">
                            {total}
                        </text>
                    </PieChart>
                </ResponsiveContainer>
            </div>
            <Legend />
        </Card>
    );
};
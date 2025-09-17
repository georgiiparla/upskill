"use client";

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import { useTheme } from 'next-themes';
import { Card, SectionTitle } from "@/components/shared/Helper";
import { BarChart2 } from 'lucide-react';

const SENTIMENT_COLOR_MAP = {
    'Far Exceeds Expectations': '#14b8a6',
    'Exceeds Expectations': '#22a55e',
    'Meets Expectations': '#f59e0b',
    'Below Expectations': '#e37a7b',
};

export const RequestSentimentDonutChart = ({ title, data, className }) => {
    const { theme } = useTheme();

    const total = data.reduce((acc, entry) => acc + entry.count, 0);

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
                <div className="absolute h-[170px] w-[170px] rounded-full bg-gray-100 dark:bg-gray-900"></div>
                <ResponsiveContainer width="100%" height="100%" className="absolute">
                    <PieChart>
                        <Pie
                            data={data}
                            dataKey="count"
                            innerRadius={70}
                            outerRadius={85}
                            paddingAngle={5}
                            isAnimationActive={true}
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
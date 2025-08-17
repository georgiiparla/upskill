"use client"
import { useTheme } from 'next-themes';
import {
    BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell
} from 'recharts';

import { SENTIMENT_DATA, SENTIMENT_COLORS } from '@/mock/mock_data';

// --- Sentiment Analysis Bar Chart ---
export const SentimentChart = () => {
    const { theme } = useTheme();
    const tickColor = theme === 'dark' ? '#9ca3af' : '#6b7280';

    return (
        <div style={{ height: '300px' }}>
            <ResponsiveContainer width="100%" height="100%">
                <BarChart
                    data={SENTIMENT_DATA}
                    layout="vertical"
                    margin={{
                        top: 20, right: 30, left: 20, bottom: 5,
                    }}
                >
                    <XAxis type="number" hide />
                    <YAxis
                        type="category"
                        dataKey="name"
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: tickColor, fontSize: 14 }}
                    />
                    <Tooltip
                        cursor={{ fill: 'rgba(128, 128, 128, 0.1)' }}
                        contentStyle={{
                            backgroundColor: theme === 'dark' ? 'rgba(31, 41, 55, 0.8)' : 'rgba(255, 255, 255, 0.8)',
                            backdropFilter: 'blur(4px)',
                            borderRadius: '0.5rem',
                            border: '1px solid',
                            borderColor: theme === 'dark' ? '#374151' : '#e5e7eb'
                        }}
                        itemStyle={{ color: theme === 'dark' ? '#ffffff' : '#000000' }}
                    />
                    {/* The radius property below rounds the corners of the bars */}
                    <Bar dataKey="value" barSize={35} radius={[0, 8, 8, 0]}>
                        {SENTIMENT_DATA.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={SENTIMENT_COLORS[index % SENTIMENT_COLORS.length]} />
                        ))}
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

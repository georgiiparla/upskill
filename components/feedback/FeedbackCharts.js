"use client"
import { useTheme } from 'next-themes';
import {
    PieChart, Pie, Cell, Tooltip, ResponsiveContainer
} from 'recharts';

import { SENTIMENT_DATA, FEEDBACK_TRENDS_DATA, SENTIMENT_COLORS, TRENDS_COLORS } from '@/mock/mock_data';

// --- Chart Components ---

const STYLES = {
    customLegendUL: `
        mt-4
        space-y-2
        text-sm
    `,
    customLegendLI: `
        flex
        items-center justify-between
    `,
    circle: `
        w-3 h-3 
        rounded-full 
        mr-2
    `,
    entryName: `
        text-gray-600 dark:text-gray-400
    `,
    entryValue: `
        font-semibold 
        text-gray-800 dark:text-gray-200
    `
}

// A new, list-style custom legend for better styling and information
const CustomLegend = ({ data, colors }) => (
    <ul className={STYLES.customLegendUL}>
        {data.map((entry, index) => (
            <li key={`item-${index}`} className={STYLES.customLegendLI}>
                <div className="flex items-center">

                    <span
                        className={STYLES.circle}
                        style={{ backgroundColor: colors[index % colors.length] }}
                    />

                    <span className={STYLES.entryName}>{entry.name}</span>

                </div>

                <span className={STYLES.entryValue}>{entry.value}</span>
            </li>
        ))}
    </ul>
);

export const SentimentChart = () => {
    const { theme } = useTheme();
    const totalValue = SENTIMENT_DATA.reduce((acc, entry) => acc + entry.value, 0);

    return (
        <div>
            <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                    <Pie
                        isAnimationActive={false}
                        data={SENTIMENT_DATA}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        innerRadius={60}
                        fill="#8884d8"
                        dataKey="value"
                        nameKey="name"
                        paddingAngle={5}
                    >
                        {SENTIMENT_DATA.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={SENTIMENT_COLORS[index % SENTIMENT_COLORS.length]} stroke={theme === 'dark' ? '#1f2937' : '#ffffff'} />
                        ))}
                    </Pie>
                    <Tooltip
                        contentStyle={{
                            backgroundColor: theme === 'dark' ? 'rgba(31, 41, 55, 0.8)' : 'rgba(255, 255, 255, 0.8)',
                            backdropFilter: 'blur(4px)',
                            borderRadius: '0.5rem',
                            border: '1px solid',
                            borderColor: theme === 'dark' ? '#374151' : '#e5e7eb'
                        }}
                        itemStyle={{ color: theme === 'dark' ? '#ffffff' : '#000000' }}
                    />
                    {/* Reverted to a single <text> element for perfect centering */}
                    <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle"
                        className="text-3xl font-bold fill-current text-gray-800 dark:text-gray-200">
                        {totalValue}
                    </text>
                </PieChart>
            </ResponsiveContainer>
            <CustomLegend data={SENTIMENT_DATA} colors={SENTIMENT_COLORS} />
        </div>
    );
};

export const FeedbackTrendsChart = () => {
    const { theme } = useTheme();
    const totalValue = FEEDBACK_TRENDS_DATA.reduce((acc, entry) => acc + entry.value, 0);

    return (
        <div>
            <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                    <Pie
                        data={FEEDBACK_TRENDS_DATA}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        innerRadius={60}
                        fill="#8884d8"
                        dataKey="value"
                        nameKey="name"
                        paddingAngle={5}
                        isAnimationActive={false}
                    >
                        {FEEDBACK_TRENDS_DATA.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={TRENDS_COLORS[index % TRENDS_COLORS.length]} stroke={theme === 'dark' ? '#1f2937' : '#ffffff'} />
                        ))}
                    </Pie>
                    <Tooltip
                        contentStyle={{
                            backgroundColor: theme === 'dark' ? 'rgba(31, 41, 55, 0.8)' : 'rgba(255, 255, 255, 0.8)',
                            backdropFilter: 'blur(4px)',
                            borderRadius: '0.5rem',
                            border: '1px solid',
                            borderColor: theme === 'dark' ? '#374151' : '#e5e7eb'
                        }}
                        itemStyle={{ color: theme === 'dark' ? '#ffffff' : '#000000' }}
                    />
                    {/* Reverted to a single <text> element for perfect centering */}
                    <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle"
                        className="text-3xl font-bold fill-current text-gray-800 dark:text-gray-200">
                        {totalValue}
                    </text>
                </PieChart>
            </ResponsiveContainer>
            <CustomLegend data={FEEDBACK_TRENDS_DATA} colors={TRENDS_COLORS} />
        </div>
    );
};
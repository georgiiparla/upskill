"use client"
import { PlusCircle, Send, PieChart as PieChartIcon, MessageSquare } from 'lucide-react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import { useTheme } from 'next-themes';

import { Card, SectionTitle } from "./Helper";
import { MOCK_FEEDBACK_HISTORY } from "@/mock/mock_data";


// The main reusable donut chart component
export const ReusableDonutChart = ({ title, data, colors }) => {
    
    
    const CustomLegend = ({ data, colors }) => (
        <ul className="mt-4 space-y-2 text-sm">
            {data.map((entry, index) => (
                <li key={`item-${index}`} className="flex items-center justify-between">
                    <div className="flex items-center">
                        <span
                            className="w-3 h-3 rounded-full mr-2"
                            style={{ backgroundColor: colors[index % colors.length] }}
                        />
                        <span className="text-gray-600 dark:text-gray-400">{entry.name}</span>
                    </div>
                    <span className="font-semibold text-gray-800 dark:text-gray-200">{entry.value}</span>
                </li>
            ))}
        </ul>
    );
    

    const { theme } = useTheme();
    const totalValue = data.reduce((acc, entry) => acc + entry.value, 0);
    

    return (
        <Card>

            
            <SectionTitle icon={<PieChartIcon className="h-5 w-5 text-csway-orange" />} title={title} />
            

            <div className="mt-4">

                
                <ResponsiveContainer width="100%" height={200}>
                    <PieChart>


                        <Pie
                            data={data}
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
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={colors[index % colors.length]} stroke={theme === 'dark' ? '#1f2937' : '#ffffff'} />
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

                        

                        <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle" className="text-3xl font-bold fill-current text-gray-800 dark:text-gray-200">
                            {totalValue}
                        </text>

                    </PieChart>
                </ResponsiveContainer>
                
                
                
                <CustomLegend data={data} colors={colors} />

                
            </div>
        </Card>
    );
};


// --- Main Feedback Component ---
export const Feedback = () => {

    
    const sentimentData = [
        { name: 'Positive', value: 400 },
        { name: 'Neutral', value: 120 },
        { name: 'Negative', value: 80 },
    ];

    const feedbackData = [
        { name: 'Feeback given', value: 3 },
        { name: 'Feedback requested', value: 2 },
    ];

    
    const SENTIMENT_COLORS = ['#22c55e', '#f59e0b', '#ef4444'];
    const FEEDBACK_COLORS = ['#3b82f6', '#14b8a6'];
    

    const getSentimentColor = (sentiment) => {
        switch (sentiment) {
            case 'Positive': return 'border-green-500';
            case 'Negative': return 'border-red-500';
            default: return 'border-amber-500';
        }
    }
    

    return (
        <div className="space-y-8">

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                
                <ReusableDonutChart
                    title="Sentiment Analysis"
                    data={sentimentData}
                    colors={SENTIMENT_COLORS}
                />
                

                <ReusableDonutChart
                    title="Feedback Activity"
                    data={feedbackData}
                    colors={FEEDBACK_COLORS}
                />
                
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                
                {/* Card 1: Feedback History */}
                <Card className="flex flex-col">
                    {/* HEADER: Title on left, Button on right */}
                    <div className="flex justify-between items-center mb-6">
                        <SectionTitle icon={<MessageSquare className="h-6 w-6 text-csway-orange" />} title="Feedback History" />

                        {/* BUTTON: Styled with orange text, smaller size, and positioned in the header */}
                        <button className="flex items-center justify-center px-3 py-1.5 text-xs font-semibold text-csway-orange bg-gray-200/50 hover:bg-gray-200 dark:text-csway-orange dark:bg-gray-700/50 dark:hover:bg-gray-700 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-csway-orange focus:ring-offset-2 dark:focus:ring-offset-gray-800">
                            <PlusCircle className="h-4 w-4 mr-1.5" />
                            Add Feedback
                        </button>
                    </div>

                    <div className="flex-grow overflow-y-auto no-scrollbar max-h-[350px]">
                        <ul className="space-y-4">
                            {MOCK_FEEDBACK_HISTORY.map((item, index) => (
                                <li
                                    key={`${item.id}-${index}`}
                                    className={`
                                        bg-gray-50 dark:bg-gray-800/60 p-4 rounded-lg 
                                        transition-colors hover:bg-gray-100 dark:hover:bg-gray-700/80
                                        border-l-2 ${getSentimentColor(item.sentiment)}
                                    `}
                                >
                                    <div className="flex justify-between items-center mb-1">
                                        <h4 className="text-sm font-semibold text-gray-800 dark:text-gray-200">{item.subject}</h4>
                                        <span className="text-xs text-gray-500 dark:text-gray-400">{item.created_at}</span>
                                    </div>
                                    <p className="text-sm text-gray-600 dark:text-gray-300">{item.content}</p>
                                </li>
                            ))}
                        </ul>
                    </div>
                </Card>
                
                        
                
                {/* Card 2: Requests History */}
                <Card className="flex flex-col">
                    {/* HEADER: Title on left, Button on right */}
                    <div className="flex justify-between items-center mb-6">
                        <SectionTitle icon={<MessageSquare className="h-6 w-6 text-csway-orange" />} title="Requests History" />
                        
                        {/* BUTTON: Styled with blue color, smaller size, and positioned in the header */}
                        <button className="flex items-center justify-center px-3 py-1.5 text-xs font-semibold text-white bg-blue-500 hover:bg-blue-600 rounded-md shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800">
                            <PlusCircle className="h-4 w-4 mr-1.5" />
                            Request New
                        </button>
                    </div>
                            
                    <div className="flex-grow overflow-y-auto no-scrollbar max-h-[350px]">
                        <ul className="space-y-4">
                            {MOCK_FEEDBACK_HISTORY.map((item, index) => (
                                <li
                                    key={`${item.id}-${index}`}
                                    className={"bg-gray-50 dark:bg-gray-800/60 p-4 rounded-lg transition-colors hover:bg-gray-100 dark:hover:bg-gray-700/80 border-l-2 border-blue-500"}
                                >
                                    <div className="flex justify-between items-center mb-1">
                                        <h4 className="text-sm font-semibold text-gray-800 dark:text-gray-200">{item.subject}</h4>
                                        <span className="text-xs text-gray-500 dark:text-gray-400">{item.created_at}</span>
                                    </div>
                                    <p className="text-sm text-gray-600 dark:text-gray-300">{item.content}</p>
                                </li>
                            ))}
                        </ul>
                    </div>
                </Card>
                
                        
            </div>
        </div>
    );
};
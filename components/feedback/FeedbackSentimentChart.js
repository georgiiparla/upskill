"use client"
import { useState } from 'react';
import { BarChart2, ChevronDown } from 'lucide-react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import { useTheme } from 'next-themes';
import { Card, SectionTitle } from "../shared/Helper";

const FeedbackSentimentChart = ({ title, givenData, receivedData, givenColors, receivedColors, className }) => {
    //  React stuff
    const [view, setView] = useState('given'); // 'given' or 'received'
    const { theme } = useTheme();

    // intermediate validation
    const isGivenView = view === 'given';
    const currentData = isGivenView ? givenData : receivedData;
    const currentColors = isGivenView ? givenColors : receivedColors;
    // summation
    const total = currentData.reduce((acc, entry) => acc + entry.value, 0);

    // Sub description
    const Legend = () => (
        // Legend block
        <div className="mt-14 space-y-2">

            {currentData.map((entry, index) => (
                // Legend row generation
                <div 
                    key={`legend-${index}`} 
                    className="flex items-center justify-between text-sm"
                >

                    {/* Legend row description */}
                    <div className="flex items-center gap-2">
                        {/* mini icon*/}
                        <span
                            className="w-3 h-3 rounded-full"
                            style={{ backgroundColor: currentColors[index % currentColors.length] }}
                        />
                        {/* Legend row name */}
                        <span className="text-gray-600 dark:text-gray-400">{entry.name}</span>
                    </div>

                    {/* Legend row value*/}
                    <span className="font-semibold text-gray-800 dark:text-gray-200">{entry.value}</span>
                </div>
            ))}

        </div>
    );

    return (
        // Chart card
        <Card className={className}>

            {/* First row */}
             <div className="flex justify-between items-center">

                <SectionTitle icon={<BarChart2 className="h-5 w-5 text-csway-green" />} title={title} />

                {/* Dropdown */}
                <div className="relative">
                    <select
                        value={view}
                        onChange={(e) => setView(e.target.value)}
                        className="
                            appearance-none bg-gray-200/50 dark:bg-gray-700/50 text-xs font-semibold
                            text-gray-700 dark:text-gray-300 py-1.5 pl-3 pr-8 rounded-md
                            focus:outline-none focus:ring-2 focus:ring-csway-orange
                        "
                    >
                        <option value="given">Given</option>
                        <option value="received">Received</option>
                    </select>
                    <ChevronDown className="h-4 w-4 absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
                </div>

            </div>

            {/* Second row */}
            <div className="mt-4 relative flex justify-center items-center h-[200px]">
                {/* Gray background fill for the entire chart area */}
                <div className="absolute h-[180px] w-[180px] rounded-full bg-gray-100 dark:bg-gray-900"></div>

                {/* Adaptive RECHARTS container for charts */}
                <ResponsiveContainer width="100%" height="100%" className="absolute">

                    {/* Chart */}
                    <PieChart>
                        {/* Pie itself */}
                        <Pie
                            data={currentData}
                            innerRadius={75}
                            outerRadius={90}
                            paddingAngle={5}
                            dataKey="value"
                            isAnimationActive={false}
                        >
                            {currentData.map((entry, index) => (
                                <Cell
                                    key={`cell-${view}-${index}`}
                                    fill={currentColors[index % currentColors.length]}
                                    stroke="none"
                                />
                            ))}
                        </Pie>
                        
                        {/* Hint on hover */}
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

            {/* Legend */}
            <Legend />

        </Card>
    );
};

export default FeedbackSentimentChart;
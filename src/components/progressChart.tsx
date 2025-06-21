import React, { useState, useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { BouncingChessPieces } from "@/components/bouncingPieces";
import axios from 'axios';
import useSWR from 'swr';

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

export const ProgressChart = () => {
    // List of player names we want to display
    const playerNames = ["Archilect", "Adribery", "yazhino", "NASCARTII", "Labelloo", "chess_julien1292", "saraxzzle", "THOMVIET"];

    // Colors for each player line
    const lineColors = ["#FFFFFF", "#0000FF", "#00FF00", "#FF0000", "#FF00FF", "#00FFFF", "#FF8000", "#8B4513"];

    const { data: players, error } = useSWR("/api/history", fetcher);

    // State for selected month
    const [selectedMonth, setSelectedMonth] = useState<string>('');

    // Get available months and prepare data
    const { availableMonths, monthlyData } = useMemo(() => {
        if (!players) return { availableMonths: [], monthlyData: {} };

        const monthsSet = new Set<string>();
        const monthlyDataMap: { [key: string]: any[] } = {};

        // Collect all available months and group data by month
        players.forEach((player: { username: string; data: any[] }) => {
            if (playerNames.includes(player.username)) {
                player.data.forEach((snapshot: { recorded: string; progress: number }) => {
                    const date = new Date(snapshot.recorded);
                    const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
                    const monthLabel = `${date.toLocaleString('default', { month: 'long' })} ${date.getFullYear()}`;

                    monthsSet.add(monthKey);

                    if (!monthlyDataMap[monthKey]) {
                        monthlyDataMap[monthKey] = [];
                    }
                });
            }
        });

        const sortedMonths = Array.from(monthsSet).sort().reverse(); // Most recent first
        return { availableMonths: sortedMonths, monthlyData: monthlyDataMap };
    }, [players]);

    // Set default selected month to the most recent one
    React.useEffect(() => {
        if (availableMonths.length > 0 && !selectedMonth) {
            setSelectedMonth(availableMonths[0]);
        }
    }, [availableMonths, selectedMonth]);

    // Prepare chart data for selected month
    const chartData = useMemo(() => {
        if (!players || !selectedMonth) return [];

        const selectedMonthData: { [key: string]: any } = {};

        // Filter data for selected month and organize by date
        players.forEach((player: { username: string; data: any[] }) => {
            if (playerNames.includes(player.username)) {
                player.data
                    .filter((snapshot: { recorded: string }) => {
                        const date = new Date(snapshot.recorded);
                        const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
                        return monthKey === selectedMonth;
                    })
                    .forEach((snapshot: { recorded: string; progress: number }) => {
                        const dayKey = new Date(snapshot.recorded).toLocaleDateString();

                        if (!selectedMonthData[dayKey]) {
                            selectedMonthData[dayKey] = { recorded: dayKey };
                        }

                        selectedMonthData[dayKey][player.username] = (snapshot.progress * 100).toFixed(1);
                    });
            }
        });

        // Convert to array and sort by date
        return Object.values(selectedMonthData).sort((a: any, b: any) =>
            new Date(a.recorded).getTime() - new Date(b.recorded).getTime()
        );
    }, [players, selectedMonth]);

    if (error) return <p>Error loading data</p>;
    if (!players) return <BouncingChessPieces />;

    const getMonthLabel = (monthKey: string) => {
        const [year, month] = monthKey.split('-');
        const date = new Date(parseInt(year), parseInt(month) - 1);
        return `${date.toLocaleString('default', { month: 'long' })} ${year}`;
    };

    return (
        <div>
            {/* Month Selection */}
            <div style={{ marginBottom: '20px' }}>
                <select
                    value={selectedMonth}
                    onChange={(e) => setSelectedMonth(e.target.value)}
                    style={{
                        padding: '8px 12px',
                        border: '1px solid #ccc',
                        borderRadius: '4px',
                        fontSize: '14px',
                        minWidth: '200px',
                        color: "#FFFFFF",
                    }}
                >
                    {availableMonths.map((month) => (
                        <option key={month} value={month}>
                            {getMonthLabel(month)}
                        </option>
                    ))}
                </select>
            </div>

            {/* Chart */}
            <ResponsiveContainer width="100%" height={600}>
                <LineChart data={chartData}>
                    <XAxis
                        dataKey="recorded"
                        angle={-45}
                        textAnchor="end"
                        height={80}
                    />
                    <YAxis
                        label={{ value: 'Progress (%)', angle: -90, position: 'insideLeft' }}
                    />
                    <Tooltip />
                    {playerNames.map((playerName, index) => (
                        <Line
                            key={playerName}
                            type="monotone"
                            dataKey={playerName}
                            stroke={lineColors[index % lineColors.length]}
                            strokeWidth={2}
                            name={playerName}
                            dot={false}
                            connectNulls={false}
                        />
                    ))}
                </LineChart>
            </ResponsiveContainer>

            {/* Current month info */}
            <div style={{ marginTop: '10px', fontSize: '14px', color: '#666' }}>
                Showing data for: <strong>{selectedMonth ? getMonthLabel(selectedMonth) : 'No month selected'}</strong>
                {chartData.length === 0 && selectedMonth && (
                    <span style={{ color: '#ff6b6b', marginLeft: '10px' }}>
                        No data available for this month
                    </span>
                )}
            </div>
        </div>
    );
};

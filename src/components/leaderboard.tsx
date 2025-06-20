"use client";

import useSWR from "swr";
import axios from "axios";
import { StatCard } from "@/components/statCard";
import { BouncingChessPieces } from "@/components/bouncingPieces";

export type Player = {
    username: string;
    startingElo: number;
    goalElo: number;
    mode: string;
    currentElo: number;
    progress: number;
    rest: number;
};

const medalColors = ["#EFBF04"]; // gold

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

export const Leaderboard = () => {
    const { data: players, error } = useSWR<Player[]>("/api/players", fetcher);

    if (error) return <p>Error loading data</p>;
    if (!players) return <BouncingChessPieces/>;

    return (
        <main style={{ maxWidth: 600, margin: "2rem auto", padding: "0 1rem", background: "#000000" }}>
            {players
                .slice()
                .sort((a, b) => b.progress - a.progress)
                .map((p, i) => (
                    <div
                        key={p.username}
                        style={{
                            padding: "1rem",
                            margin: "1rem 0",
                            borderRadius: 8,
                            background: medalColors[i] || "#ffffff",
                            color: "black",
                            border: `1px solid ${medalColors[i] || "#CCCCCC"}`,
                        }}
                    >
                        <strong style={{ fontSize: "1.1rem" }}>
                            {p.username} ({p.mode})
                        </strong>
                        <div
                            style={{
                                display: "flex",
                                flexWrap: "wrap",
                                justifyContent: "space-between",
                                gap: "1rem",
                            }}
                            className="statcard-row"
                        >
                            <StatCard
                                title="DEPART"
                                value={p.startingElo}
                                variant="blue"
                            />
                            <StatCard
                                title="ACTUEL"
                                value={p.currentElo}
                                variant="blue"
                            />
                            <StatCard
                                title="OBJECTIF"
                                value={p.goalElo}
                                variant="blue"
                            />
                            <StatCard
                                title="RESTE"
                                value={p.rest}
                                variant="blue"
                            />
                        </div>
                        <div>Progress: {Math.round(p.progress * 100)}%</div>
                        <div
                            style={{
                                background: "#637381",
                                borderRadius: 14,
                                overflow: "hidden",
                                marginTop: 8,
                                position: "relative",
                                height: 14,
                            }}
                        >
                            <div
                                style={{
                                    position: "absolute",
                                    left: "50%",
                                    top: 0,
                                    bottom: 0,
                                    width: `${Math.abs(p.progress) * 50}%`,
                                    transform:
                                        p.progress < 0
                                            ? "translateX(-100%)"
                                            : "none",
                                    background:
                                        p.progress < 0 ? "#E32F30" : "#03AD23",
                                    transition: "width 0.3s, background 0.3s",
                                }}
                            />
                        </div>
                    </div>
                ))}
        </main>
    );
}

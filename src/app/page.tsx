"use client";

import useSWR from "swr";
import axios from "axios";
import type { NextPage } from "next";

type Player = {
    username: string;
    starting_elo: number;
    goal_elo: number;
    mode: string;
    current_elo: number;
    progress: number;
};

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

const Home: NextPage = () => {
    const { data: players, error } = useSWR<Player[]>("/api/players", fetcher);

    if (error) return <p>Error loading data</p>;
    if (!players) return <p>Loading…</p>;

    return (
        <main style={{ maxWidth: 600, margin: "2rem auto", padding: "0 1rem" }}>
            <h1>Chess ELO Tracker</h1>
            {players
                .slice()
                .sort((a, b) => b.progress - a.progress)
                .map((p) => (
                    <div
                        key={p.username}
                        style={{
                            border: "1px solid #ccc",
                            padding: "1rem",
                            margin: "1rem 0",
                            borderRadius: 8,
                        }}
                    >
                        <strong>
                            {p.username} ({p.mode})
                        </strong>
                        <div>Start: {p.starting_elo}</div>
                        <div>Current: {p.current_elo}</div>
                        <div>Goal: {p.goal_elo}</div>
                        <div>Progress: {Math.round(p.progress * 100)}%</div>
                        <div
                            style={{
                                background: "#eee",
                                borderRadius: 4,
                                overflow: "hidden",
                                marginTop: 8,
                            }}
                        >
                            <div
                                style={{
                                    width: `${p.progress * 100}%`,
                                    background: "#4caf50",
                                    height: 8,
                                }}
                            />
                        </div>
                    </div>
                ))}
        </main>
    );
};
export default Home;

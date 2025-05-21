import React from "react";

type StatCardProps = {
    title: string;
    value: number;
    variant?: "blue" | "black";
};

export const StatCard = ({ title, value, variant }: StatCardProps) => (
    <div
        style={{
            borderRadius: 6,
            padding: "0.3rem 0.9rem",
            margin: "0.5rem 0",
            background:
                variant === "blue"
                    ? "linear-gradient(56deg, rgba(3, 16, 255, 1) 0%, rgba(95, 104, 255, 1) 100%)"
                    : "#000000",
            minWidth: 100,
            display: "inline-block",
        }}
    >
        <div style={{ fontSize: "0.8rem", fontWeight: "bold", color: "white" }}>
            {title}
        </div>
        <div style={{ fontSize: "1.1rem", fontWeight: "bold", color: "white" }}>
            {value}
        </div>
    </div>
);

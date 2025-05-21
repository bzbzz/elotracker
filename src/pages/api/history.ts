// pages/api/history.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../utils/database";

// This API route is used to fetch the history of ELO ratings for all players
export default async function handler(
    _req: NextApiRequest,
    res: NextApiResponse<
        { username: string; data: { recorded: string; elo: number; progress: number }[] }[]
    >
) {
    const players = await db.player.findMany({
        include: { snapshots: { orderBy: { recorded: "asc" } } },
    });

    const formatted = players.map((p) => ({
        username: p.username,
        data: p.snapshots.map((s) => ({
            recorded: s.recorded.toISOString(),
            elo: s.elo,
            progress: s.progress,
        })),
    }));

    res.status(200).json(formatted);
}

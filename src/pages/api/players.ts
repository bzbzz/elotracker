// pages/api/players.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../utils/database";
import { getPlayerData } from "../../utils/chessApi";

export default async function handler(
    _req: NextApiRequest,
    res: NextApiResponse
) {
    const players = await db.player.findMany();
    const results = await Promise.all(
        players.map(async (p) => {
            const currentElo = await getPlayerData(p.username, p.mode);
            const progress =
                (currentElo - p.startingElo) / (p.goalElo - p.startingElo);
            const rest = p.goalElo - currentElo;

            return {
                username: p.username,
                startingElo: p.startingElo,
                goalElo: p.goalElo,
                mode: p.mode,
                currentElo,
                progress: Math.min(progress, 1),
                rest,
            };
        })
    );
    res.status(200).json(results);
}

// pages/api/snapshot.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../utils/database";
import { getPlayerData } from "../../utils/chessApi";

// This API route is used to create a snapshot of the ELO ratings for all players
export default async function handler(
    _req: NextApiRequest,
    res: NextApiResponse<{ count: number }>
) {
    const players = await db.player.findMany();
    let count = 0;

    for (const p of players) {
        const elo = await getPlayerData(p.username, p.mode);
        const progress = (elo - p.startingElo) / (p.goalElo - p.startingElo)

        await db.eloSnapshot.create({
            data: {
                playerId: p.id,
                elo,
                progress: Math.min(progress, 1),
            },
        });
        count++;
    }

    res.status(200).json({ count });
}

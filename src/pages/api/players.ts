import type { NextApiRequest, NextApiResponse } from "next";
import players from "@/data/players.json";
import { getPlayerData } from "@/utils/chessApi";

type Player = {
    username: string;
    starting_elo: number;
    goal_elo: number;
    mode: string;
    current_elo?: number;
    progress?: number;
};

export default async function handler(
    _req: NextApiRequest,
    res: NextApiResponse<Player[]>
) {
    const results = await Promise.all(
        players.map(async (p) => {
            const current_elo = await getPlayerData(p.username, p.mode);
            const progress =
                (current_elo - p.starting_elo) / (p.goal_elo - p.starting_elo);
            return {
                ...p,
                current_elo,
                progress: Math.min(Math.max(progress, 0), 1),
            };
        })
    );
    res.status(200).json(results);
}

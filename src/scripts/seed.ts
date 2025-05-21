// scripts/seed.ts
import { db } from '../utils/database'
import players from '../data/players.json'

async function main() {
  for (const p of players) {
    await db.player.upsert({
      where: { username: p.username },
      update: {},
      create: {
        username:    p.username,
        startingElo: p.starting_elo,
        goalElo:     p.goal_elo,
        mode:        p.mode,
      },
    })
  }
  console.log('Seed complete')
}
main()
  .catch(console.error)
  .finally(() => db.$disconnect())

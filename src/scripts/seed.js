// scripts/seed.js
const { PrismaClient } = require('@prisma/client')
const fs = require('fs')
const path = require('path')

async function main() {
  const prisma = new PrismaClient()
  const jsonPath = path.resolve(__dirname, '../data/players.json')
  const players = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'))

  for (const p of players) {
    await prisma.player.upsert({
      where: { username: p.username },
      update: {
        startingElo: p.starting_elo,
        goalElo:     p.goal_elo,
        mode:        p.mode,
      },
      create: {
        username:    p.username,
        startingElo: p.starting_elo,
        goalElo:     p.goal_elo,
        mode:        p.mode,
      },
    })
    console.log(`Upserted ${p.username}`)
  }

  await prisma.$disconnect()
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})

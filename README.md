# Elo Tracker
## Overview

[Elo Tracker](https://elotracker-beta.vercel.app/) is a WebApp to play a chess tournament with friends.  
I fetch everyone's elo from chess.com public API.  
On a new run, we collectively decide our elo goals.  
Every month, everyone adds 5$ to the pot.  
First player to reach his goal earns the pot.  
Start a new run.  
Every day at 03:00am I store a snapshot of the database.  

## Stack

- Typescript
- React.js
- Next.js
- Supabase
- Prisma 

## TODO

- Graphs based on the snapshot
- Notifications when the ranking changes, especially if someone catches you up.

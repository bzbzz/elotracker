import axios from 'axios'

export async function getPlayerData(username: string, mode: string): Promise<number> {
  try {
    const { data } = await axios.get(
      `https://api.chess.com/pub/player/${username}/stats`
    )
    return data[`chess_${mode}`]?.last?.rating ?? 0
  } catch {
    return 0
  }
}

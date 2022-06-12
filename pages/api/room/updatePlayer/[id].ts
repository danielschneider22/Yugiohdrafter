import { NextApiRequest, NextApiResponse } from "next";
import { RoomPlayer } from "../../../../constants/RoomPlayer";
import { connectToDatabase } from "../../../../mongodb";
import { getRoom } from "../[id]";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  let { collections } = await connectToDatabase();
  const roomId = (req.query.id as string)
  const playerId = req.body.player.ip + "-" + roomId
  const player: Partial<RoomPlayer> = {...req.body.player}
  
  await collections.roomPlayers?.updateOne({ id: playerId }, { $set: player }, {upsert: false})

  return await getRoom((req.query.id as string), res)
}
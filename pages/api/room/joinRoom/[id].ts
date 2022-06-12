import { NextApiRequest, NextApiResponse } from "next";
import { RoomPlayer } from "../../../../constants/RoomPlayer";
import { connectToDatabase } from "../../../../mongodb";
import { getRoom } from "../[id]";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  let { collections } = await connectToDatabase();
  const roomId = (req.query.id as string)
  
  const player: RoomPlayer = {
    id: req.body.player.ip + "-" + roomId,
    name: req.body.player.name,
    isHost: false,
    isReady: true,
    ip: req.body.player.ip,
    position: -1
  }

  const dbResult = await collections.roomPlayers?.updateOne({ id: player.id }, { $set: player }, {upsert: true})

  if (!dbResult?.acknowledged) {
    return res.status(500).json({ error: `Could not add player to list of players '.` })
  }

  const dbResult2 = await collections.rooms?.updateOne({id: roomId}, {$push: {roomPlayerIds: req.body.player.ip + "-" + roomId}})
  if (!dbResult2?.acknowledged) {
    return res.status(500).json({ error: `Could not add player to room '.` })
  }

  return await getRoom((req.query.id as string), res)
}
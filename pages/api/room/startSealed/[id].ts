import { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "../../../../mongodb";
import { removeNotReadyPlayers } from "../startDraft/[id]";
import { getRoom } from "../[id]";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  let { collections } = await connectToDatabase();
  const roomId = (req.query.id as string)

  let room = await collections.rooms?.findOne({id: roomId});
  if (!room)
    return res.status(500).json({ error: `Could not find room '.` })

  await removeNotReadyPlayers(room)

  const roomUpdates = {
    currLPBoosterId: room.boosterIdsLP[0],
    started: true
  }
  collections.rooms?.updateOne({id: roomId}, {$set: roomUpdates });

  return await getRoom((req.query.id as string), res)
}
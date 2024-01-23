import { WithId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import { Booster } from "../../../../constants/Booster";
import { Room } from "../../../../models/Room";
import { connectToDatabase } from "../../../../mongodb";
import { getRoom } from "../[id]";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  let { collections } = await connectToDatabase();
  const roomId = (req.query.id as string)
  const boostersNew: Booster[] = req.body.boostersDraft
  let room = await collections.rooms?.findOne({id: roomId});
  if (!room)
    return res.status(500).json({ error: `Could not find room '.` })

  await collections.boosters?.insertMany(boostersNew)
  collections.boosters?.deleteMany({ id: { $in: room.boosterIdsDraft } })

  const boosterIdsLPIdx = room.boosterIdsLP.findIndex((id) => id === room!.currLPBoosterId)
  const roomUpdates = {
    currLPBoosterId: room.boosterIdsLP[boosterIdsLPIdx + 1],
    boosterIdsDraft: boostersNew.map((booster) => booster.id),
  }
  collections.rooms?.updateOne({id: roomId}, {$set: roomUpdates });

  return await getRoom((req.query.id as string), res)
}
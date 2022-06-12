import { NextApiRequest, NextApiResponse } from "next";
import { RoomResultC } from "../../../contracts/RoomResultC";
import { connectToDatabase } from "../../../mongodb";
import { arrToState } from "../../../helpers/roomHelpers";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    switch (req.method) {
        case 'GET': {
            return await getRoom((req.query.id as string), res);
        }
    }
}

export async function getRoom(roomId: string, res: NextApiResponse) {
  let { collections } = await connectToDatabase();

  const room = await collections.rooms?.findOne({id: roomId});
  if(!room) 
    return res.status(500).json({ error: `Could not find room '.` })
  
  try {
    const roomPlayers = await collections.roomPlayers?.find({ id: { $in: room.roomPlayerIds } }).toArray()
    const boostersLP = await collections.boosters?.find({ id: { $in: room.boosterIdsLP } }).toArray()
    const customSets = await collections.cardSets?.find({ id: { $in: Array.from(new Set(boostersLP?.map((booster) => booster.cardSetName))) } }).toArray()
  
    const result: RoomResultC = {
      room,
      roomPlayers: arrToState(roomPlayers),
      boostersDraft: {allIds: [], byId: {}},
      boostersLP: arrToState(boostersLP),
      customSets: arrToState(customSets),
    }
    return res.json(result)
  } catch(e) {
    return res.status(500).json({ error: `Error creating room'.` })
  }
}
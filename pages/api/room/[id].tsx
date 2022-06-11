import { NextApiRequest, NextApiResponse } from "next";
import { RoomResultC } from "../../../contracts/RoomResultC";
import { connectToDatabase } from "../../../mongodb";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    switch (req.method) {
        case 'GET': {
            return getRoom(req, res);
        }
    }
}

async function getRoom(req: NextApiRequest, res: NextApiResponse) {
  let { collections } = await connectToDatabase();
  const roomId = (req.query.id as string)

  // @ts-ignore
  const room: WithId<Room> = await collections.rooms?.findOne({id: roomId});
  console.log(room)

  // const roomPlayers = roomPlayersForRoom(room)
  const result: RoomResultC = {
    room,
    roomPlayers: {allIds: [], byId: {}},
    boostersDraft: {allIds: [], byId: {}},
    boostersLP: {allIds: [], byId: {}},
    customSets: {allIds: [], byId: {}},
  }
  return res.json(result)

}
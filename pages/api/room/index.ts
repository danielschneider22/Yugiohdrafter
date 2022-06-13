import { withIronSessionApiRoute } from "iron-session/next";
import moment from "moment";
import { InsertManyResult, InsertOneResult } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import { Booster } from "../../../constants/Booster";
import { CardSet } from "../../../constants/CardSet";
import { RoomPlayer } from "../../../constants/RoomPlayer";
import { UserCookie } from "../../../constants/UserCookie";
import { RoomResultC } from "../../../contracts/RoomResultC";
import { ROOM_DEFAULT_EXPIRATION, unique4CharString } from "../../../helpers/roomHelpers";
import { Room } from "../../../models/Room";
import { connectToDatabase } from "../../../mongodb";
import { getRoom } from "./[id]";

export default withIronSessionApiRoute(async function handler(req: NextApiRequest, res: NextApiResponse) {
    switch (req.method) {
        case 'POST': {
            return addRoom(req, res);
        }
    }
}, UserCookie)

async function addRoom(req: NextApiRequest, res: NextApiResponse) {
  let { collections } = await connectToDatabase();

  const roomId = await unique4CharString(collections.rooms)
  if(!roomId) {
    return res.status(500).json({ error: `Could not create a room '.` })
  }

  const hostPlayer: RoomPlayer = {
    id: req.body.player.ip + "-" + roomId,
    name: req.body.player.name,
    isHost: true,
    isReady: true,
    ip: req.body.player.ip,
    position: -1
  }
  
  await collections.roomPlayers?.insertOne(hostPlayer)

  const boostersNew: Booster[] = req.body.boostersLP
  const customSetsNew: CardSet[] = req.body.customSets
  const roomNew: Room = {
    id: roomId,
    expires: (moment().add(ROOM_DEFAULT_EXPIRATION, 'minute').toString()) as any,
    boosterIdsLP: boostersNew.map((booster) => booster.id),
    roomPlayerIds: [hostPlayer.id],
    customSetIds: customSetsNew.map((set) => set.id),
    numPlayers: 8,
    started: false,
    format: req.body.format,
    boosterIdsRound: []
  }

  await collections.boosters?.insertMany(boostersNew)
  await collections.rooms?.insertOne(roomNew)

  return await getRoom(roomId, res)
}

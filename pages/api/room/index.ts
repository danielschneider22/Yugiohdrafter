import { withIronSessionApiRoute } from "iron-session/next";
import moment from "moment";
import { InsertManyResult, InsertOneResult } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import { Booster } from "../../../constants/Booster";
import { CardSet } from "../../../constants/CardSet";
import { RoomPlayer } from "../../../constants/RoomPlayer";
import { UserCookie } from "../../../constants/UserCookie";
import { RoomC } from "../../../contracts/RoomC";
import { RoomResultC } from "../../../contracts/RoomResultC";
import { ROOM_DEFAULT_EXPIRATION, unique4CharString } from "../../../helpers/roomHelpers";
import { Room } from "../../../models/Room";
import { connectToDatabase } from "../../../mongodb";

export default withIronSessionApiRoute(async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log("fish")
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
  
  let dbResult: InsertManyResult<any> | InsertOneResult<any> | undefined = await collections.roomPlayers?.insertOne(hostPlayer)
  if (!dbResult?.acknowledged) {
    return res.status(500).json({ error: `Could not add host player to room '.` })
  }

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

  dbResult = await collections.boosters?.insertMany(boostersNew)
  if (!dbResult?.acknowledged) {
    return res.status(500).json({ error: `Could not add boosters to db '.` })
  }

  dbResult = await collections.rooms?.insertOne(roomNew)
  if (!dbResult?.acknowledged) {
    return res.status(500).json({ error: `Could not create room '.` })
  }

  const result: RoomResultC = {
    room: roomNew,
    roomPlayers: {
      allIds: roomNew.roomPlayerIds,
      byId: { [hostPlayer.id]: hostPlayer },
    },
    boostersLP: {allIds: [], byId: {}}
  }
  res.json(result)
}

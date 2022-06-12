import { NextApiRequest, NextApiResponse } from "next";
import { Booster } from "../../../../constants/Booster";
import { CardPick } from "../../../../constants/CardPick";
import { RoomPlayer } from "../../../../constants/RoomPlayer";
import { Room } from "../../../../models/Room";
import { connectToDatabase } from "../../../../mongodb";
import { getRoom } from "../[id]";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  let { collections } = await connectToDatabase();
  const roomId = (req.query.id as string)
  
  const draftPicks: CardPick[] = req.body.draftPicks
  const room = await collections.rooms?.findOne({id: roomId}) as Room

  const boostersDraft = await collections.boosters?.find({ id: { $in: room.boosterIdsDraft } }).toArray() as Booster[]
  await draftPicks.forEach(async (pick) => {
    await removeCardFromBooster(boostersDraft, pick.cardId, pick.boosterId)
  })

  await updatePlayerPositions(room)

  return await getRoom((req.query.id as string), res)
}

async function removeCardFromBooster(boostersDraft: Booster[], cardId: string, boosterId: string) {
  let { collections } = await connectToDatabase();
  const cardIds = boostersDraft.find((booster) => booster.id === boosterId)?.cardIds
  cardIds?.splice(cardIds.findIndex((id) => id === cardId), 1)
  await collections.boosters?.updateOne({id: boosterId}, { $set: { cardIds }})

  // await collections.boosters?.updateOne({id: boosterId}, { $pull: { cardIds: cardId}})
}

async function updatePlayerPositions(room: Room) {
  let { collections } = await connectToDatabase();
  const boostersDraft = await collections.boosters?.find({ id: { $in: room.boosterIdsDraft } }).toArray() as Booster[]
  if(boostersDraft.every((booster) => booster.cardIds?.length === boostersDraft[0].cardIds?.length)) {
    const roomPlayers = await collections.roomPlayers?.find({ id: { $in: room.roomPlayerIds } }).toArray()
    await roomPlayers?.forEach(async (player) => {
      await collections.roomPlayers?.updateOne({id: player.id}, { $set: { position: player.position === room.numPlayers - 1 ? 0 : player.position + 1 }})
    })
    // await room.roomPlayerIds.forEach(async (id) => {

      // await collections.roomPlayers?.updateOne({id}, { $cond: { 
      //   if: { $eq: { position: room.numPlayers - 1 },
      //     then: 0, 
      //   else:
      //     { $inc: { position: 1}}}
      // }})
    // })
  }
}
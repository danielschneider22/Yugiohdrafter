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
  await removeNotReadyPlayers(room)
  room = await collections.rooms?.findOne({id: roomId}) as WithId<Room>;
  await assignPlayersPositions(room)

  const roomUpdates = {
    currLPBoosterId: room.boosterIdsLP[0],
    boosterIdsDraft: boostersNew.map((booster) => booster.id),
    started: true
  }
  collections.rooms?.updateOne({id: roomId}, {$set: roomUpdates });

  return await getRoom((req.query.id as string), res)
}


async function removeNotReadyPlayers(room: Room) {
  let { collections } = await connectToDatabase();
  await collections.roomPlayers?.deleteMany({ $and: [ { id: { $in: room.roomPlayerIds}}, { isReady: false } ] })
  return;
}

async function assignPlayersPositions(room: Room) {
  let { collections } = await connectToDatabase();

  const positionArray = [...room.roomPlayerIds]
  while(positionArray.length < 8) {
    positionArray.push("computer")
  }
  const shuffledArray = shuffleArray(positionArray)
  shuffledArray.forEach((id, idx) => {
    if(id !== "computer")
      collections.roomPlayers?.updateOne({ id }, { $set: { position: idx }})
  })
  return;
}

function shuffleArray(array: any[]) {
  let i = array.length - 1;
  for (; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
}
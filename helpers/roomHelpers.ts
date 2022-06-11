import { randomUUID } from "crypto";
import { Collection, ObjectId } from "mongodb";
import { Room } from "../models/Room";

// - global constants
export const ROOM_DEFAULT_EXPIRATION = 30 // 30 minutes
const RETRY_ID_COLLISIONS_NUM = 3 // even with 4-char strings, more than 3 collision is highly unlikely

export async function unique4CharString(roomCollection?: Collection<Room>) { // generate uuid and use first 4 characters
  for (let i = 0; i < RETRY_ID_COLLISIONS_NUM; i++) {
    const id = randomUUID().substring(0, 4); // 4 char  

    const matchedRooms = await roomCollection?.findOne({id});
    if (!matchedRooms) // no collision, return id
      return id
  }
   
  // - more collisions than allowed RETRY_ID_COLLISIONS_NUM, log error and return null
  console.error(`Error: 'unique4CharString' had more than ${RETRY_ID_COLLISIONS_NUM} collisions.`) 
  return undefined
}
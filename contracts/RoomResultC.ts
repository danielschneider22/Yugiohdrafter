import { Booster } from "../constants/Booster";
import { CardSet } from "../constants/CardSet";
import { RoomPlayer } from "../constants/RoomPlayer";
import { Room } from "../models/Room";
import { State } from "../models/State";

export interface RoomResultC {
  room: Room
  roomPlayers: State<RoomPlayer>
  boostersLP: State<Booster>
  customSets?: State<CardSet>
  boostersDraft?: State<Booster>
  currLPBooster?: string
}
import { RoomPlayer } from "../constants/RoomPlayer";
import { State } from "../models/State";
import { RoomC } from "./RoomC";

export interface RoomResultC {
  room: RoomC
  roomPlayers: State<RoomPlayer>
}
import moment from "moment";

export interface Room {
  expires: moment.Moment
  id: string,
  format: string,
  started: boolean,
  boosterIdsRound: string[],
  boosterIdsLP: string[],
  roomPlayerIds: string[],
  numPlayers: number,
  currLPBoosterId?: string,
  customSetIds?: string[]
}
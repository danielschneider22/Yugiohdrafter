import { RoomPlayer } from '../../constants/RoomPlayer';
import { ip } from '../../pages';
import { RoomAction } from '../data/rooms/actions';
import { RoomsActionTypes } from '../data/rooms/types';
import { DraftPodActions } from './actions';

export const draftPodInitialState = {
    numPlayers: 8,
    numBoosters: 5,
    cardsPerBooster: 9,
    currLPBoosterId: "",
    playerPosition: 0,
}

export default function draftPodReducer(state = draftPodInitialState, action: DraftPodActions | RoomAction) {
    switch (action.type) {
      case 'draftPod/initializeDraftPod': {
        //@ts-ignore
        const {numPlayers, numBoosters, cardsPerBooster, currLPBoosterId} = {...action}
        return {
          ...state,
          numPlayers,
          numBoosters,
          cardsPerBooster,
          currLPBoosterId
        }
      }
      case 'draftPod/updatePlayerPosition': {
        const playerPosition = state.playerPosition === state.numPlayers - 1 ? 0 : state.playerPosition + 1
        return {
          ...state,
          playerPosition
        }
      }
      case 'draftPod/openNextPack': {
        return {
          ...state,
          playerPosition: 0,
          currLPBoosterId: action.currLPBoosterId
        }
      }
      case RoomsActionTypes.ROOM_GET_FETCH_SUCCESS:
      case RoomsActionTypes.ROOMS_START_DRAFT_FETCH_SUCCESS:
      case RoomsActionTypes.ROOMS_MAKE_PICKS_FETCH_SUCCESS: // should fix this so we only use room player
          //@ts-ignore
          const playerPosition = Object.values(action.roomPlayers.byId).find((player: RoomPlayer) => player.id.includes(ip))?.position
          return {
            ...state,
            playerPosition,
            currLPBoosterId: action.room.currLPBoosterId
          }
      default:
        return state
    }
  }

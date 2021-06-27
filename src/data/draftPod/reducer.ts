import { DraftPodActions } from './actions';

export const draftPodInitialState = {
    numPlayers: 8,
    numBoosters: 5,
    cardsPerBooster: 9,
    currLPBoosterId: "",
    playerPosition: 0,
}

export default function draftPodReducer(state = draftPodInitialState, action: DraftPodActions) {
    switch (action.type) {
      case 'draftPod/initializeDraftPod': {
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
      default:
        return state
    }
  }

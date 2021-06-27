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
      default:
        return state
    }
  }

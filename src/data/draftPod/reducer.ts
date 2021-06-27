import { DraftPodActions } from './actions';

export const draftPodInitialState = {
    numPlayers: 8,
    numBoosters: 5,
    cardsPerBooster: 9,
    currBooster: 0,
    playerPosition: 0,
}

export default function draftPodReducer(state = draftPodInitialState, action: DraftPodActions) {
    switch (action.type) {
      case 'draftPod/initializeDraftPod': {
        const {numPlayers, numBoosters, cardsPerBooster} = {...action}
        return {
          ...state,
          numPlayers,
          numBoosters,
          cardsPerBooster,
        }
      }
      default:
        return state
    }
  }

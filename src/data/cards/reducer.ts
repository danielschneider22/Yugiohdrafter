import { Card } from '../../constants/Card';
import { CARDS_CACHE_KEY } from '../../constants/CARDS_CACHE_KEY';
import { State } from '../../models/State';
import { loadStateFromCache, setCache } from '../utils';
import { CardActions } from './actions';
import { CardTypes } from './types';

const cardsStateEmpty: State<Card> = {
    allIds: [] as string[],
    byId: {} as {[key: string]: Card}
}

export const cardsInitialState = loadStateFromCache<State<Card>>(CARDS_CACHE_KEY, cardsStateEmpty)

export default function cardsReducer(state = cardsInitialState, action: CardActions) {
    switch (action.type) {
      case CardTypes.AddCards: {
        const allIds = [] as string[]
        const byId = {} as {[key: string]: Card}
        action.cards.forEach((card) => {
            allIds.push(card.id)
            byId[card.id] = card
        })
        const newState = {
          ...state,
          allIds: [...new Set([...state.allIds, ...allIds])],
          byId: {...state.byId, ...byId},
        }
        setCache(CARDS_CACHE_KEY, newState)
        return newState
      }
      default:
        return state
    }
  }

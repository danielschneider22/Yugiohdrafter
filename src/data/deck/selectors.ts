import { initState } from '../reducers';

export const getDeck = (state: typeof initState) => state.deck.deckIds;

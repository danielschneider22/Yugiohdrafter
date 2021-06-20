import { initState } from '../reducers';

export const getDeck = (state: typeof initState) => state.deck.deckIds;
export const getSideboard = (state: typeof initState) => state.deck.sideboardIds;

import { initState } from "../reducers";

export const getCards = (state: typeof initState) => Object.values(state.cards.byId);
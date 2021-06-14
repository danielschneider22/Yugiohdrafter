import { initState } from "../reducers";

export const getCardSets = (state: typeof initState) => Object.values(state.cardSets.byId);
import { initState } from "../reducers";

export const getCardSets = (state: typeof initState) => Object.values(state.cardSets.byId);
export const getCardSetsById = (state: typeof initState) => state.cardSets.byId;
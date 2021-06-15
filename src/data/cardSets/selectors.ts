import { initState } from "../reducers";

export const getCardSetsById = (state: typeof initState) => state.cardSets.byId;
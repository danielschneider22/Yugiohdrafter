import { createSelector } from "reselect";
import { initState } from "../reducers";

export const getCardSetsById = (state: typeof initState) => state.cardSets.byId;

export const getCustomSets = createSelector([getCardSetsById], (cardSets) => {
    return Object.values(cardSets).filter((set) => set.custom_set)
})

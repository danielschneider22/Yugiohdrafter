import { createSelector } from "reselect";
import { getUserEmail } from "../login/selectors";
import { initState } from "../reducers";

export const getCardSetsById = (state: typeof initState) => state.cardSets.byId;

export const getCustomSets = createSelector([getCardSetsById], (cardSets) => {
    return Object.values(cardSets).filter((set) => set.custom_set)
})

// only return official card sets, and card sets authored by user
export const getCardSetsAuthoredByCurrUser = createSelector([getCardSetsById, getUserEmail], (cardSets, userEmail) => {
    return Object.values(cardSets).filter((set) => set.custom_set && set.author === userEmail) 
})

// only return official card sets, and card sets authored by user
export const getCardSetsAccessibleToCurrUser = createSelector([getCardSetsById, getUserEmail], (cardSets, userEmail) => {
    return Object.values(cardSets).filter((set) => !set.author || set.author === userEmail)
})

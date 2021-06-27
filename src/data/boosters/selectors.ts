import { createSelector } from "reselect";
import { getCardSetsById } from "../cardSets/selectors";
import { initState } from "../reducers";

export const getLandingPageBoosters = (state: typeof initState) => state.boosters.byId;
export const getLandingPageBoosterIds = (state: typeof initState) => state.boosters.allIds;

export const getDraftBoosters = (state: typeof initState) => state.draftPodBoosters.byId;
export const getDraftBoosterIds = (state: typeof initState) => state.draftPodBoosters.allIds;

export const getPackComplete = createSelector([getDraftBoosters], (draftBoosters) => {
    return !(Object.values(draftBoosters).some((booster) => booster.cardIds && booster.cardIds.length > 0))
})

export const getAllCardSetCardsFetched = createSelector([getLandingPageBoosters, getCardSetsById], (landingPageBoosters, cardSets) => {
    return Object.values(landingPageBoosters).every((booster) => cardSets[booster.cardSetName].card_ids && cardSets[booster.cardSetName].card_ids!.length > 0)
})


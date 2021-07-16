import { createSelector } from "reselect";
import { getCardSetsById } from "../cardSets/selectors";
import { getUserPlayerInfo } from "../data/roomPlayers.ts/selectors";
import { initState } from "../reducers";

export const getLandingPageBoosters = (state: typeof initState) => state.boosters.byId;
export const getLandingPageBoosterIds = (state: typeof initState) => state.boosters.allIds;

export const getDraftBoosters = (state: typeof initState) => state.draftPodBoosters.byId;
export const getDraftBoosterIds = (state: typeof initState) => state.draftPodBoosters.allIds;

export const getSortedLPBoosters = createSelector([getLandingPageBoosters, getLandingPageBoosterIds], (boosters, ids) => {
    return ids.map((id) => boosters[id])
})

export const getPackComplete = createSelector([getDraftBoosters], (draftBoosters) => {
    return !(Object.values(draftBoosters).some((booster) => booster.cardIds && booster.cardIds.length > 0))
})

export const getRoundComplete = createSelector([getDraftBoosters], (draftBoosters) => {
    return Object.values(draftBoosters).every((booster) => booster.cardIds && booster.cardIds.length === 0)
})

export const getAllCardSetCardsFetched = createSelector([getLandingPageBoosters, getCardSetsById], (landingPageBoosters, cardSets) => {
    return Object.values(landingPageBoosters).every((booster) => cardSets[booster.cardSetName] && cardSets[booster.cardSetName].card_ids && cardSets[booster.cardSetName].card_ids!.length > 0)
})

// you can only view a pack if your pack has the same or greater number of cards in it
export const canViewPack = createSelector([getDraftBoosters, getDraftBoosterIds, getUserPlayerInfo], (draftBoosters, boosterIds, player) => {
    if(player?.position === undefined || !boosterIds[player?.position!]) {
        return false
    }
    const myBoosterCount = draftBoosters[boosterIds[player?.position!]].cardIds?.length
    return Object.values(draftBoosters).every((booster) => booster.cardIds!.length <= myBoosterCount!)
})
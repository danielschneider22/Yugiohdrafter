import { createSelector } from "reselect";
import { getCardsById } from "../cards/selectors";
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

// for non custom boosters just make sure that the set has card ids
// for custom sets make sure all the cards have been fetched for that set
export const getAllCardSetCardsFetched = createSelector([getLandingPageBoosters, getCardSetsById, getCardsById], (landingPageBoosters, cardSets, cards) => {
    const checkedSets: string[] = []
    return Object.values(landingPageBoosters).every((booster) => {
        const boosterSet = booster.cardSetName
        const nonCustomBoosterCheck = cardSets[boosterSet] && cardSets[boosterSet].card_ids && cardSets[boosterSet].card_ids!.length > 0
        if(nonCustomBoosterCheck && cardSets[boosterSet].custom_set && !checkedSets.some((set) => set === boosterSet)){
            checkedSets.push(boosterSet)
            return cardSets[boosterSet].card_ids?.every((id) => cards[id])
        } else if(nonCustomBoosterCheck){
            return true
        }
        return false
    })
})

// you can only view a pack if your pack has the same or greater number of cards in it
export const canViewPack = createSelector([getDraftBoosters, getDraftBoosterIds, getUserPlayerInfo], (draftBoosters, boosterIds, player) => {
    if(player?.position === undefined || !boosterIds[player?.position!]) {
        return false
    }
    const myBoosterCount = draftBoosters[boosterIds[player?.position!]].cardIds?.length
    return Object.values(draftBoosters).every((booster) => booster.cardIds!.length <= myBoosterCount!)
})
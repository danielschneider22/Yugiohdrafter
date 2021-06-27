import { createSelector } from 'reselect';
import { getDraftBoosterIds, getDraftBoosters, getLandingPageBoosters } from '../boosters/selectors';
import { getCardsById } from '../cards/selectors';
import { initState } from '../reducers';

export const getNumPlayers = (state: typeof initState) => state.draftPod.numPlayers;
export const currLPBoosterId = (state: typeof initState) => state.draftPod.currLPBoosterId;
export const getPlayerPosition = (state: typeof initState) => state.draftPod.playerPosition;

export const getPositionBooster = createSelector([getPlayerPosition, getDraftBoosterIds, getDraftBoosters], (playerPosition, draftBoosterIds, draftBoosters) => {
    if(draftBoosterIds[playerPosition] === undefined || draftBoosters[draftBoosterIds[playerPosition]] === undefined || !draftBoosters[draftBoosterIds[playerPosition]].cardIds) {
        return undefined
    }
    return draftBoosters[draftBoosterIds[playerPosition]]
})

export const getCardsForPositionInDraft = createSelector([getPositionBooster, getCardsById], (positionBooster, cardsById) => {
    return positionBooster ? positionBooster.cardIds!.map((cardId) => cardsById[cardId]) : []
})



export const getCurrLPBooster = createSelector([currLPBoosterId, getLandingPageBoosters], (currLPBoosterId, landingPageBoosters) => {
    return landingPageBoosters[currLPBoosterId]
})
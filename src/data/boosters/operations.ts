import { Dispatch } from "react";
import { createBooster } from "../../components/SealedBoosterOpener/BoosterCreatorHelper";
import { Booster } from "../../constants/Booster";
import { Card } from "../../constants/Card";
import { CardSet } from "../../constants/CardSet";
import { addCards } from "../cards/actions";
import { addBooster, updateBooster } from "./actions";

export async function fetchCardsForBooster(dispatch: Dispatch<any>, set_name: string, boosterId: string) {
    const response = await fetch('https://db.ygoprodeck.com/queries/pack-opener/pack-open.php?format=' + set_name);
    let cards = await response.json();
    dispatch(addCards(cards.data as Card[]))
    dispatch(updateBooster(boosterId, {cardIds: cards.data.map((card: Card) => card.id)}, "landingPageBooster" ))
}
function generateCardsIdsForBooster(booster: Booster, cardSets: {[key: string]: CardSet}, cardsById: { [key: string]: Card }) {
  const cardSetIds = cardSets[booster.cardSetName].card_ids!
  const cardSetCards = cardSetIds.map((card_id) => cardsById[card_id]).filter((card) => !!card)
  return createBooster(cardSetCards, cardSets[booster.cardSetName]).map((card) => card.id)
}

export function createBoostersForFetchedSets(
    boosters: {[key: string]: Booster},
    cardSets: {[key: string]: CardSet},
    cardsById: { [key: string]: Card },
    dispatch: Dispatch<any>
) {
    const boosterCardIds: string[] = []
    Object.values(boosters).forEach((booster) => {
      if(!booster.cardIds && cardSets[booster.cardSetName].card_ids) {
        const randomCardIds = generateCardsIdsForBooster(booster, cardSets, cardsById)
        dispatch(updateBooster(booster.id, {cardIds: randomCardIds}, "landingPageBooster" ))
        boosterCardIds.push(...randomCardIds)
      }
    })
    return boosterCardIds
  }

  export function createDraftBoostersForRound(
    booster: Booster,
    cardSets: {[key: string]: CardSet},
    cardsById: { [key: string]: Card },
    numPlayers: number,
    dispatch: Dispatch<any>
) {
    for(let i = 0; i < numPlayers; i++) {
      if(!booster.cardIds && cardSets[booster.cardSetName].card_ids) {
        const randomCardIds = generateCardsIdsForBooster(booster, cardSets, cardsById)
        const newBooster: Booster = {
          cardSetName: booster.cardSetName,
          id: booster.id + "(Position: " + i + ")",
          cardIds: randomCardIds
        }
        dispatch(addBooster(newBooster, "draftBooster" ))
      }
    }
  }
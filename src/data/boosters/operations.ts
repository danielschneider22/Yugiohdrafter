import { Dispatch } from "react";
import { createBooster } from "../../components/SealedBoosterOpener/BoosterCreatorHelper";
import { Booster } from "../../constants/Booster";
import { Card } from "../../constants/Card";
import { CardSet } from "../../constants/CardSet";
import { addCards } from "../cards/actions";
import { updateBooster } from "./actions";

export async function fetchCardsForBooster(dispatch: Dispatch<any>, set_name: string, boosterId: string) {
    const response = await fetch('https://db.ygoprodeck.com/queries/pack-opener/pack-open.php?format=' + set_name);
    let cards = await response.json();
    dispatch(addCards(cards.data as Card[]))
    dispatch(updateBooster(boosterId, {cardIds: cards.data.map((card: Card) => card.id)} ))
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
        const cardSetIds = cardSets[booster.cardSetName].card_ids!
        const cardSetCards = cardSetIds.map((card_id) => cardsById[card_id]).filter((card) => !!card)
        const randomCardIds = createBooster(cardSetCards, booster.cardSetName).map((card) => card.id)
        dispatch(updateBooster(booster.id, {cardIds: randomCardIds} ))
        boosterCardIds.push(...randomCardIds)
      }
    })
    return boosterCardIds
  }
import { Dispatch } from "react";
import { Booster } from "../../constants/Booster";
import { Card, RarityDict, VisibleCard } from "../../constants/Card";
import { CardSet } from "../../constants/CardSet";
import { updateCardIds } from "../cardSets/actions";
import { addCards } from "./actions";
import { fetchCards, fetchCardsById } from "./operations";

export type SortType = "Name" | "Type" | "Rarity";

export function findHighestRarity(card: VisibleCard | Card) {
    let highestRarity = 0
    card.card_sets.forEach((set) => {
      const rarityVal = RarityDict[set.set_rarity]
      if(rarityVal > highestRarity) {
        highestRarity = rarityVal
      }
    })
    return highestRarity
}

function sortByName(a: VisibleCard | Card, b: VisibleCard | Card) {
  const nameA = a.name.toUpperCase(); // ignore upper and lowercase
  const nameB = b.name.toUpperCase(); // ignore upper and lowercase
  if (nameA < nameB) {
    return -1;
  }
  if (nameA > nameB) {
    return 1;
  }

  // names must be equal
  return 0;
}

export function sortByRarity(a: VisibleCard | Card, b: VisibleCard | Card) {
  const aHighestRarity = findHighestRarity(a)
  const bHighestRarity = findHighestRarity(b)
  const diff = bHighestRarity - aHighestRarity
  return diff !== 0 ? diff : sortByName(a, b)
}

export const sortCards = (sortType: SortType) => function(a: VisibleCard, b: VisibleCard){
    switch(sortType){
      case "Name":
        return sortByName(a, b)
      case "Type":
        const typeA = a.type.toUpperCase(); // ignore upper and lowercase
        const typeB = b.type.toUpperCase(); // ignore upper and lowercase
        if (typeA < typeB) {
          return -1;
        }
        if (typeA > typeB) {
          return 1;
        }
        return sortByName(a, b);
      case "Rarity":
        // this is actually wrong. should probably look up the set it's talking about to be accurate but skipping for now
        return sortByRarity(a, b)
    }
  }

export const isExtraDeckCard = (card: Card | VisibleCard) => {
  return card.type.includes("XYZ Monster") || card.type.includes("Fusion Monster") || card.type.includes("Synchro Monster")|| card.type.includes("Link Monster")
}

export function getSetsForBoosters(boosters: Booster[], dispatch: Dispatch<any>, cardSetsById: {[id: string]: CardSet}) {
  const fetchedSets = {} as {[key: string]: string}
  boosters.forEach((booster) => {
    if(!fetchedSets[booster.cardSetName]) {
      const cardsOfSet = localStorage.getItem(booster.cardSetName);
      if(cardsOfSet) {
        const cards: Card[] = JSON.parse(cardsOfSet)
        dispatch(addCards(cards))
        dispatch(updateCardIds(cards.map((card) => card.id), booster.cardSetName, "overwrite"))
      } else if(cardSetsById[booster.cardSetName] && cardSetsById[booster.cardSetName].custom_set){
        const set = cardSetsById[booster.cardSetName]
        fetchCardsById(dispatch, set.card_ids!, set.id)
      } else {
        fetchCards(dispatch, booster.cardSetName);
      }
      fetchedSets[booster.cardSetName] = booster.cardSetName
    }
  })
}

export function getSetCards(set: CardSet, dispatch: Dispatch<any>) {
    const cardsOfSet = localStorage.getItem(set.id);
    if(cardsOfSet) {
      const cards: Card[] = JSON.parse(cardsOfSet)
      dispatch(addCards(cards))
      dispatch(updateCardIds(cards.map((card) => card.id), set.id, "overwrite"))
    } else if(!set.custom_set) {
      fetchCards(dispatch, set.set_name);
    }
}
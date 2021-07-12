import { Dispatch } from "react";
import { Booster } from "../../constants/Booster";
import { Card } from "../../constants/Card";
import { CardPick } from "../../constants/CardPick";
import { removeCardFromBooster } from "../../data/boosters/actions";
import { findHighestRarity, isExtraDeckCard, sortByRarity } from "../../data/cards/utils";
import { getRandomCardFromArray } from "../SealedBoosterOpener/BoosterCreatorHelper";

function aiBoosterPick(booster: Booster, cardsById: {[key: string]: Card}) {
    const cards = booster.cardIds!.map((cardId) => cardsById[cardId]).sort(sortByRarity)
    if(findHighestRarity(cards[0]) === 0) {
        let highestAttack = 0
        let cardId = ""
        cards.forEach((card) => {
            if(card.type.includes("Monster") && !isExtraDeckCard(card) && card.level! <= 4 && card.atk! >= highestAttack){
                highestAttack = card.atk!
                cardId = card.id
            }
        })
        return cardId || getRandomCardFromArray(cards, cards).id
    } else {
        return cards[0].id
    }
}

export function makeAIPicks(playerPositions: number[], draftBoosters: {[key: string]: Booster}, draftBoosterIds: string[], cardsById: {[key: string]: Card}) {
    const cardPicks: CardPick[] = []
    draftBoosterIds.forEach((id: string, idx: number) => {
        if(!playerPositions.includes(idx)) {
            const booster = draftBoosters[id]
            const cardId = aiBoosterPick(booster, cardsById)
            cardPicks.push({boosterId: id, cardId})
        }
    })
    return cardPicks
}

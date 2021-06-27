import { Card } from "../../constants/Card";

export function getRandomCardFromArray(cards: Card[], allCards: Card[]) {
    if(cards.length > 0) {
        const random = Math.floor(Math.random() * cards.length);
        return cards[random];
    } else {
        const random = Math.floor(Math.random() * allCards.length);
        return allCards[random];
    }
    
}

export function createBooster(cardsOfSet: Card[], set_name: string) {
    const commonCards = cardsOfSet.filter((card) => card.card_sets.find((set) => set.set_name === set_name)?.set_rarity === "Common")
    const rareCards = cardsOfSet.filter((card) => card.card_sets.find((set) => set.set_name === set_name)?.set_rarity === "Rare")
    const ultraRare = cardsOfSet.filter((card) => card.card_sets.find((set) => set.set_name === set_name)?.set_rarity === "Ultra Rare")
    const secretRare = cardsOfSet.filter((card) => card.card_sets.find((set) => set.set_name === set_name)?.set_rarity === "Secret Rare")
    const superRare = cardsOfSet.filter((card) => card.card_sets.find((set) => set.set_name === set_name)?.set_rarity === "Super Rare")

    const cards: Card[] = []
    for(let i = 0; i < 7; i++){
        cards.push(getRandomCardFromArray(commonCards, cardsOfSet))
    }
    cards.push(getRandomCardFromArray(rareCards, cardsOfSet));
    const randomProportion = Math.random();
    if(randomProportion <= 1/12) {
        cards.push(getRandomCardFromArray(secretRare, cardsOfSet));
    } else if (randomProportion <= 1/6) {
        cards.push(getRandomCardFromArray(ultraRare, cardsOfSet));
    } else {
        cards.push(getRandomCardFromArray(superRare, cardsOfSet));
    }
    return cards;
}
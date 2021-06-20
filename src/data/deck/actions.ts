export interface AddCardToDeck {
    type: 'deck/addCardToDeck',
    cardId: string
}

export function addCardToDeck(cardId: string) {
    return {
        type: 'deck/addCardToDeck',
        cardId,
    }
}

export interface AddCardsToSideboard {
    type: 'deck/addCardsToSideboard',
    cardIds: string[]
}

export function addCardsToSideboard(cardIds: string[]) {
    return {
        type: 'deck/addCardsToSideboard',
        cardIds,
    }
}

export interface DeckToSideboard {
    type: 'deck/deckToSideboard',
    cardId: string,
    arrayNum?: number
}

export function deckToSideboard(cardId: string, arrayNum?: number) {
    return {
        type: 'deck/deckToSideboard',
        cardId,
        arrayNum
    }
}

export interface SideboardToDeck {
    type: 'deck/sideboardToDeck',
    cardId: string
    arrayNum?: number
}

export function sideboardToDeck(cardId: string, arrayNum?: number) {
    return {
        type: 'deck/sideboardToDeck',
        cardId,
        arrayNum
    }
}

export interface ResetDeckAndSideboard {
    type: 'deck/resetDeckAndSideboard',
}

export function resetDeckAndSideboard() {
    return {
        type: 'deck/resetDeckAndSideboard',
    }
}

export type DeckActions = AddCardToDeck | DeckToSideboard | SideboardToDeck | ResetDeckAndSideboard | AddCardsToSideboard;

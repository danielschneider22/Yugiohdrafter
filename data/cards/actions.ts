import { Card } from "../../constants/Card";
import { CardTypes } from "./types";


interface AddCards {
    type: string,
    cards: Card[]
}

export function addCards(cards: Card[]) {
    return {
        type: CardTypes.AddCards,
        cards,
    }
}

export type CardActions = AddCards;
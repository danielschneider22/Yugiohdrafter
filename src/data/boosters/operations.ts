import { Dispatch } from "react";
import { Card } from "../../constants/Card";
import { addCards } from "../cards/actions";
import { updateBooster } from "./actions";

export async function fetchCardsForBooster(dispatch: Dispatch<any>, set_name: string, boosterId: string) {
    const response = await fetch('https://db.ygoprodeck.com/queries/pack-opener/pack-open.php?format=' + set_name);
    let cards = await response.json();
    dispatch(addCards(cards.data as Card[]))
    dispatch(updateBooster(boosterId, {cardIds: cards.data.map((card: Card) => card.id)} ))
}
import { Dispatch } from "react";
import { Card } from "../../constants/Card";
import { CardSet } from "../../constants/CardSet";

export async function fetchCards(dispatch: Dispatch<any>, set_code: string) {
    const response = await fetch('https://db.ygoprodeck.com/api/v7/cardinfo.php?cardset=metal%20raiders');
    let cards: Card[] = await response.json();
    // dispatch(addSets(sets))
}
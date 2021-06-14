import { Dispatch } from "react";
import { addSets } from "./actions";

export interface CardSet{
    set_name: string,
    set_code: string,
    num_of_cards: number,
    tcg_date: string
}

export async function fetchCardSets(dispatch: Dispatch<any>) {
    const response = await fetch('https://db.ygoprodeck.com/api/v7/cardsets.php');
    let sets: CardSet[] = await response.json();
    sets = sets.filter((set) => {
        return set.num_of_cards > 50;
    });
    localStorage.setItem("cardSets", JSON.stringify(sets));
    dispatch(addSets(sets))
}
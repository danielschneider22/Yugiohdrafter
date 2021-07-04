import { Dispatch } from "react";
import { CardSet } from "../../constants/CardSet";
import { getJSONWithErrorHandling } from "../../helpers/errorHandling";
import { addSets } from "./actions";

export async function fetchCardSets(dispatch: Dispatch<any>) {
    const response = await fetch('https://db.ygoprodeck.com/api/v7/cardsets.php');
    let sets: CardSet[] = await getJSONWithErrorHandling(response, dispatch, "Card Sets Could Not Be Pulled", "Error")

    sets = sets.filter((set) => {
        return set.num_of_cards > 50;
    });
    dispatch(addSets(sets))
}
import _ from "lodash";
import { Dispatch } from "react";
import { Card } from "../../constants/Card";
import { toastBGColorDict } from "../../constants/Toast";
import { getJSONWithErrorHandling } from "../../helpers/errorHandling";
import { updateCardIds } from "../cardSets/actions";
import { addToast } from "../toasts/actions";
import { addCards } from "./actions";

export async function fetchCards(dispatch: Dispatch<any>, set_name: string) {
    const response = await fetch('https://db.ygoprodeck.com/api/v7/cardinfo.php?cardset=' + set_name)
    const cards = await getJSONWithErrorHandling(response, dispatch, "Please try a Different Set", "Set Selection Failed")

    if(cards) {
        dispatch(addCards(cards.data as Card[]))
        dispatch(updateCardIds(cards.data as Card[], set_name))
        localStorage.setItem(set_name, JSON.stringify(cards.data));
    }
    
}

function separateIntoBlocks(names: string[]){
    const blocks = []
    let currBlock = ""
    names.forEach((name) => {
        if(currBlock.length + name.length + 1 > 1120){
            blocks.push(currBlock)
            currBlock = name
        } else {
            currBlock = currBlock === "" ? name : currBlock + "|" + name
        }
    })
    blocks.push(currBlock)
    return blocks
}

function toastFailedCards(dispatch: Dispatch<any>, names: string[], fullCardList: Card[]) {
    let missingNames = ""
    names.forEach((name) => {
        if(!fullCardList.some((card) => card.name === name)) {
            missingNames = missingNames + " " + name
        }
    })
    if(missingNames) {
        console.warn("Missing Cards: " + missingNames)
        dispatch(addToast({id: _.uniqueId("error-"), type: "Danger", description: missingNames, title: "Cards not Found", backgroundColor: toastBGColorDict["Danger"]}))
    }
}
function removeSpecialChars(names: string[]){
    return names.map((name) => name.replace("#", "%23"))
}

export async function fetchCardsByName(dispatch: Dispatch<any>, names: string[], setId: string) {
    const namesNoSpecialChars = removeSpecialChars(names)
    const blocks = separateIntoBlocks(namesNoSpecialChars)
    console.log(blocks)
    const fullCardList: Card[] = []
    for(const block of blocks) {
        const response = await fetch('https://db.ygoprodeck.com/api/v7/cardinfo.php?name=' + block);
        const cards = await getJSONWithErrorHandling(response, dispatch, "Please check card list", "Invalid Card Name")
        if(cards) {
            fullCardList.push(...cards.data)
        } else {
            return false
        }
    }
    toastFailedCards(dispatch, names, fullCardList)
    dispatch(addCards(fullCardList))
    dispatch(updateCardIds(fullCardList, setId))
    localStorage.setItem(setId, JSON.stringify(fullCardList))
    return true
    
}

export async function fetchCardsById(dispatch: Dispatch<any>, ids: (string | number)[], set_name: string) {
    const sortedIds = ids.sort((a, b) => Number(a) - Number(b))
    const response = await fetch('https://db.ygoprodeck.com/api/v7/cardinfo.php?id=' + sortedIds.join(","));
    const cards = await getJSONWithErrorHandling(response, dispatch, "Please check card list", "Invalid Card Name")

    if(cards) {
        dispatch(addCards(cards.data as Card[]))
        dispatch(updateCardIds(cards.data as Card[], set_name))
        localStorage.setItem(set_name, JSON.stringify(cards.data));
    }
    
}
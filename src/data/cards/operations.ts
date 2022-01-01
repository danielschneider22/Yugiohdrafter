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
    const cardsC = await getJSONWithErrorHandling(response, dispatch, "Please try a Different Set", "Set Selection Failed")

    if(cardsC) {
        const cards: Card[] = cardsC.data
        dispatch(addCards(cards))
        dispatch(updateCardIds(cards.map((card) => card.id), set_name, "overwrite"))
        localStorage.setItem(set_name, JSON.stringify(cards));
    }
    
}

function separateIntoBlocks(names: string[], delimiter?: string){
    const blocks = []
    let currBlock = ""
    names.forEach((name) => {
        if(currBlock.length + name.length + 1 > 1120){
            blocks.push(currBlock)
            currBlock = name
        } else {
            currBlock = currBlock === "" ? name : currBlock + (delimiter || "|") + name
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

export async function fetchCardsByName(dispatch: Dispatch<any>, names: string[], setId: string, addOrOverwrite: "add" | "overwrite") {
    const namesNoSpecialChars = removeSpecialChars(names)
    const blocks = separateIntoBlocks(namesNoSpecialChars)
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
    dispatch(updateCardIds(fullCardList.map((card) => card.id), setId, addOrOverwrite))
    localStorage.setItem(setId, JSON.stringify(fullCardList))
    return true
}

export async function fetchCardsById(dispatch: Dispatch<any>, ids: string[], setId: string) {
    const blocks = separateIntoBlocks(ids, ",")
    const fullCardList: Card[] = []
    for(const block of blocks) {
        const response = await fetch('https://db.ygoprodeck.com/api/v7/cardinfo.php?id=' + block);
        const cards = await getJSONWithErrorHandling(response, dispatch, "Please check card list", "Invalid Card Name")
        if(cards) {
            fullCardList.push(...cards.data)
        } else {
            return false
        }
    }
    dispatch(addCards(fullCardList))
    return true
    
}

export async function fetchCardsByFuzzyName(dispatch: Dispatch<any>, fuzzyName: string) {
    const response = await fetch('https://db.ygoprodeck.com/api/v7/cardinfo.php?fname=' + fuzzyName)
    const cardsC = await getJSONWithErrorHandling(response, dispatch, "Please try a Different Set", "Set Selection Failed")

    if(cardsC) {
        const cards: Card[] = cardsC.data
        dispatch(addCards(cards))
        // dispatch(updateCardIds(cards.map((card) => card.id), set_name, "overwrite"))
        // localStorage.setItem(set_name, JSON.stringify(cards));
    }
    
}
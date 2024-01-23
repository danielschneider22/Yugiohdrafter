import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CardSet } from "../../../constants/CardSet";
import { fetchCardsByFuzzyName } from "../../../data/cards/operations";
import { getCardsById } from "../../../data/cards/selectors";
import { updateCardIds } from "../../../data/cardSets/actions";
import AddRemoveCards from "../AddRemoveCards/AddRemoveCards";
import CardAutocomplete, { AutocompleteOption } from "../AddRemoveCards/CardAutocomplete";

import styles from "../CustomSetBuilder.module.css"

interface ParentParams {
    currSet: CardSet
}

function ViewEditList(params: ParentParams) {
    const { currSet } = { ...params }
    const dispatch = useDispatch();
    const cards = useSelector(getCardsById);

    const [removeActiveOption, setRemoveActiveOption] = useState<AutocompleteOption | null>(null);
    const [addActiveOption, setAddActiveOption] = useState<AutocompleteOption | null>(null);
    const [addInputVal, setAddInputVal] = useState("");
    const [prevValidSearches,] = useState(new Set<string>());

    const addFilteredCards = Object.values(cards).filter((card) => card.name.toLowerCase().includes(addInputVal.toLowerCase()))
    const addOptions = addFilteredCards.map((card) => {return {label: card.name, id: card.id}})

    useEffect(() => {
        if(addInputVal.length > 2) {
            const firstThreeLetters = addInputVal.substring(0, 3)
            if(!prevValidSearches.has(firstThreeLetters.toLowerCase())) {
                prevValidSearches.add(addInputVal.toLowerCase())
                fetchCardsByFuzzyName(dispatch, firstThreeLetters)
            }
            
        }
    }, [addInputVal, dispatch, prevValidSearches])

    const options = currSet?.card_ids?.map((id) => {
        return { id, label: cards[id].name };
    }) || []

    function addCardtoSet() {
        if (addActiveOption) {
            dispatch(updateCardIds([addActiveOption.id], currSet!.id, "add", cards));
            setAddActiveOption(null)
            setAddInputVal("")
        }

    }

    function removeCardFromSet() {
        if (removeActiveOption) {
            const newCards = currSet!.card_ids!.filter(
                (id) => id !== removeActiveOption.id
            );
            dispatch(updateCardIds(newCards, currSet!.id, "overwrite", cards));
            setRemoveActiveOption(null)
        }
    }

    return (
        <>
            <span style={{marginTop: "30px"}} />
            <CardAutocomplete
                id={"add-autocomplete"}
                label={"Search a Card to Add"}
                options={addOptions}
                setActiveOption={setAddActiveOption}
                activeOption={addActiveOption}
                margin={"10 5 2 0"}
                setCurrInputVal={setAddInputVal}
            />
            <span
                className={`input-group-text btn btn-primary ${styles["add-card-button"]}`}
                id="inputGroup-sizing-sm"
                onClick={addCardtoSet}
            >
                Add Card
            </span>
            <CardAutocomplete
                id={"remove-autocomplete"}
                label={"Search a Card to Remove"}
                options={options}
                setActiveOption={setRemoveActiveOption}
                activeOption={removeActiveOption}
            />
            <span
                className="input-group-text btn btn-danger"
                id="inputGroup-sizing-sm"
                onClick={removeCardFromSet}
            >
                Remove Card
            </span>
            <AddRemoveCards setShown={currSet!} setEffected={currSet!} />
        </>
    );
}

export default ViewEditList;


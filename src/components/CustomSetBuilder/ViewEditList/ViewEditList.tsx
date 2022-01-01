import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CardSet } from "../../../constants/CardSet";
import { getCardsById } from "../../../data/cards/selectors";
import { updateCardIds } from "../../../data/cardSets/actions";
import AddRemoveCards from "../AddRemoveCards/AddRemoveCards";
import CardAutocomplete, { AutocompleteOption } from "../AddRemoveCards/CardAutocomplete";

interface ParentParams {
    currSet: CardSet
}

function ViewEditList(params: ParentParams) {
    const { currSet } = { ...params }
    const dispatch = useDispatch();
    const cards = useSelector(getCardsById);

    const [removeActiveOption, setRemoveActiveOption] = useState<AutocompleteOption | null>(null);
    const [addActiveOption, setAddActiveOption] = useState<AutocompleteOption | null>(null);

    const options = currSet!.card_ids
        ? currSet!.card_ids.map((id) => {
            return { id, label: cards[id].name };
        })
        : [];

    function addCardtoSet() {
        if (addActiveOption) {
            dispatch(updateCardIds([addActiveOption.id], currSet!.id, "add"));
        }

    }

    function removeCardFromSet() {
        if (removeActiveOption) {
            const newCards = currSet!.card_ids!.filter(
                (id) => id !== removeActiveOption.id
            );
            dispatch(updateCardIds(newCards, currSet!.id, "overwrite"));
            setRemoveActiveOption(null)
        }
    }

    return (
        <>
            <span style={{marginTop: "30px"}} />
            <CardAutocomplete
                id={"add-autocomplete"}
                label={"Card to Add"}
                options={[]}
                setActiveOption={setAddActiveOption}
                activeOption={addActiveOption}
            />
            <span
                className="input-group-text btn btn-success add-card-button"
                id="inputGroup-sizing-sm"
                onClick={addCardtoSet}
            >
                Add Card
            </span>
            <CardAutocomplete
                id={"remove-autocomplete"}
                label={"Card to Remove"}
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


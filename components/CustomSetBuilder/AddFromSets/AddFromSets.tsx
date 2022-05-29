import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Booster } from "../../../constants/Booster";
import { CardSet } from "../../../constants/CardSet";
import { getCardSetsById } from "../../../data/cardSets/selectors";
import BoosterSelect from "../../BoosterPicker/BoosterSelect";
import { v4 as uuidv4 } from 'uuid';
import AddRemoveCards from "../AddRemoveCards/AddRemoveCards";
import { getSetCards } from "../../../data/cards/utils";
import { getUserEmail } from "../../../data/login/selectors";


interface ParentParams {
    setEffected: CardSet,
}

function AddFromSets(params: ParentParams) {
    const dispatch = useDispatch()
    const { setEffected } = { ...params }

    const cardSetById = useSelector(getCardSetsById)
    const userEmail = useSelector(getUserEmail)
    const cardSets = Object.values(cardSetById).filter((set) => !set.author || set.author === userEmail)
    const [booster, setBooster] = useState({ cardSetName: "", id: "booster-" + uuidv4() } as Booster)
    const setShown = {...cardSetById[booster.cardSetName]}

    function boosterChanged(id: string, val: string) {
        setBooster({ ...booster, cardSetName: val })
        getSetCards(cardSetById[val], dispatch)
    }

    // setShown.card_ids = setShown.card_ids ? setShown.card_ids.filter((id) => !setEffected.card_ids?.find((i) => i === id)) : []

    return (
        <div>
            <BoosterSelect
                cardSets={cardSets}
                boosterNum={0}
                boosterChanged={boosterChanged}
                booster={booster}
                key={0}
                sideText={"Set Name"}
                customStyle={{margin: 0, padding: 0, borderLeft: ".5px solid #8888885c"}}
                hideRemoveButton
            />
            {setShown &&
                <AddRemoveCards
                    setEffected={setEffected}
                    setShown={setShown}
                />
            }

        </div>


    );
}

export default AddFromSets;

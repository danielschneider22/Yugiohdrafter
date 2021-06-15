import _ from "lodash";
import { useDispatch, useSelector } from "react-redux";
import { addBooster, updateBooster } from "../../data/boosters/actions";
import { getBoosters, getBoosterIds } from "../../data/boosters/selectors";
import { getCardSetsById } from "../../data/cardSets/selectors";
import BoosterSelect from "./BoosterSelect";

function BoosterChooserArea() {
  const dispatch = useDispatch();
  const cardSets = Object.values(useSelector(getCardSetsById));
  const boosters = useSelector(getBoosters)
  const boosterIds = useSelector(getBoosterIds)

  function boosterChanged(id: string, val: string) {
    dispatch(updateBooster(id, {cardSetName: val}))
  }

  function addBoosterButtonClick() {
    dispatch(addBooster({cardSetName: cardSets[0].set_name, id: _.uniqueId("booster-")}))
  }

  return (
    <div className={"ChooserArea"}>
      {
        boosterIds.map((boosterId, idx) => {
          return (
            <BoosterSelect 
              cardSets={cardSets}
              boosterNum={idx}
              boosterChanged={boosterChanged}
              booster={boosters[boosterId]}
              key={idx}
            />
          )
        })
      }
      <button className="AddBoosterButton" onClick={addBoosterButtonClick}>Add Booster</button>
  </div>
  );
}

export default BoosterChooserArea;

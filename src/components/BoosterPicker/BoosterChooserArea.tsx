import _ from "lodash";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addBooster, updateBooster } from "../../data/boosters/actions";
import { getLandingPageBoosterIds, getLandingPageBoosters } from "../../data/boosters/selectors";
import { getCardSetsById } from "../../data/cardSets/selectors";
import BoosterSelect from "./BoosterSelect";

function BoosterChooserArea() {
  const dispatch = useDispatch();
  const cardSets = Object.values(useSelector(getCardSetsById));
  const boosters = useSelector(getLandingPageBoosters)
  const boosterIds = useSelector(getLandingPageBoosterIds)
  const scrollableArea = useRef(null as unknown as HTMLDivElement)

  function boosterChanged(id: string, val: string) {
    dispatch(updateBooster(id, {cardSetName: val}, "landingPageBooster"))
  }

  function addBoosterButtonClick() {
    dispatch(addBooster({cardSetName: boosters[boosterIds[boosterIds.length - 1]].cardSetName, id: _.uniqueId("booster-")}, "landingPageBooster"))
    setTimeout(() => {
      scrollableArea.current.scrollTop = scrollableArea.current.scrollHeight;
    })
    
  }

  return (
    <div>
      <div className="AddBoosterButton btn btn-info d-flex justify-content-center" onClick={addBoosterButtonClick} >Add Booster</div>
      <div ref={scrollableArea} className={"BoostersWrapper"}>
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
      </div>
  </div>
  );
}

export default BoosterChooserArea;

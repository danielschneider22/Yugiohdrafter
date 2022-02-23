import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addBooster, updateBooster } from "../../data/boosters/actions";
import { getLandingPageBoosterIds, getLandingPageBoosters } from "../../data/boosters/selectors";
import { getCardSetsAccessibleToCurrUser } from "../../data/cardSets/selectors";
import BoosterSelect from "./BoosterSelect";
import { v4 as uuidv4 } from 'uuid';
import { sortCardSet } from "../../data/cardSets/utils";

function BoosterChooserArea() {
  const dispatch = useDispatch()
  const cardSets = Object.values(useSelector(getCardSetsAccessibleToCurrUser))
  const boosters = useSelector(getLandingPageBoosters)
  const boosterIds = useSelector(getLandingPageBoosterIds)
  const scrollableArea = useRef(null as unknown as HTMLDivElement)

  // add a booster if booster list is empty
  useEffect(() => {
    if(boosterIds.length === 0 && cardSets.length > 0) {
        dispatch(addBooster({cardSetName: cardSets.sort(sortCardSet)[0].id, id: "booster-" + uuidv4()}, "landingPageBooster"))
    }
  }, [cardSets, boosters, boosterIds.length, dispatch]);

  function boosterChanged(id: string, val: string) {
    dispatch(updateBooster(id, {cardSetName: val}, "landingPageBooster"))
  }

  function addBoosterButtonClick() {
    dispatch(addBooster({cardSetName: boosters[boosterIds[boosterIds.length - 1]].cardSetName, id: "booster-" + uuidv4()}, "landingPageBooster"))
    setTimeout(() => {
      scrollableArea.current.scrollTop = scrollableArea.current.scrollHeight;
    })
    
  }

  return (
    <div style={{minHeight: "300px"}}>
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

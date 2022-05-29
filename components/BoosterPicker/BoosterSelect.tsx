import { useDispatch } from "react-redux";
import { Booster } from "../../constants/Booster";
import { CardSet } from "../../constants/CardSet";
import { removeBooster } from "../../data/boosters/actions";
import { sortCardSet } from "../../data/cardSets/utils";

interface ParentProps {
    cardSets: CardSet[]
    boosterNum: number
    boosterChanged: (id: string, val: string) => void
    booster: Booster
    sideText?: string
    hideRemoveButton?: boolean
    customStyle?: React.CSSProperties
}

function BoosterSelect(props: ParentProps) {
  const {cardSets, boosterNum, boosterChanged, booster, hideRemoveButton, sideText, customStyle} = props;
  const dispatch = useDispatch();

  function dispatchRemoveBooster() {
    dispatch(removeBooster(booster.id, "landingPageBooster"))
  }

  const cardSetsSorted = cardSets.sort(sortCardSet)
  const boosterText = sideText || <>Booster <br/>#{(boosterNum + 1)}</>

  return (
      <div className="BoosterSelect d-flex" style={customStyle}>
          {!hideRemoveButton && <div className="DeleteButton btn-sm btn-danger" onClick={dispatchRemoveBooster}><span>x</span></div>}
          <div className={"BoosterText"}>{boosterText}</div>
          <select value={booster.cardSetName} onChange={(event) => boosterChanged(booster.id, event.target.value)}>
            {cardSetsSorted.map((set) => {
                return <option value={set.id} key={set.id}>{set.set_name}</option>;
            })}
          </select>
      </div>
      
  );
}

export default BoosterSelect;

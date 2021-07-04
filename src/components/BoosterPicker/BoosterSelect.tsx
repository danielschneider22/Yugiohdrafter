import { useDispatch } from "react-redux";
import { Booster } from "../../constants/Booster";
import { CardSet } from "../../constants/CardSet";
import { removeBooster } from "../../data/boosters/actions";

interface ParentProps {
    cardSets: CardSet[]
    boosterNum: number
    boosterChanged: (id: string, val: string) => void
    booster: Booster
}

function BoosterSelect(props: ParentProps) {
  const {cardSets, boosterNum, boosterChanged, booster} = props;
  const dispatch = useDispatch();

  function dispatchRemoveBooster() {
    dispatch(removeBooster(booster.id, "landingPageBooster"))
  }

  const cardSetsSorted = cardSets.sort((a, b) => {
    if(a.custom_set && !b.custom_set) {
      return -1
    } else if (!a.custom_set && b.custom_set) {
      return 1
    }
    else {
      const nameA = a.set_name.toUpperCase(); // ignore upper and lowercase
      const nameB = b.set_name.toUpperCase(); // ignore upper and lowercase
      if (nameA < nameB) {
        return -1;
      }
      if (nameB > nameB) {
        return 1;
      }
      return 0;
    }
  })

  return (
      <div className="BoosterSelect d-flex m-1 p-0">
          <div className="DeleteButton btn-sm btn-danger" onClick={dispatchRemoveBooster}><span>x</span></div>
          <div className={"BoosterText"}>Booster <br/>#{(boosterNum + 1)}</div>
          <select value={booster.cardSetName} onChange={(event) => boosterChanged(booster.id, event.target.value)}>
            {cardSetsSorted.map((set) => {
                return <option value={set.set_name} key={set.set_name}>{set.set_name}</option>;
            })}
        </select>
      </div>
      
  );
}

export default BoosterSelect;

import { Booster } from "../../constants/Booster";
import { CardSet } from "../../constants/CardSet";

interface ParentProps {
    cardSets: CardSet[]
    boosterNum: number
    boosterChanged: (id: string, val: string) => void
    booster: Booster
}

function BoosterSelect(props: ParentProps) {
  const {cardSets, boosterNum, boosterChanged, booster} = props;

  return (
      <div className="BoosterSelect d-flex m-1 p-0">
          <div className={"BoosterText"}>Booster #{(boosterNum + 1) + ": "}</div>
          <select value={booster.cardSetName} onChange={(event) => boosterChanged(booster.id, event.target.value)}>
            {cardSets.map((set) => {
                return <option value={set.set_name} key={set.set_name}>{set.set_name}</option>;
            })}
        </select>
      </div>
      
  );
}

export default BoosterSelect;

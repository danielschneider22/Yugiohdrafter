import { Booster } from "../../constants/Booster";
import { CardSet } from "../../constants/CardSet";

interface ParentProps {
    cardSets: CardSet[]
    boosterNum: number
    boosterChanged: (boosterNum: number, val: string) => void
    booster: Booster
}

function BoosterSelect(props: ParentProps) {
  const {cardSets, boosterNum, boosterChanged, booster} = props;

  return (
      <div className="BoosterSelect">
          Booster #{(boosterNum + 1) + ": "}
          <select value={booster.cardSetCode} onChange={(event) => boosterChanged(boosterNum, event.target.value)}>
            {cardSets.map((set) => {
                return <option value={set.set_code} key={set.set_code}>{set.set_name}</option>;
            })}
        </select>
      </div>
      
  );
}

export default BoosterSelect;

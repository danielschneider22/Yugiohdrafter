import { Booster } from "../../constants/Booster";
import { CardSet } from "../../constants/CardSet";

interface ParentProps {
    cardSets: CardSet[]
    boosterNum: number
    boosterChanged: (boosterNum: number, val: string) => void
}

function BoosterSelect(props: ParentProps) {
  const {cardSets, boosterNum, boosterChanged} = props;

  return (
      <div className="BoosterSelect">
          Booster #{(boosterNum + 1) + ": "}
          <select onChange={(event) => boosterChanged(boosterNum, event.target.value)}>
            {cardSets.map((set) => {
                return <option value={set.set_code}>{set.set_name}</option>;
            })}
        </select>
      </div>
      
  );
}

export default BoosterSelect;

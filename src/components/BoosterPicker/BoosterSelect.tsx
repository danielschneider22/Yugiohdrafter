import { CardSet } from "../../constants/CardSet";

interface ParentProps {
    cardSets: CardSet[]
    boosterNum: number
}

function BoosterSelect(props: ParentProps) {
  const {cardSets, boosterNum} = props;

  return (
      <div className="BoosterSelect">
          Booster #{boosterNum + ": "}
          <select>
            {cardSets.map((set) => {
                return <option>{set.set_name}</option>;
            })}
        </select>
      </div>
      
  );
}

export default BoosterSelect;

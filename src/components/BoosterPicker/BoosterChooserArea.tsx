import { Booster } from "../../constants/Booster";
import { CardSet } from "../../constants/CardSet";
import BoosterSelect from "./BoosterSelect";

interface ParentProps {
    boosters: Booster[],
    cardSets: CardSet[],
    setBoosters: (value: React.SetStateAction<Booster[]>) => void
}

function BoosterChooserArea(props: ParentProps) {
  const {boosters, cardSets, setBoosters} = props;

  function boosterChanged(boosterNum: number, val: string) {
    const newBoosters = [...boosters];
    newBoosters[boosterNum].cardSetCode = val;
    setBoosters(newBoosters);
  }

  return (
    <div>
      {
        boosters.map((booster, idx) => {
          return (
            <BoosterSelect 
              cardSets={cardSets}
              boosterNum={idx}
              boosterChanged={boosterChanged}
            />
          )
        })
      }
      <button>Add Booster</button>
  </div>
  );
}

export default BoosterChooserArea;

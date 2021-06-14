import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addSets } from '../../data/cardSets/actions';
import { CardSet, fetchCardSets } from '../../data/cardSets/operations';
import { getCardSets } from '../../data/cardSets/selectors';

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

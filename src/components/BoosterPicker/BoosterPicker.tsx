import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCardSets } from '../../data/cardSets/operations';
import { getCardSets } from '../../data/cardSets/selectors';

function BoosterPicker() {

  const dispatch = useDispatch();
  const cardSets = useSelector(getCardSets);

  useEffect(() => {
    const myCardSets = localStorage.getItem("cardSets");
    if(myCardSets) {
        fetchCardSets(dispatch);
    } else {
        fetchCardSets(dispatch);
    }
  }, []);

  return (
    <div>
      <select>
          {cardSets.map((set) => {
              return <option>{set.set_name}</option>;
          })}
      </select>
    </div>
  );
}

export default BoosterPicker;

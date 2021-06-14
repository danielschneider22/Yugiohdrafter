import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CardSet, getCardSets } from '../../data/cardSets/operations';

function BoosterPicker() {

  const dispatch = useDispatch();
  // const cardSets = useSelector(getCardSets);

  useEffect(() => {
    const myCardSets = localStorage.getItem("cardSets");
    if(myCardSets) {
      getCardSets(dispatch);
    } else {
      getCardSets(dispatch);
    }
  }, []);

  return (
    <div>
      <input></input>
    </div>
  );
}

export default BoosterPicker;

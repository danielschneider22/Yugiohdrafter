import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addSets } from '../../data/cardSets/actions';
import { fetchCardSets } from '../../data/cardSets/operations';
import { getCardSets } from '../../data/cardSets/selectors';
import BoosterSelect from './BoosterSelect';
import './BoosterPicker.css';

function BoosterPicker() {

  const dispatch = useDispatch();
  const cardSets = useSelector(getCardSets);

  useEffect(() => {
    const sets = localStorage.getItem("cardSets");
    if(sets) {
        dispatch(addSets(JSON.parse(sets)))
    } else {
        fetchCardSets(dispatch);
    }
  }, []);

  return (
    <div className="BoosterPickerWrapper">
      <div className="InfoBlurb">
          Pick the type of Draft and booster pack sets.
      </div>
      <BoosterSelect 
        cardSets={cardSets}
        boosterNum={1}
      />
    </div>
  );
}

export default BoosterPicker;

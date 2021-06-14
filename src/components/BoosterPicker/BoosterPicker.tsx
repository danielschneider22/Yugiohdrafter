import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addSets } from '../../data/cardSets/actions';
import { fetchCardSets } from '../../data/cardSets/operations';
import { getCardSets } from '../../data/cardSets/selectors';
import BoosterSelect from './BoosterSelect';
import './BoosterPicker.css';
import { Booster } from '../../constants/Booster';

function BoosterPicker() {

  const dispatch = useDispatch();
  const cardSets = useSelector(getCardSets);
  const [boosters, setBoosters] = useState([] as Booster[]);

  useEffect(() => {
    const sets = localStorage.getItem("cardSets");
    if(sets) {
        dispatch(addSets(JSON.parse(sets)))
    } else {
        fetchCardSets(dispatch);
    }
  }, []);

  useEffect(() => {
    if(boosters.length == 0 && cardSets.length > 0) {
        setBoosters([{cardSet: cardSets[0]}])
    }
  }, [cardSets]);

  return (
    <div className="BoosterPickerWrapper">
      <div className="InfoBlurb">
          Pick the type of Draft and booster pack sets.
      </div>
      { cardSets.length === 0 &&
        <div>Loading boosters...</div>
      }
      { cardSets.length !== 0 &&
        <div>
            {
                boosters.map((booster, idx) => {
                    return (
                        <BoosterSelect 
                            cardSets={cardSets}
                            boosterNum={idx + 1}
                        />
                    )
                })
            }
        </div>
        
      }
      
    </div>
  );
}

export default BoosterPicker;

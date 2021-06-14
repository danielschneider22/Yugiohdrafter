import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addSets } from '../../data/cardSets/actions';
import { fetchCardSets } from '../../data/cardSets/operations';
import { getCardSets } from '../../data/cardSets/selectors';
import BoosterSelect from './BoosterSelect';
import './BoosterPicker.css';
import { Booster } from '../../constants/Booster';
import { CardSet } from '../../constants/CardSet';
import BoosterChooserArea from './BoosterChooserArea';

function LandingPage() {

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
        setBoosters([{cardSetCode: cardSets[0].set_code}])
    }
  }, [cardSets]);

  const loadingBoosters = <div>Loading boosters...</div>
  const boosterChooserArea = <BoosterChooserArea boosters={boosters} cardSets={cardSets} setBoosters={setBoosters}/>
  const boosterArea = cardSets.length === 0 ? loadingBoosters : boosterChooserArea

  return (
    <div className="BoosterPickerWrapper">
      <div className="InfoBlurb">
          Pick the type of Draft and booster pack sets.
      </div>
      {boosterArea}
    </div>
  );
}

export default LandingPage;

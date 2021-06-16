import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addSets } from '../../data/cardSets/actions';
import { fetchCardSets } from '../../data/cardSets/operations';
import './BoosterPicker.css';
import BoosterChooserArea from './BoosterChooserArea';
import { getCardSetsById } from '../../data/cardSets/selectors';
import { getBoosterIds, getBoosters } from '../../data/boosters/selectors';
import { addBooster } from '../../data/boosters/actions';
import * as _ from "lodash"

interface ParentProps{
  changePage: React.Dispatch<React.SetStateAction<string>>
}

function LandingPage(props: ParentProps) {

  const dispatch = useDispatch();
  const cardSets = Object.values(useSelector(getCardSetsById));
  const boosters = useSelector(getBoosters)
  const boosterIds = useSelector(getBoosterIds)

  useEffect(() => {
    const sets = localStorage.getItem("cardSets");
    if(cardSets.length === 0 && sets) {
        dispatch(addSets(JSON.parse(sets)))
    } else if (cardSets.length === 0) {
        fetchCardSets(dispatch);
    }
  }, [dispatch]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if(boosterIds.length === 0 && cardSets.length > 0) {
        dispatch(addBooster({cardSetName: cardSets[0].set_name, id: _.uniqueId("booster-")}))
    }
  }, [cardSets, boosters, boosterIds.length, dispatch]);

  const loadingBoosters = <div>Loading boosters...</div>
  const boosterChooserArea = <BoosterChooserArea />
  const boosterArea = cardSets.length === 0 ? loadingBoosters : boosterChooserArea

  return (
    <div className="BoosterPickerWrapper">
      <div className="BoosterWindowedArea">
        <div className="InfoBlurb">
            Pick the Format and booster pack sets.
        </div>
        <div className="FormatType">
          <input type="radio" id="sealed" name="format" value="sealed" checked/>
          <label htmlFor="sealed">Sealed</label>
          <input type="radio" id="draft" name="format" value="draft" />
          <label htmlFor="draft">Draft</label>
        </div>
        {boosterArea}
        <button className="LaunchButton" onClick={() => props.changePage("SealedBooster")}>Launch</button>
      </div>
    </div>
    
  );
}

export default LandingPage;


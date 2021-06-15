import { useEffect, useState } from 'react';
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
  launch: () => void
}

function LandingPage(props: ParentProps) {

  const dispatch = useDispatch();
  const cardSets = Object.values(useSelector(getCardSetsById));
  const boosters = useSelector(getBoosters)
  const boosterIds = useSelector(getBoosterIds)

  useEffect(() => {
    const sets = localStorage.getItem("cardSets");
    if(sets) {
        dispatch(addSets(JSON.parse(sets)))
    } else {
        fetchCardSets(dispatch);
    }
  }, [dispatch]);

  useEffect(() => {
    if(boosterIds.length === 0 && cardSets.length > 0) {
        dispatch(addBooster({cardSetCode: cardSets[0].set_name, id: _.uniqueId("booster-")}))
    }
  }, [cardSets, boosters]);

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
        <button className="LaunchButton" onClick={props.launch}>Launch</button>
      </div>
    </div>
    
  );
}

export default LandingPage;


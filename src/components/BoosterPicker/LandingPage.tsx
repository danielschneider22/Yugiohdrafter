import './BoosterPicker.css';

import * as _ from 'lodash';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { Card } from '../../constants/Card';
import { addBooster, removeAllBoosters, resetBoosterCards } from '../../data/boosters/actions';
import { getLandingPageBoosterIds, getLandingPageBoosters } from '../../data/boosters/selectors';
import { addCards } from '../../data/cards/actions';
import { fetchCards } from '../../data/cards/operations';
import { addSets, updateCardIds } from '../../data/cardSets/actions';
import { fetchCardSets } from '../../data/cardSets/operations';
import { getCardSetsById } from '../../data/cardSets/selectors';
import { resetDeckAndSideboard } from '../../data/deck/actions';
import { initialiazeDraftPod } from '../../data/draftPod/actions';
import BoosterChooserArea from './BoosterChooserArea';
import { sortCardSet } from '../../data/cardSets/utils';
import { getSetsForBoosters } from '../../data/cards/utils';

function LandingPage() {
  const dispatch = useDispatch();
  const cardSets = Object.values(useSelector(getCardSetsById));
  const boosters = useSelector(getLandingPageBoosters)
  const boosterIds = useSelector(getLandingPageBoosterIds)
  const [format, setFormat] = useState("draft" as "sealed" | "draft")
  const history = useHistory();

  // initialization
  useEffect(() => {
    const sets = localStorage.getItem("cardSets");
    if(cardSets.length === 0 && sets) {
        dispatch(addSets(JSON.parse(sets)))
    } else if (cardSets.length === 0) {
        fetchCardSets(dispatch);
    }

    dispatch(resetBoosterCards("landingPageBooster"))
    dispatch(removeAllBoosters("draftBooster"))
    dispatch(resetDeckAndSideboard())
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // add a booster if booster list is empty
  useEffect(() => {
    if(boosterIds.length === 0 && cardSets.length > 0) {
        dispatch(addBooster({cardSetName: cardSets.sort(sortCardSet)[0].set_name, id: _.uniqueId("booster-")}, "landingPageBooster"))
    }
  }, [cardSets, boosters, boosterIds.length, dispatch]);

  function launch() {
    if(format === "sealed" || format === "draft") {
      getSetsForBoosters(Object.values(boosters), dispatch)
    }
    if(format === "draft") {
      dispatch(initialiazeDraftPod(8, 5, 9, ""))
    }
    history.push(format === "sealed" ? "/SealedBooster" : "/Draft")
      
  }

  const loadingBoosters = <div>Loading boosters...</div>
  const boosterChooserArea = <BoosterChooserArea />
  const boosterArea = cardSets.length === 0 ? loadingBoosters : boosterChooserArea

  return (
    <div className="maxWH">
      <div className="BoosterPickerWrapper d-flex justify-content-center row h-100">
        <div className="BoosterWindowedArea p-2 bd-highlight col-sm-6 my-auto">
          <div className="InfoBlurb">
              Pick Format and Card Sets
          </div>
          <div className="btn-group btn-group-toggle FormatType justify-content-center" data-toggle="buttons">
            <label className={"btn btn-secondary col-6" + (format === "draft" ? " active" : "")} onClick={() => setFormat("draft")}>
              <input type="radio" id="draft" name="format" value="draft" checked={format === "draft"} autoComplete="off" onClick={() => setFormat("draft")} /> Draft
            </label>
            <label className={"btn btn-secondary col-6" + (format === "sealed" ? " active" : "")} onClick={() => setFormat("sealed")}>
              <input type="radio" id="sealed" name="format" value="sealed" autoComplete="off" checked={format === "sealed"} onClick={() => setFormat("sealed")}/> Sealed
            </label>
          </div>
          <div className="btn-group btn-group-toggle FormatType FormatTypeBottom justify-content-center" data-toggle="buttons">
            <label className={"btn btn-secondary col-6 active" + (format === "sealed" ? " disabled" : "")}>
              <input type="radio" id="draft" name="draftFormat" value="draft" autoComplete="off" checked /> Draft with Bots
            </label>
            <label className={"btn btn-secondary col-6 disabled" + (format === "sealed" ? " disabled" : "")}>
              <input type="radio" id="sealed" name="draftFormat" value="sealed" autoComplete="off" /> Host Draft
            </label>
          </div>
          {boosterArea}
          <div className="d-flex justify-content-center">
            <div className="LaunchButton w-50 btn-lg btn-success" onClick={launch}>Launch</div>
          </div>
        </div>
      </div>
    </div>
    
    
  );
}

export default LandingPage;


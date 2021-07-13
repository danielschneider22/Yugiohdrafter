import './BoosterPicker.css';

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { addBooster } from '../../data/boosters/actions';
import { getLandingPageBoosterIds, getLandingPageBoosters } from '../../data/boosters/selectors';
import { getCardSetsById } from '../../data/cardSets/selectors';
import { roomAddFetchThunk } from '../../data/data/rooms/operations';
import BoosterChooserArea from './BoosterChooserArea';
import { sortCardSet } from '../../data/cardSets/utils';
import { getSetsForBoosters } from '../../data/cards/utils';
import { initialiazeDraftPod } from '../../data/draftPod/actions';
import { v4 as uuidv4 } from 'uuid';

function LandingPage() {
  const dispatch = useDispatch();
  const cardSets = Object.values(useSelector(getCardSetsById))
  const boosters = useSelector(getLandingPageBoosters)
  const boosterIds = useSelector(getLandingPageBoosterIds)
  const [format, setFormat] = useState("draft" as "sealed" | "draft")
  const [playMode, setPlayMode] = useState("bots" as "bots" | "host")
  const history = useHistory()

  // add a booster if booster list is empty
  useEffect(() => {
    if(boosterIds.length === 0 && cardSets.length > 0) {
        dispatch(addBooster({cardSetName: cardSets.sort(sortCardSet)[0].id, id: "booster-" + uuidv4()}, "landingPageBooster"))
    }
  }, [cardSets, boosters, boosterIds.length, dispatch]);

  function launch() {
    getSetsForBoosters(Object.values(boosters), dispatch)
    if (playMode === "host")  {
      dispatch(roomAddFetchThunk(history))
    } else {    
      if(format === "draft") {
        dispatch(initialiazeDraftPod(8, 5, 9, ""))
      }
      history.push(format === "sealed" ? "/SealedBooster" : "/Draft")
    }
  }

  const loadingBoosters = <div>Loading boosters...</div>
  const boosterChooserArea = <BoosterChooserArea />
  const boosterArea = cardSets.length === 0 ? loadingBoosters : boosterChooserArea

  return (
    <div className="maxWH">
      <div className="BoosterPickerWrapper d-flex justify-content-center row h-100">
        <div className="BoosterWindowedArea bd-highlight col-sm-6">
          <div className="InfoBlurb">
              Pick Format and Card Sets
          </div>
          <div className="btn-group btn-group-toggle ToggleButton justify-content-center" data-toggle="buttons">
            <label className={`btn btn-secondary col-6 ${format === "draft" ? "active" : ""}`} onClick={() => setFormat("draft")}>
              <input type="radio" id="draft" name="format" value="draft" checked={format === "draft"} autoComplete="off" onClick={() => setFormat("draft")} /> Draft
            </label>
            <label className={`btn btn-secondary col-6 ${format === "sealed" ? "active" : ""}`} onClick={() => setFormat("sealed")}>
              <input type="radio" id="sealed" name="format" value="sealed" autoComplete="off" checked={format === "sealed"} onClick={() => setFormat("sealed")}/> Sealed
            </label>
          </div>
          <div className="btn-group btn-group-toggle ToggleButton justify-content-center" data-toggle="buttons">
            <label className={`btn btn-secondary col-6 ${playMode === "bots" ? "active" : ""}`} onClick={() => setPlayMode("bots")}>
              <input type="radio" id="bots" name="playMode" value="bots" checked={playMode === "bots"} autoComplete="off" onClick={() => setPlayMode("bots")} /> Play With Bots
            </label>
            <label className={`btn btn-secondary col-6 ${playMode === "host" ? "active" : ""}`} onClick={() => setPlayMode("host")}>
              <input type="radio" id="host" name="playMode" value="host" autoComplete="off" checked={playMode === "host"} onClick={() => setPlayMode("host")}/> Host Draft
            </label>
          </div>
          {boosterArea}
          <div className="d-flex justify-content-center">
            <button className="LaunchButton w-50 btn-lg btn-success" onClick={launch}>Launch</button>
          </div>
        </div>
      </div>
    </div>
    
    
  );
}

export default LandingPage;


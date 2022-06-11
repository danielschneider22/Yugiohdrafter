import styles from './BoosterPicker.module.css';

import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { useHistory } from 'react-router-dom';

import { getLandingPageBoosters } from '../../data/boosters/selectors';
import { getCardSetsById } from '../../data/cardSets/selectors';
import { roomAddFetchThunk } from '../../data/data/rooms/operations';
import BoosterChooserArea from './BoosterChooserArea';
import { getSetsForBoosters } from '../../data/cards/utils';
import { initialiazeDraftPod } from '../../data/draftPod/actions';
import Footer from '../Footer/Footer';
import withScroll from '../withScroll/withScroll';
import { useRouter } from 'next/router';
import { resetDeckAndSideboard } from '../../data/deck/actions';
import { resetBoosterCards } from '../../data/boosters/actions';

type ParentProps = {
  scrollCardsRef: React.MutableRefObject<HTMLDivElement>
}

function LandingPage(props: ParentProps) {
  const dispatch = useDispatch();
  const cardSetsById = useSelector(getCardSetsById)
  const cardSets = Object.values(useSelector(getCardSetsById))
  const boosters = useSelector(getLandingPageBoosters)
  const [format, setFormat] = useState("draft" as "sealed" | "draft")
  const [playMode, setPlayMode] = useState("bots" as "bots" | "host")
  const router = useRouter();

  function launch() {
    getSetsForBoosters(Object.values(boosters), dispatch, cardSetsById)
    if (playMode === "host")  {
      dispatch(roomAddFetchThunk(router, format))
    } else {
      dispatch(resetDeckAndSideboard())
      dispatch(resetBoosterCards("landingPageBooster"))
      if(format === "draft") {
        dispatch(initialiazeDraftPod(8, 5, 9, ""))
      }
      router.push(format === "sealed" ? "/sealed" : "/draft")
    }
  }

  const loadingBoosters = <div>Loading boosters...</div>
  const boosterChooserArea = <BoosterChooserArea />
  const boosterArea = cardSets.length === 0 ? loadingBoosters : boosterChooserArea

  return (
    <div className="maxWH">
      <div className={`${styles.BoosterPickerWrapper} d-flex justify-content-center row h-100`} ref={props.scrollCardsRef}>
        <div className={`${styles.BoosterWindowedArea} bd-highlight col-sm-6`}>
          <div className={styles.InfoBlurb}>
              Pick Format and Card Sets
          </div>
          <div className={`btn-group btn-group-toggle ${styles.ToggleButton} justify-content-center`} data-toggle="buttons">
            <label className={`btn btn-secondary col-6 ${format === "draft" ? "active" : ""}`} onClick={() => setFormat("draft")}>
              <input type="radio" id="draft" name="format" value="draft" checked={format === "draft"} autoComplete="off" onChange={() => setFormat("draft")} /> Draft
            </label>
            <label className={`btn btn-secondary col-6 ${format === "sealed" ? "active" : ""}`} onClick={() => setFormat("sealed")}>
              <input type="radio" id="sealed" name="format" value="sealed" autoComplete="off" checked={format === "sealed"} onChange={() => setFormat("sealed")}/> Sealed
            </label>
          </div>
          <div className={`btn-group btn-group-toggle ${styles.ToggleButton} justify-content-center`} data-toggle="buttons">
            <label className={`btn btn-secondary col-6 ${playMode === "bots" ? "active" : ""}`} onClick={() => setPlayMode("bots")}>
              <input type="radio" id="bots" name="playMode" value="bots" checked={playMode === "bots"} autoComplete="off" onChange={() => setPlayMode("bots")} /> Play With Bots
            </label>
            <label className={`btn btn-secondary col-6 ${playMode === "host" ? "active" : ""}`} onClick={() => setPlayMode("host")}>
              <input type="radio" id="host" name="playMode" value="host" autoComplete="off" checked={playMode === "host"} onChange={() => setPlayMode("host")}/> Host Draft
            </label>
          </div>
          {boosterArea}
          <div className="d-flex justify-content-center">
            <button className={`${styles.LaunchButton} w-50 btn-lg btn-success`} onClick={launch}>Launch</button>
          </div>
        </div>
        <Footer />
      </div>
    </div>
    
    
  );
}

export default withScroll(LandingPage);


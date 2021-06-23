import './BoosterPicker.css';

import * as _ from 'lodash';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Card } from '../../constants/Card';
import { addBooster, resetBoosterCards } from '../../data/boosters/actions';
import { getBoosterIds, getBoosters } from '../../data/boosters/selectors';
import { addCards } from '../../data/cards/actions';
import { fetchCards } from '../../data/cards/operations';
import { addSets, updateCardIds } from '../../data/cardSets/actions';
import { fetchCardSets } from '../../data/cardSets/operations';
import { getCardSetsById } from '../../data/cardSets/selectors';
import NavBar from '../NavBar/NavBar';
import BoosterChooserArea from './BoosterChooserArea';
import { resetDeckAndSideboard } from '../../data/deck/actions';

interface ParentProps{
  changePage: React.Dispatch<React.SetStateAction<string>>
}

function LandingPage(props: ParentProps) {
  const dispatch = useDispatch();
  const cardSets = Object.values(useSelector(getCardSetsById));
  const boosters = useSelector(getBoosters)
  const boosterIds = useSelector(getBoosterIds)
  const [format, setFormat] = useState("sealed" as "sealed" | "draft")

  // initialization
  useEffect(() => {
    const sets = localStorage.getItem("cardSets");
    if(cardSets.length === 0 && sets) {
        dispatch(addSets(JSON.parse(sets)))
    } else if (cardSets.length === 0) {
        fetchCardSets(dispatch);
    }

    dispatch(resetBoosterCards())
    dispatch(resetDeckAndSideboard())
  }, [dispatch]); // eslint-disable-line react-hooks/exhaustive-deps

  // add a booster if booster list is empty
  useEffect(() => {
    if(boosterIds.length === 0 && cardSets.length > 0) {
        dispatch(addBooster({cardSetName: cardSets[0].set_name, id: _.uniqueId("booster-")}))
    }
  }, [cardSets, boosters, boosterIds.length, dispatch]);

  function sealedLaunch() {
    const fetchedSets = {} as {[key: string]: string}
    Object.values(boosters).forEach((booster) => {
      if(!fetchedSets[booster.cardSetName]) {
        const cardsOfSet = localStorage.getItem(booster.cardSetName);
        if(cardsOfSet) {
          dispatch(addCards(JSON.parse(cardsOfSet) as Card[]))
          dispatch(updateCardIds(JSON.parse(cardsOfSet) as Card[], booster.cardSetName))
        } else {
          fetchCards(dispatch, booster.cardSetName);
        }
        fetchedSets[booster.cardSetName] = booster.cardSetName
      }
    })
    
    props.changePage("SealedBooster")
  }

  function launch() {
    if(format === "sealed") 
      sealedLaunch()
  }

  const loadingBoosters = <div>Loading boosters...</div>
  const boosterChooserArea = <BoosterChooserArea />
  const boosterArea = cardSets.length === 0 ? loadingBoosters : boosterChooserArea

  return (
    <div className="maxWH">
      <NavBar changePage={props.changePage}/>
      <div className="BoosterPickerWrapper d-flex justify-content-center row h-100">
        <div className="BoosterWindowedArea p-2 bd-highlight col-sm-6 my-auto">
          <div className="InfoBlurb">
              Pick the Format and booster pack sets.
          </div>
          <div className="btn-group btn-group-toggle FormatType justify-content-center" data-toggle="buttons">
            {/* <label className="btn btn-secondary" onClick={() => setFormat("draft")}>
              <input type="radio" id="draft" name="format" value="draft"  checked={format === "draft"} autoComplete="off" onClick={() => setFormat("draft")} /> Draft
            </label> */}
            <label className="btn btn-secondary active" onClick={() => setFormat("sealed")}>
              <input type="radio" id="sealed" name="format" value="sealed" autoComplete="off" checked={format === "sealed"} onClick={() => setFormat("sealed")}/> Sealed
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


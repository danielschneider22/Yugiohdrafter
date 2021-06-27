import './Draft.css';

import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { VisibleCard } from '../../constants/Card';
import { getAllCardSetCardsFetched, getLandingPageBoosters, getDraftBoosters, getPackComplete, getLandingPageBoosterIds, getDraftBoosterIds } from '../../data/boosters/selectors';
import { getCardsById } from '../../data/cards/selectors';
import { getCardSetsById } from '../../data/cardSets/selectors';
import NavBar from '../NavBar/NavBar';
import { addCardToDeck, addCardToExtraDeck, sideboardToDeck, sideboardToExtraDeck } from '../../data/deck/actions';
import { createDraftBoostersForRound } from '../../data/boosters/operations';
import Sidebar from '../Sidebar/Sidebar';
import MainCardArea from '../MainCardArea/MainCardArea';
import { isExtraDeckCard } from '../../data/cards/utils';
import { getCardsForPositionInDraft, getCurrLPBooster, getNumPlayers, getPlayerPosition, getPositionBooster } from '../../data/draftPod/selectors';
import { removeAllBoosters, removeCardFromBooster } from '../../data/boosters/actions';
import { makeAIPicks } from './utils';
import { openNextPack, updatePlayerPosition } from '../../data/draftPod/actions';
import { Booster } from '../../constants/Booster';

interface ParentProps{
  changePage: React.Dispatch<React.SetStateAction<string>>
}

function Draft(props: ParentProps) {
  const dispatch = useDispatch();

  const cardsById = useSelector(getCardsById)
  const cardSets = useSelector(getCardSetsById)
  const packComplete = useSelector(getPackComplete)
  const numPlayers = useSelector(getNumPlayers)
  const currLPBooster = useSelector(getCurrLPBooster)
  const landingPageBoosterIds = useSelector(getLandingPageBoosterIds)
  const landingPageBoosters = useSelector(getLandingPageBoosters)
  const allCardSetCardsFetched = useSelector(getAllCardSetCardsFetched)
  const cards = useSelector(getCardsForPositionInDraft) as VisibleCard[]
  const positionBooster = useSelector(getPositionBooster)
  const draftBoosters = useSelector(getDraftBoosters)
  const draftBoostersIds = useSelector(getDraftBoosterIds)
  const playerPosition = useSelector(getPlayerPosition)

  const [showSidebar, toggleShowSidebar] = useState(false)
  
  const sidebarRef = useRef(null as unknown as HTMLDivElement)

  //create boosters when all sets are fetched and starting new pack
  useEffect(() => {
    if(allCardSetCardsFetched && packComplete) {
      if (currLPBooster && currLPBooster.id === landingPageBoosters[landingPageBoosterIds[landingPageBoosterIds.length - 1]].id) { // completed last booster
        alert("Draft Complete")
      } else {
        let nextBooster: Booster
        if(!currLPBooster) { // first booster opened
          nextBooster = landingPageBoosters[landingPageBoosterIds[0]]
        } else {
          nextBooster = landingPageBoosters[landingPageBoosterIds[landingPageBoosterIds.findIndex((id) => id === currLPBooster.id) + 1]]
        }
        dispatch(removeAllBoosters("draftBooster"))
        createDraftBoostersForRound(nextBooster, cardSets, cardsById, numPlayers, dispatch)
        dispatch(openNextPack(nextBooster.id))
      }
      
    }
    
  }, [cardSets, currLPBooster, cardsById, dispatch, packComplete, allCardSetCardsFetched]);

  function toggleSidebar() {
    toggleShowSidebar(!showSidebar)
  }

  function draftCard(card: VisibleCard) {
    if(isExtraDeckCard(card)) {
      dispatch(addCardToExtraDeck(card.id))
    } else {
      dispatch(addCardToDeck(card.id))
    }
    dispatch(removeCardFromBooster(positionBooster!.id, card.id, "draftBooster"))
    makeAIPicks(playerPosition, draftBoosters, draftBoostersIds, dispatch, cardsById)
    dispatch(updatePlayerPosition())
  }

  return (
    <div className="maxWH">
      <NavBar changePage={props.changePage}/>
      <div className="maxWH">
        <div ref={sidebarRef} className={`ExpandContract maxHeight ${showSidebar ? "ShowSidebar" : "HideSidebar"}`}>
          <Sidebar shownTabs={["Main Deck", "Sideboard", "Extra Deck"]} toggleSidebar={toggleSidebar} showSidebar={showSidebar} parentWidth={sidebarRef.current && sidebarRef.current.clientWidth} />
        </div>
        <div className={`justify-content-center maxHeight ExpandContract MainCardAreaWrapper`} style={{ width: showSidebar ? "calc(100% - 250px)" : "100%" }}>
            <MainCardArea 
              unsortedCards={cards}
              title={"D R A F T I N G"}
              cardClicked={draftCard}
              loadedCards={allCardSetCardsFetched}
            />
        </div>
      </div>
    </div>
      
    
  );
}

export default Draft;
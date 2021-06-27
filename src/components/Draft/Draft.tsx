import './Draft.css';

import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { VisibleCard } from '../../constants/Card';
import { getAllCardSetCardsFetched, getLandingPageBoosters, getDraftBoosters, getPackComplete, getLandingPageBoosterIds } from '../../data/boosters/selectors';
import { getCardsById } from '../../data/cards/selectors';
import { getCardSetsById } from '../../data/cardSets/selectors';
import NavBar from '../NavBar/NavBar';
import { sideboardToDeck, sideboardToExtraDeck } from '../../data/deck/actions';
import { createDraftBoostersForRound } from '../../data/boosters/operations';
import Sidebar from '../Sidebar/Sidebar';
import MainCardArea from '../MainCardArea/MainCardArea';
import { isExtraDeckCard } from '../../data/cards/utils';
import { getCardsForPositionInDraft, getCurrBooster, getNumPlayers } from '../../data/draftPod/selectors';

interface ParentProps{
  changePage: React.Dispatch<React.SetStateAction<string>>
}

function Draft(props: ParentProps) {
  const dispatch = useDispatch();

  const cardsById = useSelector(getCardsById)
  const cardSets = useSelector(getCardSetsById)
  const landingPageBoosters = useSelector(getLandingPageBoosters)
  const landingPageBoosterIds = useSelector(getLandingPageBoosterIds)
  const packComplete = useSelector(getPackComplete)
  const numPlayers = useSelector(getNumPlayers)
  const currBooster = useSelector(getCurrBooster)
  const allCardSetCardsFetched = useSelector(getAllCardSetCardsFetched)
  const cards = useSelector(getCardsForPositionInDraft) as VisibleCard[]

  const [showSidebar, toggleShowSidebar] = useState(false)
  
  const sidebarRef = useRef(null as unknown as HTMLDivElement)

  //create boosters when all sets are fetched and starting new pack
  useEffect(() => {
    if(allCardSetCardsFetched && packComplete) {
      const currBoosterId = landingPageBoosterIds[currBooster]
      createDraftBoostersForRound(landingPageBoosters[currBoosterId], cardSets, cardsById, numPlayers, dispatch)
    }
    
  }, [cardSets, landingPageBoosters, cardsById, dispatch, packComplete, allCardSetCardsFetched]);

  function toggleSidebar() {
    toggleShowSidebar(!showSidebar)
  }

  function addCardToDeck(card: VisibleCard) {
    if(isExtraDeckCard(card)) {
      dispatch(sideboardToExtraDeck(card.id, card.origIdx))
    } else {
      dispatch(sideboardToDeck(card.id, card.origIdx))
    }
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
              cardClicked={addCardToDeck}
              loadedCards={allCardSetCardsFetched}
            />
        </div>
      </div>
    </div>
      
    
  );
}

export default Draft;
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Booster } from '../../constants/Booster';
import { VisibleCard } from '../../constants/Card';
import { removeAllBoosters, removeCardFromBooster, setBoosters } from '../../data/boosters/actions';
import { createDraftBoostersForRound } from '../../data/boosters/operations';
import {
    getAllCardSetCardsFetched,
    getDraftBoosterIds,
    getDraftBoosters,
    getLandingPageBoosterIds,
    getLandingPageBoosters,
    getPackComplete,
} from '../../data/boosters/selectors';
import { getCardsById } from '../../data/cards/selectors';
import { isExtraDeckCard } from '../../data/cards/utils';
import { getCardSetsById } from '../../data/cardSets/selectors';
import { addCardToDeck, addCardToExtraDeck } from '../../data/deck/actions';
import { openNextPack, updatePlayerPosition } from '../../data/draftPod/actions';
import {
  getBoosterNum,
    getCardsForPositionInDraft,
    getCurrLPBooster,
    getNumPlayers,
    getPlayerPosition,
    getPositionBooster,
} from '../../data/draftPod/selectors';
import MainCardArea from '../MainCardArea/MainCardArea';
import Sidebar from '../Sidebar/Sidebar';
import { makeAIPicks } from './utils';
import { toastBGColorDict } from '../../constants/Toast';
import { addToast } from '../../data/toasts/actions';
import _ from 'lodash';
import { isMobile } from "react-device-detect";
import { useRouter } from 'next/router';

import sidebarStyles from '../Sidebar/Sidebar.module.css'
import mainCardAreaStyle from '../MainCardArea/MainCardArea.module.css'

function Draft() {
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
  const router = useRouter();
  const boosterNum = useSelector(getBoosterNum)

  const [showSidebar, toggleShowSidebar] = useState(false)
  
  const sidebarRef = useRef(null as unknown as HTMLDivElement)

  useEffect(() => {
    if(landingPageBoosterIds.length === 0) {
      router.push("/");
    }
  }, [])  // eslint-disable-line react-hooks/exhaustive-deps

  //create boosters when all sets are fetched and starting new pack
  useEffect(() => {
    if(allCardSetCardsFetched && packComplete && landingPageBoosterIds.length > 0) {
      if (currLPBooster && currLPBooster.id === landingPageBoosters[landingPageBoosterIds[landingPageBoosterIds.length - 1]].id) { // completed last booster
        router.push("/draftComplete");
        dispatch(addToast({id: _.uniqueId("draft-complete-"), type: "Success", description: "Edit and Export your Deck", title: "Draft Complete", backgroundColor: toastBGColorDict["Success"]}))
      } else {
        let nextBooster: Booster
        if(!currLPBooster) { // first booster opened
          nextBooster = landingPageBoosters[landingPageBoosterIds[0]]
        } else {
          nextBooster = landingPageBoosters[landingPageBoosterIds[landingPageBoosterIds.findIndex((id) => id === currLPBooster.id) + 1]]
        }
        dispatch(removeAllBoosters("draftBooster"))
        const boosters = createDraftBoostersForRound(nextBooster, cardSets, cardsById, numPlayers,"bot")
        dispatch(setBoosters(boosters, "draftBooster" ))
        dispatch(openNextPack(nextBooster.id))
      }
      
    }
    
  }, [cardSets, currLPBooster, cardsById, dispatch, packComplete, allCardSetCardsFetched, landingPageBoosters, landingPageBoosterIds, numPlayers]);

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
    const cardPicks = makeAIPicks([playerPosition], draftBoosters, draftBoostersIds, cardsById)
    cardPicks.forEach((pick) => dispatch(removeCardFromBooster(pick.boosterId, pick.cardId, "draftBooster")) )
    
    dispatch(updatePlayerPosition())
  }

  const currSetName = currLPBooster ? cardSets[currLPBooster.cardSetName].set_name : ""

  return (
    <div className="maxWH">
      <div className="maxWH">
        <div ref={sidebarRef} className={`${mainCardAreaStyle.ExpandContract} maxHeight ${showSidebar ? sidebarStyles.ShowSidebar : sidebarStyles.HideSidebar}`}>
          <Sidebar shownTabs={["Main Deck", "Sideboard", "Extra Deck"]} toggleSidebar={toggleSidebar} showSidebar={showSidebar} parentWidth={sidebarRef.current && sidebarRef.current.clientWidth} />
        </div>
        <div className={`justify-content-center maxHeight ${mainCardAreaStyle.ExpandContract} ${mainCardAreaStyle.MainCardAreaWrapper}`} style={{ width: showSidebar ? "calc(100% - 250px)" : "100%" }}>
            <MainCardArea 
              unsortedCards={cards}
              title={isMobile ? "DRAFTING" : "DRAFTING PACK: " + boosterNum}
              subTitle={isMobile ? undefined : currSetName}
              cardClicked={draftCard}
              loadedCards={allCardSetCardsFetched}
            />
        </div>
      </div>
    </div>
      
    
  );
}

export default Draft;

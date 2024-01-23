import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { VisibleCard } from '../../constants/Card';
import {
  canViewPack,
    getAllCardSetCardsFetched,
    getLandingPageBoosterIds,
    getLandingPageBoosters,
    getRoundComplete,
} from '../../data/boosters/selectors';
import { getCardsById } from '../../data/cards/selectors';
import { isExtraDeckCard } from '../../data/cards/utils';
import { getCardSetsById } from '../../data/cardSets/selectors';
import { addCardToDeck, addCardToExtraDeck } from '../../data/deck/actions';
import {
  getBoosterNum,
    getCardsForPositionInDraft,
    getCurrLPBooster,
    getNumPlayers,
    getPositionBooster,
} from '../../data/draftPod/selectors';
import MainCardArea from '../MainCardArea/MainCardArea';
import Sidebar from '../Sidebar/Sidebar';
import { toastBGColorDict } from '../../constants/Toast';
import { addToast } from '../../data/toasts/actions';
import _ from 'lodash';
import { getRoomPlayerId, roomGetFetchThunk, roomMakePickFetchThunk, roomNextRoundFetchThunk } from '../../data/data/rooms/operations';
import { CardPick } from '../../constants/CardPick';
import { getUserPlayerInfo } from '../../data/data/roomPlayers.ts/selectors';
import { isMobile } from 'react-device-detect';
import { RoomResultC } from '../../contracts/RoomResultC';
import { checkCacheDeck } from '../../data/deck/operations';
import { ip } from '../../pages/_app';
import { useRouter } from 'next/router';

import sidebarStyles from '../Sidebar/Sidebar.module.css'
import mainCardAreaStyle from '../MainCardArea/MainCardArea.module.css'

let updateRoomInterval: any

function RoomDraft() {
  const dispatch = useDispatch();
  const router = useRouter()
  const roomId = router.query.id as string
  const cardsById = useSelector(getCardsById)
  const cardSets = useSelector(getCardSetsById)
  const roundComplete = useSelector(getRoundComplete)
  const numPlayers = useSelector(getNumPlayers)
  const currLPBooster = useSelector(getCurrLPBooster)
  const landingPageBoosterIds = useSelector(getLandingPageBoosterIds)
  const landingPageBoosters = useSelector(getLandingPageBoosters)
  const allCardSetCardsFetched = useSelector(getAllCardSetCardsFetched)
  const cards = useSelector(getCardsForPositionInDraft) as VisibleCard[]
  const positionBooster = useSelector(getPositionBooster)
  const packViewable = useSelector(canViewPack)
  const playerInfo = useSelector(getUserPlayerInfo)
  const boosterNum = useSelector(getBoosterNum)

  const [showSidebar, toggleShowSidebar] = useState(false)
  
  const sidebarRef = useRef(null as unknown as HTMLDivElement)

  async function awaitRoomFetch() {
    await dispatch(checkCacheDeck(roomId))
    const roomResultC = await dispatch(roomGetFetchThunk(roomId)) as unknown as RoomResultC
    
    if (roomResultC.boostersDraft?.allIds.length === 0) {
      router.push("/");
    }

    updateRoomInterval = setInterval(() => dispatch(roomGetFetchThunk(roomId)), 1000);
  }

  useEffect(() => {
    if(roomId) 
      awaitRoomFetch()
    return () => { clearInterval(updateRoomInterval) }
  }, [roomId]) // eslint-disable-line react-hooks/exhaustive-deps

  // go to draft complete when finished and start a new round if host and boosters are finished
  useEffect(() => {
    if(allCardSetCardsFetched && roundComplete && landingPageBoosterIds.length > 0 && roomId) {
      if (currLPBooster && currLPBooster.id === landingPageBoosters[landingPageBoosterIds[landingPageBoosterIds.length - 1]].id) { // completed last booster
        clearInterval(updateRoomInterval)
        router.push("/draftComplete");
        dispatch(addToast({id: _.uniqueId("draft-complete-"), type: "Success", description: "Edit and Export your Deck", title: "Draft Complete", backgroundColor: toastBGColorDict["Success"]}))
      } else if(playerInfo?.isHost) {
        dispatch(roomNextRoundFetchThunk(roomId))
      }
      
    }
    
  }, [cardSets, currLPBooster, cardsById, dispatch, roundComplete, allCardSetCardsFetched, landingPageBoosters, landingPageBoosterIds, numPlayers, playerInfo, roomId]);

  function toggleSidebar() {
    toggleShowSidebar(!showSidebar)
  }

  function draftCard(card: VisibleCard) {
    if(isExtraDeckCard(card)) {
      dispatch(addCardToExtraDeck(card.id))
    } else {
      dispatch(addCardToDeck(card.id))
    }
    const cardPick: CardPick = { boosterId: positionBooster!.id, cardId: card.id, pickerId: getRoomPlayerId(ip, roomId)}
    dispatch(roomMakePickFetchThunk(roomId, cardPick))
  }

  const currSetName = currLPBooster ? cardSets[currLPBooster.cardSetName].set_name : ""

  return (
    <div className="maxWH">
      <div className="maxWH">
        <div ref={sidebarRef} className={`${mainCardAreaStyle.ExpandContract} maxHeight ${showSidebar ? sidebarStyles.ShowSidebar : sidebarStyles.HideSidebar}`}>
          <Sidebar shownTabs={["Main Deck", "Sideboard", "Extra Deck"]} toggleSidebar={toggleSidebar} showSidebar={showSidebar} parentWidth={sidebarRef.current && sidebarRef.current.clientWidth} />
        </div>
        <div className={`justify-content-center maxHeight ${mainCardAreaStyle.ExpandContract} ${mainCardAreaStyle.MainCardAreaWrapper}`} style={{ width: showSidebar ? "calc(100% - 250px)" : "100%" }}>
            { packViewable &&
              <MainCardArea 
                unsortedCards={cards}
                title={isMobile ? "DRAFTING" : "DRAFTING PACK: " + boosterNum}
                subTitle={isMobile ? undefined : currSetName}
                cardClicked={draftCard}
                loadedCards={allCardSetCardsFetched}
              />
            }
            { !packViewable &&
              <div className={mainCardAreaStyle.ScrollCards + " " + mainCardAreaStyle.CardDisplayAreaTitle}>Waiting for other players...</div>
            }


        </div>
      </div>
    </div>
      
    
  );
}

export default RoomDraft;

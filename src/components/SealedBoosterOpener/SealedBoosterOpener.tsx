import './SealedBoosterOpener.css';

import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { VisibleCard } from '../../constants/Card';
import { getBoosters } from '../../data/boosters/selectors';
import { getCardsById } from '../../data/cards/selectors';
import { getCardSetsById } from '../../data/cardSets/selectors';
import NavBar from '../NavBar/NavBar';
import { getSideboard } from '../../data/deck/selectors';
import { addCardsToSideboard, sideboardToDeck } from '../../data/deck/actions';
import { createBoostersForFetchedSets } from '../../data/boosters/operations';
import Sidebar from '../Sidebar/Sidebar';
import MainCardArea from '../MainCardArea/MainCardArea';

interface ParentProps{
  changePage: React.Dispatch<React.SetStateAction<string>>
}

function SealedBoosterOpener(props: ParentProps) {
  const dispatch = useDispatch();

  const cardsById = useSelector(getCardsById)
  const cardSets = useSelector(getCardSetsById)
  const boosters = useSelector(getBoosters)
  const sideboard = useSelector(getSideboard)

  const [showSidebar, toggleShowSidebar] = useState(false)
  
  const sidebarRef = useRef(null as unknown as HTMLDivElement)

  let cards: VisibleCard[] = []

  sideboard.forEach((cardId, idx) => {
    cards.push({...cardsById[cardId], origIdx: idx})
  })

  //create boosters when all sets for boosters are fetched
  useEffect(() => {
    const allCardSetCardsFetched = Object.values(boosters).every((booster) => cardSets[booster.cardSetName].card_ids && cardSets[booster.cardSetName].card_ids!.length > 0)
    if(allCardSetCardsFetched && sideboard.length === 0) {
      const sideboardCards = createBoostersForFetchedSets(boosters, cardSets, cardsById, dispatch)
      dispatch(addCardsToSideboard(sideboardCards))
    }
    
  }, [cardSets, boosters, cardsById, dispatch, sideboard]);

  function toggleSidebar() {
    toggleShowSidebar(!showSidebar)
  }

  function addCardToDeck(card: VisibleCard) {
    dispatch(sideboardToDeck(card.id, card.origIdx))
  }

  return (
    <div className="maxWH">
      <NavBar changePage={props.changePage}/>
      <div className="maxWH">
        <div ref={sidebarRef} className={`ExpandContract maxHeight ${showSidebar ? "ShowSidebar" : "HideSidebar"}`}>
          <Sidebar activeAreas={["Sideboard", "Deck"]} toggleSidebar={toggleSidebar} showSidebar={showSidebar} parentWidth={sidebarRef.current && sidebarRef.current.clientWidth} />
        </div>
        <div className={`justify-content-center maxHeight ExpandContract`} style={{position: "relative", width: showSidebar ? "calc(100% - 250px)" : "100%"}}>
            <MainCardArea 
              unsortedCards={cards}
              title={"S I D E B O A R D"}
              cardClicked={addCardToDeck}
            />
        </div>
      </div>
    </div>
      
    
  );
}

export default SealedBoosterOpener;

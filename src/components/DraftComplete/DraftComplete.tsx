import './DraftComplete.css';

import { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { VisibleCard } from '../../constants/Card';
import { getCardsById } from '../../data/cards/selectors';
import NavBar from '../NavBar/NavBar';
import { getDeck, getSideboard } from '../../data/deck/selectors';
import { deckToSideboard, sideboardToDeck, sideboardToExtraDeck } from '../../data/deck/actions';
import Sidebar from '../Sidebar/Sidebar';
import MainCardArea from '../MainCardArea/MainCardArea';
import { isExtraDeckCard } from '../../data/cards/utils';

interface ParentProps{
  changePage: React.Dispatch<React.SetStateAction<string>>
}

function DraftComplete(props: ParentProps) {
  const dispatch = useDispatch();

  const cardsById = useSelector(getCardsById)
  const mainDeck = useSelector(getDeck)

  const [showSidebar, toggleShowSidebar] = useState(false)
  
  const sidebarRef = useRef(null as unknown as HTMLDivElement)

  let cards: VisibleCard[] = []

  mainDeck.forEach((cardId, idx) => {
    cards.push({...cardsById[cardId], origIdx: idx})
  })

  function toggleSidebar() {
    toggleShowSidebar(!showSidebar)
  }

  function addCardToDeck(card: VisibleCard) {
    dispatch(deckToSideboard(card.id, card.origIdx))
  }

  return (
    <div className="maxWH">
      <NavBar changePage={props.changePage}/>
      <div className="maxWH">
        <div ref={sidebarRef} className={`ExpandContract maxHeight ${showSidebar ? "ShowSidebar" : "HideSidebar"}`}>
          <Sidebar shownTabs={["Sideboard", "Extra Deck"]} toggleSidebar={toggleSidebar} showSidebar={showSidebar} parentWidth={sidebarRef.current && sidebarRef.current.clientWidth} />
        </div>
        <div className={`justify-content-center maxHeight ExpandContract MainCardAreaWrapper`} style={{ width: showSidebar ? "calc(100% - 250px)" : "100%" }}>
            <MainCardArea 
              unsortedCards={cards}
              title={"M A I N D E C K"}
              cardClicked={addCardToDeck}
              loadedCards={true}
            />
        </div>
      </div>
    </div>
      
    
  );
}

export default DraftComplete;

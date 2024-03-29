import styles from './DraftComplete.module.css';

import { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { VisibleCard } from '../../constants/Card';
import { getCardsById } from '../../data/cards/selectors';
import { deckToSideboard } from '../../data/deck/actions';
import { getDeck } from '../../data/deck/selectors';
import MainCardArea from '../MainCardArea/MainCardArea';
import Sidebar from '../Sidebar/Sidebar';

import sidebarStyles from '../Sidebar/Sidebar.module.css'
import mainCardAreaStyle from '../MainCardArea/MainCardArea.module.css'


function DraftComplete() {
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
      <div className="maxWH">
        <div ref={sidebarRef} className={`${mainCardAreaStyle.ExpandContract} maxHeight ${showSidebar ? sidebarStyles.ShowSidebar : sidebarStyles.HideSidebar}`}>
          <Sidebar shownTabs={["Sideboard", "Extra Deck"]} toggleSidebar={toggleSidebar} showSidebar={showSidebar} parentWidth={sidebarRef.current && sidebarRef.current.clientWidth} />
        </div>
        <div className={`justify-content-center maxHeight ${mainCardAreaStyle.ExpandContract} ${mainCardAreaStyle.MainCardAreaWrapper}`} style={{ width: showSidebar ? "calc(100% - 250px)" : "100%" }}>
            <MainCardArea 
              unsortedCards={cards}
              title={"MAINDECK: " + cards.length}
              cardClicked={addCardToDeck}
              loadedCards={true}
            />
        </div>
      </div>
    </div>
      
    
  );
}

export default DraftComplete;

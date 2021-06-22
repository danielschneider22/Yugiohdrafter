import './SealedBoosterOpener.css';

import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { VisibleCard } from '../../constants/Card';
import { updateBooster } from '../../data/boosters/actions';
import { getBoosters } from '../../data/boosters/selectors';
import { getCardsById } from '../../data/cards/selectors';
import { getCardSetsById } from '../../data/cardSets/selectors';
import NavBar from '../NavBar/NavBar';
import { createBooster } from './BoosterCreatorHelper';
import { getSideboard } from '../../data/deck/selectors';
import { addCardsToSideboard, sideboardToDeck } from '../../data/deck/actions';
import Sidebar from './Sidebar';
import { sortCards, SortType } from '../../data/cards/utils';
import BottomBar from '../BottomBar/BottomBar';
import { createBoostersForFetchedSets } from '../../data/boosters/operations';

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
  const [sortType, toggleSortType] = useState("Name" as SortType)

  const sidebarRef = useRef(null as unknown as HTMLDivElement)

  let cards: VisibleCard[] = []

  sideboard.forEach((cardId, idx) => {
    cards.push({...cardsById[cardId], origIdx: idx})
  })

  cards = cards.sort(sortCards(sortType))

  //create boosters when all sets for boosters are fetched
  useEffect(() => {
    const allCardSetCardsFetched = Object.values(boosters).every((booster) => cardSets[booster.cardSetName].card_ids && cardSets[booster.cardSetName].card_ids!.length > 0)
    if(allCardSetCardsFetched && sideboard.length === 0) {
      const sideboardCards = createBoostersForFetchedSets(boosters, cardSets, cardsById, dispatch)
      dispatch(addCardsToSideboard(sideboardCards))
    }
    
  }, [cardSets, boosters, cardsById, dispatch]);

  function toggleSidebar() {
    toggleShowSidebar(!showSidebar)
  }

  function addCardToDeck(card: VisibleCard) {
    dispatch(sideboardToDeck(card.id, card.origIdx))
  }

  return (
    <div className="maxProportions">
      <NavBar changePage={props.changePage}/>
      <div className="maxProportions">
        <div ref={sidebarRef} className={`ExpandContract maxHeight ${showSidebar ? "ShowSidebar" : "HideSidebar"}`}>
          <Sidebar activeAreas={["Sideboard", "Deck"]} toggleSidebar={toggleSidebar} showSidebar={showSidebar} parentWidth={sidebarRef.current && sidebarRef.current.clientWidth} />
        </div>
        <div className={`justify-content-center maxHeight ExpandContract`} style={{position: "relative", width: showSidebar ? "calc(100% - 250px)" : "100%"}}>
            <div className={"ScrollCards"}>
              <div className="CardDisplayAreaTitle">S I D E B O A R D</div>
              {cards && cards.map((card, idx) => {
                return <img className="Card" key={card.name + idx} alt={card.name} src={card.card_images[0].image_url} width={"300"} height={"438"} onClick={() => addCardToDeck(card)}/>
              })}
              {(!cards || cards.length === 0) &&
                <div>Loading cards...</div>
              }
          </div>
          <BottomBar 
            sortType={sortType}
            toggleSortType={toggleSortType}
          />
        </div>
      </div>
    </div>
      
    
  );
}

export default SealedBoosterOpener;

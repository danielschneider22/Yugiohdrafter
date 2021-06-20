import './SealedBoosterOpener.css';

import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Card } from '../../constants/Card';
import { updateBooster } from '../../data/boosters/actions';
import { getBoosters } from '../../data/boosters/selectors';
import { getCardsById } from '../../data/cards/selectors';
import { getCardSetsById } from '../../data/cardSets/selectors';
import NavBar from '../NavBar/NavBar';
import { createBooster } from './BoosterCreatorHelper';
import { getDeck, getSideboard } from '../../data/deck/selectors';
import { addCardsToSideboard, sideboardToDeck } from '../../data/deck/actions';
import Sidebar from './Sidebar';

interface ParentProps{
  changePage: React.Dispatch<React.SetStateAction<string>>
}

function SealedBoosterOpener(props: ParentProps) {
  const dispatch = useDispatch();

  const cardsById = useSelector(getCardsById)
  const cardSets = useSelector(getCardSetsById)
  const boosters = useSelector(getBoosters)
  const sideboard = useSelector(getSideboard)
  const deck = useSelector(getDeck)

  const [showSidebar, toggleShowSidebar] = useState(true)

  const sidebarRef = useRef(null as unknown as HTMLDivElement)

  let cards: Card[] = []

  sideboard.forEach((cardId) => {
    cards.push(cardsById[cardId])
  })

  function createBoostersForFetchedSets() {
    Object.values(boosters).forEach((booster) => {
      if(!booster.cardIds && cardSets[booster.cardSetName].card_ids) {
        const cardSetIds = cardSets[booster.cardSetName].card_ids!
        const cardSetCards = cardSetIds.map((card_id) => cardsById[card_id]).filter((card) => !!card)
        const randomCards = createBooster(cardSetCards, booster.cardSetName);
        dispatch(updateBooster(booster.id, {cardIds: randomCards.map((card) => card.id)} ))
      }
    })
  }

  function populateSideboardWithBoosters() {
    const sideboardCards: string[] = []
    Object.values(boosters).forEach((booster) => {
      sideboardCards.push(...booster.cardIds!)
    })
    dispatch(addCardsToSideboard(sideboardCards))
  }

  useEffect(() => {
    const isEmptyBooster = Object.values(boosters).some((booster) => !booster.cardIds || booster.cardIds.length === 0)
    if(isEmptyBooster) {
      createBoostersForFetchedSets()
    } else if (sideboard.length === 0) {
      populateSideboardWithBoosters()
    }
    
  }, [cardSets, boosters, cardsById, dispatch]);

  function toggleSidebar() {
    toggleShowSidebar(!showSidebar)
  }

  function addCardToDeck(card: Card, idx: number) {
    dispatch(sideboardToDeck(card.id, idx))
  }

  function exportToYDK() {
    const element = document.createElement("a");
    let exportString = "#main\n"
    deck.forEach((cardId) => exportString += cardId + "\n")
    exportString+= "#extra\n!side\n"
    sideboard.forEach((cardId) => exportString += cardId + "\n")
    const file = new Blob([exportString], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = "YugiohDeck.ydk";
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();
  }

  return (
    <div className="maxProportions">
      <NavBar changePage={props.changePage}/>
      <div className="maxProportions">
        <div ref={sidebarRef} className={`ExpandContract maxHeight ${showSidebar ? "ShowSidebar" : "HideSidebar"}`}>
          <Sidebar activeAreas={["Sideboard", "Deck"]} toggleSidebar={toggleSidebar} showSidebar={showSidebar} parentWidth={sidebarRef.current && sidebarRef.current.clientWidth} />
        </div>
        <div className={`justify-content-center maxHeight ExpandContract`} style={{position: "relative", width: showSidebar ? "calc(100% - 300px)" : "100%"}}>
            <div className={"ScrollCards"}>
              <div className="CardDisplayAreaTitle">S I D E B O A R D</div>
              {cards && cards.map((card, idx) => {
                return <img className="Card" key={card.name + idx} alt={card.name} src={card.card_images[0].image_url} width={"300"} height={"438"} onClick={() => addCardToDeck(card, idx)}/>
              })}
              {(!cards || cards.length === 0) &&
                <div>Loading cards...</div>
              }
          </div>
          <div className="BottomBar row">
            <div className="col-10"/>
            <div className="col-1 justify-content-center DeckCount">Deck Count: {deck.length}</div>
            <div className="btn-sm btn-success col-1 justify-content-center ExportButton" onClick={exportToYDK}>Export</div>
          </div>
        </div>
      </div>
      
    </div>
      
    
  );
}

export default SealedBoosterOpener;

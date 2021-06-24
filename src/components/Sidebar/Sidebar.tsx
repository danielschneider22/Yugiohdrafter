import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card } from '../../constants/Card';
import { getCardsById } from '../../data/cards/selectors';
import { deckToSideboard, extraDeckToSideboard } from '../../data/deck/actions';
import { getDeck, getExtraDeck, getSideboard } from '../../data/deck/selectors';
import './Sidebar.css';
import Tab from './Tab';

export type TabType = "Main Deck" | "Sideboard" | "Extra Deck"

interface ParentProps{
  shownTabs: (TabType)[]
  toggleSidebar: () => void
  showSidebar: boolean
  parentWidth: number
}

let parentMaxWidth = 250

function Sidebar(props: ParentProps) {
  const {showSidebar, toggleSidebar, parentWidth, shownTabs} = props
  const cardsById = useSelector(getCardsById)
  const dispatch = useDispatch();
  const deck = useSelector(getDeck)
  const extraDeck = useSelector(getExtraDeck)
  const sideboard = useSelector(getSideboard)
  const [activeTab, setActiveTab] = useState(shownTabs[0])

  let activeTabCards: Card[] = []

  function getTabCardIds(tab: TabType) {
    switch(tab){
      case "Main Deck":
        return deck;
      case "Extra Deck":
        return extraDeck;
      case "Sideboard":
        return sideboard;
    }
  }

  getTabCardIds(activeTab).forEach((cardId) => {
    activeTabCards.push(cardsById[cardId])
  })
  
  if(parentWidth) {
    parentMaxWidth = parentWidth
  }
  const tabsStyle = showSidebar ? {left: parentMaxWidth - 86} : {left: "-40px"}

  function addCardToSideboard(card: Card, idx: number) {
    if(activeTab === "Main Deck") {
      dispatch(deckToSideboard(card.id, idx))
    } else {
      dispatch(extraDeckToSideboard(card.id, idx))
    }
    
  }

  return (
    <div className={"Sidebar active clearfix"}>
      {parentMaxWidth && <div className="CardPickerButtonContainer">
        {shownTabs.map((tabName, idx) => {
          return(
            <Tab 
              tabName={tabName}
              tabClicked={toggleSidebar}
              tabsStyle={{...tabsStyle, bottom: -140 + (-130 * idx)}}
              text={tabName + ":" + getTabCardIds(tabName).length}
              showSidebar={showSidebar}
              isActive={activeTab === tabName}
              setActiveTab={setActiveTab}
              key={tabName}
            />
          )
        })}
      </div>
      }
      
      <div className="CardsWrapper">
        {activeTabCards && activeTabCards.map((card, idx) => {
          return (
            <img
              className="CardLeftArea" 
              key={card.name + idx} 
              alt={card.name} 
              src={card.card_images[0].image_url} 
              width={"200"} height={"290"} 
              onClick={() => addCardToSideboard(card, idx)}/>)
        })}
      </div>
    </div> 
    
  );
}

export default Sidebar;

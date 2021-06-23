import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card } from '../../constants/Card';
import { getCardsById } from '../../data/cards/selectors';
import { deckToSideboard } from '../../data/deck/actions';
import { getDeck } from '../../data/deck/selectors';
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
  const [activeTab, setActiveTab] = useState(shownTabs[0])

  let deckCards: Card[] = []

  deck.forEach((cardId) => {
    deckCards.push(cardsById[cardId])
  })
  
  if(parentWidth) {
    parentMaxWidth = parentWidth
  }
  const tabsStyle = showSidebar ? {left: parentMaxWidth - 86} : {left: "-40px"}

  function addCardToSideboard(card: Card, idx: number) {
    dispatch(deckToSideboard(card.id, idx))
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
              text={tabName + ":" + deck.length}
              showSidebar={showSidebar}
              isActive={activeTab === tabName}
              setActiveTab={setActiveTab}
            />
          )
        })}
      </div>
      }
      
      <div className="CardsWrapper">
        {deckCards && deckCards.map((card, idx) => {
          return <img className="CardLeftArea" key={card.name + idx} alt={card.name} src={card.card_images[0].image_url} width={"200"} height={"290"} onClick={() => addCardToSideboard(card, idx)}/>
        })}
      </div>
    </div> 
    
  );
}

export default Sidebar;

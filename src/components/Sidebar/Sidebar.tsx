import { useDispatch, useSelector } from 'react-redux';
import { Card } from '../../constants/Card';
import { getCardsById } from '../../data/cards/selectors';
import { deckToSideboard } from '../../data/deck/actions';
import { getDeck } from '../../data/deck/selectors';
import './Sidebar.css';

interface ParentProps{
  activeAreas: ("Deck" | "Sideboard" | "Draft")[]
  toggleSidebar: () => void
  showSidebar: boolean
  parentWidth: number
}

let parentMaxWidth = 250

function Sidebar(props: ParentProps) {
  const {showSidebar, toggleSidebar, parentWidth} = props
  const cardsById = useSelector(getCardsById)
  const dispatch = useDispatch();
  const deck = useSelector(getDeck)

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
        <div onClick={toggleSidebar} className={"CardPickerTab MainDeck"} style={tabsStyle}>
          Main Deck: {deck.length}
          <span className="TabArrow">{showSidebar ? "▼" :"▲"}</span>
        </div>
        <div onClick={toggleSidebar} className={"CardPickerTab ExtraDeck"} style={tabsStyle}>Extra Deck: 0</div>
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

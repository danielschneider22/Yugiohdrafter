import { Card } from '../../constants/Card';
import './CardPickerLeftArea.css';

interface ParentProps{
  activeAreas: ("Deck" | "Sideboard" | "Draft")[]
  toggleSidebar: () => void
  showSidebar: boolean
  cards: Card[]
  parentWidth: number
}

let parentMaxWidth = 0

function CardPickerLeftArea(props: ParentProps) {
  const {cards, showSidebar, toggleSidebar, activeAreas, parentWidth} = props
  if(parentWidth !== 0) {
    parentMaxWidth = parentWidth
  }
  const tabsStyle = showSidebar ? {left: parentMaxWidth - 86} : {left: "-35px"}
  return (
    <div className={"CardPickerLeftArea active clearfix"}>
      {parentMaxWidth && <div className="CardPickerButtonContainer">
        <div onClick={toggleSidebar} className={"CardPickerTab MainDeck"} style={tabsStyle}>Main Deck</div>
        <div onClick={toggleSidebar} className={"CardPickerTab ExtraDeck"} style={tabsStyle}>Extra Deck</div>
      </div>
      }
      
      <div className="CardsWrapper">
        {cards && showSidebar && cards.map((card, idx) => {
          return <img className="CardLeftArea" key={card.name + idx} alt={card.name} src={card.card_images[0].image_url} width={"250"} height={"320"}/>
        })}
      </div>
    </div> 
    
  );
}

export default CardPickerLeftArea;

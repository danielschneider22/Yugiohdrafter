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
  const mainDeckStyle = showSidebar ? {left: parentMaxWidth - 86} : {left: "-35px"}
  return (
    <div className={"CardPickerLeftArea active clearfix"}>
      <div>
        <div onClick={toggleSidebar} className={"sideboard-button"} style={mainDeckStyle}>Main Deck</div>
      </div>
      
      <div className="CardsWrapper">
        {cards && showSidebar && cards.map((card, idx) => {
          return <img className="CardLeftArea" key={card.name + idx} alt={card.name} src={card.card_images[0].image_url} width={"150"} height={"219"}/>
        })}
      </div>
    </div> 
    
  );
}

export default CardPickerLeftArea;

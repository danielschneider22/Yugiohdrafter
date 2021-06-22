import './MainCardArea.css'

import { VisibleCard } from '../../constants/Card';
import BottomBar from '../BottomBar/BottomBar';
import { useState } from 'react';
import { sortCards, SortType } from '../../data/cards/utils';

interface ParentProps{
    unsortedCards: VisibleCard[],
    title: string,
    cardClicked: (card: VisibleCard) => void
}

function MainCardArea(props: ParentProps) {
  const { unsortedCards, cardClicked } = props
  const [sortType, toggleSortType] = useState("Name" as SortType)

  const cards = unsortedCards.sort(sortCards(sortType))

  return (
    <div className={"ScrollCards"}>
        <div className="CardDisplayAreaTitle">S I D E B O A R D</div>
        {cards && cards.map((card, idx) => {
            return <img className="Card" key={card.name + idx} alt={card.name} src={card.card_images[0].image_url} width={"300"} height={"438"} onClick={() => cardClicked(card)}/>
        })}
        {(!cards || cards.length === 0) &&
            <div>Loading cards...</div>
        }
        <BottomBar 
            sortType={sortType}
            toggleSortType={toggleSortType}
        />
    </div>
  );
}

export default MainCardArea;


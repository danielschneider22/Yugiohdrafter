import './MainCardArea.css'

import { VisibleCard } from '../../constants/Card';
import BottomBar from '../BottomBar/BottomBar';
import { useEffect, useRef, useState } from 'react';
import { sortCards, SortType } from '../../data/cards/utils';
import { scrollToggleNavVisibility } from '../NavBar/ScrollBGColorChange';

interface ParentProps{
    unsortedCards: VisibleCard[],
    title: string,
    subTitle?: string,
    cardClicked: (card: VisibleCard) => void,
    loadedCards: boolean
}

function MainCardArea(props: ParentProps) {
  const { unsortedCards, cardClicked, loadedCards, title, subTitle } = props
  const [sortType, toggleSortType] = useState("Name" as SortType)
  const scrollCardsRef = useRef(null as unknown as HTMLDivElement)

  const cards = unsortedCards.sort(sortCards(sortType))

  useEffect(() => {
    if(scrollCardsRef) {
        scrollCardsRef.current.addEventListener('scroll', scrollToggleNavVisibility as unknown as (this: HTMLDivElement, ev: Event) => any)
    }
  }, [scrollCardsRef])

  const safariIOSSpacingStyle: React.CSSProperties = {paddingTop: -1000}
  safariIOSSpacingStyle.marginTop = 800
  safariIOSSpacingStyle.color = 'transparent'

  return (
    <div ref={scrollCardsRef} className={"ScrollCards"}>
        <div className={"CardDisplayAreaTitle " + (subTitle ? "TitleNoMargin" : "TitleMargin")}>{title}</div>
        { subTitle &&
          <div className="CardDisplayAreaSubTitle">{subTitle}</div>
        }
        {cards && cards.map((card, idx) => {
            return <img className="VisibleCard" key={card.name + idx} alt={card.name} src={card.card_images[0].image_url} width={"300"} height={"438"} onClick={() => cardClicked(card)}/>
        })}
        {(!cards || cards.length === 0) && !loadedCards &&
            <div>Loading cards...</div>
        }
        <div style={safariIOSSpacingStyle}>Buffer</div>

        <BottomBar 
            sortType={sortType}
            toggleSortType={toggleSortType}
        />
    </div>
  );
}

export default MainCardArea;

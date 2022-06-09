import styles from './MainCardArea.module.css'

import { VisibleCard } from '../../constants/Card';
import BottomBar from '../BottomBar/BottomBar';
import { useState } from 'react';
import { sortCards, SortType } from '../../data/cards/utils';
import { isMobile } from 'react-device-detect';
import withScroll from '../withScroll/withScroll';

interface ParentProps{
    unsortedCards: VisibleCard[],
    title: string,
    subTitle?: string,
    cardClicked: (card: VisibleCard) => void,
    loadedCards: boolean,
    scrollCardsRef: React.MutableRefObject<HTMLDivElement>
}

function MainCardArea(props: ParentProps) {
  const { unsortedCards, cardClicked, loadedCards, title, subTitle, scrollCardsRef } = props
  const [sortType, toggleSortType] = useState("Name" as SortType)

  const cards = unsortedCards.sort(sortCards(sortType))

  const safariIOSSpacingStyle: React.CSSProperties = {paddingTop: -1000}
  safariIOSSpacingStyle.marginTop = isMobile ? 400 : 500
  safariIOSSpacingStyle.color = 'transparent'

  return (
    <div ref={scrollCardsRef} className={styles.ScrollCards}>
        <div className={styles.CardDisplayAreaTitle + " " + (subTitle ? styles.TitleNoMargin : styles.TitleMargin)}>{title}</div>
        { subTitle &&
          <div className={styles.CardDisplayAreaSubTitle}>{subTitle}</div>
        }
        {cards && cards.map((card, idx) => {
            return <img className={styles.VisibleCard} key={card.name + idx} alt={card.name} src={card.card_images[0].image_url} width={"300"} height={"438"} onClick={() => cardClicked(card)}/>
        })}
        {(!cards || cards.length === 0) && !loadedCards &&
            <div>Loading cards...</div>
        }
        <div style={safariIOSSpacingStyle}>Buffer</div>

        <BottomBar 
            sortType={sortType}
            toggleSortType={toggleSortType}
            showExport={!title.includes("DRAFT")}
        />
    </div>
  );
}

export default withScroll(MainCardArea);

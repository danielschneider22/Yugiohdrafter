import './SealedBoosterOpener.css';

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Card } from '../../constants/Card';
import { resetBoosterCards, updateBooster } from '../../data/boosters/actions';
import { getBoosters } from '../../data/boosters/selectors';
import { getCardsById } from '../../data/cards/selectors';
import { getCardSetsById } from '../../data/cardSets/selectors';
import NavBar from '../NavBar/NavBar';
import { createBooster } from './BoosterCreatorHelper';
import { getSideboard } from '../../data/deck/selectors';
import { addCardsToSideboard } from '../../data/deck/actions';
import CardPickerRightArea from './CardPickerRightArea';

interface ParentProps{
  changePage: React.Dispatch<React.SetStateAction<string>>
}

function SealedBoosterOpener(props: ParentProps) {
  const dispatch = useDispatch();

  const cardsById = useSelector(getCardsById)
  const cardSets = useSelector(getCardSetsById)
  const boosters = useSelector(getBoosters)
  const sideboard = useSelector(getSideboard)

  const [showSidebar, toggleShowSidebar] = useState(true)

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

  return (
    <div className="maxProportions">
      <NavBar changePage={props.changePage}/>
      <div className="row maxProportions">
        <div className={`col-2 ExpandContract maxHeight ${!showSidebar && "HideSidebar"}`}>
          <CardPickerRightArea activeAreas={["Sideboard", "Deck"]} toggleSidebar={toggleSidebar} showSidebar={showSidebar} />
        </div>
        <div className={`justify-content-center maxHeight ExpandContract ${showSidebar ? "col-10" : "col-12"}`}>
            <div className={"ScrollCards"}>
              <div className="CardDisplayAreaTitle">S I D E B O A R D</div>
              {cards && cards.map((card, idx) => {
                return <img className="Card" key={card.name + idx} alt={card.name} src={card.card_images[0].image_url} width={"300"} height={"438"}/>
              })}
              {(!cards || cards.length === 0) &&
                <div>Loading cards...</div>
              }
          </div>
        </div>
      </div>
      
    </div>
      
    
  );
}

export default SealedBoosterOpener;

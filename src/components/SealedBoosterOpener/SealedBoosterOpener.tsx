import './SealedBoosterOpener.css';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Card } from '../../constants/Card';
import { resetBoosterCards, updateBooster } from '../../data/boosters/actions';
import { getBoosters } from '../../data/boosters/selectors';
import { getCardsById } from '../../data/cards/selectors';
import { getCardSetsById } from '../../data/cardSets/selectors';
import NavBar from '../NavBar/NavBar';
import { createBooster } from './BoosterCreatorHelper';

interface ParentProps{
  changePage: React.Dispatch<React.SetStateAction<string>>
}

function SealedBoosterOpener(props: ParentProps) {
  const dispatch = useDispatch();

  const cardsById = useSelector(getCardsById)
  const cardSets = useSelector(getCardSetsById)
  const boosters = useSelector(getBoosters)

  let cards: Card[] = []

  Object.values(boosters).forEach((booster) => {
    if(booster.cardIds)
      cards.push(...booster.cardIds.map((card_id) => cardsById[card_id])!.filter((card) => !!card))
  })

  useEffect(() => {
    Object.values(boosters).forEach((booster) => {
      if(!booster.cardIds && cardSets[booster.cardSetName].card_ids) {
        const cardSetIds = cardSets[booster.cardSetName].card_ids!
        const cardSetCards = cardSetIds.map((card_id) => cardsById[card_id]).filter((card) => !!card)
        const randomCards = createBooster(cardSetCards, booster.cardSetName);
        dispatch(updateBooster(booster.id, {cardIds: randomCards.map((card) => card.id)} ))
      }
    })
  }, [cardSets, boosters, cardsById, dispatch]);

  function back() {
    dispatch(resetBoosterCards())
    props.changePage("LandingPage")
  }

  return (
    <div className={"maxProportions"}>
      <NavBar changePage={props.changePage}/>
      <div className={"maxProportions scrollCards"}>
        {cards && cards.map((card) => {
          return <img className="Card" key={card.name} alt={card.name} src={card.card_images[0].image_url} width={"300"} height={"438"}/>
        })}
        {(!cards || cards.length === 0) &&
          <div>Loading cards...</div>
        }
      </div>
      <button className="BackButton" onClick={back}>Back</button>
    </div>
      
    
  );
}

export default SealedBoosterOpener;

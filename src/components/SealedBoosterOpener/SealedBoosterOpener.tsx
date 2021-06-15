import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card } from '../../constants/Card';
import { updateBooster } from '../../data/boosters/actions';
import { getBoosters } from '../../data/boosters/selectors';
import { addCards } from '../../data/cards/actions';
import { fetchCards } from '../../data/cards/operations';
import { getCardsById } from '../../data/cards/selectors';
import { updateCardIds } from '../../data/cardSets/actions';
import { getCardSetsById } from '../../data/cardSets/selectors';
import { createBooster } from './BoosterCreatorHelper';
import './SealedBoosterOpener.css';

function SealedBoosterOpener() {
  const dispatch = useDispatch();

  const cardsById = useSelector(getCardsById)
  const cardSets = useSelector(getCardSetsById)
  const boosters = useSelector(getBoosters)

  let cards: Card[] = []

  Object.values(boosters).forEach((booster) => {
    if(booster.cardIds)
      cards.push(...booster.cardIds.map((card_id) => cardsById[card_id])!)
  })

  useEffect(() => {
    const fetchedSets = {} as {[key: string]: string}
    Object.values(boosters).forEach((booster) => {
      if(!fetchedSets[booster.cardSetName]) {
        const cardsOfSet = localStorage.getItem(booster.cardSetName);
        if(cardsOfSet) {
          dispatch(addCards(JSON.parse(cardsOfSet) as Card[]))
          dispatch(updateCardIds(JSON.parse(cardsOfSet) as Card[], booster.cardSetName))
        } else {
          fetchCards(dispatch, booster.cardSetName);
        }
        fetchedSets[booster.cardSetName] = booster.cardSetName
      }
    })
  }, [dispatch]);

  useEffect(() => {
    Object.values(boosters).forEach((booster) => {
      if(!booster.cardIds && cardSets[booster.cardSetName].card_ids) {
        const cardSetIds = cardSets[booster.cardSetName].card_ids!
        const cardSetCards = cardSetIds.map((card_id) => cardsById[card_id])
        const randomCards = createBooster(cardSetCards, booster.cardSetName);
        dispatch(updateBooster(booster.id, {cardIds: randomCards.map((card) => card.id)} ))
      }
    })
  }, [cardSets, boosters]);

  return (
    <div>
        {cards && cards.map((card) => {
          return <img alt={card.name} src={card.card_images[0].image_url} width={"300"} height={"438"}/>
        })}
    </div>
    
  );
}

export default SealedBoosterOpener;

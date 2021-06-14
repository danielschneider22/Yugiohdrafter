import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card } from '../../constants/Card';
import { fetchCards } from '../../data/cards/operations';
import { getCardsById } from '../../data/cards/selectors';
import { getCardSetsById } from '../../data/cardSets/selectors';
import './SealedBoosterOpener.css';

function SealedBoosterOpener() {
  const dispatch = useDispatch();

  const cardsById = useSelector(getCardsById)
  const cardSets = useSelector(getCardSetsById)
  const set_name = "2014 Mega-Tin Mega Pack"

  let cards: Card[] = []

  if(!cardSets[set_name]) {
    cards = []
  } else{
    cards = cardSets[set_name].card_ids?.map((card_id) => cardsById[card_id])!
  }

  useEffect(() => {
    fetchCards(dispatch, set_name);
  }, [dispatch]);

  console.log(cards)

  const [llama, setLlama] = useState("blech")

  return (
    <div>
        <button onClick={(event) => setLlama(llama + 1)}>aaaaaaaaaaaa</button>
        {cards && cards.map((card) => {
          return <img alt={card.name} src={card.card_images[0].image_url_small}/>
        })}
    </div>
    
  );
}

export default SealedBoosterOpener;

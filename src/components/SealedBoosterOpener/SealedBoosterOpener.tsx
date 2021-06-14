import { useEffect } from 'react';
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
  const set_code = "metal%20raiders"

  let cards: Card[] = []

  if(!cardSets[set_code]) {
    cards = []
  } else{
    cards = cardSets[set_code].card_ids?.map((card_id) => cardsById[card_id])!
  }

  useEffect(() => {
    fetchCards(dispatch, "blech");
  }, [dispatch]);

  console.log(cards)

  return (
    <div>
        
    </div>
    
  );
}

export default SealedBoosterOpener;

import { ICellRendererParams } from 'ag-grid-community';
import { FaPlus, FaTrash } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { CardSet } from '../../../constants/CardSet';
import { getCardsById } from '../../../data/cards/selectors';
import { updateCardIds } from '../../../data/cardSets/actions';

const AddOrRemoveCardButton = (props: ICellRendererParams & {set: CardSet}) => {
  const dispatch = useDispatch()
  const {set} = {...props}
  const cards = useSelector(getCardsById)

  function addCardtoSet() {
    dispatch(updateCardIds([props.node.data.id], set.id, "add", cards))
  }

  function removeCardFromSet() {
    const newCards = set.card_ids!.filter((id) => id !== props.node.data.id)
    dispatch(updateCardIds(newCards, set.id, "overwrite", cards))
  }

  const setContainsCard = set.card_ids && set.card_ids!.some((id) => id === props.node.data.id)

  const addButton = (
    <span style={{color: "white"}}>
      <button type="button" className="btn btn-success" onClick={addCardtoSet}><FaPlus /></button>
    </span>
  )

  const removeButton = (
    <span style={{color: "white"}}>
      <button type="button" className="btn btn-danger" onClick={removeCardFromSet}><FaTrash /></button>
    </span>
  )

  return (
    setContainsCard ? removeButton : addButton
  );
};

export default AddOrRemoveCardButton
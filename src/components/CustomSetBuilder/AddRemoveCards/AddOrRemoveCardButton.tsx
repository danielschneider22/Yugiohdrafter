import { ICellRendererParams } from 'ag-grid-community';
import { FaPlus, FaTrash } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { CardSet } from '../../../constants/CardSet';
import { updateCardIds } from '../../../data/cardSets/actions';

const AddOrRemoveCardButton = (props: ICellRendererParams & {set: CardSet}) => {
  const dispatch = useDispatch()
  const {set} = {...props}

  function addCardtoSet() {
    dispatch(updateCardIds([props.node.data.id], set.id, "add"))
  }

  function removeCardFromSet() {
    const newCards = set.card_ids!.filter((id) => id !== props.node.data.id)
    dispatch(updateCardIds(newCards, set.id, "overwrite"))
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
import { ICellRendererParams } from 'ag-grid-community';
import { FaTrash } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { CardSet } from '../../../constants/CardSet';
import { updateCardIds } from '../../../data/cardSets/actions';

const RemoveCardButton = (props: ICellRendererParams & {set: CardSet}) => {
  const dispatch = useDispatch()
  const {set} = {...props}

  function removeCardFromSet() {
    const newCards = set.card_ids!.filter((id) => id !== props.node.data.id)
    dispatch(updateCardIds(newCards, set.id, "overwrite"))
  }

  return (
    <span style={{color: "white"}}>
      <button type="button" className="btn btn-danger" onClick={removeCardFromSet}><FaTrash /></button>
    </span>
  );
};

export default RemoveCardButton
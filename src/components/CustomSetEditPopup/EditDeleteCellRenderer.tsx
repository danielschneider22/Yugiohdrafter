import { ICellRendererParams } from 'ag-grid-community';
import { FaTrash, FaEdit } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { removeSet } from '../../data/cardSets/actions';

const EditDeleteCellRenderer = (params: ICellRendererParams & {toggleCustomSetEditPopupVisiblity: () => void}) => {
    const dispatch = useDispatch();
    const history = useHistory();

    function deleteButtonClicked() {
        // eslint-disable-next-line no-restricted-globals
        if (confirm('Are you sure you want to delete this set?')) {
            dispatch(removeSet(params.node.data.id))
        }
    }

    function editButtonClicked() {
        params.toggleCustomSetEditPopupVisiblity()
        history.push(`/CustomSetBuilder/${params.node.data["set_name"]}`)
    }

    return (
        <>
            <button onClick={editButtonClicked} type="button" className="action-button btn btn-success" data-action="edit"><FaEdit /></button>
            <button onClick={deleteButtonClicked} type="button" className="action-button btn btn-danger" data-action="delete"><FaTrash /></button>
        </>
    );
};

export default EditDeleteCellRenderer
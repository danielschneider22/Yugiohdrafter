import { ICellRendererParams } from 'ag-grid-community';
import { useRouter } from 'next/router';
import { FaTrash, FaEdit } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { deleteCardSetsFetchThunk } from '../../data/cardSets/operations';
import styles from "./CustomSetEditPopup.module.css"

const EditDeleteCellRenderer = (params: ICellRendererParams & {toggleCustomSetEditPopupVisiblity: () => void}) => {
    const dispatch = useDispatch();
    const router = useRouter()

    function deleteButtonClicked() {
        // eslint-disable-next-line no-restricted-globals
        if (confirm('Are you sure you want to delete this set?')) {
            const id = params.node.data.id
            dispatch(deleteCardSetsFetchThunk([id]))
        }
    }

    function editButtonClicked() {
        params.toggleCustomSetEditPopupVisiblity()
        router.push(`/CustomSetBuilder/${params.node.data["set_name"]}`)
    }

    return (
        <>
            <button onClick={editButtonClicked} type="button" className={`${styles["action-button"]} btn btn-success`} data-action="edit"><FaEdit /></button>
            <button onClick={deleteButtonClicked} type="button" className={`${styles["action-button"]} btn btn-danger`} data-action="delete"><FaTrash /></button>
        </>
    );
};

export default EditDeleteCellRenderer
import { FaTrash, FaEdit } from 'react-icons/fa';

const EditDeleteCellRenderer = () => {
    return (
        <span>
            <button type="button" className="action-button btn btn-success" data-action="edit"><FaEdit /></button>
            <button type="button" className="action-button btn btn-danger" data-action="delete"><FaTrash /></button>
        </span>
    );
};

export default EditDeleteCellRenderer
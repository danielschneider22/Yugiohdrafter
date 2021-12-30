import React, { useEffect, useRef } from 'react';
import './CustomSetEditPopup.css';
import { AgGridColumn, AgGridReact } from 'ag-grid-react';
import { useDispatch, useSelector } from 'react-redux';
import { getCardSetsById } from '../../data/cardSets/selectors';
import { CellClickedEvent, CellDoubleClickedEvent, CellValueChangedEvent, GridOptions, GridReadyEvent, ICellRendererParams } from 'ag-grid-community';
import { dateFormatter } from '../../helpers/aggridhelpers';
import { useHistory } from 'react-router-dom';
import { renameSetThunk } from '../../data/cardSets/operations';
import { removeSet } from '../../data/cardSets/actions';
import { isMobile } from 'react-device-detect';

interface ParentProps {
    toggleCustomSetEditPopupVisiblity: () => void
}

function CustomSetEditPopup(props: ParentProps) {
    const history = useHistory();
    const dispatch = useDispatch();
    const { toggleCustomSetEditPopupVisiblity } = { ...props }
    const cardSetsById = useSelector(getCardSetsById)
    const cardsSetByIdRef = useRef(cardSetsById)
    useEffect(() => {
        cardsSetByIdRef.current = cardSetsById
    }, [cardSetsById])
    const cardSets = Object.values(cardSetsById).filter((set) => set.custom_set)

    async function submit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
    }

    function onRowDataChanged(event: GridReadyEvent) {
        event.api.sizeColumnsToFit()
    }

    function onCellDoubleClicked(event: CellDoubleClickedEvent) {
        if(event.colDef.field !== "set_name") {
            toggleCustomSetEditPopupVisiblity()
            history.push(`/CustomSetBuilder/${event.node.data["set_name"]}`)
        }
    }

    function onCellValueChanged(event: CellValueChangedEvent) {
        dispatch(renameSetThunk(cardsSetByIdRef.current[event.node.data.id], event.newValue))
    }

    const gridOptions: GridOptions = {
        onRowDataChanged,
        onCellClicked,
        onCellDoubleClicked,
        rowSelection: "single",
        onCellValueChanged
    }

    function actionCellRenderer(event: ICellRendererParams) {
        let eGui = document.createElement("div");
        eGui.innerHTML = `
            <button class="action-button edit-grid-button" data-action="edit" > edit  </button>
            <button class="action-button delete-grid-button" data-action="delete" > delete </button>
        `;

        return eGui;
    }

    function onCellClicked(event: CellClickedEvent) {
        if (event.column.getColId() === "action" && (event.event!.target! as any).dataset.action) {
            let action = (event.event!.target! as any).dataset.action;

            if (action === "delete") {
                // eslint-disable-next-line no-restricted-globals
                if(confirm('Are you sure you want to delete this set?')){
                    dispatch(removeSet(event.node.data.id))
                }
                
            }

            if (action === "edit") {
                toggleCustomSetEditPopupVisiblity()
                history.push(`/CustomSetBuilder/${event.node.data["set_name"]}`)
            }

        }
    }

    return (
        <div className="container-fluid container-xl d-flex align-items-center justify-content-between">
            <nav id="navbar" className="navbar navbar-mobile navbar-mobile-wide customSet">
                <ul className="form-group form-group-wide" >
                    <div className="container contactPopup">
                        <div className="row h-100">
                            <div className="col-lg-12">
                                <form onSubmit={submit} className="contact-form h-100">
                                    <div className="CreateCustomSetTitle">
                                        Edit Custom Sets
                                    </div>
                                    <div className="ag-theme-alpine setGrid">
                                        <AgGridReact rowData={cardSets} gridOptions={gridOptions}>
                                            <AgGridColumn field="set_name" headerName="Name" editable={true}></AgGridColumn>
                                            {!isMobile && <AgGridColumn field="num_of_cards" headerName="# Cards"></AgGridColumn>}
                                            {!isMobile && <AgGridColumn field="tcg_date" headerName="Updated Date" valueFormatter={dateFormatter}></AgGridColumn>}
                                            <AgGridColumn field="action" headerName="Action" cellRenderer={actionCellRenderer} minWidth={150}></AgGridColumn>
                                        </AgGridReact>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </ul>
                <i className={"bi mobile-nav-toggle bi-list bi-x"} onClick={toggleCustomSetEditPopupVisiblity}></i>
            </nav>
        </div>
    );
}

export default CustomSetEditPopup;

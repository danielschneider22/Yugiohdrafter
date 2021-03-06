import { useEffect, useRef } from 'react';
import './CustomSetEditPopup.css';
import { AgGridColumn, AgGridReact } from 'ag-grid-react';
import { useDispatch, useSelector } from 'react-redux';
import { getCardSetsAuthoredByCurrUser, getCardSetsById } from '../../data/cardSets/selectors';
import { CellDoubleClickedEvent, CellValueChangedEvent, GridOptions, GridReadyEvent } from 'ag-grid-community';
import { dateFormatter } from '../../helpers/aggridhelpers';
import { useHistory } from 'react-router-dom';
import { getSetId, publishCardSetFetchThunk, renameSetThunk } from '../../data/cardSets/operations';
import { isMobile } from 'react-device-detect';
import EditDeleteCellRenderer from './EditDeleteCellRenderer';
import { addSet } from '../../data/cardSets/actions';
import { getUserEmail } from '../../data/login/selectors';

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
    const cardSets = useSelector(getCardSetsAuthoredByCurrUser)
    const userEmail = useSelector(getUserEmail)

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

    function getSetName() {
        let setName = ""
        let idx = 1
        while(!setName) {
            const testSetName = "New Set " + idx
            const containsInvalidName = Object.keys(cardSetsById).some((cSetName) => cSetName.indexOf(testSetName) !== -1)
            if(!containsInvalidName) {
                setName = testSetName
            }
            idx++
        }
        return setName
    }

    function addNewSet() {
        const setName = getSetName()
        const setId = getSetId(setName)
        const cardSet = {id: setId, set_name: setName, set_code: setName, num_of_cards: 0, tcg_date: Date(), custom_set: true, card_ids: [], author: userEmail}
        dispatch(addSet(cardSet))
        dispatch(publishCardSetFetchThunk(cardSet, true))
    }

    const gridOptions: GridOptions = {
        onRowDataChanged,
        onCellDoubleClicked,
        rowSelection: "single",
        onCellValueChanged,
        frameworkComponents: {
            editDeleteCellRenderer: EditDeleteCellRenderer,
        },
    }

    const actionStyle = {display: "flex", justifyContent: "center", alignItems: "center"}

    return (
        <div className="container-fluid container-xl d-flex align-items-center justify-content-between">
            <nav id="navbar" className="navbar navbar-mobile navbar-mobile-wide customSet">
                <ul className="form-group form-group-wide" >
                    <div className="container contactPopup">
                        <div className="row h-100">
                            <div className="col-lg-12">
                                <div className="contact-form h-100">
                                    <div className="CreateCustomSetTitle">
                                        Edit Custom Sets
                                    </div>
                                    <div className="ag-theme-alpine setGrid">
                                        <AgGridReact rowData={cardSets} gridOptions={gridOptions}>
                                            <AgGridColumn field="set_name" headerName="Name" editable={true}></AgGridColumn>
                                            {!isMobile && <AgGridColumn field="num_of_cards" headerName="# Cards"></AgGridColumn>}
                                            {!isMobile && <AgGridColumn field="tcg_date" headerName="Updated Date" valueFormatter={dateFormatter}></AgGridColumn>}
                                            <AgGridColumn field="action" headerName="" cellRenderer={"editDeleteCellRenderer"} minWidth={150} cellStyle={actionStyle} cellRendererParams={{toggleCustomSetEditPopupVisiblity}}></AgGridColumn>
                                        </AgGridReact>
                                    </div>
                                    <div className="form-group submit">        
                                        <button type="submit" onClick={addNewSet} className="btn-lg btn-success">Add Set</button>
                                    </div>
                                </div>
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

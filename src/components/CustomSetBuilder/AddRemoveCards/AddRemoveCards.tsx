import { GridOptions, RowHeightParams } from "ag-grid-community";
import { AgGridColumn, AgGridReact } from "ag-grid-react";
import { useSelector } from "react-redux";
import { CardSet } from "../../../constants/CardSet";
import { getCardsById } from "../../../data/cards/selectors";
import './AddRemoveCards.css'

interface ParentParams{
    set: CardSet
}

function AddRemoveCards(params: ParentParams) {
    const {set} = {...params}
    const cards = useSelector(getCardsById)

    const cardsOfSet = set.card_ids ? set.card_ids!.map((id) => cards[id]) : []

    const gridOptions: GridOptions = {
        headerHeight: 30,
        floatingFiltersHeight: 40,
        rowHeight: 80,
        defaultColDef: {
            cellStyle: {fontSize: '12px', lineHeight: "30px"}
        },
        getRowHeight: (params: RowHeightParams) => {
            return Math.ceil((params.data.desc.length / 87)) * 30
        }
    }

    return (
        <div className="ag-theme-alpine CardsGrid">
            <AgGridReact rowData={cardsOfSet} gridOptions={gridOptions}>
                <AgGridColumn field="name" headerName="Name" editable={true} sortable={true} floatingFilter={true} filter={true}></AgGridColumn>
                <AgGridColumn field="desc" headerName="Description" editable={true} sortable={true} floatingFilter={true} filter={true} width={500} wrapText={true}></AgGridColumn>
                <AgGridColumn field="type" headerName="Type" editable={true} sortable={true} floatingFilter={true} filter={true}></AgGridColumn>
                <AgGridColumn field="race" headerName="Subtype/Race" editable={true} sortable={true} floatingFilter={true} filter={true}></AgGridColumn>
                <AgGridColumn field="atk" headerName="Attack" editable={true} sortable={true} floatingFilter={true} filter={true}></AgGridColumn>
                <AgGridColumn field="def" headerName="Defense" editable={true} sortable={true} floatingFilter={true} filter={true}></AgGridColumn>
                <AgGridColumn field="level" headerName="Level" editable={true} sortable={true} floatingFilter={true} filter={true}></AgGridColumn>
                <AgGridColumn field="attribute" headerName="Attribute" editable={true} sortable={true} floatingFilter={true} filter={true}></AgGridColumn>
            </AgGridReact>
        </div>


    );
}

export default AddRemoveCards;


import { GridOptions, RowHeightParams } from "ag-grid-community";
import { AgGridColumn, AgGridReact } from "ag-grid-react";
import { useSelector } from "react-redux";
import { CardSet } from "../../../constants/CardSet";
import { getCardsById } from "../../../data/cards/selectors";
import './AddRemoveCards.css'
import RemoveCardButton from "./RemoveCardButton";


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
        frameworkComponents: {
            removeCardRenderer: RemoveCardButton,
        },
        defaultColDef: {
            cellStyle: {
                fontSize: '14px',
                lineHeight: "30px",
                wordBreak: "keep-all",
                display: "flex",
                alignItems: "center"
            },
            editable: false,
            sortable: true,
            floatingFilter: true,
            filter: true,
            resizable: true
        },
        getRowHeight: (params: RowHeightParams) => {
            return Math.max(Math.ceil((params.data.desc.length / 87)) * 30, 45)
        }
    }

    return (
        <div className="ag-theme-alpine CardsGrid">
            <AgGridReact rowData={cardsOfSet} gridOptions={gridOptions}>
                <AgGridColumn field="action" headerName="" cellRenderer={"removeCardRenderer"} cellRendererParams={{set}} width={75} floatingFilter={false} filter={false}></AgGridColumn>
                <AgGridColumn field="name" headerName="Name" cellStyle={{cursor: "pointer"}}></AgGridColumn>
                <AgGridColumn field="desc" headerName="Description" width={700} wrapText={true}></AgGridColumn>
                <AgGridColumn field="type" headerName="Type" width={150}></AgGridColumn>
                <AgGridColumn field="race" headerName="Subtype/Race" width={150}></AgGridColumn>
                <AgGridColumn field="atk" headerName="Attack" width={120}></AgGridColumn>
                <AgGridColumn field="def" headerName="Defense" width={120}></AgGridColumn>
                <AgGridColumn field="level" headerName="Level" width={120}></AgGridColumn>
                <AgGridColumn field="attribute" headerName="Attribute" width={120}></AgGridColumn>
            </AgGridReact>
        </div>


    );
}

export default AddRemoveCards;


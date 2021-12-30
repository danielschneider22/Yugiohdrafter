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

    return (
        <div className="maxWH">
            <div className="ag-theme-alpine CardsGrid">
                <AgGridReact rowData={cardsOfSet}>
                    <AgGridColumn field="name" headerName="Name" editable={true}></AgGridColumn>
                    <AgGridColumn field="type" headerName="Type" editable={true}></AgGridColumn>
                </AgGridReact>
            </div>
        </div>


    );
}

export default AddRemoveCards;


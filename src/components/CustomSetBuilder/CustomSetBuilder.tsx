import './CustomSetBuilder.css';

import { useDispatch, useSelector } from 'react-redux';

import { getCardSetsById } from '../../data/cardSets/selectors';
import { useHistory, useParams } from 'react-router-dom';
import NavItem from '../NavItem/NavItem';
import { useEffect, useState } from 'react';
import AddRemoveCards from './AddRemoveCards/AddRemoveCards';
import BulkAddForm from './BulkAdd/BulkAddForm';
import { fetchCardsById } from '../../data/cards/operations';
import { getSetCards } from '../../data/cards/utils';

function CustomSetBuilder() {
    const dispatch = useDispatch()
    const history = useHistory();
    const cardSetsById = useSelector(getCardSetsById)
    const params: { id: string } = useParams()
    const currSet = Object.values(cardSetsById).find((set) => set.set_name === params.id)
    if (!currSet) {
        history.push("/")
    }

    useEffect(() => {
        if(currSet) {
            getSetCards(currSet, dispatch)
        }
        
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        if(currSet?.card_ids) {
            fetchCardsById(dispatch, currSet!.card_ids || [] , currSet!.id)
        }
        
    }, [currSet?.card_ids]) // eslint-disable-line react-hooks/exhaustive-deps

    const [activeTab, setActiveTab] = useState("Add/Remove Cards")

    function tabContent() {
        switch (activeTab) {
            case "Add/Remove Cards":
                return <AddRemoveCards set={currSet!}/>;
            case "Add from Sets":
                return 'bar';
            case "Bulk Add":
                return <BulkAddForm toggleCustomSetPopupVisiblity={() => null} isQuickCreate={true} set={currSet}/>;
        }
    }

    return (
        <div className="maxWH setBuilderWrapper">
            <div className="BoosterPickerWrapper d-flex justify-content-center row h-100">
                <div className="BoosterWindowedArea bd-highlight col-sm-12">
                    <ul className="nav nav-tabs justify-content-center">
                        <div className="d-flex flex-row flex-wrap justify-content-center">
                            <li className=""><div className="SetBuilderTitle">{params.id}</div></li>
                            <NavItem text="Add/Remove Cards" activeTab={activeTab} setActiveTab={setActiveTab} />
                            <NavItem text="Add from Sets" activeTab={activeTab} setActiveTab={setActiveTab} />
                            <NavItem text="Bulk Add" activeTab={activeTab} setActiveTab={setActiveTab} />
                        </div>
                    </ul>
                    { tabContent() }
                </div>

            </div>
        </div>


    );
}

export default CustomSetBuilder;


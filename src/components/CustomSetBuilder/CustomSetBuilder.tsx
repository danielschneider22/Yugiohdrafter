import './CustomSetBuilder.css';

import { useSelector } from 'react-redux';

import { getCardSetsById } from '../../data/cardSets/selectors';
import { useHistory, useParams } from 'react-router-dom';
import NavItem from '../NavItem/NavItem';
import { useState } from 'react';
import AddRemoveCards from './AddRemoveCards/AddRemoveCards';

function CustomSetBuilder() {
    // const dispatch = useDispatch();
    const history = useHistory();
    const cardSetsById = useSelector(getCardSetsById)
    const params: { id: string } = useParams()
    const currSet = Object.values(cardSetsById).find((set) => set.set_name === params.id)
    if (!currSet) {
        history.push("/")
    }

    const [activeTab, setActiveTab] = useState("Add/Remove Cards")

    function tabContent() {
        switch (activeTab) {
            case "Add/Remove Cards":
                return <AddRemoveCards />;
            case "Add from Sets":
                return 'bar';
            case "Bulk Add":
                return 'bar';
        }
    }

    return (
        <div className="maxWH">
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


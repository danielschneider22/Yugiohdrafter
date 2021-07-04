import { ChangeEvent, useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchCardsByName } from '../../data/cards/operations';
import { addSet } from '../../data/cardSets/actions';
import './CustomSetPopup.css';

interface ParentProps{
    toggleCustomSetPopupVisiblity: () => void
}

function CustomSetPopup(props: ParentProps) {
    const placeHolderText = `Jinzo
Dark Magician
Blue-Eyes White Dragon
  `;

    const [setName, setSetName] = useState("")
    const [cardList, setCardList] = useState("")
    const dispatch = useDispatch();

    const doUpdate = (updateFunc: React.Dispatch<React.SetStateAction<string>>) => function updateState(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        updateFunc(event.currentTarget.value)
    }

    async function submit() {
        const cardNames = cardList.split(/\r?\n/);
        dispatch(addSet({set_name: setName, set_code: setName, num_of_cards: cardNames.length, tcg_date: Date(), custom_set: true}))
        await fetchCardsByName(dispatch, cardNames, setName)
        props.toggleCustomSetPopupVisiblity()
    }

    return (
        <div className="container-fluid container-xl d-flex align-items-center justify-content-between">
            <nav id="navbar" className="navbar navbar-mobile customSet">
                <ul className="form-group">
                    <div className="container contact">
                        <div className="row h-100">
                            <div className="col-lg-12">
                                <div className="contact-form h-100">
                                    <div className="CreateCustomSetTitle">
                                        Create a Custom Set
                                    </div>
                                    <div className="form-group setName">
                                        <label className="control-label col-6" htmlFor="setName">Set Name:</label>
                                        <div className="col-6">          
                                            <input value={setName} onChange={doUpdate(setSetName)} type="text" className="form-control" placeholder="Enter Set Name" name="setName"/>
                                        </div>
                                    </div>
                                    <div className="form-group CreateSetTextArea cardList">
                                        <label className="control-label col-6" htmlFor="cardList">Card List:</label>
                                        <div className="col-12">
                                            <textarea value={cardList} onChange={doUpdate(setCardList)} className="form-control" placeholder={placeHolderText} name="cardList"></textarea>
                                        </div>
                                    </div>
                                    <div className="form-group submit">        
                                        <button type="submit" className="btn-lg btn-default" onClick={submit}>Submit</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </ul>
                <i className={"bi mobile-nav-toggle bi-list bi-x"} onClick={props.toggleCustomSetPopupVisiblity}></i>
            </nav>
        </div>
    );
}

export default CustomSetPopup;

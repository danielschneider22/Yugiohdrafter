import React, { ChangeEvent, useState } from 'react';
import { useDispatch } from 'react-redux';
import { ip } from '../../App';
import { fetchCardsByName } from '../../data/cards/operations';
import { addSet } from '../../data/cardSets/actions';
import { isMobile } from 'react-device-detect';
import './CustomSetPopup.css';

interface ParentProps{
    toggleCustomSetPopupVisiblity: () => void
}

function CustomSetPopup(props: ParentProps) {
    const placeHolderText = isMobile ? "Card List (one card per line)" :`Jinzo\nDark Magician\nBlue-Eyes White Dragon
  `;

    const [setName, setSetName] = useState("")
    const [cardList, setCardList] = useState("")
    const dispatch = useDispatch();

    const doUpdate = (updateFunc: React.Dispatch<React.SetStateAction<string>>) => function updateState(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        updateFunc(event.currentTarget.value)
    }

    async function submit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        const cardNames = cardList.split(/\r?\n/);
        const setId = setName + "|" + ip
        dispatch(addSet({id: setId, set_name: setName, set_code: setName, num_of_cards: cardNames.length, tcg_date: Date(), custom_set: true}))
        const successFetchCards = await fetchCardsByName(dispatch, cardNames, setId)
        if(successFetchCards)
            props.toggleCustomSetPopupVisiblity()
    }

    return (
        <div className="container-fluid container-xl d-flex align-items-center justify-content-between">
            <nav id="navbar" className="navbar navbar-mobile customSet">
                <ul className="form-group">
                    <div className="container contactPopup">
                        <div className="row h-100">
                            <div className="col-lg-12">
                                <form onSubmit={submit} className="contact-form h-100">
                                    <div className="CreateCustomSetTitle">
                                        Create a Custom Set
                                    </div>
                                    <div className="form-group setName">
                                        <label className="control-label col-6" htmlFor="setName">Set Name:</label>
                                        <div className="col-6">          
                                            <input value={setName} onChange={doUpdate(setSetName)} type="text" className="form-control form-control-white" placeholder="Enter Set Name" name="setName" required/>
                                        </div>
                                    </div>
                                    <div className="form-group CreateSetTextArea cardList">
                                        <label className="control-label col-6" htmlFor="cardList">Card List:</label>
                                        <div className="col-12">
                                            <textarea value={cardList} onChange={doUpdate(setCardList)} className="form-control form-control-white" placeholder={placeHolderText} name="cardList" required></textarea>
                                        </div>
                                    </div>
                                    <div className="form-group submit">        
                                        <button type="submit" className="btn-lg btn-default">Submit</button>
                                    </div>
                                </form>
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

import React, { ChangeEvent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { isMobile } from 'react-device-detect';
import { fetchCardsByName } from '../../../data/cards/operations';
import { addSet } from '../../../data/cardSets/actions';
import { getSetId, publishCardSetFetchThunk } from '../../../data/cardSets/operations';
import  styles from '../../CustomSetPopup/CustomSetPopup.module.css';
import { CardSet } from '../../../constants/CardSet';
import _ from 'lodash';
import { toastBGColorDict } from '../../../constants/Toast';
import { addToast } from '../../../data/toasts/actions';
import { getUserEmail } from '../../../data/login/selectors';

interface ParentProps{
    toggleCustomSetPopupVisiblity: (isQuickCreate: boolean) => void
    isQuickCreate: boolean
    set?: CardSet
    isDarkTheme?: boolean
}

function BulkAddForm(props: ParentProps) {
    const {isQuickCreate, toggleCustomSetPopupVisiblity, set, isDarkTheme} = {...props}
    const placeHolderText = isMobile ? "Card List (one card per line)" :`Jinzo\nDark Magician\nBlue-Eyes White Dragon
  `;

    const [setName, setSetName] = useState("")
    const [cardList, setCardList] = useState("")
    const dispatch = useDispatch();
    // const history = {} // useHistory();
    const userEmail = useSelector(getUserEmail)

    const doUpdate = (updateFunc: React.Dispatch<React.SetStateAction<string>>) => function updateState(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        updateFunc(event.currentTarget.value)
    }

    async function submit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        if(isQuickCreate && !set){
            const cardNames = cardList.split(/\r?\n/);
            const setId = getSetId(setName)
            const cardSet = {id: setId, set_name: setName, set_code: setName, num_of_cards: cardNames.length, tcg_date: Date(), custom_set: true, author: userEmail, card_ids: []}
            dispatch(addSet(cardSet))
            dispatch(publishCardSetFetchThunk(cardSet))
            const successFetchCards = await fetchCardsByName(dispatch, cardNames, setId, "add")
            if(successFetchCards){
                toggleCustomSetPopupVisiblity(isQuickCreate)
                // history.push(`/CustomSetBuilder/${setName}`)
                dispatch(addToast({id: _.uniqueId("built-set-"), type: "Success", description: setName, title: "Custom Set Created", backgroundColor: toastBGColorDict["Success"]}))
            }
        } else if(!set) {
            const cardSet = {id: getSetId(setName), set_name: setName, set_code: setName, num_of_cards: 0, tcg_date: Date(), custom_set: true, author: userEmail, card_ids: []}
            dispatch(addSet(cardSet))
            dispatch(publishCardSetFetchThunk(cardSet))
            toggleCustomSetPopupVisiblity(isQuickCreate)
            // history.push(`/CustomSetBuilder/${setName}`)
            dispatch(addToast({id: _.uniqueId("built-set-"), type: "Success", description: setName, title: "Custom Set Created", backgroundColor: toastBGColorDict["Success"]}))
        } else {
            const cardNames = cardList.split(/\r?\n/);
            const setId = set!.id
            await fetchCardsByName(dispatch, cardNames, setId, "add")
            dispatch(addToast({id: _.uniqueId("built-set-"), type: "Success", description: set.set_name, title: "Cards added to Custom Set", backgroundColor: toastBGColorDict["Success"]}))
        }
        
    }

    return (
        <form onSubmit={submit} className="contact-form h-100">
            {!set && <>
                <div className="CreateCustomSetTitle">
                    Create a Custom Set
                </div>
                <div className="form-group setName">
                    <label className="control-label col-6" htmlFor="setName">Set Name:</label>
                    <div className={isQuickCreate ? "col-6" : "col-12"}>          
                        <input value={setName} onChange={doUpdate(setSetName)} type="text" className="form-control form-control-white" placeholder="Enter Set Name" name="setName" required/>
                    </div>
                </div>
            </>}
            {isQuickCreate &&
                <div className="form-group CreateSetTextArea cardList">
                <label className="control-label col-6" htmlFor="cardList">Card List:</label>
                <div className="col-12">
                    <textarea value={cardList} onChange={doUpdate(setCardList)} className={`form-control form-control-white ${isDarkTheme ? "dark-themed-textarea" : ""}`} placeholder={placeHolderText} name="cardList" required></textarea>
                </div>
            </div>
            }
            
            <div className="form-group submit">        
                <button type="submit" className="btn-lg btn-default submitButton">Submit</button>
            </div>
        </form>
    );
}

export default BulkAddForm;

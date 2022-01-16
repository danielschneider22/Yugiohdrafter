import _ from 'lodash';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { Booster } from '../../constants/Booster';
import { removeAllBoosters, resetBoosterCards, setBoosters } from '../../data/boosters/actions';
import { getSetsForBoosters } from '../../data/cards/utils';
import { getCardSetsById } from '../../data/cardSets/selectors';
import { clearRoomInfo } from '../../data/data/rooms/actions';
import { resetDeckAndSideboard } from '../../data/deck/actions';
import { initialiazeDraftPod } from '../../data/draftPod/actions';
import CustomSetPopup from '../CustomSetPopup/CustomSetPopup';

import cardImage from '../../assets/logo.png';
import CustomSetEditPopup from '../CustomSetEditPopup/CustomSetEditPopup';
import { getUserEmail } from '../../data/login/selectors';
import { logoutThunk } from '../../data/login/operations';

function NavBar() {
    /* eslint-disable jsx-a11y/anchor-is-valid */
    const [mobileMenuShown, setMobileMenuShown] = useState(false)
    const cardSets = useSelector(getCardSetsById)
    const dispatch = useDispatch();
    const history = useHistory();

    const loggedIn = !!useSelector(getUserEmail)

    const latestSet = Object.keys(cardSets).length > 0 ? Object.values(cardSets).filter((set) => !set.custom_set && set.num_of_cards > 60).sort((a, b) => +new Date(b.tcg_date) - +new Date(a.tcg_date))[0] : undefined
    const customSets = Object.keys(cardSets).length > 0 ? Object.values(cardSets).filter((set) => set.custom_set) : []
    function toggleMobileMenu() {
        setMobileMenuShown(!mobileMenuShown)
    }

    const [quickDraftDropdownVisible, setQuickDraftDropdownVisible] = useState(false)
    function showQuickDraftDropdown(){
        if(mobileMenuShown)
            setQuickDraftDropdownVisible(!quickDraftDropdownVisible)
    }

    const [customSetsDropdownVisible, setCustomSetsDropdownVisible] = useState(false)
    function showCustomSetsDropdown(){
        if(mobileMenuShown)
            setCustomSetsDropdownVisible(!customSetsDropdownVisible)
    }

    const [customSetPopupVisible, setCustomSetPopupVisiblity] = useState(false)
    const [isQuickCreate, setIsQuickCreate] = useState(false)
    function toggleCustomSetPopupVisiblity(isQuickCreate: boolean){
        if(customSetPopupVisible) {
            setMobileMenuShown(false)
        }
        setIsQuickCreate(isQuickCreate)
        setCustomSetPopupVisiblity(!customSetPopupVisible)
    }

    const [customSetEditPopupVisible, setCustomSetEditPopupVisiblity] = useState(false)
    function toggleCustomSetEditPopupVisiblity(){
        if(customSetEditPopupVisible) {
            setMobileMenuShown(false)
        }
        setCustomSetEditPopupVisiblity(!customSetEditPopupVisible)
    }

    function quickDraft(set_name: string) {
        const boosters: Booster[] = []
        if(set_name === "retro_draft_custom") {
            for ( let i = 0; i <= 4; i++ ) { 
                boosters.push({cardSetName: "Retro Pack", id: _.uniqueId("booster-")})
            }
            for ( let i = 0; i <= 4; i++ ) { 
                boosters.push({cardSetName: "Retro Pack 2", id: _.uniqueId("booster-")})
            }
            
        } else if (set_name === "battle_pack_custom") {
            for ( let i = 0; i <= 8; i++ ) {
                const randomType = Math.floor(Math.random() * 3);
                let battlePackType = ""
                switch(randomType){
                    case 0:
                        battlePackType = "Battle Pack: Epic Dawn"
                        break;
                    case 1:
                        battlePackType = "Battle Pack 2: War of the Giants"
                        break;
                    case 2:
                        battlePackType = "Battle Pack 3: Monster League"
                        break;
                }
                boosters.push({cardSetName: battlePackType, id: _.uniqueId("booster-")})
            }
        } else {
            for ( let i = 0; i <= 8; i++ ) {
                boosters.push({cardSetName: set_name, id: _.uniqueId("booster-")})
            }
        }
        
        dispatch(initialiazeDraftPod(8, 5, 9, ""))
        dispatch(removeAllBoosters("draftBooster"))
        dispatch(setBoosters(boosters, "landingPageBooster"))
        getSetsForBoosters(Object.values(boosters), dispatch)
        history.push("/Draft")
        setMobileMenuShown(false)
    }

    function goHome() {
        history.push("/")
        defaultClearAndClose()
    }

    function defaultClearAndClose() {
        dispatch(removeAllBoosters("draftBooster"))
        dispatch(resetDeckAndSideboard())
        dispatch(resetBoosterCards("landingPageBooster"))
        dispatch(clearRoomInfo())
        setMobileMenuShown(false)
        const selectHeader = document.getElementById("header")
        selectHeader!.classList.remove('header-scrolled')
    }

    function logout() {
        dispatch(logoutThunk())
    }
    
    return (
        <header id="header" className={"header fixed-top" + (mobileMenuShown ? " forceNavToFront" : "")}>
            {customSetPopupVisible && <CustomSetPopup isQuickCreate={isQuickCreate} toggleCustomSetPopupVisiblity={toggleCustomSetPopupVisiblity} />}
            {customSetEditPopupVisible && <CustomSetEditPopup toggleCustomSetEditPopupVisiblity={toggleCustomSetEditPopupVisiblity} />}
            {!customSetPopupVisible && !customSetEditPopupVisible && 
                <div className="container-fluid container-xl d-flex align-items-center justify-content-between">
                <div className="logo d-flex align-items-center" onClick={goHome}>
                    <img src={cardImage} alt="" />
                    <span>YugiohDrafter</span>
                </div>

                <nav id="navbar" className={"navbar" + (mobileMenuShown ? " navbar-mobile" : "")}>
                    <ul>
                        <li><Link to="/" className="nav-link scrollto" onClick={() => defaultClearAndClose()}>Home</Link></li>
                        <li className="dropdown" onClick={showCustomSetsDropdown}><a href="#"><span>Custom Sets</span> <i className="bi bi-chevron-down"></i></a>
                            <ul className={customSetsDropdownVisible ? "dropdown-active" : ""}>
                                <li><a href="#" onClick={() => toggleCustomSetPopupVisiblity(false)}>Create Custom Set</a></li>
                                <li><a href="#" onClick={toggleCustomSetEditPopupVisiblity}>Edit Custom Sets</a></li>
                                <li><a href="#" onClick={() => toggleCustomSetPopupVisiblity(true)}>Quick Create from List</a></li>
                            </ul>
                        </li>
                        {/* <input onChange={(event) => setIP(event.currentTarget.value)} /> */}
                        <li className="dropdown" onClick={showQuickDraftDropdown}><a href="#"><span>Quick Draft</span> <i className="bi bi-chevron-down"></i></a>
                            <ul className={quickDraftDropdownVisible ? "dropdown-active" : ""}>
                                <li><a href="#" onClick={() => quickDraft("retro_draft_custom")}>Retro Draft</a></li>
                                <li><a href="#" onClick={() => quickDraft("battle_pack_custom")}>Battle Pack Draft</a></li>
                                {latestSet && <li><a href="#" onClick={() => quickDraft(latestSet.id)}>{latestSet.id} Draft</a></li>}
                                {customSets.map((set) => <li key={set.id}><a href="#" onClick={() => quickDraft(set.id)}>{set.set_name}</a></li>)}
                                
                            </ul>
                        </li>
                        <li><a className="nav-link scrollto" href="/contactus">Contact us</a></li>
                        { !loggedIn &&
                            <li><a className="nav-link scrollto" href="/login">Login</a></li>
                        }
                        { loggedIn &&
                            <li><a className="nav-link scrollto" href="#" onClick={() => logout()}>Logout</a></li>
                        }
                        
                        <li className="social"><a href="https://twitter.com/YDrafter"><i className="bi bi-twitter"></i></a></li>
                        <li className="social"><a href="https://www.facebook.com/groups/341002234334925"><i className="bi bi-facebook"></i></a></li>
                        <li className="social"><a href="https://github.com/danielschneider22/Yugiohdrafter"><i className="bi bi-github"></i></a></li>
                    </ul>
                    <i className={"bi mobile-nav-toggle bi-list" + (mobileMenuShown ? " bi-x" : " bi-list")} onClick={toggleMobileMenu}></i>
                </nav>

                </div>
            }
            
        </header>
    );
}

export default NavBar;

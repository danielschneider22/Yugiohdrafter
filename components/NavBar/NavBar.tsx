import _ from 'lodash';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Booster } from '../../constants/Booster';
import { removeAllBoosters, resetBoosterCards, setBoosters } from '../../data/boosters/actions';
import { getSetsForBoosters } from '../../data/cards/utils';
import { getCardSetsAccessibleToCurrUser, getCardSetsById } from '../../data/cardSets/selectors';
import { clearRoomInfo } from '../../data/data/rooms/actions';
import { resetDeckAndSideboard } from '../../data/deck/actions';
import { initialiazeDraftPod } from '../../data/draftPod/actions';
import CustomSetPopup from '../CustomSetPopup/CustomSetPopup';

import cardImage from '../../assets/logo.png';
import CustomSetEditPopup from '../CustomSetEditPopup/CustomSetEditPopup';
import { getUserEmail } from '../../data/login/selectors';
import { logoutThunk } from '../../data/login/operations';
import { toastBGColorDict } from '../../constants/Toast';
import { addToast } from '../../data/toasts/actions';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

function NavBar() {
    /* eslint-disable jsx-a11y/anchor-is-valid */
    const [mobileMenuShown, setMobileMenuShown] = useState(false)
    const cardSets = useSelector(getCardSetsById)
    const accessibleCardSets = useSelector(getCardSetsAccessibleToCurrUser)
    const dispatch = useDispatch();
    const router = useRouter();

    const loggedIn = !!useSelector(getUserEmail)

    const latestSet = Object.keys(accessibleCardSets).length > 0 ? Object.values(accessibleCardSets).filter((set) => !set.custom_set && set.num_of_cards > 60).sort((a, b) => +new Date(b.tcg_date) - +new Date(a.tcg_date))[0] : undefined
    const customSets = Object.keys(accessibleCardSets).length > 0 ? Object.values(accessibleCardSets).filter((set) => set.custom_set) : []
    function toggleMobileMenu() {
        setMobileMenuShown(!mobileMenuShown)
    }

    const [quickDraftDropdownVisible, setQuickDraftDropdownVisible] = useState(false)
    function showQuickDraftDropdown() {
        if (mobileMenuShown)
            setQuickDraftDropdownVisible(!quickDraftDropdownVisible)
    }

    const [customSetsDropdownVisible, setCustomSetsDropdownVisible] = useState(false)
    function showCustomSetsDropdown() {
        if (mobileMenuShown)
            setCustomSetsDropdownVisible(!customSetsDropdownVisible)
    }

    function redirectToLoginPageIfNotLoggedIn() {
        if (!loggedIn) {
            dispatch(addToast({ id: _.uniqueId("message-sent-"), type: "Warning", description: "Login to View and Edit Custom Sets", title: "Login", backgroundColor: toastBGColorDict["Warning"] }))
            router.push("/login")
            return false
        }
        return true
    }

    const [customSetPopupVisible, setCustomSetPopupVisiblity] = useState(false)
    const [isQuickCreate, setIsQuickCreate] = useState(false)
    function toggleCustomSetPopupVisiblity(isQuickCreate: boolean) {
        if (redirectToLoginPageIfNotLoggedIn()) {
            if (customSetPopupVisible) {
                setMobileMenuShown(false)
            }
            setIsQuickCreate(isQuickCreate)
            setCustomSetPopupVisiblity(!customSetPopupVisible)
        }

    }

    const [customSetEditPopupVisible, setCustomSetEditPopupVisiblity] = useState(false)
    function toggleCustomSetEditPopupVisiblity() {
        if (redirectToLoginPageIfNotLoggedIn()) {
            if (customSetEditPopupVisible) {
                setMobileMenuShown(false)
            }
            setCustomSetEditPopupVisiblity(!customSetEditPopupVisible)
        }
        
    }

    function quickDraft(set_name: string) {
        const boosters: Booster[] = []
        if (set_name === "retro_draft_custom") {
            for (let i = 0; i <= 4; i++) {
                boosters.push({ cardSetName: "Retro Pack", id: _.uniqueId("booster-") })
            }
            for (let i = 0; i <= 4; i++) {
                boosters.push({ cardSetName: "Retro Pack 2", id: _.uniqueId("booster-") })
            }

        } else if (set_name === "battle_pack_custom") {
            for (let i = 0; i <= 8; i++) {
                const randomType = Math.floor(Math.random() * 3);
                let battlePackType = ""
                switch (randomType) {
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
                boosters.push({ cardSetName: battlePackType, id: _.uniqueId("booster-") })
            }
        } else {
            for (let i = 0; i <= 8; i++) {
                boosters.push({ cardSetName: set_name, id: _.uniqueId("booster-") })
            }
        }

        dispatch(initialiazeDraftPod(8, 5, 9, ""))
        dispatch(removeAllBoosters("draftBooster"))
        dispatch(setBoosters(boosters, "landingPageBooster"))
        getSetsForBoosters(Object.values(boosters), dispatch, cardSets)
        router.push("/Draft")
        setMobileMenuShown(false)
    }

    // function defaultClearAndClose() {
    //     dispatch(removeAllBoosters("draftBooster"))
    //     dispatch(resetDeckAndSideboard())
    //     dispatch(resetBoosterCards("landingPageBooster"))
    //     dispatch(clearRoomInfo())
    //     setMobileMenuShown(false)
    //     const selectHeader = document.getElementById("header")
    //     selectHeader!.classList.remove('header-scrolled')
    // }

    function logout() {
        dispatch(logoutThunk())
    }

    return (
        <header id="header" className={"header fixed-top" + (mobileMenuShown ? " forceNavToFront" : "")}>
            {customSetPopupVisible && <CustomSetPopup isQuickCreate={isQuickCreate} toggleCustomSetPopupVisiblity={toggleCustomSetPopupVisiblity} />}
            {customSetEditPopupVisible && <CustomSetEditPopup toggleCustomSetEditPopupVisiblity={toggleCustomSetEditPopupVisiblity} />}
            {!customSetPopupVisible && !customSetEditPopupVisible &&
                <div className="container-fluid container-xl d-flex align-items-center justify-content-between">
                    <Link href="/">
                        <div className="logo d-flex align-items-center">
                            { <Image src={cardImage} alt="Yugioh Drafter Logo" />}
                            <span>YugiohDrafter</span>
                        </div>
                    </Link>

                    <nav id="navbar" className={"navbar" + (mobileMenuShown ? " navbar-mobile" : "")}>
                        <ul>
                            {<li><Link href="/"><a className="nav-link scrollto">Home</a></Link></li>}
                            <li className="dropdown" onClick={showCustomSetsDropdown}><a href="#"><span>Custom Sets</span> <i className="bi bi-chevron-down"></i></a>
                                <ul className={customSetsDropdownVisible ? "dropdown-active" : ""}>
                                    <li><a href="#" onClick={() => toggleCustomSetPopupVisiblity(false)}>Create Custom Set</a></li>
                                    <li><a href="#" onClick={toggleCustomSetEditPopupVisiblity}>Edit Custom Sets</a></li>
                                    <li><a href="#" onClick={() => toggleCustomSetPopupVisiblity(true)}>Quick Create from List</a></li>
                                </ul>
                            </li>
                            <li className="dropdown" onClick={showQuickDraftDropdown}><a href="#"><span>Quick Draft</span> <i className="bi bi-chevron-down"></i></a>
                                <ul className={quickDraftDropdownVisible ? "dropdown-active" : ""}>
                                    <li><a href="#" onClick={() => quickDraft("retro_draft_custom")}>Retro Draft</a></li>
                                    <li><a href="#" onClick={() => quickDraft("battle_pack_custom")}>Battle Pack Draft</a></li>
                                    {latestSet && <li><a href="#" onClick={() => quickDraft(latestSet.id)}>{latestSet.id} Draft</a></li>}
                                    {customSets.map((set) => <li key={set.id}><a href="#" onClick={() => quickDraft(set.id)}>{set.set_name}</a></li>)}

                                </ul>
                            </li>
                            <li><Link className="nav-link scrollto" href="/contactUs">Contact us</Link></li>
                            {!loggedIn &&
                                <li><Link href="/login"><a className="nav-link scrollto">Login</a></Link></li>
                            }
                            {loggedIn &&
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

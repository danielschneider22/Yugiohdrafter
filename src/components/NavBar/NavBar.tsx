import { useState } from "react";
import logo from "../../images/logo.png";

interface ParentProps {
    changePage: React.Dispatch<React.SetStateAction<string>>
}

function NavBar(props: ParentProps) {

    const [mobileMenuShown, setMobileMenuShown] = useState(false)
    function toggleMobileMenu() {
        setMobileMenuShown(!mobileMenuShown)
    }

    const [quickDraftDropdownVisible, setQuickDraftDropdownVisible] = useState(false)
    function showQuickDraftDropdown(){
        if(mobileMenuShown)
            setQuickDraftDropdownVisible(!quickDraftDropdownVisible)
    }
    
    return (
        <header id="header" className={"header fixed-top" + (mobileMenuShown ? " forceNavToFront" : "")}>
            <div className="container-fluid container-xl d-flex align-items-center justify-content-between">

            <div className="logo d-flex align-items-center" onClick={() => props.changePage("LandingPage")}>
                <img src="assets/img/logo.png" alt="" />
                <span>YugiohDrafter</span>
            </div>

            <nav id="navbar" className={"navbar" + (mobileMenuShown ? " navbar-mobile" : "")}>
                <ul>
                <li><a className="nav-link scrollto active" href="" onClick={() => props.changePage("LandingPage")}>Home</a></li>
                <li><a className="nav-link scrollto" href="#about">Join Draft</a></li>
                <li><a className="nav-link scrollto" href="#about">Create Custom Booster</a></li>
                <li className="dropdown" onClick={showQuickDraftDropdown}><a href="#"><span>Quick Draft</span> <i className="bi bi-chevron-down"></i></a>
                    <ul className={quickDraftDropdownVisible ? "dropdown-active" : ""}>
                    <li><a href="#">Retro Draft</a></li>
                    <li><a href="#">All Star Draft</a></li>
                    <li><a href="#">Yugi Draft</a></li>
                    <li><a href="#">Kaiba Draft</a></li>
                    </ul>
                </li>
                <li><a className="nav-link scrollto" href="#contact">Contact us</a></li>
                </ul>
                <i className={"bi mobile-nav-toggle bi-list" + (mobileMenuShown ? " bi-x" : " bi-list")} onClick={toggleMobileMenu}></i>
            </nav>

            </div>
        </header>
    );
}

export default NavBar;

import logo from "../../images/logo.png";

interface ParentProps {
    changePage: React.Dispatch<React.SetStateAction<string>>
}

function NavBar(props: ParentProps) {
    return (
        <header id="header" className="header fixed-top">
            <div className="container-fluid container-xl d-flex align-items-center justify-content-between">

            <a href="index.html" className="logo d-flex align-items-center">
                <img src="assets/img/logo.png" alt="" />
                <span>YugiohDrafter</span>
            </a>

            <nav id="navbar" className="navbar">
                <ul>
                <li><a className="nav-link scrollto active" href="#hero">Home</a></li>
                <li><a className="nav-link scrollto" href="#about">Join Draft</a></li>
                <li><a className="nav-link scrollto" href="#about">Create Custom Booster</a></li>
                <li className="dropdown"><a href="#"><span>Quick Draft</span> <i className="bi bi-chevron-down"></i></a>
                    <ul className="">
                    <li><a href="#">Retro Draft</a></li>
                    <li><a href="#">All Star Draft</a></li>
                    <li><a href="#">Yugi Draft</a></li>
                    <li><a href="#">Kaiba Draft</a></li>
                    </ul>
                </li>
                <li><a className="nav-link scrollto" href="#contact">Contact us</a></li>
                </ul>
                <i className="bi mobile-nav-toggle bi-list"></i>
            </nav>

            </div>
        </header>
    );
    // return (
    //     <div className="pos-f-t">
    //         <div className="collapse" id="navbarToggleExternalContent">
    //             <div className="navbar-collapse" style={{marginLeft: "5px"}} id="navbarTogglerDemo01">
    //                 <a className="navbar-brand" href="#" onClick={() => props.changePage("LandingPage")}>Yugioh Drafter</a>
    //                 {/* <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
    //                     <li className="nav-item active">
    //                         <a className="nav-link" href="#" onClick={() => props.changePage("LandingPage")}>Home</a>
    //                     </li>
    //                     <li className="nav-item">
    //                         <a className="nav-link" href="#">Join Draft Room</a>
    //                     </li>
    //                 </ul> */}
    //             </div>
    //         </div>
    //         <nav className="navbar navbar-dark navbar-expand bg-primary">
    //             {/* <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarToggleExternalContent" aria-controls="navbarToggleExternalContent" aria-expanded="false" aria-label="Toggle navigation">
    //                 <span className="navbar-toggler-icon"></span>
    //             </button> */}
    //             <div className="navbar-collapse" style={{marginLeft: "5px"}} id="navbarTogglerDemo01">
    //                 <a className="navbar-brand" href="#" onClick={() => props.changePage("LandingPage")}><img src={logo} height={50} width={50}></img>Yugioh Drafter</a>
    //                 {/* <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
    //                     <li className="nav-item active">
    //                         <a className="nav-link" href="#" onClick={() => props.changePage("LandingPage")}>Home</a>
    //                     </li>
    //                     <li className="nav-item">
    //                         <a className="nav-link" href="#">Join Draft Room</a>
    //                     </li>
    //                 </ul> */}
    //             </div>
    //         </nav>
    //     </div>

    // );
}

export default NavBar;

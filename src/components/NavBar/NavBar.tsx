import logo from "../../images/logo.png";

interface ParentProps {
    changePage: React.Dispatch<React.SetStateAction<string>>
}

function NavBar(props: ParentProps) {
    return (
        <div className="pos-f-t">
            <div className="collapse" id="navbarToggleExternalContent">
                <div className="navbar-collapse" style={{marginLeft: "5px"}} id="navbarTogglerDemo01">
                    <a className="navbar-brand" href="#" onClick={() => props.changePage("LandingPage")}>Yugioh Drafter</a>
                    {/* <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                        <li className="nav-item active">
                            <a className="nav-link" href="#" onClick={() => props.changePage("LandingPage")}>Home</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Join Draft Room</a>
                        </li>
                    </ul> */}
                </div>
            </div>
            <nav className="navbar navbar-dark navbar-expand bg-primary">
                {/* <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarToggleExternalContent" aria-controls="navbarToggleExternalContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button> */}
                <div className="navbar-collapse" style={{marginLeft: "5px"}} id="navbarTogglerDemo01">
                    <a className="navbar-brand" href="#" onClick={() => props.changePage("LandingPage")}><img src={logo} height={50} width={50}></img>Yugioh Drafter</a>
                    {/* <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                        <li className="nav-item active">
                            <a className="nav-link" href="#" onClick={() => props.changePage("LandingPage")}>Home</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Join Draft Room</a>
                        </li>
                    </ul> */}
                </div>
            </nav>
        </div>

    );
}

export default NavBar;

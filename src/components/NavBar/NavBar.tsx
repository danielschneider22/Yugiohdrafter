interface ParentProps {
    changePage: React.Dispatch<React.SetStateAction<string>>
}

function NavBar(props: ParentProps) {
    return (
        <div className="pos-f-t">
            <div className="collapse" id="navbarToggleExternalContent">
                <div className="bg-primary p-4">
                    <h4 className="text-white">Collapsed content</h4>
                    <span className="text-muted">Toggleable via the navbar brand.</span>
                </div>
            </div>
            <nav className="navbar navbar-dark navbar-expand-lg bg-primary">
                {/* <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarToggleExternalContent" aria-controls="navbarToggleExternalContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button> */}
                <div className="collapse navbar-collapse" style={{marginLeft: "5px"}} id="navbarTogglerDemo01">
                    <a className="navbar-brand" href="#">Yugioh Drafter</a>
                    <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                    <li className="nav-item active">
                        <a className="nav-link" href="#">Home</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">Join Draft Room</a>
                    </li>
                    </ul>
                </div>
            </nav>
        </div>

    );
}

export default NavBar;


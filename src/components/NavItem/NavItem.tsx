interface NavItemProps{
    text: string
    activeTab: string
    setActiveTab: React.Dispatch<React.SetStateAction<string>>
}

function NavItem(props: NavItemProps) {
    const {text, activeTab, setActiveTab} = {...props}
    return (
        <li className="nav-item">
            <div onClick={() => setActiveTab(text)} className={`nav-link ${activeTab === text ? "active" : ""}`}>
                {text}
            </div>
        </li>
    );
}

export default NavItem;


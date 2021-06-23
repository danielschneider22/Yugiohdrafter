import './Sidebar.css';

interface ParentProps{
  tabClicked: () => void
  tabsStyle: React.CSSProperties
  text: string
  showSidebar: boolean
}

function Sidebar(props: ParentProps) {
  const {tabClicked, tabsStyle, text, showSidebar} = props

  return (
    <div onClick={tabClicked} className={"CardPickerTab"} style={tabsStyle}>
        {text}
        <span className="TabArrow">{showSidebar ? "▼" :"▲"}</span>
    </div>
    
  );
}

export default Sidebar;

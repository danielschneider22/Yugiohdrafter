import { TabType } from './Sidebar';
import './Sidebar.css';

interface ParentProps{
  tabName: TabType
  tabClicked: () => void
  tabsStyle: React.CSSProperties
  text: string
  showSidebar: boolean
  isActive: boolean
  setActiveTab: React.Dispatch<React.SetStateAction<TabType>>
}

function Sidebar(props: ParentProps) {
  const {tabName, tabClicked, tabsStyle, text, showSidebar, isActive, setActiveTab} = props

  function onTabClicked() {
    if(isActive) {
      tabClicked()
    } else {
      if(!showSidebar)
        tabClicked()
      setActiveTab(tabName)
    }
  }

  return (
    <div onClick={onTabClicked} className={"CardPickerTab" + (isActive ? " ActiveTab" : " InactiveTab")} style={tabsStyle}>
        {text}
        <span className="TabArrow">{showSidebar ? "▼" :"▲"}</span>
    </div>
    
  );
}

export default Sidebar;

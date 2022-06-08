import { TabType } from './Sidebar';
import styles from './Sidebar.module.css';

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
    <div onClick={onTabClicked} className={styles.CardPickerTab + " "  + (isActive ? styles.ActiveTab : styles.InactiveTab)} style={tabsStyle}>
        {text}
        <span className={styles.TabArrow}>{showSidebar ? "▼" :"▲"}</span>
    </div>
    
  );
}

export default Sidebar;

import './CardPickerRightArea.css';

interface ParentProps{
  activeAreas: ("Deck" | "Sideboard" | "Draft")[]
  toggleSidebar: () => void
  showSidebar: boolean
}

function CardPickerRightArea(props: ParentProps) {
  const mainDeckStyle = props.showSidebar ? {left: "234px"} : {left: "-35px"}
  return (
    <div className={"CardPickerRightArea active clearfix"}>
      <div onClick={props.toggleSidebar} className={"sideboard-button"} style={mainDeckStyle}>Main Deck</div>
    </div> 
    
  );
}

export default CardPickerRightArea;

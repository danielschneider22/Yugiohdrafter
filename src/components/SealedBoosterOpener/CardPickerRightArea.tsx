import './CardPickerRightArea.css';

interface ParentProps{
  activeAreas: ("Deck" | "Sideboard" | "Draft")[]
}

function CardPickerRightArea(props: ParentProps) {
  return (
    <div className={"CardPickerRightArea active"}>
      <div className={"sideboard-button"}>Sideboard</div>
    </div> 
    
  );
}

export default CardPickerRightArea;

import './BottomBar.css';

import { useSelector } from 'react-redux';

import { getDeck, getSideboard } from '../../data/deck/selectors';
import { SortType } from '../../data/cards/utils';

interface ParentProps{
  sortType: SortType
  toggleSortType: React.Dispatch<React.SetStateAction<SortType>>

}

function BottomBar(props: ParentProps) {
  const {sortType, toggleSortType} = props

  const sideboard = useSelector(getSideboard)
  const deck = useSelector(getDeck)

  function exportToYDK() {
    const element = document.createElement("a");
    let exportString = "#main\n"
    deck.forEach((cardId) => exportString += cardId + "\n")
    exportString+= "#extra\n!side\n"
    sideboard.forEach((cardId) => exportString += cardId + "\n")
    const file = new Blob([exportString], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = "YugiohDeck.ydk";
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();
  }

  function changeSort() {
    switch (sortType){
      case "Name":
        toggleSortType("Type")
        break;
      case "Type":
        toggleSortType("Rarity")
        break;
      case "Rarity":
        toggleSortType("Name")
        break;
    }
  }

  return (
    <div className="BottomBar row">
        <div className="col-6 justify-content-center DeckCount row">
            <div className="col-4">Sort: </div>
            <div className="SortButton btn-secondary col-8" onClick={changeSort}>{sortType}</div>
        </div>
        <div className="col-2"/>
        <div className="btn-sm btn-success col-4 justify-content-center ExportButton" onClick={exportToYDK}>Export</div>
    </div>
  );
}

export default BottomBar;

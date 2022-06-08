import styles from './BottomBar.module.css';

import { useDispatch, useSelector } from 'react-redux';

import { getDeck, getExtraDeck, getSideboard } from '../../data/deck/selectors';
import { SortType } from '../../data/cards/utils';
import { useState } from 'react';
import { addToast } from '../../data/toasts/actions';
import _ from 'lodash';
import { toastBGColorDict } from '../../constants/Toast';
import { isMobile } from 'react-device-detect';

interface ParentProps{
  sortType: SortType
  toggleSortType: React.Dispatch<React.SetStateAction<SortType>>
  showExport: boolean
}

function BottomBar(props: ParentProps) {
  const {sortType, toggleSortType, showExport } = props
  const dispatch = useDispatch()
  const sideboard = useSelector(getSideboard)
  const deck = useSelector(getDeck)
  const extraDeck = useSelector(getExtraDeck)
  const [deckName, setDeckName] = useState("")

  function exportToYDK() {
    const element = document.createElement("a");
    let exportString = "#main\n"
    deck.forEach((cardId) => exportString += cardId + "\n")
    exportString+= "#extra\n"
    extraDeck.forEach((cardId) => exportString += cardId + "\n")
    exportString+= "!side\n"
    sideboard.forEach((cardId) => exportString += cardId + "\n")
    const file = new Blob([exportString], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = deckName ? `${deckName}.ydk` : "YugiohDeck.ydk";
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();
    if(sideboard.length > 15) {
      dispatch(addToast({id: _.uniqueId("sideboard-warning-"), type: "Warning", description: "Dueling Nexus has problems importing decks with sideboards/extra decks over 15 cards.", title: "Warning", backgroundColor: toastBGColorDict["Warning"]}))
    }
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
  let width = "50%"
  if(isMobile) 
      width = showExport ? "90%" : "50%"
  else
      width = showExport ? "30%" : "20%"

  return (
    <div className={`${styles.BottomBar} row`} style={{width}}>
        <div className={`justify-content-center ${styles.DeckCount} row ` + (showExport ? "col-6" : "col-11")}>
            <div className="col-4">Sort: </div>
            <div className={`${styles.SortButton} ${styles['btn-secondary']} btn-secondary col-8`} onClick={changeSort}>{sortType}</div>
        </div>
        <div className="col-1"/>
        { showExport &&
          <div className="col-5 justify-content-center">
            <div className={`input-group ${styles['export-input-group']}`}>
              <input type="text" onChange={(e) => setDeckName(e.currentTarget.value)} className="form-control" placeholder={isMobile ? "Deck" : "Deck Name"} aria-label="Small" aria-describedby="inputGroup-sizing" />
              <div className="input-group-append">
                <span className="input-group-text btn btn-success" id="inputGroup-sizing-sm" onClick={exportToYDK}>Export</span>
              </div>
            </div>
          </div>
        }
        
        
    </div>
  );
}

export default BottomBar;


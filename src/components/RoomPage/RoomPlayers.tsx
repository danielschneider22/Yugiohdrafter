import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { roomPlayersStateForRoomSel, roomPlayersStateSel } from "../../data/data/roomPlayers.ts/selectors";
import { roomByIdSel } from "../../data/data/rooms/selectors";
import { RootState } from "../../models/RootState";
import styles from './RoomPage.module.css'

function RoomPlayers() {
  const params: {id: string} = useParams()
  const room = useSelector((state: RootState) => roomByIdSel(state, params.id))
  const roomPlayers = useSelector((state: RootState) => roomPlayersStateForRoomSel(state, room))

  const Players: JSX.Element[] = roomPlayers.allIds.map((id: string) => {
    const player = roomPlayers.byId[id]
    const isReadySpan = player.isReady ?
      <span role="img" aria-label="checkmark" title='Ready'>✅</span>
      : <span role="img" aria-label="redcross" title='Not Ready'>❌</span>
    const isHostIcon = player.isHost ?
      <span role="img" aria-label="checkmark" title='Host'>👑</span>
      : <React.Fragment/>

    return (
      <li className={styles.roomPlayer} key={id}>
        {isReadySpan}    
        <span aria-label="player ID">&nbsp; {player.id}</span>
        <span>&nbsp; {isHostIcon}</span>
      </li>
    )
  })
  
  return (
    <ul className={styles.playersList}>
      {Players}
    </ul>
  );
}

export default RoomPlayers;

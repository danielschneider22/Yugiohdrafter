import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { ip } from "../../App";
import { RoomPlayer } from "../../constants/RoomPlayer";
import { roomChangeNameFetchThunk } from "../../data/data/roomPlayers.ts/operations";
import { roomPlayersStateForRoomSel, roomPlayersStateSel } from "../../data/data/roomPlayers.ts/selectors";
import { getRoomPlayerId } from "../../data/data/rooms/operations";
import { roomByIdSel } from "../../data/data/rooms/selectors";
import { RootState } from "../../models/RootState";
import styles from './RoomPage.module.css'

function isPlayerUser(roomPlayer: RoomPlayer, room: string){
  return roomPlayer.id === getRoomPlayerId(ip, room)
}

function RoomPlayers() {
  const params: {id: string} = useParams()
  const room = useSelector((state: RootState) => roomByIdSel(state, params.id))
  const roomPlayers = useSelector((state: RootState) => roomPlayersStateForRoomSel(state, room))
  const dispatch = useDispatch()

  const Players: JSX.Element[] = roomPlayers.allIds.map((id: string) => {
    const player = roomPlayers.byId[id]
    const isReadySpan = player.isReady ?
      <span role="img" aria-label="checkmark" title='Ready'>✅</span>
      : <span role="img" aria-label="redcross" title='Not Ready'>❌</span>
    const isHostIcon = player.isHost ?
      <span role="img" aria-label="checkmark" title='Host'>👑</span>
      : <React.Fragment/>

    function changeName(event: React.ChangeEvent<HTMLInputElement>) {
      dispatch(roomChangeNameFetchThunk(room.id, event.currentTarget.value))
    }

    const isCurrPlayer = isPlayerUser(player, room.id)
    return (
      <li className={styles.roomPlayer} key={id}>
        {isReadySpan}
        {isCurrPlayer && 
          <input className={styles.roomPlayerInput} value={player.name} onChange={changeName} />
        } 
        {!isCurrPlayer && 
          <span aria-label="player ID">&nbsp; {player.name}</span>
        }
        
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

import { useRouter } from "next/router";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RoomPlayer } from "../../constants/RoomPlayer";
import { getAllCardSetCardsFetched } from "../../data/boosters/selectors";
import { roomUpdatePlayerFetchThunk } from "../../data/data/roomPlayers.ts/operations";
import { roomPlayersStateForRoomSel } from "../../data/data/roomPlayers.ts/selectors";
import { getRoomPlayerId } from "../../data/data/rooms/operations";
import { roomByIdSel } from "../../data/data/rooms/selectors";
import { RootState } from "../../models/RootState";
import { ip } from "../../pages/_app";
import styles from './RoomPage.module.css'

function isPlayerUser(roomPlayer: RoomPlayer, room: string){
  return roomPlayer.id === getRoomPlayerId(ip, room)
}

function RoomPlayers() {
  const router = useRouter();
  const roomId = router.query.id as string
  const room = useSelector((state: RootState) => roomByIdSel(state, roomId))
  const roomPlayers = useSelector((state: RootState) => roomPlayersStateForRoomSel(state, room))
  const dispatch = useDispatch()
  const allCardSetCardsFetched = useSelector(getAllCardSetCardsFetched)

  const Players: JSX.Element[] = roomPlayers.allIds.map((id: string) => {
    const player = roomPlayers.byId[id]
    const isCurrPlayer = isPlayerUser(player, room.id)

    function toggleReady() {
      if(isCurrPlayer)
        dispatch(roomUpdatePlayerFetchThunk(room.id, {isReady: !player.isReady}))
    }

    const isReadySpan = player.isReady ?
      <button role="img" aria-label="checkmark" title='Ready' onClick={toggleReady} className={`btn btn-dark ${styles.checkButton} ${styles.readyButton} ${isCurrPlayer ? styles.currPlayerReadyButton : ""}`} disabled={!isCurrPlayer || !allCardSetCardsFetched}><i className="bi bi-check-circle-fill"></i></button>
      : <button role="img" aria-label="redcross" title='Not Ready' onClick={toggleReady} className={`btn btn-dark ${styles.xButton} ${styles.readyButton} ${isCurrPlayer ? styles.currPlayerReadyButton : ""}`} disabled={!isCurrPlayer || !allCardSetCardsFetched}><i className="bi bi-x-circle-fill"></i></button>
    const isHostIcon = player.isHost ?
      <span role="img" aria-label="checkmark" title='Host'>👑</span>
      : <React.Fragment/>

    function changeName(event: React.ChangeEvent<HTMLInputElement>) {
      dispatch(roomUpdatePlayerFetchThunk(room.id, {name: event.currentTarget.value}))
    }
    
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

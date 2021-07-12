import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { toastBGColorDict } from '../../constants/Toast';
import { getAllCardSetCardsFetched } from '../../data/boosters/selectors';
import { getUserPlayerInfo } from '../../data/data/roomPlayers.ts/selectors';
import { roomGetFetchThunk } from '../../data/data/rooms/operations';
import { roomByIdSel } from '../../data/data/rooms/selectors';
import { addToast } from '../../data/toasts/actions';
import { RootState } from '../../models/RootState';
import styles from './RoomPage.module.css'
import RoomPlayers from './RoomPlayers';

const COPIED_TO_CLIPBOARD_DURATION = 3000 // milliseconds

function RoomPage() {
  const params: {id: string} = useParams()
  const roomId = params.id
  const room = useSelector((state: RootState) => roomByIdSel(state, roomId))
  const dispatch = useDispatch()
  const [recentlyCopiedToClipboard, setRecentlyCopiedToClipboard] = useState(false)
  const allCardSetCardsFetched = useSelector(getAllCardSetCardsFetched)
  const userPlayer = useSelector(getUserPlayerInfo)

  function copyRoomUrlToClipboard() {
    navigator.clipboard.writeText(window.location.href)

    // should invoke setTimeout after this update to true has been performed, major lag required to make this an actual issue 
    setRecentlyCopiedToClipboard(true)
    dispatch(addToast({id: _.uniqueId("copy-to-clipboard-"), type: "Success", description: "Room URL Copied to Clipboard", title: "Success", backgroundColor: toastBGColorDict["Success"]}))
    // setTimeout(() => {setRecentlyCopiedToClipboard(false)}, COPIED_TO_CLIPBOARD_DURATION)
  }

  useEffect(() => {
    if(!room) {
      dispatch(roomGetFetchThunk(roomId))
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps
  
  if (room === null)
    return (
      <main className={styles.RoomPage}>
        <h2>Room Could Not Be Found (May Have Expired)</h2>
        <br />
        <h2><b className={styles.centerText}><Link to='/'>{'<- Back To Home'}</Link></b></h2>
      </main>
    )
  
  const recentlyCopiedText = recentlyCopiedToClipboard ?
    <span className={styles.recentlyCopiedText}> Room URL Copied to Clipboard</span>
    : <React.Fragment />
  
  function startDraft() {
    console.log("Start Draft")
  }
  
  return (
    <main className={styles.RoomPage}>
      <h2>
        Room &nbsp;
        <span className={styles.copyRoomUrlToClipboard} onClick={copyRoomUrlToClipboard}> 
          <b>{room.id}</b> 
          <span title='Copy Room Url To Clipboard'>&nbsp; 📋</span>
        </span>
        {/* {recentlyCopiedText} */}
      </h2>
      <RoomPlayers />
      { !allCardSetCardsFetched &&
        <div>Loading sets for draft...</div>
      }
      { userPlayer && userPlayer!.isHost &&
        <div className="d-flex justify-content-center">
          <button className={"btn-lg btn-success " + styles.LaunchButton} onClick={startDraft} disabled={!userPlayer.isReady}>Start Draft</button>
        </div>
      }
      { userPlayer && !userPlayer!.isHost &&
        <div className="d-flex justify-content-center">
          <button className={"btn-lg btn-dark " + styles.HostWaitButton} disabled>Waiting on Host to Start Draft</button>
        </div>
      }
      
    </main>
  )
}

export default RoomPage;
import _ from 'lodash';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toastBGColorDict } from '../../constants/Toast';
import { getAllCardSetCardsFetched, getDraftBoosterIds } from '../../data/boosters/selectors';
import { getUserPlayerInfo } from '../../data/data/roomPlayers.ts/selectors';
import { roomGetFetchThunk, roomStartDraftFetchThunk, roomStartSealedFetchThunk } from '../../data/data/rooms/operations';
import { roomByIdSel } from '../../data/data/rooms/selectors';
import { addToast } from '../../data/toasts/actions';
import { RootState } from '../../models/RootState';
import styles from './RoomPage.module.css'
import RoomPlayers from './RoomPlayers';

// const COPIED_TO_CLIPBOARD_DURATION = 3000 // milliseconds

function RoomPage() {
  const router = useRouter()
  const roomId = router.query.id as string
  const room = useSelector((state: RootState) => roomByIdSel(state, roomId))
  const dispatch = useDispatch()
  // const [recentlyCopiedToClipboard, setRecentlyCopiedToClipboard] = useState(false)
  const allCardSetCardsFetched = useSelector(getAllCardSetCardsFetched)
  const userPlayer = useSelector(getUserPlayerInfo)
  const draftBoostersIds = useSelector(getDraftBoosterIds)

  function copyRoomUrlToClipboard() {
    navigator.clipboard.writeText(window.location.href)

    // should invoke setTimeout after this update to true has been performed, major lag required to make this an actual issue 
    // setRecentlyCopiedToClipboard(true)
    dispatch(addToast({id: _.uniqueId("copy-to-clipboard-"), type: "Success", description: "Room URL Copied to Clipboard", title: "Success", backgroundColor: toastBGColorDict["Success"]}))
    // setTimeout(() => {setRecentlyCopiedToClipboard(false)}, COPIED_TO_CLIPBOARD_DURATION)
  }

  // initialization
  useEffect(() => {
    if(roomId) {
      if(!room) {
        dispatch(roomGetFetchThunk(roomId))
      }
      const updateRoomInterval = setInterval(() => dispatch(roomGetFetchThunk(roomId)), 3000);
      return () => {
        clearInterval(updateRoomInterval)
      };
    }
  }, [roomId])

  useEffect(() => {
    if(room && room.started && room.format === "draft") {
      router.push(`/room/draft/${roomId}`);
    }
    if(room && room.started && room.format === "sealed") {
      router.push(`/sealed`);
    }
  }, [draftBoostersIds, room]) // eslint-disable-line react-hooks/exhaustive-deps
  
  if (room === null)
    return (
      <main className={styles.RoomPage}>
        <h2>Room Could Not Be Found (May Have Expired)</h2>
        <br />
        <h2><b className={styles.centerText}><Link href="/">{'<- Back To Home'}</Link></b></h2>
      </main>
    )
  
  // const recentlyCopiedText = recentlyCopiedToClipboard ?
  //   <span className={styles.recentlyCopiedText}> Room URL Copied to Clipboard</span>
  //   : <React.Fragment />
  
  function start() {
    if(room.format === "draft")
      dispatch(roomStartDraftFetchThunk(router, roomId))
    else
     dispatch(roomStartSealedFetchThunk(router, roomId))
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
      { userPlayer?.isHost &&
        <div className={styles.SubtitleRoom}>Share the page url with other players to have them join.</div>
      }
      <RoomPlayers />
      { !allCardSetCardsFetched &&
        <div className={styles.loadSets}>Loading sets for draft...</div>
      }
      { userPlayer && userPlayer!.isHost &&
        <div className="d-flex justify-content-center">
          <button className={"btn-lg btn-success " + styles.LaunchButton} onClick={start} disabled={!userPlayer.isReady}>Start {room.format === "draft" ? "Draft" : "Sealed"}</button>
        </div>
      }
      { userPlayer && !userPlayer!.isHost &&
        <div className="d-flex justify-content-center">
          <button className={"btn-lg btn-dark " + styles.HostWaitButton} disabled>Waiting on Host to Start {room.format === "draft" ? "Draft" : "Sealed"}</button>
        </div>
      }
      
    </main>
  )
}

export default RoomPage;
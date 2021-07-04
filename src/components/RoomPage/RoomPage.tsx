import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { roomByIdSel } from '../../data/data/rooms/selectors';
import { RootState } from '../../models/RootState';
import styles from './RoomPage.module.css'

function RoomPage() {
  const dispatch = useDispatch();
  const params: {id: string} = useParams()
  const room = useSelector((state: RootState) => roomByIdSel(state, params.id))
  
  if (room === null)
    return (
      <main className={styles.RoomPage}>
        <h2>Room Could Not Be Found (May Have Expired)</h2>
        <br />
        <h2><b className={styles.centerText}><Link to='/'>{'<- Back To Home'}</Link></b></h2>
      </main>
    )
  
  return (
    <main className={styles.RoomPage}>
      <h2>Room Id: {room.id}</h2>
      <h3>Expires: {room.expires.format()}</h3>
    </main>
  )
}

export default RoomPage;

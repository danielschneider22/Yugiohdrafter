import _ from "lodash";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { roomByIdSel } from "../../data/data/rooms/selectors";
import { RootState } from "../../models/RootState";

function RoomPlayers() {
  const params: {id: string} = useParams()
  const room = useSelector((state: RootState) => roomByIdSel(state, params.id))
  const players: string[] = room.roomPlayerIds
  return (
    <div>
    {
        players.map((player) => {
            return (
                <div>
                    Player ID: {player}
                    {/* <input> </input> */}
                </div>
                
            )
        })
    }
    </div>
  );
}

export default RoomPlayers;

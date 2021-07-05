import _ from "lodash";
import { RoomPlayer } from "../../constants/RoomPlayer";

function RoomPlayers() {
  const players: RoomPlayer[] = []
  return (
    <div>
    {
        players.map((player) => {
            return (
                <div>
                    <div className="DeleteButton btn-sm btn-danger"><span>x</span></div>
                    <input>Player 1 </input>
                </div>
                
            )
        })
    }
    </div>
  );
}

export default RoomPlayers;

import axios from "axios";
import { useContext, useState } from "react";
import CampContext from "../../../providers/CampProvider";

export default function PlayerInputForm(props) {
  const { id, user_id, name, sheet_url, profile_pic, view, setPlayers, email } =
    props;

  const { campaign } = useContext(CampContext);

  const [playerInfo, setPlayerInfo] = useState({
    name: view.mode === view.states.ADD ? "" : name,
    sheet_url: view.mode === view.states.ADD ? "" : sheet_url,
    profile_pic: view.mode === view.states.ADD ? "" : profile_pic,
    email: view.mode === view.states.ADD ? "" : email,
  });

  function deletePlayer() {
    axios.delete(`/users/:id/campaigns/:c_id/party/${id}`).then(() => {
      setPlayers((prev) => {
        const newState = { ...prev };
        delete newState[id];
        return newState;
      });
    });
  }

  function addPlayer() {
    axios
      .post(`/users/:id/campaigns/${campaign()}/party`, { ...playerInfo })
      .then((result) => {
        const playerInfo = result.data;
        addPlayerToState(playerInfo);
      });
  }

  function updatePlayer() {
    axios
      .put(`/users/:id/campaigns/:c_id/party/${id}`, {
        name: playerInfo.name,
        profile_pic: playerInfo.profile_pic,
        sheet_url: playerInfo.sheet_url,
      })
      .then((result) => {
        const playerInfo = result.data;
        addPlayerToState(playerInfo);
      });
  }

  function addPlayerToState(player) {
    setPlayers((prev) => {
      const newState = { ...prev };
      newState[player.id] = player;
      return newState;
    });
  }

  return (
    <div className="bg-secondary text-gunmetal p-5 m-6  w-80 max-w-lg rounded-xl">
      <div className="npc-card--header flex flex-row justify-start content-center h-10 pb-5 mb-4">
        <img
          className="rounded-full border-primary border-2 w-20 h-20 mr-8"
          src={playerInfo.profile_pic}
          alt={name}
        ></img>
        <h5 className="mt-5 text-2xl">
          <input
            type="text"
            placeholder={name}
            value={playerInfo.name}
            onChange={(e) =>
              setPlayerInfo((prev) => {
                const newState = { ...prev };
                newState.name = e.target.value;
                return newState;
              })
            }
          />
          {view.mode === view.states.ADD && (
            <input
              type="text"
              placeholder={email}
              value={playerInfo.email}
              onChange={(e) =>
                setPlayerInfo((prev) => {
                  const newState = { ...prev };
                  newState.email = e.target.value;
                  return newState;
                })
              }
            />
          )}
        </h5>
      </div>
      <div className="npc-card--content flex flex-column flex-wrap justify-start m-2 mt-14">
        {/* Profile Pic */}
        <input
          type="text"
          placeholder={profile_pic}
          value={playerInfo.profile_pic}
          onChange={(e) =>
            setPlayerInfo((prev) => {
              const newState = { ...prev };
              newState.profile_pic = e.target.value;
              return newState;
            })
          }
        />

        {/* DND Sheet */}
        <input
          type="text"
          placeholder={sheet_url}
          value={playerInfo.sheet_url}
          onChange={(e) =>
            setPlayerInfo((prev) => {
              const newState = { ...prev };
              newState.sheet_url = e.target.value;
              return newState;
            })
          }
        />
      </div>
      <button
        onClick={view.mode === view.states.EDIT ? updatePlayer : addPlayer}
      >
        SAVE
      </button>
      {view.mode === view.states.EDIT && (
        <button onClick={deletePlayer}>DELETE</button>
      )}
    </div>
  );
}

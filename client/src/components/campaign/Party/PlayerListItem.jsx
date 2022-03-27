import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import NPCCardItem from "../NPCCardItem";

const PlayerListItem = (props) => {
  const { id, user_id, name, sheet_url, profile_pic, view, setPlayers } = props;

  const [playerInfo, setPlayerInfo] = useState({
    name,
    sheet_url,
    profile_pic,
  });

  function updatePlayer() {
    axios
      .put(`/users/:id/campaigns/:c_id/party/${id}`, {
        name: playerInfo.name,
        profile_pic: playerInfo.profile_pic,
        sheet_url: playerInfo.sheet_url,
      })
      .then((result) => {
        const playerInfo = result.data;
        setPlayers((prev) => {
          const newState = { ...prev };
          newState[playerInfo.id].name = playerInfo.name;
          newState[playerInfo.id].sheet_url = playerInfo.sheet_url;
          newState[playerInfo.id].profile_pic = playerInfo.profile_pic;
          return newState;
        });
      });
  }

  const viewCard = (
    <NPCCardItem {...props} image={profile_pic}>
      <div className="text-textcolor">
        <Link to={{ pathname: sheet_url }} target="_blank">
          <button className="rounded-md bg-primary p-4 w-[75%]">
            DnD Beyond Sheet
          </button>
        </Link>
      </div>
    </NPCCardItem>
  );
  const editCard = (
    <div className="bg-secondary text-gunmetal p-5 m-6  w-80 max-w-lg rounded-xl">
      <div className="npc-card--header flex flex-row justify-start content-center h-10 pb-5 mb-4">
        <img
          className="rounded-full border-primary border-2 w-20 h-20 mr-8"
          src={profile_pic}
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
      <button onClick={updatePlayer}>SAVE</button>
    </div>
  );

  return (
    <React.Fragment>
      {/* Show view cards in view or add mode */}
      {view.mode !== view.states.EDIT && viewCard}

      {/* Show Edit cards in edit mode */}
      {view.mode === view.states.EDIT && editCard}
    </React.Fragment>
  );
};

export default PlayerListItem;

import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import NPCCardItem from "../NPCCardItem";
import PlayerInputForm from "./PlayerInputForm";

const PlayerListItem = (props) => {
  const { id, user_id, name, sheet_url, profile_pic, view, setPlayers } = props;

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

  const editCard = <PlayerInputForm {...props} />;

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

import React from "react";
import { Link } from "react-router-dom";
import NPCCardItem from "../NPCCardItem";

const PlayerListItem = (props) => {
  const { id, user_id, name, sheet_url, profile_pic } = props;

  return (
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
};

export default PlayerListItem;

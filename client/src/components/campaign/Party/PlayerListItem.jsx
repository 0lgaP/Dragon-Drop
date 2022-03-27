import React from "react";

const PlayerListItem = (props) => {
  const { id, user_id, name, sheet_url, profile_pic } = props;
  
  return `${JSON.stringify(props)}`;
};

export default PlayerListItem;

import React from "react";

const NPCListItem = (props) => {
return (
  <div>
    <div className="npc-card--header">
      <img></img>
      <h5>{props.name}</h5>
    </div>
    <div className="npc-card--content">
      <p>{props.bio}</p>
      <p>{props.details}</p>
    </div>
  </div>
)
}

export default NPCListItem;
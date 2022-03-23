import React from "react";

const NPCListItem = (props) => {
return (
  <div className="bg-secondary text-textcolor">
    <div className="npc-card--header flex flex-column">
      <img></img>
      <h5>{props.name}</h5>
    </div>
    <div className="npc-card--content flex flex-row">
      <p>{props.bio}</p>
      <p>{props.details}</p>
    </div>
  </div>
)
}

export default NPCListItem;
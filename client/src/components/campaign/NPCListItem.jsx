import React from "react";

const NPCListItem = (props) => {
return (
  <div className="bg-secondary text-textcolor p-5 m-2">
    <div className="npc-card--header flex flex-row justify-center pb-5">
      <img></img>
      <h5>{props.name}</h5>
    </div>
    <div className="npc-card--content flex flex-column flex-wrap justify-start p-2">
      <p>{props.bio}</p>
      <p>{props.details}</p>
    </div>
  </div>
)
}

export default NPCListItem;
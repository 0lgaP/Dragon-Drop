import React from "react";
import { Link } from 'react-router-dom';

const NPCListItem = (props) => {

const u_id = JSON.parse(window.localStorage.getItem("user_id"));
const c_id = JSON.parse(window.localStorage.getItem("campaign_id"));
const address = `/users/${u_id}/campaigns/${c_id}/npcs/edit`;

const handleEdit = () => {
  console.log(`props.key: `, props.id)
  window.localStorage.setItem("npc_id", props.id)
}

const handleDelete = () => {

}

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
    <div>
      <Link to={address}><button className="rounded-md bg-primary p-1 m-1 mt-4 mx-6 w-20" onClick={handleEdit}>Edit</button></Link>
      <button className="rounded-md bg-primary p-1 m-1 mt-4 mx-6 w-20" onClick={handleDelete}>Delete</button>
    </div>
  </div>
)
}

export default NPCListItem;
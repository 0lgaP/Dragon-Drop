import axios from "axios";
import React from "react";
import { Link } from 'react-router-dom';

const NPCListItem = (props) => {

const u_id = JSON.parse(window.localStorage.getItem("user_id"));
const c_id = window.localStorage.getItem("campaign_id");
const address = `/users/${u_id}/campaigns/${c_id}/npcs/edit`;
const deleteAddress = `/users/${u_id}/campaigns/${c_id}/npcs/delete`
const npcID = props.id

const handleEdit = () => {
  console.log(`props.key: `, props.id)
  window.localStorage.setItem("npc_id", props.id)
}

const handleDelete = () => {
  console.log(`we're in the delete function!`);
  // window.localStorage.setItem("npc_id", props.id)
  console.log(`npc id`, npcID)
  axios.delete(deleteAddress, { data: {npcID} })
    window.location.reload(true);

}

return (
  <div className="bg-secondary text-textcolor p-5 m-2">
    <div className="npc-card--header flex flex-row justify-center pb-5">
      <img></img>
      <h5>{props.name}</h5>
    </div>
    <div className="npc-card--content flex flex-column flex-wrap justify-start p-2">
      <p className="m-2 p-2">{props.bio}</p>
      <p className="m-2 p-2">{props.details}</p>
    </div>
    <div>
      <Link to={address}><button className="rounded-md bg-primary p-1 m-1 mt-4 mx-6 w-20" onClick={handleEdit}>Edit</button></Link>
      <button className="rounded-md bg-primary p-1 m-1 mt-4 mx-6 w-20" onClick={handleDelete}>Delete</button>
    </div>
  </div>
)
}

export default NPCListItem;
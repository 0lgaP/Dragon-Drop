import axios from "axios";
import React from "react";
import { Link } from 'react-router-dom';

const NPCListItem = (props) => {

const u_id = JSON.parse(window.localStorage.getItem("user_id"));
const c_id = window.localStorage.getItem("campaign_id");
const address = `/users/${u_id}/campaigns/${c_id}/npcs/edit`;
const deleteAddress = `/users/${u_id}/campaigns/${c_id}/npcs/delete`
const npcID = props.id
const imageURL = props.image;
console.log(`image url : `, imageURL)

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
  <div className="bg-secondary text-textcolor p-5 m-6  w-80 max-w-lg rounded-xl">
    <div className="npc-card--header flex flex-row justify-start content-center h-10 pb-5 mb-4">
      <img className="rounded-full border-primary border-2 w-20 h-20 mr-8" src={props.image}></img>
      <h5 className="mt-5 text-2xl">{props.name}</h5>
    </div>
    <div className="npc-card--content flex flex-column flex-wrap justify-start m-2 mt-14">
      <p className="m-2">{props.bio}</p>
      <p className="m-2">{props.details}</p>
    </div>
    <div>
      <Link to={address}><button className="rounded-md bg-primary p-1 m-1 mt-4 mx-6 w-20" onClick={handleEdit}>Edit</button></Link>
      <button className="rounded-md bg-primary p-1 m-1 mt-4 mx-6 w-20" onClick={handleDelete}>Delete</button>
    </div>
  </div>
)
}

export default NPCListItem;
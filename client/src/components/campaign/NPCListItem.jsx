import axios from "axios";
import React from "react";
import { Link } from 'react-router-dom';
import NPCCardItem from "./NPCCardItem";

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
  <NPCCardItem {...props}>
    <div className="text-textcolor">
      <Link to={address}><button className="rounded-md bg-primary p-1 m-1 mt-4 mx-6 w-20" onClick={handleEdit}>Edit</button></Link>
      <button className="rounded-md bg-primary p-1 m-1 mt-4 mx-6 w-20" onClick={handleDelete}>Delete</button>
    </div>
  </NPCCardItem>
)
}

export default NPCListItem;
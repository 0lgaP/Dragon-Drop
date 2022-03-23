import { React, useContext, useEffect } from "react";
import { Link } from 'react-router-dom';
import CampaignDetails from "./CampaignDetails";
import CampContext from "../../providers/CampProvider";


const CampaignListItem = (props) => {

  //PROPS id, name 

  const rawAuth = window.localStorage.getItem("user_id")
  const userAuth = JSON.parse(rawAuth)
  const {setCampaign} = useContext(CampContext)


return(
  <Link to={`/users/${userAuth}/campaigns/${props.id}`}>
  <div>{props.name}</div>
  </Link>
)
}

export default CampaignListItem;
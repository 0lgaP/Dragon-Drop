import {React, useContext, useState, useEffect} from "react";
import AuthContext from "../../providers/AuthProvider";
// import CampContext from "../../providers/CampProvider";
import { Link } from "react-router-dom";
import axios from "../../api/axios";
import CampaignListItem from "./CampaignListItem";


const CampaignList = () => {
  // dm_id, id, name
  const [campaigns, setCampaigns] = useState([]);
  // const {setCampaign} = useContext(CampContext)
  const { auth } = useContext(AuthContext);

  const rawAuth = window.localStorage.getItem("user_id")
  const userAuth = JSON.parse(rawAuth)

  const address = `/users/${userAuth}/campaigns` ;

  useEffect(() => {
    axios.get(`${address}`)
    .then((res) => {
      // console.log("Capania Data", res.data)
      setCampaigns(res.data)
    })
  }, [])
  
  // setCampaign('');
  

return(
  <div className="card__container bg-secondary text-textcolor text-2xl rounded-lg border-2 p-4">
    {campaigns.map(camp => 
        <CampaignListItem id={camp.id} name={camp.name} />
    )}
  </div>

)
}

export default CampaignList;
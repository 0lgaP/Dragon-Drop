import { React, useContext, useEffect } from "react";
import CampContext from "../../providers/CampProvider";
import { useParams } from 'react-router-dom';


const CampaignDetails = (props) => {
  const {campaign, setCampaign} = useContext(CampContext)
  const { c_id } = useParams();
  
  useEffect(()=> {
    window.localStorage.setItem("campaign_id", JSON.stringify(c_id))
    setCampaign(c_id)
    // console.log(`id being set to campaign useContext: `, c_id)
  }, [])

// console.log(`campaign`, campaign)

return(
  <div>HALLO</div>
)
}

export default CampaignDetails;
import {React, useContext, useEffect} from "react";
import { useParams } from "react-router-dom";
import CampContext from "../../providers/CampProvider";
import AuthContext, { AuthProvider } from "../../providers/AuthProvider";

const CampaignDetails = () => {
  const {campaign, setCampaign, story, setStory} = useContext(CampContext);
  const { c_id } = useParams();
  const { auth } = useContext(AuthContext);

  useEffect(() => {
    setCampaign(c_id),
    axios.get(`user/${auth.user_id}/campaigns/${c_id}/story`)
    .then((res) => {
      setStory(res)
    })
  }, [])

  //evrywhere else   const {campaign} = useContext(CampContext);

return(
  <div>HAiiiiii</div>
)
}

export default CampaignDetails;
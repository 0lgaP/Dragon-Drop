import {React, useContext, useState, useEffect} from "react";
import useFetch from "../../hooks/useFetch";
import AuthContext from "../../providers/AuthProvider";
import { Link } from "react-router-dom";
import axios from "../../api/axios";
import { CampProvider } from "../../providers/CampProvider";

const CampaignList = () => {
  // const { campaigns } = useContext(AuthContext);

  // dm_id, id, name
const [campaigns, setCampaigns] = useState([]);

  const { auth } = useContext(AuthContext);
  const rawAuth = window.localStorage.getItem("user_id")
  const userAuth = JSON.parse(rawAuth)

  const address = `/users/${userAuth}/campaigns` ;

  useEffect(() => {
    axios.get(`http://localhost:8082${address}`)
    .then((res) => {
      // console.log("DATAAAAA", res)
      setCampaigns(res.data)
    })
  }, [setCampaigns])

return(
  <div className="card__container ">{campaigns.map(camp => <Link to={`/users/${userAuth}/campaigns/${camp.id}`}><article key={camp.id}>{camp.name}</article></Link>)}</div>

)
}

export default CampaignList;
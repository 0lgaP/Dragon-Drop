import {React, useContext, useState, useEffect} from "react";
import useFetch from "../../hooks/useFetch";
import AuthContext from "../../providers/AuthProvider";
import { Link } from "react-router-dom";
import axios from "../../api/axios";

const CampaignList = () => {
  // dm_id, id, name
const [campaigns, setCampaigns] = useState([]);

  const { auth } = useContext(AuthContext);
  const rawAuth = window.localStorage.getItem("user_id")
  const userAuth = JSON.parse(rawAuth)

  // console.log("USERAUTH", userAuth)
  const address = `/users/${userAuth}/campaigns` ;

  useEffect(() => {
    axios.get(`http://localhost:8082${address}`)
    .then((res) => {
      console.log("DATAAAAA", res)
      setCampaigns(res.data)
    })
  }, [setCampaigns])


  // const { data: campaigns, error, isPending } = useFetch(`http://localhost:8082${address}`);
  // console.log("DATA", campaigns, isPending)
  // console.log(typeof(campaigns))
  // const campaignData = [campaigns]
  // const campaignList = campaigns.map(camp => <Link to={`/users/${userAuth}/campaigns/${camp.id}`}><article key={camp.id}>{camp.name}</article></Link>)

return(
  <div className="card__container ">{campaigns.map(camp => <Link to={`/users/${userAuth}/campaigns/${camp.id}`}><article key={camp.id}>{camp.name}</article></Link>)}</div>
  // <div>Hi</div>
)
}

export default CampaignList;
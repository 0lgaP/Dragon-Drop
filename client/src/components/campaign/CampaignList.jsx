import {React, useContext} from "react";
import useFetch from "../../hooks/useFetch";
import AuthContext from "../../providers/AuthProvider";

const CampaignList = () => {
  const { auth } = useContext(AuthContext);
  const userAuth = window.localStorage.getItem("user_id")
  console.log("USERAUTH", userAuth)
  const address = `/users/${userAuth}/campaigns` ;
  const { data: user, error, isPending } = useFetch(`http://localhost:8082${address}`);
  // console.log("DATA", user)

return(
  <div>Campain</div>
)
}

export default CampaignList;
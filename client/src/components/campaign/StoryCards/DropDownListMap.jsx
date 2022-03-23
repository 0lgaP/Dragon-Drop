import React, { useState, useEffect, useContext } from "react";
  import axios from "../../../api/axios";
  import CampContext, { CampProvider } from "../../../providers/CampProvider";
  import AuthContext, { AuthProvider } from "../../../providers/AuthProvider";

export default function DropDownListMap(props) {
  const [map, setMap] = useState([])
  const { auth } = useContext(AuthContext);
  const { campaign} = useContext(CampContext);

  const u_id = auth.user_id
  const c_id = campaign

  const address = `/users/${u_id}/campaigns/${c_id}`


  useEffect(() => {
    axios.get(`${address}/maps`)
    .then((res) => {
      console.log("Dat map", res.data)
      setMap(res.data)

    })
  }, [])

  return (
    <select className="card__dropdown" 
    onChange={props.onChange}
    >
      {map.map(map => <option key={map.id} value={map.name}>{map.name}</option>)}
    </select>
  )
}

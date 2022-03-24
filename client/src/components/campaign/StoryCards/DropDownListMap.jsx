import React, { useState, useEffect, useContext } from "react";
  import axios from "../../../api/axios";
  import CampContext from "../../../providers/CampProvider";
  import AuthContext from "../../../providers/AuthProvider";

export default function DropDownListMap(props) {
  const [maps, setMaps] = useState([])
  const { auth } = useContext(AuthContext);
  const { campaign} = useContext(CampContext);

  const u_id = auth.user_id
  const c_id = campaign

  const address = `/users/${u_id}/campaigns/${c_id}`


  useEffect(() => {
    axios.get(`${address}/maps`)
    .then((res) => {
      console.log("Dat map", res.data)
      setMaps(res.data)

    })
  }, [])

  return (
    <select className="card__dropdown" 
    onChange={props.onChange}
    >
      {maps.map(map => <option key={map.id} value={map.id}>{map.name}</option>)}
    </select>
  )
}

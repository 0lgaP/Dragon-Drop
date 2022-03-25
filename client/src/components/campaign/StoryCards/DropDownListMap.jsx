import React, { useState, useEffect, useContext } from "react";
import axios from "../../../api/axios";
import { useParams } from "react-router-dom";
import AuthContext from "../../../providers/AuthProvider";
import CampContext from "../../../providers/CampProvider";

export default function DropDownListMap(props) {
  const [maps, setMaps] = useState([])
  const { auth } = useContext(AuthContext);
  const { campaign } = useContext(CampContext);
  
  const u_id = auth.user_id



  const address = `/users/${u_id}/campaigns/${campaign()}`


  useEffect(() => {
    axios.get(`${address}/maps`)
    .then((res) => {
      setMaps(res.data)

    })
  }, [])

  return (
    <select className="card__dropdown" 
    onChange={props.onChange}
    value={props.value}
    >
      <option value="Set Map">Set Map</option>
      {maps.map(map => <option key={map.id} value={map.id}>{map.name}</option>)}
    </select>
  )
}

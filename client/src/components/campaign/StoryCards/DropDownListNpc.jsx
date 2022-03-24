import React, { useState, useEffect, useContext } from "react";
import axios from "../../../api/axios";
import CampContext, { CampProvider } from "../../../providers/CampProvider";
import AuthContext, { AuthProvider } from "../../../providers/AuthProvider";


export default function DropDownListNpc(props) {
  const [npc, setNpc] = useState([])
  const { auth } = useContext(AuthContext);
  const { campaign} = useContext(CampContext);

  const u_id = auth.user_id
  const c_id = campaign

  const address = `/users/${u_id}/campaigns/${c_id}`

  useEffect(() => {
    axios.get(`${address}/npcs`)
    .then((res) => {
      console.log("Dat npc", res.data)
      setNpc(res.data)

    })
  }, [])

  return (
    <select className="card__dropdown" 
    onChange={props.onChange}
    >
      {npc.map(npc => <option key={npc.id} value={npc.id}>{npc.name}</option>)}
    </select>
  )
}
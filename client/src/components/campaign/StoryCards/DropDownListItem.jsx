import React, { useState, useEffect, useContext } from "react";
import axios from "../../../api/axios";
import CampContext from "../../../providers/CampProvider";
import AuthContext from "../../../providers/AuthProvider";


export default function DropDownListItem( { onChange, value, item, special} ) {
  const [state, setState] = useState([])
  const { auth } = useContext(AuthContext);
  const { campaign } = useContext(CampContext);

  const u_id = auth.user_id

  const address = `/users/${u_id}/campaigns/${campaign()}`

  useEffect(() => {
    axios.get(`${address}/${item}`)
    .then((res) => {
      setState(res.data)
    })
  }, [])

  return (
    <select className="card__dropdown" 
    onChange={onChange}
    >
      <option value={`Set ${value}`}>Set {special}</option>
      {state.map(each => <option key={each.id} value={each.id} selected={value === each.id}>{each.name}</option>)}
    </select>
  )
}
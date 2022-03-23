import React, { useState, useEffect } from "react";
import useFetch from "../../../hooks/useFetch"
import axios from "../../../api/axios";

export default function DropDownListMap(props) {
  const [map, setMap] = useState([])

  // const address = '/users/2c41cf56-a6d7-11ec-b909-0242ac120002/campaigns/8a89386b-de43-4c63-9127-3a78394d4253/maps' ;
  // const { data: user, error, isPending } = useFetch(`http://localhost:8082${address}`);

  // useEffect(() => { loadInitialMAPs() 
  
  //   async function loadInitialMAPs() {
  //     const initialMAPs = await user
  //     if (user) setMap(initialMAPs)
  //   }
  // }, [{map}])

  const u_id = '4896e484-a6d7-11ec-b909-0242ac120002'
  const c_id = 'b819024a-4fd2-4316-8697-411ad293bb71'
  const address = `http://localhost:8082/users/${u_id}/campaigns/${c_id}`


  useEffect(() => {
    axios.get(`${address}/maps`)
    .then((res) => {
      console.log(res.data)
      setMap(res.data)

    })
  }, [setMap])

console.log(map)
  return (
    <select className="card__dropdown" 
    onChange={props.onChange}
    >
      {map.map(map => <option key={map.id} value={map.name}>{map.name}</option>)}
    </select>
  )
}

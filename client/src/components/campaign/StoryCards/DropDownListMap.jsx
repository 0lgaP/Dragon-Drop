import React, { useState, useEffect } from "react";
import useFetch from "../../../hooks/useFetch"

export default function DropDownListMap(props) {
  const [map, setMap] = useState(["MAP"])

  const address = '/users/2c41cf56-a6d7-11ec-b909-0242ac120002/campaigns/8a89386b-de43-4c63-9127-3a78394d4253/maps' ;
  const { data: user, error, isPending } = useFetch(`http://localhost:8082${address}`);

  useEffect(() => { loadInitialMAPs() 
  
    async function loadInitialMAPs() {
      const initialMAPs = await user
      if (user) setMap(initialMAPs)
    }
  }, [{map}])

  return (
    <select className="card__dropdown" 
    onChange={props.onChange}
    >
      {map.map(map => <option key={map.id} value={map.name}>{map.name}</option>)}
    </select>
  )
}

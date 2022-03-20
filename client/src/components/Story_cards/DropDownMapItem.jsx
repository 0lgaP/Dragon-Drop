import React, { useState, useEffect } from "react";
import useFetch from "../../hooks/useFetch";

function DropDownListItem() {

  const [npc, setNpc] = useState([])

  const address = '/users/2c41cf56-a6d7-11ec-b909-0242ac120002/campaigns/8a89386b-de43-4c63-9127-3a78394d4253/npcs' ;
  const { get, response, loading, error } = useFetch(`http://localhost:8082`)

  useEffect(() => { loadInitialNPCs() }, []) //componsne did mount
  
  async function loadInitialNPCs() {
    const initialNPCs = await get(address)
    if (response.ok) setNpc(initialNPCs)
  }

  return (

      <option >
        {npc.map(npc => <div key={npc.id}>{npc.name}</div>)}
      </option>
  )
}

export default DropDownListItem
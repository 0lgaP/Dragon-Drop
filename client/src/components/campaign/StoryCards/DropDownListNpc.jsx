import React, { useState, useEffect } from "react";
import useFetch from "../../../hooks/useFetch"

export default function DropDownListNpc(props) {
  const [npc, setNpc] = useState(["NPC"])

  const address = '/users/2c41cf56-a6d7-11ec-b909-0242ac120002/campaigns/8a89386b-de43-4c63-9127-3a78394d4253/npcs' ;
  const { data: user, error, isPending } = useFetch(`http://localhost:8082${address}`);

  useEffect(() => { loadInitialNPCs() 
  
    async function loadInitialNPCs() {
      const initialNPCs = await user
      if (user) setNpc(initialNPCs)
    }
  }, [{npc}])

  return (
    <select className="card__dropdown--left" 
    onChange={props.onChange}
    >
      {npc.map(npc => <option key={npc.id} value={npc.name}>{npc.name}</option>)}
    </select>
  )
}
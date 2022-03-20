import React, { useState } from "react";
import {useParams} from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import DropDownListItem from "./DropDownMapItem";

// function getNpcNames(dataArray) {
//   const nameArray = dataArray.map(npc => npc.name)
//   return nameArray
// }


function Form() {
  // const params = useParams();
  // console.log("PARAMS", params)
  // const address = '/users/2c41cf56-a6d7-11ec-b909-0242ac120002/campaigns/8a89386b-de43-4c63-9127-3a78394d4253/npcs' ;
  // const { data: user, error, isPending } = useFetch(`http://localhost:8082${address}`)

  // console.log("data: user", user)
  
  const [story, setStory] = useState('');
  const [map, setMap] = useState('');
  const [npc, setNpc] = useState('');
  
  // const npcList = user ? getNpcNames(user) : (null)

  // console.log("The List", npcList)

  
  return (
    
<section className="card">
    <form autoComplete="off">
  <article className="card__container">
    <label className="card__title">
      Add Story Card
    </label>
    < textarea 
    className="card__text-area"
    value={story}
    onChange={(e)=>setStory(e.target.value)}
    />
  <article className="card__container">

    <select className="card__dropdown--left" 
    onChange={(e) => {
      const selectedMap = e.target.value;
      setMap(selectedMap);
    }}
    >
      <option value="Map">
        Map
      </option>
      <option value="Map 1">
        Map 1
      </option>
    </select>
    <select className="card__dropdown--right"
    onChange={(e) => {
      const selectedNpc = e.target.value;
      setNpc(selectedNpc);
    }}>
      <DropDownListItem/>
      <option value="NPC 1">
        NPC 1
      </option>
    </select>
  </article>


  <button className="button confirm">
    Submit
  </button>
  <button className="button cancel" >
    Reset
  </button>
  </article>
  <p>{story}</p>
  <p>{map}</p>
  <p>{npc}</p>
  </form>
</section>


  )
}

export default Form
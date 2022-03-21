import React, { useState } from "react";
import DropDownListMap from "./DropDownListMap";
import DropDownListNpc from "./DropDownListNpc";

function Form() {
  const [story, setStory] = useState('');
  const [map, setMap] = useState('');
  const [npc, setNpc] = useState('');

  const onNpcSelect = (e) => {
    const selectedNpc = e.target.value;
    setNpc(selectedNpc);
  }

  const onMapSelect = (e) => {
    const selectedMap = e.target.value;
    setMap(selectedMap);
  }

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

    <DropDownListMap onChange={onMapSelect}/>
    <DropDownListNpc onChange={onNpcSelect}/>


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
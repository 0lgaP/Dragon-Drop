import React, { useState } from "react";


function Form() {
  const [story, setStory] = useState('');
  const [map, setMap] = useState('');
  const [npc, setNpc] = useState('');


  const reset = () => {
    setMap("");
    setNpc("");
    setStory("");
  };

  const cansel = () => {
    reset();
  };

  function save(story, map, npc) {

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
      <option value="NPC">
        NPC
      </option>
      <option value="NPC 1">
        NPC 1
      </option>
    </select>
  </article>


  <button className="button confirm">
    Submit
  </button>
  <button className="button cancel" onClick={cansel}>
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
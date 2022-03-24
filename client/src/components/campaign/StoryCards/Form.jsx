import React, { useState, useContext, useEffect } from "react";
import DropDownListMap from "./DropDownListMap";
import DropDownListNpc from "./DropDownListNpc";
import './Button.css';
import './Card.css';
import AuthContext from "../../../providers/AuthProvider";
import CampContext from "../../../providers/CampProvider";
import axios from "../../../api/axios";





function Form() {
  const { auth } = useContext(AuthContext);
  const { campaign } = useContext(CampContext);

  const u_id = auth.user_id
  const c_id = campaign
  const address = `/users/${u_id}/campaigns/${c_id}/story`

  // const [story, setStory] = useState('');
  // const [map, setMap] = useState('');
  // const [npc, setNpc] = useState('');

  const [story, setStory] = useState({
    npc_id: '',
    map_id: '',
    text: ''
  })


  const setNpc = (e) => {
    const selectedNpc = e.target.value;
    console.log(selectedNpc)
    setStory({...story, npc_id: selectedNpc})
  }

  const setMap = (e) => {
    const selectedMap = e.target.value;
    console.log(selectedMap)
    setStory({...story, map_id: selectedMap})
  }

  const setStoryText = (e) => {
    const newStoryText = e.target.value;
    setStory({...story, text: newStoryText})
  }

  const createStory = (event, story) => {
    event.preventDefault()
    return Promise.resolve(
      axios.post(`${address}`, { story })
    ).then(() => {
      setStory((prev) => ({...prev, npc_id: '', map_id: '', text: ''}))
    })
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
    value={story.text}
    onChange={setStoryText}
    />
  <article className="card__container">

    <DropDownListMap onChange={setMap}/>
    <DropDownListNpc onChange={setNpc}/>


  </article>


  <button className="button confirm" type="submit" onClick={createStory}>
    Submit
  </button>
  <button className="button cancel" >
    Reset
  </button>
  </article>
  {/* <div>{story.text}</div> */}
  </form>
</section>

  )
}

export default Form
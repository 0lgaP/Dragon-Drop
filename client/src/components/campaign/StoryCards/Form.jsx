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
  const c_id = campaign()
  // console.log("PROVIDER", campaign_id)
  const address = `/users/${u_id}/campaigns/${c_id}/story`

  const [story, setStory] = useState({
    npc_id: '',
    map_id: '',
    text: ''
  })


  const setNpc = (e) => {
    const selectedNpc = e.target.value;
    console.log("INSIDE SET NPC", selectedNpc)
    setStory({...story, npc_id: selectedNpc})
  }


  const setMap = (e) => {
    const selectedMap = e.target.value;
    console.log(selectedMap)
    setStory({...story, map_id: selectedMap})
  }

  const setStoryText = (newStory) => {
    setStory({...story, text: newStory})
  }


  const reset = (e) =>{
    e.preventDefault()
    setStory({...story, map_id: '', npc_id: '', text: ''})
  }


  console.log("STORY", story)
  const createStory = (event) => {
    event.preventDefault()
      axios.post(`${address}`, story)
      .then(() => {
        console.log("IN THEN",story)
        setStory({...story, map_id: '', npc_id: '', text: ''})

      })
      .catch((err) => console.log("FISHY BIZ",err))
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
        onChange={(e) => {setStoryText(e.target.value)}}
        />
      <article className="card__container">

        <DropDownListMap onChange={setMap} value={story.map_id}/>
        <DropDownListNpc onChange={setNpc} value={story.npc_id}/>

      </article>

        <button className="button confirm" type="submit" onClick={createStory}>
          Submit
        </button>

        <button className="button cancel" onClick={reset} >
          Reset
        </button>

      </article>
    </form>
  </section>

  )
}

export default Form
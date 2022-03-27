import React, { useState, useContext, useEffect } from "react";
import DropDownListMap from "./DropDownListMap";
import DropDownListNpc from "./DropDownListNpc";
import './Button.css';
import './Card.css';
import AuthContext from "../../../providers/AuthProvider";
import CampContext from "../../../providers/CampProvider";
import axios from "../../../api/axios";
import DropDownListItem from "./DropDownListItem";

function Form({allStories, setStories, text, id, npc, map, view, setView, viewObj, css}) {
  const { auth } = useContext(AuthContext);
  const { campaign } = useContext(CampContext);
  const u_id = auth.user_id
  const c_id = campaign()
  // console.log("PROVIDER", campaign_id)
  const address = `/users/${u_id}/campaigns/${c_id}/story`
  console.log("TEXT", text)
  const [story, setStory] = useState({
    npc_id: '',
    map_id: '',
    text: text,
    completed: false
  })

  // console.log("PROPS FORM", text, id, npc, map, view )

  useEffect(()=>{
    setStoryText(text)
  },[text])

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

  // const setItem = (e, item) => {
  //   const selectedItem = e.target.value;
  //   setStory({...story, [item]: selectedItem})
  // }

  const setStoryText = (newStory) => {
    setStory({...story, text: newStory})
  }


  const reset = (e) =>{
    e.preventDefault()
    setStory({...story, map_id: '', npc_id: '', text: ''})
  }

  // console.log("STORY", story)
  const createStory = (event) => {
    event.preventDefault()
      axios.post(`${address}`, story)
      .then((result) => {
        console.log('Return add Card from DB',result)
        setStory(prev => {
          return {...prev, map_id: '', npc_id: '', text: ''}
        })
        const card = result.data
        setStories(prev => {
          return {...prev, [card.id]: {...card} }
        })
      })
      .catch((err) => console.log("Error form Form Component", err))
  }

  const editStory = (event) => {
  event.preventDefault()
  // console.log("onEDIT", id)
  if(story.map_id === ''){
    story.map_id = map
  }
  if(story.npc_id === ''){
    story.npc_id = npc
  }
  axios.put(`${address}/${id}`, story)
  .then((res) => {
    const card = res.data
    setStories(prev => {
      return {...prev, [card.id]: {...card}}
    })
    setStory(prev => {
      return {...prev, map_id: '', npc_id: '', text: ''}
    })
    if(view === viewObj.EDIT){
      setView(viewObj.CREATE)
    }
  })
  .catch((err) => console.log("Error From FORM's EDIT Client Call"))
}

  return (
  <section className={[`card ${css}`]}>
    <form autoComplete="off">
      <article className={[`card__container`]}>
        <label className="card__title">
          {id ? "Update Story" : "Add Story Card"}
        </label>
        < textarea 
        className="card__text-area"
        value={story.text}
        onChange={(e) => setStoryText(e.target.value)}
        />
      <article className="card__container">
        <DropDownListMap onChange={setMap} value={map}/>
        <DropDownListNpc onChange={setNpc} value={npc}/>
      </article>
        <button className="button confirm" type="submit" onClick={id ? editStory : createStory}>
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
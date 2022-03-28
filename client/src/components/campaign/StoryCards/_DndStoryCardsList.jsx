import React, { useState, useEffect, useContext } from "react";
import './Card.css';
import './Button.css';
// import DndStoryCardItem from "./DndStoryCardItem";
import StoryCardItem from "./StoryCardItem";
import AuthContext from "../../../providers/AuthProvider";
import CampContext from "../../../providers/CampProvider";
import axios from "../../../api/axios";
import dataHelper from '../../../hooks/dataHelpers'


export default function DndStoryCardsList({allStories, setStories, onEdit}) {
    const { auth } = useContext(AuthContext);
  const { campaign } = useContext(CampContext);
  const u_id = auth.user_id
  const address = `/users/${u_id}/campaigns/${campaign()}`
  const [story, setStory] = useState({
    npc_id: '',
    map_id: '',
    text: '',
    completed: false
  })
  
  const [state, setState] = useState({
    npcs: [],
    maps: [],
  })
// console.log("NPCS state.npcs", state.npcs)
  useEffect(() => {
    Promise.all([
      axios.get(`${address}/npcs`),
      axios.get(`${address}/maps`),
    ]).then((all) => {
      setState(prev => {
        return {...prev,
        npcs: all[0].data,
        maps: all[1].data,
      }});
    });
  }, []);

  const onDelete = (event, id) => {
  event.preventDefault()
  axios.delete(`${address}/story/${id}`)
  .then(() => {
    setStories(prev => {
      const newState = {...prev}
      delete newState[id]
      return newState;
    })
  })
  .catch((err) => console.log("Error From StoryCardList Component", err))
}

const onComplete = (event, id, card) => {
  event.preventDefault()
  story.map_id = card.maps_id
  story.npc_id = card.npcs_id
  story.text = card.story_card_text
  story.completed = true
  setStory(story)
  axios.put(`${address}/story/${id}`, story)
  .then(() => {
    setStories(prev => {
      const newState = {...prev}
      delete newState[id]
      return newState
    })
  })
}

const getNPC = (id, objArr) => {
  const found = objArr.find((element) => element.id === id)
  const index = objArr.indexOf(found)
  return found && ({...found, index})
}

const onKill = (event, card) => {
  event.preventDefault()
  const getNpc = getNPC(card, state.npcs)
  const NPC = state.npcs[getNpc.index]
  let toggle = NPC.alive ? false : true
  NPC.alive = toggle
  //change what the name of the put request is//
  axios.put(`${address}/npcs/${NPC.id}/edit`, {...NPC,
    imageURL: NPC.img
  })
    .then((res) => {
      console.log(`SUCCESS KILL`, res.data)
      const npcUpdate = res.data
      setState(prev => {
        return {
          ...prev,
          NPC: {...npcUpdate}
        }
      })
    })
    .catch((err) => console.log("Error From FORM's KILL Client Call", err))
}


  // story.map_id = card.maps_id
  // story.npc_id = card.npcs_id
  // story.text = card.story_card_text
  // story.completed = true
  // setStory(story)
  // axios.put(`${address}/${id}`, story)
  // .then(() => {
  //   setStories(prev => {
  //     const newState = {...prev}
  //     delete newState[id]
  //     return newState
  //   })
  // })

//card: campaigns_id, completed, created_on, id, maps_id, npcs_id, order_num, story_card_text

const parsedListItem = allStories && dataHelper().convertObjectToArray(allStories).map(card => <StoryCardItem 
  key={card.id}
  npcId={card.npcs_id}
  mapId={card.maps_id}
  allNpcs={state.npcs}
  allMaps={state.maps}
  text={card.story_card_text} 
  order={card.order_num} 
  onDelete={(event) => onDelete(event, card.id)} 
  onEdit={() => onEdit(card)}
  onComplete={(event) => {onComplete(event, card.id, card)}}
  onKill={(event) => onKill(event, card.npcs_id)}
  />);
return (
  <div>
      {parsedListItem}
  </div>
)
}

import React, { useState, useEffect, useContext } from "react";
import './Card.css';
import './Button.css';
import StoryCardItem from "./StoryCardItem";
import AuthContext from "../../../providers/AuthProvider";
import CampContext from "../../../providers/CampProvider";
import axios from "../../../api/axios";
import dataHelper from '../../../hooks/dataHelpers'


export default function StoryCardsList({allStories, setStories, onEdit, allNpcs, allMaps}) {
  const { auth } = useContext(AuthContext);
  const { campaign } = useContext(CampContext);
  const u_id = auth.user_id
  const address = `/users/${u_id}/campaigns/${campaign()}/story`
  const [story, setStory] = useState({
    npc_id: '',
    map_id: '',
    text: '',
    completed: false
  })

  
  const onDelete = (event, id) => {
  event.preventDefault()
  axios.delete(`${address}/${id}`)
  .then(() => {
    // console.log("ID", id)
    // console.log("DELETED STORY", allStories)
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
  console.log("CARD", card)
  story.map_id = card.maps_id
  story.npc_id = card.npcs_id
  story.text = card.story_card_text
  story.completed = true
  setStory(story)
  axios.put(`${address}/${id}`, story)
  .then(() => {
    setStories(prev => {
      const newState = {...prev}
      delete newState[id]
      return newState
    })
  })
}

console.log("ALL NPC", allNpcs)
//card: campaigns_id, completed, created_on, id, maps_id, npcs_id, order_num, story_card_text

const parsedListItem = allStories && dataHelper().convertObjectToArray(allStories).map(card => <StoryCardItem 
  key={card.id}
  npcId={card.npcs_id}
  allNpcs={allNpcs}
  text={card.story_card_text} 
  order={card.order_num} 
  onDelete={(event) => onDelete(event, card.id)} 
  onEdit={() => onEdit(card)}
  onComplete={(event) => {onComplete(event, card.id, card)}}/>);
return (
  
  <div>
      {parsedListItem}
  </div>
)
}

// OLD
// [
  //   {
//     id: 'asdhaskd-23w1dw232-dasd2'
//     content: 'hello'
//     <div className=""></div>
//   },
//   {
//     id: 'sdlkjfasdkljf-2342sdf-sdf3'
//     content: 'hello'
//     <div className=""></div>
//   }
// ]

// NEW
// {
//   'asdhaskd-23w1dw232-dasd2': {
//     id: 'asdhaskd-23w1dw232-dasd2'
//     content: 'hello'
//   },
//   'sdlkjfasdkljf-2342sdf-sdf3': {
//     id: 'sdlkjfasdkljf-2342sdf-sdf3'
//     content: 'world'
//   }
// }
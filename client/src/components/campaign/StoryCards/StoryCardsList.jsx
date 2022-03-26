import React, { useState, useEffect, useContext } from "react";
import './Card.css';
import './Button.css';
import StoryCardItem from "./StoryCardItem";
import AuthContext from "../../../providers/AuthProvider";
import CampContext from "../../../providers/CampProvider";
import axios from "../../../api/axios";
import dataHelper from '../../../hooks/dataHelpers'


export default function StoryCardsList({allStories, setStories, onEdit, text, npc, map, onComplete}) {
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
  console.log("++++", npc, map, text)

const onDelete = (event, id) => {
  event.preventDefault()
  axios.delete(`${address}/${id}`)
  .then(() => {
    console.log("ID", id)
    console.log("DELETED STORY", allStories)
    setStories(prev => {
      const newState = {...prev}
      delete newState[id]
      return newState;
    })

  })
  .catch((err) => console.log("Error From StoryCardList Component", err))
}


const onMarkComplete = (event, id, card) => {
  event.preventDefault()
  // onComplete(card)
  console.log("onComplete CARD", card)
  story.map_id = card.maps_id
  story.npc_id = card.npcs_id
  story.text = card.story_card_text
  story.completed = true
  setStory(story)
  console.log("THE STORY ON COMPLETE", story)
  console.log("ALL STORIES", allStories)
  axios.put(`${address}/${id}`, story)
  .then(() => {
    console.log("ID", id)
    console.log("COMPLETE STORY", allStories)
    setStories(prev => {
      const newState = {...prev}
      delete newState[id]
      return newState
    })
  })
  
}

const parsedListItem = allStories && dataHelper().convertObjectToArray(allStories).map(card => <StoryCardItem 
                                                                                                  key={card.id} 
                                                                                                  text={card.story_card_text} 
                                                                                                  order={card.order_num} 
                                                                                                  onDelete={(event) => onDelete(event, card.id)} 
                                                                                                  onEdit={() => onEdit(card)}
                                                                                                  onComplete={(event) => {
                                                                                                    onMarkComplete(event, card.id, card)}}/>);
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
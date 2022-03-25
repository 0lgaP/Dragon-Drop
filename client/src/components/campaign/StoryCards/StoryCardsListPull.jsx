import React, { useState, useEffect, useContext } from "react";
import './Card.css';
import './Button.css';
import StoryCardItem from "./StoryCardItem";
import AuthContext from "../../../providers/AuthProvider";
import CampContext from "../../../providers/CampProvider";
import axios from "../../../api/axios";
import dataHelper from '../../../hooks/dataHelpers'


export default function StoryCardsListPull({allStories, setStories}) {
  const { auth } = useContext(AuthContext);
  const { campaign } = useContext(CampContext);
  // console.log("STORY CARD LIST", story)
  const u_id = auth.user_id

  const address = `/users/${u_id}/campaigns/${campaign()}`



  useEffect(() => {
    axios.get(`${address}/story`)
    .then((res) => {
      const storyCardsObject = dataHelper().convertArrayToObject(res.data, 'id')
      setStories(storyCardsObject)

    })
  }, [])

const onDelete = (event, id) => {
  event.preventDefault()
  axios.delete(`${address}/story/${id}`)
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

const onEdit = (event, id) => {
  event.preventDefault()
  axios.put(`${address}/story/${id}`)
  .then(() => {
    setStories(prev => {
      const newState = {...prev}
      return newState
    })
  })
}
const parsedListItem = allStories && dataHelper().convertObjectToArray(allStories).map(card => <StoryCardItem 
                                                                                                  key={card.id} 
                                                                                                  text={card.story_card_text} 
                                                                                                  order={card.order_num} 
                                                                                                  onDelete={(event) => onDelete(event, card.id)} 
                                                                                                  onEdit={(event) => onEdit(event, card.id)}/>);
return (
  
  <div>
      {parsedListItem}
  </div>
)
}
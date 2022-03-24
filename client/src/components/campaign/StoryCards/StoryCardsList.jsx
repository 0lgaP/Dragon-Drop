import React, { useState, useEffect, useContext } from "react";
import './Card.css';
import './Button.css';
import StoryCardItem from "./StoryCardItem";
import AuthContext from "../../../providers/AuthProvider";
import CampContext from "../../../providers/CampProvider";
import axios from "../../../api/axios";


export default function StoryCardsList() {
  const [story, setStory] = useState('');
  const { auth } = useContext(AuthContext);
  const { campaign } = useContext(CampContext);
  const c_id = campaign()
  console.log("STORY CARD LIST", story)
  const u_id = auth.user_id

  const address = `/users/${u_id}/campaigns/${c_id}`



  useEffect(() => {
    axios.get(`${address}/story`)
    .then((res) => {
      setStory(res.data)

    })
  }, [])

const onDelete = (id) => {
  axios.delete(`${address}/story/${id}`)
  .then(() => {
    setStory({...story})
  })
}

const parsedListItem = story && story.map(card => <StoryCardItem key={card.id} text={card.story_card_text} order={card.order_num} />);
  return (
  
    <div>
      {parsedListItem}
    </div>
  )
}
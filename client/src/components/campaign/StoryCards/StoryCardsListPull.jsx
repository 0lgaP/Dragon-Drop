import React, { useState, useEffect, useContext } from "react";
import './Card.css';
import './Button.css';
import StoryCardItemPull from "./StoryCardItemPull";
import AuthContext from "../../../providers/AuthProvider";
import CampContext from "../../../providers/CampProvider";
import axios from "../../../api/axios";


export default function StoryCardsListPull() {
  const [story, setStory] = useState('');
  const { auth } = useContext(AuthContext);
  const { campaign_id } = useContext(CampContext);

  const u_id = auth.user_id
  const c_id = campaign_id

  const address = `/users/${u_id}/campaigns/${c_id}`


  useEffect(() => {
    axios.get(`${address}/story`)
    .then((res) => {
      setStory(res.data)
    })
  }, [])

const parsedListItem = story && story.map(card => <StoryCardItemPull key={card.id} text={card.story_card_text} order={card.order_num}/>);
  return (
  
    <div>
      {parsedListItem}
    </div>
  )
}
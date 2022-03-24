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

  const u_id = auth.user_id
  const c_id = campaign()
  console.log("U_ID",u_id)
  console.log("C_ID", c_id)

  const address = `/users/${u_id}/campaigns/${c_id}`


  useEffect(() => {
    axios.get(`${address}/story`)
    .then((res) => {
      console.log("Dat Story", res.data)
      setStory(res.data)

    })
  }, [])

const parsedListItem = story && story.map(card => <StoryCardItem key={card.id} text={card.story_card_text} order={card.order_num}/>);
  return (
  
    <div>
      {parsedListItem}
    </div>
  )
}
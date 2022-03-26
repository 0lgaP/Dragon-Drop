import { React, useContext, useEffect, useState } from "react";
import CampContext from "../../providers/CampProvider";
import { useParams } from 'react-router-dom';
import NPCCardItem from "../campaign/NPCCardItem";
import StoryCardItem from "./StoryCards/StoryCardItem";
import axios from "axios";


const CampaignDetails = (props) => {
  const {setCampaign} = useContext(CampContext)
  const { c_id } = useParams();
  const u_id = window.localStorage.getItem("user_id")
  const [state, setState] = useState({
    npcs: [],
    maps: [],
    players: [],
    storyCards: []
  })
  setCampaign(c_id)
  
  useEffect(()=> {
    Promise.all([
      axios.get(`/users/${u_id}/campaigns/${c_id}/maps`),
      axios.get(`/users/${u_id}/campaigns/${c_id}/npcs`),
      axios.get(`/users/${u_id}/campaigns/${c_id}/story`)
    ])
    .then((res) => {
      setState({
        maps: res[0].data,
        npcs: res[1].data,
        storyCards: res[2].data
      })
    })
  }, [])

  const npcList = state.npcs.map((character) => {
      return (
      <NPCCardItem id={character.id}  image={character.img} name={character.name} bio={character.bio} details={character.details} alive={character.alive} />
      )
  })

  const storyCardList = state.storyCards.map((card) => {
    return(
    <StoryCardItem 
      key={card.id} 
      text={card.story_card_text} 
      order={card.order_num} 
    />
    )
  })

  const mapList = state.maps.map((map) => {
      return (
        <div className="map-card">
          <h2>{ map.name }</h2>
            <img className="map-thumbnail" src={ map.background } alt={ map.name } />
        </div>
      )
  })


return(
  <section className="flex flex-column">
    <div>{npcList}</div>
    <div>{storyCardList}</div>
    <div>{mapList}</div>
  </section>
)
}

export default CampaignDetails;
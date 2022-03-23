import { React, useState, useEffect, useContext } from "react";
import NPCListItem from './NPCListItem';
import AuthContext from '../../providers/AuthProvider';
import CampContext from '../../providers/CampProvider';
import axios from 'axios';

const NPCList = (props) => {
  const {auth} = useContext(AuthContext);
  // const {campaign} = useContext(CampContext);
  const [npcs, setNPCs] = useState([])
  const rawCampaignID = window.localStorage.getItem("campaign_id")
  const campaignID = JSON.parse(rawCampaignID)
  const address = `/users/${auth.user_id}/campaigns/${campaignID}/npcs`;
  // console.log(`address: `, address)
  useEffect(() => {
    axios.get(`http://localhost:8082${address}`)
    .then((res) => {
      console.log("DATAAAAA", res.data)
      setNPCs(res.data)
    })
  }, [])
console.log(`npcs that were set: `, npcs)
  const list = npcs.map((character) => {
      return (
      <NPCListItem key={character.id}  name={character.name} bio={character.bio} details={character.details} alive={character.alive} />
      )
  })

  return (
    <section className="npc-list flex flex-row flex-wrap">
      <div>
        {list}
      </div>
    </section>
  )
  
}

export default NPCList;
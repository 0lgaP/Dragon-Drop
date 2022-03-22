import {createContext, useState, useEffect } from 'react';
import axios from '../api/axios';

const CampContext = createContext({});

export const CampProvider = (props) => {

  const rawAuth = window.localStorage.getItem("user_id")
  const userAuth = JSON.parse(rawAuth)

  const address = `/users/${userAuth}/campaigns` ;

  // dm_id, id, name
  const [campaigns, setCampaigns] = useState([]);

  const [npc, setNpc] = useState([]);
  const [map, setMap] = useState([])

  useEffect(() => {
      axios.get(`http://localhost:8082${address}`)
      .then((res) => {
        setCampaigns(res.data)
      })
  }, [setCampaigns])





  return (
    <CampContext.Provider value={{campaigns, setCampaigns}}>
      {props.children}
    </CampContext.Provider>
  )
}

export default CampContext;
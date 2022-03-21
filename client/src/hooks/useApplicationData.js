import { useState, useEffect } from 'react';
import axios from 'axios';

function useApplicationData() {
  const [state, setState] = useState({
    campaign: null,
    campaigns: [],
    players: [],
    maps: [],
    npcs: [],
    story: null,
    storycards: []
  })

  useEffect(() => {
// CHANGE TO OUR DATABASE QUERIES:
    Promise.all([
      // axios.get(`/api/days`),
      // axios.get(`/api/appointments`),
      // axios.get(`/api/interviewers`)
    ]).then(all => {
      setState((prev) => ({ ...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }))
    })
  }, [])

}

export default useApplicationData;
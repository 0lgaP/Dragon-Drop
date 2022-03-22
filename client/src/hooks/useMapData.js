import { useState, useEffect } from "react";
import axios from "axios";

function useMapData(mapId, campaignId, userId) {
  const [state, setState] = useState({
    userId,
    campaignId,
    mapId,
    data: [],
    // players: [],
    // maps: [],
    // npcs: [],
    // story: null,
    // storycards: [],
  });

  useEffect(() => {
    // CHANGE TO OUR DATABASE QUERIES:
    Promise.all([
      axios.get(`/users/${userId}/campaigns/${campaignId}/maps/${mapId}`),
      // axios.get(`/api/appointments`),
      // axios.get(`/api/interviewers`)
    ]).then((all) => {
      setState((prev) => ({
        ...prev,
        data: all[0].data,
      }));
    });
  }, []);

  return { state, setState };
}

export default useMapData;

import { useState, useEffect } from "react";
import axios from "axios";

function useMapData(mapId, campaignId, userId) {
  const [state, setState] = useState({
    userId,
    campaignId,
    mapId,
    name: "",
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
      axios.get(`/users/${userId}/campaigns/${campaignId}/maps/${state.mapId}`),
      axios.get(
        `/users/${userId}/campaigns/${campaignId}/maps/${mapId}/assets`
      ),
      // axios.get(`/api/appointments`),
      // axios.get(`/api/interviewers`)
    ]).then((all) => {
      setState((prev) => ({
        ...prev,
        name: all[0].data.name,
        background: all[0].data.background,
        data: all[1].data,
      }));
    });
  }, []);

  return { state, setState };
}

export default useMapData;

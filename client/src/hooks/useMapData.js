import { useState, useEffect } from "react";
import axios from "axios";

function useMapData(mapId, campaignId, userId) {
  const [tick, setTock] = useState(false);

  const [state, setState] = useState({
    userId,
    campaignId,
    mapId,
    name: "",
    data: [],
  });

  useEffect(() => {
    // CHANGE TO OUR DATABASE QUERIES:
    console.log("useEffects", state.mapId);
    Promise.all([
      axios.get(`/users/${userId}/campaigns/${campaignId}/maps/${state.mapId}`),
      axios.get(
        `/users/${userId}/campaigns/${campaignId}/maps/${state.mapId}/assets`
      ),
    ]).then((all) => {
      setState((prev) => ({
        ...prev,
        name: all[0].data.name,
        background: all[0].data.background,
        data: all[1].data,
      }));
    });
  }, [tick, state.mapId]);
  console.log("UsemapData", state.data);

  return { state, setState, setTock };
}

export default useMapData;

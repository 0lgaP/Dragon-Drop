import { useState, useEffect } from "react";
import axios from "axios";

function useMapData(mapId, campaignId, userId) {
  // const [tick, setTock] = useState(false);

  const [state, setState] = useState({
    userId,
    campaignId,
    mapId,
    name: "",
    data: [],
  });

  useEffect(() => {
    // CHANGE TO OUR DATABASE QUERIES:
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
        data: {
          Images: convertArrayToObject(all[1].data.Images, "id"),
          NPCs: convertArrayToObject(all[1].data.NPCs, "id"),
          StoryCards: convertArrayToObject(all[1].data.StoryCards, "id"),
          Players: all[1].data.Players,
        },
      }));
    });
  }, [state.mapId]);

  function convertArrayToObject(array, key) {
    const initialValue = {};
    return array.reduce((obj, item) => {
      return {
        ...obj,
        [item[key]]: item,
      };
    }, initialValue);
  }

  return { state, setState };
}

export default useMapData;

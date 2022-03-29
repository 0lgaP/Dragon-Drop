import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "../../api/axios";
import CampContext from "../../providers/CampProvider";
import MapCreate from "./MapCreate";
import "./MapList.css";


const MapList = () => {
  const { c_id, u_id } = useParams();
  const { campaign } = useContext(CampContext);
  const [inEditMode, setEditMode] = useState(false);

  const [maps, setMaps] = useState([]);

  async function deleteMap(mapId) {
    for (const index in maps) {
      if (maps[index].id !== mapId) continue;
      await axios.delete(`/users/${u_id}/campaigns/${c_id}/maps/${mapId}`);
      return setMaps((prev) => {
        const newState = [...prev];
        newState.splice(index, 1);
        console.log(prev);
        return newState;
      });
    }
  }

  function toggleEdit() {
    setEditMode((prev) => !prev);
  }

  function addMap(map) {
    setMaps((prev) => {
      const newState = [...prev];
      if (map) newState.push(map);
      console.log("newState", newState, map);
      return newState;
    });
  }

  useEffect(() => {
    axios
      .get(`/users/0/campaigns/${campaign()}/maps`)
      .then((res) => setMaps(res.data));
  }, []);

  return (
    <>
      <button className="edit-button" onClick={toggleEdit}>Edit</button>
      {inEditMode && <MapCreate toggleEdit={toggleEdit} addMap={addMap} />}
      <div className="map-container">
        {maps.length &&
          maps.map((map) => {
            return (
              <div
                className={"map-card" + (inEditMode ? " !transition-none" : "")}
                key={map.id}
              >
                <div>
                  <h2 className="map-name">{map.name}</h2>
                  {inEditMode && (
                    <button className="delete-button" onClick={() => deleteMap(map.id)}>Delete</button>
                  )}
                </div>
                <Link to={`maps/${map.id}`}>
                  <img
                    className="map-thumbnail"
                    src={map.background}
                    alt={map.name}
                  />
                </Link>
              </div>
            );
          })}
      </div>
    </>
  );
};

export default MapList;

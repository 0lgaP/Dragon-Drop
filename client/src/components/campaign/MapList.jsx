import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "../../api/axios";
import CampContext from "../../providers/CampProvider";
import MapCreate from "./MapCreate";
import "./MapList.css";

<<<<<<< HEAD
=======
const viewModes = {
  VIEW: "v",
  EDIT: "e",
  ADD: "a",
};
>>>>>>> 627a03306fd13d26546aaee3b36e3690f1bae524

const MapList = () => {
  const { c_id, u_id } = useParams();
  const { campaign } = useContext(CampContext);
  const [mode, setMode] = useState(viewModes.VIEW);

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

  function toggleEdit(view) {
    if (view === mode) return setMode(viewModes.view);
    setMode(view);
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
<<<<<<< HEAD
      <button className="edit-button" onClick={toggleEdit}>Edit</button>
      {inEditMode && <MapCreate toggleEdit={toggleEdit} addMap={addMap} />}
=======
      {mode === viewModes.VIEW && (
        <React.Fragment>
          <button
            className="maplist--button"
            onClick={() => toggleEdit(viewModes.ADD)}
          >
            ADD
          </button>
          <button
            className="maplist--button"
            onClick={() => toggleEdit(viewModes.EDIT)}
          >
            EDIT
          </button>
        </React.Fragment>
      )}
      {mode !== viewModes.VIEW && (
        <React.Fragment>
          <button
            className="maplist--button"
            onClick={() => toggleEdit(viewModes.VIEW)}
          >
            BACK
          </button>
        </React.Fragment>
      )}
      {mode === viewModes.ADD && (
        <MapCreate toggleEdit={toggleEdit} addMap={addMap} />
      )}
>>>>>>> 627a03306fd13d26546aaee3b36e3690f1bae524
      <div className="map-container">
        {maps.length &&
          maps.map((map) => {
            return (
              <div
                className={
                  "map-card" +
                  (mode === viewModes.EDIT ? " !transition-none" : "")
                }
                key={map.id}
              >
                <div>
<<<<<<< HEAD
                  <h2 className="map-name">{map.name}</h2>
                  {inEditMode && (
                    <button className="delete-button" onClick={() => deleteMap(map.id)}>Delete</button>
=======
                  <h2 className="ml-title">{map.name}</h2>
                  {mode === viewModes.EDIT && (
                    <button
                      className="maplist--delete-button"
                      onClick={() => deleteMap(map.id)}
                    >
                      DELETE
                    </button>
>>>>>>> 627a03306fd13d26546aaee3b36e3690f1bae524
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

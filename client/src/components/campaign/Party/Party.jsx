import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import dataHelpers from "../../../hooks/dataHelpers";
import CampContext from "../../../providers/CampProvider";
import PlayerInputForm from "./PlayerInputForm";
import { PlayerList } from "./PlayerList";
import "./Party.css";

const viewModes = {
  EDIT: "edit",
  VIEW: "view",
  ADD: "add",
};

export const Party = () => {
  const [players, setPlayers] = useState({});
  const [viewMode, setViewMode] = useState(viewModes.VIEW);
  const { campaign } = useContext(CampContext);

  useEffect(() => {
    axios
      .get(`/users/:id/campaigns/${campaign()}/party`)
      .then((result) =>
        setPlayers(dataHelpers().convertArrayToObject(result.data, "id"))
      );
  }, []);

  return (
    <section>
      <div className="flex flex-col bg-primary rounded-xl text-textcolor m-2 justify-evenly">
        <h1 className="text-2xl m-4 p-5">Party Details</h1>
      </div>
      <div>
        {viewMode === viewModes.VIEW && (
          <React.Fragment>
            <div className="party--button-panel">
            <button className="party--button" onClick={() => setViewMode(viewModes.ADD)}>Add</button>
            <button className="party--button" onClick={() => setViewMode(viewModes.EDIT)}>Edit</button>
          </div>
          </React.Fragment>
        )}
        {viewMode !== viewModes.VIEW && (
          <div className="party--button-panel">
            <button className="party--button" onClick={() => setViewMode(viewModes.VIEW)}>View</button>
          </div>
        )}
        {viewMode === viewModes.ADD && (
          <PlayerInputForm
            setPlayers={setPlayers}
            name="Player Name"
            sheet_url="Link to Char Sheet"
            profile_pic="Link to Char Picture"
            email="Player Email"
            view={{ mode: viewMode, states: viewModes }}
            setView={setViewMode}
          />
        )}
      </div>
      <div>
        {/* IMAGES HERE - BASE , CARDS - STRETCH */}
        <PlayerList
          players={players}
          view={{ mode: viewMode, states: viewModes }}
          setPlayers={setPlayers}
        />
      </div>
    </section>
  );
};

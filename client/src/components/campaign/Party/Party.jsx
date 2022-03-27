import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import dataHelpers from "../../../hooks/dataHelpers";
import CampContext from "../../../providers/CampProvider";
import PlayerInputForm from "./PlayerInputForm";
import { PlayerList } from "./PlayerList";

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
      <div className="bg-primary rounded-xl text-textcolor m-2">
        <h1 className="text-2xl m-4 p-5">Party Details</h1>
        {viewMode === viewModes.VIEW && (
          <React.Fragment>
            <button onClick={() => setViewMode(viewModes.ADD)}>ADD</button>
            <button onClick={() => setViewMode(viewModes.EDIT)}>EDIT</button>
          </React.Fragment>
        )}
        {viewMode !== viewModes.VIEW && (
          <button onClick={() => setViewMode(viewModes.VIEW)}>VIEW</button>
        )}
        {viewMode === viewModes.ADD && (
          <PlayerInputForm
            setPlayers={setPlayers}
            name="Player Name"
            sheet_url="Link to Char Sheet"
            profile_pic="Link to Char Picture"
            email="Player Email"
            view={{ mode: viewMode, states: viewModes }}
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

import axios from "axios";
import { useContext, useEffect, useState } from "react";
import dataHelpers from "../../../hooks/dataHelpers";
import CampContext from "../../../providers/CampProvider";
import { PlayerList } from "./PlayerList";

export const Party = () => {
  const [players, setPlayers] = useState({});
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
      </div>
      <div>
        {/* IMAGES HERE - BASE , CARDS - STRETCH */}
        {players && <PlayerList players={players} />}
      </div>
    </section>
  );
};

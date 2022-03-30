import React from "react";
import dataHelpers from "../../../hooks/dataHelpers";
import PlayerListItem from "./PlayerListItem";

export const PlayerList = ({ players, view, setPlayers }) => {
  const playerCards = players
    ? dataHelpers()
        .convertObjectToArray(players)
        .map((player) => (
          <PlayerListItem
            key={player.id}
            view={view}
            setPlayers={setPlayers}
            {...player}
          />
        ))
    : null;
  return (
    <div className="flex flex-row flex-wrap gap-6 mt-4 w-5/6 mx-auto justify-center font-inputFont ">
      {playerCards}
    </div>
  );
};

import React from "react";
import dataHelpers from "../../../hooks/dataHelpers";
import PlayerListItem from "./PlayerListItem";

export const PlayerList = ({ players, view }) => {
  const playerCards = players
    ? dataHelpers()
        .convertObjectToArray(players)
        .map((player) => (
          <PlayerListItem key={player.id} view={view} {...player} />
        ))
    : null;
  return (
    <div className="grid grid-cols-2 gap-6 mx-20 mt-4 px-10">{playerCards}</div>
  );
};

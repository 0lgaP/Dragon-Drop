import React, { useState, useEffect } from "react";

function StoryCardItem(props) {
  console.log("sci", props);

  const getName = (id, objArr) => {
    const found = objArr.find((element) => element.id === id);
    return found && found.name;
  };

  const getLife = (id, objArr) => {
    const alive = objArr.find((element) => element.id === id);
    return alive && alive.alive ? "😎" : "💀";
  };

  const npcName = getName(props.npcId, props.allNpcs);
  const mapName = getName(props.mapId, props.allMaps);
  const alive = getLife(props.npcId, props.allNpcs);

  const viewMode = props.view;

  return (
    <section className="card">
      <article className="card__container">
        <div className="card__title">{props.text}</div>
        <div>
          {alive}
          {npcName}
        </div>
        <div>{mapName}</div>
      </article>
    </section>
  );
}

export default StoryCardItem;

import React, { useState, useEffect } from "react";
import './DND_Card.css'
import './Button.css'

function DndStoryCardItem(props) {
  const css = props.css

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
    <section className={[`dnd_card  ${css}`]}>
      <article className="dnd_card__container">
        {viewMode !== "SHOW" && (
          <button alt="Edit" className="button cancel" onClick={props.onEdit}>
            Edit
          </button>
        )}
        <button
          alt="Toggle Alive"
          className="button death"
          onClick={props.onKill}
        >
          💀
        </button>
        <button
          alt="Story Card Completed"
          className="button confirm"
          onClick={props.onComplete}
        >
          ✅
        </button>
        {viewMode !== "SHOW" && (
          <button
            alt="Delete Story Card"
            className="button death"
            onClick={props.onDelete}
          >
            🗑️
          </button>
        )}
        <section className="dnd_card__title" >{props.text}</section>
      
      <div>     
        <aside className="flex justify-end">
          {alive}
          {" "}
          {npcName}
        </aside>
        <aside className="flex justify-end">
          {mapName}
        </aside>
        </div>
      </article>
    </section>
  );
}

export default DndStoryCardItem;
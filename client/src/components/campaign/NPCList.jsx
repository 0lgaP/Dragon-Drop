import React from "react";
import NPCListItem from './NPCListItem';

const NPCList = (props) => {
  const list = props.npcs.map((character) => {

    <NPCListItem key={character.id}  name={character.name} bio={character.bio} details={character.details} alive={character.alive} />
  })

  return (
    <section className="npc-list">
      <ul>
        {list}
      </ul>
    </section>
  )
  
}

export default NPCList;
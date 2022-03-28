import React from 'react'
import './Button.css';
import './Card.css';



function Empty() {
  return (
    <section className="card">
      <article className="card__container">
        <h1>
          To start writing, you need to set up Map and NPCs:
        </h1>
        <h2>Step 1:</h2>
        <p>Create a map by clicking Map in the gray navigation bar</p>
        <h2>Step 2:</h2>
        <p>Create a new Non-Player Character or "NPC" by clicking on the NPC's in the navigation bar (4th option). If you are not sure about the characters, create a Narrator cheracter.</p>
        <h2>Step 3:</h2>
        <p>Come back here to begin writing 😄 </p>
      </article>
    </section>
  )
}

export default Empty
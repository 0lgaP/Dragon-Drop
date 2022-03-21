import React, { useState } from "react";


export default function ShowStoryCards() {
  const [story, setStory] = useState('');


  return (
    <section className="card">
    <form autoComplete="off">
  <article className="card__container">

  <button className="button confirm">
    Edit
  </button>
  <button className="button cancel" >
    Toggle 💀
  </button>
    <label className="card__title">
      Add Story Card
    </label>

  </article>
  <article className="card__container">

  </article>
  </form>
</section>

  )
}
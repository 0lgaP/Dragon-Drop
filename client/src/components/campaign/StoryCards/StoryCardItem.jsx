import React from 'react'

function StoryCardItem(props) {
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
          <div className="card_text-area">
          {props.story_card_text}
          </div>
      </article>
    </form>
  </section>
  )
}

export default StoryCardItem
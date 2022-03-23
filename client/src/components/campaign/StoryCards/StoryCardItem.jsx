import React from 'react'

function StoryCardItem(props) {
  return (
    <section className="card">
      <form autoComplete="off">
        <article className="card__container">
          <button className="button order">
            {props.order}
          </button>
          <button className="button cancel">
            Edit
          </button>
          <button className="button death" >
          Toggle 💀
          </button>
          <button className="button confirm">
            Done
          </button>
            <div className="card__title">
            {props.text}
            </div>
        </article>
      </form>
    </section>
  )
}

export default StoryCardItem
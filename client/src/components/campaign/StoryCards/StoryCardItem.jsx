import React from 'react'

function StoryCardItem(props) {



  return (
    <section className="card">
      <form autoComplete="off">
        <article className="card__container">
          <button className="button order">
            {props.order}
          </button>
          <button alt="Edit" className="button cancel">
            Edit
          </button>
          <button alt="Toggle Alive" className="button death" >
          💀
          </button>
          <button alt="Story Card Completed" className="button confirm">
          ✅
          </button>
          <button alt="Delete Story Card" className="button death">
          🗑️
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
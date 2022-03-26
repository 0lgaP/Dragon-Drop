import React from 'react'

function StoryCardItem(props) {

  // const onClick = () => {
  //   console.log('CLicked')
  // }
  // const getName = (id, array) => {
  //   return array[id].name
  // }
  // const npcName = getName(props.npcId, props.allNpcs)
  const getName = (id, objArr) => {
    const name = objArr.find(element => element.id === id)
    const nameName = name.name
    return nameName
  }
  const npcName = getName(props.npcId, props.allNpcs)

  return (
    <section className="card">
      {/* <form autoComplete="off"> */}
        <article className="card__container">
          <button className="button order">
            {npcName}
          </button>
          <button alt="Edit" className="button cancel" onClick={props.onEdit}>
            Edit
          </button>
          <button alt="Toggle Alive" className="button death" >
          💀
          </button>
          <button alt="Story Card Completed" className="button confirm" onClick={props.onComplete}>
          ✅
          </button>
          <button alt="Delete Story Card" className="button death" onClick={props.onDelete}>
          🗑️
          </button>
            <div className="card__title">
            {props.text}
            </div>
        </article>
      {/* </form> */}
    </section>
  )
}

export default StoryCardItem
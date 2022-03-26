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
    return name.name
  }
  const getLife = (id, objArr) => {
  const alive = objArr.find(element => element.id === id)
  return alive.alive ? '😎' : '💀'
}
  // const setIcon = (id, objArr, element) => {
  //   const name = objArr.find(element => element.id === id)
  //   if(name[element] === true) {
  //     return '😎'
  //   } else {
  //     return '💀'
  //   }
  // }
  const npcName = getName(props.npcId, props.allNpcs)
  const mapName = getName(props.mapId, props.allMaps)
  const alive = getLife(props.npcId, props.allNpcs)

  





  return (
    <section className="card">
      {/* <form autoComplete="off"> */}
        <article className="card__container">
          {/* <button className="button order">
            {npcName}
          </button> */}
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
            <div>
            {alive}{npcName}
            </div>
            <div>
              {mapName}
            </div>
        </article>
      {/* </form> */}
    </section>
  )
}

export default StoryCardItem
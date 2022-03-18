import React, { useState } from "react";
import Picture from "./Picture";
import { useDrop } from "react-dnd";


const PictureList = [
  {
    id: 1,
    url: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/001.png"
  },
  {
    id: 2,
    url: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/002.png"
  },
  {
    id: 3,
    url: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/003.png"
  },
]

function DragDrop() {

  const [board, setBoard] = useState([])

  const [{isOver}, drop] = useDrop(() => ({
    accept: "image",
    drop: (item) => addImageToBOard(item.id),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    })
  }))

  const addImageToBOard = (id) => {
    console.log(id)
    const pictureList = PictureList.filter((picture) => id === picture.id);
    // setBoard((board) => [...board, pictureList[0]]) --> keep adding
    setBoard([pictureList[0]]);
  };

  return (
    <div>
    <>
    <div className="Pictures"> {PictureList.map((picture) => {
      return <Picture url={picture.url} id={picture.id}/>
    })} </div>
    <div className="Board" ref={drop}>
      {board.map((picture) => {
        return <Picture url={picture.url} id={picture.id} />
      })}
    </div>
    </>
    </div>
  )
}
export default DragDrop
import React from "react";
import { useDrag } from "react-dnd";

function Picture({id, url}){
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "image",
    item: {id: id},
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));
  return(
    // eslint-disable-next-line jsx-a11y/alt-text
    <img 
    ref={drag}
    src={url} 
    width="150px" 
    style={{border: isDragging ? "5px solid pink" : "0px"}}
    />
  );
}
export default Picture

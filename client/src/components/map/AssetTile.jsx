import { useDrag } from "react-dnd";
import { ItemTypes } from "./ItemTypes";
import { useCallback, useEffect, useState } from "react";
import React from "react";
import axios from "axios";

// Styling for div container
const style = {
  position: "absolute",
  border: "1px dashed gray",
  padding: "0.1rem .2rem",
  cursor: "move"
};

const maxLayerCount = 300;

// Box Component
export const AssetTile = ({
  id,
  left,
  top,
  altThing,
  mapSize,
  image,
  parent,
  background, // background image ref
  layerInfo,
  scale,
  urlParams,
  self,
  deleteMe
}) => {
  const [loc, setLoc] = useState({
    top: top * (mapSize.offsetHeight / mapSize.absoluteHeight),
    left: left * (mapSize.offsetWidth / mapSize.absoluteWidth)
  });

  const [tickTock, setTick] = useState(false);

  const [size, setSize] = useState({
    width:
      (mapSize.absoluteWidth / 100) *
      (mapSize.offsetWidth / mapSize.absoluteWidth) * scale,
    height:
      (mapSize.absoluteHeight / 100) *
      (mapSize.offsetHeight / mapSize.absoluteHeight) * scale
  });

  useEffect(() => {

    const newScale = ((size.width / (mapSize.absoluteWidth / 100)) / (mapSize.offsetWidth / mapSize.absoluteWidth));

    axios.put(`/users/${urlParams.u_id}/campaigns/${urlParams.c_id}/maps/${urlParams.m_id}/assets/${urlParams.asset_id}/scale`,
      { scale: newScale });
    
  }, [tickTock])

  // Handle Resize
  const handler = useCallback(() => {
    function onMouseMove(e) {
      setSize((currentSize) => ({
        width: currentSize.width + e.movementX,
        height: currentSize.height + e.movementY
      }));
    }
    function onMouseUp() {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
      setTick(prev => !prev)
    }
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
  }, []);

  // Handle Drag
  const [{ isDragging }, drag] = useDrag(() => {
    const dragObject = {
      type: ItemTypes.ASSET,
      item: {
        setLoc,
        loc,
        id,
        left,
        top,
        mapSize,
        type: self.type
      },
      collect: (monitor) => ({
        isDragging: monitor.isDragging()
      })
    };

    return dragObject;
  }, [id, left, top]);

  // Sets size height to rendered height for tile
    // Needed to fix dynamic z-indexing for images when using tailwind 
  const onImgLoad = ({ target: img }) => {
    const { offsetHeight, offsetWidth } = img;
    setSize(prev => {
      return { ...prev, height: offsetHeight }
    })
  };

  // Show Drag Overlay if img is being dragged
  if (isDragging) {
    return <img ref={drag} />;
  }

  return (
    <div
      style={{
        ...style,
        left: loc.left,
        top: loc.top,
        zIndex:
          parseInt(String(maxLayerCount - layerInfo.order) +
          (mapSize.offsetHeight + (loc.top + size.height) < 0
            ? 1
            : mapSize.offsetHeight + (loc.top + size.height)))
      }}
    >
      <img
        src={image}
        ref={drag}
        role="ASSET"
        alt={ altThing }
        onLoad={onImgLoad}
        height={size.height + "px"}
        width={size.width + "px"}
      />
      <button onMouseDown={handler} style={{ ...style, bottom: 0, right: 0, backgroundColor: 'grey' }}>
        ||
      </button>
    </div>
  );
};

import { useCallback, useState, useRef } from "react";
import { useDrop } from "react-dnd";
import { ItemTypes } from "./ItemTypes";
import { Box } from "./Box";
import update from "immutability-helper";
const styles = {
  width: "100%",
  height: 700,
  border: "1px solid black",
  position: "relative"
};

const imageStyles = {
  align: "left",
  objectFit: "contain",
  objectPosition: "left top",
  maxHeight: "100%",
  width: "100%"
};
export const Container = () => {
  const [boxes, setBoxes] = useState({
    a: {
      layer: { order: 199, name: "Foreground" },
      top: 33,
      left: 60,
      title: "Drag me around",
      imgSrc:
        "https://cdn.britannica.com/64/135864-050-57268027/Nicolas-Cage-2009.jpg"
    },
    b: {
      layer: { order: 199, name: "Foreground" },
      top: 180,
      left: 20,
      title: "Drag me too",
      imgSrc:
        "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcSZjIhQYJAKltl9QjqqSQ4vjk9goWnXTt1zjNaTF4gYzdoGTYOj"
    },
    c: {
      layer: { order: 200, name: "Background" },
      top: 280,
      left: 120,
      title: "Drag me too",
      imgSrc: "https://www.varietyinsight.com/images/honoree/Dwayne_Johnson.png"
    }
  });
  const moveBox = useCallback(
    (id, left, top) => {
      setBoxes(
        update(boxes, {
          [id]: {
            $merge: { left, top }
          }
        })
      );
    },
    [boxes, setBoxes]
  );
  const [, drop] = useDrop(
    () => ({
      accept: ItemTypes.PLAYER,
      drop(item, monitor) {
        const delta = monitor.getDifferenceFromInitialOffset();
        const left = Math.round(item.loc.left + delta.x);
        const top = Math.round(item.loc.top + delta.y);
        item.setLoc({ left, top });
        moveBox(item.id, left, top);
        return undefined;
      }
    }),
    [moveBox]
  );

  const divRef = useRef();
  const backgroundRef = useRef();

  const [imageSize, setImageSize] = useState({
    offsetHeight: 0,
    offsetWidth: 0,
    absoluteHeight: 0,
    absoluteWidth: 0
  });

  // Get Actual Background Img Resolution
  const onImgLoad = ({ target: img }) => {
    const { offsetHeight, offsetWidth } = img;
    const test = new Image();
    test.src = img.src;
    test.onload = () => {
      const ratio = test.height / test.width;
      const parentElmHeight = img.parentElement.offsetHeight;
      setImageSize({
        ratio,
        offsetHeight,
        offsetWidth:
          parentElmHeight - 2 === offsetHeight
            ? offsetHeight / ratio
            : offsetWidth,
        absoluteHeight: test.height,
        absoluteWidth: test.width
      });
    };
  };

  return (
    <div
      ref={(self) => {
        divRef.current = self;
        drop(self);
      }}
      style={styles}
    >
      <img
        ref={backgroundRef}
        style={imageStyles}
        onLoad={onImgLoad}
        alt=""
        src="https://lh3.googleusercontent.com/AJ5H-eUNPd2wAQlJsADGgNNMgG7BTotJG2Uz2hnibIoiSXH_76CKuZKBrJTAaPJoZNRxQ5Q=s0"
      />
      {backgroundRef &&
        imageSize.absoluteWidth &&
        Object.keys(boxes).map((key) => {
          const { left, top, title, imgSrc, layer } = boxes[key];
          return (
            <Box
              key={key}
              id={key}
              left={left}
              top={top}
              altThing={title}
              mapSize={imageSize}
              image={imgSrc}
              parent={divRef}
              background={backgroundRef}
              layerInfo={layer}
            />
          );
        })}
    </div>
  );
};

import { useCallback, useState, useRef } from "react";
import { useDrop } from "react-dnd";
import { ItemTypes } from "./ItemTypes";
import { AssetTile } from "./AssetTile";
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
export const MapContainer = ({ mapState }) => {
  const [assets, setAssets] = useState(mapState.data.Images);
  
  const moveAsset = useCallback(
    (id, left, top) => {
      setAssets(
        update(assets, {
          [id]: {
            $merge: { left_pos: left, top_pos: top }
          }
        })
      );
    },
    [assets, setAssets]
  );
  const [, drop] = useDrop(
    () => ({
      accept: ItemTypes.ASSET,
      drop(item, monitor) {
        const delta = monitor.getDifferenceFromInitialOffset();
        const left = Math.round(item.loc.left + delta.x);
        const top = Math.round(item.loc.top + delta.y);
        item.setLoc({ left, top });
        moveAsset(item.id, left, top);
        return undefined;
      }
    }),
    [moveAsset]
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
        ref={ backgroundRef }
        style={ imageStyles }
        onLoad={ onImgLoad }
        alt="Background"
        src={mapState.background}
      />
      {backgroundRef &&
        imageSize.absoluteWidth &&
        Object.keys(assets).map((key) => {
          const { id, left_pos, top_pos, name, img, layer_order, layer_name, scale } = assets[key];
          return (
            <AssetTile
              key={key}
              id={key}
              left={left_pos}
              top={top_pos}
              altThing={name}
              mapSize={imageSize}
              image={img}
              parent={ divRef }
              scale={ scale }
              background={backgroundRef}
              layerInfo={{order: layer_order, name: layer_name}}
            />
          );
        })}
    </div>
  );
};

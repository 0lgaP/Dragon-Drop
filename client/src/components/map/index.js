import { MapContainer } from "./MapContainer";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
const Index = ({ mapState, setMapState, id }) => {
  return (
    <DndProvider backend={HTML5Backend} id={id + 1}>
      <MapContainer
        mapState={mapState}
        setMapState={setMapState}
        id={id}
        key={id}
      />
    </DndProvider>
  );
};
export default Index;

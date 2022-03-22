import { MapContainer } from "./MapContainer";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
const Index = ({ mapId }) => {
  return (
    <DndProvider backend={HTML5Backend}>
      <MapContainer />
    </DndProvider>
  );
};
export default Index;

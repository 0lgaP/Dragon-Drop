import "./App.css";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import DragDrop from "./chess-components/DragDrop";

function App() {
  return (
    <DndProvider backend={HTML5Backend}>

    <div className="App">
      <h1 className="text-3xl font-bold underline">Drag Drop Test!</h1>
      <DragDrop></DragDrop>
    </div>

    </DndProvider>
  );
}

export default App;

import "./App.css";
import Knight from "./tutorial-components/Knight";
import Square from "./tutorial-components/Square";
import Board from "./tutorial-components/Board";


function App() {
  return (

    <div className="App">
    <Board knightPosition={[0, 0]}/>
    </div>

  );
}

export default App;

// <DndProvider backend={HTML5Backend}>

// <div className="App">
//   <h1 className="text-3xl font-bold underline">Drag Drop Test!</h1>
//   <DragDrop></DragDrop>
// </div>

// </DndProvider>
import "./App.css";
// import Knight from "./tutorial-components/Knight";
// import Square from "./tutorial-components/Square";
import Board from "./tutorial-components/Board";
// import { observe } from "./tutorial-components/Game";

//knight position should be state

function App({knightPosition}) {
//const [knightPosition, setKnightPosition] = useState()

//const move = () => {}

  return (

    <div className="App">
    <Board knightPosition={knightPosition} />
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
import './App.css';
import { CheckersProvider } from './providers';
import { GameBoardController } from './components';
import { NextMoveInspectorProvider } from './providers';

function App() {
  return (
    <div className="App">
      <CheckersProvider>
        <NextMoveInspectorProvider>
          <GameBoardController />
        </NextMoveInspectorProvider>
      </CheckersProvider>
    </div>
  );
}

export default App;

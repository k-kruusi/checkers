import './App.css';
import { CheckersProvider } from './providers';
import { GameBoardController } from './components';
import { NextMoveInspectorProvider } from './providers';
import { StateExplorer } from './components/StateExplorer';

function App() {
  return (
    <div className="App">
      <CheckersProvider>
        <NextMoveInspectorProvider>
          <GameBoardController />
          <StateExplorer />

        </NextMoveInspectorProvider>
      </CheckersProvider>
    </div>
  );
}

export default App;

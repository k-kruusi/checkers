import './App.css';
import { CheckersProvider, ComputerPlayerProvider } from './providers';
import { GameBoardController } from './components';
import { NextMoveInspectorProvider } from './providers';
import { MetadataController } from './components';

function App() {
  return (
    <div className="App">
      <CheckersProvider>
        <NextMoveInspectorProvider>
          <ComputerPlayerProvider>
            <MetadataController>
              <GameBoardController />
            </MetadataController>
          </ComputerPlayerProvider>
        </NextMoveInspectorProvider>
      </CheckersProvider>
    </div>
  );
}

export default App;

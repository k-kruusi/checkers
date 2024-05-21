import './App.css';
import { CheckersProvider, ComputerPlayerProvider } from './providers';
import { GameBoardController } from './components';
import { NextMoveInspectorProvider } from './providers';
import { LayoutSelector } from './components';

function App() {
  return (
    <div className="App">
      <CheckersProvider>
        <NextMoveInspectorProvider>
          <ComputerPlayerProvider>
            <LayoutSelector>
              <GameBoardController />
            </LayoutSelector>
          </ComputerPlayerProvider>
        </NextMoveInspectorProvider>
      </CheckersProvider>
    </div>
  );
}

export default App;

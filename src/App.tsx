import './App.css';
import { CheckersProvider, ComputerPlayerProvider } from './providers';
import { GameBoardController } from './components';
import { NextMoveProvider } from './providers';
import { LayoutSelector } from './components';

function App() {
  return (
    <div className="App">
      <CheckersProvider>
        <NextMoveProvider>
          <ComputerPlayerProvider>
            <LayoutSelector>
              <GameBoardController />
            </LayoutSelector>
          </ComputerPlayerProvider>
        </NextMoveProvider>
      </CheckersProvider>
    </div>
  );
}

export default App;

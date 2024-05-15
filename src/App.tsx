import './App.css';
import { CheckersProvider } from './providers';
import { GameBoard } from './components/gameBoard';

function App() {
  return (
    <div className="App">
      <CheckersProvider>
        <GameBoard />
      </CheckersProvider>
    </div>
  );
}

export default App;

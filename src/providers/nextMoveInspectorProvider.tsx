import { createContext, useState } from 'react';
import { Outcome, Piece, TileData } from '../schema';
import { useCheckers } from '../hooks';
import { calculatePotentialMoves } from '../utils';

export const NextMoveInspectorContext = createContext<{
  inspect: (maybe: TileData) => void;
  inspectAndReturn: (maybe: TileData) => Outcome[];
  potentials: Outcome[];
  clear: () => void;
} | null>(null);

export const NextMoveInspectorProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [focus, setFocus] = useState<TileData | null>(null);
  const [potentials, setPotentials] = useState<Outcome[]>([]);
  const { state } = useCheckers();

  const inspect = (fresh: TileData) => {
    if (focus &&
      focus.piece === fresh.piece &&
      focus.coord.x === fresh.coord.x &&
      focus.coord.y === fresh.coord.y) {
      // exit early already calculated for that tile.
      return;
    }
    // if you are hovering over an empty
    // flush the potentials
    if (fresh.piece === Piece.Empty) {
      setPotentials([]);
      setFocus(fresh);
      return;
    }

    try {
      const moves = calculatePotentialMoves(state.board, fresh.coord);
      setPotentials(moves);
      setFocus(fresh);
    } catch (e) {
      console.error('error calculating potential moves', e);
    }
  };

  const inspectAndReturn = (fresh: TileData): Outcome[] => {
    try {
      return calculatePotentialMoves(state.board, fresh.coord);
    } catch (e) {
      console.error('error inspecting possible moves');
      return [];
    }
  }

  const clear = () => setPotentials([]);

  return (
    <NextMoveInspectorContext.Provider value={{ inspect, inspectAndReturn, potentials, clear }}>
      {children}
    </NextMoveInspectorContext.Provider>
  );
};



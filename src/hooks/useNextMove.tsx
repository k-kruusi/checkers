
import { useState, useContext } from 'react';
import { NextMoveInspectorContext } from "../providers/nextMoveInspectorProvider";
import { Outcome, Piece, TileData } from "../schema";
import { useCheckers } from './useCheckers';
import { calculatePotentialMoves } from '../utils';

export const useNextMove = () => {
  const context = useContext(NextMoveInspectorContext);
  if (!context) {
    throw new Error('useCheckers must be used within a CheckersProvider');
  }
  return context;
}

export const useNextMoveHook = () => {
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
    // if you are hovering over an empty, 
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
      console.error("error calculating potential moves", e);
    }
  };

  const clear = () => setPotentials([]);

  return { inspect, potentials, clear };
};


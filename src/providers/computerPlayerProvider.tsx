import { ReactNode, createContext, useCallback, useEffect, useState } from 'react';
import { useCheckers, useNextMove } from '../hooks';
import { getPieces, getRandomIndex, isTurn } from '../utils';
import { ComputerPlayerOption, MoveResult, Outcome, PlayerType } from '../schema';
import { ActionType } from '../reducer';

export const ComputerPlayerContext = createContext<{
  pickMove: () => void;
} | null>(null);

export const ComputerPlayerProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { state, dispatch } = useCheckers();
  const { board, turn, players, winner } = state;
  const { inspectAndReturn } = useNextMove();
  const [lastTurn, setLastTurn] = useState<number>(-1);

  const pickMove = useCallback(() => {
    // could update this to work with either black or red being computer controlled...
    const { red } = getPieces(board);
    const movesWithoutJumps: ComputerPlayerOption[] = [];
    const movesWithJumps: ComputerPlayerOption[] = [];

    red.forEach((tileData) => {
      let moves: Outcome[] = [];

      try {
        moves = inspectAndReturn(tileData);
        if (moves.length === 0) {
          return;
        }
      } catch (e) {
        console.error("Error calculating moves for computer opponent", e);
        return;
      }

      const numWithJumps = moves.filter((m) => m.didJump);
      if (numWithJumps.length > 0) {
        // always picking the last jump in the list
        // may not be the biggest jump but it should be one that cannot continue.
        // room to improve...
        movesWithJumps.push({ tileData, move: numWithJumps[numWithJumps.length - 1] });
      }
      else {
        // picking a random move from that tiles list.
        const index = getRandomIndex(moves);
        movesWithoutJumps.push({ tileData, move: moves[index] });
      }
    });

    if (movesWithJumps.length > 0) {
      const index = getRandomIndex(movesWithJumps);
      return movesWithJumps[index];
    }
    if (movesWithoutJumps.length > 0) {
      const index = getRandomIndex(movesWithoutJumps);
      return movesWithoutJumps[index];
    }

    return { tileData: red[0], move: null };
  }, [inspectAndReturn, board]);

  useEffect(() => {
    if (lastTurn === turn.count || winner) {
      return;
    }

    const computerPlayer = players.find((p) => p.type === PlayerType.Computer);
    if (!computerPlayer || !isTurn(turn.phase, computerPlayer.color)) {
      return;
    }

    const selection = pickMove();
    if (!selection || !selection.move) {
      // game over there are no moves left for the computer.
      dispatch({ type: ActionType.FORFEIT, loser: computerPlayer.color });
      return;
    }

    setLastTurn(turn.count);
    dispatch({
      type: ActionType.MOVE_PIECE,
      from: selection.tileData.coord,
      to: selection.move.coord,
      piece: selection.tileData.piece,
      potentials: [selection.move],
      result: selection.move.didJump ? MoveResult.Jump : MoveResult.Shift,
      timestamp: new Date().toISOString(),
    });
  }, [turn.phase, players, pickMove]);

  return (
    <ComputerPlayerContext.Provider value={{ pickMove }}>
      {children}
    </ComputerPlayerContext.Provider>
  );
};

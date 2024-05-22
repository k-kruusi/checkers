import { ReactNode, createContext, useCallback, useEffect, useState } from 'react';
import { useCheckers, useNextMove } from '../hooks';
import { getPieces, getRandomIndex, isTurn } from '../utils';
import { ComputerPlayerOption, MoveResult, Outcome, Piece, PlayerType } from '../schema';
import { ActionType } from '../reducer';

export const ComputerPlayerContext = createContext<{
  pickMove: (piece: Piece) => void;
} | null>(null);

export const ComputerPlayerProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { state, dispatch } = useCheckers();
  const { board, turn, players, winner } = state;
  const { inspectAndReturn } = useNextMove();
  const [lastTurnRed, setLastTurnRed] = useState<number>(-1);
  const [lastTurnBlack, setLastTurnBlack] = useState<number>(-1);

  const pickMove = useCallback((piece: Piece) => {
    const { red, black } = getPieces(board);
    const movesWithoutJumps: ComputerPlayerOption[] = [];
    const movesWithJumps: ComputerPlayerOption[] = [];

    const piecesOfFocus = piece === Piece.Black ? black : red;

    if (piecesOfFocus.length === 0) {
      return null;
    }

    piecesOfFocus.forEach((tileData) => {
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

    return null;
  }, [inspectAndReturn, board]);


  // observes & triggers red if computer player
  useEffect(() => {
    if (lastTurnRed === turn.count || !isTurn(turn.phase, Piece.Red) || winner) {
      return;
    }
    const selection = pickMove(Piece.Red);
    if (!selection) {
      // game over there are no moves left for the computer.
      dispatch({ type: ActionType.FORFEIT, loser: Piece.Red });
      return;
    }

    const computerPlayer = players.find((p) => p.type === PlayerType.Computer);
    if (!computerPlayer) {
      return;
    }
    setLastTurnRed(turn.count);
    dispatch({
      type: ActionType.MOVE_PIECE,
      from: selection.tileData.coord,
      to: selection.move.coord,
      piece: selection.tileData.piece,
      potentials: [selection.move],
      result: selection.move.didJump ? MoveResult.Jump : MoveResult.Shift,
      timestamp: new Date().toISOString(),
    });
  }, [
    turn.phase, players, pickMove,
    dispatch, lastTurnRed, setLastTurnRed,
    turn.count, winner
  ]);

  // observes black
  useEffect(() => {
    if (lastTurnBlack === turn.count || !isTurn(turn.phase, Piece.Black) || winner) {
      return;
    }
    const selection = pickMove(Piece.Black);
    if (!selection) {
      dispatch({ type: ActionType.FORFEIT, loser: Piece.Black });
    }
    setLastTurnBlack(turn.count);
  }, [lastTurnBlack, turn, winner, pickMove, dispatch]);

  return (
    <ComputerPlayerContext.Provider value={{ pickMove }}>
      {children}
    </ComputerPlayerContext.Provider>
  );
};

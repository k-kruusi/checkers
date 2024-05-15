import { Action, ActionType } from "../actions";
import { BoardState, Piece } from "./types";


// Initial state
export const initialState: BoardState = {
  board: [
    [Piece.Empty, Piece.Red, Piece.Empty, Piece.Red, Piece.Empty, Piece.Red, Piece.Empty, Piece.Red],
    [Piece.Red, Piece.Empty, Piece.Red, Piece.Empty, Piece.Red, Piece.Empty, Piece.Red, Piece.Empty],
    [Piece.Empty, Piece.Red, Piece.Empty, Piece.Red, Piece.Empty, Piece.Red, Piece.Empty, Piece.Red],
    [Piece.Empty, Piece.Empty, Piece.Empty, Piece.Empty, Piece.Empty, Piece.Empty, Piece.Empty, Piece.Empty],
    [Piece.Empty, Piece.Empty, Piece.Empty, Piece.Empty, Piece.Empty, Piece.Empty, Piece.Empty, Piece.Empty],
    [Piece.Black, Piece.Empty, Piece.Black, Piece.Empty, Piece.Black, Piece.Empty, Piece.Black, Piece.Empty],
    [Piece.Empty, Piece.Black, Piece.Empty, Piece.Black, Piece.Empty, Piece.Black, Piece.Empty, Piece.Black],
    [Piece.Black, Piece.Empty, Piece.Black, Piece.Empty, Piece.Black, Piece.Empty, Piece.Black, Piece.Empty],
  ],
  currentPlayer: Piece.Black,
  winner: null,
  moveHistory: [],
  start: new Date(),
  end: null,
};

// Reducer
export function reducer(state: BoardState, action: Action): BoardState {
  switch (action.type) {
    case ActionType.MOVE_PIECE: {
      const { from, to, result } = action;
      const { board, currentPlayer, moveHistory } = state;
      // Logic for moving the piece
      const newBoard = [...board];
      // Update newBoard with the moved piece
      // Check for winner, if any
      return {
        ...state,
        board: newBoard,
        currentPlayer: currentPlayer === Piece.Black ? Piece.Red : Piece.Black,
        moveHistory: [...moveHistory, { from, to, result }],
      };
    }
    case ActionType.UNDO_MOVE: {
      const { board, moveHistory, currentPlayer } = state;
      if (moveHistory.length === 0) {
        return state; // Cannot undo further
      }
      const lastMove = moveHistory[moveHistory.length - 1];
      // const [from, to] = lastMove;
      const newBoard = [...board];
      // Logic to undo the move
      // Remove the last move from moveHistory
      return {
        ...state,
        board: newBoard,
        currentPlayer: currentPlayer === Piece.Black ? Piece.Red : Piece.Black,
        moveHistory: moveHistory.slice(0, moveHistory.length - 1),
      };
    }
    case ActionType.DECLARE_WINNER: {
      return { ...state, winner: action.winner };
    }
    case ActionType.RESET_GAME: {
      // Reset the game to initial state
      return { ...initialState };
    }
    case ActionType.COMMIT_MOVE: {
      // This action can be used if you want to finalize a move, perhaps after some additional validation
      return state;
    }
    default:
      return state;
  }
}
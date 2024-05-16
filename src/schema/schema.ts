import { MoveResult, Piece } from "./types";




export interface BoardState {
  board: Piece[][];
  currentPlayer: Piece;
  winner: Piece | null;
  moveHistory: { from: [number, number]; to: [number, number]; result: MoveResult; }[];
  start: Date;
  end: Date | null;
}


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
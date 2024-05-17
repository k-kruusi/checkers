import { Outcome, Piece, TileData, TurnState, TurnType } from "./types";

export interface BoardState {
  board: Piece[][];
  turn: TurnState;
  winner: Piece | null;
  moveHistory: Outcome[];
  start: Date;
  end: Date | null;
  lock: TileData | null;
  message: string | null;
}

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
  turn: { type: TurnType.Black, count: 0 },
  winner: null,
  moveHistory: [],
  start: new Date(),
  end: null,
  lock: null,
  message: null,
};
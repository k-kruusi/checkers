// Types
export enum Piece {
  Empty,
  Black,
  Red,
}

export enum MoveResult {
  Normal,
  Kinged,
  Eliminated,
}

export interface BoardState {
  board: Piece[][];
  currentPlayer: Piece;
  winner: Piece | null;
  moveHistory: { from: [number, number]; to: [number, number]; result: MoveResult; }[];
  start: Date;
  end: Date | null;
}
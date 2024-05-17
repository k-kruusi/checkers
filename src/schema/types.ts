// Enums
export enum Piece {
  Empty,
  Black,
  Red,
  BlackKing,
  RedKing,
}

export enum MoveResult {
  Shift,
  Jump,
}

export enum TurnType {
  Black,
  Red,
  TransitionToBlack,
  TransitionToRed,
}

// Types
export type TurnState = {
  type: TurnType;
  count: number;
}

export type Coord = {
  x: number;
  y: number;
};

export type TileData = {
  piece: Piece;
  coord: Coord;
}

export type Outcome = {
  piece: Piece;
  coord: Coord;
  didJump: boolean;
  eliminated: TileData[];
  backDirection: Coord;
};

// Constants
export const localPlayerColor = Piece.Black;
export const remotePlayerColor = Piece.Red;
export const up: Coord[] = [{ x: -1, y: -1 }, { x: 1, y: -1 }];
export const down: Coord[] = [{ x: -1, y: 1 }, { x: 1, y: 1 }];
export const startDirection = { x: 0, y: 0 };

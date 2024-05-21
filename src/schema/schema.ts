import { Action } from '../reducer';
import { GamePhase, Piece, Player, PlayerType, TileData, TurnState } from './types';

export interface BoardState {
  board: Piece[][];
  turn: TurnState;
  winner: Piece | null;
  transformations: Action[];
  lock: TileData | null; // this is used if a player makes a jump in a move that has a series of jumps, but stops short
  message: string | null;
  players: Player[];
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
  turn: { phase: GamePhase.Black, count: 0 },
  winner: null,
  transformations: [],
  lock: null,
  message: null,
  players: [{ type: PlayerType.LocalInput, color: Piece.Black }, { type: PlayerType.Computer, color: Piece.Red }]
};
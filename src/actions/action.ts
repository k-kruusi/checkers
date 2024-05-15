import { MoveResult, Piece } from "../schema/types";

export enum ActionType {
  MOVE_PIECE,
  UNDO_MOVE,
  DECLARE_WINNER,
  RESET_GAME,
  COMMIT_MOVE,
}

export interface MovePieceAction {
  type: ActionType.MOVE_PIECE;
  from: [number, number];
  to: [number, number];
  result: MoveResult;
}

export interface UndoMoveAction {
  type: ActionType.UNDO_MOVE;
}

export interface DeclareWinnerAction {
  type: ActionType.DECLARE_WINNER;
  winner: Piece;
}

export interface ResetGameAction {
  type: ActionType.RESET_GAME;
}

export interface CommitMoveAction {
  type: ActionType.COMMIT_MOVE;
}

export type Action =
  | MovePieceAction
  | UndoMoveAction
  | DeclareWinnerAction
  | ResetGameAction
  | CommitMoveAction;
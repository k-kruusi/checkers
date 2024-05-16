import { BoardState } from "../../schema";
import { MovePieceAction } from "./handleMoveAction";
import { LoadStateAction } from "./loadStateAction";
import { ResetGameAction } from "./resetGameAction";

export enum ActionType {
  MOVE_PIECE,
  LOAD_STATE,
  RESET_GAME,
}





export type Action =
  | MovePieceAction
  | ResetGameAction
  | LoadStateAction;

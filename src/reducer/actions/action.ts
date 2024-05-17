import { MovePieceAction } from "./moveAction";
import { ResetGameAction } from "./resetGameAction";
import { BannerTransitionAction } from "./annerTransitionAction";
import { ClearMessageAction } from "./clearMessageAction";

export enum ActionType {
  BANNER_TRANSITION,
  MOVE_PIECE,
  RESET_GAME,
  CLEAR_MESSAGE,
}

export type Action =
  | BannerTransitionAction
  | MovePieceAction
  | ResetGameAction
  | ClearMessageAction;

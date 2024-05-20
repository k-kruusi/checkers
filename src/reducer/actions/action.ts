import { MovePieceAction } from "./moveAction";
import { ResetGameAction } from "./resetGameAction";
import { BannerTransitionAction } from "./bannerTransitionAction";
import { ClearMessageAction } from "./clearMessageAction";
import { ForfeitAction } from "./forfeitAction";
import { ToggleAIAction } from "./toggleAIAction";

export enum ActionType {
  BANNER_TRANSITION,
  MOVE_PIECE,
  RESET_GAME,
  CLEAR_MESSAGE,
  FORFEIT,
  TOGGLE_AI,
}

export type Action =
  | BannerTransitionAction
  | ClearMessageAction
  | ForfeitAction
  | MovePieceAction
  | ResetGameAction
  | ToggleAIAction;



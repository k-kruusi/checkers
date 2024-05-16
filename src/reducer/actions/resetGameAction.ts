import { BoardState } from "../../schema";
import { cloneInitialState } from "../../utils";
import { ActionType } from "./action";

export interface ResetGameAction {
  type: ActionType.RESET_GAME;
}

export function handleResetGameAction(state: BoardState, _: ResetGameAction) {
  return cloneInitialState();
}
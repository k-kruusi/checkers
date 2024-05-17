import { BoardState } from "../../schema";
import { ActionType } from "./action";

export interface ClearMessageAction {
  type: ActionType.CLEAR_MESSAGE;
}

export function handleClearMessageAction(state: BoardState, _: ClearMessageAction) {
  return { ...state, message: null };
}
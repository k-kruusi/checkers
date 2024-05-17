import { BoardState } from "../../schema";
import { next } from "../../utils";
import { ActionType } from "./action";

export interface BannerTransitionAction {
  type: ActionType.BANNER_TRANSITION;
}

export function handleBannerTransition(state: BoardState, _: BannerTransitionAction) {
  return { ...state, turn: next(state.turn) }
}
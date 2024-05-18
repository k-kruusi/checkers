import { BoardState, GamePhase } from "../../schema";
import { next } from "../../utils";
import { ActionType } from "./action";

export interface BannerTransitionAction {
  type: ActionType.BANNER_TRANSITION;
  currentPhase: GamePhase;
}

export function handleBannerTransition(state: BoardState, action: BannerTransitionAction) {
  if (state.turn.phase !== action.currentPhase) {
    console.log('abort!');
    return state;
  }
  return { ...state, turn: next(state.turn) };
}
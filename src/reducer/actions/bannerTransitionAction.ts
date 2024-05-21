import { BoardState, GamePhase } from "../../schema";
import { next } from "../../utils";
import { ActionType } from "./action";

export interface BannerTransitionAction {
  type: ActionType.BANNER_TRANSITION;
  currentPhase: GamePhase; // this should be the phase that you sent this transition from, not the desired phase.
}

export function handleBannerTransition(state: BoardState, action: BannerTransitionAction) {
  // we check that the phase hasnt changed since making the request, before processing it.
  // since the caller is on a timer, we cant be certain is hasnt changed phases since it was started.
  if (state.turn.phase !== action.currentPhase) {
    console.log('phase change aborted!');
    return state;
  }
  return { ...state, turn: next(state.turn), transformations: [...state.transformations, action] };
}
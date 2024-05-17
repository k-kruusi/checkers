import {
  Action,
  ActionType,
  handleBannerTransition,
  handleMovePieceAction,
  handleResetGameAction,
} from "./actions";
import { BoardState } from "../schema";


export function reducer(state: BoardState, action: Action): BoardState {
  switch (action.type) {
    case ActionType.BANNER_TRANSITION:
      return handleBannerTransition(state, action);
    case ActionType.MOVE_PIECE:
      return handleMovePieceAction(state, action);
    case ActionType.RESET_GAME:
      return handleResetGameAction(state, action);
    default:
      return state;
  }
}
import {
  Action,
  ActionType,
  handleBannerTransition,
  handleClearMessageAction,
  handleForfeitAction,
  handleMovePieceAction,
  handleResetGameAction,
  handleToggleAIAction,
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
    case ActionType.CLEAR_MESSAGE:
      return handleClearMessageAction(state, action);
    case ActionType.FORFEIT:
      return handleForfeitAction(state, action);
    case ActionType.TOGGLE_AI:
      return handleToggleAIAction(state, action);
    default:
      console.warn("action not implemented in reducer");
      return state;
  }
}
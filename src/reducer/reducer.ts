import { Action, ActionType, handleMovePieceAction, handleResetGameAction } from "./actions";
import { BoardState } from "../schema";

// Reducer
export function reducer(state: BoardState, action: Action): BoardState {
  switch (action.type) {
    case ActionType.MOVE_PIECE:
      return handleMovePieceAction(state, action);
    case ActionType.RESET_GAME: {
      return handleResetGameAction(state, action);
    }
    case ActionType.LOAD_STATE: {

      return state;
    }
    default:
      return state;
  }
}
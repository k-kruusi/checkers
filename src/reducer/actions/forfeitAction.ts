import { BoardState, Piece, TileData } from "../../schema";
import { nameForTile } from "../../utils";
import { ActionType } from "./action";

export interface ForfeitAction {
  type: ActionType.FORFEIT;
  loser: Piece;
}

export function handleForfeitAction(state: BoardState, action: ForfeitAction) {
  return {
    ...state,
    message: `${nameForTile(action.loser)} has lost the match.`,
    winner: Piece.Black,
    transformations: [...state.transformations, action]
  };
}
import { BoardState, Piece, PlayerType } from "../../schema";
import { ActionType } from "./action";

export interface ToggleAIAction {
  type: ActionType.TOGGLE_AI;
}

// currently computer players are only toggled for the red player
export function handleToggleAIAction(state: BoardState, action: ToggleAIAction) {

  const aiPlayer = state.players.find((p) => p.type === PlayerType.Computer);

  if (!aiPlayer) {
    const redPlayer = state.players.find((p) => p.color === Piece.Red);
    if (!redPlayer) {
      console.error("no red player, should never happen");
      return state;
    }
    const red = { ...redPlayer, type: PlayerType.Computer }
    const players = [state.players[0], red];
    return { ...state, players, transformations: [...state.transformations, action] };
  }
  else {
    const players = [state.players[0], { ...aiPlayer, type: PlayerType.LocalInput }];
    return { ...state, players, transformations: [...state.transformations, action] };
  }
}
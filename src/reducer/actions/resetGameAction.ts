import { BoardState } from '../../schema';
import { cloneState } from '../../utils';
import { ActionType } from './action';

export interface ResetGameAction {
  type: ActionType.RESET_GAME;
}

export function handleResetGameAction(state: BoardState, _: ResetGameAction) {

  const players = state.players;
  const fresh = cloneState();

  return { ...fresh, players };
}
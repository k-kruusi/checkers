import { initialState } from "../schema";


export function cloneInitialState() {

  return { ...initialState, board: [...initialState.board.map(row => [...row])], start: new Date(), end: null };
}
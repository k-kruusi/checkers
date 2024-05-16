import { BoardState } from "../../schema";
import { ActionType } from "./action";

export interface LoadStateAction {
  type: ActionType.LOAD_STATE;
  state: BoardState;
}
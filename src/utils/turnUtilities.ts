import { TurnState, TurnType } from "../schema";

export function next(turnState: TurnState) {
  switch (turnState.type) {
    case TurnType.Black:
      return { ...turnState, type: TurnType.TransitionToRed };
    case TurnType.Red:
      return { ...turnState, type: TurnType.TransitionToBlack };
    case TurnType.TransitionToBlack:
      return { type: TurnType.Black, count: turnState.count + 1 };
    case TurnType.TransitionToRed:
      return { ...turnState, type: TurnType.Red }
  }
}

export function nameForState(turnType: TurnType) {
  switch (turnType) {
    case TurnType.Black:
      return "BLACK";
    case TurnType.Red:
      return "RED";
    case TurnType.TransitionToBlack:
      return "TransitionToBlack";
    case TurnType.TransitionToRed:
      return "TransitionToRed";
  }
}
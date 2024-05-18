import { TurnState, GamePhase } from "../schema";

export function next(turnState: TurnState) {
  switch (turnState.phase) {
    case GamePhase.Black:
      return { ...turnState, phase: GamePhase.TransitionToRed };
    case GamePhase.Red:
      return { ...turnState, phase: GamePhase.TransitionToBlack };
    case GamePhase.TransitionToBlack:
      return { phase: GamePhase.Black, count: turnState.count + 1 };
    case GamePhase.TransitionToRed:
      return { ...turnState, phase: GamePhase.Red }
  }
}

export function nameForPhase(phase: GamePhase) {
  switch (phase) {
    case GamePhase.Black:
      return "BLACK";
    case GamePhase.Red:
      return "RED";
    case GamePhase.TransitionToBlack:
      return "TransitionToBlack";
    case GamePhase.TransitionToRed:
      return "TransitionToRed";
  }
}

export function reducePhase(phase: GamePhase) {
  switch (phase) {
    case GamePhase.Black:
    case GamePhase.TransitionToBlack:
      return GamePhase.Black;
    case GamePhase.Red:
    case GamePhase.TransitionToRed:
      return GamePhase.Red;
  }
}
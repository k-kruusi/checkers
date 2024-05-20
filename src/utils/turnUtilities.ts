import { TurnState, GamePhase, Piece, Player, PlayerType } from "../schema";

export function next(turnState: TurnState) {
  switch (turnState.phase) {
    case GamePhase.Black:
      return { phase: GamePhase.TransitionToRed, count: turnState.count + 1 };
    case GamePhase.Red:
      return { ...turnState, phase: GamePhase.TransitionToBlack };
    case GamePhase.TransitionToBlack:
      return { ...turnState, phase: GamePhase.Black };
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

export function isTurn(phase: GamePhase, color: Piece) {
  switch (phase) {
    case GamePhase.Black:
      return color === Piece.Black;
    case GamePhase.Red:
      return color === Piece.Red;
    default:
      return false;
  }
}

export function getRandomIndex<T>(array: T[]): number {
  return Math.floor(Math.random() * array.length);
}

export function isComputerTurn(phase: GamePhase, players: Player[]) {

  const computer = players.find((p) => p.type === PlayerType.Computer);

  if (!computer) {
    return false;
  }

  switch (phase) {
    case GamePhase.Black:
    case GamePhase.TransitionToBlack:
      return computer.color === Piece.Black;
    case GamePhase.Red:
    case GamePhase.TransitionToRed:
      return computer.color === Piece.Red;
    default:
      return false;
  }
}
import { TurnState, GamePhase } from "../../schema";
import { nameForPhase, next } from "../turnUtilities";

describe('next function', () => {
  it('should transition from Black to TransitionToRed', () => {
    const initialState: TurnState = { phase: GamePhase.Black, count: 0 };
    const expectedState: TurnState = { phase: GamePhase.TransitionToRed, count: 0 };

    expect(next(initialState)).toEqual(expectedState);
  });

  it('should transition from Red to TransitionToBlack', () => {
    const initialState: TurnState = { phase: GamePhase.Red, count: 0 };
    const expectedState: TurnState = { phase: GamePhase.TransitionToBlack, count: 0 };

    expect(next(initialState)).toEqual(expectedState);
  });

  it('should transition from TransitionToBlack to Black and increment the count', () => {
    const initialState: TurnState = { phase: GamePhase.TransitionToBlack, count: 1 };
    const expectedState: TurnState = { phase: GamePhase.Black, count: 2 };

    expect(next(initialState)).toEqual(expectedState);
  });

  it('should transition from TransitionToRed to Red', () => {
    const initialState: TurnState = { phase: GamePhase.TransitionToRed, count: 0 };
    const expectedState: TurnState = { phase: GamePhase.Red, count: 0 };

    expect(next(initialState)).toEqual(expectedState);
  });
});


describe('nameForState function', () => {
  it('should return "BLACK" for GamePhase.Black', () => {
    expect(nameForPhase(GamePhase.Black)).toBe("BLACK");
  });

  it('should return "RED" for GamePhase.Red', () => {
    expect(nameForPhase(GamePhase.Red)).toBe("RED");
  });

  it('should return "TransitionToBlack" for GamePhase.TransitionToBlack', () => {
    expect(nameForPhase(GamePhase.TransitionToBlack)).toBe("TransitionToBlack");
  });

  it('should return "TransitionToRed" for GamePhase.TransitionToRed', () => {
    expect(nameForPhase(GamePhase.TransitionToRed)).toBe("TransitionToRed");
  });
});
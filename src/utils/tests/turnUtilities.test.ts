import { TurnState, TurnType } from "../../schema";
import { nameForState, next } from "../turnUtilities";

describe('next function', () => {
  it('should transition from Black to TransitionToRed', () => {
    const initialState: TurnState = { type: TurnType.Black, count: 0 };
    const expectedState: TurnState = { type: TurnType.TransitionToRed, count: 0 };

    expect(next(initialState)).toEqual(expectedState);
  });

  it('should transition from Red to TransitionToBlack', () => {
    const initialState: TurnState = { type: TurnType.Red, count: 0 };
    const expectedState: TurnState = { type: TurnType.TransitionToBlack, count: 0 };

    expect(next(initialState)).toEqual(expectedState);
  });

  it('should transition from TransitionToBlack to Black and increment the count', () => {
    const initialState: TurnState = { type: TurnType.TransitionToBlack, count: 1 };
    const expectedState: TurnState = { type: TurnType.Black, count: 2 };

    expect(next(initialState)).toEqual(expectedState);
  });

  it('should transition from TransitionToRed to Red', () => {
    const initialState: TurnState = { type: TurnType.TransitionToRed, count: 0 };
    const expectedState: TurnState = { type: TurnType.Red, count: 0 };

    expect(next(initialState)).toEqual(expectedState);
  });
});


// describe('nameForState function', () => {
//   it('should return "BLACK" for TurnType.Black', () => {
//     expect(nameForState(TurnType.Black)).toBe("BLACK");
//   });

//   it('should return "RED" for TurnType.Red', () => {
//     expect(nameForState(TurnType.Red)).toBe("RED");
//   });

//   it('should return "TransitionToBlack" for TurnType.TransitionToBlack', () => {
//     expect(nameForState(TurnType.TransitionToBlack)).toBe("TransitionToBlack");
//   });

//   it('should return "TransitionToRed" for TurnType.TransitionToRed', () => {
//     expect(nameForState(TurnType.TransitionToRed)).toBe("TransitionToRed");
//   });
// });
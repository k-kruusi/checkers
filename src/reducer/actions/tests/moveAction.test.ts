import { BoardState, MoveResult, Piece, initialState } from "../../../schema";
import { ActionType } from "../action";
import { MovePieceAction, validateMovePieceAction } from "../moveAction";

describe('validateMovePieceAction', () => {
  it('should return a message if there is a lock and a different piece is moved', () => {
    const state: BoardState = {
      ...initialState,
      lock: { piece: Piece.Black, coord: { x: 5, y: 0 } },
    };
    const action: MovePieceAction = {
      type: ActionType.MOVE_PIECE,
      from: { x: 6, y: 1 },
      to: { x: 5, y: 0 },
      piece: Piece.Black,
      potentials: [],
      result: MoveResult.Shift,
      timestamp: "",
    };

    const result = validateMovePieceAction(state, action);
    expect(result.message).toBe('Keep going you have another jump.');
  });

  it('should return a shift move if a jump is possible', () => {

    const state: BoardState = {
      ...initialState,
      board: [
        [Piece.Empty, Piece.Red, Piece.Empty, Piece.Red, Piece.Empty, Piece.Red, Piece.Empty, Piece.Red],
        [Piece.Red, Piece.Empty, Piece.Red, Piece.Empty, Piece.Red, Piece.Empty, Piece.Red, Piece.Empty],
        [Piece.Empty, Piece.Empty, Piece.Empty, Piece.Red, Piece.Empty, Piece.Red, Piece.Empty, Piece.Red],
        [Piece.Empty, Piece.Empty, Piece.Empty, Piece.Empty, Piece.Empty, Piece.Empty, Piece.Empty, Piece.Empty],
        [Piece.Empty, Piece.Red, Piece.Empty, Piece.Empty, Piece.Empty, Piece.Empty, Piece.Empty, Piece.Empty],
        [Piece.Black, Piece.Empty, Piece.Black, Piece.Empty, Piece.Black, Piece.Empty, Piece.Black, Piece.Empty],
        [Piece.Empty, Piece.Black, Piece.Empty, Piece.Black, Piece.Empty, Piece.Black, Piece.Empty, Piece.Black],
        [Piece.Black, Piece.Empty, Piece.Black, Piece.Empty, Piece.Black, Piece.Empty, Piece.Black, Piece.Empty],
      ],
    };

    const action: MovePieceAction = {
      type: ActionType.MOVE_PIECE,
      from: { x: 6, y: 5 },
      to: { x: 5, y: 4 },
      piece: Piece.Black,
      potentials: [],
      result: MoveResult.Shift,
      timestamp: ""
    };

    const result = validateMovePieceAction(state, action);
    expect(result.message).toBe('A jump is possible, find it.');
  });

  it('should return a message if the move is not in the potentials', () => {
    const state: BoardState = { ...initialState };
    const action: MovePieceAction = {
      type: ActionType.MOVE_PIECE,
      from: { x: 5, y: 0 },
      to: { x: 4, y: 1 },
      piece: Piece.Black,
      potentials: [{
        piece: Piece.Black,
        coord: { x: 3, y: 2 },
        didJump: false,
        eliminated: [],
        backDirection: { x: 1, y: -1 }
      }],
      result: MoveResult.Shift,
      timestamp: ""
    };

    const result = validateMovePieceAction(state, action);
    expect(result.message).toBe('Invalid move.');
  });

  it('should return myMove if the move is valid', () => {
    const state: BoardState = { ...initialState };
    const action: MovePieceAction = {
      type: ActionType.MOVE_PIECE,
      from: { x: 5, y: 0 },
      to: { x: 4, y: 1 },
      piece: Piece.Black,
      potentials: [{
        piece: Piece.Black,
        coord: { x: 4, y: 1 },
        didJump: false,
        eliminated: [],
        backDirection: { x: 1, y: -1 }
      }],
      result: MoveResult.Shift,
      timestamp: ""
    };

    const result = validateMovePieceAction(state, action);
    expect(result.myMove).toEqual({
      piece: Piece.Black,
      coord: { x: 4, y: 1 },
      didJump: false,
      eliminated: [],
      backDirection: { x: 1, y: -1 }
    });
  });
});

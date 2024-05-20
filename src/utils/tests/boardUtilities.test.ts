import {
  BoardState, Coord, GamePhase, Outcome, Piece, PlayerType, TileData, initialState
} from '../../schema';
import {
  calculatePotentialMoves, checkForWinner, cloneState, collectEliminations,
  getKingStatus, getPieces, isJumpPossible, updateBoard
} from '../boardUtilities';
import { isBlack, isRed } from '../tileUtilities';


describe('cloneState function', () => {
  const testState: BoardState = {
    board: [[Piece.Black, Piece.Empty], [Piece.Empty, Piece.Red]],
    turn: { phase: GamePhase.Black, count: 0 },
    winner: null,
    transformations: [],
    lock: null,
    message: null,
    players: [
      { type: PlayerType.LocalInput, color: Piece.Black },
      { type: PlayerType.Computer, color: Piece.Red }
    ]
  };

  it('should return a deep clone of the state', () => {
    const clonedState = cloneState(testState);

    // Check if the cloned state is not the same object as the initial state
    expect(clonedState).not.toBe(testState);

    // Check if the cloned state has the same properties and values as the initial state
    expect(clonedState.board).toEqual(testState.board);
    expect(clonedState.turn).toEqual(testState.turn);
    expect(clonedState.winner).toEqual(testState.winner);
    expect(clonedState.transformations).toEqual(testState.transformations);
    expect(clonedState.lock).toEqual(testState.lock);
    expect(clonedState.message).toEqual(testState.message);

    // Check if the cloned state has a deep clone of the board array
    expect(clonedState.board).not.toBe(testState.board);
    expect(clonedState.board[0]).not.toBe(testState.board[0]);
    expect(clonedState.board[1]).not.toBe(testState.board[1]);
  });

  it('should return a new object with initial state when state is null', () => {
    const clonedState = cloneState();
    expect(clonedState).not.toBe(initialState);
    expect(clonedState.board).toEqual(initialState.board);
    expect(clonedState.turn).toEqual(initialState.turn);
    expect(clonedState.winner).toEqual(initialState.winner);
    expect(clonedState.transformations).toEqual(initialState.transformations);
    expect(clonedState.lock).toEqual(initialState.lock);
    expect(clonedState.message).toEqual(initialState.message);
  });
});

describe('isJumpPossible function', () => {
  it('should return true if a jump is possible for Black pieces', () => {
    const board: Piece[][] = [
      [Piece.Empty, Piece.Empty, Piece.Empty],
      [Piece.Empty, Piece.Red, Piece.Empty],
      [Piece.Black, Piece.Empty, Piece.Empty],
    ];

    expect(isJumpPossible(board, Piece.Black)).toBe(true);
  });

  it('should return false if no jumps are possible for Black pieces', () => {
    const board: Piece[][] = [
      [Piece.Empty, Piece.Red, Piece.Empty],
      [Piece.Empty, Piece.Black, Piece.Empty],
      [Piece.Black, Piece.Empty, Piece.Empty],
    ];

    expect(isJumpPossible(board, Piece.Black)).toBe(false);
  });

  it('should return true if a jump is possible for Red pieces', () => {
    const board: Piece[][] = [
      [Piece.Red, Piece.Red, Piece.Empty],
      [Piece.Empty, Piece.Black, Piece.Empty],
      [Piece.Empty, Piece.Empty, Piece.Empty],
    ];

    expect(isJumpPossible(board, Piece.Red)).toBe(true);
  });

  it('should return false if no jumps are possible for Red pieces', () => {
    const board: Piece[][] = [
      [Piece.Empty, Piece.Black, Piece.Empty],
      [Piece.Empty, Piece.Red, Piece.Empty],
      [Piece.Red, Piece.Empty, Piece.Empty],
    ];

    expect(isJumpPossible(board, Piece.Red)).toBe(false);
  });

  it('should throw an error if an Empty piece is provided', () => {
    const board: Piece[][] = [
      [Piece.Empty, Piece.Black, Piece.Empty],
      [Piece.Empty, Piece.Red, Piece.Empty],
      [Piece.Red, Piece.Empty, Piece.Empty],
    ];

    expect(() => {
      isJumpPossible(board, Piece.Empty);
    }).toThrowError("should not be able to move empty piece");
  });

  it('should return true if a jump is possible for BlackKing pieces', () => {
    const board: Piece[][] = [
      [Piece.BlackKing, Piece.Empty, Piece.Empty],
      [Piece.Empty, Piece.Red, Piece.Empty],
      [Piece.Empty, Piece.Empty, Piece.Empty],
    ];

    expect(isJumpPossible(board, Piece.BlackKing)).toBe(true);
  });

  it('should return false if no jumps are possible for BlackKing pieces', () => {
    const board: Piece[][] = [
      [Piece.Empty, Piece.Red, Piece.Empty],
      [Piece.Empty, Piece.Black, Piece.Empty],
      [Piece.BlackKing, Piece.Empty, Piece.Empty],
    ];

    expect(isJumpPossible(board, Piece.BlackKing)).toBe(false);
  });

  it('should return true if a jump is possible for RedKing pieces', () => {
    const board: Piece[][] = [
      [Piece.Empty, Piece.Empty, Piece.Empty],
      [Piece.Empty, Piece.BlackKing, Piece.Empty],
      [Piece.RedKing, Piece.Empty, Piece.Empty],
    ];

    expect(isJumpPossible(board, Piece.RedKing)).toBe(true);
  });

  it('should return false if no jumps are possible for RedKing pieces', () => {
    const board: Piece[][] = [
      [Piece.Empty, Piece.Black, Piece.Empty],
      [Piece.Empty, Piece.RedKing, Piece.Empty],
      [Piece.RedKing, Piece.Empty, Piece.Empty],
    ];

    expect(isJumpPossible(board, Piece.RedKing)).toBe(false);
  });
});

describe('getPieces function', () => {
  const board: Piece[][] = [
    [Piece.Empty, Piece.Black, Piece.Empty],
    [Piece.Red, Piece.Empty, Piece.Black],
    [Piece.Empty, Piece.RedKing, Piece.Empty],
  ];

  it('should return correct pieces on the board', () => {
    const { black, red, all } = getPieces(board);

    // Check if the black pieces are correctly identified
    expect(black).toHaveLength(2);
    expect(black.every(tile => isBlack(tile.piece))).toBe(true);

    // Check if the red pieces are correctly identified
    expect(red).toHaveLength(2);
    expect(red.every(tile => isRed(tile.piece))).toBe(true);

    // Check if all pieces are correctly identified
    expect(all).toHaveLength(4);
    expect(all.every(tile => tile.piece !== Piece.Empty)).toBe(true);
  });
});

describe('collectEliminations function', () => {
  it('should return unique eliminated tiles from the provided path', () => {
    const path: Outcome[] = [
      {
        piece: Piece.Black,
        coord: { x: 2, y: 2 },
        didJump: true,
        eliminated: [
          { piece: Piece.Red, coord: { x: 3, y: 3 } },
          { piece: Piece.RedKing, coord: { x: 4, y: 4 } },
        ],
        backDirection: { x: -1, y: -1 }
      },
      {
        piece: Piece.Red,
        coord: { x: 4, y: 4 },
        didJump: true,
        eliminated: [
          { piece: Piece.Black, coord: { x: 3, y: 3 } },
        ],
        backDirection: { x: 1, y: 1 }
      },
    ];

    const expectedEliminations: TileData[] = [
      { piece: Piece.Red, coord: { x: 3, y: 3 } },
      { piece: Piece.RedKing, coord: { x: 4, y: 4 } },
      { piece: Piece.Black, coord: { x: 3, y: 3 } },
    ];

    const result = collectEliminations(path);

    // Check if the result contains the expected unique eliminated tiles
    expect(result).toHaveLength(expectedEliminations.length);
    expectedEliminations.forEach(expected => {
      expect(result.some(tile => tile.piece === expected.piece && tile.coord.x === expected.coord.x && tile.coord.y === expected.coord.y)).toBe(true);
    });
  });

  it('should handle empty path and return an empty array', () => {
    const path: Outcome[] = [];
    const result = collectEliminations(path);
    expect(result).toHaveLength(0);
  });

  it('should handle path with no eliminated tiles and return an empty array', () => {
    const path: Outcome[] = [
      {
        piece: Piece.Black,
        coord: { x: 2, y: 2 },
        didJump: false,
        eliminated: [],
        backDirection: { x: -1, y: -1 }
      },
    ];
    const result = collectEliminations(path);
    expect(result).toHaveLength(0);
  });
});

describe('calculatePotentialMoves function', () => {
  it('should return correct potential moves for a given piece on the board', () => {
    const board: Piece[][] = [
      [Piece.Empty, Piece.Empty, Piece.Empty],
      [Piece.Empty, Piece.Red, Piece.Empty],
      [Piece.Black, Piece.Red, Piece.Empty],
    ];

    const coord: Coord = { x: 0, y: 2 };
    const result = calculatePotentialMoves(board, coord);
    const expectedMoves: Outcome[] = [
      {
        piece: Piece.BlackKing,
        coord: { x: 2, y: 0 },
        didJump: true,
        eliminated: [{ piece: Piece.Red, coord: { x: 1, y: 1 } }],
        backDirection: { x: -1, y: 1 },
      },
    ];

    expect(result).toEqual(expectedMoves);
  });

  it('should return an empty array when no moves are possible', () => {
    const board: Piece[][] = [
      [Piece.Empty, Piece.Empty, Piece.Empty],
      [Piece.Empty, Piece.Black, Piece.Empty],
      [Piece.Black, Piece.Empty, Piece.Empty],
    ];

    const coord: Coord = { x: 0, y: 2 };
    const result = calculatePotentialMoves(board, coord);

    expect(result).toEqual([]);
  });

  it('should handle complex move sequences including multiple jumps', () => {
    const board: Piece[][] = [
      [Piece.Empty, Piece.Empty, Piece.Empty, Piece.Empty, Piece.Empty],
      [Piece.Empty, Piece.Red, Piece.Empty, Piece.Red, Piece.Empty],
      [Piece.Black, Piece.Empty, Piece.Empty, Piece.Red, Piece.Empty],
      [Piece.Black, Piece.Empty, Piece.Empty, Piece.Empty, Piece.Empty],
      [Piece.Empty, Piece.Empty, Piece.Empty, Piece.Empty, Piece.Empty]
    ];

    const coord: Coord = { x: 0, y: 2 };
    const result = calculatePotentialMoves(board, coord);

    const expectedMoves: Outcome[] = [
      {
        piece: Piece.BlackKing,
        coord: { x: 2, y: 0 },
        didJump: true,
        eliminated: [
          { piece: Piece.Red, coord: { x: 1, y: 1 } }
        ],
        backDirection: { x: -1, y: 1 }
      },
      {
        piece: Piece.BlackKing,
        coord: { x: 4, y: 2 },
        didJump: true,
        eliminated: [
          { piece: Piece.Red, coord: { x: 1, y: 1 } },
          { piece: Piece.Red, coord: { x: 3, y: 1 } }
        ],
        backDirection: { x: -1, y: -1 },
      },
    ];

    expect(result).toEqual(expectedMoves);
  });
});

describe('getKingStatus function', () => {

  const board: Piece[][] = [
    [Piece.Empty, Piece.Empty, Piece.Empty],
    [Piece.Empty, Piece.Red, Piece.Empty],
    [Piece.Black, Piece.Red, Piece.Empty],
  ];
  it('should return true for kings', () => {
    expect(getKingStatus(Piece.BlackKing, 1, board)).toBe(true);
    expect(getKingStatus(Piece.RedKing, 1, board)).toBe(true);
  });

  it('should return true for Black pieces in column 0', () => {
    expect(getKingStatus(Piece.Black, 0, board)).toBe(true);
  });

  it('should return true for Red pieces in the bottom column', () => {
    expect(getKingStatus(Piece.Red, 2, board)).toBe(true);
  });

  it('should return false for other pieces and columns', () => {
    expect(getKingStatus(Piece.Black, 1, board)).toBe(false);
    expect(getKingStatus(Piece.Red, 0, board)).toBe(false);
    expect(getKingStatus(Piece.Empty, 0, board)).toBe(false);
  });
});

describe('updateBoard', () => {
  it('should move a piece from one coordinate to another', () => {
    const initialBoard: Piece[][] = [
      [Piece.Empty, Piece.Empty, Piece.Empty],
      [Piece.Empty, Piece.Black, Piece.Empty],
      [Piece.Empty, Piece.Empty, Piece.Empty],
    ];

    const from: Coord = { x: 1, y: 1 };
    const to: Coord = { x: 1, y: 2 };

    const myMove: Outcome = {
      piece: Piece.Black,
      coord: to,
      didJump: false,
      eliminated: [],
      backDirection: { x: 0, y: -1 },
    };

    const expectedBoard: Piece[][] = [
      [Piece.Empty, Piece.Empty, Piece.Empty],
      [Piece.Empty, Piece.Empty, Piece.Empty],
      [Piece.Empty, Piece.Black, Piece.Empty],
    ];

    const newBoard = updateBoard(initialBoard, from, to, myMove);

    expect(newBoard).toEqual(expectedBoard);
  });

  it('should eliminate pieces correctly', () => {
    const initialBoard: Piece[][] = [
      [Piece.Empty, Piece.Empty, Piece.Empty],
      [Piece.Empty, Piece.Black, Piece.Empty],
      [Piece.Empty, Piece.Red, Piece.Empty],
      [Piece.Empty, Piece.Empty, Piece.Empty],
    ];

    const from: Coord = { x: 1, y: 1 };
    const to: Coord = { x: 1, y: 3 };

    const eliminated: TileData[] = [
      { piece: Piece.Red, coord: { x: 1, y: 2 } },
    ];

    const myMove: Outcome = {
      piece: Piece.Black,
      coord: to,
      didJump: true,
      eliminated: eliminated,
      backDirection: { x: 0, y: -1 },
    };

    const expectedBoard: Piece[][] = [
      [Piece.Empty, Piece.Empty, Piece.Empty],
      [Piece.Empty, Piece.Empty, Piece.Empty],
      [Piece.Empty, Piece.Empty, Piece.Empty],
      [Piece.Empty, Piece.Black, Piece.Empty],
    ];

    const newBoard = updateBoard(initialBoard, from, to, myMove);

    expect(newBoard).toEqual(expectedBoard);
  });
});

describe('checkForWinner', () => {
  it('should return Piece.Red when there are no black pieces left', () => {
    const board: Piece[][] = [
      [Piece.Empty, Piece.Empty, Piece.Empty],
      [Piece.Empty, Piece.Empty, Piece.Empty],
      [Piece.Empty, Piece.Red, Piece.Empty],
    ];

    const winner = checkForWinner(board);

    expect(winner).toBe(Piece.Red);
  });

  it('should return Piece.Black when there are no red pieces left', () => {
    const board: Piece[][] = [
      [Piece.Empty, Piece.Empty, Piece.Empty],
      [Piece.Empty, Piece.Black, Piece.Empty],
      [Piece.Empty, Piece.Empty, Piece.Empty],
    ];

    const winner = checkForWinner(board);

    expect(winner).toBe(Piece.Black);
  });

  it('should return null when there are both black and red pieces on the board', () => {
    const board: Piece[][] = [
      [Piece.Empty, Piece.Empty, Piece.Empty],
      [Piece.Empty, Piece.Black, Piece.Empty],
      [Piece.Empty, Piece.Red, Piece.Empty],
    ];

    const winner = checkForWinner(board);

    expect(winner).toBeNull();
  });

  it('should return null when there are no pieces on the board', () => {
    const board: Piece[][] = [
      [Piece.Empty, Piece.Empty, Piece.Empty],
      [Piece.Empty, Piece.Empty, Piece.Empty],
      [Piece.Empty, Piece.Empty, Piece.Empty],
    ];

    const winner = checkForWinner(board);

    expect(winner).toBeNull();
  });
});
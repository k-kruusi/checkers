import { Coord, Piece, TileData, TurnType } from "../../schema";
import { equalCoords, getDirectionFor, isBlack, isInBounds, isInRouteAlready, isKing, isOccupiedByOpponent, isRed, isTileActive, kingMe } from "../tileUtilities";


describe('kingMe function', () => {
  it('should throw an error for Piece.Empty', () => {
    expect(() => {
      kingMe(Piece.Empty);
    }).toThrowError("shouldnt happen");
  });

  it('should return Piece.BlackKing for Piece.Black', () => {
    expect(kingMe(Piece.Black)).toBe(Piece.BlackKing);
  });

  it('should return Piece.BlackKing for Piece.BlackKing', () => {
    expect(kingMe(Piece.BlackKing)).toBe(Piece.BlackKing);
  });

  it('should return Piece.RedKing for Piece.Red', () => {
    expect(kingMe(Piece.Red)).toBe(Piece.RedKing);
  });

  it('should return Piece.RedKing for Piece.RedKing', () => {
    expect(kingMe(Piece.RedKing)).toBe(Piece.RedKing);
  });
});

describe('isKing function', () => {
  it('should return true for Piece.BlackKing', () => {
    expect(isKing(Piece.BlackKing)).toBe(true);
  });

  it('should return true for Piece.RedKing', () => {
    expect(isKing(Piece.RedKing)).toBe(true);
  });

  it('should return false for other pieces', () => {
    expect(isKing(Piece.Empty)).toBe(false);
    expect(isKing(Piece.Black)).toBe(false);
    expect(isKing(Piece.Red)).toBe(false);
  });
});



// describe('isBlack function', () => {
//   it('should return true for Piece.Black', () => {
//     expect(isBlack(Piece.Black)).toBe(true);
//   });

//   it('should return true for Piece.BlackKing', () => {
//     expect(isBlack(Piece.BlackKing)).toBe(true);
//   });

//   it('should return false for other pieces', () => {
//     expect(isBlack(Piece.Empty)).toBe(false);
//     expect(isBlack(Piece.Red)).toBe(false);
//     expect(isBlack(Piece.RedKing)).toBe(false);
//   });
// });

// describe('isRed function', () => {
//   it('should return true for Piece.Red', () => {
//     expect(isRed(Piece.Red)).toBe(true);
//   });

//   it('should return true for Piece.RedKing', () => {
//     expect(isRed(Piece.RedKing)).toBe(true);
//   });

//   it('should return false for other pieces', () => {
//     expect(isRed(Piece.Empty)).toBe(false);
//     expect(isRed(Piece.Black)).toBe(false);
//     expect(isRed(Piece.BlackKing)).toBe(false);
//   });
// });

// describe('equalCoords function', () => {
//   it('should return true if coordinates are equal', () => {
//     expect(equalCoords({ x: 1, y: 2 }, { x: 1, y: 2 })).toBe(true);
//   });

//   it('should return false if coordinates are not equal', () => {
//     expect(equalCoords({ x: 1, y: 2 }, { x: 3, y: 4 })).toBe(false);
//   });
// });

// describe('isInBounds function', () => {
//   const board = [
//     [Piece.Empty, Piece.Empty, Piece.Empty],
//     [Piece.Empty, Piece.Empty, Piece.Empty],
//     [Piece.Empty, Piece.Empty, Piece.Empty],
//   ];

//   it('should return true if coordinates are within bounds', () => {
//     expect(isInBounds(0, 0, board)).toBe(true);
//     expect(isInBounds(1, 2, board)).toBe(true);
//   });

//   it('should return false if coordinates are outside bounds', () => {
//     expect(isInBounds(-1, 0, board)).toBe(false);
//     expect(isInBounds(0, -1, board)).toBe(false);
//     expect(isInBounds(3, 0, board)).toBe(false);
//     expect(isInBounds(0, 3, board)).toBe(false);
//   });
// });

// describe('isInRouteAlready function', () => {
//   const tile1: TileData = { piece: Piece.Black, coord: { x: 1, y: 2 } };
//   const tile2: TileData = { piece: Piece.Red, coord: { x: 3, y: 4 } };
//   const tiles: TileData[] = [tile1, tile2];

//   it('should return true if coord is in tiles', () => {
//     expect(isInRouteAlready(tiles, { x: 1, y: 2 })).toBe(true);
//     expect(isInRouteAlready(tiles, { x: 3, y: 4 })).toBe(true);
//   });

//   it('should return false if coord is not in tiles', () => {
//     expect(isInRouteAlready(tiles, { x: 0, y: 0 })).toBe(false);
//     expect(isInRouteAlready(tiles, { x: 5, y: 6 })).toBe(false);
//   });
// });

// describe('isOccupiedByOpponent function', () => {
//   it('should return true if the other piece is an opponent piece', () => {
//     expect(isOccupiedByOpponent(Piece.Black, Piece.Red)).toBe(true);
//     expect(isOccupiedByOpponent(Piece.BlackKing, Piece.RedKing)).toBe(true);
//     expect(isOccupiedByOpponent(Piece.Red, Piece.Black)).toBe(true);
//     expect(isOccupiedByOpponent(Piece.RedKing, Piece.BlackKing)).toBe(true);
//   });

//   it('should return false if the other piece is not an opponent piece', () => {
//     expect(isOccupiedByOpponent(Piece.Black, Piece.Black)).toBe(false);
//     expect(isOccupiedByOpponent(Piece.Red, Piece.Red)).toBe(false);
//     expect(isOccupiedByOpponent(Piece.Empty, Piece.Black)).toBe(false);
//     expect(isOccupiedByOpponent(Piece.Red, Piece.Empty)).toBe(false);
//   });
// });

// describe('getDirectionFor function', () => {
//   const up: Coord[] = [{ x: -1, y: -1 }, { x: -1, y: 1 }];
//   const down: Coord[] = [{ x: 1, y: -1 }, { x: 1, y: 1 }];
//   const startDirection: Coord = { x: 0, y: 0 };

//   it('should return directions for Black piece', () => {
//     expect(getDirectionFor(Piece.Black, startDirection)).toEqual(up);
//   });

//   it('should return directions for Red piece', () => {
//     expect(getDirectionFor(Piece.Red, startDirection)).toEqual(down);
//   });

//   it('should return directions for BlackKing piece', () => {
//     expect(getDirectionFor(Piece.BlackKing, startDirection)).toEqual([...up, ...down]);
//   });

//   it('should return directions for RedKing piece', () => {
//     expect(getDirectionFor(Piece.RedKing, startDirection)).toEqual([...up, ...down]);
//   });

//   it('should return an empty array for Empty piece', () => {
//     expect(getDirectionFor(Piece.Empty, startDirection)).toEqual([]);
//   });

//   it('should filter out the last back direction for kings', () => {
//     const lastBackDirection: Coord = { x: -1, y: -1 };
//     const expectedDirections: Coord[] = [{ x: -1, y: 1 }];

//     expect(getDirectionFor(Piece.BlackKing, lastBackDirection)).toEqual(expectedDirections);
//   });

//   it('should not filter out the last back direction for kings if it is the start direction', () => {
//     const lastBackDirection: Coord = startDirection;
//     const expectedDirections: Coord[] = [...up, ...down];

//     expect(getDirectionFor(Piece.RedKing, lastBackDirection)).toEqual(expectedDirections);
//   });
// });


// describe('isTileActive function', () => {
//   it('should return true for empty tile when not in transition', () => {
//     expect(isTileActive(TurnType.Black, Piece.Empty)).toBe(true);
//     expect(isTileActive(TurnType.Red, Piece.Empty)).toBe(true);
//   });

//   it('should return false for non-empty tile when in transition', () => {
//     expect(isTileActive(TurnType.TransitionToBlack, Piece.Black)).toBe(false);
//     expect(isTileActive(TurnType.TransitionToRed, Piece.Red)).toBe(false);
//   });

//   it('should return true for Black piece on Black turn', () => {
//     expect(isTileActive(TurnType.Black, Piece.Black)).toBe(true);
//   });

//   it('should return false for Red piece on Black turn', () => {
//     expect(isTileActive(TurnType.Black, Piece.Red)).toBe(false);
//   });

//   it('should return true for Red piece on Red turn', () => {
//     expect(isTileActive(TurnType.Red, Piece.Red)).toBe(true);
//   });

//   it('should return false for Black piece on Red turn', () => {
//     expect(isTileActive(TurnType.Red, Piece.Black)).toBe(false);
//   });

//   it('should return true for BlackKing piece on Black turn', () => {
//     expect(isTileActive(TurnType.Black, Piece.BlackKing)).toBe(true);
//   });

//   it('should return true for RedKing piece on Red turn', () => {
//     expect(isTileActive(TurnType.Red, Piece.RedKing)).toBe(true);
//   });

//   it('should return false for BlackKing piece on Red turn', () => {
//     expect(isTileActive(TurnType.Red, Piece.BlackKing)).toBe(false);
//   });

//   it('should return false for RedKing piece on Black turn', () => {
//     expect(isTileActive(TurnType.Black, Piece.RedKing)).toBe(false);
//   });
// });
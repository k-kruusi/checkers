import { Coord, TileData, Piece, Outcome, up, down, startDirection } from "../schema";

export function kingMe(piece: Piece) {
  switch (piece) {
    case Piece.Empty:
      throw new Error("shouldnt happen");
    case Piece.Black:
    case Piece.BlackKing:
      return Piece.BlackKing;
    case Piece.Red:
    case Piece.RedKing:
      return Piece.RedKing;
  }
}

export function isKing(piece: Piece) {
  return piece === Piece.BlackKing || piece === Piece.RedKing;
}

export function getKingStatus(piece: Piece, col: number) {
  if (isKing(piece)) {
    return true;
  }
  return (isBlack(piece) && col === 0) || (isRed(piece) && col === 7);
}

export function isBlack(piece: Piece) {
  return piece === Piece.Black || piece === Piece.BlackKing;
}

export function isRed(piece: Piece) {
  return piece === Piece.Red || piece === Piece.RedKing;
}

export function isInRouteAlready(tiles: TileData[], coord: Coord) {
  return tiles.some((t) => equalCoords(t.coord, coord));
}

export function equalCoords(coord1: Coord, coord2: Coord): boolean {
  return coord1.x === coord2.x && coord1.y === coord2.y;
}

export function isInBounds(newRow: number, newCol: number, board: Piece[][]): boolean {
  // technically this would work with any size board
  return newRow >= 0 && newRow < board.length && newCol >= 0 && newCol < board[0].length;
}

export function isOccupiedByOpponent(myPiece: Piece, otherPiece: Piece) {
  switch (myPiece) {
    case Piece.Black:
    case Piece.BlackKing:
      return (otherPiece === Piece.Red || otherPiece === Piece.RedKing);
    case Piece.Red:
    case Piece.RedKing:
      return (otherPiece === Piece.Black || otherPiece === Piece.BlackKing);
    case Piece.Empty:
      return false;
  }
}

export function collectEliminations(path: Outcome[]): TileData[] {
  // using the path taken, count the eliminations for this option. 
  // json conversion and string compare is used to compare unique objects
  try {
    const items = path.map((item) => item.eliminated)
      .flat()
      .map(item => JSON.stringify(item));
    const set = new Set(items);
    return Array.from(set).map(item => JSON.parse(item) as TileData);
  }
  catch (e) {
    throw new Error(`Error coalescing eliminations: ${e}`);
  }
}

export function getDirectionFor(piece: Piece, lastBackDirection: Coord) {
  let directions: Coord[] = [];
  switch (piece) {
    case Piece.Empty:
      return [];
    case Piece.Black:
      directions = up;
      break;
    case Piece.BlackKing:
    case Piece.RedKing:
      directions = [...up, ...down];
      break;
    case Piece.Red:
      directions = down;
      break;
  }

  // if we are a king we filter the direction we came from when doing multiple jumps
  // first itteration the filtering is skipped, by checking against the startDirection
  if (isKing(piece) && !equalCoords(lastBackDirection, startDirection)) {

    directions = directions.filter((item) => item.x !== lastBackDirection.x || item.y !== lastBackDirection.y);
  }
  return directions;
}
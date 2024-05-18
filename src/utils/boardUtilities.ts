import {
  BoardState,
  Coord,
  MoveResult,
  Outcome,
  Piece,
  TileData,
  initialState,
  startDirection
} from "../schema";
import {
  getDirectionFor,
  isBlack,
  isInBounds,
  isInRouteAlready,
  isKing,
  isOccupiedByOpponent,
  isRed,
  kingMe
} from "./tileUtilities";


export function cloneState(state?: BoardState) {
  const isInitial = state === null;
  const cloneTarget = state ? state : initialState;
  return {
    ...cloneTarget,
    board: [...cloneTarget.board.map(row => [...row])],
    start: isInitial ? new Date() : cloneTarget.start,
    end: cloneTarget.end
  };
}

const standardBoardMaxJumps = 24;

export function calculatePotentialMoves(board: Piece[][], coord: Coord): Outcome[] {
  const row = coord.x;
  const col = coord.y;
  const startingPoint: Outcome = {
    piece: board[col][row],
    coord: { x: row, y: col },
    didJump: false,
    eliminated: [],
    backDirection: startDirection
  };

  // a stack and a loop is used to avoid recursion
  const jumpStack: Outcome[][] = [[startingPoint]];
  const potentialMoves: Outcome[] = [];

  while (jumpStack.length > 0) {
    const movements = jumpStack.pop()!;
    // only looks at the last movement in series of moves in the stack
    const currentMovement = movements[movements.length - 1];
    const {
      piece: currentPiece,
      coord: currentCoord,
      didJump: haveJumpedAlready,
      backDirection: lastBackDirection,
    } = currentMovement;

    // define potential directions for checkers based on their color & kingship
    let directions: Coord[] = getDirectionFor(currentPiece, lastBackDirection);
    const routeEliminations = collectEliminations([...movements])
    // check the directions for possible moves or jumps
    for (const direction of directions) {
      const { x, y } = direction;
      const newRow = currentCoord.x + x;
      const newCol = currentCoord.y + y;

      if (isInBounds(newRow, newCol, board)) {
        const tileToCheck = board[newCol][newRow];

        // check if the new position is empty and we didn't already jump aka a simple move.
        if (tileToCheck === Piece.Empty && !haveJumpedAlready) {
          // check if this move would make us a king
          const isNowKing = getKingStatus(currentPiece, newCol, board);

          // add the move as a potential
          const step: Outcome = {
            piece: isNowKing ? kingMe(currentPiece) : currentPiece,
            coord: { x: newRow, y: newCol },
            didJump: false,
            eliminated: [],
            backDirection: { x: -x, y: -y }
          }
          potentialMoves.push(step);
        }
        else if (isOccupiedByOpponent(currentPiece, tileToCheck) &&
          !isInRouteAlready(routeEliminations, { x: newRow, y: newCol })) {
          // if it's occupied check the next spot in that direction to see if we can jump it:
          const nextRow = newRow + x;
          const nextCol = newCol + y;

          if (isInBounds(nextRow, nextCol, board)) {
            const nextTile = board[nextCol][nextRow];

            // if the next position is empty add it as a potential move
            if (nextTile === Piece.Empty) {
              // mark the tile we jumped over for elimination
              const eliminate: TileData = {
                piece: tileToCheck,
                coord: { x: newRow, y: newCol }
              };
              // check if this move would make us a king
              const isNowKing = getKingStatus(currentPiece, nextCol, board);

              const step: Outcome = {
                piece: isNowKing ? kingMe(currentPiece) : currentPiece,
                coord: { x: nextRow, y: nextCol },
                didJump: true,
                eliminated: [eliminate],
                backDirection: { x: -x, y: -y }
              };

              const eliminationsSoFar = collectEliminations([...movements, step]);
              const path = [...movements, step];
              potentialMoves.push({ ...step, eliminated: eliminationsSoFar });


              if (path.length < standardBoardMaxJumps) {
                jumpStack.push(path);
              }
              else {
                // added a hard stop to our loop 
                // just to be safe
                // dont believe its ever called
                throw new Error('break');
              }
            }
          }
        }
      }
    }
  }

  // if theres a jump in the potential moves you must take it
  const filtered = potentialMoves.filter((item) => item.didJump);
  return filtered.length > 0 ? filtered : potentialMoves;
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


export function getPieces(board: Piece[][]) {

  const tilesWithPieces = board.map((row, y) => {
    return row.map((piece, x) => {
      return { piece, coord: { x, y } } as TileData;
    }).filter((tileData) => tileData.piece !== Piece.Empty);
  }).flat();

  const black = tilesWithPieces.filter((item) => isBlack(item.piece));
  const red = tilesWithPieces.filter((item) => isRed(item.piece));

  return { black, red, all: tilesWithPieces };
}


export function isJumpPossible(board: Piece[][], piece: Piece) {

  const { black, red } = getPieces(board);

  if (isBlack(piece)) {
    const allBlackMoves = black.map((item) => calculatePotentialMoves(board, item.coord));
    return allBlackMoves.flat().filter((outcome) => outcome.didJump).length > 0;
  }
  else if (isRed(piece)) {
    const allRedMoves = red.map((item) => calculatePotentialMoves(board, item.coord));
    return allRedMoves.flat().filter((outcome) => outcome.didJump).length > 0;
  }
  else {
    throw new Error("should not be able to move empty piece");
  }
}

export function getKingStatus(piece: Piece, col: number, board: Piece[][]) {
  if (isKing(piece)) {
    return true;
  }
  return (isBlack(piece) && col === 0) || (isRed(piece) && col === board.length - 1);
}

export function updateBoard(board: Piece[][], from: Coord, to: Coord, myMove: Outcome) {
  const newBoard = [...board];
  newBoard[from.y][from.x] = Piece.Empty;
  myMove.eliminated.forEach((eliminate) => {
    newBoard[eliminate.coord.y][eliminate.coord.x] = Piece.Empty
  });
  newBoard[to.y][to.x] = myMove.piece;

  return newBoard;
}

export function wasLastMove(newBoard: Piece[][], result: MoveResult, to: Coord) {
  if (result === MoveResult.Shift) {
    return true;
  }

  try {
    const moreMovesAvailable = calculatePotentialMoves(newBoard, { x: to.x, y: to.y }).filter((item) => item.didJump).length;
    console.log('moreMovesAvailable: ', moreMovesAvailable);
    return moreMovesAvailable === 0;
  } catch (e) {
    console.error("Error calculating potential moves", e);
    return true;
  }
}

export function checkForWinner(board: Piece[][]) {
  const { black, red } = getPieces(board);

  if (black.length === 0 && red.length === 0) {
    return null;
  }

  if (black.length === 0) {
    return Piece.Red;
  }

  if (red.length === 0) {
    return Piece.Black;
  }

  return null;
}
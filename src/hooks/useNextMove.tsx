
import { useState, useContext } from 'react';
import { NextMoveInspectorContext } from "../providers/nextMoveInspectorProvider";
import { Coord, Outcome, Piece, TileData, startDirection } from "../schema";
import { useCheckers } from './useCheckers';
import { collectEliminations, getDirectionFor, getKingStatus, isInBounds, isInRouteAlready, isOccupiedByOpponent, kingMe } from '../utils';

export const useNextMove = () => {
  const context = useContext(NextMoveInspectorContext);
  if (!context) {
    throw new Error('useCheckers must be used within a CheckersProvider');
  }
  return context;
}

export const useNextMoveHook = () => {
  const [focus, setFocus] = useState<TileData | null>(null);
  const [potentials, setPotentials] = useState<Outcome[]>([]);
  const { state } = useCheckers();

  const inspect = (fresh: TileData) => {

    if (focus &&
      focus.piece === fresh.piece &&
      focus.coord.x === fresh.coord.x && focus.coord.y === fresh.coord.y) {
      // exit early already calculated for that tile.
      return;
    }
    // if you are hovering over an empty, 
    if (fresh.piece === Piece.Empty) {
      setPotentials([]);
      setFocus(fresh);
      return;
    }
    // if you are hovering over an opponent
    // if (fresh.piece === remotePlayerColor || fresh.piece === kingMe(remotePlayerColor)) {
    //   setPotentials([]);
    //   setFocus(fresh);
    //   return;
    // }

    const moves = calculatePotentialMoves(state.board, fresh.coord);
    setPotentials(moves);
    setFocus(fresh);
  };

  const clear = () => setPotentials([]);

  return { inspect, potentials, clear };
};


function calculatePotentialMoves(board: Piece[][], coord: Coord): Outcome[] {
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

  // our collection of results
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
          const isNowKing = getKingStatus(currentPiece, newCol);

          // add the move as a potential
          const step: Outcome = {
            piece: isNowKing ? kingMe(currentPiece) : currentPiece,
            coord: { x: newRow, y: newCol },
            didJump: haveJumpedAlready,
            eliminated: [],
            backDirection: { x: -x, y: -y }
          }
          potentialMoves.push(step);
        }
        // if it's occupied check the next spot in that direction to see if we can jump it:
        else if (isOccupiedByOpponent(currentPiece, tileToCheck) &&
          !isInRouteAlready(routeEliminations, { x: newRow, y: newCol })) {
          const nextRow = newRow + x;
          const nextCol = newCol + y;

          if (isInBounds(nextRow, nextCol, board)) {
            const nextTile = board[nextCol][nextRow];

            // if the next position is empty add it as a potential move
            if (nextTile === Piece.Empty) {
              // mark the tile we jumped over for elimination
              const eliminate: TileData = { piece: tileToCheck, coord: { x: newRow, y: newCol } };
              // check if this move would make us a king
              const isNowKing = getKingStatus(currentPiece, nextCol);

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

              // added a hard stop to our loop if this occures
              // over 20 jumps you've eliminated all the tiles
              // just to be safe
              if (path.length < 20) {
                jumpStack.push(path);
              }
              else {
                throw new Error('break');
              }
            }
          }
        }
      }
    }
  }
  const filtered = potentialMoves.filter((item) => item.didJump);
  return filtered.length > 0 ? filtered : potentialMoves;
}
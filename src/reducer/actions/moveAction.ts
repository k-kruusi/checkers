import { BoardState, Coord, Outcome, MoveResult, Piece, TileData } from "../../schema";
import { calculatePotentialMoves, canWeKeepGoing, isJumpPossible, updateBoard } from "../../utils";
import { next } from "../../utils";
import { ActionType } from "./action";

export interface MovePieceAction {
  type: ActionType.MOVE_PIECE;
  from: Coord;
  to: Coord;
  piece: Piece;
  potentials: Outcome[];
  result: MoveResult;
}

export const handleMovePieceAction = (state: BoardState, action: MovePieceAction) => {
  const { from, to, result } = action;
  const { board, turn, moveHistory } = state;
  const { message, myMove } = validateMovePieceAction(state, action);

  // failed validation
  if (!myMove) {
    return { ...state, message };
  }

  // update the board state
  const newBoard = updateBoard(board, from, to, myMove);

  // TODO: check win conditions

  // check if theres an additional move available before before swapping the turn over (with this piece)
  let notFinished = canWeKeepGoing(newBoard, result, to)

  // if you do an incomplete move, a lock gets set, since your turn could continue, 
  // you must continue moving that tile.
  const myTile: TileData = { piece: myMove.piece, coord: { x: to.x, y: to.y } };

  return {
    ...state,
    board: newBoard,
    turn: notFinished ? turn : next(turn),
    moveHistory: [...moveHistory, myMove],
    lock: notFinished ? myTile : null,
    message: null,
  } as BoardState;
};

export function validateMovePieceAction(state: BoardState, action: MovePieceAction) {
  const { from, result, potentials, to, piece } = action;
  const { board } = state;
  // checks for any outstanding locks.
  if (state.lock && (state.lock.coord.x !== from.x || state.lock.coord.y !== from.y)) {
    return { message: 'must contine with the same tile theres more to go.' };
  }

  // if you moved a piece (aka a shift), we must check if there was 
  // a jump possible cause it could be an invalid move.
  if (result === MoveResult.Shift && isJumpPossible(board, piece)) {
    return { message: 'A jump is possible with another piece.' };
  }

  // validate step (move should be one of the valid ones for this piece potentials);
  const myMove = potentials.find((p) => p.coord.x === to.x && p.coord.y === to.y);
  if (!myMove) {
    return { message: 'invalid move.' };
  }
  return { myMove }
}


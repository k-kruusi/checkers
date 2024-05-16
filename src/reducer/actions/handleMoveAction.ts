import { BoardState, Coord, Outcome, MoveResult, Piece } from "../../schema";
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
  const { from, to, potentials, result } = action;
  const { board, currentPlayer, moveHistory } = state;

  // validate step (move should be one of the potentials);
  const myMove = potentials.find((p) => p.coord.x === to.x && p.coord.y === to.y);
  if (!myMove) {
    console.log('not in potentials, move aborted');
    return state;
  }
  const newBoard = [...board];
  // update my old location to empty;
  newBoard[from.y][from.x] = Piece.Empty;
  // process any eliminations
  myMove.eliminated.forEach((eliminate) => {
    newBoard[eliminate.coord.y][eliminate.coord.x] = Piece.Empty
  });

  // move my piece to the new location, king it if neccessary
  newBoard[to.y][to.x] = myMove.piece;

  // check if theres an additional move with this piece

  // TODO: Check for winner, if any
  return {
    ...state,
    board: newBoard,
    // currentPlayer: notFinished ? currentPlayer : currentPlayer === Piece.Black ? Piece.Red : Piece.Black,
    // moveHistory: [...moveHistory, { from, to, result }],
  };
}




import React from 'react';
import { useCheckers } from '../hooks';
import { ActionType } from '../actions';
import { Piece } from '../schema';
import { StaticPiece } from './staticPiece';


export const GameBoard: React.FC = () => {
  const { state, dispatch } = useCheckers();
  const { board, currentPlayer } = state;

  const handleCellClick = (rowIndex: number, colIndex: number) => {
    // Dispatch a move piece action when a cell is clicked
    // dispatch({ type: ActionType.MOVE_PIECE, from: [rowIndex, colIndex], to: /* destination */, result: /* move result */ });
  };

  return (
    <>
      <div className="game-board" style={{ border: "3px solid black", width: "fit-content", margin: "auto auto" }}>
        {board.map((row, rowIndex) => (
          <div key={rowIndex} className="board-row" style={{ display: "flex", flexDirection: "row" }}>
            {row.map((cell, colIndex) => (
              <div key={rowIndex + "-" + colIndex} onClick={() => handleCellClick(rowIndex, colIndex)} style={{ border: "1px solid black" }}>
                <StaticPiece piece={cell} />
              </div>
            ))}
          </div>
        ))}
      </div>
    </>
  );
};